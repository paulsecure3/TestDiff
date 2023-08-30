import { ethers} from 'hardhat';
import {TroveManager} from '../typechain-types/contracts/Core/TroveManager';
import {AGLParameters} from '../typechain-types/contracts/Core/AGLParameters';
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'

async function main() {
// 获取当前网络的提供者

    const provider = ethers.providers.Provider;
    const gasPrice = await ethers.provider.getGasPrice()
// 获取部署者的钱包
    const [deployer] = await ethers.getSigners();

    const priceFeedV2 = ""
    const AGLParameters = await ethers.getContractAt("AGLParameters", ContractAddress.agilelyParameters.address) as AGLParameters;
    const tx1 = await AGLParameters.setPriceFeed(priceFeedV2);
    await tx1.wait();
    const TroveManager = await ethers.getContractAt("TroveManager", ContractAddress.troveManager.address) as TroveManager;
    const tx = await TroveManager.setInterestManager("0xA1640C3C1038835CeF76504a8be13f1ab3E08616");
    await tx.wait();
    console.log(tx.hash)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });