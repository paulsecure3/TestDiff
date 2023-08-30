import { ethers} from 'hardhat';
import {USDAToken} from '../typechain-types/contracts/Token';

async function main() {

    const [deployer] = await ethers.getSigners();
    let remoteAndLocal1 = ethers.utils.solidityPack(
        ['address', 'address'],
        [ "0xc46fDae6C2ef338B077B8e11778b096A3873FeF5","0xCd0088b41E651d4e98f9237Fb8E9435eBE8ee5a5"]
    )
    //goerli
    let remoteAndLocal2 = ethers.utils.solidityPack(
        ['address', 'address'],
        [ "0xCd0088b41E651d4e98f9237Fb8E9435eBE8ee5a5","0xCd0088b41E651d4e98f9237Fb8E9435eBE8ee5a5"]
    )
    const usda = await ethers.getContractAt("USDAToken", "0xCd0088b41E651d4e98f9237Fb8E9435eBE8ee5a5", deployer) as USDAToken;
    const tx1 =await usda.setTrustedRemote(10143,remoteAndLocal1);
    await tx1.wait();
    const tx2 =await usda.setTrustedRemote(10121,remoteAndLocal2);
    await tx2.wait();

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
