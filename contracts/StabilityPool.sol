// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./Interfaces/IBorrowerOperations.sol";
import "./Interfaces/IStabilityPool.sol";
import "./Interfaces/IBorrowerOperations.sol";
import "./Interfaces/ITroveManager.sol";
import "./Interfaces/IVSTToken.sol";
import "./Interfaces/ISortedTroves.sol";
import "./Interfaces/ICommunityIssuance.sol";
import "./Dependencies/VestaBase.sol";
import "./Dependencies/LiquitySafeMath128.sol";
import "./Dependencies/CheckContract.sol";

import "hardhat/console.sol";

/*
 * The Stability Pool holds VST tokens deposited by Stability Pool depositors.
 *
 * When a trove is liquidated, then depending on system conditions, some of its VST debt gets offset with
 * VST in the Stability Pool:  that is, the offset debt evaporates, and an equal amount of VST tokens in the Stability Pool is burned.
 *
 * Thus, a liquidation causes each depositor to receive a VST loss, in proportion to their deposit as a share of total deposits.
 * They also receive an ETH gain, as the ETH collateral of the liquidated trove is distributed among Stability depositors,
 * in the same proportion.
 *
 * When a liquidation occurs, it depletes every deposit by the same fraction: for example, a liquidation that depletes 40%
 * of the total VST in the Stability Pool, depletes 40% of each deposit.
 *
 * A deposit that has experienced a series of liquidations is termed a "compounded deposit": each liquidation depletes the deposit,
 * multiplying it by some factor in range ]0,1[
 *
 *
 * --- IMPLEMENTATION ---
 *
 * We use a highly scalable method of tracking deposits and ETH gains that has O(1) complexity.
 *
 * When a liquidation occurs, rather than updating each depositor's deposit and ETH gain, we simply update two state variables:
 * a product P, and a sum S.
 *
 * A mathematical manipulation allows us to factor out the initial deposit, and accurately track all depositors' compounded deposits
 * and accumulated ETH gains over time, as liquidations occur, using just these two variables P and S. When depositors join the
 * Stability Pool, they get a snapshot of the latest P and S: P_t and S_t, respectively.
 *
 * The formula for a depositor's accumulated ETH gain is derived here:
 * https://github.com/liquity/dev/blob/main/packages/contracts/mathProofs/Scalable%20Compounding%20Stability%20Pool%20Deposits.pdf
 *
 * For a given deposit d_t, the ratio P/P_t tells us the factor by which a deposit has decreased since it joined the Stability Pool,
 * and the term d_t * (S - S_t)/P_t gives us the deposit's total accumulated ETH gain.
 *
 * Each liquidation updates the product P and sum S. After a series of liquidations, a compounded deposit and corresponding ETH gain
 * can be calculated using the initial deposit, the depositor’s snapshots of P and S, and the latest values of P and S.
 *
 * Any time a depositor updates their deposit (withdrawal, top-up) their accumulated ETH gain is paid out, their new deposit is recorded
 * (based on their latest compounded deposit and modified by the withdrawal/top-up), and they receive new snapshots of the latest P and S.
 * Essentially, they make a fresh deposit that overwrites the old one.
 *
 *
 * --- SCALE FACTOR ---
 *
 * Since P is a running product in range ]0,1] that is always-decreasing, it should never reach 0 when multiplied by a number in range ]0,1[.
 * Unfortunately, Solidity floor division always reaches 0, sooner or later.
 *
 * A series of liquidations that nearly empty the Pool (and thus each multiply P by a very small number in range ]0,1[ ) may push P
 * to its 18 digit decimal limit, and round it to 0, when in fact the Pool hasn't been emptied: this would break deposit tracking.
 *
 * So, to track P accurately, we use a scale factor: if a liquidation would cause P to decrease to <1e-9 (and be rounded to 0 by Solidity),
 * we first multiply P by 1e9, and increment a currentScale factor by 1.
 *
 * The added benefit of using 1e9 for the scale factor (rather than 1e18) is that it ensures negligible precision loss close to the
 * scale boundary: when P is at its minimum value of 1e9, the relative precision loss in P due to floor division is only on the
 * order of 1e-9.
 *
 * --- EPOCHS ---
 *
 * Whenever a liquidation fully empties the Stability Pool, all deposits should become 0. However, setting P to 0 would make P be 0
 * forever, and break all future reward calculations.
 *
 * So, every time the Stability Pool is emptied by a liquidation, we reset P = 1 and currentScale = 0, and increment the currentEpoch by 1.
 *
 * --- TRACKING DEPOSIT OVER SCALE CHANGES AND EPOCHS ---
 *
 * When a deposit is made, it gets snapshots of the currentEpoch and the currentScale.
 *
 * When calculating a compounded deposit, we compare the current epoch to the deposit's epoch snapshot. If the current epoch is newer,
 * then the deposit was present during a pool-emptying liquidation, and necessarily has been depleted to 0.
 *
 * Otherwise, we then compare the current scale to the deposit's scale snapshot. If they're equal, the compounded deposit is given by d_t * P/P_t.
 * If it spans one scale change, it is given by d_t * P/(P_t * 1e9). If it spans more than one scale change, we define the compounded deposit
 * as 0, since it is now less than 1e-9'th of its initial value (e.g. a deposit of 1 billion VST has depleted to < 1 VST).
 *
 *
 *  --- TRACKING DEPOSITOR'S ETH GAIN OVER SCALE CHANGES AND EPOCHS ---
 *
 * In the current epoch, the latest value of S is stored upon each scale change, and the mapping (scale -> S) is stored for each epoch.
 *
 * This allows us to calculate a deposit's accumulated ETH gain, during the epoch in which the deposit was non-zero and earned ETH.
 *
 * We calculate the depositor's accumulated ETH gain for the scale at which they made the deposit, using the ETH gain formula:
 * e_1 = d_t * (S - S_t) / P_t
 *
 * and also for scale after, taking care to divide the latter by a factor of 1e9:
 * e_2 = d_t * S / (P_t * 1e9)
 *
 * The gain in the second scale will be full, as the starting point was in the previous scale, thus no need to subtract anything.
 * The deposit therefore was present for reward events from the beginning of that second scale.
 *
 *        S_i-S_t + S_{i+1}
 *      .<--------.------------>
 *      .         .
 *      . S_i     .   S_{i+1}
 *   <--.-------->.<----------->
 *   S_t.         .
 *   <->.         .
 *      t         .
 *  |---+---------|-------------|-----...
 *         i            i+1
 *
 * The sum of (e_1 + e_2) captures the depositor's total accumulated ETH gain, handling the case where their
 * deposit spanned one scale change. We only care about gains across one scale change, since the compounded
 * deposit is defined as being 0 once it has spanned more than one scale change.
 *
 *
 * --- UPDATING P WHEN A LIQUIDATION OCCURS ---
 *
 * Please see the implementation spec in the proof document, which closely follows on from the compounded deposit / ETH gain derivations:
 * https://github.com/liquity/liquity/blob/master/papers/Scalable_Reward_Distribution_with_Compounding_Stakes.pdf
 *
 *
 * --- VSTA ISSUANCE TO STABILITY POOL DEPOSITORS ---
 *
 * An VSTA issuance event occurs at every deposit operation, and every liquidation.
 *
 *
 * All deposits earn a share of the issued VSTA in proportion to the deposit as a share of total deposits. The VSTA earned
 * by a given deposit.
 *
 * Please see the system Readme for an overview:
 * https://github.com/liquity/dev/blob/main/README.md#VSTA-issuance-to-stability-providers
 *
 * We use the same mathematical product-sum approach to track VSTA gains for depositors, where 'G' is the sum corresponding to VSTA gains.
 * The product P (and snapshot P_t) is re-used, as the ratio P/P_t tracks a deposit's depletion due to liquidations.
 *
 */
