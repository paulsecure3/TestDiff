
import { ethers} from 'hardhat';
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'
import {PriceFeed} from "../typechain-types/contracts/Dependencies"
import {BorrowerOperations,AGLParameters} from "../typechain-types/contracts/Core"
import {USDAToken, } from "../typechain-types/contracts/Token"
import {BigNumber} from "ethers";
import { mutualExchange} from './utils'
import  {configuration}from '../config'
import {IAgilelyDexTrader} from "../typechain-types/contracts/Core/BorrowerOperations";
import ManualExchangeStruct = IAgilelyDexTrader.ManualExchangeStruct;
import {IERC20} from "../typechain-types";

export async function closeTrove() {
// 获取当前网络的提供者

    const [signer] = await ethers.getSigners();
    const gasPrice = await ethers.provider.getGasPrice()
    const usda = await ethers.getContractAt("USDAToken", ContractAddress.USDAToken.address) as USDAToken;

    const param = await ethers.getContractAt("AGLParameters", ContractAddress.agilelyParameters.address) as AGLParameters

    const maxFeePercentage = ethers.BigNumber.from("50000000000000000");
    const borrower = await ethers.getContractAt("BorrowerOperations", ContractAddress.borrowerOperations.address) as BorrowerOperations;


    const tx = await borrower.closeTrove(
        "0x0000000000000000000000000000000000000000" ,

        {
            gasPrice: gasPrice.mul(12).div(10),
            gasLimit:2000000,
        });
    await tx.wait();
    console.log(tx.hash);
    console.log(await usda.balanceOf(signer.address));



}

export async function closeTroveWithDexTrader(asset: string){
    const [signer] = await ethers.getSigners();
    const gasPrice = await ethers.provider.getGasPrice()
    const usda = await ethers.getContractAt("USDAToken", ContractAddress.USDAToken.address) as USDAToken;
    const borrower = await ethers.getContractAt("BorrowerOperations", ContractAddress.borrowerOperations.address) as BorrowerOperations;
    const weth = await ethers.getContractAt("contracts/Interfaces/IERC20.sol:IERC20",configuration.arbitrumGoerli.WETH_ERC20) as IERC20;
    const txx = await weth.approve(ContractAddress.borrowerOperations.address,ethers.constants.MaxUint256)
    await txx.wait();
    const closeTrove = await borrower.closeTroveWithDexTrader(asset,0,[mutualExchange(configuration.arbitrumGoerli.WETH_ERC20, ContractAddress.USDAToken.address) as ManualExchangeStruct],
        {
            gasLimit:  2000000,
            gasPrice,
        });
 /*   const tx = await borrower.closeTroveWithDexTrader(
        asset,
        0,
        manualExchange,
        {
            gasPrice: gasPrice.mul(12).div(10),
            gasLimit:2000000,
        });*/
    await closeTrove.wait();
    console.log(closeTrove.hash);
    console.log(await usda.balanceOf(signer.address));

}
closeTroveWithDexTrader("0x0000000000000000000000000000000000000000")
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


