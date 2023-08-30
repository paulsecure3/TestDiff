// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;

import "forge-std/Test.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../../contracts/Core/AGLToken.sol";

contract AGLTokenTest is Test {
    using SafeMath for uint256;

    AGLToken token;
    uint256 internal _1_MILLION = 1e24; // 1e6 * 1e18 = 1e24

    // hardhat getSigner() -> vm.addr()
    address alice = vm.addr(0x1);
    address bob = vm.addr(0x2);

    // hardhat beforeEach -> setUp
    function setUp() public {
        token = new AGLToken(alice);
    }

    function testName() external {
        assertEq("Agilely", token.name());
    }

    function testSymbol() external {
        assertEq("AGL", token.symbol());
    }

    function testApprove() public {
        assertTrue(token.approve(alice, 1e18));
        assertEq(token.allowance(address(this), alice), 1e18);
    }

    function testIncreaseAllowance() external {
        assertEq(token.allowance(address(this), alice), 0);
        assertTrue(token.increaseAllowance(alice, 2e18));
        assertEq(token.allowance(address(this), alice), 2e18);
    }

    function testDescreaseAllowance() external {
        testApprove();
        assertTrue(token.decreaseAllowance(alice, 0.5e18));
        assertEq(token.allowance(address(this), alice), 0.5e18);
    }

    function testTransfer() external {
        vm.startPrank(alice);
        token.transfer(bob, 0.5e18);
        assertEq(token.balanceOf(bob), 0.5e18);
        // assertEq(token.balanceOf(alice), 1.5e18);
        vm.stopPrank();
    }

    function testTransferFrom() external {
        vm.prank(alice);
        token.approve(address(this), 1e18);
        assertTrue(token.transferFrom(alice, bob, 0.7e18));
        assertEq(token.balanceOf(bob), 0.7e18);
    }

    function testFailApproveToZeroAddress() external {
        token.approve(address(0), 1e18);
    }

    function testFailApproveFromZeroAddress() external {
        vm.prank(address(0));
        token.approve(alice, _1_MILLION.mul(50));
    }

    function testFailTransferToZeroAddress() external {
        vm.prank(alice);
        token.transfer(address(0), 1e18);
    }

    function testFailTransferFromZeroAddress() external {
        vm.prank(address(0));
        token.transfer(alice , 1e18);
    }

    function testFailTransferInsufficientBalance() external {
        vm.prank(alice);
        token.transfer(bob , _1_MILLION.mul(51));
    }

    function testFailTransferFromInsufficientApprove() external {
        vm.prank(alice);
        token.approve(address(this), 1e18);
        token.transferFrom(alice, bob, 2e18);
    }

    function testFailTransferFromInsufficientBalance() external {
        vm.prank(alice);
        token.approve(address(this), type(uint).max);
        token.transferFrom(alice, bob, _1_MILLION.mul(51));
    }

    // /*****************************/
    // /*      Fuzz Testing         */
    // /*****************************/


    // function testFuzzTransferFrom(address from, address to,uint256 approval, uint256 amount) external {
    //     vm.assume(from != address(0));
    //     vm.assume(to != address(0));

    //     amount = bound(amount, 0, approval);
    //     token.mint(from, amount);

    //     vm.prank(from);
    //     assertTrue(token.approve(address(this), approval));

    //     assertTrue(token.transferFrom(from, to, amount));
    //     assertEq(token.totalSupply(), amount);

    //     if (approval == type(uint256).max){
    //         assertEq(token.allowance(from, address(this)), approval);
    //     }
    //     else {
    //         assertEq(token.allowance(from,address(this)), approval - amount);
    //     }

    //     if (from == to) {
    //         assertEq(token.balanceOf(from), amount);
    //     } else {
    //         assertEq(token.balanceOf(from), 0);
    //         assertEq(token.balanceOf(to), amount);
    //     }
    // }

    // function testFailFuzzBurnInsufficientBalance(address to, uint256 mintAmount, uint256 burnAmount) external {
    //     burnAmount = bound(burnAmount, mintAmount+1, type(uint256).max);

    //     token.mint(to, mintAmount);
    //     token.burn(to, burnAmount);
    // }

    // function testFailTransferInsufficientBalance(address to, uint256 mintAmount, uint256 sendAmount) external {
    //     sendAmount = bound(sendAmount, mintAmount + 1, type(uint256).max);

    //     token.mint(address(this), mintAmount);
    //     token.transfer(to, sendAmount);
    // }

    // function testFailFuzzTransferFromInsufficientApprove(address from, address to,uint256 approval, uint256 amount) external {
    //     amount = bound(amount, approval+1, type(uint256).max);

    //     token.mint(from, amount);
    //     vm.prank(from);
    //     token.approve(address(this), approval);
    //     token.transferFrom(from, to, amount);
    // }

    // function testFailFuzzTransferFromInsufficientBalance(address from, address to, uint256 mintAmount, uint256 sentAmount) external {
    //     sentAmount = bound(sentAmount, mintAmount+1, type(uint256).max);

    //     token.mint(from, mintAmount);
    //     vm.prank(from);
    //     token.approve(address(this), type(uint256).max);

    //     token.transferFrom(from, to, sentAmount);
    // }
}
