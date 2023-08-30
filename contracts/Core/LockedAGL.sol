// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "../Dependencies/CheckContract.sol";

/*
This contract is reserved for Linear Vesting to the Team members and the Advisors team.
*/
contract LockedAGL is Ownable, CheckContract {
	using SafeERC20 for IERC20;
	using SafeMath for uint256;

	struct Rule {
		uint256 createdDate;
		uint256 totalSupply;
		uint256 startVestingDate;
		uint256 endVestingDate;
		uint256 claimed;
	}

	string public constant NAME = "LockedAGL";
	uint256 public constant SIX_MONTHS = 26 weeks;
	uint256 public constant TWO_YEARS = 730 days;

	bool public isInitialized;

	IERC20 private aglToken;
	uint256 private assignedAGLTokens;

	mapping(address => Rule) public entitiesVesting;

	modifier entityRuleExists(address _entity) {
		require(entitiesVesting[_entity].createdDate != 0, "Entity doesn't have a Vesting Rule");
		_;
	}

	function setAddresses(address _aglAddress) public onlyOwner {
		require(!isInitialized, "Already Initialized");
		checkContract(_aglAddress);
		isInitialized = true;

		aglToken = IERC20(_aglAddress);
	}

	function addEntityVesting(address _entity, uint256 _totalSupply) public onlyOwner {
		require(address(0) != _entity, "Invalid Address");

		require(entitiesVesting[_entity].createdDate == 0, "Entity already has a Vesting Rule");

		assignedAGLTokens += _totalSupply;

		entitiesVesting[_entity] = Rule(
			block.timestamp,
			_totalSupply,
			block.timestamp.add(SIX_MONTHS),
			block.timestamp.add(TWO_YEARS),
			0
		);

		aglToken.safeTransferFrom(msg.sender, address(this), _totalSupply);
	}

	function lowerEntityVesting(address _entity, uint256 newTotalSupply)
		public
		onlyOwner
		entityRuleExists(_entity)
	{
		sendAGLTokenToEntity(_entity);
		Rule storage vestingRule = entitiesVesting[_entity];

		require(
			newTotalSupply > vestingRule.claimed,
			"Total Supply goes lower or equal than the claimed total."
		);

		assignedAGLTokens = assignedAGLTokens.sub(vestingRule.totalSupply.sub(newTotalSupply));
		vestingRule.totalSupply = newTotalSupply;
	}

	function removeEntityVesting(address _entity) public onlyOwner entityRuleExists(_entity) {
		sendAGLTokenToEntity(_entity);
		Rule memory vestingRule = entitiesVesting[_entity];

		assignedAGLTokens = assignedAGLTokens.sub(
			vestingRule.totalSupply.sub(vestingRule.claimed)
		);

		delete entitiesVesting[_entity];
	}

	function claimAGLToken() public entityRuleExists(msg.sender) {
		sendAGLTokenToEntity(msg.sender);
	}

	function sendAGLTokenToEntity(address _entity) private {
		uint256 unclaimedAmount = getClaimableAGL(_entity);
		if (unclaimedAmount == 0) return;

		Rule storage entityRule = entitiesVesting[_entity];
		entityRule.claimed += unclaimedAmount;

		assignedAGLTokens = assignedAGLTokens.sub(unclaimedAmount);
		aglToken.safeTransfer(_entity, unclaimedAmount);
	}

	function transferUnassignedAGL() external onlyOwner {
		uint256 unassignedTokens = getUnassignAGLTokensAmount();

		if (unassignedTokens == 0) return;

		aglToken.safeTransfer(msg.sender, unassignedTokens);
	}

	function getClaimableAGL(address _entity) public view returns (uint256 claimable) {
		Rule memory entityRule = entitiesVesting[_entity];
		claimable = 0;

		if (entityRule.startVestingDate > block.timestamp) return claimable;

		if (block.timestamp >= entityRule.endVestingDate) {
			claimable = entityRule.totalSupply.sub(entityRule.claimed);
		} else {
			claimable = entityRule
				.totalSupply
				.div(TWO_YEARS)
				.mul(block.timestamp.sub(entityRule.createdDate))
				.sub(entityRule.claimed);
		}

		return claimable;
	}

	function getUnassignAGLTokensAmount() public view returns (uint256) {
		return aglToken.balanceOf(address(this)).sub(assignedAGLTokens);
	}

	function isEntityExits(address _entity) public view returns (bool) {
		return entitiesVesting[_entity].createdDate != 0;
	}
}
