 // SPDX-License-Identifier: MIT

 pragma solidity ^0.8.10;
 import "./AGLBase.sol";
 import "./TroveManagerModel.sol";
 import "../Interfaces/ISortedTroves.sol";
 import "../Interfaces/IRedemption.sol";
 import "../Interfaces/IAGLParameters.sol";
 import "../Dependencies/CheckContract.sol";
 import "../Interfaces/ITroveManager.sol";
 import "../Interfaces/IHintHelpers.sol";


 contract TroveRedemptor is AGLBase, IRedemption, CheckContract {
 	using SafeMathUpgradeable for uint256;


	 enum TroveManagerOperation {
		 applyPendingRewards,
		 liquidateInNormalMode,
		 liquidateInRecoveryMode,
		 redeemCollateral,
		 systemUpdate
	 }

	 struct ContractsCache {
		 IActivePool activePool;
		 IDefaultPool defaultPool;
		 IUSDAToken usdaToken;
		 IAGLStaking aglStaking;
		 ISortedTroves sortedTroves;
		 ICollSurplusPool collSurplusPool;
		 address gasPoolAddress;
	 }

	 ITroveManager private troveManager;
 	 ISortedTroves private sortedTroves;
 	 IUSDAToken private usdaToken;
     IAGLParameters private agilelyParams;
	 ICollSurplusPool collSurplusPool;
	 address gasPoolAddress;
	 IAGLStaking public  aglStaking;
 	 IHintHelpers public hintHelpers;


	 event TroveUpdated(
		 address indexed _asset,
		 address indexed _borrower,
		 uint256 _debt,
		 uint256 _coll,
		 uint256 _stake,
		 TroveManagerOperation _operation
	 );

	 event Redemption(
		 address indexed _asset,
		 uint256 _attemptedAGLmount,
		 uint256 _actualAGLmount,
		 uint256 _AssetSent,
		 uint256 _AssetFee
	 );

	 modifier onlyTroveManager() {
 		require(msg.sender == address(troveManager), "Only trove manager");
 		_;
 	}

 	function setUp(
 		address _troveManager,
 		address _sortedTroves,
 		address _usdaToken,
 		address _agilelyParameters,
 		address _collSurplusPoolAddress,
 		address _gasPoolAddress,
 		address _aglStakingAddress,
 		address _hintHelpersAddress
 ) external initializer {
		checkContract(_troveManager);
		checkContract(_sortedTroves);
		checkContract(_usdaToken);
		checkContract(_agilelyParameters);
		checkContract(_collSurplusPoolAddress);
		checkContract(_gasPoolAddress);
		checkContract(_aglStakingAddress);
		checkContract(_hintHelpersAddress);


		troveManager = ITroveManager(_troveManager);
		agilelyParams = IAGLParameters(_agilelyParameters);
		usdaToken = IUSDAToken(_usdaToken);
 		sortedTroves = ISortedTroves(_sortedTroves);
		collSurplusPool = ICollSurplusPool(_collSurplusPoolAddress);
		gasPoolAddress = _gasPoolAddress;
		aglStaking = IAGLStaking(_aglStakingAddress);
		hintHelpers = IHintHelpers(_hintHelpersAddress);
		__Ownable_init();
	}

	 function AutoRedeemCollateral(
		 address _asset,
		 address _caller,
		 uint256 _USDAAmount,
		 uint256 _maxIterations,
		 uint256 _maxFeePercentage
	 ) public {
		 uint256 price = agilelyParams.priceFeed().fetchPrice(_asset);
		 (address firstRedemptionHint, uint256 partialRedemptionHintNICR, uint256 truncatedUSDAamount  ) = hintHelpers.getRedemptionHints(_asset, _USDAAmount, price, _maxFeePercentage);
		 redeemCollateral(
			 _asset,
			 _caller,
			 truncatedUSDAamount,
			 firstRedemptionHint,
			 address(0),
			 address(0),
			 partialRedemptionHintNICR,
			 _maxIterations,
			 _maxFeePercentage);
	 }

 	function redeemCollateral(
 		address _asset,
 		address _caller,
 		uint256 _USDAAmount,
 		address _firstRedemptionHint,
 		address _upperPartialRedemptionHint,
 		address _lowerPartialRedemptionHint,
 		uint256 _partialRedemptionHintNICR,
 		uint256 _maxIterations,
 		uint256 _maxFeePercentage
 	) public override  {
 		RedemptionTotals memory totals;
 		require(
 			_maxFeePercentage >= agilelyParams.REDEMPTION_FEE_FLOOR(_asset) &&
 				_maxFeePercentage <= DECIMAL_PRECISION,
 			"Max fee percentage must be between minimum and 100%"
 		);

 		totals.price = agilelyParams.priceFeed().fetchPrice(_asset);
 		require(
 			_getTCR(_asset, totals.price) >= agilelyParams.MCR(_asset),
 			"TroveManager: Cannot redeem when TCR < MCR"
 		);

 		require(_USDAAmount > 0, "TroveManager: Amount must be greater than zero");
 		_requireVSTBalanceCoversRedemption(_caller, _USDAAmount);

 		totals.totalUSDASupplyAtStart = getEntireSystemDebt(_asset);
 		totals.remainingUSDA = _USDAAmount;
 		address currentBorrower;

 		if (_isValidFirstRedemptionHint(_asset, _firstRedemptionHint, totals.price)) {
 			currentBorrower = _firstRedemptionHint;
 		} else {
 			currentBorrower = sortedTroves.getLast(_asset);
 			// Find the first trove with ICR >= MCR
 			while (
 				currentBorrower != address(0) &&
 				troveManager.getCurrentICR(_asset, currentBorrower, totals.price) <
				agilelyParams.MCR(_asset)
 			) {
 				currentBorrower = sortedTroves.getPrev(_asset, currentBorrower);
 			}
 		}

 		// Loop through the Troves starting from the one with lowest collateral ratio until _amount of VST is exchanged for collateral
 		if (_maxIterations == 0) {
 			_maxIterations = type(uint256).max;
 		}
 		while (currentBorrower != address(0) && totals.remainingUSDA > 0 && _maxIterations > 0) {
 			_maxIterations--;
 			// Save the address of the Trove preceding the current one, before potentially modifying the list
 			address nextUserToCheck = sortedTroves.getPrev(_asset, currentBorrower);

 			troveManager.applyPendingRewards(_asset, currentBorrower);

 			SingleRedemptionValues memory singleRedemption = _redeemCollateralFromTrove(
 				_asset,
 				currentBorrower,
 				totals.remainingUSDA,
 				totals.price,
 				_upperPartialRedemptionHint,
 				_lowerPartialRedemptionHint,
 				_partialRedemptionHintNICR
 			);

 			if (singleRedemption.cancelledPartial) break; // Partial redemption was cancelled (out-of-date hint, or new net debt < minimum), therefore we could not redeem from the last Trove

 			totals.totalUSDAToRedeem = totals.totalUSDAToRedeem.add(singleRedemption.USDALot);
 			totals.totalAssetDrawn = totals.totalAssetDrawn.add(singleRedemption.AssetLot);

 			totals.remainingUSDA = totals.remainingUSDA.sub(singleRedemption.USDALot);
 			currentBorrower = nextUserToCheck;
 		}
 		require(totals.totalAssetDrawn > 0, "TroveManager: Unable to redeem any amount");

 		// Decay the baseRate due to time passed, and then increase it according to the size of this redemption.
 		// Use the saved total VST supply value, from before it was reduced by the redemption.
 		troveManager.updateBaseRateFromRedemption(
 			_asset,
 			totals.totalAssetDrawn,
 			totals.price,
 			totals.totalUSDASupplyAtStart
 		);

 		// Calculate the ETH fee
 		totals.AssetFee = troveManager.getRedemptionFee(_asset, totals.totalAssetDrawn);

 		_requireUserAcceptsFee(totals.AssetFee, totals.totalAssetDrawn, _maxFeePercentage);

		ContractsCache memory contractsCache = ContractsCache(
			aglParams.activePool(),
			aglParams.defaultPool(),
			usdaToken,
			aglStaking,
			sortedTroves,
			collSurplusPool,
			gasPoolAddress
		);
		contractsCache.activePool.sendAsset(_asset, address(contractsCache.aglStaking), totals.AssetFee);
		contractsCache.aglStaking.increaseF_Asset(_asset, totals.AssetFee);

		uint256 assetSendToRedeemer = totals.totalAssetDrawn.sub(totals.AssetFee);
		emit Redemption(_asset,  _USDAAmount, totals.totalUSDAToRedeem,  totals.totalAssetDrawn, totals.AssetFee);
		contractsCache.usdaToken.burn(_caller, totals.totalUSDAToRedeem);
		contractsCache.activePool.decreaseUSDADebt(_asset, totals.totalUSDAToRedeem);
		contractsCache.activePool.sendAsset(_asset, _caller, assetSendToRedeemer);

 	}

 	// Redeem as much collateral as possible from _borrower's Trove in exchange for VST up to _maxVSTamount
 	function _redeemCollateralFromTrove(
 		address _asset,
 		address _borrower,
 		uint256 _maxUSDAAmount,
 		uint256 _price,
 		address _upperPartialRedemptionHint,
 		address _lowerPartialRedemptionHint,
 		uint256 _partialRedemptionHintNICR
 	) internal returns (SingleRedemptionValues memory singleRedemption) {
 		LocalVariables_AssetBorrowerPrice memory vars = LocalVariables_AssetBorrowerPrice(
 			_asset,
 			_borrower,
 			_price,
 			_upperPartialRedemptionHint,
 			_lowerPartialRedemptionHint
 		);

 		uint256 vaultDebt = troveManager.getTroveDebt(vars._asset, vars._borrower);
 		uint256 vaultColl = troveManager.getTroveColl(vars._asset, vars._borrower);

 		// Determine the remaining amount (lot) to be redeemed, capped by the entire debt of the Trove minus the liquidation reserve
 		singleRedemption.USDALot = AGLMath._min(
			_maxUSDAAmount,
 			vaultDebt.sub(agilelyParams.USDA_GAS_COMPENSATION(_asset))
 		);

 		// Get the ETHLot of equivalent value in USD
 		singleRedemption.AssetLot = singleRedemption.USDALot.mul(DECIMAL_PRECISION).div(_price);

 		// Decrease the debt and collateral of the current Trove according to the VST lot and corresponding ETH to send

 		uint256 newDebt = (vaultDebt).sub(singleRedemption.USDALot);
 		uint256 newColl = (vaultColl).sub(singleRedemption.AssetLot);

 		if (newDebt == agilelyParams.USDA_GAS_COMPENSATION(_asset)) {
			troveManager.removeStake(vars._asset, vars._borrower);
			troveManager.closeTroveByRedemptor(vars._asset, vars._borrower);
			(, uint256 troveDebt , , , , ) = troveManager.Troves(vars._borrower, vars._asset);
			_redeemCloseTrove(vars._asset, vars._borrower, troveDebt, newColl);
			emit TroveUpdated(vars._asset, vars._borrower, 0, 0, 0, TroveManagerOperation.redeemCollateral);
		} else {
 			uint256 newNICR = AGLMath._computeNominalCR(newColl, newDebt);

	/*       * If the provided hint is out of date, we bail since trying to reinsert without a good hint will almost
 			 * certainly result in running out of gas.
 			 *
 			 * If the resultant net debt of the partial is less than the minimum, net debt we bail.
*/


 			if (
 				newNICR != _partialRedemptionHintNICR ||
 				_getNetDebt(vars._asset, newDebt) < agilelyParams.MIN_NET_DEBT(vars._asset)
 			) {
 				singleRedemption.cancelledPartial = true;
 				return singleRedemption;
 			}

			sortedTroves.reInsert(vars._asset, vars._borrower, newNICR, vars._upper, vars._lower);
			troveManager.setTroveCollAndDebt(vars._borrower, vars._asset, newDebt, newColl);
			troveManager.updateStakeAndTotalStakes(vars._asset, vars._borrower);
			(, , ,uint256 stake , , ) = troveManager.Troves(vars._borrower, vars._asset);
			emit TroveUpdated(vars._asset, vars._borrower, newDebt, newColl, stake, TroveManagerOperation.redeemCollateral);
 		}

 		return singleRedemption;
 	}

 	function _requireVSTBalanceCoversRedemption(address _redeemer, uint256 _amount)
 		internal
 		view
 	{
 		require(
			usdaToken.balanceOf(_redeemer) >= _amount,
 			"TroveManager: Requested redemption amount must be <= user's VST token balance"
 		);
 	}


	 function _isValidFirstRedemptionHint(address _asset, address _firstRedemptionHint, uint256 _price)
	 internal
	 view
	 returns (bool)
	 {
		 uint256 assetMCR = aglParams.MCR(_asset);
		 if(_firstRedemptionHint == address(0) ||
			 !sortedTroves.contains(_asset, _firstRedemptionHint) ||
			 troveManager.getCurrentICR(_asset, _firstRedemptionHint, _price) < assetMCR){
			 return false;
		 }
		 address nextTrove = sortedTroves.getNext(_asset, _firstRedemptionHint);
		 return nextTrove == address(0) ||  troveManager.getCurrentICR(_asset, nextTrove, _price) < assetMCR;
	 }


	 function _redeemCloseTrove(address _asset,  address _borrower, uint _USDA, uint _assetAmount) internal {

		 ContractsCache memory contractsCache = ContractsCache(
			 aglParams.activePool(),
			 aglParams.defaultPool(),
			 usdaToken,
			 aglStaking,
			 sortedTroves,
			 collSurplusPool,
			 gasPoolAddress
		 );

		 contractsCache.usdaToken.burn(gasPoolAddress, _USDA);
		 // Update Active Pool LUSD, and send ETH to account
		 contractsCache.activePool.decreaseUSDADebt(_asset, _USDA);

		 // send ETH from Active Pool to CollSurplus Pool
		 contractsCache.collSurplusPool.accountSurplus(_asset ,_borrower, _assetAmount);
		 contractsCache.activePool.sendAsset(_asset,address(contractsCache.collSurplusPool), _assetAmount);

	 }

 }
