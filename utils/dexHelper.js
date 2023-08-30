import { transferOwnership } from './transfer';

const fs = require('fs')
const { ethers, upgrades } = require("hardhat");
const configParams = require("../deployment/arbitrum.deployment.js")
const { colorLog, Colors } = require("../utils/colorConsole");


class InterestManagerDeploymentHelper {
    constructor(configParams, deployerWallet) {
        this.configParams = configParams
        this.deployerWallet = deployerWallet
        this.hre = require("hardhat")
    }

    loadPreviousDeployment() {
        let previousDeployment = {}
        if (fs.existsSync(this.configParams.OUTPUT_FILE)) {
            console.log(`Loading previous deployment...`)
            previousDeployment = require('../' + this.configParams.OUTPUT_FILE)
        }

        return previousDeployment
    }

    saveDeployment(deploymentState) {
        const deploymentStateJSON = JSON.stringify(deploymentState, null, 2)
        fs.writeFileSync(this.configParams.OUTPUT_FILE, deploymentStateJSON)
    }
    // --- Deployer methods ---

    async getFactory(name) {
        const factory = await ethers.getContractFactory(name, this.deployerWallet)
        return factory
    }


    async loadOrDeploy(factory, name, deploymentState, proxy, params = [], opts) {
        if (deploymentState && deploymentState[name] && deploymentState[name].address) {
            console.log(`Using previously deployed ${name} contract at address ${deploymentState[name].address}`)
            return await factory.attach(deploymentState[name].address);
        }

        const contract = proxy
            ? await upgrades.deployProxy(factory, params, opts)
            : await factory.deploy(...params);

        await this.deployerWallet.provider.waitForTransaction(contract.deployTransaction.hash, this.configParams.TX_CONFIRMATIONS)

        deploymentState[name] = {
            address: contract.address,
            txHash: contract.deployTransaction.hash
        }

        this.saveDeployment(deploymentState)

        return contract
    }


    async deployDexCore(deploymentState, config) {
        // dex core
        const {
            UNISWAP_V3_ROUTER,
            UNISWAP_V3_FACTORY,
            UNISWAP_V3_QUOTER,
            DEX_SELECTOR
        } = config;

        const v3TraderContractFactory = await this.getFactory("UniswapV3Trader");

        const uniswapV3Trader = await this.loadOrDeploy(
            v3TraderContractFactory,
            'uniswapV3Trader',
            deploymentState,
            true,
            [
                UNISWAP_V3_ROUTER,
                UNISWAP_V3_QUOTER,
                UNISWAP_V3_FACTORY,
            ],
            {
                initializer: "setUp",
            }
        )

        console.log("uniswap v3 trader address:", uniswapV3Trader.address);
        const dexTraderFactory = await this.getFactory("VestaDexTrader");
        const dexTrader = await this.loadOrDeploy(
            dexTraderFactory,
            'dexTrader',
            deploymentState,
            true,
            [
            ],
            {
                initializer: "setUp",
            }
        )

        console.log("dex trader address:", dexTrader.address);
        const registerTrader = await dexTrader.registerTrader(DEX_SELECTOR, uniswapV3Trader.address);
        registerTrader.wait()
        colorLog(Colors.blue, `register trader hash: ${registerTrader.hash}`)

        // ---- end interest manager ---- 
        if (!this.configParams.ETHERSCAN_BASE_URL) {
            console.log('No Etherscan Url defined, skipping verification')
        } else {
            await this.verifyContract('dexTrader', deploymentState)
            await this.verifyContract('uniswapV3Trader', deploymentState)
        }

        const coreContracts = {
            dexTrader,
            uniswapV3Trader,
        }
        return coreContracts
    }

    // --- Connector methods ---

    async isOwnershipRenounced(contract) {
        const isInitialized = await contract.isInitialized();
        console.log("%s Is Initalized : %s", await contract.NAME(), isInitialized);
        return isInitialized;
    }

