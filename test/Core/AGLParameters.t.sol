// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../../contracts/Core/AGLParameters.sol";
import "../../contracts/Core/AdminContract.sol";
import "../../contracts/Dependencies/PriceFeed.sol";
import "../../contracts/Pool/ActivePool.sol";
import "../../contracts/Pool/DefaultPool.sol";

contract AGLParametersTest is Test {
    AGLParameters aglParameters;
    ActivePool activePool;
    DefaultPool defaultPool;
    PriceFeed priceFeed;
    AdminContract adminContract;

    function setUp() public {
        aglParameters = new AGLParameters();
        priceFeed = new PriceFeed();
        activePool = new ActivePool();
        defaultPool = new DefaultPool();
        adminContract = new AdminContract();
    }

    function testSetAddresses() external {
        vm.startPrank(address(this));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
    }

    function testSetAdminContract() external {
        vm.startPrank(address(this));
        AdminContract newAdminContract = new AdminContract();
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.setAdminContract(address(newAdminContract));
    }

    function testFailNotOwnerSetAdminContract() external {
        vm.startPrank(address(this));
        AdminContract newAdminContract = new AdminContract();
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        vm.stopPrank();
        vm.startPrank(vm.addr(0x1));
        aglParameters.setAdminContract(address(newAdminContract));
    }

    function testSetPriceFeed() external {
        vm.startPrank(address(this));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        vm.recordLogs();
        PriceFeed priceFeed2 = new PriceFeed();
        aglParameters.setPriceFeed(address(priceFeed2));
        Vm.Log[] memory entries = vm.getRecordedLogs();

        assertEq(entries.length, 1);
        assertEq(entries[0].topics[0], keccak256("PriceFeedChanged(address)"));
    }

    function testFailNotOwnerSetPriceFeed() external {
        vm.startPrank(address(this));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        vm.stopPrank();
        vm.startPrank(vm.addr(0x1));
        PriceFeed priceFeed2 = new PriceFeed();
        aglParameters.setPriceFeed(address(priceFeed2));
    }

    function testSetAsDefault() external {
        vm.startPrank(address(this));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.setAsDefault(vm.addr(0x1));
    }

    function testFailNotOwnerSetAsDefault() external {
        vm.startPrank(address(this));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        vm.stopPrank();
        vm.startPrank(vm.addr(0x233));
        aglParameters.setAsDefault(vm.addr(0x1));
    }

    function testSanitizeParameters() external {
        vm.startPrank(address(this));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.sanitizeParameters(vm.addr(0x222));
    }

    function testFailSanitizeExistedParameters() external {
        vm.startPrank(address(this));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.sanitizeParameters(vm.addr(0x222));
        aglParameters.sanitizeParameters(vm.addr(0x222));
    }

    function testFailNotOwnerSanitizeParameters() external {
        vm.startPrank(address(this));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        vm.stopPrank();
        vm.startPrank(vm.addr(0x233));
        aglParameters.sanitizeParameters(vm.addr(0x222));
    }

    function testsetAsDefaultWithRedemptionBlock() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.setAsDefaultWithRedemptionBlock(vm.addr(0x222), 14);
    }

    function testFailNotControllersetAsDefaultWithRedemptionBlock() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        vm.stopPrank();
        vm.startPrank(address(0x2));
        aglParameters.setAsDefaultWithRedemptionBlock(vm.addr(0x222), 14);
    }

    function testSetMCR() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.recordLogs();
        aglParameters.setCCR(vm.addr(0x1), 10000000000000000000);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        assertEq(entries.length, 1);
        assertEq(
            entries[0].topics[0],
            keccak256("CCRChanged(uint256,uint256)")
        );
    }

    function testFailNotOwnerSetMCR() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.stopPrank();
        vm.startPrank(address(0x22));
        aglParameters.setCCR(vm.addr(0x1), 10000000000000000000);
    }

    function testSetBonusToSP() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.recordLogs();
        aglParameters.setBonusToSP(vm.addr(0x1), 10000000000000000000);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        assertEq(entries.length, 1);
        assertEq(
            entries[0].topics[0],
            keccak256("BonusToSPChanged(uint256,uint256)")
        );
    }

    function testFailNotOwnerSetBonusToSP() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.stopPrank();
        vm.startPrank(vm.addr(0x111));
        aglParameters.setBonusToSP(vm.addr(0x1), 10000000000000000000);
    }

    function testSetPercentDivisor() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.recordLogs();
        aglParameters.setPercentDivisor(vm.addr(0x1), 100);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        assertEq(entries.length, 1);
        assertEq(
            entries[0].topics[0],
            keccak256("PercentDivisorChanged(uint256,uint256)")
        );
    }

    function testFailSetPercentDivisor() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.stopPrank();
        vm.startPrank(vm.addr(0x111));
        aglParameters.setPercentDivisor(vm.addr(0x1), 100);
    }

    function testSetBorrowingFeeFloor() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.recordLogs();
        aglParameters.setBorrowingFeeFloor(vm.addr(0x1), 100);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        assertEq(entries.length, 1);
        assertEq(
            entries[0].topics[0],
            keccak256("BorrowingFeeFloorChanged(uint256,uint256)")
        );
    }

    function testFailSetBorrowingFeeFloor() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.stopPrank();
        vm.startPrank(vm.addr(0x111));
        aglParameters.setBorrowingFeeFloor(vm.addr(0x1), 100);
    }

    function testSetMaxBorrowingFeeFloor() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.recordLogs();
        aglParameters.setMaxBorrowingFee(vm.addr(0x1), 100);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        assertEq(entries.length, 1);
        assertEq(
            entries[0].topics[0],
            keccak256("MaxBorrowingFeeChanged(uint256,uint256)")
        );
    }

    function testFailSetMaxBorrowingFeeFloor() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.stopPrank();
        vm.startPrank(vm.addr(0x111));
        aglParameters.setMaxBorrowingFee(vm.addr(0x1), 100);
    }

    function testSetUSDAGasCompensation() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.recordLogs();
        aglParameters.setUSDAGasCompensation(vm.addr(0x1), 1 ether);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        assertEq(entries.length, 1);
        assertEq(
            entries[0].topics[0],
            keccak256("GasCompensationChanged(uint256,uint256)")
        );
    }

    function testFailSetUSDAGasCompensation() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.setAsDefault(vm.addr(0x1));
        vm.stopPrank();
        vm.startPrank(vm.addr(0x111));
        aglParameters.setUSDAGasCompensation(vm.addr(0x1), 1 ether);
    }

    function testSetMinNetDebt() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.recordLogs();
        aglParameters.setMinNetDebt(vm.addr(0x1), 1 ether);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        assertEq(entries.length, 1);
        assertEq(
            entries[0].topics[0],
            keccak256("MinNetDebtChanged(uint256,uint256)")
        );
    }

    function testFailSetMinNetDebt() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.setAsDefault(vm.addr(0x1));
        vm.stopPrank();
        vm.startPrank(vm.addr(0x111));
        aglParameters.setMinNetDebt(vm.addr(0x1), 1 ether);
    }

    function testSetRedemptionFeeFloor() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.recordLogs();
        aglParameters.setRedemptionFeeFloor(vm.addr(0x1), 100);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        assertEq(entries.length, 1);
        assertEq(
            entries[0].topics[0],
            keccak256("RedemptionFeeFloorChanged(uint256,uint256)")
        );
    }

    function testFailSetRedemptionFeeFloor() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.setAsDefault(vm.addr(0x1));
        vm.stopPrank();
        vm.startPrank(vm.addr(0x111));
        aglParameters.setRedemptionFeeFloor(vm.addr(0x1), 100);
    }

    function testSetRedemptionFeeMax() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );

        aglParameters.setAsDefault(vm.addr(0x1));
        vm.recordLogs();
        aglParameters.setRedemptionFeeMax(vm.addr(0x1), 500);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        assertEq(entries.length, 1);
        assertEq(
            entries[0].topics[0],
            keccak256("RedemptionFeeMaxChanged(uint256,uint256)")
        );
    }

    function testFailSetRedemptionFeeMax() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.setAsDefault(vm.addr(0x1));
        vm.stopPrank();
        vm.startPrank(vm.addr(0x111));
        aglParameters.setRedemptionFeeMax(vm.addr(0x1), 500);
    }

    function testRemoveRedemptionBlock() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.setAsDefault(vm.addr(0x1));
        aglParameters.setAsDefaultWithRedemptionBlock(vm.addr(0x222), 14);
        vm.recordLogs();
        aglParameters.removeRedemptionBlock(vm.addr(0x222));
        Vm.Log[] memory entries = vm.getRecordedLogs();
        assertEq(entries.length, 1);
        assertEq(
            entries[0].topics[0],
            keccak256("RedemptionBlockRemoved(address)")
        );
    }

    function testFailRemoveRedemptionBlock() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.setAsDefault(vm.addr(0x1));
        aglParameters.setAsDefaultWithRedemptionBlock(vm.addr(0x222), 14);
        vm.stopPrank();
        vm.startPrank(vm.addr(0x111));
        aglParameters.removeRedemptionBlock(vm.addr(0x222));
    }

    function testSetUSDAMintCap() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.setAsDefault(vm.addr(0x1));
        vm.recordLogs();
        aglParameters.setUSDAMintCap(vm.addr(0x222), 14);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        assertEq(entries.length, 1);
        assertEq(
            entries[0].topics[0],
            keccak256("USDAMintCapChanged(address,uint256)")
        );
    }

    function testFailNotOwnerSetUSDAMintCap() external {
        vm.startPrank(address(adminContract));
        aglParameters.setAddresses(
            address(activePool),
            address(defaultPool),
            address(priceFeed),
            address(adminContract)
        );
        aglParameters.setAsDefault(vm.addr(0x1));
        vm.stopPrank();
        vm.startPrank(vm.addr(0x111));
        aglParameters.setUSDAMintCap(vm.addr(0x222), 14);
    }
}
