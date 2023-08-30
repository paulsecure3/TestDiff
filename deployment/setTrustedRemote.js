const { ethers } = require("hardhat")
const CHAIN_ID = require("../constants/chainIds.json")

async function main() {
    console.log("Deploying others network on testnet");
    console.log(new Date().toUTCString())
    const deployerWallet = (await ethers.getSigners())[0];


    const fujiFactory = await ethers.getContractFactory("USDATokenTest", deployerWallet)

    console.log(`Using previously deployed fuji contract at address 0xf0B87F6b8Fb40AbF50a66198Ab0cc5cb7c331d90`)
    const fujiContractInstance = await fujiFactory.attach("0xf0B87F6b8Fb40AbF50a66198Ab0cc5cb7c331d90")

    const fujiAddress = "0xf0B87F6b8Fb40AbF50a66198Ab0cc5cb7c331d90"
    const goerliAddress = "0xD817d1D8A11C8405e381bfac5628aEa995afCA90"

    // get remote chain id
    const remoteChainId = CHAIN_ID["arbitrum-goerli"]


    // concat remote and local address
    let fujiSetParams = ethers.utils.solidityPack(
        ['address', 'address'],
        [goerliAddress, fujiAddress]
    )

    // check if pathway is already set
    const isFujiToGoerliTrustedRemoteSet = await fujiContractInstance.isTrustedRemote(remoteChainId, fujiSetParams);

    console.log("isFujiToGoerliTrustedRemoteSet ", isFujiToGoerliTrustedRemoteSet)

    if (!isFujiToGoerliTrustedRemoteSet) {
        try {
            let tx = await (await fujiContractInstance.setTrustedRemote(remoteChainId, fujiSetParams)).wait()
            console.log(`✅ [fuiji] setTrustedRemote(${remoteChainId}, ${fujiSetParams})`)
            console.log(` tx: ${tx.transactionHash}`)
        } catch (e) {
            if (e.error.message.includes("The chainId + address is already trusted")) {
                console.log("*source already set*")
            } else {
                console.log(`❌ [fuiji] setTrustedRemote(${remoteChainId}, ${fujiSetParams})`)
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

