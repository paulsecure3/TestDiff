// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.17;

import { IInterestManager } from "../Interfaces/IInterestManager.sol";

import { IModuleInterest } from "../Interfaces/IModuleInterest.sol";
import { IPriceFeed } from "../Interfaces/IPriceFeed.sol";
import { IUSDAOperator } from "../Interfaces/IUSDAOperator.sol";
import { ISavingModule } from "../Interfaces/ISavingModule.sol";
import { ITroveManager } from "../Interfaces/ITroveManager.sol";

import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract AgilelyInterestManager is IInterestManager, OwnableUpgradeable {
	uint256 private usdaPrice;

	address public usda;
	address public troveManager;
	address public safetyVault;
	IPriceFeed public oracle;
	IUSDAOperator public usdaOperator;

	address[] private interestModules;
	mapping(address => address) private interestByTokens;

	modifier onlyTroveManager() {
		if (msg.sender != troveManager) revert NotTroveManager();

		_;
	}

	function setUp(
		address _usda,
		address _troveManager,
		address _priceFeed,
		address _usdaOperator,
		address _safetyVault
	) external initializer {
		__Ownable_init();

		usda = _usda;
		troveManager = _troveManager;
		oracle = IPriceFeed(_priceFeed);
		usdaPrice = oracle.getExternalPrice(usda);
		usdaOperator = IUSDAOperator(_usdaOperator);
		safetyVault = _safetyVault;

		require(usdaPrice > 0, "Oracle Failed to fetch USDA price.");
	}

	function setModuleFor(address _token, address _module)
		external
		onlyOwner
	{
		if (getInterestModule(_token) != address(0)) {
			revert ErrorModuleAlreadySet();
		}

		interestByTokens[_token] = _module;
		interestModules.push(_module);

		IModuleInterest(_module).updateEIR(usdaPrice);

		emit ModuleLinked(_token, _module);
	}

	function setSafetyVault(address _newSafetyVault) external onlyOwner {
		safetyVault = _newSafetyVault;
	}

	function increaseDebt(
		address _token,
		address _user,
		uint256 _debt
	) external override onlyTroveManager returns (uint256 interestAdded_) {
		updateModules();

		IModuleInterest module = IModuleInterest(
			IModuleInterest(getInterestModule(_token))
		);

		if (address(module) == address(0)) return 0;

		interestAdded_ = module.increaseDebt(_user, _debt);

		emit DebtChanged(_token, _user, module.getDebtOf(_user));

		return interestAdded_;
	}

	function decreaseDebt(
		address _token,
		address _user,
		uint256 _debt
	) external override onlyTroveManager returns (uint256 interestAdded_) {
		updateModules();

		IModuleInterest module = IModuleInterest(
			IModuleInterest(getInterestModule(_token))
		);

		if (address(module) == address(0)) return 0;

		interestAdded_ = module.decreaseDebt(_user, _debt);

		emit DebtChanged(_token, _user, module.getDebtOf(_user));

		return interestAdded_;
	}

	function exit(address _token, address _user)
		external
		override
		onlyTroveManager
		returns (uint256 interestAdded_)
	{
		updateModules();

		IModuleInterest module = IModuleInterest(
			IModuleInterest(getInterestModule(_token))
		);

		if (address(module) == address(0)) return 0;

		interestAdded_ = module.exit(_user);

		emit DebtChanged(_token, _user, 0);

		return interestAdded_;
	}

	function updateModules() public override {
		usdaPrice = oracle.fetchPrice(usda);
		uint256 totalModules = interestModules.length;

		uint256 interestAdded;
		uint256 totalInterestAdded;
		IModuleInterest module;
		for (uint256 i = 0; i < totalModules; ++i) {
			module = IModuleInterest(interestModules[i]);
			interestAdded = module.updateEIR(usdaPrice);

			if (interestAdded > 0) {
				totalInterestAdded += interestAdded;
				emit InterestMinted(address(module), interestAdded);
			}
		}

		if (totalInterestAdded > 0) {
			usdaOperator.mint(safetyVault, totalInterestAdded);
			ISavingModule(safetyVault).depositUSDA(totalInterestAdded);
		}
	}

/*	function syncWithProtocol(address[] calldata _assets)
		external
		onlyOwner
	{
		updateModules();

		address asset;
		for (uint256 i = 0; i < _assets.length; ++i) {
			asset = _assets[i];
			IModuleInterest(interestByTokens[asset]).syncWithProtocol(
				ITroveManager(troveManager).getEntireSystemDebt(asset)
			);
		}
	}*/

	function getUserDebt(address _token, address _user)
		external
		view
		override
		returns (uint256 currentDebt_, uint256 pendingInterest_)
	{
		IModuleInterest module = IModuleInterest(getInterestModule(_token));

		return
			(address(module) == address(0))
				? (0, 0)
				: (
					module.getDebtOf(_user),
					module.getNotEmittedInterestRate(_user)
				);
	}

	function getInterestModule(address _token)
		public
		view
		override
		returns (address)
	{
		return interestByTokens[_token];
	}

	function getModules() external view override returns (address[] memory) {
		return interestModules;
	}

	function getLastUSDAPrice() external view override returns (uint256) {
		return usdaPrice;
	}
}

