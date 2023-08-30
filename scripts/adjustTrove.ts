
import { ethers} from 'hardhat';
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'
import {PriceFeed} from "../typechain-types/contracts/Dependencies"
import {BorrowerOperations,AGLParameters} from "../typechain-types/contracts/Core"
import {USDAToken} from "../typechain-types/contracts/Token"
import {BigNumber} from "ethers";

async function main() {
// 获取当前网络的提供者

    const [signer] = await ethers.getSigners();
    const gasPrice = await ethers.provider.getGasPrice()
    const usda = await ethers.getContractAt("USDAToken", ContractAddress.USDAToken.address) as USDAToken;

    const param = await ethers.getContractAt("AGLParameters", ContractAddress.agilelyParameters.address) as AGLParameters

    const maxFeePercentage = ethers.BigNumber.from("50000000000000000");
    const borrower = await ethers.getContractAt("BorrowerOperations", ContractAddress.borrowerOperations.address) as BorrowerOperations;


    const tx = await borrower.adjustTrove(
        "0x0000000000000000000000000000000000000000" ,
        0,
        maxFeePercentage,
        0,
        ethers.utils.parseEther('400'),
        true,
        signer.address,
        signer.address,{
        gasPrice: gasPrice.mul(12).div(10),
        gasLimit:2000000,
        value:ethers.utils.parseEther("1")
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


