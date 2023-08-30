
import { ethers} from 'hardhat';
import {USDAToken} from '../typechain-types/contracts/Token';
import {PromiseOrValue} from "../typechain-types/common";
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'
import {BorrowerOperations, CollSurplusPool} from "../typechain-types";

async function main() {
// 获取当前网络的提供者

    const coll = await ethers.getContractAt("CollSurplusPool", ContractAddress.collSurplusPool.address) as CollSurplusPool;
    console.log((await coll.getCollateral("0x0000000000000000000000000000000000000000","0x1A721BC6F4601E26Ddd987439D29f5F5693bDB16")).toString() )
    console.log(await coll.getCollateral("0x0000000000000000000000000000000000000000","0x9788cb07AFf88E46812785a5bA325F05e2FcdC06") )
    console.log((await coll.getCollateral("0x0000000000000000000000000000000000000000","0x104D71d51C12e7BE7Fc6678eb3D62b47dAF87Ab8")).toString() )
    const borrowerOperations = await ethers.getContractAt("BorrowerOperations", ContractAddress.borrowerOperations.address) as BorrowerOperations;
    const tx = await borrowerOperations.claimCollateral("0x0000000000000000000000000000000000000000");
    await tx.wait();
    console.log(tx.hash)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });



