// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;
import "../DeployHelper.sol";
import "../utils/Utils.sol";
import "forge-std/Test.sol";
import "../../contracts/Interfaces/IStabilityPool.sol";
import "../../contracts/Interfaces/ITroveManager.sol";
import "../../contracts/Test/MockPriceFeed.sol";

contract TroveManagerTest is Utils{
    CoreContracts coreContracts;
    AGLContracts  aglContracts;
    DeployHelper deployHelper;
    function setUp() public{
        deployHelper = new DeployHelper();
        (coreContracts, aglContracts)  =  deployHelper.setUp();
    }

    function testSetInterestManager() public {
        vm.startPrank(address (deployHelper));
        coreContracts.troveManager.setInterestManager(vm.addr(1));
    }

    function testFailSetInterestManager() public{
        vm.startPrank(vm.addr(1));
        coreContracts.troveManager.setInterestManager(vm.addr(1));
    }

    function redeemMock() public {
        TroveRedemptor troveRedemptor = deployHelper.redemptor();
        address payable[] memory users = createUsers(3);
        //user 1 openTrove
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        vm.stopPrank();

        //user 2 openTrove
        vm.startPrank(users[1]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        vm.stopPrank();

        //user 3 openTrove
        vm.startPrank(users[2]);
        coreContracts.borrowerOperations.openTrove{value: 100 ether}(address (0), 0, 0.05 ether, 10000 ether, address (0), address (0));
        vm.stopPrank();

        uint256 ethPrice = coreContracts.priceFeed.fetchPrice(address (0));
        (address firstRedemptionHint, uint256 partialRedemptionHintNICR, uint256 truncatedUSDAamount) = coreContracts.hintHelpers.getRedemptionHints(address (0), 4000 ether, 200 ether, 2);
        vm.startPrank(users[2]);
        troveRedemptor.AutoRedeemCollateral(address (0), users[2], 4000 ether, 3, 1 ether);

    }

    function testLiquidateOneTrove() public{
        address payable[] memory users = createUsers(3);
        IStabilityPool stabilityPoolETH = coreContracts.stabilityPoolManager.getAssetStabilityPool(address (0));
        //user 1 openTrove and stake usda to stabilityPool
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        stabilityPoolETH.provideToSP(2000 ether);
        vm.stopPrank();
        console.log("usda balance", coreContracts.usdaToken.balanceOf(users[0]));

        //user 2 openTrove and stake usda to stabilityPool
        vm.startPrank(users[1]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        stabilityPoolETH.provideToSP(2000 ether);
        vm.stopPrank();


        //set PriceFeed
        MockPriceFeed mockPriceFeed = coreContracts.priceFeed;
        console.log(mockPriceFeed.fetchPrice(address(0)));
        mockPriceFeed.setPrice(200 ether);
        console.log(mockPriceFeed.fetchPrice(address(0)));
        vm.startPrank(users[2]);
        coreContracts.troveManager.liquidate(address (0), users[0]);

    }


    function testLiquidateMultipleTroves() public{
        address payable[] memory users = createUsers(3);
        IStabilityPool stabilityPoolETH = coreContracts.stabilityPoolManager.getAssetStabilityPool(address (0));
        //user 1 openTrove and stake usda to stabilityPool
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        stabilityPoolETH.provideToSP(2000 ether);
        vm.stopPrank();
        console.log("usda balance", coreContracts.usdaToken.balanceOf(users[0]));

        //user 2 openTrove and stake usda to stabilityPool
        vm.startPrank(users[1]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        stabilityPoolETH.provideToSP(2000 ether);
        vm.stopPrank();


        //user 3 openTrove and stake usda to stabilityPool
        vm.startPrank(users[2]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        stabilityPoolETH.provideToSP(2000 ether);
        vm.stopPrank();



        //set PriceFeed
        MockPriceFeed mockPriceFeed = coreContracts.priceFeed;
        console.log(mockPriceFeed.fetchPrice(address(0)));
        mockPriceFeed.setPrice(200 ether);
        console.log(mockPriceFeed.fetchPrice(address(0)));
        vm.startPrank(users[2]);
        coreContracts.troveManager.liquidateTroves(address (0), 1);
        coreContracts.troveManager.liquidateTroves(address (0), 1);
    }


    function testBatchLiquidateTroves() public{
        address payable[] memory users = createUsers(3);
        IStabilityPool stabilityPoolETH = coreContracts.stabilityPoolManager.getAssetStabilityPool(address (0));
        //user 1 openTrove and stake usda to stabilityPool
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        stabilityPoolETH.provideToSP(2000 ether);
        vm.stopPrank();
        console.log("usda balance", coreContracts.usdaToken.balanceOf(users[0]));

        //user 2 openTrove and stake usda to stabilityPool
        vm.startPrank(users[1]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        stabilityPoolETH.provideToSP(2000 ether);
        vm.stopPrank();


        //user 3 openTrove and stake usda to stabilityPool
        vm.startPrank(users[2]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        stabilityPoolETH.provideToSP(2000 ether);
        vm.stopPrank();




        //set PriceFeed
        MockPriceFeed mockPriceFeed = coreContracts.priceFeed;
        mockPriceFeed.setPrice(200 ether);
        console.log(mockPriceFeed.fetchPrice(address(0)));
        vm.startPrank(users[2]);
        address[] memory addressArray = new address[](2);
        addressArray[0] = address(users[0]);
        addressArray[1] = address(users[1]);
        coreContracts.troveManager.batchLiquidateTroves(address (0), addressArray);
    }

    function testSetRedemptorAddress() public {
        vm.startPrank(address (deployHelper));
        coreContracts.troveManager.setRedemptorAddress(address (deployHelper.redemptor()));

    }

    function testGetTroveOwnersCount() public {
        assertEq(coreContracts.troveManager.getTroveOwnersCount(address (0)), 0);
        address payable[] memory users = createUsers(1);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getTroveOwnersCount(address (0)), 1);
    }

    function testGetTroveFromOwnersArray() public {
        address payable[] memory users = createUsers(2);
        vm.startPrank(address(coreContracts.borrowerOperations));
        coreContracts.troveManager.addTroveOwnerToArray(address (0), users[0]);
        assertEq(coreContracts.troveManager.getTroveFromTroveOwnersArray(address (0), 0), users[0]);
        vm.startPrank(address(coreContracts.borrowerOperations));
        coreContracts.troveManager.addTroveOwnerToArray(address (0), users[1]);
        assertEq(coreContracts.troveManager.getTroveFromTroveOwnersArray(address (0), 1), users[1]);

    }

    function testSetSavingModulesStabilityPool() public {
        vm.startPrank(address (deployHelper));
        coreContracts.troveManager.setSavingModuleStabilityPool(address (deployHelper.redemptor()));

    }

  /*  function testGetNominalICR() public {
        address payable[] memory users = createUsers(1);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        console.log("nominal icr", coreContracts.troveManager.getNominalICR(address (0), users[0]));
        //assertEq( coreContracts.troveManager.getNominalICR(address (0), users[0]), 1 ether * 100 * 10 ether / 2040 ether );
        console.logUint((1 ether * 100 * 10 ether)/ 2040 ether );

    }*/

    function testGetCurrentICR() public{}

    function testApplyPendingReward() public{
        address payable[] memory users = createUsers(3);
        //user 1 openTrove and stake usda to stabilityPool
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 1 ether}(address (0), 0, 0.05 ether, 1000 ether, address (0), address (0));
        vm.stopPrank();

        //user 2 openTrove and stake usda to stabilityPool
        vm.startPrank(users[1]);
        coreContracts.borrowerOperations.openTrove{value: 1 ether}(address (0), 0, 0.05 ether, 1000 ether, address (0), address (0));
        vm.stopPrank();


        //user 3 openTrove and stake usda to stabilityPool
        vm.startPrank(users[2]);
        coreContracts.borrowerOperations.openTrove{value: 0.7 ether}(address (0), 0, 0.05 ether, 1000 ether, address (0), address (0));
        vm.stopPrank();


        //set PriceFeed
        MockPriceFeed mockPriceFeed = MockPriceFeed(address (coreContracts.priceFeed));
        mockPriceFeed.setPrice(1000 ether);
        vm.startPrank(users[2]);
        coreContracts.troveManager.liquidateTroves(address (0), 1);
        assertEq(coreContracts.troveManager.getTroveColl(address (0), users[2]), 0);
        vm.startPrank(address(coreContracts.borrowerOperations));
        coreContracts.troveManager.applyPendingRewards(address (0), users[0]);
        assertEq(coreContracts.troveManager.getTroveColl(address (0), users[0]) > 1 ether, true);

    }


    function testGetPendingAssetReward() public{
        address payable[] memory users = createUsers(2);
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.troveManager.addTroveOwnerToArray(address (0), users[0]);
        assertEq(coreContracts.troveManager.getTroveFromTroveOwnersArray(address (0), 0), users[0]);
        coreContracts.troveManager.addTroveOwnerToArray(address (0), users[1]);
        assertEq(coreContracts.troveManager.getTroveFromTroveOwnersArray(address (0), 1), users[1]);

    }

    function testGetPendingUSDADebtReward() public{
        address payable[] memory users = createUsers(3);
        //user 1 openTrove and stake usda to stabilityPool
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 1 ether}(address (0), 0, 0.05 ether, 1000 ether, address (0), address (0));
        vm.stopPrank();

        //user 2 openTrove and stake usda to stabilityPool
        vm.startPrank(users[1]);
        coreContracts.borrowerOperations.openTrove{value: 1 ether}(address (0), 0, 0.05 ether, 1000 ether, address (0), address (0));
        vm.stopPrank();


        //user 3 openTrove and stake usda to stabilityPool
        vm.startPrank(users[2]);
        coreContracts.borrowerOperations.openTrove{value: 0.7 ether}(address (0), 0, 0.05 ether, 1000 ether, address (0), address (0));
        vm.stopPrank();
        assertEq(coreContracts.troveManager.getPendingUSDADebtReward(address (0), users[0]), 0);
        //set PriceFeed
        MockPriceFeed mockPriceFeed = MockPriceFeed(address (coreContracts.priceFeed));
        mockPriceFeed.setPrice(1000 ether);
        vm.startPrank(users[2]);
        coreContracts.troveManager.liquidateTroves(address (0), 1);
        assertEq(coreContracts.troveManager.getTroveColl(address (0), users[2]), 0);
        vm.startPrank(address(coreContracts.borrowerOperations));
        assertEq(coreContracts.troveManager.getPendingUSDADebtReward(address (0), users[0]) > 0, true);
        coreContracts.troveManager.applyPendingRewards(address (0), users[0]);
        assertEq(coreContracts.troveManager.getPendingUSDADebtReward(address (0), users[0]), 0);
    }

    function testHasPendingReward() public{
        address payable[] memory users = createUsers(3);
        //user 1 openTrove and stake usda to stabilityPool
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 1 ether}(address (0), 0, 0.05 ether, 1000 ether, address (0), address (0));
        vm.stopPrank();

        //user 2 openTrove and stake usda to stabilityPool
        vm.startPrank(users[1]);
        coreContracts.borrowerOperations.openTrove{value: 1 ether}(address (0), 0, 0.05 ether, 1000 ether, address (0), address (0));
        vm.stopPrank();


        //user 3 openTrove and stake usda to stabilityPool
        vm.startPrank(users[2]);
        coreContracts.borrowerOperations.openTrove{value: 0.7 ether}(address (0), 0, 0.05 ether, 1000 ether, address (0), address (0));
        vm.stopPrank();


        //set PriceFeed
        MockPriceFeed mockPriceFeed = MockPriceFeed(address (coreContracts.priceFeed));
        mockPriceFeed.setPrice(1000 ether);
        vm.startPrank(users[2]);
        coreContracts.troveManager.liquidateTroves(address (0), 1);
        assertEq(coreContracts.troveManager.getTroveColl(address (0), users[2]), 0);
        vm.startPrank(address(coreContracts.borrowerOperations));
        assertEq(coreContracts.troveManager.hasPendingRewards(address (0), users[0]), true);
        coreContracts.troveManager.applyPendingRewards(address (0), users[0]);
        assertEq(coreContracts.troveManager.hasPendingRewards(address (0), users[0]), false);

    }

    function testGetEntireDebtAndColl() public{
        address payable[] memory users = createUsers(2);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        (uint256 debt, uint256 coll, uint256 pendingUSDADebtReward, uint256 pendingAssetReward) = coreContracts.troveManager.getEntireDebtAndColl(address (0), users[0]);
        assertEq(debt, 2040 ether);
        assertEq(coll, 10 ether);
    }

    function testRemoveStake() public{
        address payable[] memory users = createUsers(2);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        (address asset, uint256 debt, uint256 coll, uint256 stake, , uint128 arrayIndex) = coreContracts.troveManager.Troves(users[0], address (0));
        assertEq(stake != 0 , true);
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.troveManager.removeStake(address (0), users[0]);
        ( asset, debt,  coll, stake, , arrayIndex) = coreContracts.troveManager.Troves(users[0], address (0));
        assertEq(stake == 0 , true);
    }

    function testCloseTrove() public {
        address payable[] memory users = createUsers(2);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        (address asset, uint256 debt, uint256 coll, uint256 stake, , uint128 arrayIndex) = coreContracts.troveManager.Troves(users[0], address (0));
        assertEq(coll != 0 , true);
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.troveManager.closeTrove(address (0), users[0]);
        ( asset, debt,  coll, stake, , arrayIndex) = coreContracts.troveManager.Troves(users[0], address (0));
        assertEq(coll == 0 , true);
    }

    function testCloseTroveByRedemptor() public {
        address payable[] memory users = createUsers(2);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        (address asset, uint256 debt, uint256 coll, uint256 stake, , uint128 arrayIndex) = coreContracts.troveManager.Troves(users[0], address (0));
        assertEq(coll != 0 , true);
         vm.startPrank(address (deployHelper.redemptor()));
        coreContracts.troveManager.closeTrove(address (0), users[0]);
        ( asset, debt,  coll, stake, , arrayIndex) = coreContracts.troveManager.Troves(users[0], address (0));
        assertEq(coll == 0 , true);
    }

    function testAddTroveOwnerToArray() public {
        address payable[] memory users = createUsers(2);
        vm.startPrank(address(coreContracts.borrowerOperations));
        coreContracts.troveManager.addTroveOwnerToArray(address (0), users[0]);
    }

    function testGetTCR() public {

    }

    function testUpdateBaseRateFromRedemption() public {
        assertEq(coreContracts.troveManager.baseRate(address (0)), 0);
        vm.startPrank(address (deployHelper.redemptor()));
        coreContracts.troveManager.updateBaseRateFromRedemption(address (0), 1 ether, 2000 ether, 20000 ether);
        assertEq(coreContracts.troveManager.baseRate(address (0)) > 0, true);
    }

    function testGetRedemptionRate() public {
        assertEq(coreContracts.troveManager.getRedemptionRate(address (0)), 0.005 ether);
        redeemMock();
        assertEq(coreContracts.troveManager.getRedemptionRate(address (0))> 0.005 ether, true);
    }

    function testGetRedemptionRateWithDecay() public{
        assertEq(coreContracts.troveManager.getRedemptionRate(address (0)), 0.005 ether);
        redeemMock();


    }

    function testGetRedemptionFee() public{
        assertEq(coreContracts.troveManager.getRedemptionFee(address (0), 1000 ether), 5 ether);
        redeemMock();
        assertEq(coreContracts.troveManager.getRedemptionFee(address (0), 1000 ether) > 5 ether, true);
    }

    function testGetRedemptionFeeWithDecay() public {
        vm.warp(1641070800);
        assertEq(coreContracts.troveManager.getRedemptionFeeWithDecay(address (0), 1000 ether), 5 ether);
        redeemMock();
        assertEq(coreContracts.troveManager.getRedemptionFeeWithDecay(address (0), 1000 ether) > 5 ether, true);
        vm.warp(2641070800);
        assertEq(coreContracts.troveManager.getRedemptionFeeWithDecay(address (0), 1000 ether), 5 ether);
    }

    function testGetBorrowingRate() public {
        vm.warp(1641070800);
        assertEq(coreContracts.troveManager.getBorrowingRate(address (0)), 0.005 ether);
         redeemMock();
        assertEq(coreContracts.troveManager.getBorrowingRate(address (0)) > 0.005 ether, true);
        vm.warp(2641070800);
        address payable[] memory users = createUsers(2);
        assertEq(coreContracts.troveManager.getTroveStatus(address (0), users[0]), 0);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getBorrowingRate(address (0)), 0.005 ether);
    }


    function testGetBorrowingRateWithDecay() public{
        vm.warp(1641070800);
        assertEq(coreContracts.troveManager.getBorrowingRateWithDecay(address (0)), 0.005 ether);
        redeemMock();
        assertEq(coreContracts.troveManager.getBorrowingRateWithDecay(address (0)) > 0.005 ether, true);
        vm.warp(2641070800);
        assertEq(coreContracts.troveManager.getBorrowingRateWithDecay(address (0)), 0.005 ether);
    }

    function testGetBorrowingFee() public {
        assertEq(coreContracts.troveManager.getBorrowingFee(address (0), 1000 ether), 5 ether);
        redeemMock();
        assertEq(coreContracts.troveManager.getBorrowingFee(address (0), 1000 ether) > 5 ether, true);

    }

    function testGetBorrowingFeeWithDecay() public{
        vm.warp(1641070800);
        redeemMock();
        assertEq(coreContracts.troveManager.getBorrowingFeeWithDecay(address (0), 1000 ether), 50 ether);
        vm.warp(2641070800);
        assertEq(coreContracts.troveManager.getBorrowingFeeWithDecay(address (0), 1000 ether), 5 ether);

    }


    function testDecayBaseRateFromBorrowing() public {
        vm.warp(1641070800);
        redeemMock();
        assertEq(coreContracts.troveManager.baseRate(address (0)) > 0 , true);
        vm.startPrank(address(coreContracts.borrowerOperations));
        vm.warp(2641070800);
        coreContracts.troveManager.decayBaseRateFromBorrowing(address (0));
        assertEq(coreContracts.troveManager.baseRate(address (0)) , 0 );
    }

    function testGetTroveStatus() public{
        address payable[] memory users = createUsers(2);
        assertEq(coreContracts.troveManager.getTroveStatus(address (0), users[0]), 0);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getTroveStatus(address (0), users[0]), 1);
        vm.startPrank(users[1]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        coreContracts.usdaToken.transfer(users[0], 1000 ether);

        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.closeTrove(address (0));
        assertEq(coreContracts.troveManager.getTroveStatus(address (0), users[0]), 2);
    }

    function testGetTroveStake() public{
        address payable[] memory users = createUsers(1);
        assertEq(coreContracts.troveManager.getTroveStake(address (0), users[0]), 0);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getTroveStake(address (0), users[0]), 10 ether);
    }

    function testGetTroveDebt() public {
        address payable[] memory users = createUsers(1);
        assertEq(coreContracts.troveManager.getTroveDebt(address (0), users[0]), 0);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getTroveDebt(address (0), users[0]) , 2040 ether);
    }

    function testGetTroveColl() public {
        address payable[] memory users = createUsers(1);
        assertEq(coreContracts.troveManager.getTroveColl(address (0), users[0]), 0);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getTroveColl(address (0), users[0]), 10 ether);
    }

    function testSetTroveStatus() public{
        address payable[] memory users = createUsers(1);
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.troveManager.setTroveStatus(address (0), users[0], 1);
    }

    function testIncreaseTroveColl() public{
        address payable[] memory users = createUsers(1);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getTroveColl(address (0), users[0]), 10 ether);
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.troveManager.increaseTroveColl(address (0), users[0], 5 ether);
        assertEq(coreContracts.troveManager.getTroveColl(address (0), users[0]), 15 ether);
    }

    function testDecreaseTroveColl() public{
        address payable[] memory users = createUsers(1);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getTroveColl(address (0), users[0]), 10 ether);
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.troveManager.decreaseTroveColl(address (0), users[0], 5 ether);
        assertEq(coreContracts.troveManager.getTroveColl(address (0), users[0]), 5 ether);
    }

    function testIncreaseTroveDebt() public{
        address payable[] memory users = createUsers(1);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getTroveDebt(address (0), users[0]), 2040 ether);
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.troveManager.increaseTroveDebt(address (0), users[0], 1000 ether);
        assertEq(coreContracts.troveManager.getTroveDebt(address (0), users[0]), 3040 ether);
    }

    function testDecreaseTroveDebt() public{
        address payable[] memory users = createUsers(1);
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getTroveDebt(address (0), users[0]), 2040 ether);
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.troveManager.decreaseTroveDebt(address (0), users[0], 1000 ether);
        assertEq(coreContracts.troveManager.getTroveDebt(address (0), users[0]), 1040 ether);
    }

    function testGetSystemTotalUnpaidInterest() public {
        address payable[] memory users = createUsers(2);
        vm.startPrank(users[0]);
        vm.warp(1641070800);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getSystemTotalUnpaidInterest(address (0)), 0);
        vm.warp(2641070800);
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.troveManager.decreaseTroveDebt(address (0), users[0], 1);
        assertEq(coreContracts.troveManager.getSystemTotalUnpaidInterest(address (0)) > 0, true);

    }

    function testGetUnpaidInterestOfUser() public{
        address payable[] memory users = createUsers(2);
        vm.startPrank(users[0]);
        vm.warp(1641070800);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        assertEq(coreContracts.troveManager.getUnpaidInterestOfUser(address (0), users[0]), 0);
        vm.warp(2641070800);
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.troveManager.decreaseTroveDebt(address (0), users[0], 1);
        assertEq(coreContracts.troveManager.getUnpaidInterestOfUser(address (0), users[0]) > 0, true);
    }


}