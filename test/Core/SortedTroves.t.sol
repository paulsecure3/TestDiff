// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;
import "../DeployHelper.sol";
import "../utils/Utils.sol";
import "forge-std/Test.sol";
import "../../contracts/Interfaces/IStabilityPool.sol";
import "../../contracts/Test/MockPriceFeed.sol";


contract SortedTrovesTest is Utils{
    CoreContracts coreContracts;
    AGLContracts  aglContracts;
    DeployHelper deployHelper;
    function setUp() public {
         deployHelper = new DeployHelper();

        (coreContracts, aglContracts) = deployHelper.setUp();
    }

    function testSetParams() public {
        vm.expectRevert("Initializable: contract is already initialized");
        coreContracts.sortedTroves.setParams(vm.addr(1), vm.addr(2));

    }

    function testFailSetRedemptorAddress() public {
        vm.startPrank(vm.addr(1));
        coreContracts.sortedTroves.setRedemptorAddress(vm.addr(2));
    }

    function testSetRedemptorAddress() public {
        vm.startPrank(address (deployHelper));
        coreContracts.sortedTroves.setRedemptorAddress(address (deployHelper.redemptor()));
    }

    function testFailInsert() public{
        coreContracts.sortedTroves.insert(address (0), vm.addr(1), 130 ether, address (0), address (0));
    }

    function testInsert() public{
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.sortedTroves.insert(address (0), vm.addr(1), 130 ether, address (0), address (0));
    }

    function testFailRemove() public {
        address alice = vm.addr(1);
        vm.startPrank(address (coreContracts.borrowerOperations));
        coreContracts.sortedTroves.insert(address (0), alice, 130 ether, address (0), address (0));
        vm.stopPrank();
        coreContracts.sortedTroves.remove(address (0), alice);
    }

    function testRemove() public{
        address alice = vm.addr(1);
        vm.startPrank(address (coreContracts.troveManager));
        coreContracts.sortedTroves.insert(address (0), alice, 130 ether, address (0), address (0));
        coreContracts.sortedTroves.remove(address (0), alice);
    }

    function testContains() public{
        address alice = vm.addr(1);
        assertEq(coreContracts.sortedTroves.contains(address (0), alice), false);
        vm.startPrank(address (coreContracts.troveManager));
        coreContracts.sortedTroves.insert(address (0), alice, 130 ether, address (0), address (0));
        assertEq(coreContracts.sortedTroves.contains(address (0), alice), true);
    }

    function testIsEmpty() public{
        assertEq(coreContracts.sortedTroves.isEmpty(address (0)), true);
        address alice = vm.addr(1);
        vm.startPrank(address (coreContracts.troveManager));
        coreContracts.sortedTroves.insert(address (0), alice, 130 ether, address (0), address (0));
        assertEq(coreContracts.sortedTroves.isEmpty(address (0)), false);
    }

    function  testGetSize() public{
        assertEq(coreContracts.sortedTroves.getSize(address (0)), 0);
        address alice = vm.addr(1);
        vm.startPrank(address (coreContracts.troveManager));
        coreContracts.sortedTroves.insert(address (0), alice, 130 ether, address (0), address (0));
        assertEq(coreContracts.sortedTroves.getSize(address (0)), 1);
    }

    function testGetMaxSize() public{
        assertEq(coreContracts.sortedTroves.getMaxSize(address (0)), type(uint256).max);
    }

    function testGetFirst() public{
        assertEq(coreContracts.sortedTroves.getFirst(address (0)), address (0));
        vm.startPrank(address (coreContracts.troveManager));
        address alice = vm.addr(1);
        coreContracts.sortedTroves.insert(address (0), alice, 130 ether, address (0), address (0));
        assertEq(coreContracts.sortedTroves.getFirst(address (0)), alice);
        address bob = vm.addr(2);
        coreContracts.sortedTroves.insert(address (0), bob, 150 ether, address (0), address (0));
        console.log(alice);
        console.log(bob);

        console.log(coreContracts.sortedTroves.getFirst(address (0)));
    }

    function testGetLast() public {
        assertEq(coreContracts.sortedTroves.getLast(address (0)), address (0));
        vm.startPrank(address (coreContracts.troveManager));
        address alice = vm.addr(1);
        coreContracts.sortedTroves.insert(address (0), alice, 130 ether, address (0), address (0));
        assertEq(coreContracts.sortedTroves.getLast(address (0)), alice);
        address bob = vm.addr(2);
        coreContracts.sortedTroves.insert(address (0), bob, 150 ether, address (0), address (0));
        console.log(alice);
        console.log(bob);

        console.log(coreContracts.sortedTroves.getLast(address (0)));
    }

    function testGetNext() public{
        vm.startPrank(address (coreContracts.troveManager));
        address alice = vm.addr(1);
        coreContracts.sortedTroves.insert(address (0), alice, 130 ether, address (0), address (0));
        assertEq(coreContracts.sortedTroves.getNext(address (0), alice), address (0));
        address bob = vm.addr(2);
        coreContracts.sortedTroves.insert(address (0), bob, 150 ether, address (0), address (0));
        console.log("nes", coreContracts.sortedTroves.getNext(address (0), alice));
        console.log("nesx", coreContracts.sortedTroves.getNext(address (0), bob));
    }

    function testValidInsertPosition() public{

    }

}
