import { ethers} from 'hardhat';
import {USDAToken} from '../typechain-types/contracts/Token';
import {PromiseOrValue} from "../typechain-types/common";
import {BytesLike} from "ethers";

async function main() {
// 获取当前网络的提供者

    const provider = ethers.providers.Provider;
    const gasPrice = await ethers.provider.getGasPrice()
// 获取部署者的钱包
    const [deployer] = await ethers.getSigners();
    /*  const usdaFactory = await ethers.getContractFactory("USDAToken", deployer);
      const usda =await usdaFactory.deploy("0xea50d5f47Dd1c2a0d89728A8DBCe91a6Be89Bc5f","0xea50d5f47Dd1c2a0d89728A8DBCe91a6Be89Bc5f","0xea50d5f47Dd1c2a0d89728A8DBCe91a6Be89Bc5f") as USDAToken;
      await usda.deployed()
      console.log(usda.address);*/
    //goerli
    let remoteAndLocal1 = ethers.utils.solidityPack(
        ['address', 'address'],
        [ "0xCd0088b41E651d4e98f9237Fb8E9435eBE8ee5a5","0xc46fDae6C2ef338B077B8e11778b096A3873FeF5"]
    )
    //mumbai
    let remoteAndLocal2 = ethers.utils.solidityPack(
        ['address', 'address'],
        [ "0xCd0088b41E651d4e98f9237Fb8E9435eBE8ee5a5","0xc46fDae6C2ef338B077B8e11778b096A3873FeF5"]
    )

    const usda = await ethers.getContractAt("USDAToken", "0xc46fDae6C2ef338B077B8e11778b096A3873FeF5", deployer) as USDAToken;
    const tx1 =await usda.setTrustedRemote(10121,remoteAndLocal1,{gasPrice});
    await tx1.wait();
    const tx2 =await usda.setTrustedRemote(10109,remoteAndLocal2,{gasPrice});
    await tx2.wait();
    /*
           const toAddressBytes = ethers.utils.defaultAbiCoder.encode(['address'],["0x104D71d51C12e7BE7Fc6678eb3D62b47dAF87Ab8"])
           const callParams: {
               refundAddress: PromiseOrValue<string>;
               zroPaymentAddress: PromiseOrValue<string>;
               adapterParams: PromiseOrValue<BytesLike>;
           } = {
               refundAddress: deployer.address,
               zroPaymentAddress: ethers.constants.AddressZero,
               adapterParams: "0x"
           };
          const tx=  await usda.sendFrom("0x104D71d51C12e7BE7Fc6678eb3D62b47dAF87Ab8",10109,toAddressBytes,ethers.utils.parseEther('1'),callParams ,{
               value: ethers.utils.parseEther('0.2'),
               gasLimit: 2000000
           });
          await tx.wait();
        console.log(tx.hash)*/

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


/*
goerli optimism-goerli
optimism-goerli goerli
arbitrum-goerli optimism-goerli
optimism-goerli arbitrum-goerli*/
