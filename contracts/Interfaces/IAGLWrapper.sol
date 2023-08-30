// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IAGLWrapper {
	function wrap(uint256 amount) external returns (bool);

	function unwrap(uint256 amount) external returns (bool);
}
