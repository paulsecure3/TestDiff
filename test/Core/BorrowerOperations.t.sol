// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../../contracts/Core/AGLParameters.sol";
import "../../contracts/Dependencies/PriceFeed.sol";
import "../../contracts/Pool/ActivePool.sol";
import "../../contracts/Pool/DefaultPool.sol";
//
//contract BorrowerOperationsTest is Test {
//    AGLParameters aglParameters;
//    ActivePool activePool;
//    DefaultPool defaultPool;
//    PriceFeed priceFeed;
//    troveManager TroveManager;
//    stabilityPoolManager StabilityPoolManager;
//    gasPool GasPool;
//    collSurplusPool CollSurplusPool;
//    sortedTroves SortedTroves;
//    usdaToken USDAToken;
//    aglStaking AGLStaking;
//    aglParameters AGLParameters;
//    address adminContract = vm.addr(0x1);
//
//    function setUp() public {
//        aglParameters = new AGLParameters();
//        priceFeed = new PriceFeed();
//        activePool = new ActivePool();
//        defaultPool = new DefaultPool();
//        troveManager = TroveManager();
//        stabilityPoolManager = StabilityPoolManager();
//        gasPool = GasPool();
//        collSurplusPool = CollSurplusPool();
//        sortedTroves = SortedTroves();
//        usdaToken = USDAToken();
//        aglStaking = AGLStaking();
//        aglParameters = AGLParameters();
//    }
//
//    function testOpenTrove() external {}
//
//    function testFailOpenTrove() external {}
//
//    function testSetInterestManager() external {}
//
//    function testFailNotOwnerSetInterestManager() external {}
//
//    function testSetDexTrader() external {}
//
//    function testFailSetDexTrader() external {}
//
//    function testMoveETHGainToTrove() external {}
//
//    function testFailMoveETHGainToTrove() external {}
//
//    function testAdjustTrove() external {}
//
//    function testFailAdjustTrove() external {}
//
//    function testCloseTroveWithDexTrader() external {}
//
//    function testFailCloseTroveWithDexTrader() external {}
//
//    function testCloseTrove() external {}
//
//    function testFailCloseTrove() external {}
//
//    function testBurn() external {}
//
//    function testFailBurn() external {}
//
//    function testGetCompositeDebt() external {}
//
//    function testFailGetCompositeDebt() external {}
//
//    function testFailGetMethodValue() external {}
//
//    function testGetMethodValue() external {}
//
//    function testFailGetCompositeDebt() external {}
//}
