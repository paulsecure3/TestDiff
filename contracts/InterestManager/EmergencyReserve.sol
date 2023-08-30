// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.17;

import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EmergencyReserve is OwnableUpgradeable {
	address public usda;

	function setUp(address _usda) external initializer {
		__Ownable_init();
		usda = _usda;
	}

	function withdraw(address _to) external onlyOwner {
		IERC20(usda).transfer(_to, IERC20(usda).balanceOf(address(this)));
	}
}

