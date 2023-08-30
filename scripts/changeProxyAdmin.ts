
import { ethers, getNamedAccounts, upgrades} from 'hardhat';
import ContractAddress from '../deployment/mainnetDeploymentOutput.json'
import {PriceFeed} from "../typechain-types/contracts/Dependencies"
import {BorrowerOperations,AGLParameters} from "../typechain-types/contracts/Core"
import {USDAToken} from "../typechain-types/contracts/Token"
import {BigNumber} from "ethers";
import {Ownable, ProxyAdmin, TransparentUpgradeableProxy} from "../typechain-types";

async function main() {
// 获取当前网络的提供者
    const { deployer } = await getNamedAccounts();
    const [signer] = await ethers.getSigners();

    console.log("signer ", signer.address)
    console.log("deployer ", deployer)
//     const gasPrice = await ethers.provider.getGasPrice()
//     const usda = await ethers.getContractAt("USDAToken", ContractAddress.USDAToken.address) as USDAToken;

//     const param = await ethers.getContractAt("AGLParameters", ContractAddress.agilelyParameters.address) as AGLParameters
//   /*  const proxy = await ethers.getContractAt("TransparentUpgradeableProxy","0x80B9d8c047B9E6BC1B03e232606cc552De2b2D6C") as TransparentUpgradeableProxy;
//     const tx = await proxy.changeAdmin("0x80B9d8c047B9E6BC1B03e232606cc552De2b2D6C","0xeb9d6c46E28B489f5ceE724C7815118A5821A328", {
//         gasPrice: gasPrice.mul(12).div(10),
//         gasLimit:2000000
//     });
//     await tx.wait();*/

//     // const transaction = {
//     //     from: signer.address,
//     //     to: "0x80B9d8c047B9E6BC1B03e232606cc552De2b2D6C",
//     //     data:"0x2f54bf6e000000000000000000000000eb9d6c46e28b489f5cee724c7815118a5821a328"
//     // }
//     // const tx =  await  signer.sendTransaction(transaction);
//     // console.log(tx.hash)
    const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
    const proxyAdmin = await ProxyAdmin.deploy();
    await proxyAdmin.deployed();
    const proxyAdminInstance = await (await upgrades.admin.getInstance(signer)).owner();
    const owner = await (await upgrades.admin.getInstance()).owner();

    console.log("current owner ", owner)

    console.log("current proxyAdminInstance ", proxyAdminInstance)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


