// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "forge-std/Test.sol";
import "./DeployHelper.sol";

contract DeployHelperTest is Test{
    DeployHelper deployHelper;
    function setUp() public {
       deployHelper = new DeployHelper();
    }

    function testDeploy() public {
        CoreContracts memory coreContracts = deployHelper.deployCoreContracts();
        AGLContracts memory aglContracts = deployHelper.deployAGLContracts(address (this));
        console.log("deployerHelper address",address (deployHelper));
        console.log("owner address",coreContracts.borrowerOperations.owner());
        deployHelper.InitializeCoreContracts(coreContracts, aglContracts);
        assertEq(coreContracts.borrowerOperations.owner(),address (deployHelper));
    }

    function testDeployWithDelegateCall() public {
        console.log("tester address",address (this));
        console.log("deployerHelper address",address (deployHelper));
        (bool success, bytes memory returndata) =  address(deployHelper).delegatecall(
            abi.encodeWithSelector(deployHelper.setUp.selector)
        );
        (CoreContracts memory coreContracts, AGLContracts memory AGLContracts) = abi.decode(returndata,(CoreContracts, AGLContracts));
        console.log("owner address",coreContracts.borrowerOperations.owner());
        assertEq(coreContracts.borrowerOperations.owner(),address (this));
    }

    function testOpenTrove() public {
        (bool success, bytes memory returndata) =  address(deployHelper).delegatecall(
            abi.encodeWithSelector(deployHelper.setUp.selector)
        );
        (CoreContracts memory coreContracts, AGLContracts memory AGLContracts) = abi.decode(returndata,(CoreContracts, AGLContracts));
        address testUser = vm.addr(1);
        console.log(testUser);
        vm.deal(testUser, 10 ether);
        console.log("user balance", testUser.balance);
        console.log("borrower operations", address (coreContracts.borrowerOperations));
        console.log("trove manage", address (coreContracts.borrowerOperations.troveManager()));
        console.logBool(coreContracts.usdaToken.isActiveChain());
        console.log("usda: borrowerOperations ", coreContracts.usdaToken.borrowerOperationsAddress());
        console.log("aglstaking paused");
        console.logBool(AGLContracts.aglStaking.paused());
        console.log("usda: trovemanager ", coreContracts.usdaToken.troveManagerAddress());
        //console.log("trove manage address", coreContracts.borrowerOperations.troveManager() );
        vm.startPrank(testUser);
        coreContracts.borrowerOperations.openTrove{value: 3 ether}(address (0), 0, 0.05 ether, 300 ether, address (0), address (0));
    }

}