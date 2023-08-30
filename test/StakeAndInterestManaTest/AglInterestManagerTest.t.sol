// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Test.sol";
import {AgilelyInterestManager} from "../../contracts/InterestManager/AgilelyInterestManager.sol";

//https://arb-mainnet.g.alchemy.com/v2/e1v4q6scVkZ8CbRe6YzFW6rO9tuCGjCq =》 mainnet
//https://arb-goerli.g.alchemy.com/v2/_ueH62I5RgUd6OL3Yo3hvSZq-elJLeFD  =》 goerli
//这个合约需要用Arbiturm goerli 的RPC https://arb-goerli.g.alchemy.com/v2/_ueH62I5RgUd6OL3Yo3hvSZq-elJLeFD  =》 goerli

contract AgilelyGLPStakingTest is Test {
    AgilelyInterestManager aglInterestManager;

    address public constant ACCOUNT_ONE =
        0x31145ca958658947AB1365Fa0E26a5C011353045;

    address public constant ACCOUNT_TWO =
        0x5145b4DE1c5F720D881CcBdE2243edDA3BA06Faf;

    address public constant TROVE_MANAGER =
        0x0245A1D6787117929C4fAE0967a361C52D7C7afE;

    address public constant USDA_TOKEN =
        0x9cdC271Cdb06aDf12e40160a726F42e2599fB3b3;

    address public constant PRICE_FEE =
        0x857aea9f9c62aD41c17ECbe3dED95bf868e6ff46;

    address public constant USDA_OPERATOR =
        0x68Fa35c9B495F4D1a554a033672bA21e4B084437;

    address public constant OWNER = 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496;

    address public constant TRACKEER =
        0x5294A1B34Bd717EAC8b4eF2918B07e006d66DcD7;

    function setUp() public {
        aglInterestManager = new AgilelyInterestManager();
        vm.prank(ACCOUNT_ONE);
        aglInterestManager.setUp(
            USDA_TOKEN,
            TROVE_MANAGER,
            PRICE_FEE,
            USDA_OPERATOR,
            USDA_OPERATOR
        );
    }

    // function testDepoly ()

    // function test_checkOwner() public {
    //     assertEq(aglInterestManager.owner(), ACCOUNT_ONE);
    // }

    // function test_transferOwner() public {
    //     vm.prank(ACCOUNT_ONE);
    //     aglInterestManager.transferOwnership(ACCOUNT_TWO);
    //     assertEq(aglInterestManager.owner(), ACCOUNT_TWO);
    // }

    // function test_checkTroveManager() public {
    //     vm.startPrank(ACCOUNT_ONE);
    //     address troveAddr = aglInterestManager.troveManager();
    //     console.log("check trove now : ", troveAddr);
    //     assertEq(troveAddr, TROVE_MANAGER);
    //     vm.stopPrank();
    // }

    // function test_SetModuleFor() public {
    //     vm.prank(ACCOUNT_ONE);
    //     aglInterestManager.setModuleFor(USDA_TOKEN, ACCOUNT_ONE);
    // }

    // function test_SetSafetyVault() public {
    //     vm.prank(ACCOUNT_ONE);
    //     aglInterestManager.setSafetyVault(ACCOUNT_TWO);
    //     assertEq(aglInterestManager.safetyVault(), ACCOUNT_TWO);
    // }

    // function test_GetInterestModule() public view {
    //     address ethModule = aglInterestManager.getInterestModule(address(0));
    //     console.log(ethModule);
    // }
}
