// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
import "./IAGLParameters.sol";

interface IAGLBase {
	event VaultParametersBaseChanged(address indexed newAddress);

	function aglParams() external view returns (IAGLParameters);
}
