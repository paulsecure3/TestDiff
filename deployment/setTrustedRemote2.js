const { ethers } = require("hardhat")
const CHAIN_ID = require("../constants/chainIds.json")



async function main() {
    console.log("Deploying others network on testnet");
    console.log(new Date().toUTCString())
    const deployerWallet = (await ethers.getSigners())[0];

    const goerliFactory = await ethers.getContractFactory("USDATokenTest", deployerWallet)

    console.log(`Using previously deployed arbtrum goerli contract at address 0xD817d1D8A11C8405e381bfac5628aEa995afCA90`)
    const goerliContractInstance = await goerliFactory.attach("0xD817d1D8A11C8405e381bfac5628aEa995afCA90")

    const fujiAddress = "0xf0B87F6b8Fb40AbF50a66198Ab0cc5cb7c331d90"
    const goerliAddress = "0xD817d1D8A11C8405e381bfac5628aEa995afCA90"


    // get remote chain id
    const remoteChainId = CHAIN_ID.fuji

    // concat remote and local address
    let goerliSetParams = ethers.utils.solidityPack(
        ['address', 'address'],
        [fujiAddress, goerliAddress]
    );

    const isGoerliToFujiTrustedRemoteSet = await goerliContractInstance.isTrustedRemote(remoteChainId, goerliSetParams);



    console.log("isGoerliToFujiTrustedRemoteSet ", isGoerliToFujiTrustedRemoteSet)

    if (!isGoerliToFujiTrustedRemoteSet) {
        try {
            let tx = await (await goerliContractInstance.setTrustedRemote(remoteChainId, goerliSetParams)).wait()
            console.log(`✅ [goerli] setTrustedRemote(${remoteChainId}, ${goerliSetParams})`)
            console.log(` tx: ${tx.transactionHash}`)
        } catch (e) {
            if (e.error.message.includes("The chainId + address is already trusted")) {
                console.log("*source already set*")
            } else {
                console.log(`❌ [goerli] setTrustedRemote(${remoteChainId}, ${goerliSetParams})`)
            }
        }
    } else {
        console.log("*source already set*")
    }


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

