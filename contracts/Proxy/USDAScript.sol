// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../Dependencies/CheckContract.sol";
import "../Interfaces/IAGLStaking.sol";
import "../Interfaces/IStabilityPoolManager.sol";
import "../Interfaces/IUSDAScriptTest.sol";
import "../Interfaces/IUSDATokenTest.sol";

contract USDAScript is IUSDAScriptTest, CheckContract, Ownable {
    event USDATokenAddressChanged(address _usdaAddress);
    event EmergencyStopMintingCollateral(address _asset, bool state);

    IStabilityPoolManager public immutable stabilityPoolManager;
    IUSDATokenTest public immutable usdaTokenAddress;
    address public immutable troveManagerAddress;
    address public immutable borrowerOperationsAddress;

    mapping(address => bool) public emergencyStopMintingCollateral;

    constructor(
        address _troveManagerAddress,
        address _stabilityPoolManagerAddress,
        address _borrowerOperationsAddress,
        address _usdaTokenAddress
    ) {
        checkContract(_troveManagerAddress);
        checkContract(_stabilityPoolManagerAddress);
        checkContract(_borrowerOperationsAddress);
        checkContract(_usdaTokenAddress);

        troveManagerAddress = _troveManagerAddress;
        emit TroveManagerAddressChanged(_troveManagerAddress);

        stabilityPoolManager = IStabilityPoolManager(
            _stabilityPoolManagerAddress
        );
        emit StabilityPoolAddressChanged(_stabilityPoolManagerAddress);

        borrowerOperationsAddress = _borrowerOperationsAddress;
        emit BorrowerOperationsAddressChanged(_borrowerOperationsAddress);

        usdaTokenAddress = IUSDATokenTest(_usdaTokenAddress);
        emit USDATokenAddressChanged(_usdaTokenAddress);
    }

    // --- Functions for intra-Agilely calls ---

    function mint(
        address _asset,
        address _account,
        uint256 _amount
    ) external override {
        _requireCallerIsBorrowerOperations();
        require(
            !emergencyStopMintingCollateral[_asset],
            "Mint is blocked on this collateral"
        );

        usdaTokenAddress.mint(_account, _amount);
    }

    function burn(address _account, uint256 _amount) external override {
        _requireCallerIsBOorTroveMorSP();
        usdaTokenAddress.burn(_account, _amount);
    }

    function sendToPool(
        address _sender,
        address _poolAddress,
        uint256 _amount
    ) external override {
        _requireCallerIsStabilityPool();
        usdaTokenAddress.transferFrom(_sender, _poolAddress, _amount);
    }

    function returnFromPool(
        address _poolAddress,
        address _receiver,
        uint256 _amount
    ) external override {
        _requireCallerIsTroveMorSP();
        usdaTokenAddress.transferFrom(_poolAddress, _receiver, _amount);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public returns (bool) {
        _requireValidRecipient(recipient);
        return usdaTokenAddress.transferFrom(sender, recipient, amount);
    }

    function emergencyStopMinting(
        address _asset,
        bool status
    ) external override onlyOwner {
        emergencyStopMintingCollateral[_asset] = status;
        emit EmergencyStopMintingCollateral(_asset, status);
    }

    function balanceOf(address account) external view override returns (uint256) {
        return usdaTokenAddress.balanceOf(account);
    }

    // --- External functions ---

    // --- 'require' functions ---

    function _requireValidRecipient(address _recipient) internal view {
        require(
            _recipient != address(0) && _recipient != address(this),
            "USDA: Cannot transfer tokens directly to the USDA token contract or the zero address"
        );
        require(
            !stabilityPoolManager.isStabilityPool(_recipient) &&
                _recipient != troveManagerAddress &&
                _recipient != borrowerOperationsAddress,
            "USDA: Cannot transfer tokens directly to the StabilityPool, TroveManager or BorrowerOps"
        );
    }

    function _requireCallerIsBorrowerOperations() internal view {
        require(
            msg.sender == borrowerOperationsAddress,
            "USDAToken: Caller is not BorrowerOperations"
        );
    }

    function _requireCallerIsBOorTroveMorSP() internal view {
        require(
            msg.sender == borrowerOperationsAddress ||
                msg.sender == troveManagerAddress ||
                stabilityPoolManager.isStabilityPool(msg.sender),
            "USDA: Caller is neither BorrowerOperations nor TroveManager nor StabilityPool"
        );
    }

    function _requireCallerIsStabilityPool() internal view {
        require(
            stabilityPoolManager.isStabilityPool(msg.sender),
            "USDA: Caller is not the StabilityPool"
        );
    }

    function _requireCallerIsTroveMorSP() internal view {
        require(
            msg.sender == troveManagerAddress ||
                stabilityPoolManager.isStabilityPool(msg.sender),
            "USDA: Caller is neither TroveManager nor StabilityPool"
        );
    }
}
