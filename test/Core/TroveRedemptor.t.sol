// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;
import "../DeployHelper.sol";
import "../utils/Utils.sol";
import "forge-std/Test.sol";
import "../../contracts/Test/MockPriceFeed.sol";


contract TroveRedemptorTest is Utils{
    CoreContracts coreContracts;
    AGLContracts  aglContracts;
    TroveRedemptor troveRedemptor;
    DeployHelper deployHelper;
    function setUp() public{
        deployHelper = new DeployHelper();
        (coreContracts, aglContracts) = deployHelper.setUp();
        troveRedemptor = deployHelper.redemptor();
    }

    function testRedeem() public {
        address payable[] memory users = createUsers(3);
        //user 1 openTrove
        vm.startPrank(users[0]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        vm.stopPrank();
        console.log("usda balance", coreContracts.usdaToken.balanceOf(users[0]));

        //user 2 openTrove
        vm.startPrank(users[1]);
        coreContracts.borrowerOperations.openTrove{value: 10 ether}(address (0), 0, 0.05 ether, 2000 ether, address (0), address (0));
        vm.stopPrank();
        console.log("usda balance", coreContracts.usdaToken.balanceOf(users[0]));

        //user 3 openTrove
        vm.startPrank(users[2]);
        coreContracts.borrowerOperations.openTrove{value: 100 ether}(address (0), 0, 0.05 ether, 10000 ether, address (0), address (0));
        vm.stopPrank();
        console.log("usda balance", coreContracts.usdaToken.balanceOf(users[0]));

        uint256 ethPrice = coreContracts.priceFeed.fetchPrice(address (0));
       (address firstRedemptionHint, uint256 partialRedemptionHintNICR, uint256 truncatedUSDAamount) = coreContracts.hintHelpers.getRedemptionHints(address (0), 4000 ether, 200 ether, 2);
        console.log(users[0],users[1], users[2]);
        console.log("firstRedemption Hint", firstRedemptionHint);
        console.log("redemptor address", address (troveRedemptor));
        vm.startPrank(users[2]);
        troveRedemptor.AutoRedeemCollateral(address (0), users[2], 4000 ether, 3, 1 ether);

    }


}