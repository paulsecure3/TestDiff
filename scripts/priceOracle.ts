
import {ethers, upgrades} from 'hardhat';
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'
import {PriceFeed} from "../typechain-types/contracts/Dependencies"
import {CustomOracleWrapper} from "../typechain-types/contracts/OraclePriceFetcher/wrapped"
import {PriceOracleV1} from "../typechain-types/contracts/OraclePriceFetcher/oracle"
import {USDAToken} from "../typechain-types/contracts/Token"
import {BigNumber} from "ethers";

async function main() {
// 获取当前网络的提供者

    const [signer] = await ethers.getSigners();
    const gasPrice = await ethers.provider.getGasPrice()

    const ethAddress = "0x0000000000000000000000000000000000000000"

    const priceFeed = await ethers.getContractAt("PriceFeed", ContractAddress.priceFeed.address) as PriceFeed;
    let tx  = await priceFeed.setAccessTo(signer.address, true);
    await tx.wait();
    const customWrapper = await ethers.getContractAt("CustomOracleWrapper", ContractAddress.customOracle.address) as CustomOracleWrapper;
    const factory = await ethers.getContractFactory("PriceOracleV1");
    const   oracle = await upgrades.deployProxy(factory,
        ['eth', 18], {
        initializer:"setUp"
    }) as PriceOracleV1;
    console.log("oracle address",oracle.address);
    tx = await oracle.registerTrustedNode(signer.address);
    await tx.wait();
    console.log("register trusted node")
    tx = await oracle.update(ethers.utils.parseEther('20000'))
    await tx.wait();
    console.log("update price")
    tx = await oracle.update(ethers.utils.parseEther('20000'))
    await tx.wait();
    console.log("update price")
    tx = await customWrapper.addOracle(ethAddress,
        oracle.address,
        18,
        "0x9d1b464a",
        "0x053f14da",
        "0x",
        "0x313ce567");
    await tx.wait();
    console.log(await customWrapper.getExternalPrice(ethAddress));
    tx = await priceFeed.addOracle(ethAddress, customWrapper.address, ethAddress);
    await tx.wait();
    console.log(await priceFeed.getExternalPrice(ethAddress))



}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


