// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
import "../Dependencies/CheckContract.sol";
import "../Interfaces/IAGLStaking.sol";

contract AGLStakingScript is CheckContract {
	IAGLStaking immutable aglStaking;

	constructor(address _AGLStakingAddress) {
		checkContract(_AGLStakingAddress);
		aglStaking = IAGLStaking(_AGLStakingAddress);
	}

	function stake(uint256 _AGLamount) external {
		aglStaking.stake(_AGLamount);
	}
}
