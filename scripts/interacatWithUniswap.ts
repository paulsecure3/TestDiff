import {ethers, upgrades} from 'hardhat';
import {
    AlphaRouter,
    ChainId,
    SwapOptionsSwapRouter02,
    SwapRoute,
    SwapType,
    WETH9
} from '@uniswap/smart-order-router'
import { TradeType, CurrencyAmount, Percent, Token , NativeCurrency} from '@uniswap/sdk-core'
import {fromReadableAmount} from "./conversion";

async function main() {
// 获取当前网络的提供者

    const provider = new ethers.providers.JsonRpcProvider('https://arb-goerli.g.alchemy.com/v2/B3AjvdCFVaKh845e62PFl5uwLJsaU04k');

    const gasPrice = await ethers.provider.getGasPrice()
// 获取部署者的钱包
    const [deployer] = await ethers.getSigners();
    const chainId = ChainId.ARBITRUM_GOERLI
    const router = new AlphaRouter({
        chainId,
        provider,
    })
    const tokenInAddress = "0x0000000000000000000000000000000000000000"
    const v3RouterAddress = "0x2C6818F129549C54c3EedbA257068A9810C66f19"
    //const tokenIn = new Token(chainId, tokenInAddress, 18)
    const tokenIn = WETH9[chainId];
    const tokenOut = new Token(chainId,"0xc46fDae6C2ef338B077B8e11778b096A3873FeF5", 18);

    const options: SwapOptionsSwapRouter02 = {
        recipient: deployer.address,
        slippageTolerance: new Percent(50, 10_000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
        type: SwapType.SWAP_ROUTER_02,
    }
    const pair = [tokenIn.address,tokenOut.address];
    console.log(pair)
    const route =  await router.route(
        CurrencyAmount.fromRawAmount(
            tokenIn,
            fromReadableAmount(
                0.01,
                18
            ).toString()
        ),
        tokenOut,
        TradeType.EXACT_INPUT,
        options
    )
    console.log(route)
    const res = await deployer.sendTransaction({
        data: route!.methodParameters!.calldata,
        to: v3RouterAddress,
        value: ethers.utils.parseEther('0.01'),
        from: deployer.address,
    })
    console.log(res.hash)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });