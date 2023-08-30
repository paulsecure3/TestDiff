import assert from "assert";
import { ethers } from "hardhat"
import { TestHelper } from "../utils/testHelpers"
import { addCollaterals } from "../utils/addCollateral";
import { ZERO_ADDRESS } from "../config";
import { transferOwnership } from "../utils/transfer";
import MainnetDeploymentHelper from "../utils/mainnetDeploymentHelpers"
import InterestManagerDeploymentHelper from "../utils/interestMangerHelper"
import DexHelper from "../utils/dexHelper"
import { configuration } from "../config";
import { AgilelyCoreInfo, AgilelyContractInfo } from "./core.typing";
import { Colors, colorLog } from "../utils/colorConsole";
const { constants } = ethers;

const { dec } = TestHelper;

export async function deployAgilelyCore(config: any, hre?: any) {
    let agilelyCore: AgilelyCoreInfo;
    let AGLContracts: AgilelyContractInfo;
    let deploymentState: any = {};

    // const { GAS_PRICE: gasPrice } = config;

    const ADMIN_WALLET = config.ADMIN_MULTI
    const TREASURY_WALLET = config.AGL_SAFE
    const deployerWallet = (await ethers.getSigners())[0]

    console.log(new Date().toUTCString())

    let mdh: MainnetDeploymentHelper = new MainnetDeploymentHelper(config, deployerWallet)

    deploymentState = mdh.loadPreviousDeployment()
    console.log(deploymentState)
    console.log(`deployer address: ${deployerWallet.address}`)
    assert.equal(deployerWallet.address, config.DEPLOYER)

    console.log(
        `deployerETHBalance before: ${await ethers.provider.getBalance(deployerWallet.address)}`
    )

    if (config.AGL_TOKEN_ONLY) {
        console.log("INIT AGL ONLY")
        const partialContracts = await mdh.deployPartially(TREASURY_WALLET, deploymentState) as any

        // create vesting rule to beneficiaries
        console.log("Beneficiaries")

        if (
            (await partialContracts.AGLToken.allowance(
                deployerWallet.address,
                partialContracts.lockedVsta.address
            )) == 0
        )
            await partialContracts.AGLToken.approve(
                partialContracts.lockedVsta.address,
                ethers.constants.MaxUint256
            )

        for (const [wallet, amount] of Object.entries(config.beneficiaries)) {
            if (amount == 0) continue

            if (!(await partialContracts.lockedVsta.isEntityExits(wallet))) {
                console.log("Beneficiary: %s for %s", wallet, amount)

                const txReceipt = await mdh.sendAndWaitForTransaction(
                    partialContracts.lockedVsta.addEntityVesting(wallet, dec(amount, 18))
                )

                deploymentState[wallet] = {
                    amount: amount,
                    txHash: txReceipt.transactionHash,
                }

                mdh.saveDeployment(deploymentState)

                await new Promise(resolve => setTimeout(resolve, 3000))
            }
        }

        await transferOwnership(partialContracts.lockedVsta, TREASURY_WALLET)

        const balance = await partialContracts.AGLToken.balanceOf(deployerWallet.address)
        console.log(`Sending ${balance} AGL to ${TREASURY_WALLET}`)
        await partialContracts.AGLToken.transfer(TREASURY_WALLET, balance)

        console.log(
            `deployerETHBalance after: ${await ethers.provider.getBalance(deployerWallet.address)}`
        )

        return
    }


    // Deploy core logic contracts
    agilelyCore = await mdh.deployLiquityCoreMainnet(deploymentState, ADMIN_WALLET, config)

    await mdh.logContractObjects(agilelyCore)

    // Deploy AGL Contracts
    AGLContracts = await mdh.deployAGLContractsMainnet(
        TREASURY_WALLET, // multisig AGL endowment address
        deploymentState
    )

    //Deploy Redemptor

    // Connect all core contracts up
    console.log("Connect Core Contracts up")

    await mdh.connectCoreContractsMainnet(
        agilelyCore,
        AGLContracts,
        config.CHAINLINK_FLAG_HEALTH
    )

    console.log("Connect AGL Contract to Core")
    await mdh.connectAGLContractsToCoreMainnet(AGLContracts, agilelyCore, TREASURY_WALLET)

    console.log("Deploy Redemptor Contract to Core")

    await mdh.deployRedemptorContractMainnet(agilelyCore, AGLContracts, deploymentState)


    console.log("Adding Collaterals")

    const allowance = await AGLContracts.AGLToken.allowance(
        deployerWallet.address,
        AGLContracts.communityIssuance.address
    )

    if (allowance == 0)
        await AGLContracts.AGLToken.approve(
            AGLContracts.communityIssuance.address,
            ethers.constants.MaxUint256
        )


    const collateralParameters = {
        adminContract: agilelyCore.adminContract,
        agilelyStabilityPool: agilelyCore.agilelyStabilityPool,
        stabilityPoolManager: agilelyCore.stabilityPoolManager,
    }

    const commonNetworkConfig = {
        // gasPrice,
        gasLimit: 20000000
    }

    const proxyStabilityPoolETH = deploymentState?.["ProxyStabilityPoolETH"]
    const proxyStabilityPoolSGLP = deploymentState?.["ProxyStabilityPoolSGLP"]

    // 新增 ETH 抵押到稳定池
    deploymentState["ProxyStabilityPoolETH"] = !proxyStabilityPoolETH && await addCollaterals(collateralParameters, {
        _asset: ZERO_ADDRESS,
        _chainlinkIndex: ZERO_ADDRESS,
        _stabilityPoolImplementation: agilelyCore.agilelyStabilityPool.address,
        _chainlinkOracle: agilelyCore.chainlinkOracle.address,
        redemptionLockInDay: config.REDEMPTION_SAFETY,
    }, commonNetworkConfig, "ProxyStabilityPoolETH");


    // 新增 GLP 抵押到稳定池
    deploymentState["ProxyStabilityPoolSGLP"] = !proxyStabilityPoolSGLP && await addCollaterals(collateralParameters, {
        _asset: config.SGLP,
        _chainlinkIndex: ZERO_ADDRESS,
        _stabilityPoolImplementation: agilelyCore.agilelyStabilityPool.address,
        _chainlinkOracle: agilelyCore.customOracle.address,
        redemptionLockInDay: config.REDEMPTION_SAFETY,
    }, commonNetworkConfig, "ProxyStabilityPoolSGLP");

    const interestMdh = new InterestManagerDeploymentHelper(config, deployerWallet)


    colorLog(Colors.green, "deploying interest manager core...");
    // Deploy interest logic contracts
    const interestContracts = await interestMdh.deployInterestCore(deploymentState, agilelyCore)
    colorLog(Colors.green, "deploy interest manager finished");

    const dexMdh = new DexHelper(config, deployerWallet)
    colorLog(Colors.green, "deploying dex core...");
    const dexContracts = await dexMdh.deployDexCore(deploymentState, {
        UNISWAP_V3_ROUTER: config.UNISWAP_V3_ROUTER,
        UNISWAP_V3_FACTORY: config.UNISWAP_V3_FACTORY,
        UNISWAP_V3_QUOTER: config.UNISWAP_V3_QUOTER,
        DEX_SELECTOR: config.DEX_SELECTOR,
    })
    colorLog(Colors.green, "deploying finished");

    console.log("set params")

    await mdh.setParamsToCoreMainnet(agilelyCore, interestContracts, dexContracts, AGLContracts, deploymentState)

    //await mdh.renounceOwnership(agilelyCore)

    console.log("All agilely contract has been setup")



}



async function main() {
    // const network = process.argv.at(-1);
    // if (network) {
    //     console.log("deploying on network ", network)
    //     const currentNetworkConfig = configuration["arbitrumGoerli"]
    //     await deployAgilelyCore(currentNetworkConfig)
    // }
    console.log("deploying on network arbitrumGoerli")
    const currentNetworkConfig = configuration["arbitrumGoerli"]
    await deployAgilelyCore(currentNetworkConfig)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
