// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";

import "../Dependencies/CheckContract.sol";

import "../Interfaces/IStabilityPoolManager.sol";
import "../Interfaces/IAGLParameters.sol";
import "../Interfaces/IStabilityPool.sol";
import "../Interfaces/ICommunityIssuance.sol";

contract AdminContract is ProxyAdmin {
	string public constant NAME = "AdminContract";

	bytes32 public constant STABILITY_POOL_NAME_BYTES =
		0xf704b47f65a99b2219b7213612db4be4a436cdf50624f4baca1373ef0de0aac7;
	bool public isInitialized;

	IAGLParameters private agilelyParameters;
	IStabilityPoolManager private stabilityPoolManager;
	ICommunityIssuance private communityIssuance;

	address borrowerOperationsAddress;
	address troveManagerAddress;
	address usdaTokenAddress;
	address sortedTrovesAddress;



	function setAddresses(
		address _parameters,
		address _stabilityPoolManager,
		address _borrowerOperationsAddress,
		address _troveManagerAddress,
		address _usdaTokenAddress,
		address _sortedTrovesAddress,
		address _communityIssuanceAddress
	) external onlyOwner {
		require(!isInitialized);
		CheckContract(_parameters);
		CheckContract(_stabilityPoolManager);
		CheckContract(_borrowerOperationsAddress);
		CheckContract(_troveManagerAddress);
		CheckContract(_usdaTokenAddress);
		CheckContract(_sortedTrovesAddress);
		CheckContract(_communityIssuanceAddress);
		isInitialized = true;

		borrowerOperationsAddress = _borrowerOperationsAddress;
		troveManagerAddress = _troveManagerAddress;
		usdaTokenAddress = _usdaTokenAddress;
		sortedTrovesAddress = _sortedTrovesAddress;
		communityIssuance = ICommunityIssuance(_communityIssuanceAddress);

		agilelyParameters = IAGLParameters(_parameters);
		stabilityPoolManager = IStabilityPoolManager(_stabilityPoolManager);
	}

	//Needs to approve Community Issuance to use this function.
	function addNewCollateral(
		address _asset,
		address _stabilityPoolImplementation,
		address _chainlinkOracle,
		address _chainlinkIndex,
		uint256 assignedToken,
		uint256 _tokenPerWeekDistributed,
		uint256 redemptionLockInDay
	) external onlyOwner {
		require(
			stabilityPoolManager.unsafeGetAssetStabilityPool(_asset) == address(0),
			"This collateral already exists"
		);
		// require(
		// 	IStabilityPool(_stabilityPoolImplementation).getNameBytes() == STABILITY_POOL_NAME_BYTES,
		// 	"Invalid Stability pool"
		// );

		agilelyParameters.priceFeed().addOracle(_asset, _chainlinkOracle, _chainlinkIndex);
		agilelyParameters.setAsDefaultWithRedemptionBlock(_asset, redemptionLockInDay);

		TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(
			_stabilityPoolImplementation,
			address(this),
			abi.encodeWithSignature(
				"setAddresses(address,address,address,address,address,address,address)",
				_asset,
				borrowerOperationsAddress,
				troveManagerAddress,
				usdaTokenAddress,
				sortedTrovesAddress,
				address(communityIssuance),
				address(agilelyParameters)
			)
		);

		address proxyAddress = address(proxy);
		stabilityPoolManager.addStabilityPool(_asset, proxyAddress);
		communityIssuance.addFundToStabilityPoolFrom(proxyAddress, assignedToken, msg.sender);
		communityIssuance.setWeeklyAglDistribution(proxyAddress, _tokenPerWeekDistributed);
	}
}
