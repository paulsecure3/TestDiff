// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../DeployHelper.sol";


contract AdminContractTest is Test {
    DeployHelper deployHelper;

    function setUp() public {
        deployHelper = new DeployHelper();
    }

    function testSetAddresses() external {
        vm.startPrank(address(deployHelper));
        CoreContracts memory coreContracts = deployHelper.deployCoreContracts();
        AGLContracts memory aglContracts = deployHelper.deployAGLContracts(address(this));
        console.log("deployerHelper address", address(deployHelper));
        console.log("owner address", coreContracts.borrowerOperations.owner());
        deployHelper.InitializeCoreContracts(coreContracts, aglContracts);
        assertEq(coreContracts.adminContract.owner(), address(deployHelper));
        assertEq(coreContracts.adminContract.isInitialized(), true);
    }


    function testAddCollateral() external {
        (bool success, bytes memory returndata) =  address(deployHelper).delegatecall(
            abi.encodeWithSelector(deployHelper.setUp.selector)
        );
        (CoreContracts memory coreContracts, AGLContracts memory AGLContracts) = abi.decode(returndata,(CoreContracts, AGLContracts));
        coreContracts.adminContract.addNewCollateral(
            address (0),
            address (coreContracts.stabilityPoolAgilely),
            address (0),
            address (0),
            1 ether,
            1 ether,
            14
        );
    }

    function testFailNotOwnerAddCollateral() external {
        vm.startPrank(address(this));
        (bool success, bytes memory returndata) =  address(deployHelper).delegatecall(
            abi.encodeWithSelector(deployHelper.setUp.selector)
        );
        vm.stopPrank();
        vm.startPrank(vm.addr(0x111));
        (CoreContracts memory coreContracts, AGLContracts memory AGLContracts) = abi.decode(returndata,(CoreContracts, AGLContracts));
        coreContracts.adminContract.addNewCollateral(
            address (0),
            address (coreContracts.stabilityPoolAgilely),
            address (0),
            address (0),
            1 ether,
            1 ether,
            14
        );
    }

}
