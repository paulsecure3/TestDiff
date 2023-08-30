
import { ethers} from 'hardhat';
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'
import {PriceFeed} from "../typechain-types/contracts/Dependencies"
import {BorrowerOperations, AGLParameters, TroveManager} from "../typechain-types/contracts/Core"
import {USDAToken, USDATokenTest} from "../typechain-types/contracts/Token"
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
/*    console.log(await borrower.owner())
    console.log(await param.priceFeed())
    console.log("trove manager",await borrower.troveManager())
    console.log("usda token",await borrower.usdaToken())
    console.log("interest manager", await borrower.interestManager());*/

    const troveManager = await ethers.getContractAt("TroveManager", ContractAddress.troveManager.address) as TroveManager;
    console.log("total debt",ethers.utils.formatEther(await troveManager.getTroveDebt("0x0000000000000000000000000000000000000000",signer.address)));
    console.log(await borrower.aglParams())
     const tx = await borrower.openTrove("0x0000000000000000000000000000000000000000" ,0,maxFeePercentage,ethers.utils.parseEther('1500'),signer.address,signer.address,{
         gasPrice: gasPrice.mul(12).div(10),
         gasLimit:20000000,
         value:ethers.utils.parseEther("0.1")
     });
     await tx.wait();
    console.log(tx.hash);
    console.log("usda balance",ethers.utils.formatEther(await usda.balanceOf(signer.address)));
    console.log("total debt",ethers.utils.formatEther(await troveManager.getTroveDebt("0x0000000000000000000000000000000000000000",signer.address)));




}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


