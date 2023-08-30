
import { ethers} from 'hardhat';
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'
import {PriceFeed} from "../typechain-types/contracts/Dependencies"
import {BorrowerOperations,TroveManager, AGLParameters} from "../typechain-types/contracts/Core"
import {ActivePool} from "../typechain-types/contracts/Pool"
import {USDAToken, } from "../typechain-types/contracts/Token"
import {BigNumber} from "ethers";
import {IAgilelyDexTrader} from "../typechain-types/contracts/Core/BorrowerOperations";

export async function main() {
// 获取当前网络的提供者

    const [signer] = await ethers.getSigners();
    const gasPrice = await ethers.provider.getGasPrice()


    const aglParam = await ethers.getContractAt("AGLParameters", ContractAddress.agilelyParameters.address) as AGLParameters;
    const tx = await aglParam.setUSDAMintCap("0x0000000000000000000000000000000000000000", ethers.utils.parseEther('1000000'));
    await tx.wait();




}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


