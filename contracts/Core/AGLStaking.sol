// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import "../Dependencies/BaseMath.sol";
import "../Dependencies/CheckContract.sol";
import "../Dependencies/AGLMath.sol";
import "../Interfaces/IAGLStaking.sol";
import "../Interfaces/IDeposit.sol";
import "../Dependencies/SafetyTransfer.sol";

contract AGLStaking is
    IAGLStaking,
    PausableUpgradeable,
    OwnableUpgradeable,
    CheckContract,
    BaseMath,
    ReentrancyGuardUpgradeable
{
    using SafeMathUpgradeable for uint256;
    using SafeERC20Upgradeable for IERC20Upgradeable;

    bool public isInitialized;

    // --- Data ---
    string public constant NAME = "AGLStaking";
    address constant ETH_REF_ADDRESS = address(0);

    mapping(address => uint256) public stakes;
    uint256 public totalAGLStaked;

    mapping(address => uint256) public F_ASSETS; // Running sum of ETH fees per-AGL-staked
    uint256 public F_USDA; // Running sum of AGL fees per-AGL-staked

    // User snapshots of F_ETH and F_USDA, taken at the point at which their latest deposit was made
    mapping(address => Snapshot) public snapshots;

    struct Snapshot {
        mapping(address => uint256) F_ASSET_Snapshot;
        uint256 F_USDA_Snapshot;
    }

    address[] ASSET_TYPE;
    mapping(address => bool) isAssetTracked;
    mapping(address => uint256) public sentToTreasuryTracker;

    IERC20Upgradeable public override aglToken;
    IERC20Upgradeable public usdaToken;

    address public troveManagerAddress;
    address public borrowerOperationsAddress;
    address public activePoolAddress;
    address public treasury;
    address public redemptorAddress;

    // --- Functions ---
    function setAddresses(
        address _usdaaTokenAddress,
        address _usdaTokenAddress,
        address _troveManagerAddress,
        address _borrowerOperationsAddress,
        address _activePoolAddress,
        address _treasury
    ) external override initializer {
        require(!isInitialized, "Already Initialized");
        require(_treasury != address(0), "Invalid Treausry Address");
        checkContract(_usdaaTokenAddress);
        checkContract(_usdaTokenAddress);
        checkContract(_troveManagerAddress);
        checkContract(_borrowerOperationsAddress);
        checkContract(_activePoolAddress);
        isInitialized = true;

        __Pausable_init();
        __ReentrancyGuard_init();
        __Ownable_init();
        _pause();

        aglToken = IERC20Upgradeable(_usdaaTokenAddress);
        usdaToken = IERC20Upgradeable(_usdaTokenAddress);
        troveManagerAddress = _troveManagerAddress;
        borrowerOperationsAddress = _borrowerOperationsAddress;
        activePoolAddress = _activePoolAddress;
        treasury = _treasury;

        isAssetTracked[ETH_REF_ADDRESS] = true;
        ASSET_TYPE.push(ETH_REF_ADDRESS);

        emit AGLTokenAddressSet(_usdaaTokenAddress);
        emit AGLTokenAddressSet(_usdaTokenAddress);
        emit TroveManagerAddressSet(_troveManagerAddress);
        emit BorrowerOperationsAddressSet(_borrowerOperationsAddress);
        emit ActivePoolAddressSet(_activePoolAddress);
    }

    function setRedemptorAddress(address _redemptorAddress) external onlyOwner {
        checkContract(_redemptorAddress);
        redemptorAddress = _redemptorAddress;
    }

    // If caller has a pre-existing stake, send any accumulated ETH and USDA gains to them.
    function stake(
        uint256 _AGLamount
    ) external override nonReentrant whenNotPaused {
        require(_AGLamount > 0);

        uint256 currentStake = stakes[msg.sender];

        uint256 assetLength = ASSET_TYPE.length;
        uint256 AssetGain;
        address asset;

        for (uint256 i = 0; i < assetLength; i++) {
            asset = ASSET_TYPE[i];

            if (currentStake != 0) {
                AssetGain = _getPendingAssetGain(asset, msg.sender);

                if (i == 0) {
                    uint256 USDAGain = _getPendingUSDAGain(msg.sender);
                    usdaToken.transfer(msg.sender, USDAGain);

                    emit StakingGainsUSDAWithdrawn(msg.sender, USDAGain);
                }

                _sendAssetGainToUser(asset, AssetGain);
                emit StakingGainsAssetWithdrawn(msg.sender, asset, AssetGain);
            }

            _updateUserSnapshots(asset, msg.sender);
        }

        uint256 newStake = currentStake.add(_AGLamount);

        // Increase user’s stake and total AGL staked
        stakes[msg.sender] = newStake;
        totalAGLStaked = totalAGLStaked.add(_AGLamount);
        emit TotalAGLStakedUpdated(totalAGLStaked);

        // Transfer AGL from caller to this contract
        aglToken.transferFrom(msg.sender, address(this), _AGLamount);

        emit StakeChanged(msg.sender, newStake);
    }

    // Unstake the AGL and send the it back to the caller, along with their accumulated USDA & ETH gains.
    // If requested amount > stake, send their entire stake.
    function unstake(uint256 _AGLamount) external override nonReentrant {
        uint256 currentStake = stakes[msg.sender];
        _requireUserHasStake(currentStake);

        uint256 assetLength = ASSET_TYPE.length;
        uint256 AssetGain;
        address asset;

        for (uint256 i = 0; i < assetLength; i++) {
            asset = ASSET_TYPE[i];

            // Grab any accumulated ETH and USDA gains from the current stake
            AssetGain = _getPendingAssetGain(asset, msg.sender);

            if (i == 0) {
                uint256 USDAGain = _getPendingUSDAGain(msg.sender);
                usdaToken.transfer(msg.sender, USDAGain);
                emit StakingGainsUSDAWithdrawn(msg.sender, USDAGain);
            }

            _updateUserSnapshots(asset, msg.sender);
            emit StakingGainsAssetWithdrawn(msg.sender, asset, AssetGain);

            _sendAssetGainToUser(asset, AssetGain);
        }

        if (_AGLamount > 0) {
            uint256 AGLToWithdraw = AGLMath._min(_AGLamount, currentStake);

            uint256 newStake = currentStake.sub(AGLToWithdraw);

            // Decrease user's stake and total AGL staked
            stakes[msg.sender] = newStake;
            totalAGLStaked = totalAGLStaked.sub(AGLToWithdraw);
            emit TotalAGLStakedUpdated(totalAGLStaked);

            // Transfer unstaked AGL to user
            aglToken.transfer(msg.sender, AGLToWithdraw);

            emit StakeChanged(msg.sender, newStake);
        }
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function changeTreasuryAddress(address _treasury) public onlyOwner {
        treasury = _treasury;
        emit TreasuryAddressChanged(_treasury);
    }

    // --- Reward-per-unit-staked increase functions. Called by Vesta core contracts ---

    function increaseF_Asset(
        address _asset,
        uint256 _AssetFee
    ) external override callerIsTroveManagerOrTroveRedemptor {
        if (paused()) {
            sendToTreasury(_asset, _AssetFee);
            return;
        }

        if (!isAssetTracked[_asset]) {
            isAssetTracked[_asset] = true;
            ASSET_TYPE.push(_asset);
        }

        uint256 AssetFeePerAGLStaked;

        if (totalAGLStaked > 0) {
            AssetFeePerAGLStaked = _AssetFee.mul(DECIMAL_PRECISION).div(
                totalAGLStaked
            );
        }

        F_ASSETS[_asset] = F_ASSETS[_asset].add(AssetFeePerAGLStaked);
        emit F_AssetUpdated(_asset, F_ASSETS[_asset]);
    }

    function increaseF_USDA(
        uint256 _USDAFee
    ) external override callerIsBorrowerOperations {
        if (paused()) {
            sendToTreasury(address(usdaToken), _USDAFee);
            return;
        }

        uint256 USDAFeePerAGLStaked;

        if (totalAGLStaked > 0) {
            USDAFeePerAGLStaked = _USDAFee.mul(DECIMAL_PRECISION).div(
                totalAGLStaked
            );
        }

        F_USDA = F_USDA.add(USDAFeePerAGLStaked);
        emit F_USDAUpdated(F_USDA);
    }

    function sendToTreasury(address _asset, uint256 _amount) internal {
        _sendAsset(treasury, _asset, _amount);
        sentToTreasuryTracker[_asset] += _amount;

        emit SentToTreasury(_asset, _amount);
    }

    // --- Pending reward functions ---

    function getPendingAssetGain(
        address _asset,
        address _user
    ) external view override returns (uint256) {
        return _getPendingAssetGain(_asset, _user);
    }

    function _getPendingAssetGain(
        address _asset,
        address _user
    ) internal view returns (uint256) {
        uint256 F_ASSET_Snapshot = snapshots[_user].F_ASSET_Snapshot[_asset];
        uint256 AssetGain = stakes[_user]
            .mul(F_ASSETS[_asset].sub(F_ASSET_Snapshot))
            .div(DECIMAL_PRECISION);
        return AssetGain;
    }

    function getPendingUSDAGain(
        address _user
    ) external view override returns (uint256) {
        return _getPendingUSDAGain(_user);
    }

    function _getPendingUSDAGain(address _user) internal view returns (uint256) {
        uint256 F_USDA_Snapshot = snapshots[_user].F_USDA_Snapshot;
        uint256 USDAGain = stakes[_user].mul(F_USDA.sub(F_USDA_Snapshot)).div(
            DECIMAL_PRECISION
        );
        return USDAGain;
    }

    // --- Internal helper functions ---

    function _updateUserSnapshots(address _asset, address _user) internal {
        snapshots[_user].F_ASSET_Snapshot[_asset] = F_ASSETS[_asset];
        snapshots[_user].F_USDA_Snapshot = F_USDA;
        emit StakerSnapshotsUpdated(_user, F_ASSETS[_asset], F_USDA);
    }

    function _sendAssetGainToUser(address _asset, uint256 _assetGain) internal {
        _sendAsset(msg.sender, _asset, _assetGain);
    }

    function _sendAsset(
        address _sendTo,
        address _asset,
        uint256 _amount
    ) internal {
        if (_asset == ETH_REF_ADDRESS) {
            (bool success, ) = _sendTo.call{value: _amount}("");
            require(
                success,
                "AGLStaking: Failed to send accumulated AssetGain"
            );
        } else {
            _amount = SafetyTransfer.decimalsCorrection(_asset, _amount);
            IERC20Upgradeable(_asset).safeTransfer(_sendTo, _amount);
        }

        emit AssetSent(_asset, _sendTo, _amount);
    }

    // --- 'require' functions ---

    modifier callerIsTroveManagerOrTroveRedemptor() {
        require(
            msg.sender == troveManagerAddress || msg.sender == redemptorAddress,
            "AGLStaking: caller is not TroveM or redemptor"
        );
        _;
    }

    modifier callerIsBorrowerOperations() {
        require(
            msg.sender == borrowerOperationsAddress,
            "AGLStaking: caller is not BorrowerOps"
        );
        _;
    }

    modifier callerIsActivePool() {
        require(
            msg.sender == activePoolAddress,
            "AGLStaking: caller is not ActivePool"
        );
        _;
    }

    function _requireUserHasStake(uint256 currentStake) internal pure {
        require(
            currentStake > 0,
            "AGLStaking: User must have a non-zero stake"
        );
    }

    receive() external payable callerIsActivePool {}
}
