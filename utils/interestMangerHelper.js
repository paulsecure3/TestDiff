import { transferOwnership } from './transfer';

const fs = require('fs')
const { ethers, upgrades } = require("hardhat");
const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
const configParams = require("../deployment/arbitrum.deployment.js")
const { constants } = require("ethers")


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
        if (deploymentState[name] && deploymentState[name].address) {
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


    async deployPartially(treasurySigAddress, deploymentState) {
        const AGLTokenFactory = await this.getFactory("AGLToken")
        const lockedAglFactory = await this.getFactory("LockedAGL")

        const lockedAgl = await this.loadOrDeploy(lockedAglFactory, 'lockedAgl', deploymentState)

        // Deploy AGL Token, passing Community Issuance and Factory addresses to the constructor
        const AGLToken = await this.loadOrDeploy(
            AGLTokenFactory,
            'AGLToken',
            deploymentState,
            false,
            [treasurySigAddress]
        )

        
        if (!this.configParams.ETHERSCAN_BASE_URL) {
            console.log('No Etherscan Url defined, skipping verification')
        } else {
            await this.verifyContract('lockedAgl', deploymentState, [treasurySigAddress])
            await this.verifyContract('AGLToken', deploymentState, [treasurySigAddress])
        }

        await this.isOwnershipRenounced(lockedAgl) ||
            await this.sendAndWaitForTransaction(lockedAgl.setAddresses(
                AGLToken.address,
                { gasPrice: this.configParams.GAS_PRICE }
            ))

        const partialContracts = {
            lockedAgl,
            AGLToken
        }

        return partialContracts
    }


    async deployInterestCore(deploymentState, agilelyCore) {
        // // interest manager
        const emergencyReserveFactory = await this.getFactory("EmergencyReserve")
        const savingModuleStabilityPoolFactory = await this.getFactory("SavingModuleStabilityPool")
        const savingModuleFactory = await this.getFactory("SavingModule")
        const agilelyInterestManagerFactory = await this.getFactory("AgilelyInterestManager")
        const agilelyEIRFactory = await this.getFactory("AgilelyEIR")

        console.log("start deploying agilelyInterestManager")
        const emergencyReserve =
            await this.loadOrDeploy(
                emergencyReserveFactory,
                "emergencyReserve",
                deploymentState,
                true,
                [agilelyCore.usdaToken.address],
                {
                    initializer: "setUp",
                    unsafeAllow: ['delegatecall']
                }
            );

        await transferOwnership(emergencyReserve, agilelyCore.adminContract.address);

        const savingModuleStabilityPool = await this.loadOrDeploy(
            savingModuleStabilityPoolFactory,
            'savingModuleStabilityPool',
            deploymentState,
            true,
            undefined,
            {
                unsafeAllow: ['delegatecall']
            }
        );

        const savingModule = await this.loadOrDeploy(
            savingModuleFactory,
            'savingModule',
            deploymentState,
            true,
            undefined,
            {
                unsafeAllow: ['delegatecall']
            }
        );

        const agilelyInterestManager = await this.loadOrDeploy(
            agilelyInterestManagerFactory,
            'agilelyInterestManager',
            deploymentState,
            true,
            [
                agilelyCore.usdaToken.address,
                agilelyCore.troveManager.address,
                agilelyCore.priceFeed.address,
                agilelyCore.borrowerOperations.address,
                savingModule.address
            ],
            {
                initializer: "setUp",
                unsafeAllow: ['delegatecall'],
                signer: this.deployerWallet
            }
        );
        await savingModule.setUp(
            agilelyCore.usdaToken.address,
            agilelyInterestManager.address,
            savingModuleStabilityPool.address,
            7000,
            700
        );

        await savingModule.setEmergencyReserve(emergencyReserve.address);

        await savingModuleStabilityPool.setUp(
            agilelyCore.borrowerOperations.address,
            agilelyCore.troveManager.address,
            agilelyCore.usdaToken.address,
            agilelyCore.sortedTroves.address, //sortedTrove
            savingModule.address,
            agilelyCore.agilelyParameters.address //vestaParam
        );

        await transferOwnership(savingModule, agilelyCore.adminContract.address);
        await transferOwnership(savingModuleStabilityPool, agilelyCore.adminContract.address);

        const modules = [
            //ETH
            {
                linkedToken: "0x0000000000000000000000000000000000000000",
                name: "Module ETH",
                risk: 0,
            },
            //GLP
            {
                linkedToken: "0x12EA0F9FDC9eb371307f1a87E2CdEB26d1128DF8",
                name: "Module GLP",
                risk: 2,
            },
        ];

        let deployedContracts = {}

        for (const module of modules) {
            const contract = await this.loadOrDeploy(
                agilelyEIRFactory,
                module.name,
                deploymentState,
                true,
                [
                    agilelyInterestManager.address,
                    module.name,
                    module.risk
                ],
                {
                    initializer: "setUp",
                    unsafeAllow: ['delegatecall']
                }
            );

            deployedContracts[module.name] = contract;
            if (
                (await agilelyInterestManager.getInterestModule(
                    module.linkedToken
                )) == constants.AddressZero
            ) {
                await this.sendAndWaitForTransaction(
                    agilelyInterestManager.setModuleFor(
                        module.linkedToken,
                        contract.address
                    )
                );
            }
            await this.verifyContract(module.name, deploymentState)
            await transferOwnership(contract, agilelyCore.adminContract.address);
        }

        await transferOwnership(
            agilelyInterestManager,
            agilelyCore.adminContract.address
        );


        // ---- end interest manager ---- 
        if (!this.configParams.ETHERSCAN_BASE_URL) {
            console.log('No Etherscan Url defined, skipping verification')
        } else {
            await this.verifyContract('emergencyReserve', deploymentState)
            await this.verifyContract('savingModuleStabilityPool', deploymentState)
            await this.verifyContract('savingModule', deploymentState)
            await this.verifyContract('agilelyInterestManager', deploymentState)
        }
        deployedContracts = {
            ...deployedContracts,
            emergencyReserve,
            savingModuleStabilityPool,
            savingModule,
            agilelyInterestManager,
        }
       return deployedContracts
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

export const Colors = {
    gray: 90,
    green: 92,
    red: 91,
    yellow: 93,
    blue: 36,
    white: 0,
}

export function colorLog(colorCode, msg) {
    console.log("\u001b[" + colorCode + "m" + msg + "\u001b[0m")
}

export default InterestManagerDeploymentHelper
