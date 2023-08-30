// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
import "../Dependencies/ERC20Permit.sol";
import "../Interfaces/IStabilityPoolManager.sol";

abstract contract IUSDATokenTest is ERC20Permit {
    // --- Events ---

    function mint(address _account, uint256 _amount) external virtual;

    function burn(address _account, uint256 _amount) external virtual;
}
