// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Test.sol";
import {AgilelyGLPStaking} from "../../contracts/GmxStake/AgilelyGLPStaking.sol";
import {ActivePool} from "../../contracts/Pool/ActivePool.sol";
import {PriceFeed} from "../../contracts/Dependencies/PriceFeed.sol";

//https://arb-mainnet.g.alchemy.com/v2/e1v4q6scVkZ8CbRe6YzFW6rO9tuCGjCq =》 mainnet
//https://arb-goerli.g.alchemy.com/v2/_ueH62I5RgUd6OL3Yo3hvSZq-elJLeFD  =》 goerli
//0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84 部署者
//这个合约需要用Arbiturm goerli 的RPC https://arb-goerli.g.alchemy.com/v2/_ueH62I5RgUd6OL3Yo3hvSZq-elJLeFD  =》 goerli
contract AgilelyGLPStakingTest is Test {
    AgilelyGLPStaking stakeContract;
    ActivePool acPool;
    PriceFeed priceFeed;

    address public constant GMX_TOKEN =
        0x4bb86F8e3ffec0bc25FCE38fAEc99cb81Bb133aF;

    address public constant SGLP = 0x12EA0F9FDC9eb371307f1a87E2CdEB26d1128DF8;

    address public constant REWARD_ROUTER =
        0x2439a447F9631E5B5caD036D4b4e58e5A6D14065;

    address public constant ACCOUNT_ONE =
        0x9788cb07AFf88E46812785a5bA325F05e2FcdC06;

    address public constant SENDER = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38;

    address public constant OWNER = 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496;

    address public constant TRACKEER =
        0x5294A1B34Bd717EAC8b4eF2918B07e006d66DcD7;

    function setUp() public {
        stakeContract = new AgilelyGLPStaking();
        acPool = new ActivePool();
        priceFeed = new PriceFeed();
        // gmxRewardRouterV2 = new GMXRewardRouterV2(REWARD_ROUTER);
    }

    /**Owner Modules */
    function testOriginOwner() public {
        address originOwner = stakeContract.owner();
        assertEq(originOwner, address(0));
    }

    function testNewOwner() public {
        stakeContract.setUp(SENDER, SGLP, REWARD_ROUTER, TRACKEER);
        address newOwner = stakeContract.owner();
        assertEq(newOwner, address(this));
    }

    function testSetOperatorAsOwner() public {
        testNewOwner();
        stakeContract.setOperator(GMX_TOKEN, true);
    }

    function testFailSetOperatorAsNotOwner() public {
        stakeContract.setOperator(GMX_TOKEN, true);
    }

    function testIsOperator() public {
        testNewOwner();
        stakeContract.setOperator(GMX_TOKEN, true);
        bool isOp = stakeContract.isOperator(GMX_TOKEN);
        assertTrue(isOp);
    }

    function testFailNotOwnerStake() public {
        //not owner
        stakeContract.stake(ACCOUNT_ONE, 100e18);
    }

    /**Owner Modules */

    /**Vault Module */
    function testGetBalance() public {
        uint256 bal = stakeContract.getBalance();
        assertEq(bal, 0);
    }

    /**Price fee address*/
    function testSetPriceFeed() public {
        stakeContract.setUp(SENDER, SGLP, REWARD_ROUTER, TRACKEER);
        assertEq(address(stakeContract.priceFeed()), address(0));
        stakeContract.setPriceFeed(address(priceFeed));
        assertEq(address(stakeContract.priceFeed()), address(priceFeed));
    }

    /**TreasuryFee */
    function testTreasuryFee() public {
        stakeContract.setUp(SENDER, SGLP, REWARD_ROUTER, TRACKEER);
        assertFalse(stakeContract.useStaticFee());
        assertEq(stakeContract.baseTreasuryFee(), 2000);

        stakeContract.enableStaticTreasuryFee(true);
        assertEq(stakeContract.baseTreasuryFee(), 2000);
        assertTrue(stakeContract.useStaticFee());
    }

    function testFailChangeTreasuryFeeOOH(uint64 fee) public {
        stakeContract.setUp(SENDER, SGLP, REWARD_ROUTER, TRACKEER);
        vm.assume(fee > 10000);
        stakeContract.setBaseTreasuryFee(fee);
        vm.expectRevert("BPSHigherThanOneHundred");
    }

    function testFailChangeTreasuryFeeHIGH(uint64 fee) public {
        stakeContract.setUp(SENDER, SGLP, REWARD_ROUTER, TRACKEER);
        vm.assume(fee < 10000 && fee > 2000);
        stakeContract.setBaseTreasuryFee(fee);
        vm.expectRevert("FeeTooHigh");
    }

    function testChangeTreasuryFeeGood(uint64 fee) public {
        stakeContract.setUp(SENDER, SGLP, REWARD_ROUTER, TRACKEER);
        vm.assume(fee > 0 && fee < 2000);
        stakeContract.setBaseTreasuryFee(fee);
        assertEq(stakeContract.baseTreasuryFee(), fee);
    }
    // f0741fbc  =>  enableStaticTreasuryFee(bool)
    // 1b775390  =>  setBaseTreasuryFee(uint256)
    // baseTreasuryFee()
    // 12d5a8b9  =>  _payTreasuryFee(uint256)

    // 09b478a9  =>  forceExiting(address)
    // 2e38cb3c  =>  _unstake(address,uint256,address)
    // ec10ffcb  =>  _harvest(address)
    // 0614117a  =>  recoverETH()
    // 724e78da  =>  setPriceFeed(address) **
    // f0f44260  =>  setTreasury(address)
    // 1fb288c6  =>  applyNewFeeFlow()
    // cc32d176  =>  treasuryFee()
    // 1c7810a5  =>  retrySendTreasuryFund()
    // 7588898d  =>  setFeeGlpTrackerReward(address)
    // 11ce4f0a  =>  getVaultStake(address)
    // a12b3661  =>  getVaultOwnerShare(address)
    // b8b50f1c  =>  getVaultOwnerClaimable(address)
    // 12065fe0  =>  getBalance() **
    // c50e0347  =>  getRecoverableETH(address)
    // 6d70f7ae  =>  isOperator(address) **

    // function test_getVaultStake() public {
    //     uint256 aount = stakeContract.getVaultStake(ACCOUNT_ONE);
    //     assertEq(aount, 0);
    // }

    // function test_stake() public {
    //     test_NewOwner();
    //     stakeContract.setOperator(GMX_TOKEN, true);
    //     vm.prank(GMX_TOKEN);
    //     stakeContract.stake(ACCOUNT_ONE, 100e18);
    // }

    // function test_claim() public {
    //     vm.prank(ACCOUNT_ONE);
    //     stakeContract.claim();
    // }

    // function test_checkGMXSlot() public {
    //     (bytes32[] memory readSlots, bytes32[] memory writeSlots) = vm.accesses(
    //         GMX_TOKEN
    //     );
    //     console.logBytes32(readSlots[0]);
    //     console.logBytes32(writeSlots[0]);
    // }

    // function test_Stake() public {
    //     // vm.prank(BASE_ADDRESS);
    //     stakeContract.stake(BASE_ADDRESS, 100e18);
    // }

    // function test_stake() public {
    //     vm.prank(BASE_ADDRESS);
    //     stakeContract.stake(ACCOUNT_ONE, 1000e18);
    // }

    // address public constant OWNER_ADDRESS =
    //     0x9788cb07AFf88E46812785a5bA325F05e2FcdC06;
    // address public constant DEPLOYER_ADDRESS =
    //     0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84;
    // address public constant GLP_ADDRESS =
    //     vm.addr(0x12EA0F9FDC9eb371307f1a87E2CdEB26d1128DF8);
    //         address public constant  RewardRouterV2 =0xA906F338CB21815cBc4Bc87ace9e68c87eF8d8F1
    // IGMXRewardTracker public constant GMXREWARD_TRACKER  = IGMXRewardTracker(0x5294A1B34Bd717EAC8b4eF2918B07e006d66DcD7);
}
