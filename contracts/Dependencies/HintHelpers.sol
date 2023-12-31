// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
import "../Interfaces/ITroveManager.sol";
import "../Interfaces/ISortedTroves.sol";
import "../Interfaces/IPriceFeedV2.sol";
import "../Core/AGLBase.sol";
import "./CheckContract.sol";

contract HintHelpers is AGLBase, CheckContract {
	using SafeMathUpgradeable for uint256;
	string public constant NAME = "HintHelpers";

	struct LocalRedemptionVars {
		address _asset;
		uint256 _USDAamount;
		uint256 _pricel;
		uint256 _maxIterations;
	}

	ISortedTroves public sortedTroves;
	ITroveManager public troveManager;

	bool public isInitialized;
	IPriceFeedV2 public priceFeed;

	// --- Events ---

	event SortedTrovesAddressChanged(address _sortedTrovesAddress);
	event TroveManagerAddressChanged(address _troveManagerAddress);

	// --- Dependency setters ---

	function setAddresses(
		address _sortedTrovesAddress,
		address _troveManagerAddress,
		address _vaultParametersAddress
	) external initializer {
		require(!isInitialized, "Already initialized");
		checkContract(_sortedTrovesAddress);
		checkContract(_troveManagerAddress);
		checkContract(_vaultParametersAddress);

		isInitialized = true;

		__Ownable_init();

		sortedTroves = ISortedTroves(_sortedTrovesAddress);
		troveManager = ITroveManager(_troveManagerAddress);

		emit SortedTrovesAddressChanged(_sortedTrovesAddress);
		emit TroveManagerAddressChanged(_troveManagerAddress);

		setAGLParameters(_vaultParametersAddress);
	}

	function setPriceFeed(address _priceFeedAddress) external onlyOwner {
		checkContract(_priceFeedAddress);
		priceFeed = IPriceFeedV2(_priceFeedAddress);
	}

	// --- Functions ---

	/* getRedemptionHints() - Helper function for finding the right hints to pass to redeemCollateral().
	 *
	 * It simulates a redemption of `_USDAamount` to figure out where the redemption sequence will start and what state the final Trove
	 * of the sequence will end up in.
	 *
	 * Returns three hints:
	 *  - `firstRedemptionHint` is the address of the first Trove with ICR >= MCR (i.e. the first Trove that will be redeemed).
	 *  - `partialRedemptionHintNICR` is the final nominal ICR of the last Trove of the sequence after being hit by partial redemption,
	 *     or zero in case of no partial redemption.
	 *  - `truncatedUSDAamount` is the maximum amount that can be redeemed out of the the provided `_USDAamount`. This can be lower than
	 *    `_USDAamount` when redeeming the full amount would leave the last Trove of the redemption sequence with less net debt than the
	 *    minimum allowed value (i.e. aglParams.MIN_NET_DEBT()).
	 *
	 * The number of Troves to consider for redemption can be capped by passing a non-zero value as `_maxIterations`, while passing zero
	 * will leave it uncapped.
	 */

	function getRedemptionHints(
		address _asset,
		uint256 _USDAamount,
		uint256 _price,
		uint256 _maxIterations
	)
		external
		view
		returns (
			address firstRedemptionHint,
			uint256 partialRedemptionHintNICR,
			uint256 truncatedUSDAamount
		)
	{
		ISortedTroves sortedTrovesCached = sortedTroves;

		LocalRedemptionVars memory vars = LocalRedemptionVars(
			_asset,
			_USDAamount,
			_price,
			_maxIterations
		);

		uint256 remainingUSDA = _USDAamount;
		address currentTroveuser = sortedTrovesCached.getLast(vars._asset);

		while (
			currentTroveuser != address(0) &&
			troveManager.getCurrentICR(vars._asset, currentTroveuser, _price) <
			aglParams.MCR(vars._asset)
		) {
			currentTroveuser = sortedTrovesCached.getPrev(vars._asset, currentTroveuser);
		}

		firstRedemptionHint = currentTroveuser;

		if (_maxIterations == 0) {
			_maxIterations = type(uint256).max;
		}

		while (currentTroveuser != address(0) && remainingUSDA > 0 && _maxIterations-- > 0) {
			uint256 netUSDADebt = _getNetDebt(
				vars._asset,
				troveManager.getTroveDebt(vars._asset, currentTroveuser)
			).add(troveManager.getPendingUSDADebtReward(vars._asset, currentTroveuser));

			if (netUSDADebt > remainingUSDA) {
				if (netUSDADebt > aglParams.MIN_NET_DEBT(vars._asset)) {
					uint256 maxRedeemableUSDA = AGLMath._min(
						remainingUSDA,
						netUSDADebt.sub(aglParams.MIN_NET_DEBT(vars._asset))
					);

					uint256 ETH = troveManager.getTroveColl(vars._asset, currentTroveuser).add(
						troveManager.getPendingAssetReward(vars._asset, currentTroveuser)
					);

					uint256 newColl = ETH.sub(maxRedeemableUSDA.mul(DECIMAL_PRECISION).div(_price));
					uint256 newDebt = netUSDADebt.sub(maxRedeemableUSDA);

					uint256 compositeDebt = _getCompositeDebt(vars._asset, newDebt);
					partialRedemptionHintNICR = AGLMath._computeNominalCR(newColl, compositeDebt);

					remainingUSDA = remainingUSDA.sub(maxRedeemableUSDA);
				}
				break;
			} else {
				remainingUSDA = remainingUSDA.sub(netUSDADebt);
			}

			currentTroveuser = sortedTrovesCached.getPrev(vars._asset, currentTroveuser);
		}

		truncatedUSDAamount = _USDAamount.sub(remainingUSDA);
	}

	/* getApproxHint() - return address of a Trove that is, on average, (length / numTrials) positions away in the 
    sortedTroves list from the correct insert position of the Trove to be inserted. 
    
    Note: The output address is worst-case O(n) positions away from the correct insert position, however, the function 
    is probabilistic. Input can be tuned to guarantee results to a high degree of confidence, e.g:

    Submitting numTrials = k * sqrt(length), with k = 15 makes it very, very likely that the ouput address will 
    be <= sqrt(length) positions away from the correct insert position.
    */
	function getApproxHint(
		address _asset,
		uint256 _CR,
		uint256 _numTrials,
		uint256 _inputRandomSeed
	)
		external
		view
		returns (
			address hintAddress,
			uint256 diff,
			uint256 latestRandomSeed
		)
	{
		uint256 arrayLength = troveManager.getTroveOwnersCount(_asset);

		if (arrayLength == 0) {
			return (address(0), 0, _inputRandomSeed);
		}

		hintAddress = sortedTroves.getLast(_asset);
		diff = AGLMath._getAbsoluteDifference(
			_CR,
			troveManager.getNominalICR(_asset, hintAddress)
		);
		latestRandomSeed = _inputRandomSeed;

		uint256 i = 1;

		while (i < _numTrials) {
			latestRandomSeed = uint256(keccak256(abi.encodePacked(latestRandomSeed)));

			uint256 arrayIndex = latestRandomSeed % arrayLength;
			address currentAddress = troveManager.getTroveFromTroveOwnersArray(_asset, arrayIndex);
			uint256 currentNICR = troveManager.getNominalICR(_asset, currentAddress);

			// check if abs(current - CR) > abs(closest - CR), and update closest if current is closer
			uint256 currentDiff = AGLMath._getAbsoluteDifference(currentNICR, _CR);

			if (currentDiff < diff) {
				diff = currentDiff;
				hintAddress = currentAddress;
			}
			i++;
		}
	}

	/**
	@notice getLiquidatableAmount(address _asset) - returns total amount of USDA liquidatable from an asset.
	    This function goes thru vault from most at risk to least and counts the amount of USDA liquidatable until it hits a vault
		that is not liquidatable.
	@param _asset address of the asset, ZERO_ADDRESS for ETH
	@param _assetPrice the price of the asset in 1e18 format.
	@return result_ total amount of USDA liquidatable from an asset
	@dev if `_assetPrice` is zero, it will uses PriceFeed's pricing
	*/
	function getLiquidatableAmount(address _asset, uint256 _assetPrice)
		external
		view
		returns (uint256 result_)
	{
		if (_assetPrice == 0) {
			_assetPrice = priceFeed.getExternalPrice(_asset);
		}

		uint256 MCR = aglParams.MCR(_asset);

		address currentVaultBorrower = sortedTroves.getLast(_asset);
		address firstTrove = sortedTroves.getFirst(_asset);
		bool currentVaultLiquidatable = true;

		while (currentVaultLiquidatable) {
			uint256 currentICR = troveManager.getCurrentICR(
				_asset,
				currentVaultBorrower,
				_assetPrice
			);

			if (currentICR < MCR) {
				result_ += troveManager.getTroveDebt(_asset, currentVaultBorrower);

				if (currentVaultBorrower == firstTrove) return result_;
				currentVaultBorrower = sortedTroves.getPrev(_asset, currentVaultBorrower);
			} else {
				currentVaultLiquidatable = false;
			}
		}
	}

	function computeNominalCR(uint256 _coll, uint256 _debt) external pure returns (uint256) {
		return AGLMath._computeNominalCR(_coll, _debt);
	}

	function computeCR(
		uint256 _coll,
		uint256 _debt,
		uint256 _price
	) external pure returns (uint256) {
		return AGLMath._computeCR(_coll, _debt, _price);
	}
}

