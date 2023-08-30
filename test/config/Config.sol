import "forge-std/Test.sol";

pragma solidity ^0.8.16;

contract Config {
    struct InterestModule{
        address linkedToken;
        string name;
        uint8 risk;
    }


    InterestModule[] public interestModules;
    mapping (bytes32 => address) public addr;
    address public constant treasuryAddress = 0x4bc65A4Bd56BAce950AA979C552e8660aACC0e53;
    constructor() {
        interestModules.push(InterestModule({
            linkedToken: address(0),
            name: "Module ETH",
            risk: 0
        }));

        interestModules.push(InterestModule({
            linkedToken: 0x12EA0F9FDC9eb371307f1a87E2CdEB26d1128DF8,
            name: "Module GLP",
            risk: 2
        }));

    }



}
