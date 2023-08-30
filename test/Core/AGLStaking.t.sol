// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../DeployHelper.sol";


contract AGLStakingTest is Test {
    DeployHelper deployHelper;
    CoreContracts coreContracts;
    AGLContracts aglContracts;

    function setUp() public {
        deployHelper = new DeployHelper();
    }

    function testSetAddresses() external {
        vm.startPrank(address(deployHelper));
        coreContracts = deployHelper.deployCoreContracts();
        aglContracts = deployHelper.deployAGLContracts(address(this));

        console.log("deployerHelper address", address(deployHelper));
        console.log("owner address", coreContracts.borrowerOperations.owner());
        deployHelper.InitializeCoreContracts(coreContracts, aglContracts);
        assertEq(coreContracts.adminContract.owner(), address(deployHelper));
        assertEq(coreContracts.adminContract.isInitialized(), true);
    }

    function testFailSetAddresses() external {
        vm.startPrank(address(deployHelper));
        coreContracts = deployHelper.deployCoreContracts();
        aglContracts = deployHelper.deployAGLContracts(address(this));

        console.log("deployerHelper address", address(deployHelper));
        console.log("owner address", coreContracts.borrowerOperations.owner());
        deployHelper.InitializeCoreContracts(coreContracts, aglContracts);
        vm.stopPrank();
        vm.startPrank(address(0x111));
        assertEq(coreContracts.adminContract.owner(), address(deployHelper));
        assertEq(coreContracts.adminContract.isInitialized(), false);
    }

    function testSetRedemptorAddress() external {
        vm.startPrank(address(deployHelper));
        coreContracts = deployHelper.deployCoreContracts();
        aglContracts = deployHelper.deployAGLContracts(address(this));

        console.log("deployerHelper address", address(deployHelper));
        console.log("owner address", coreContracts.borrowerOperations.owner());
        deployHelper.InitializeCoreContracts(coreContracts, aglContracts);
        TroveRedemptor troveRedemptor = new TroveRedemptor();
        troveRedemptor.setUp(
            address(coreContracts.troveManager),
            address(coreContracts.sortedTroves),
            address(coreContracts.usdaToken),
            address(coreContracts.AGLParameters),
            address(coreContracts.collSurplusPool),
            address(coreContracts.gasPool),
            address(aglContracts.aglStaking),
            address(coreContracts.hintHelpers)
        );
        address troveRedemptorAddress = address(troveRedemptor);
        coreContracts.troveManager.setRedemptorAddress(troveRedemptorAddress);
    }

    function testFailSetRedemptorAddress() external {
        vm.startPrank(address(deployHelper));
        coreContracts = deployHelper.deployCoreContracts();
        aglContracts = deployHelper.deployAGLContracts(address(this));

        console.log("deployerHelper address", address(deployHelper));
        console.log("owner address", coreContracts.borrowerOperations.owner());
        deployHelper.InitializeCoreContracts(coreContracts, aglContracts);
        TroveRedemptor troveRedemptor = new TroveRedemptor();
        troveRedemptor.setUp(
            address(coreContracts.troveManager),
            address(coreContracts.sortedTroves),
            address(coreContracts.usdaToken),
            address(coreContracts.AGLParameters),
            address(coreContracts.collSurplusPool),
            address(coreContracts.gasPool),
            address(aglContracts.aglStaking),
            address(coreContracts.hintHelpers)
        );
        address troveRedemptorAddress = address(troveRedemptor);
        vm.stopPrank();
        vm.startPrank(address(0x111));
        deployHelper.deployRedemptor(coreContracts, aglContracts);
    }

    function testStake() public {
        (bool success, bytes memory returndata) =  address(deployHelper).delegatecall(
            abi.encodeWithSelector(deployHelper.setUp.selector)
        );
        (coreContracts, aglContracts) = abi.decode(returndata,(CoreContracts, AGLContracts));
        coreContracts.adminContract.addNewCollateral(
            address (0),
            address (coreContracts.stabilityPoolAgilely),
            address (0),
            address (0),
            1 ether,
            1 ether,
            14
        );

        address alice = vm.addr(0x12345);

        aglContracts.aglStaking.unpause();

        vm.startPrank(address(this));
        console.log("before transfer this balance:", aglContracts.aglToken.balanceOf(address(this)));
        console.log("before transfer alice balance:", aglContracts.aglToken.balanceOf(alice));
        aglContracts.aglToken.allowance(address(this), alice);
        aglContracts.aglToken.approve(alice, 10000 ether);
        aglContracts.aglToken.transfer(alice, 10000 ether);
        console.log("after transfer this balance:", aglContracts.aglToken.balanceOf(address(this)));
        console.log("after transfer alice balance:", aglContracts.aglToken.balanceOf(alice));

        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1000 ether);
        coreContracts.borrowerOperations.openTrove{value: 3 ether}(address (0), 0, 0.05 ether, 300 ether, address (0), address (0));

        console.log("after stake alice balance:", aglContracts.aglToken.balanceOf(alice));
        coreContracts.usdaToken.allowance(alice, address(aglContracts.aglStaking));
        coreContracts.usdaToken.approve(address(aglContracts.aglStaking), 1 ether);
        aglContracts.aglToken.allowance(alice, address(aglContracts.aglStaking));
        aglContracts.aglToken.approve(address(aglContracts.aglStaking), 1 ether);
        aglContracts.aglStaking.stake(1 ether);
        console.log("after stake alice balance:", aglContracts.aglToken.balanceOf(alice));
    }

    function testFailStake() external {
        (bool success, bytes memory returndata) =  address(deployHelper).delegatecall(
            abi.encodeWithSelector(deployHelper.setUp.selector)
        );
        (coreContracts, aglContracts) = abi.decode(returndata,(CoreContracts, AGLContracts));
        coreContracts.adminContract.addNewCollateral(
            address (0),
            address (coreContracts.stabilityPoolAgilely),
            address (0),
            address (0),
            1 ether,
            1 ether,
            14
        );

        address alice = vm.addr(0x12345);

        aglContracts.aglStaking.unpause();

        vm.startPrank(address(this));
        console.log("before transfer this balance:", aglContracts.aglToken.balanceOf(address(this)));
        console.log("before transfer alice balance:", aglContracts.aglToken.balanceOf(alice));
        aglContracts.aglToken.allowance(address(this), alice);
        aglContracts.aglToken.approve(alice, 10 ether);
        aglContracts.aglToken.transfer(alice, 10 ether);
        console.log("after transfer this balance:", aglContracts.aglToken.balanceOf(address(this)));
        console.log("after transfer alice balance:", aglContracts.aglToken.balanceOf(alice));

        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1000 ether);
        coreContracts.borrowerOperations.openTrove{value: 3 ether}(address (0), 0, 0.05 ether, 300 ether, address (0), address (0));

        console.log("before transfer alice balance:", aglContracts.aglToken.balanceOf(alice));
        coreContracts.usdaToken.allowance(alice, address(aglContracts.aglStaking));
        coreContracts.usdaToken.approve(address(aglContracts.aglStaking), 20 ether);
        aglContracts.aglToken.allowance(alice, address(aglContracts.aglStaking));
        aglContracts.aglToken.approve(address(aglContracts.aglStaking), 20 ether);
        aglContracts.aglStaking.stake(11 ether);
    }

    function testUnstake() public {
        (bool success, bytes memory returndata) =  address(deployHelper).delegatecall(
            abi.encodeWithSelector(deployHelper.setUp.selector)
        );
        (coreContracts, aglContracts) = abi.decode(returndata,(CoreContracts, AGLContracts));
        coreContracts.adminContract.addNewCollateral(
            address (0),
            address (coreContracts.stabilityPoolAgilely),
            address (0),
            address (0),
            1 ether,
            1 ether,
            14
        );

        address alice = vm.addr(0x12345);

        aglContracts.aglStaking.unpause();

        vm.startPrank(address(this));
        console.log("before transfer this balance:", aglContracts.aglToken.balanceOf(address(this)));
        console.log("before transfer alice balance:", aglContracts.aglToken.balanceOf(alice));
        aglContracts.aglToken.allowance(address(this), alice);
        aglContracts.aglToken.approve(alice, 10000 ether);
        aglContracts.aglToken.transfer(alice, 10000 ether);
        console.log("after transfer this balance:", aglContracts.aglToken.balanceOf(address(this)));
        console.log("after transfer alice balance:", aglContracts.aglToken.balanceOf(alice));

        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1000 ether);
        coreContracts.borrowerOperations.openTrove{value: 3 ether}(address (0), 0, 0.05 ether, 300 ether, address (0), address (0));

        console.log("before stake alice balance:", aglContracts.aglToken.balanceOf(alice));
        coreContracts.usdaToken.allowance(alice, address(aglContracts.aglStaking));
        coreContracts.usdaToken.approve(address(aglContracts.aglStaking), 100 ether);
        aglContracts.aglToken.allowance(alice, address(aglContracts.aglStaking));
        aglContracts.aglToken.approve(address(aglContracts.aglStaking), 100 ether);
        aglContracts.aglStaking.stake(10 ether);
        console.log("after stake alice balance:", aglContracts.aglToken.balanceOf(alice));
        aglContracts.aglStaking.unstake(5 ether);
        console.log("after unstake alice balance:", aglContracts.aglToken.balanceOf(alice));
    }

    function testWithdraw() external {
        (bool success, bytes memory returndata) =  address(deployHelper).delegatecall(
            abi.encodeWithSelector(deployHelper.setUp.selector)
        );
        (coreContracts, aglContracts) = abi.decode(returndata,(CoreContracts, AGLContracts));
        coreContracts.adminContract.addNewCollateral(
            address (0),
            address (coreContracts.stabilityPoolAgilely),
            address (0),
            address (0),
            1 ether,
            1 ether,
            14
        );

        address alice = vm.addr(0x12345);

        aglContracts.aglStaking.unpause();

        vm.startPrank(address(this));
        console.log("before transfer this balance:", aglContracts.aglToken.balanceOf(address(this)));
        console.log("before transfer alice balance:", aglContracts.aglToken.balanceOf(alice));
        aglContracts.aglToken.allowance(address(this), alice);
        aglContracts.aglToken.approve(alice, 10000 ether);
        aglContracts.aglToken.transfer(alice, 10000 ether);
        console.log("after transfer this balance:", aglContracts.aglToken.balanceOf(address(this)));
        console.log("after transfer alice balance:", aglContracts.aglToken.balanceOf(alice));

        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1000 ether);
        coreContracts.borrowerOperations.openTrove{value: 3 ether}(address (0), 0, 0.05 ether, 300 ether, address (0), address (0));

        console.log("before stake alice balance:", aglContracts.aglToken.balanceOf(alice));
        coreContracts.usdaToken.allowance(alice, address(aglContracts.aglStaking));
        coreContracts.usdaToken.approve(address(aglContracts.aglStaking), 100 ether);
        aglContracts.aglToken.allowance(alice, address(aglContracts.aglStaking));
        aglContracts.aglToken.approve(address(aglContracts.aglStaking), 100 ether);
        aglContracts.aglStaking.stake(10 ether);
        console.log("after stake alice balance:", aglContracts.aglToken.balanceOf(alice));
        aglContracts.aglStaking.unstake(1000000000 ether);
        console.log("after unstake alice balance:", aglContracts.aglToken.balanceOf(alice));

    }

}
