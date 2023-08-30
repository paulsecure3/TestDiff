
import { ethers} from 'hardhat';
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'
import {PriceFeed} from "../typechain-types/contracts/Dependencies"
import {BorrowerOperations,AGLParameters} from "../typechain-types/contracts/Core"
import {USDAToken, USDATokenTest} from "../typechain-types/contracts/Token"
import {AgilelyGLPStaking} from "../typechain-types/contracts/GmxStake/AgilelyGLPStaking"
import {BigNumber} from "ethers";

async function main() {
// 获取当前网络的提供者

    const [signer] = await ethers.getSigners();
    const gasPrice = await ethers.provider.getGasPrice()
    const usda = await ethers.getContractAt("USDAToken", ContractAddress.USDAToken.address) as USDAToken;
    console.log(await usda.balanceOf(signer.address));

    const param = await ethers.getContractAt("AGLParameters", ContractAddress.agilelyParameters.address) as AGLParameters

    const maxFeePercentage = ethers.BigNumber.from("50000000000000000");
    const borrower = await ethers.getContractAt("BorrowerOperations", ContractAddress.borrowerOperations.address) as BorrowerOperations;
    const stake = await ethers.getContractAt("AgilelyGLPStaking", ContractAddress.glpStaking.address) as AgilelyGLPStaking;
    console.log(await stake.isOperator("0x179b41239F361062F0a5BC9aB76995A6b39E4eBA"))
    let tx  = await stake.setOperator("0x179b41239F361062F0a5BC9aB76995A6b39E4eBA", true);
    await tx.wait();

    tx =await stake.setPriceFeed("0xcdB5cab65fdB22B10797e4165fB9ff90a0a8CC52")
    await tx.wait();


    console.log(await borrower.aglParams())
    tx = await borrower.openTrove("0x12EA0F9FDC9eb371307f1a87E2CdEB26d1128DF8" ,ethers.utils.parseEther('500'),maxFeePercentage,ethers.utils.parseEther('300'),signer.address,signer.address,{
        gasPrice: gasPrice.mul(12).div(10),
        gasLimit:20000000,
    });
    await tx.wait();
    console.log(tx.hash);
    console.log(await usda.balanceOf(signer.address));



}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


