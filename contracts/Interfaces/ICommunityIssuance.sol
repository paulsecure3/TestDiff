// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

interface ICommunityIssuance {
	// --- Events ---

	event AGLTokenAddressSet(address _AGLTokenAddress);
	event StabilityPoolAddressSet(address _stabilityPoolAddress);
	event TotalAGLIssuedUpdated(address indexed stabilityPool, uint256 _totalAGLIssued);

	struct DistributionRewards {
		address rewardToken;
		uint256 totalRewardIssued;
		uint256 lastUpdateTime;
		uint256 totalRewardSupply;
		uint256 rewardDistributionPerMin;
	}

	// --- Functions ---

	function setAddresses(
		address _AGLTokenAddress,
		address _stabilityPoolAddress,
		address _adminContract
	) external;

	function issueAGL() external returns (uint256);

	function sendAGL(address _account, uint256 _aglAmount) external;

	function addFundToStabilityPool(address _pool, uint256 _assignedSupply) external;

	function addFundToStabilityPoolFrom(
		address _pool,
		uint256 _assignedSupply,
		address _spender
	) external;

	function setWeeklyAglDistribution(address _stabilityPool, uint256 _weeklyReward) external;
}
