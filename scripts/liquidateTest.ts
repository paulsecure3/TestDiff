
import { ethers} from 'hardhat';
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'
import {PriceFeed, HintHelpers} from "../typechain-types/contracts/Dependencies"
import {
    BorrowerOperations,
    AGLParameters,
    TroveManager,
    StabilityPoolManager,
    CommunityIssuance
} from "../typechain-types/contracts/Core"
import {StabilityPool} from "../typechain-types/contracts/Pool"
import {USDAToken, } from "../typechain-types/contracts/Token"
import {BigNumber} from "ethers";

async function main() {
// 获取当前网络的提供者

    const [signer] = await ethers.getSigners();
    const gasPrice = await ethers.provider.getGasPrice()

/*
    //initial
    const stabilityPoolManager  = await ethers.getContractAt("StabilityPoolManager", ContractAddress.stabilityPoolManager.address) as StabilityPoolManager;
    const stabilityPoolAddress = await stabilityPoolManager.getAssetStabilityPool("0x0000000000000000000000000000000000000000");


    const stabilityPool = await ethers.getContractAt("StabilityPool", stabilityPoolAddress) as StabilityPool;
    console.log("stability pool usda amount", ethers.utils.formatEther(await stabilityPool.getTotalUSDADeposits()));
    const usda = await ethers.getContractAt("USDAToken", ContractAddress.USDAToken.address) as USDAToken;
    console.log("user amount", ethers.utils.formatEther(await usda.balanceOf(signer.address)));
/!*    const stakeUsda =  await stabilityPool.provideToSP(ethers.utils.parseEther('1500'));
    await stakeUsda.wait();
    console.log(stakeUsda.hash)*!/
    console.log("stability pool usda amount", ethers.utils.formatEther(await stabilityPool.getTotalUSDADeposits()));

*/
    //liquidate
    const ethAddress = "0x0000000000000000000000000000000000000000"
    const troveManager = await ethers.getContractAt("TroveManager", ContractAddress.troveManager.address) as TroveManager;
    const pricefeed = await ethers.getContractAt("PriceFeed", ContractAddress.priceFeed.address) as PriceFeed;
    const ethPrice = await pricefeed.getExternalPrice(ethAddress);
    console.log("eth price is ", ethers.utils.formatEther(ethPrice));
    console.log("current icr is ",ethers.utils.formatEther(await troveManager.getCurrentICR(ethAddress, signer.address, ethPrice)));
    const liquidate = await troveManager.liquidate("0x0000000000000000000000000000000000000000", "0x4bc65A4Bd56BAce950AA979C552e8660aACC0e53");
    await liquidate.wait();
    console.log(liquidate.hash)
    const liquidateTroves = await troveManager.liquidateTroves("0x0000000000000000000000000000000000000000", 2);
    await liquidateTroves.wait();
    console.log(liquidateTroves.hash)

    const hintHelpers = await ethers.getContractAt("HintHelpers", "0xCe339dFBA0FD2914a03Ab8435f5818838B566d3e") as HintHelpers;
    console.log(ethers.utils.formatEther(await hintHelpers.getLiquidatableAmount("0x0000000000000000000000000000000000000000", ethPrice)));
    const tx = await troveManager.liquidateTroves("0x0000000000000000000000000000000000000000", 1);
    await tx.wait();
    console.log(tx.hash)
    console.log(ethers.utils.formatEther(await hintHelpers.getLiquidatableAmount("0x0000000000000000000000000000000000000000", ethPrice)));





}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


