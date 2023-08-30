
import {ethers, upgrades} from 'hardhat';
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'
import {PriceFeed} from "../typechain-types/contracts/Dependencies"
import {CustomOracleWrapper} from "../typechain-types/contracts/OraclePriceFetcher/wrapped"
import {PriceOracleV1} from "../typechain-types/contracts/OraclePriceFetcher/oracle"
import {USDAToken, USDATokenTest} from "../typechain-types/contracts/Token"
import {BigNumber} from "ethers";

async function main() {
// 获取当前网络的提供者

    const [signer] = await ethers.getSigners();
    const gasPrice = await ethers.provider.getGasPrice()

    const changePriceTo = ethers.utils.parseEther('29000')

    const ethAddress = "0x0000000000000000000000000000000000000000"
    const ethOracleAddress = "0xD1d01bbE230876dA6FfcA8A53f5E5795B7a88311"
    const priceFeed = await ethers.getContractAt("PriceFeed", ContractAddress.priceFeed.address) as PriceFeed;
    const ethOracle = await ethers.getContractAt("PriceOracleV1", ethOracleAddress) as PriceOracleV1;
     let tx  = await ethOracle.update(changePriceTo);
    await tx.wait();
    tx  = await ethOracle.update(changePriceTo);
    await tx.wait();
    console.log("eth price",(await priceFeed.getExternalPrice(ethAddress)).toString() )
    tx = await priceFeed.fetchPrice(ethAddress);
    await tx.wait();
    console.log(tx.hash)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


