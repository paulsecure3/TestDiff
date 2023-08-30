// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "../Dependencies/AGLMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../Interfaces/IBorrowerOperations.sol";
import "../Interfaces/ITroveManager.sol";
import "../Interfaces/IStabilityPoolManager.sol";
import "../Interfaces/IPriceFeed.sol";
import "../Interfaces/IAGLStaking.sol";
import "./BorrowerOperationsScript.sol";
import "./ETHTransferScript.sol";
import "./AGLStakingScript.sol";

contract BorrowerWrappersScript is
	BorrowerOperationsScript,
	ETHTransferScript,
	AGLStakingScript
{
	using SafeMathUpgradeable for uint256;

	struct Local_var {
		address _asset;
		uint256 _maxFee;
		address _upperHint;
		address _lowerHint;
		uint256 netAGLmount;
	}

	string public constant NAME = "BorrowerWrappersScript";

	ITroveManager immutable troveManager;
	IStabilityPoolManager immutable stabilityPoolManager;
	IPriceFeed immutable priceFeed;
	IERC20 immutable usdaToken;
	IERC20 immutable aglToken;

	constructor(
		address _borrowerOperationsAddress,
		address _troveManagerAddress,
		address _AGLStakingAddress
	)
		BorrowerOperationsScript(IBorrowerOperations(_borrowerOperationsAddress))
		AGLStakingScript(_AGLStakingAddress)
	{
		checkContract(_troveManagerAddress);
		ITroveManager troveManagerCached = ITroveManager(_troveManagerAddress);
		troveManager = troveManagerCached;

		IStabilityPoolManager stabilityPoolCached = troveManagerCached.stabilityPoolManager();
		checkContract(address(stabilityPoolCached));
		stabilityPoolManager = stabilityPoolCached;

		IPriceFeed priceFeedCached = troveManagerCached.aglParams().priceFeed();
		checkContract(address(priceFeedCached));
		priceFeed = priceFeedCached;

		address usdaTokenCached = address(troveManagerCached.usdaToken());
		checkContract(usdaTokenCached);
		usdaToken = IERC20(usdaTokenCached);

		address aglTokenCached = address(IAGLStaking(_AGLStakingAddress).aglToken());
		checkContract(aglTokenCached);
		aglToken = IERC20(aglTokenCached);

		IAGLStaking aglStakingCached = troveManagerCached.aglStaking();
		require(
			_AGLStakingAddress == address(aglStakingCached),
			"BorrowerWrappersScript: Wrong AGLStaking address"
		);
	}

	function claimCollateralAndOpenTrove(
		address _asset,
		uint256 _maxFee,
		uint256 _AGLmount,
		address _upperHint,
		address _lowerHint
	) external payable {
		uint256 balanceBefore = address(this).balance;

		// Claim collateral
		borrowerOperations.claimCollateral(_asset);

		uint256 balanceAfter = address(this).balance;

		// already checked in CollSurplusPool
		assert(balanceAfter > balanceBefore);

		uint256 totalCollateral = balanceAfter.sub(balanceBefore).add(msg.value);

		// Open trove with obtained collateral, plus collateral sent by user
		borrowerOperations.openTrove{ value: _asset == address(0) ? totalCollateral : 0 }(
			_asset,
			totalCollateral,
			_maxFee,
			_AGLmount,
			_upperHint,
			_lowerHint
		);
	}

	function claimSPRewardsAndRecycle(
		address _asset,
		uint256 _maxFee,
		address _upperHint,
		address _lowerHint
	) external {
		Local_var memory vars = Local_var(_asset, _maxFee, _upperHint, _lowerHint, 0);
		uint256 collBalanceBefore = address(this).balance;
		uint256 AGLBalanceBefore = aglToken.balanceOf(address(this));

		// Claim rewards
		stabilityPoolManager.getAssetStabilityPool(vars._asset).withdrawFromSP(0);

		uint256 collBalanceAfter = address(this).balance;
		uint256 AGLBalanceAfter = aglToken.balanceOf(address(this));
		uint256 claimedCollateral = collBalanceAfter.sub(collBalanceBefore);

		// Add claimed ETH to trove, get more USDA and stake it into the Stability Pool
		if (claimedCollateral > 0) {
			_requireUserHasTrove(vars._asset, address(this));
			vars.netAGLmount = _getNetAGLmount(vars._asset, claimedCollateral);
			borrowerOperations.adjustTrove{
				value: vars._asset == address(0) ? claimedCollateral : 0
			}(
				vars._asset,
				claimedCollateral,
				vars._maxFee,
				0,
				vars.netAGLmount,
				true,
				vars._upperHint,
				vars._lowerHint
			);
			// Provide withdrawn USDA to Stability Pool
			if (vars.netAGLmount > 0) {
				stabilityPoolManager.getAssetStabilityPool(_asset).provideToSP(vars.netAGLmount);
			}
		}

		// Stake claimed AGL
		uint256 claimedAGL = AGLBalanceAfter.sub(AGLBalanceBefore);
		if (claimedAGL > 0) {
			aglStaking.stake(claimedAGL);
		}
	}

	function claimStakingGainsAndRecycle(
		address _asset,
		uint256 _maxFee,
		address _upperHint,
		address _lowerHint
	) external {
		Local_var memory vars = Local_var(_asset, _maxFee, _upperHint, _lowerHint, 0);

		uint256 collBalanceBefore = address(this).balance;
		uint256 USDABalanceBefore = usdaToken.balanceOf(address(this));
		uint256 AGLBalanceBefore = aglToken.balanceOf(address(this));

		// Claim gains
		aglStaking.unstake(0);

		uint256 gainedCollateral = address(this).balance.sub(collBalanceBefore); // stack too deep issues :'(
		uint256 gainedUSDA = usdaToken.balanceOf(address(this)).sub(USDABalanceBefore);

		// Top up trove and get more USDA, keeping ICR constant
		if (gainedCollateral > 0) {
			_requireUserHasTrove(vars._asset, address(this));
			vars.netAGLmount = _getNetAGLmount(vars._asset, gainedCollateral);
			borrowerOperations.adjustTrove{
				value: vars._asset == address(0) ? gainedCollateral : 0
			}(
				vars._asset,
				gainedCollateral,
				vars._maxFee,
				0,
				vars.netAGLmount,
				true,
				vars._upperHint,
				vars._lowerHint
			);
		}

		uint256 totalUSDA = gainedUSDA.add(vars.netAGLmount);
		if (totalUSDA > 0) {
			stabilityPoolManager.getAssetStabilityPool(_asset).provideToSP(totalUSDA);

			// Providing to Stability Pool also triggers AGL claim, so stake it if any
			uint256 AGLBalanceAfter = aglToken.balanceOf(address(this));
			uint256 claimedAGL = AGLBalanceAfter.sub(AGLBalanceBefore);
			if (claimedAGL > 0) {
				aglStaking.stake(claimedAGL);
			}
		}
	}

	function _getNetAGLmount(address _asset, uint256 _collateral) internal returns (uint256) {
		uint256 price = priceFeed.fetchPrice(_asset);
		uint256 ICR = troveManager.getCurrentICR(_asset, address(this), price);

		uint256 AGLmount = _collateral.mul(price).div(ICR);
		uint256 borrowingRate = troveManager.getBorrowingRateWithDecay(_asset);
		uint256 netDebt = AGLmount.mul(AGLMath.DECIMAL_PRECISION).div(
			AGLMath.DECIMAL_PRECISION.add(borrowingRate)
		);

		return netDebt;
	}

	function _requireUserHasTrove(address _asset, address _depositor) internal view {
		require(
			troveManager.getTroveStatus(_asset, _depositor) == 1,
			"BorrowerWrappersScript: caller must have an active trove"
		);
	}
}
