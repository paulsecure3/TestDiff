// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "../Dependencies/CheckContract.sol";
import "../Interfaces/IStabilityPoolManager.sol";

contract StabilityPoolManager is OwnableUpgradeable, CheckContract, IStabilityPoolManager {
	mapping(address => address) stabilityPools;
	mapping(address => bool) validStabilityPools;
	address[] stabilityPoolList;

	string public constant NAME = "StabilityPoolManager";

	bool public isInitialized;
	address public adminContract;

	modifier isController() {
		require(msg.sender == owner() || msg.sender == adminContract, "Invalid permissions");
		_;
	}

	function setAddresses(address _adminContract) external initializer {
		require(!isInitialized, "Already initialized");
		checkContract(_adminContract);
		isInitialized = true;

		__Ownable_init();

		adminContract = _adminContract;
	}

	function setAdminContract(address _admin) external onlyOwner {
		require(_admin != address(0), "Admin cannot be empty address");
		adminContract = _admin;
	}

	function isStabilityPool(address stabilityPool) external view override returns (bool) {
		return validStabilityPools[stabilityPool];
	}

	function addStabilityPool(address asset, address stabilityPool)
		external
		override
		isController
	{
		CheckContract(asset);
		CheckContract(stabilityPool);
		require(!validStabilityPools[stabilityPool], "StabilityPool already created.");

		stabilityPools[asset] = stabilityPool;
		validStabilityPools[stabilityPool] = true;
	}

	function removeStabilityPool(address asset) external isController {
		delete validStabilityPools[stabilityPools[asset]];
		delete stabilityPools[asset];
	}

	function getAssetStabilityPool(address asset)
		external
		view
		override
		returns (IStabilityPool)
	{
		require(stabilityPools[asset] != address(0), "Invalid asset StabilityPool");
		return IStabilityPool(stabilityPools[asset]);
	}


	// // 
	// function getMinStakingStabilityPool()
	// 	external
	// 	view
	// 	returns (IStabilityPool)
	// {
	// 	// TODO - 查询已 mint USDA 的比例
	// 	// TODO - 增加存款金额的分配机制
	// 	// - 大额度按比例分配， 金额数量待定
	// 	// - 小额存入最小 mint 比例池
	// 	address[] memory memoStabilityPoolList = stabilityPoolList;


	// 	// 
	// 	for (uint i = 0; i < memoStabilityPoolList.length; i++) {
	// 		uint256 stablilitypBalance = IStabilityPool(memoStabilityPoolList[i]).getAssetBalance();
	// 		uint256 nextStablilitypBalance = IStabilityPool(memoStabilityPoolList[i+1]).getAssetBalance();
			
	// 		if (stablilitypBalance < nextStablilitypBalance) {
	// 			address temp = memoStabilityPoolList[i];
	// 			memoStabilityPoolList[i] = memoStabilityPoolList[i+1];
	// 			memoStabilityPoolList[i+1] = temp;
	// 		}
	// 	}

	// 	IStabilityPool minStakingSP = IStabilityPool(memoStabilityPoolList[memoStabilityPoolList.length -1]);

	// 	return minStakingSP;
	// }

	function unsafeGetAssetStabilityPool(address _asset)
		external
		view
		override
		returns (address)
	{
		return stabilityPools[_asset];
	}
}