contract StabilityPool is VestaBase, CheckContract, IStabilityPool {
	using SafeMath for uint256;
	using LiquitySafeMath128 for uint128;
	using SafeERC20 for IERC20;

	string public constant NAME = "StabilityPool";

	IBorrowerOperations public borrowerOperations;

	ITroveManager public troveManager;

	IVSTToken public vstToken;

	// Needed to check if there are pending liquidations
	ISortedTroves public sortedTroves;

	ICommunityIssuance public communityIssuance;

	address internal assetAddress;

	uint256 internal assetBalance; // deposited ether tracker

	// Tracker for VST held in the pool. Changes when users deposit/withdraw, and when Trove debt is offset.
	uint256 internal totalVSTDeposits;

	// --- Data structures ---

	struct Snapshots {
		uint256 S;
		uint256 P;
		uint256 G;
		uint128 scale;
		uint128 epoch;
	}

	mapping(address => uint256) public deposits; // depositor address -> Deposit struct
	mapping(address => Snapshots) public depositSnapshots; // depositor address -> snapshots struct

	uint256 public totalStakes;
	Snapshots public systemSnapshots;

	/*  Product 'P': Running product by which to multiply an initial deposit, in order to find the current compounded deposit,
	 * after a series of liquidations have occurred, each of which cancel some VST debt with the deposit.
	 *
	 * During its lifetime, a deposit's value evolves from d_t to d_t * P / P_t , where P_t
	 * is the snapshot of P taken at the instant the deposit was made. 18-digit decimal.
	 */
	uint256 public P = DECIMAL_PRECISION;

	uint256 public constant SCALE_FACTOR = 1e9;

	// Each time the scale of P shifts by SCALE_FACTOR, the scale is incremented by 1
	uint128 public currentScale;

	// With each offset that fully empties the Pool, the epoch is incremented by 1
	uint128 public currentEpoch;

	/* ETH Gain sum 'S': During its lifetime, each deposit d_t earns an ETH gain of ( d_t * [S - S_t] )/P_t, where S_t
	 * is the depositor's snapshot of S taken at the time t when the deposit was made.
	 *
	 * The 'S' sums are stored in a nested mapping (epoch => scale => sum):
	 *
	 * - The inner mapping records the sum S at different scales
	 * - The outer mapping records the (scale => sum) mappings, for different epochs.
	 */
	mapping(uint128 => mapping(uint128 => uint256)) public epochToScaleToSum;

	/*
	 * Similarly, the sum 'G' is used to calculate VSTA gains. During it's lifetime, each deposit d_t earns a VSTA gain of
	 *  ( d_t * [G - G_t] )/P_t, where G_t is the depositor's snapshot of G taken at time t when  the deposit was made.
	 *
	 *  VSTA reward events occur are triggered by depositor operations (new deposit, topup, withdrawal), and liquidations.
	 *  In each case, the VSTA reward is issued (i.e. G is updated), before other state changes are made.
	 */
	mapping(uint128 => mapping(uint128 => uint256)) public epochToScaleToG;

	// Error tracker for the error correction in the VSTA issuance calculation
	uint256 public lastVSTAError;
	// Error trackers for the error correction in the offset calculation
	uint256 public lastAssetError_Offset;
	uint256 public lastVSTLossError_Offset;
	bool public isInitialized;

	// --- Contract setters ---

	function setAddresses(
		address _assetAddress,
		address _borrowerOperationsAddress,
		address _troveManagerAddress,
		address _vstTokenAddress,
		address _sortedTrovesAddress,
		address _communityIssuanceAddress,
		address _vestaParamsAddress
	) external override onlyOwner {
		require(!isInitialized, "Already initialized");
		checkContract(_borrowerOperationsAddress);
		checkContract(_troveManagerAddress);
		checkContract(_vstTokenAddress);
		checkContract(_sortedTrovesAddress);
		checkContract(_communityIssuanceAddress);
		checkContract(_vestaParamsAddress);
		isInitialized = true;

		if (_assetAddress != ETH_REF_ADDRESS) {
			checkContract(_assetAddress);
		}

		assetAddress = _assetAddress;
		borrowerOperations = IBorrowerOperations(_borrowerOperationsAddress);
		troveManager = ITroveManager(_troveManagerAddress);
		vstToken = IVSTToken(_vstTokenAddress);
		sortedTroves = ISortedTroves(_sortedTrovesAddress);
		communityIssuance = ICommunityIssuance(_communityIssuanceAddress);

		setVestaParameters(_vestaParamsAddress);
		vestaParams.sanitizeParameters(assetAddress);
		assert(vestaParams.MIN_NET_DEBT(assetAddress) > 0);

		emit BorrowerOperationsAddressChanged(_borrowerOperationsAddress);
		emit TroveManagerAddressChanged(_troveManagerAddress);
		emit VSTTokenAddressChanged(_vstTokenAddress);
		emit SortedTrovesAddressChanged(_sortedTrovesAddress);
		emit CommunityIssuanceAddressChanged(_communityIssuanceAddress);
	}

	// --- Getters for public variables. Required by IPool interface ---

	function getAssetBalance() external view override returns (uint256) {
		return assetBalance;
	}

	function getTotalVSTDeposits() external view override returns (uint256) {
		return totalVSTDeposits;
	}

	// --- External Depositor Functions ---

	/*  provideToSP():
	 *
	 * - Triggers a VSTA issuance, based on time passed since the last issuance. The VSTA issuance is shared between *all* depositors
	 * - Sends depositor's accumulated gains (VSTA, ETH) to depositor
	 * - Increases deposit and system stake, and takes new snapshots for each.
	 */
	function provideToSP(uint256 _amount) external override {
		_requireNonZeroAmount(_amount);

		uint256 initialDeposit = deposits[msg.sender];

		ICommunityIssuance communityIssuanceCached = communityIssuance;

		_triggerVSTAIssuance(communityIssuanceCached);

		uint256 depositorETHGain = getDepositorAssetGain(msg.sender);
		uint256 compoundedVSTDeposit = getCompoundedVSTDeposit(msg.sender);
		uint256 VSTLoss = initialDeposit.sub(compoundedVSTDeposit); // Needed only for event log

		// First pay out any VSTA gains
		_payOutVSTAGains(communityIssuanceCached, msg.sender);

		// Update System stake
		uint256 compoundedStake = getCompoundedTotalStake();
		uint256 newStake = compoundedStake.add(_amount);
		_updateStakeAndSnapshots(newStake);
		emit StakeChanged(newStake, msg.sender);

		_sendVSTtoStabilityPool(msg.sender, _amount);

		uint256 newDeposit = compoundedVSTDeposit.add(_amount);
		_updateDepositAndSnapshots(msg.sender, newDeposit);
		emit UserDepositChanged(msg.sender, newDeposit);

		emit AssetGainWithdrawn(msg.sender, depositorETHGain, VSTLoss); // VST Loss required for event log

		_sendETHGainToDepositor(depositorETHGain);
	}

	/*  withdrawFromSP():
	 *
	 * - Triggers a VSTA issuance, based on time passed since the last issuance. The VSTA issuance is shared between *all* depositors
	 * - Sends all depositor's accumulated gains (VSTA, ETH) to depositor
	 * - Decreases deposit and system stake, and takes new snapshots for each.
	 *
	 * If _amount > userDeposit, the user withdraws all of their compounded deposit.
	 */
	function withdrawFromSP(uint256 _amount) external override {
		if (_amount != 0) {
			_requireNoUnderCollateralizedTroves();
		}
		uint256 initialDeposit = deposits[msg.sender];
		_requireUserHasDeposit(initialDeposit);

		ICommunityIssuance communityIssuanceCached = communityIssuance;

		_triggerVSTAIssuance(communityIssuanceCached);

		uint256 depositorETHGain = getDepositorAssetGain(msg.sender);

		uint256 compoundedVSTDeposit = getCompoundedVSTDeposit(msg.sender);
		uint256 VSTtoWithdraw = LiquityMath._min(
			_amount,
			compoundedVSTDeposit
		);
		uint256 VSTLoss = initialDeposit.sub(compoundedVSTDeposit); // Needed only for event log

		// First pay out any VSTA gains
		_payOutVSTAGains(communityIssuanceCached, msg.sender);

		// Update System stake
		uint256 compoundedStake = getCompoundedTotalStake();
		uint256 newStake = compoundedStake.sub(VSTtoWithdraw);
		_updateStakeAndSnapshots(newStake);
		emit StakeChanged(newStake, msg.sender);

		_sendVSTToDepositor(msg.sender, VSTtoWithdraw);

		// Update deposit
		uint256 newDeposit = compoundedVSTDeposit.sub(VSTtoWithdraw);
		_updateDepositAndSnapshots(msg.sender, newDeposit);
		emit UserDepositChanged(msg.sender, newDeposit);

		emit AssetGainWithdrawn(msg.sender, depositorETHGain, VSTLoss); // VST Loss required for event log

		_sendETHGainToDepositor(depositorETHGain);
	}

	/* withdrawETHGainToTrove:
	 * - Triggers a VSTA issuance, based on time passed since the last issuance. The VSTA issuance is shared between *all* depositors
	 * - Sends all depositor's VSTA gain to  depositor
	 * - Transfers the depositor's entire ETH gain from the Stability Pool to the caller's trove
	 * - Leaves their compounded deposit in the Stability Pool
	 * - Updates snapshots for deposit and system stake */
	function withdrawAssetGainToTrove(address _upperHint, address _lowerHint)
		external
		override
	{
		uint256 initialDeposit = deposits[msg.sender];
		_requireUserHasDeposit(initialDeposit);
		_requireUserHasTrove(msg.sender);
		_requireUserHasETHGain(msg.sender);

		ICommunityIssuance communityIssuanceCached = communityIssuance;

		_triggerVSTAIssuance(communityIssuanceCached);

		uint256 depositorETHGain = getDepositorAssetGain(msg.sender);

		uint256 compoundedVSTDeposit = getCompoundedVSTDeposit(msg.sender);
		uint256 VSTLoss = initialDeposit.sub(compoundedVSTDeposit); // Needed only for event log

		// First pay out any VSTA gains
		_payOutVSTAGains(communityIssuanceCached, msg.sender);

		// Update System stake
		uint256 compoundedSystemStake = getCompoundedTotalStake();
		_updateStakeAndSnapshots(compoundedSystemStake);
		emit StakeChanged(compoundedSystemStake, msg.sender);

		_updateDepositAndSnapshots(msg.sender, compoundedVSTDeposit);

		/* Emit events before transferring ETH gain to Trove.
         This lets the event log make more sense (i.e. so it appears that first the ETH gain is withdrawn
        and then it is deposited into the Trove, not the other way around). */
		emit AssetGainWithdrawn(msg.sender, depositorETHGain, VSTLoss);
		emit UserDepositChanged(msg.sender, compoundedVSTDeposit);

		assetBalance = assetBalance.sub(depositorETHGain);
		emit StabilityPoolAssetBalanceUpdated(assetBalance);
		emit AssetSent(msg.sender, depositorETHGain);

		borrowerOperations.moveETHGainToTrove{
			value: assetAddress == address(0) ? depositorETHGain : 0
		}(assetAddress, depositorETHGain, msg.sender, _upperHint, _lowerHint);
	}

	// --- VSTA issuance functions ---

	function _triggerVSTAIssuance(ICommunityIssuance _communityIssuance)
		internal
	{
		uint256 VSTAIssuance = _communityIssuance.issueVSTA();
		_updateG(VSTAIssuance);
	}

	function _updateG(uint256 _VSTAIssuance) internal {
		uint256 totalVST = totalVSTDeposits; // cached to save an SLOAD
		/*
		 * When total deposits is 0, G is not updated. In this case, the VSTA issued can not be obtained by later
		 * depositors - it is missed out on, and remains in the balanceof the CommunityIssuance contract.
		 *
		 */
		if (totalVST == 0 || _VSTAIssuance == 0) {
			return;
		}

		uint256 VSTAPerUnitStaked;
		VSTAPerUnitStaked = _computeVSTAPerUnitStaked(_VSTAIssuance, totalVST);

		uint256 marginalVSTAGain = VSTAPerUnitStaked.mul(P);
		epochToScaleToG[currentEpoch][currentScale] = epochToScaleToG[
			currentEpoch
		][currentScale].add(marginalVSTAGain);

		emit G_Updated(
			epochToScaleToG[currentEpoch][currentScale],
			currentEpoch,
			currentScale
		);
	}

	function _computeVSTAPerUnitStaked(
		uint256 _VSTAIssuance,
		uint256 _totalVSTDeposits
	) internal returns (uint256) {
		/*
		 * Calculate the VSTA-per-unit staked.  Division uses a "feedback" error correction, to keep the
		 * cumulative error low in the running total G:
		 *
		 * 1) Form a numerator which compensates for the floor division error that occurred the last time this
		 * function was called.
		 * 2) Calculate "per-unit-staked" ratio.
		 * 3) Multiply the ratio back by its denominator, to reveal the current floor division error.
		 * 4) Store this error for use in the next correction when this function is called.
		 * 5) Note: static analysis tools complain about this "division before multiplication", however, it is intended.
		 */
		uint256 VSTANumerator = _VSTAIssuance.mul(DECIMAL_PRECISION).add(
			lastVSTAError
		);

		uint256 VSTAPerUnitStaked = VSTANumerator.div(_totalVSTDeposits);
		lastVSTAError = VSTANumerator.sub(
			VSTAPerUnitStaked.mul(_totalVSTDeposits)
		);

		return VSTAPerUnitStaked;
	}

	// --- Liquidation functions ---

	/*
	 * Cancels out the specified debt against the VST contained in the Stability Pool (as far as possible)
	 * and transfers the Trove's ETH collateral from ActivePool to StabilityPool.
	 * Only called by liquidation functions in the TroveManager.
	 */
	function offset(uint256 _debtToOffset, uint256 _collToAdd)
		external
		override
	{
		_requireCallerIsTroveManager();
		uint256 totalVST = totalVSTDeposits; // cached to save an SLOAD
		if (totalVST == 0 || _debtToOffset == 0) {
			return;
		}

		_triggerVSTAIssuance(communityIssuance);

		(
			uint256 ETHGainPerUnitStaked,
			uint256 VSTLossPerUnitStaked
		) = _computeRewardsPerUnitStaked(_collToAdd, _debtToOffset, totalVST);

		_updateRewardSumAndProduct(ETHGainPerUnitStaked, VSTLossPerUnitStaked); // updates S and P

		_moveOffsetCollAndDebt(_collToAdd, _debtToOffset);
	}

	// --- Offset helper functions ---

	function _computeRewardsPerUnitStaked(
		uint256 _collToAdd,
		uint256 _debtToOffset,
		uint256 _totalVSTDeposits
	)
		internal
		returns (uint256 ETHGainPerUnitStaked, uint256 VSTLossPerUnitStaked)
	{
		/*
		 * Compute the VST and ETH rewards. Uses a "feedback" error correction, to keep
		 * the cumulative error in the P and S state variables low:
		 *
		 * 1) Form numerators which compensate for the floor division errors that occurred the last time this
		 * function was called.
		 * 2) Calculate "per-unit-staked" ratios.
		 * 3) Multiply each ratio back by its denominator, to reveal the current floor division error.
		 * 4) Store these errors for use in the next correction when this function is called.
		 * 5) Note: static analysis tools complain about this "division before multiplication", however, it is intended.
		 */
		uint256 ETHNumerator = _collToAdd.mul(DECIMAL_PRECISION).add(
			lastAssetError_Offset
		);

		assert(_debtToOffset <= _totalVSTDeposits);
		if (_debtToOffset == _totalVSTDeposits) {
			VSTLossPerUnitStaked = DECIMAL_PRECISION; // When the Pool depletes to 0, so does each deposit
			lastVSTLossError_Offset = 0;
		} else {
			uint256 VSTLossNumerator = _debtToOffset.mul(DECIMAL_PRECISION).sub(
				lastVSTLossError_Offset
			);
			/*
			 * Add 1 to make error in quotient positive. We want "slightly too much" VST loss,
			 * which ensures the error in any given compoundedVSTDeposit favors the Stability Pool.
			 */
			VSTLossPerUnitStaked = (VSTLossNumerator.div(_totalVSTDeposits)).add(
					1
				);
			lastVSTLossError_Offset = (
				VSTLossPerUnitStaked.mul(_totalVSTDeposits)
			).sub(VSTLossNumerator);
		}

		ETHGainPerUnitStaked = ETHNumerator.div(_totalVSTDeposits);
		lastAssetError_Offset = ETHNumerator.sub(
			ETHGainPerUnitStaked.mul(_totalVSTDeposits)
		);

		return (ETHGainPerUnitStaked, VSTLossPerUnitStaked);
	}

	// Update the Stability Pool reward sum S and product P
	function _updateRewardSumAndProduct(
		uint256 _ETHGainPerUnitStaked,
		uint256 _VSTLossPerUnitStaked
	) internal {
		uint256 currentP = P;
		uint256 newP;

		assert(_VSTLossPerUnitStaked <= DECIMAL_PRECISION);
		/*
		 * The newProductFactor is the factor by which to change all deposits, due to the depletion of Stability Pool VST in the liquidation.
		 * We make the product factor 0 if there was a pool-emptying. Otherwise, it is (1 - VSTLossPerUnitStaked)
		 */
		uint256 newProductFactor = uint256(DECIMAL_PRECISION).sub(
			_VSTLossPerUnitStaked
		);

		uint128 currentScaleCached = currentScale;
		uint128 currentEpochCached = currentEpoch;
		uint256 currentS = epochToScaleToSum[currentEpochCached][
			currentScaleCached
		];

		/*
		 * Calculate the new S first, before we update P.
		 * The ETH gain for any given depositor from a liquidation depends on the value of their deposit
		 * (and the value of totalDeposits) prior to the Stability being depleted by the debt in the liquidation.
		 *
		 * Since S corresponds to ETH gain, and P to deposit loss, we update S first.
		 */
		uint256 marginalETHGain = _ETHGainPerUnitStaked.mul(currentP);
		uint256 newS = currentS.add(marginalETHGain);
		epochToScaleToSum[currentEpochCached][currentScaleCached] = newS;
		emit S_Updated(newS, currentEpochCached, currentScaleCached);

		// If the Stability Pool was emptied, increment the epoch, and reset the scale and product P
		if (newProductFactor == 0) {
			currentEpoch = currentEpochCached.add(1);
			emit EpochUpdated(currentEpoch);
			currentScale = 0;
			emit ScaleUpdated(currentScale);
			newP = DECIMAL_PRECISION;

			// If multiplying P by a non-zero product factor would reduce P below the scale boundary, increment the scale
		} else if (
			currentP.mul(newProductFactor).div(DECIMAL_PRECISION) < SCALE_FACTOR
		) {
			newP = currentP.mul(newProductFactor).mul(SCALE_FACTOR).div(
				DECIMAL_PRECISION
			);
			currentScale = currentScaleCached.add(1);
			emit ScaleUpdated(currentScale);
		} else {
			newP = currentP.mul(newProductFactor).div(DECIMAL_PRECISION);
		}

		assert(newP > 0);
		P = newP;

		emit P_Updated(newP);
	}

	function _moveOffsetCollAndDebt(
		uint256 _collToAdd,
		uint256 _debtToOffset
	) internal {
		IActivePool activePoolCached = vestaParams.activePool();

		// Cancel the liquidated VST debt with the VST in the stability pool
		activePoolCached.decreaseVSTDebt(assetAddress, _debtToOffset);
		_decreaseVST(_debtToOffset);

		// Burn the debt that was successfully offset
		vstToken.burn(address(this), _debtToOffset);

		activePoolCached.sendAsset(assetAddress, address(this), _collToAdd);
	}

	function _decreaseVST(uint256 _amount) internal {
		uint256 newTotalVSTDeposits = totalVSTDeposits.sub(_amount);
		totalVSTDeposits = newTotalVSTDeposits;
		emit StabilityPoolVSTBalanceUpdated(newTotalVSTDeposits);
	}

	// --- Reward calculator functions for depositor ---

	/* Calculates the ETH gain earned by the deposit since its last snapshots were taken.
	 * Given by the formula:  E = d0 * (S - S(0))/P(0)
	 * where S(0) and P(0) are the depositor's snapshots of the sum S and product P, respectively.
	 * d0 is the last recorded deposit value.
	 */
	function getDepositorAssetGain(address _depositor)
		public
		view
		override
		returns (uint256)
	{
		uint256 initialDeposit = deposits[_depositor];

		if (initialDeposit == 0) {
			return 0;
		}

		Snapshots memory snapshots = depositSnapshots[_depositor];

		uint256 AssetGain = _getAssetGainFromSnapshots(
			initialDeposit,
			snapshots
		);
		return AssetGain;
	}

	function _getAssetGainFromSnapshots(
		uint256 initialDeposit,
		Snapshots memory snapshots
	) internal view returns (uint256) {
		/*
		 * Grab the sum 'S' from the epoch at which the stake was made. The ETH gain may span up to one scale change.
		 * If it does, the second portion of the ETH gain is scaled by 1e9.
		 * If the gain spans no scale change, the second portion will be 0.
		 */
		uint128 epochSnapshot = snapshots.epoch;
		uint128 scaleSnapshot = snapshots.scale;
		uint256 S_Snapshot = snapshots.S;
		uint256 P_Snapshot = snapshots.P;

		uint256 firstPortion = epochToScaleToSum[epochSnapshot][scaleSnapshot]
			.sub(S_Snapshot);
		uint256 secondPortion = epochToScaleToSum[epochSnapshot][
			scaleSnapshot.add(1)
		].div(SCALE_FACTOR);

		uint256 AssetGain = initialDeposit
			.mul(firstPortion.add(secondPortion))
			.div(P_Snapshot)
			.div(DECIMAL_PRECISION);

		return AssetGain;
	}

	/*
	 * Calculate the VSTA gain earned by a deposit since its last snapshots were taken.
	 * Given by the formula:  VSTA = d0 * (G - G(0))/P(0)
	 * where G(0) and P(0) are the depositor's snapshots of the sum G and product P, respectively.
	 * d0 is the last recorded deposit value.
	 */
	function getDepositorVSTAGain(address _depositor)
		public
		view
		override
		returns (uint256)
	{
		uint256 initialDeposit = deposits[_depositor];
		if (initialDeposit == 0) {
			return 0;
		}

		Snapshots memory snapshots = depositSnapshots[_depositor];

		uint256 VSTAGain = DECIMAL_PRECISION
			.mul(_getVSTAGainFromSnapshots(initialDeposit, snapshots))
			.div(DECIMAL_PRECISION);

		return VSTAGain;
	}

	function _getVSTAGainFromSnapshots(
		uint256 initialStake,
		Snapshots memory snapshots
	) internal view returns (uint256) {
		/*
		 * Grab the sum 'G' from the epoch at which the stake was made. The VSTA gain may span up to one scale change.
		 * If it does, the second portion of the VSTA gain is scaled by 1e9.
		 * If the gain spans no scale change, the second portion will be 0.
		 */
		uint128 epochSnapshot = snapshots.epoch;
		uint128 scaleSnapshot = snapshots.scale;
		uint256 G_Snapshot = snapshots.G;
		uint256 P_Snapshot = snapshots.P;

		uint256 firstPortion = epochToScaleToG[epochSnapshot][scaleSnapshot]
			.sub(G_Snapshot);
		uint256 secondPortion = epochToScaleToG[epochSnapshot][
			scaleSnapshot.add(1)
		].div(SCALE_FACTOR);

		uint256 VSTAGain = initialStake
			.mul(firstPortion.add(secondPortion))
			.div(P_Snapshot)
			.div(DECIMAL_PRECISION);

		return VSTAGain;
	}

	// --- Compounded deposit and compounded System stake ---

	/*
	 * Return the user's compounded deposit. Given by the formula:  d = d0 * P/P(0)
	 * where P(0) is the depositor's snapshot of the product P, taken when they last updated their deposit.
	 */
	function getCompoundedVSTDeposit(address _depositor)
		public
		view
		override
		returns (uint256)
	{
		uint256 initialDeposit = deposits[_depositor];
		if (initialDeposit == 0) {
			return 0;
		}

		return
			_getCompoundedStakeFromSnapshots(
				initialDeposit,
				depositSnapshots[_depositor]
			);
	}

	/*
	 * Return the system's compounded stake. Given by the formula:  D = D0 * P/P(0)
	 * where P(0) is the depositor's snapshot of the product P
	 *
	 * The system's compounded stake is equal to the sum of its depositors' compounded deposits.
	 */
	function getCompoundedTotalStake()
		public
		view
		override
		returns (uint256)
	{
		uint256 cachedStake = totalStakes;
		if (cachedStake == 0) {
			return 0;
		}

		return _getCompoundedStakeFromSnapshots(cachedStake, systemSnapshots);
	}

	// Internal function, used to calculcate compounded deposits and compounded stakes.
	function _getCompoundedStakeFromSnapshots(
		uint256 initialStake,
		Snapshots memory snapshots
	) internal view returns (uint256) {
		uint256 snapshot_P = snapshots.P;
		uint128 scaleSnapshot = snapshots.scale;
		uint128 epochSnapshot = snapshots.epoch;

		// If stake was made before a pool-emptying event, then it has been fully cancelled with debt -- so, return 0
		if (epochSnapshot < currentEpoch) {
			return 0;
		}

		// if (snapshot_P == 0) {
		//     snapshot_P = P;
		// }

		uint256 compoundedStake;
		uint128 scaleDiff = currentScale.sub(scaleSnapshot);

		/* Compute the compounded stake. If a scale change in P was made during the stake's lifetime,
		 * account for it. If more than one scale change was made, then the stake has decreased by a factor of
		 * at least 1e-9 -- so return 0.
		 */
		if (scaleDiff == 0) {
			compoundedStake = initialStake.mul(P).div(snapshot_P);
		} else if (scaleDiff == 1) {
			compoundedStake = initialStake.mul(P).div(snapshot_P).div(
				SCALE_FACTOR
			);
		} else {
			compoundedStake = 0;
		}

		/*
		 * If compounded deposit is less than a billionth of the initial deposit, return 0.
		 *
		 * NOTE: originally, this line was in place to stop rounding errors making the deposit too large. However, the error
		 * corrections should ensure the error in P "favors the Pool", i.e. any given compounded deposit should slightly less
		 * than it's theoretical value.
		 *
		 * Thus it's unclear whether this line is still really needed.
		 */
		if (compoundedStake < initialStake.div(1e9)) {
			return 0;
		}

		return compoundedStake;
	}

	// --- Sender functions for VST deposit, ETH gains and VSTA gains ---

	// Transfer the VST tokens from the user to the Stability Pool's address, and update its recorded VST
	function _sendVSTtoStabilityPool(address _address, uint256 _amount)
		internal
	{
		vstToken.sendToPool(_address, address(this), _amount);
		uint256 newTotalVSTDeposits = totalVSTDeposits.add(_amount);
		totalVSTDeposits = newTotalVSTDeposits;
		emit StabilityPoolVSTBalanceUpdated(newTotalVSTDeposits);
	}

	function _sendETHGainToDepositor(uint256 _amount) internal {
		if (_amount == 0) {
			return;
		}
		uint256 newETH = assetBalance.sub(_amount);
		assetBalance = newETH;
		emit StabilityPoolAssetBalanceUpdated(newETH);
		emit AssetSent(msg.sender, _amount);

		if (assetAddress == ETH_REF_ADDRESS) {
			(bool success, ) = msg.sender.call{ value: _amount }("");
			require(success, "StabilityPool: sending ETH failed");
		} else {
			IERC20(assetAddress).safeTransfer(msg.sender, _amount);
		}
	}

	// Send VST to user and decrease VST in Pool
	function _sendVSTToDepositor(address _depositor, uint256 VSTWithdrawal)
		internal
	{
		if (VSTWithdrawal == 0) {
			return;
		}

		vstToken.returnFromPool(address(this), _depositor, VSTWithdrawal);
		_decreaseVST(VSTWithdrawal);
	}

	// --- Stability Pool Deposit Functionality ---

	function _updateDepositAndSnapshots(
		address _depositor,
		uint256 _newValue
	) internal {
		deposits[_depositor] = _newValue;

		if (_newValue == 0) {
			delete depositSnapshots[_depositor];
			emit DepositSnapshotUpdated(_depositor, 0, 0, 0);
			return;
		}
		uint128 currentScaleCached = currentScale;
		uint128 currentEpochCached = currentEpoch;
		uint256 currentP = P;

		// Get S and G for the current epoch and current scale
		uint256 currentS = epochToScaleToSum[currentEpochCached][
			currentScaleCached
		];
		uint256 currentG = epochToScaleToG[currentEpochCached][
			currentScaleCached
		];

		Snapshots storage depositSnap = depositSnapshots[_depositor];

		// Record new snapshots of the latest running product P, sum S, and sum G, for the depositor
		depositSnap.P = currentP;
		depositSnap.S = currentS;
		depositSnap.G = currentG;
		depositSnap.scale = currentScaleCached;
		depositSnap.epoch = currentEpochCached;

		emit DepositSnapshotUpdated(_depositor, currentP, currentS, currentG);
	}

	function _updateStakeAndSnapshots(uint256 _newValue) internal {
		Snapshots storage snapshots = systemSnapshots;
		totalStakes = _newValue;

		uint128 currentScaleCached = currentScale;
		uint128 currentEpochCached = currentEpoch;
		uint256 currentP = P;

		// Get G for the current epoch and current scale
		uint256 currentG = epochToScaleToG[currentEpochCached][
			currentScaleCached
		];

		// Record new snapshots of the latest running product P and sum G for the system
		snapshots.P = currentP;
		snapshots.G = currentG;
		snapshots.scale = currentScaleCached;
		snapshots.epoch = currentEpochCached;

		emit SystemSnapshotUpdated(currentP, currentG);
	}

	function _payOutVSTAGains(
		ICommunityIssuance _communityIssuance,
		address _depositor
	) internal {
		// Pay out depositor's VSTA gain
		uint256 depositorVSTAGain = getDepositorVSTAGain(_depositor);
		_communityIssuance.sendVSTA(_depositor, depositorVSTAGain);
		emit VSTAPaidToDepositor(_depositor, depositorVSTAGain);
	}

	// --- 'require' functions ---

	function _requireCallerIsActivePool() internal view {
		require(
			msg.sender == address(vestaParams.activePool()),
			"StabilityPool: Caller is not ActivePool"
		);
	}

	function _requireCallerIsTroveManager() internal view {
		require(
			msg.sender == address(troveManager),
			"StabilityPool: Caller is not TroveManager"
		);
	}

	function _requireNoUnderCollateralizedTroves() internal {
		uint256 price = vestaParams.priceFeed().fetchPrice(assetAddress);
		address lowestTrove = sortedTroves.getLast(assetAddress);
		uint256 ICR = troveManager.getCurrentICR(
			assetAddress,
			lowestTrove,
			price
		);
		require(
			ICR >= vestaParams.MCR(assetAddress),
			"StabilityPool: Cannot withdraw while there are troves with ICR < MCR"
		);
	}

	function _requireUserHasDeposit(uint256 _initialDeposit) internal pure {
		require(
			_initialDeposit > 0,
			"StabilityPool: User must have a non-zero deposit"
		);
	}

	function _requireUserHasNoDeposit(address _address) internal view {
		uint256 initialDeposit = deposits[_address];
		require(
			initialDeposit == 0,
			"StabilityPool: User must have no deposit"
		);
	}

	function _requireNonZeroAmount(uint256 _amount) internal pure {
		require(_amount > 0, "StabilityPool: Amount must be non-zero");
	}

	function _requireUserHasTrove(address _depositor) internal view {
		require(
			troveManager.getTroveStatus(assetAddress, _depositor) == 1,
			"StabilityPool: caller must have an active trove to withdraw AssetGain to"
		);
	}

	function _requireUserHasETHGain(address _depositor) internal view {
		uint256 AssetGain = getDepositorAssetGain(_depositor);
		require(
			AssetGain > 0,
			"StabilityPool: caller must have non-zero ETH Gain"
		);
	}

	// --- Fallback function ---

	function receivedERC20(address _asset, uint256 _amount)
		external
		override
	{
		_requireCallerIsActivePool();

		require(
			_asset == assetAddress,
			"Receiving the wrong asset in StabilityPool"
		);

		if (assetAddress != ETH_REF_ADDRESS) {
			assetBalance = assetBalance.add(_amount);
			emit StabilityPoolAssetBalanceUpdated(assetBalance);
		}
	}

	receive() external payable {
		_requireCallerIsActivePool();
		assetBalance = assetBalance.add(msg.value);
		emit StabilityPoolAssetBalanceUpdated(assetBalance);
	}
}