    // Connect contracts to their dependencies
    async connectCoreContractsMainnet(contracts, AGLContracts, chainlinkFlagAddress) {
        const gasPrice = this.configParams.GAS_PRICE


        await this.isOwnershipRenounced(contracts.sortedTroves) ||
            await this.sendAndWaitForTransaction(contracts.sortedTroves.setParams(
                contracts.troveManager.address,
                contracts.borrowerOperations.address,
                { gasPrice }
            ))

        await this.isOwnershipRenounced(contracts.lockedAgl) ||
            await this.sendAndWaitForTransaction(contracts.lockedAgl.setAddresses(
                AGLContracts.AGLToken.address,
                { gasPrice }
            ))

        await this.isOwnershipRenounced(contracts.agilelyParameters) ||
            await this.sendAndWaitForTransaction(contracts.agilelyParameters.setAddresses(
                contracts.activePool.address,
                contracts.defaultPool.address,
                contracts.priceFeed.address,
                contracts.adminContract.address,
                { gasPrice }
            ))


        await this.isOwnershipRenounced(contracts.troveManager) ||
            await this.sendAndWaitForTransaction(contracts.troveManager.setAddresses(
                contracts.borrowerOperations.address,
                contracts.stabilityPoolManager.address,
                contracts.gasPool.address,
                contracts.collSurplusPool.address,
                contracts.usdaToken.address,
                contracts.sortedTroves.address,
                AGLContracts.AGLStaking.address,
                contracts.agilelyParameters.address,
                { gasPrice }
            ))

        await this.isOwnershipRenounced(contracts.borrowerOperations) ||
            await this.sendAndWaitForTransaction(contracts.borrowerOperations.setAddresses(
                contracts.troveManager.address,
                contracts.stabilityPoolManager.address,
                contracts.gasPool.address,
                contracts.collSurplusPool.address,
                contracts.sortedTroves.address,
                contracts.usdaToken.address,
                AGLContracts.AGLStaking.address,
                contracts.agilelyParameters.address,
                { gasPrice }
            ))

        await this.isOwnershipRenounced(contracts.stabilityPoolManager) ||
            await this.sendAndWaitForTransaction(contracts.stabilityPoolManager.setAddresses(
                contracts.adminContract.address,
                { gasPrice }
            ))

        await this.isOwnershipRenounced(contracts.activePool) ||
            await this.sendAndWaitForTransaction(contracts.activePool.setAddresses(
                contracts.borrowerOperations.address,
                contracts.troveManager.address,
                contracts.stabilityPoolManager.address,
                contracts.defaultPool.address,
                contracts.collSurplusPool.address,
                { gasPrice }
            ))

        await this.isOwnershipRenounced(contracts.defaultPool) ||
            await this.sendAndWaitForTransaction(contracts.defaultPool.setAddresses(
                contracts.troveManager.address,
                contracts.activePool.address,
                { gasPrice }
            ))

        await this.isOwnershipRenounced(contracts.collSurplusPool) ||
            await this.sendAndWaitForTransaction(contracts.collSurplusPool.setAddresses(
                contracts.borrowerOperations.address,
                contracts.troveManager.address,
                contracts.activePool.address,
                { gasPrice }
            ))

        await this.isOwnershipRenounced(contracts.adminContract) ||
            await this.sendAndWaitForTransaction(contracts.adminContract.setAddresses(
                contracts.agilelyParameters.address,
                contracts.stabilityPoolManager.address,
                contracts.borrowerOperations.address,
                contracts.troveManager.address,
                contracts.usdaToken.address,
                contracts.sortedTroves.address,
                AGLContracts.communityIssuance.address,
                { gasPrice }
            ))

        // set contracts in HintHelpers
        await this.isOwnershipRenounced(contracts.hintHelpers) ||
            await this.sendAndWaitForTransaction(contracts.hintHelpers.setAddresses(
                contracts.sortedTroves.address,
                contracts.troveManager.address,
                contracts.agilelyParameters.address,
                { gasPrice }
            ))

        await this.isOwnershipRenounced(contracts.glpStaking) ||
            await this.sendAndWaitForTransaction(contracts.glpStaking.setUp(
                configParams.agilelyAddresses.AGL_SAFE,
                configParams.externalAddrs.SGLP,
                configParams.externalAddrs.GMX_REWARD_ROUTERV2,
                configParams.externalAddrs.FEE_GLP_TRACKER_REWARD,
                { gasPrice }
            ))

    }

    async connectAGLContractsToCoreMainnet(AGLContracts, coreContracts, treasuryAddress) {
        const gasPrice = this.configParams.GAS_PRICE
        await this.isOwnershipRenounced(AGLContracts.AGLStaking) ||
            await this.sendAndWaitForTransaction(AGLContracts.AGLStaking.setAddresses(
                AGLContracts.AGLToken.address,
                // TODO - 这里需要考虑是否替换为 USDAScript 合约
                coreContracts.usdaToken.address,
                coreContracts.troveManager.address,
                coreContracts.borrowerOperations.address,
                coreContracts.activePool.address,
                treasuryAddress,
                { gasPrice }
            ))

        await this.isOwnershipRenounced(AGLContracts.communityIssuance) ||
            await this.sendAndWaitForTransaction(AGLContracts.communityIssuance.setAddresses(
                AGLContracts.AGLToken.address,
                coreContracts.stabilityPoolManager.address,
                coreContracts.adminContract.address,
                { gasPrice }
            ))
    }

    // --- Verify on Ethrescan ---
    async verifyContract(name, deploymentState, constructorArguments = []) {
        if (!deploymentState[name] || !deploymentState[name].address) {
            console.error(`  --> No deployment state for contract ${name}!!`)
            return
        }
        if (deploymentState[name].verification) {
            console.log(`Contract ${name} already verified`)
            return
        }

        try {
            await this.hre.run("verify:verify", {
                address: deploymentState[name].address,
                constructorArguments,
            })
        } catch (error) {
            // if it was already verified, it’s like a success, so let’s move forward and save it
            if (error.name != 'NomicLabsHardhatPluginError') {
                console.error(`Error verifying: ${error.name}`)
                console.error(error)
                return
            }
        }

        deploymentState[name].verification = `${this.configParams.ETHERSCAN_BASE_URL}/${deploymentState[name].address}#code`

        this.saveDeployment(deploymentState)
    }

    // --- Helpers ---

    async logContractObjects(contracts) {
        console.log(`Contract objects addresses:`)
        for (const contractName of Object.keys(contracts)) {
            console.log(`${contractName}: ${contracts[contractName].address}`);
        }
    }

    /**
   * @error throws an error if the mint isn't successful.
   * @param txPromise The transaction promise you want to execute
   * @returns TranscationReceipt of the minedTx
   */
    async sendAndWaitForTransaction(
        txPromise
    ) {
        const tx = await txPromise
        const minedTx = await ethers.provider.waitForTransaction(
            tx.hash,
            this.configParams.TX_CONFIRMATIONS
        )


        if (!minedTx.status) {
            throw `Transaction failed ${tx.hash}`
        } else {
            colorLog(
                Colors.blue,
                `${minedTx.transactionHash} executed successfully`
            )
        }
        return minedTx
    }
}

export default InterestManagerDeploymentHelper
