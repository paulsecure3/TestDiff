import { ethers, network } from 'hardhat';
import LZ_ENDPOINTS from "../constants/layerzeroEndpoints.json"
import { writeDeployment } from "../utils/writeDeployment"

async function main() {
    // 获取部署者的钱包
    const [deployer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("DeterministicDeployFactory");
    const factory = await Factory.deploy();
    await factory.deployed();
    console.log("Factory deployed to:", factory.address);

    let lzEndpointAddress = '';

    if (network.name === "arbitrumGoerli") {
        lzEndpointAddress = LZ_ENDPOINTS['arbitrum-goerli'];
    } else if (network.name === "mumbai") {
        lzEndpointAddress = LZ_ENDPOINTS.mumbai;
    } else if (network.name === "goerli") {
        lzEndpointAddress = LZ_ENDPOINTS.goerli;
    }

    const sharedDecimals = 6;

    const usdaFactory = await ethers.getContractFactory("USDAToken", deployer);
    const usda = await usdaFactory.deploy(
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        lzEndpointAddress,
        sharedDecimals,
        false
    )
    console.log(network.name, " USDA address: ", usda.address)

    await writeDeployment("../deployment/mainnetDeploymentOutput.json", network.name, usda.address, usda.deployTransaction.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });



