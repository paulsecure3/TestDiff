import { task } from "hardhat/config"
import { deploySameAddressToken } from "./sameAddressToken"


task("account", "returns nonce and balance for specified address on multiple networks")
    .addParam("address")
    .setAction(deploySameAddressToken);

