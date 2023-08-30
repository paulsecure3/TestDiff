
import {ethers, upgrades} from 'hardhat';
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'
import {BorrowerOperations, SortedTroves, TroveManager, TroveRedemptor} from "../typechain-types/contracts/Core"
import {CollSurplusPool} from "../typechain-types/contracts/Core"
import {HintHelpers} from "../typechain-types/contracts/Dependencies"
import {BigNumber} from "ethers";
import {PriceFeed} from "../typechain-types";

const ethAddress = "0x0000000000000000000000000000000000000000"
async function main() {
// 获取当前网络的提供者

    const [signer] = await ethers.getSigners();
    const gasPrice = await ethers.provider.getGasPrice()
    const priceFeed = await ethers.getContractAt("PriceFeed", ContractAddress.priceFeed.address) as PriceFeed;
    const ethPrice = await priceFeed.getExternalPrice(ethAddress)
    //await getICR(ethPrice);
    const sortedTroves = await ethers.getContractAt("SortedTroves", ContractAddress.sortedTroves.address) as SortedTroves ;
    console.log("troves size",(await sortedTroves.getSize(ethAddress)).toString())
    const hintHelpers = await ethers.getContractAt("HintHelpers", ContractAddress.hintHelpers.address) as HintHelpers;
    const object : {
        firstRedemptionHint: string,
        partialRedemptionHintNICR: BigNumber,
        truncatedUSDAamount: BigNumber
    }  = await hintHelpers.getRedemptionHints(ethAddress, ethers.utils.parseEther("40"), ethPrice, 100);
    console.log(ethers.utils.formatEther(object.partialRedemptionHintNICR.toString()))
    console.log(ethers.utils.formatEther(object.truncatedUSDAamount.toString()))
    console.log("first redemption address",object.firstRedemptionHint)
    console.log(await  sortedTroves.data(ethAddress))
  /*  const borrower = await ethers.getContractAt("BorrowerOperations", ContractAddress.borrowerOperations.address) as BorrowerOperations;
 const tx = await borrower.claimCollateral(ethAddress);
    await tx.wait();
    console.log(tx.hash)*/
   /* setTimeout(() => {
        console.log("Delayed for 1 second.");
    }, 50000);
*/

    const redemptor = await ethers.getContractAt("TroveRedemptor",ContractAddress.troveRedemptor.address) as TroveRedemptor;
   /* const tx = await redemptor.redeemCollateral(ethAddress, signer.address, ethers.utils.parseEther("150"), object.firstRedemptionHint,ethAddress, ethAddress, object.partialRedemptionHintNICR, 100, ethers.utils.parseEther('1'), {
        gasPrice: gasPrice.mul(12).div(10),
        gasLimit: 2000000,
    })
    await tx.wait();
    console.log(tx.hash)*/
    const tx = await redemptor.AutoRedeemCollateral(ethAddress, signer.address, ethers.utils.parseEther("150"), 100, ethers.utils.parseEther('1') );

    await tx.wait();
    console.log(tx.hash)

}

async function getICR(ethPrice:BigNumber){
    const [signer] = await ethers.getSigners();
    const troveManager  = await ethers.getContractAt("TroveManager", ContractAddress.troveManager.address) as TroveManager;
    console.log("icr", ethers.utils.formatEther(await troveManager.getCurrentICR(ethAddress, signer.address, ethPrice)));
    console.log("tcr ", ethers.utils.formatEther(await troveManager.getTCR(ethAddress,  ethPrice)));
    console.log("system coll",ethers.utils.formatEther(await troveManager.getEntireSystemColl(ethAddress)))
    console.log("system debt",ethers.utils.formatEther(await troveManager.getEntireSystemDebt(ethAddress)))
    console.log("own coll",ethers.utils.formatEther(await troveManager.getTroveColl(ethAddress, signer.address)))
    console.log("own debt",ethers.utils.formatEther(await troveManager.getTroveDebt(ethAddress, signer.address)))
}

async function redeem() {
    //const redemptor = await ethers.
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


