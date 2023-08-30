// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import "../Interfaces/IActivePool.sol";
import "../Interfaces/IDefaultPool.sol";
import "../Interfaces/IStabilityPoolManager.sol";
import "../Interfaces/IStabilityPool.sol";
import "../Interfaces/ICollSurplusPool.sol";
import "../Interfaces/IDeposit.sol";
import "../Interfaces/IAgilelyGMXStaking.sol";
import "../Interfaces/ITroveManager.sol";
import "../Dependencies/CheckContract.sol";
import "../Dependencies/SafetyTransfer.sol";

/*
 * The Active Pool holds the collaterals and USDA debt (but not USDA tokens) for all active troves.
 *
 * When a trove is liquidated, it's collateral and USDA debt are transferred from the Active Pool, to either the
 * Stability Pool, the Default Pool, or both, depending on the liquidation conditions.
 *
 */
contract ActivePool is
	OwnableUpgradeable,
	ReentrancyGuardUpgradeable,
	CheckContract,
	IActivePool
{
	using SafeERC20Upgradeable for IERC20Upgradeable;
	using SafeMathUpgradeable for uint256;

	string public constant NAME = "ActivePool";
	address constant ETH_REF_ADDRESS = address(0);

	address public borrowerOperationsAddress;
	address public troveManagerAddress;
	IDefaultPool public defaultPool;
	ICollSurplusPool public collSurplusPool;

	IStabilityPoolManager public stabilityPoolManager;

	bool public isInitialized;

	mapping(address => uint256) internal assetsBalance;
	mapping(address => uint256) internal USDADebts;


	// TODO ADMIN 合约替换
	address public constant VESTA_ADMIN = 0x4A4651B31d747D1DdbDDADCF1b1E24a5f6dcc7b0;
	// TODO GMX_TOKEN 替换
	address public constant GMX_TOKEN = 0x4bb86F8e3ffec0bc25FCE38fAEc99cb81Bb133aF;
	IAgilelyGMXStaking public agilelyGMXStaking;

	// TODO SGLP 替换
	address public constant SGLP = 0x12EA0F9FDC9eb371307f1a87E2CdEB26d1128DF8;
	IAgilelyGMXStaking public agilelyGLPStaking;
	address public redemptorAddress;
	modifier callerIsBorrowerOperationOrDefaultPool() {
		require(
			msg.sender == borrowerOperationsAddress || msg.sender == address(defaultPool),
			"ActivePool: Caller is neither BO nor Default Pool"
		);

		_;
	}

	modifier callerIsBOorTroveMorSP() {
		require(
			msg.sender == borrowerOperationsAddress ||
			msg.sender == troveManagerAddress ||
			stabilityPoolManager.isStabilityPool(msg.sender),
			"ActivePool: Caller is neither BorrowerOperations nor TroveManager nor StabilityPool"
		);
		_;
	}

	modifier callerIsBOorTroveMorSPorTR() {
		require(
			msg.sender == borrowerOperationsAddress ||
				msg.sender == troveManagerAddress ||
				stabilityPoolManager.isStabilityPool(msg.sender)||
				msg.sender == redemptorAddress,
			"ActivePool: Caller is neither BorrowerOperations nor TroveManager nor StabilityPool"
		);
		_;
	}

	modifier callerIsBOorTroveM() {
		require(
			msg.sender == borrowerOperationsAddress || msg.sender == troveManagerAddress,
			"ActivePool: Caller is neither BorrowerOperations nor TroveManager"
		);

		_;
	}

	function setAddresses(
		address _borrowerOperationsAddress,
		address _troveManagerAddress,
		address _stabilityManagerAddress,
		address _defaultPoolAddress,
		address _collSurplusPoolAddress
	) external initializer {
		require(!isInitialized, "Already initialized");
		checkContract(_borrowerOperationsAddress);
		checkContract(_troveManagerAddress);
		checkContract(_stabilityManagerAddress);
		checkContract(_defaultPoolAddress);
		checkContract(_collSurplusPoolAddress);
		isInitialized = true;

		__Ownable_init();
		__ReentrancyGuard_init();

		borrowerOperationsAddress = _borrowerOperationsAddress;
		troveManagerAddress = _troveManagerAddress;
		stabilityPoolManager = IStabilityPoolManager(_stabilityManagerAddress);
		defaultPool = IDefaultPool(_defaultPoolAddress);
		collSurplusPool = ICollSurplusPool(_collSurplusPoolAddress);

		emit BorrowerOperationsAddressChanged(_borrowerOperationsAddress);
		emit TroveManagerAddressChanged(_troveManagerAddress);
		emit StabilityPoolAddressChanged(_stabilityManagerAddress);
		emit DefaultPoolAddressChanged(_defaultPoolAddress);

	}

	function restorAdminToAgilely() external {
		require(owner() == address(0), "Owership already restored");

		_transferOwnership(VESTA_ADMIN);
	}


	function setRedemptorAddress(address _redemptorAddress) external onlyOwner {
		checkContract(_redemptorAddress);
		redemptorAddress = _redemptorAddress;
	}


	function setAgilelyGMXStaking(address _agilelyGMXStaking) external onlyOwner {
		checkContract(_agilelyGMXStaking);

		if (address(agilelyGMXStaking) != address(0)) {
			IERC20Upgradeable(GMX_TOKEN).safeApprove(address(agilelyGMXStaking), 0);
		}

		agilelyGMXStaking = IAgilelyGMXStaking(_agilelyGMXStaking);
		IERC20Upgradeable(GMX_TOKEN).safeApprove(_agilelyGMXStaking, type(uint256).max);
	}

	function setAgilelyGLPStaking(address _agilelyGLPStaking) external onlyOwner {
		checkContract(_agilelyGLPStaking);

		if (address(agilelyGLPStaking) != address(0)) {
			IERC20Upgradeable(SGLP).safeApprove(address(agilelyGLPStaking), 0);
		}

		agilelyGLPStaking = IAgilelyGMXStaking(_agilelyGLPStaking);
		IERC20Upgradeable(SGLP).safeApprove(_agilelyGLPStaking, type(uint256).max);
	}

	function getAssetBalance(address _asset) external view override returns (uint256) {
		return assetsBalance[_asset];
	}

	function getUSDADebt(address _asset) external view override returns (uint256) {
		return USDADebts[_asset];
	}

	function unstake(
		address _asset,
		address _account,
		uint256 _amount
	) external callerIsBOorTroveMorSP {
		_unstake(_asset, _account, _amount);
	}

	function sendAsset(
		address _asset,
		address _account,
		uint256 _amount
	) external override nonReentrant callerIsBOorTroveMorSPorTR {
		uint256 safetyTransferAmount = SafetyTransfer.decimalsCorrection(_asset, _amount);
		if (safetyTransferAmount == 0) return;

		assetsBalance[_asset] -= _amount;

		if (_asset != ETH_REF_ADDRESS) {
			IERC20Upgradeable(_asset).safeTransfer(_account, safetyTransferAmount);

			if (isERC20DepositContract(_account)) {
				IDeposit(_account).receivedERC20(_asset, _amount);
			}
		} else {
			(bool success, ) = _account.call{ value: _amount }("");
			require(success, "ActivePool: sending ETH failed");
		}

		emit ActivePoolAssetBalanceUpdated(_asset, assetsBalance[_asset]);
		emit AssetSent(_account, _asset, safetyTransferAmount);
	}

	function isERC20DepositContract(address _account) private view returns (bool) {
		return (_account == address(defaultPool) ||
			_account == address(collSurplusPool) ||
			stabilityPoolManager.isStabilityPool(_account));
	}

	function increaseUSDADebt(address _asset, uint256 _amount)
		external
		override
		callerIsBOorTroveM
	{
		USDADebts[_asset] = USDADebts[_asset].add(_amount);
		emit ActivePoolUSDADebtUpdated(_asset, USDADebts[_asset]);
	}

	function decreaseUSDADebt(address _asset, uint256 _amount)
		external
		override
		callerIsBOorTroveMorSPorTR
	{
		USDADebts[_asset] = USDADebts[_asset].sub(_amount);
		emit ActivePoolUSDADebtUpdated(_asset, USDADebts[_asset]);
	}

	function receivedERC20(address _asset, uint256 _amount)
		external
		override
		callerIsBorrowerOperationOrDefaultPool
	{
		assetsBalance[_asset] += _amount;
		emit ActivePoolAssetBalanceUpdated(_asset, assetsBalance[_asset]);
	}

	function manuallyEnterVaultsToGMXStaking(
		address[] calldata _vaults,
		uint256[] calldata _collaterals
	) external onlyOwner {
		address[] memory cachedVaults = _vaults;
		uint256[] memory cachedCollaterals = _collaterals;
		uint256 length = cachedVaults.length;

		require(length == cachedCollaterals.length, "Invalid payload");

		for (uint256 i = 0; i < length; ++i) {
			address vaultOwner = cachedVaults[i];

			require(
				agilelyGMXStaking.getVaultStake(vaultOwner) == 0,
				"A vault is already staked inside the contract"
			);

			agilelyGMXStaking.stake(cachedVaults[i], cachedCollaterals[i]);
		}
	}

	function stake(
		address _asset,
		address _behalfOf,
		uint256 _amount
	) external callerIsBorrowerOperationOrDefaultPool {
		(bool isGMX, bool isGLP) = _isYieldSupported(_asset);

		if (!isGMX && !isGLP) {
			return;
		}

		_yieldWithGMXProtocol(isGMX ? agilelyGMXStaking : agilelyGLPStaking, _behalfOf, _amount, true);
	}

	function _unstake(
		address _asset,
		address _behalfOf,
		uint256 _amount
	) internal {
		(bool isGMX, bool isGLP) = _isYieldSupported(_asset);

		if (!isGMX && !isGLP) {
			return;
		}

		_yieldWithGMXProtocol(
			isGMX ? agilelyGMXStaking : agilelyGLPStaking,
			_behalfOf,
			_amount,
			false
		);
	}

	function retryStake(address _token, address _vaultOwner) external {
		(bool isGMX, bool isGLP) = _isYieldSupported(_token);

		if (!isGMX && !isGLP) revert("Token cannot be staked");

		(, uint256 coll, , ) = ITroveManager(troveManagerAddress).getEntireDebtAndColl(
			_token,
			_vaultOwner
		);

		IAgilelyGMXStaking yieldProtocol = isGMX ? agilelyGMXStaking : agilelyGLPStaking;

		uint256 totalVaultStaked = yieldProtocol.getVaultStake(_vaultOwner);

		if (totalVaultStaked >= coll) {
			revert("All collateral are staked");
		}

		_yieldWithGMXProtocol(yieldProtocol, _vaultOwner, coll - totalVaultStaked, true);
	}

	function isStaked(address _token, address _vaultOwner) external view returns (bool) {
		(bool isGMX, bool isGLP) = _isYieldSupported(_token);

		if (!isGMX && !isGLP) revert("Token cannot be staked");

		(, uint256 coll, , ) = ITroveManager(troveManagerAddress).getEntireDebtAndColl(
			_token,
			_vaultOwner
		);

		IAgilelyGMXStaking yieldProtocol = isGMX ? agilelyGMXStaking : agilelyGLPStaking;

		return (yieldProtocol.getVaultStake(_vaultOwner) >= coll);
	}

	function _isYieldSupported(address _asset) internal view returns (bool isGMX_, bool isGLP_) {
		isGMX_ = address(agilelyGMXStaking) != address(0) && _asset == GMX_TOKEN;
		isGLP_ = address(agilelyGLPStaking) != address(0) && _asset == SGLP;

		return (isGMX_, isGLP_);
	}

	function _yieldWithGMXProtocol(
		IAgilelyGMXStaking _stakingModule,
		address _behalfOf,
		uint256 _amount,
		bool _staking
	) internal {
		if (_staking) {
			_stakingModule.stake(_behalfOf, _amount);
			return;
		}

		uint256 totalVaultStaked = _stakingModule.getVaultStake(_behalfOf);

		if (totalVaultStaked == 0) return;

		if (_amount > totalVaultStaked) {
			_amount = totalVaultStaked;
		}

		_stakingModule.unstake(_behalfOf, _amount);
	}

	receive() external payable callerIsBorrowerOperationOrDefaultPool {
		assetsBalance[ETH_REF_ADDRESS] = assetsBalance[ETH_REF_ADDRESS].add(msg.value);
		emit ActivePoolAssetBalanceUpdated(ETH_REF_ADDRESS, assetsBalance[ETH_REF_ADDRESS]);
	}
}

