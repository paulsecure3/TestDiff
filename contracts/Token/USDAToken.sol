// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "../Dependencies/CheckContract.sol";
import "../Interfaces/IUSDAToken.sol";
import "../Interfaces/IStabilityPoolManager.sol";
import "../Dependencies/layerzero/token/oft/v2/OFTV2.sol";

contract USDAToken is OFTV2, CheckContract, IUSDAToken {
    using SafeMath for uint256;

    IStabilityPoolManager public stabilityPoolManager;
    address public troveManagerAddress;
    address public borrowerOperationsAddress;
    bool public isActiveChain = false;

    mapping(address => bool) public emergencyStopMintingCollateral;
    address public redemptorAddress;

    event EmergencyStopMintingCollateral(address _asset, bool state);

    constructor(
        address _troveManagerAddress,
        address _stabilityPoolManagerAddress,
        address _borrowerOperationsAddress,
        address _layerZeroEndpoint,
        uint8 _sharedDecimals,
        bool _isActiveChain
    ) OFTV2("USD Agilely Stable", "USDA", _sharedDecimals, _layerZeroEndpoint) {

        if (_isActiveChain) {
            _setupContract(
                _troveManagerAddress,
                _stabilityPoolManagerAddress,
                _borrowerOperationsAddress
            );
        }
        isActiveChain = _isActiveChain;
    }

    function setRedemptorAddress(address _redemptorAddress) external onlyOwner {
        checkContract(_redemptorAddress);
        redemptorAddress = _redemptorAddress;
    }

    // --- Functions for intra-Agilely calls ---

    //
    function emergencyStopMinting(
        address _asset,
        bool status
    ) external override onlyOwner {
        emergencyStopMintingCollateral[_asset] = status;
        emit EmergencyStopMintingCollateral(_asset, status);
    }

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

        _mint(_account, _amount);
    }

    function _requireCallerIsBorrowerOperations() internal view {
        require(
            msg.sender == borrowerOperationsAddress,
            "USDAToken: Caller is not BorrowerOperations"
        );
    }

    function burn(address _account, uint256 _amount) external override {
        _requireCallerIsBOorTroveMorSPorTR();
        _burn(_account, _amount);
    }

    function sendToPool(
        address _sender,
        address _poolAddress,
        uint256 _amount
    ) external override {
        _requireCallerIsStabilityPool();
        _transfer(_sender, _poolAddress, _amount);
    }

    function returnFromPool(
        address _poolAddress,
        address _receiver,
        uint256 _amount
    ) external override {
        _requireCallerIsTroveMorSP();
        _transfer(_poolAddress, _receiver, _amount);
    }

    // --- External functions ---

    function transfer(
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        _requireValidRecipient(recipient);
        return super.transfer(recipient, amount);
    }

    function setupContract(
        address _troveManagerAddress,
        address _stabilityPoolManagerAddress,
        address _borrowerOperationsAddress,
        bool _isActive
    ) external onlyOwner {
        _setupContract(
            _troveManagerAddress,
            _stabilityPoolManagerAddress,
            _borrowerOperationsAddress
        );
        isActiveChain = _isActive;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        _requireValidRecipient(recipient);
        return super.transferFrom(sender, recipient, amount);
    }

    // --- 'require' functions ---
    function _requireValidRecipient(address _recipient) internal view {
        _requireActiveDep();
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

    function _requireCallerIsBOorTroveMorSPorTR() internal view {
        _requireActiveDep();
        require(
            msg.sender == borrowerOperationsAddress ||
                msg.sender == troveManagerAddress ||
                stabilityPoolManager.isStabilityPool(msg.sender) ||
                msg.sender == redemptorAddress,
            "USDA: Caller is neither BorrowerOperations nor TroveManager nor StabilityPool"
        );
    }

    function _requireCallerIsStabilityPool() internal view {
        _requireActiveDep();
        require(
            stabilityPoolManager.isStabilityPool(msg.sender),
            "USDA: Caller is not the StabilityPool"
        );
    }

    function _requireCallerIsTroveMorSP() internal view {
        _requireActiveDep();
        require(
            msg.sender == troveManagerAddress ||
                stabilityPoolManager.isStabilityPool(msg.sender),
            "USDA: Caller is neither TroveManager nor StabilityPool"
        );
    }

    function _requireActiveDep() internal view {
        require(
            isActiveChain,
            "USDA: Caller is unactive to setup contract"
        );
    }

    function _setupContract(
        address _troveManagerAddress,
        address _stabilityPoolManagerAddress,
        address _borrowerOperationsAddress
    ) internal {
        checkContract(_troveManagerAddress);
        checkContract(_stabilityPoolManagerAddress);
        checkContract(_borrowerOperationsAddress);

        troveManagerAddress = _troveManagerAddress;
        emit TroveManagerAddressChanged(_troveManagerAddress);

        stabilityPoolManager = IStabilityPoolManager(
            _stabilityPoolManagerAddress
        );
        emit StabilityPoolAddressChanged(_stabilityPoolManagerAddress);

        borrowerOperationsAddress = _borrowerOperationsAddress;
        emit BorrowerOperationsAddressChanged(_borrowerOperationsAddress);
    }
}
