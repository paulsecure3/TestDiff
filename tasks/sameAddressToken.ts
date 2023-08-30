import { createAlchemyWeb3 } from "@alch/alchemy-web3"
import { RPC } from "../secrets";

async function deploySameAddressToken(
    address: any,
): Promise<void> {
    const web3ArbGoerli = createAlchemyWeb3(RPC.arbitrumGoerli);
    const web3Mumbai = createAlchemyWeb3(RPC.mumbai);
    const web3Goerli = createAlchemyWeb3(RPC.goerli);


    const networkIDArr = ["Arbitrum Goerli:", "Polygon  Mumbai:", "Goerli:"]
    const providerArr = [web3ArbGoerli, web3Mumbai, web3Goerli];
    const resultArr: any[] = [];

    for (let i = 0; i < providerArr.length; i++) {
        const nonce = await providerArr[i].eth.getTransactionCount(address.address, "latest");
        const balance = await providerArr[i].eth.getBalance(address.address)
        resultArr.push([networkIDArr[i], nonce, parseFloat(providerArr[i].utils.fromWei(balance, "ether")).toFixed(2) + "ETH"]);
    }
    resultArr.unshift(["  |NETWORK|   |NONCE|   |BALANCE|  "])
    console.log(resultArr);
}


export {
    deploySameAddressToken
}