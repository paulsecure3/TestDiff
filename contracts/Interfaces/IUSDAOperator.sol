// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUSDAOperator {
	function mint(address _to, uint256 _amount) external;
}
