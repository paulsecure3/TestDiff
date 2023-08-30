// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

import "../Interfaces/IBorrowerOperations.sol";
import "../Interfaces/ITroveManager.sol";
import "../Interfaces/IUSDAToken.sol";
import "../Interfaces/ICollSurplusPool.sol";
import "../Interfaces/ISortedTroves.sol";
import "../Interfaces/IAGLStaking.sol";
import "../Interfaces/IStabilityPoolManager.sol";
import "./AGLBase.sol";
import "../Dependencies/CheckContract.sol";
import "../Dependencies/SafetyTransfer.sol";
import "../Interfaces/IInterestManager.sol";
import "../Interfaces/IAgilelyDexTrader.sol";
import "../Interfaces/IWETH.sol";

contract BorrowerOperations is AGLBase, CheckContract, IBorrowerOperations {
	using SafeMathUpgradeable for uint256;
	using SafeERC20Upgradeable for IERC20Upgradeable;

	string public constant NAME = "BorrowerOperations";

	// --- Connected contract declarations ---

	ITroveManager public troveManager;

	IStabilityPoolManager stabilityPoolManager;

	address gasPoolAddress;

	ICollSurplusPool collSurplusPool;

	IAGLStaking public AGLStaking;
	address public AGLStakingAddress;

	IUSDAToken public usdaToken;

	// A doubly linked list of Troves, sorted by their collateral ratios
	ISortedTroves public sortedTroves;

	bool public isInitialized;

	mapping(address => bool) internal hasAGLccess;

	IInterestManager public interestManager;

	IAgilelyDexTrader public dexTrader;

	//TODO must modify weth address
	address public constant WETH = 0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3;

	struct ContractsCache {
		ITroveManager troveManager;
		IActivePool activePool;
		IUSDAToken usdaToken;
	}

	// --- Borrower Trove Operations ---

	function setAddresses(
		address _troveManagerAddress,
		address _stabilityPoolManagerAddress,
		address _gasPoolAddress,
		address _collSurplusPoolAddress,
		address _sortedTrovesAddress,
		address _usdaTokenAddress,
		address _aglStakingAddress,
		address _aglParameters
	)
	external  initializer
	{
		require(!isInitialized, "Already Initialized");

		checkContract(_troveManagerAddress);
		checkContract(_stabilityPoolManagerAddress);
		checkContract(_gasPoolAddress);
		checkContract(_collSurplusPoolAddress);
		checkContract(_sortedTrovesAddress);
		checkContract(_usdaTokenAddress);
		checkContract(_aglStakingAddress);

		troveManager = ITroveManager(_troveManagerAddress);
		stabilityPoolManager = IStabilityPoolManager(_stabilityPoolManagerAddress);
		gasPoolAddress = _gasPoolAddress;
		collSurplusPool = ICollSurplusPool(_collSurplusPoolAddress);
		sortedTroves = ISortedTroves(_sortedTrovesAddress);
		AGLStaking = IAGLStaking(_aglStakingAddress);
		AGLStakingAddress = _aglStakingAddress;
		usdaToken = IUSDAToken(_usdaTokenAddress);
		__Ownable_init();
		setAGLParameters(_aglParameters);
		isInitialized = true;

		emit TroveManagerAddressChanged(_troveManagerAddress);
		emit StabilityPoolManagerAddressChanged(_stabilityPoolManagerAddress);
		emit GasPoolAddressChanged(_gasPoolAddress);
		emit CollSurplusPoolAddressChanged(_collSurplusPoolAddress);
		emit SortedTrovesAddressChanged(_sortedTrovesAddress);
		emit USDATokenAddressChanged(_usdaTokenAddress);
		emit AGLStakingAddressChanged(_aglStakingAddress);
	}

	function openTrove(
		address _asset,
		uint256 _tokenAmount,
		uint256 _maxFeePercentage,
		uint256 _AGLmount,
		address _upperHint,
		address _lowerHint
	) external payable override {
		aglParams.sanitizeParameters(_asset);

		ContractsCache memory contractsCache = ContractsCache(
			troveManager,
			aglParams.activePool(),
			usdaToken
		);
		LocalVariables_openTrove memory vars;
		vars.asset = _asset;

		_tokenAmount = getMethodValue(vars.asset, _tokenAmount, false);
		vars.price = aglParams.priceFeed().fetchPrice(vars.asset);
		_requireValidMaxFeePercentage(vars.asset, _maxFeePercentage);
		_requireTroveisNotActive(vars.asset, contractsCache.troveManager, msg.sender);

		vars.USDAFee;
		vars.netDebt = _AGLmount;

		vars.USDAFee = _triggerBorrowingFee(
			vars.asset,
			contractsCache.troveManager,
			contractsCache.usdaToken,
			_AGLmount,
			_maxFeePercentage
		);
		vars.netDebt = vars.netDebt.add(vars.USDAFee);
		_requireAtLeastMinNetDebt(vars.asset, vars.netDebt);

		// ICR is based on the composite debt, i.e. the requested USDA amount + USDA borrowing fee + USDA gas comp.
		vars.compositeDebt = _getCompositeDebt(vars.asset, vars.netDebt);

		assert(vars.compositeDebt > 0);
		_requireLowerOrEqualsToUSDALimit(vars.asset, vars.compositeDebt);

		vars.ICR = AGLMath._computeCR(_tokenAmount, vars.compositeDebt, vars.price);
		vars.NICR = AGLMath._computeNominalCR(_tokenAmount, vars.compositeDebt);

		_requireICRisAboveMCR(vars.asset, vars.ICR);

		// Set the trove struct's properties
		contractsCache.troveManager.setTroveStatus(vars.asset, msg.sender, 1);
		contractsCache.troveManager.increaseTroveColl(vars.asset, msg.sender, _tokenAmount);
		contractsCache.troveManager.increaseTroveDebt(vars.asset, msg.sender, vars.compositeDebt);

		contractsCache.troveManager.updateTroveRewardSnapshots(vars.asset, msg.sender);
		vars.stake = contractsCache.troveManager.updateStakeAndTotalStakes(vars.asset, msg.sender);

		sortedTroves.insert(vars.asset, msg.sender, vars.NICR, _upperHint, _lowerHint);
		vars.arrayIndex = contractsCache.troveManager.addTroveOwnerToArray(vars.asset, msg.sender);
		emit TroveCreated(vars.asset, msg.sender, vars.arrayIndex);

		// Move the ether to the Active Pool, and mint the AGLmount to the borrower
		_activePoolAddColl(vars.asset, contractsCache.activePool, _tokenAmount);
		_withdrawUSDA(
			vars.asset,
			contractsCache.activePool,
			contractsCache.usdaToken,
			msg.sender,
			_AGLmount,
			vars.netDebt
		);
		// Move the USDA gas compensation to the Gas Pool
		_withdrawUSDA(
			vars.asset,
			contractsCache.activePool,
			contractsCache.usdaToken,
			gasPoolAddress,
			aglParams.USDA_GAS_COMPENSATION(vars.asset),
			aglParams.USDA_GAS_COMPENSATION(vars.asset)
		);

		emit TroveUpdated(
			vars.asset,
			msg.sender,
			vars.compositeDebt,
			_tokenAmount,
			vars.stake,
			BorrowerOperation.openTrove
		);
		emit USDABorrowingFeePaid(vars.asset, msg.sender, vars.USDAFee);
	}

	function setInterestManager(address _interestManager) external onlyOwner {
		interestManager = IInterestManager(_interestManager);
	}

	function setDexTrader(address _dexTrader) external onlyOwner {
		dexTrader = IAgilelyDexTrader(_dexTrader);
	}

	// Send ETH as collateral to a trove. Called by only the Stability Pool.
	function moveETHGainToTrove(
		address _asset,
		uint256 _amountMoved,
		address _borrower,
		address _upperHint,
		address _lowerHint
	) external payable override {
		require(
			stabilityPoolManager.isStabilityPool(msg.sender),
			"BorrowerOps: Caller is not Stability Pool"
		);

		_adjustTrove(
			_asset,
			getMethodValue(_asset, _amountMoved, false),
			_borrower,
			0,
			0,
			false,
			_upperHint,
			_lowerHint,
			0
		);
	}

	function adjustTrove(
		address _asset,
		uint256 _assetSent,
		uint256 _maxFeePercentage,
		uint256 _collWithdrawal,
		uint256 _USDAChange,
		bool _isDebtIncrease,
		address _upperHint,
		address _lowerHint
	) external payable override {
		_adjustTrove(
			_asset,
			getMethodValue(_asset, _assetSent, true),
			msg.sender,
			_collWithdrawal,
			_USDAChange,
			_isDebtIncrease,
			_upperHint,
			_lowerHint,
			_maxFeePercentage
		);
	}

	/*
	 * _adjustTrove(): Alongside a debt change, this function can perform either a collateral top-up or a collateral withdrawal.
	 *
	 * It therefore expects either a positive msg.value, or a positive _collWithdrawal argument.
	 *
	 * If both are positive, it will revert.
	 */
	function _adjustTrove(
		address _asset,
		uint256 _assetSent,
		address _borrower,
		uint256 _collWithdrawal,
		uint256 _USDAChange,
		bool _isDebtIncrease,
		address _upperHint,
		address _lowerHint,
		uint256 _maxFeePercentage
	) internal {
		ContractsCache memory contractsCache = ContractsCache(
			troveManager,
			aglParams.activePool(),
			usdaToken
		);
		LocalVariables_adjustTrove memory vars;
		vars.asset = _asset;

		if (_isDebtIncrease) {
			_requireLowerOrEqualsToUSDALimit(vars.asset, _USDAChange);
		}

		require(
			msg.value == 0 || msg.value == _assetSent,
			"BorrowerOp: _AssetSent and Msg.value aren't the same!"
		);

		vars.price = aglParams.priceFeed().fetchPrice(vars.asset);

		if (_isDebtIncrease) {
			_requireValidMaxFeePercentage(vars.asset, _maxFeePercentage);
			_requireNonZeroDebtChange(_USDAChange);
		}
		require(
			_collWithdrawal == 0 || _assetSent == 0,
			"BorrowerOperations: Cannot withdraw and add coll"
		);

		_requireNonZeroAdjustment(_collWithdrawal, _USDAChange, _assetSent);
		_requireTroveisActive(vars.asset, contractsCache.troveManager, _borrower);

		// Confirm the operation is either a borrower adjusting their own trove, or a pure ETH transfer from the Stability Pool to a trove
		assert(
			msg.sender == _borrower ||
				(stabilityPoolManager.isStabilityPool(msg.sender) && _assetSent > 0 && _USDAChange == 0)
		);

		contractsCache.troveManager.applyPendingRewards(vars.asset, _borrower);

		// Get the collChange based on whether or not ETH was sent in the transaction
		(vars.collChange, vars.isCollIncrease) = _getCollChange(_assetSent, _collWithdrawal);

		vars.netDebtChange = _USDAChange;

		// If the adjustment incorporates a debt increase and system is in Normal Mode, then trigger a borrowing fee
		if (_isDebtIncrease) {
			vars.USDAFee = _triggerBorrowingFee(
				vars.asset,
				contractsCache.troveManager,
				contractsCache.usdaToken,
				_USDAChange,
				_maxFeePercentage
			);
			vars.netDebtChange = vars.netDebtChange.add(vars.USDAFee); // The raw debt change includes the fee
		}

		vars.debt = contractsCache.troveManager.getTroveDebt(vars.asset, _borrower);
		vars.coll = contractsCache.troveManager.getTroveColl(vars.asset, _borrower);

		// Get the trove's old ICR before the adjustment, and what its new ICR will be after the adjustment
		vars.oldICR = AGLMath._computeCR(vars.coll, vars.debt, vars.price);
		vars.newICR = _getNewICRFromTroveChange(
			vars.coll,
			vars.debt,
			vars.collChange,
			vars.isCollIncrease,
			vars.netDebtChange,
			_isDebtIncrease,
			vars.price
		);
		require(
			_collWithdrawal <= vars.coll,
			"BorrowerOp: Trying to remove more than the trove holds"
		);

		// Check the adjustment satisfies all conditions for the current system mode
		_requireICRisAboveMCR(_asset, vars.newICR);

		// When the adjustment is a debt repayment, check it's a valid amount and that the caller has enough USDA
		if (!_isDebtIncrease && _USDAChange > 0) {
			_requireAtLeastMinNetDebt(
				vars.asset,
				_getNetDebt(vars.asset, vars.debt).sub(vars.netDebtChange)
			);

			require(
				vars.netDebtChange <= vars.debt.sub(aglParams.USDA_GAS_COMPENSATION(vars.asset)),
				"BorrowerOps: Amount repaid must not be larger than the Trove's debt"
			);

			_requireSufficientUSDABalance(contractsCache.usdaToken, _borrower, vars.netDebtChange);
		}

		(vars.newColl, vars.newDebt) = _updateTroveFromAdjustment(
			vars.asset,
			contractsCache.troveManager,
			_borrower,
			vars.collChange,
			vars.isCollIncrease,
			vars.netDebtChange,
			_isDebtIncrease
		);
		vars.stake = contractsCache.troveManager.updateStakeAndTotalStakes(vars.asset, _borrower);

		// Re-insert trove in to the sorted list
		uint256 newNICR = _getNewNominalICRFromTroveChange(
			vars.coll,
			vars.debt,
			vars.collChange,
			vars.isCollIncrease,
			vars.netDebtChange,
			_isDebtIncrease
		);
		sortedTroves.reInsert(vars.asset, _borrower, newNICR, _upperHint, _lowerHint);

		emit TroveUpdated(
			vars.asset,
			_borrower,
			vars.newDebt != 0 ? vars.newDebt : vars.debt,
			vars.newColl != 0 ? vars.newColl : vars.coll,
			vars.stake,
			BorrowerOperation.adjustTrove
		);
		emit USDABorrowingFeePaid(vars.asset, msg.sender, vars.USDAFee);

		// Use the unmodified _USDAChange here, as we don't send the fee to the user
		_moveTokensAndETHfromAdjustment(
			vars.asset,
			contractsCache.activePool,
			contractsCache.usdaToken,
			msg.sender,
			vars.collChange,
			vars.isCollIncrease,
			_USDAChange,
			_isDebtIncrease,
			vars.netDebtChange
		);
	}

	function closeTroveWithDexTrader(
		address _asset,
		uint256 _amountIn,
		IAgilelyDexTrader.ManualExchange[] calldata _manualExchange
	) external {
		_closeTrove(_asset, _amountIn, _manualExchange);
	}

	function closeTrove(address _asset) external override {
		_closeTrove(_asset, 0, new IAgilelyDexTrader.ManualExchange[](0));
	}

	function _closeTrove(
		address _asset,
		uint256 _amountIn,
		IAgilelyDexTrader.ManualExchange[] memory _manualExchange
	) internal {
		if (_asset == WETH) _asset = ETH_REF_ADDRESS;

		ITroveManager troveManagerCached = troveManager;
		IActivePool activePoolCached = aglParams.activePool();
		IUSDAToken USDATokenCached = usdaToken;

		_requireTroveisActive(_asset, troveManagerCached, msg.sender);

		troveManagerCached.applyPendingRewards(_asset, msg.sender);
		uint256 coll = troveManagerCached.getTroveColl(_asset, msg.sender);
		uint256 debt = troveManagerCached.getTroveDebt(_asset, msg.sender);

		uint256 userUSDA = USDATokenCached.balanceOf(msg.sender);
		uint256 usdaGasCompensation = aglParams.USDA_GAS_COMPENSATION(_asset);

		uint256 debtToCloseTrove = debt.sub(usdaGasCompensation);
		if (debtToCloseTrove> userUSDA) {
			uint256 amountNeeded = debtToCloseTrove - userUSDA;
			address tokenIn = _asset;

			require(
				_manualExchange.length > 0,
				"BorrowerOps: Caller doesnt have enough USDA to make repayment"
			);

			if (_amountIn == 0) {
				_amountIn = dexTrader.getAmountIn(amountNeeded, _manualExchange);
			}

			activePoolCached.unstake(_asset, msg.sender, _amountIn);
			activePoolCached.sendAsset(_asset, address(this), _amountIn);
			troveManagerCached.decreaseTroveColl(_asset, msg.sender, _amountIn);
			coll -= _amountIn;

			if (_asset == ETH_REF_ADDRESS) {
				tokenIn = address(WETH);
				IWETH(WETH).deposit{ value: _amountIn }();
			}

			IERC20Upgradeable(tokenIn).safeApprove(address(dexTrader), _amountIn);

			dexTrader.exchange(msg.sender, tokenIn, _amountIn, _manualExchange);

			require(
				USDATokenCached.balanceOf(msg.sender) >= debtToCloseTrove,
				"AutoSwapping Failed, Try increasing slippage inside ManualExchange"
			);
		}

		_requireSufficientUSDABalance(
			USDATokenCached,
			msg.sender,
			debt.sub(usdaGasCompensation)
		);

		troveManagerCached.removeStake(_asset, msg.sender);
		troveManagerCached.closeTrove(_asset, msg.sender);

		emit TroveUpdated(_asset, msg.sender, 0, 0, 0, BorrowerOperation.closeTrove);

		// Burn the repaid USDA from the user's balance and the gas compensation from the Gas Pool
		_repayUSDA(_asset, activePoolCached, USDATokenCached, msg.sender, debt.sub(usdaGasCompensation));
		_repayUSDA(_asset, activePoolCached, USDATokenCached, gasPoolAddress, usdaGasCompensation);


		// Send the collateral back to the user
		activePoolCached.sendAsset(_asset, msg.sender, coll);
	}

	/**
	 * Claim remaining collateral from a redemption or from a liquidation with ICR > MCR in Recovery Mode
	 */
	function claimCollateral(address _asset) external override {
		// send ETH from CollSurplus Pool to owner
		collSurplusPool.claimColl(_asset, msg.sender);
	}

	function claimCollaterals(address[] calldata _assets) external override {
		uint256 length = _assets.length;

		for (uint256 i = 0; i < length; ++i) {
			collSurplusPool.claimColl(_assets[i], msg.sender);
		}
	}

	// --- Helper functions ---

	function _triggerBorrowingFee(
		address _asset,
		ITroveManager _troveManager,
		IUSDAToken _usdaToken,
		uint256 _AGLmount,
		uint256 _maxFeePercentage
	) internal returns (uint256) {
		_troveManager.decayBaseRateFromBorrowing(_asset); // decay the baseRate state variable
		uint256 USDAFee = _troveManager.getBorrowingFee(_asset, _AGLmount);

		_requireUserAcceptsFee(USDAFee, _AGLmount, _maxFeePercentage);

		// Send fee to AGL staking contract
		_usdaToken.mint(_asset, AGLStakingAddress, USDAFee);
		AGLStaking.increaseF_USDA(USDAFee);

		return USDAFee;
	}

	function _getUSDValue(uint256 _coll, uint256 _price) internal pure returns (uint256) {
		uint256 usdValue = _price.mul(_coll).div(DECIMAL_PRECISION);

		return usdValue;
	}

	function _getCollChange(uint256 _collReceived, uint256 _requestedCollWithdrawal)
		internal
		pure
		returns (uint256 collChange, bool isCollIncrease)
	{
		if (_collReceived != 0) {
			collChange = _collReceived;
			isCollIncrease = true;
		} else {
			collChange = _requestedCollWithdrawal;
		}
	}

	// Update trove's coll and debt based on whether they increase or decrease
	function _updateTroveFromAdjustment(
		address _asset,
		ITroveManager _troveManager,
		address _borrower,
		uint256 _collChange,
		bool _isCollIncrease,
		uint256 _debtChange,
		bool _isDebtIncrease
	) internal returns (uint256 newColl, uint256 newDebt) {
		if (_collChange != 0) {
			newColl = (_isCollIncrease)
				? _troveManager.increaseTroveColl(_asset, _borrower, _collChange)
				: _troveManager.decreaseTroveColl(_asset, _borrower, _collChange);
		}

		if (_debtChange != 0) {
			newDebt = (_isDebtIncrease)
				? _troveManager.increaseTroveDebt(_asset, _borrower, _debtChange)
				: _troveManager.decreaseTroveDebt(_asset, _borrower, _debtChange);
		}

		return (newColl, newDebt);
	}

	function _moveTokensAndETHfromAdjustment(
		address _asset,
		IActivePool _activePool,
		IUSDAToken _usdaToken,
		address _borrower,
		uint256 _collChange,
		bool _isCollIncrease,
		uint256 _USDAChange,
		bool _isDebtIncrease,
		uint256 _netDebtChange
	) internal {
		if (_isDebtIncrease) {
			_withdrawUSDA(_asset, _activePool, _usdaToken, _borrower, _USDAChange, _netDebtChange);
		} else {
			_repayUSDA(_asset, _activePool, _usdaToken, _borrower, _USDAChange);
		}

		if (_isCollIncrease) {
			_activePoolAddColl(_asset, _activePool, _collChange);
		} else {
			_activePool.unstake(_asset, _borrower, _collChange);
			_activePool.sendAsset(_asset, _borrower, _collChange);
		}
	}

	// Send ETH to Active Pool and increase its recorded ETH balance
	function _activePoolAddColl(
		address _asset,
		IActivePool _activePool,
		uint256 _amount
	) internal {
		if (_asset == ETH_REF_ADDRESS) {
			(bool success, ) = address(_activePool).call{ value: _amount }("");
			require(success, "BorrowerOps: Sending ETH to ActivePool failed");
		} else {
			IERC20Upgradeable(_asset).safeTransferFrom(
				msg.sender,
				address(_activePool),
				SafetyTransfer.decimalsCorrection(_asset, _amount)
			);

			_activePool.receivedERC20(_asset, _amount);
			_activePool.stake(_asset, msg.sender, _amount);
		}
	}

	// Issue the specified amount of USDA to _account and increases the total active debt (_netDebtIncrease potentially includes a USDAFee)
	function _withdrawUSDA(
		address _asset,
		IActivePool _activePool,
		IUSDAToken _usdaToken,
		address _account,
		uint256 _AGLmount,
		uint256 _netDebtIncrease
	) internal {
		_activePool.increaseUSDADebt(_asset, _netDebtIncrease);
		_usdaToken.mint(_asset, _account, _AGLmount);
	}

	// Burn the specified amount of USDA from _account and decreases the total active debt
	function _repayUSDA(
		address _asset,
		IActivePool _activePool,
		IUSDAToken _usdaToken,
		address _account,
		uint256 _USDA
	) internal {
		_activePool.decreaseUSDADebt(_asset, _USDA);
		_usdaToken.burn(_account, _USDA);
	}

	function setAGLccess(address _of, bool _enable) external onlyOwner {
		require(_of.code.length > 0, "Only contracts");
		hasAGLccess[_of] = _enable;
	}

	function mint(address _to, uint256 _amount) external {
		require(hasAGLccess[msg.sender], "No Access");
		usdaToken.mint(address(0), _to, _amount);
	}

	function burn(address _from, uint256 _amount) external {
		require(hasAGLccess[msg.sender], "No Access");
		usdaToken.burn(_from, _amount);
	}

	// --- 'Require' wrapper functions ---

	function _requireCallerIsBorrower(address _borrower) internal view {
		require(
			msg.sender == _borrower,
			"BorrowerOps: Caller must be the borrower for a withdrawal"
		);
	}

	function _requireNonZeroAdjustment(
		uint256 _collWithdrawal,
		uint256 _USDAChange,
		uint256 _assetSent
	) internal view {
		require(
			msg.value != 0 || _collWithdrawal != 0 || _USDAChange != 0 || _assetSent != 0,
			"BorrowerOps: There must be either a collateral change or a debt change"
		);
	}

	function _requireTroveisActive(
		address _asset,
		ITroveManager _troveManager,
		address _borrower
	) internal view {
		uint256 status = _troveManager.getTroveStatus(_asset, _borrower);
		require(status == 1, "BorrowerOps: Trove does not exist or is closed");
	}

	function _requireTroveisNotActive(
		address _asset,
		ITroveManager _troveManager,
		address _borrower
	) internal view {
		uint256 status = _troveManager.getTroveStatus(_asset, _borrower);
		require(status != 1, "BorrowerOps: Trove is active");
	}

	function _requireNonZeroDebtChange(uint256 _USDAChange) internal pure {
		require(_USDAChange > 0, "BorrowerOps: Debt increase requires non-zero debtChange");
	}

	function _requireNotInRecoveryMode(address _asset, uint256 _price) internal view {
		require(
			!_checkRecoveryMode(_asset, _price),
			"BorrowerOps: Operation not permitted during Recovery Mode"
		);
	}

	function _requireNoCollWithdrawal(uint256 _collWithdrawal) internal pure {
		require(
			_collWithdrawal == 0,
			"BorrowerOps: Collateral withdrawal not permitted Recovery Mode"
		);
	}

	function _requireICRisAboveMCR(address _asset, uint256 _newICR) internal view {
		require(
			_newICR >= aglParams.MCR(_asset),
			"BorrowerOps: An operation that would result in ICR < MCR is not permitted"
		);
	}

	function _requireAtLeastMinNetDebt(address _asset, uint256 _netDebt) internal view {
		require(
			_netDebt >= aglParams.MIN_NET_DEBT(_asset),
			"BorrowerOps: Trove's net debt must be greater than minimum"
		);
	}

	function _requireSufficientUSDABalance(
		IUSDAToken _usdaToken,
		address _borrower,
		uint256 _debtRepayment
	) internal view {
		require(
			_usdaToken.balanceOf(_borrower) >= _debtRepayment,
			"BorrowerOps: Caller doesnt have enough USDA to make repayment"
		);
	}

	function _requireValidMaxFeePercentage(address _asset, uint256 _maxFeePercentage)
		internal
		view
	{
		require(
			_maxFeePercentage >= aglParams.BORROWING_FEE_FLOOR(_asset) &&
				_maxFeePercentage <= aglParams.DECIMAL_PRECISION(),
			"Max fee percentage must be between 0.5% and 100%"
		);
	}

	function _requireLowerOrEqualsToUSDALimit(address _asset, uint256 _usdaChange) internal view {
		uint256 usdaLimit = aglParams.usdaMintCap(_asset);
		uint256 newDebt = getEntireSystemDebt(_asset) + _usdaChange;
		uint256 unpaidInterest = troveManager.getSystemTotalUnpaidInterest(_asset);

		if (usdaLimit != 0) {
			require(usdaLimit >= (newDebt - unpaidInterest), "Reached the cap limit of usda.");
		}
	}

	// --- ICR and TCR getters ---

	// Compute the new collateral ratio, considering the change in coll and debt. Assumes 0 pending rewards.
	function _getNewNominalICRFromTroveChange(
		uint256 _coll,
		uint256 _debt,
		uint256 _collChange,
		bool _isCollIncrease,
		uint256 _debtChange,
		bool _isDebtIncrease
	) internal pure returns (uint256) {
		(uint256 newColl, uint256 newDebt) = _getNewTroveAmounts(
			_coll,
			_debt,
			_collChange,
			_isCollIncrease,
			_debtChange,
			_isDebtIncrease
		);

		uint256 newNICR = AGLMath._computeNominalCR(newColl, newDebt);
		return newNICR;
	}

	// Compute the new collateral ratio, considering the change in coll and debt. Assumes 0 pending rewards.
	function _getNewICRFromTroveChange(
		uint256 _coll,
		uint256 _debt,
		uint256 _collChange,
		bool _isCollIncrease,
		uint256 _debtChange,
		bool _isDebtIncrease,
		uint256 _price
	) internal pure returns (uint256) {
		(uint256 newColl, uint256 newDebt) = _getNewTroveAmounts(
			_coll,
			_debt,
			_collChange,
			_isCollIncrease,
			_debtChange,
			_isDebtIncrease
		);

		uint256 newICR = AGLMath._computeCR(newColl, newDebt, _price);
		return newICR;
	}

	function _getNewTroveAmounts(
		uint256 _coll,
		uint256 _debt,
		uint256 _collChange,
		bool _isCollIncrease,
		uint256 _debtChange,
		bool _isDebtIncrease
	) internal pure returns (uint256, uint256) {
		uint256 newColl = _coll;
		uint256 newDebt = _debt;

		newColl = _isCollIncrease ? _coll.add(_collChange) : _coll.sub(_collChange);
		newDebt = _isDebtIncrease ? _debt.add(_debtChange) : _debt.sub(_debtChange);

		return (newColl, newDebt);
	}

	function getCompositeDebt(address _asset, uint256 _debt)
		external
		view
		override
		returns (uint256)
	{
		return _getCompositeDebt(_asset, _debt);
	}

	function getMethodValue(
		address _asset,
		uint256 _amount,
		bool canBeZero
	) private view returns (uint256) {
		bool isEth = _asset == address(0);

		require(
			(canBeZero || (isEth && msg.value != 0)) || (!isEth && msg.value == 0),
			"BorrowerOp: Invalid Input. Override msg.value only if using ETH asset, otherwise use _tokenAmount"
		);

		if (_asset == address(0)) {
			_amount = msg.value;
		}

		return _amount;
	}

	receive() external payable {}
}

