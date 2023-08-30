import {CommunityIssuance} from "../typechain-types";

const fs = require('fs')
const { ethers, upgrades, network } = require("hardhat");
const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
const configParams = require("../deployment/arbitrum.deployment.js")
const { constants } = require("ethers")


class MainnetDeploymentHelper {
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


  async deployMockERC20Contract(deploymentState, name, decimals = 18) {
    const ERC20MockFactory = await this.getFactory("ERC20Mock")
    const erc20Mock = await this.loadOrDeploy(ERC20MockFactory, name, deploymentState, false, [name, name, decimals])

    await erc20Mock.mint(this.deployerWallet.address, "1000".concat("0".repeat(decimals)));

    return erc20Mock.address
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


  async deployLiquityCoreMainnet(deploymentState, multisig, config) {
    // Get contract factories
    const priceFeedFactory = await this.getFactory("PriceFeed")

    const sortedTrovesFactory = await this.getFactory("SortedTroves")
    const troveManagerFactory = await this.getFactory("TroveManager")
    const activePoolFactory = await this.getFactory("ActivePool")
    const stabilityPoolFactory = await this.getFactory("StabilityPool")
    const StabilityPoolManagerFactory = await this.getFactory("StabilityPoolManager")
    const gasPoolFactory = await this.getFactory("GasPool")
    const defaultPoolFactory = await this.getFactory("DefaultPool")
    const collSurplusPoolFactory = await this.getFactory("CollSurplusPool")
    const borrowerOperationsFactory = await this.getFactory("BorrowerOperations")
    const hintHelpersFactory = await this.getFactory("HintHelpers")
    const vaultParametersFactory = await this.getFactory("AGLParameters")
    const lockedAglFactory = await this.getFactory("LockedAGL")
    const adminContractFactory = await this.getFactory("AdminContract")
    const stabilityPoolAgilelyFactory = await this.getFactory("StabilityPoolAgilely")
    const USDATokenFactory = await this.getFactory("USDAToken")
    const glpStakingFactory = await this.getFactory("AgilelyGLPStaking")
    // Oracle 
    const priceOracleV1Factory = await this.getFactory("PriceOracleV1")
    const glpOracleFactory = await this.getFactory("GLPOracle")
    const oracleVerificationV1Factory = await this.getFactory("OracleVerificationV1")
    const chainlinkWrapperFactory = await this.getFactory("ChainlinkWrapper")
    const customOracleFactory = await this.getFactory("CustomOracleWrapper")

    //// USE PROXY
    const sortedTroves = await this.loadOrDeploy(sortedTrovesFactory, 'sortedTroves', deploymentState, true)
    const troveManager = await this.loadOrDeploy(troveManagerFactory, 'troveManager', deploymentState, true)
    const activePool = await this.loadOrDeploy(activePoolFactory, 'activePool', deploymentState, true)
    const stabilityPoolManager = await this.loadOrDeploy(StabilityPoolManagerFactory, 'stabilityPoolManager', deploymentState, true)
    const defaultPool = await this.loadOrDeploy(defaultPoolFactory, 'defaultPool', deploymentState, true)
    const collSurplusPool = await this.loadOrDeploy(collSurplusPoolFactory, 'collSurplusPool', deploymentState, true)
    const borrowerOperations = await this.loadOrDeploy(borrowerOperationsFactory, 'borrowerOperations', deploymentState, true)
    const hintHelpers = await this.loadOrDeploy(hintHelpersFactory, 'hintHelpers', deploymentState, true)
    const agilelyParameters = await this.loadOrDeploy(vaultParametersFactory, 'agilelyParameters', deploymentState, true)
    const glpStaking = await this.loadOrDeploy(glpStakingFactory, 'glpStaking', deploymentState, true);


    //// NO PROXY
    const agilelyStabilityPool = await this.loadOrDeploy(stabilityPoolAgilelyFactory, 'agilelyStabilityPool', deploymentState)
    const gasPool = await this.loadOrDeploy(gasPoolFactory, 'gasPool', deploymentState)
    const lockedAgl = await this.loadOrDeploy(lockedAglFactory, 'lockedAgl', deploymentState)
    const adminContract = await this.loadOrDeploy(adminContractFactory, 'adminContract', deploymentState)

    const usdaToken = await this.loadOrDeploy(
      USDATokenFactory,
      "USDAToken",
      deploymentState,
    )

    const oracleVerificationV1 = await this.loadOrDeploy(
      oracleVerificationV1Factory,
      'oracleVerificationV1',
      deploymentState,
      true,
      undefined,
      {
        unsafeAllow: ['delegatecall']
      }
    );

    const priceFeed = await this.loadOrDeploy(
      priceFeedFactory,
      'priceFeed',
      deploymentState,
      true,
      [oracleVerificationV1.address],
      {
        initializer: "setUp",
        unsafeAllow: ['delegatecall']
      }
    );

    const chainlinkOracle = await this.loadOrDeploy(
      chainlinkWrapperFactory,
      'chainlinkOracle',
      deploymentState,
      true,
      [oracleVerificationV1.address, oracleVerificationV1.address],
      {
        initializer: "setUp",
        unsafeAllow: ['delegatecall']
      }
    );

    const customOracle = await this.loadOrDeploy(
      customOracleFactory,
      'customOracle',
      deploymentState,
      true,
      undefined,
      {
        initializer: "setUp",
        unsafeAllow: ['delegatecall']
      }
    );


    const usdaOracle = await this.loadOrDeploy(
      priceOracleV1Factory,
      'usdaOracle',
      deploymentState,
      true,
      ["USDA Oracle", 18],
      {
        initializer: "setUp",
        unsafeAllow: ['delegatecall']
      }
    );

    const glpOracle = await this.loadOrDeploy(
      glpOracleFactory,
      'glpOracle',
      deploymentState,
      true,
      [
        config.GLPOracleConfig.glpToken,
        config.GLPOracleConfig.glpManager,
        config.GLPOracleConfig.gmxVault
      ],
      {
        initializer: "setUp",
        unsafeAllow: ['delegatecall']
      }
    );

    const glpOracleV1 = await this.loadOrDeploy(
      priceOracleV1Factory,
      'glpOracleV1',
      deploymentState,
      true,
      ["glp Oracle", 18],
      {
        initializer: "setUp",
        unsafeAllow: ['delegatecall']
      }
    );

    const price = await glpOracle.getPrice();

    await this.sendAndWaitForTransaction(
      glpOracleV1.registerTrustedNode(multisig)
    )

    await this.sendAndWaitForTransaction(
      usdaOracle.registerTrustedNode(multisig)
    )

    await this.sendAndWaitForTransaction(
      usdaOracle.update(ethers.utils.parseEther('0.99999'))
    )
    await this.sendAndWaitForTransaction(
      usdaOracle.update(ethers.utils.parseEther('0.99999'))
    )

    await this.sendAndWaitForTransaction(
      glpOracleV1.update(price)
    )

    await this.sendAndWaitForTransaction(
       glpOracleV1.update(price)
    )


    const hasAccess = await priceFeed.accesses(adminContract.address);

    if (!hasAccess) {
      const priceFeedtx = await priceFeed.setAccessTo(adminContract.address, true);
      await priceFeedtx.wait();
      console.log(priceFeedtx.hash)
    }


    await this.sendAndWaitForTransaction(
      usdaOracle.transferOwnership(multisig)
    )


    await this.sendAndWaitForTransaction(
      customOracle.addOracle(
        usdaToken.address,
        usdaOracle.address,
        18,
        "0x9d1b464a",
        "0x053f14da",
        "0x",
        "0x313ce567",
        { gasLimit: 2000000 }
      )
    )


    await this.sendAndWaitForTransaction(
      customOracle?.addOracle(
        config.SGLP,
        glpOracleV1.address,
        18,
        "0x9d1b464a",
        "0x053f14da",
        "0x",
        "0x313ce567",
        { gasLimit: 2000000 }
      )
    )

    await this.sendAndWaitForTransaction(
      chainlinkOracle?.addOracle(
        constants.AddressZero,
        config.CHAINLINK_ETHUSD_PROXY,
        constants.AddressZero,
        {
          gasLimit: 2000000
        }
      )
    )

    await this.sendAndWaitForTransaction(priceFeed?.addOracle(
      usdaToken.address,
      customOracle?.address,
      constants.AddressZero,
      {
        gasLimit: 2000000
      }
    ))

    await this.sendAndWaitForTransaction(
      usdaToken.setupContract(
        troveManager.address,
        agilelyStabilityPool.address,
        borrowerOperations.address,
        true
      ),
      {
        gasLimit: 2000000
      }
    )


    // ---- end interest manager ---- 
    if (!this.configParams.ETHERSCAN_BASE_URL) {
      console.log('No Etherscan Url defined, skipping verification')
    } else {
      await this.verifyContract('priceFeed', deploymentState)
      await this.verifyContract('sortedTroves', deploymentState)
      await this.verifyContract('troveManager', deploymentState)
      await this.verifyContract('activePool', deploymentState)
      await this.verifyContract('agilelyStabilityPool', deploymentState)
      await this.verifyContract('stabilityPoolManager', deploymentState)
      await this.verifyContract('gasPool', deploymentState)
      await this.verifyContract('defaultPool', deploymentState)
      await this.verifyContract('collSurplusPool', deploymentState)
      await this.verifyContract('borrowerOperations', deploymentState)
      await this.verifyContract('hintHelpers', deploymentState)
      await this.verifyContract('USDAToken', deploymentState, USDATokenParams)
      await this.verifyContract('agilelyParameters', deploymentState)
      await this.verifyContract('lockedAgl', deploymentState)
      await this.verifyContract('adminContract', deploymentState)

      // Oracle 相关
      await this.verifyContract('usdaOracle', deploymentState)
      await this.verifyContract('customOracle', deploymentState)
      await this.verifyContract('chainlinkOracle', deploymentState)
      await this.verifyContract('glpOracle', deploymentState)
      await this.verifyContract('glpOracleV1', deploymentState)
      await this.verifyContract('oracleVerificationV1', deploymentState)

    }

    const coreContracts = {
      priceFeed,
      usdaToken,
      sortedTroves,
      troveManager,
      activePool,
      stabilityPoolManager,
      agilelyStabilityPool,
      adminContract,
      gasPool,
      defaultPool,
      collSurplusPool,
      borrowerOperations,
      hintHelpers,
      agilelyParameters,
      lockedAgl,
      glpStaking,
      usdaOracle,
      chainlinkOracle,
      customOracle,
      glpOracleV1,
      glpOracle,
      oracleVerificationV1,
    }
    return coreContracts
  }

  async deployAGLContractsMainnet(treasurySigAddress, deploymentState) {
    const AGLStakingFactory = await this.getFactory("AGLStaking")
    const communityIssuanceFactory = await this.getFactory("CommunityIssuance")
    const AGLTokenFactory = await this.getFactory("AGLToken")

    const AGLStaking = await this.loadOrDeploy(AGLStakingFactory, 'AGLStaking', deploymentState, true)
    const communityIssuance = await this.loadOrDeploy(communityIssuanceFactory, 'communityIssuance', deploymentState, true)

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
      await this.verifyContract('AGLStaking', deploymentState)
      await this.verifyContract('communityIssuance', deploymentState)
      await this.verifyContract('AGLToken', deploymentState, [treasurySigAddress])
    }

    const AGLContracts = {
      AGLStaking,
      communityIssuance,
      AGLToken
    }
    return AGLContracts
  }


  async deployRedemptorContractMainnet(agilelyCore,AGLContracts, deploymentState) {
    const troveRedemptorFactory = await this.getFactory("TroveRedemptor")
    const troveRedemptor = await this.loadOrDeploy(
        troveRedemptorFactory,
        'troveRedemptor',
        deploymentState,
        true,
        [
            agilelyCore.troveManager.address,
            agilelyCore.sortedTroves.address,
            agilelyCore.usdaToken.address,
            agilelyCore.agilelyParameters.address,
            agilelyCore.collSurplusPool.address,
            agilelyCore.gasPool.address,
            AGLContracts.AGLStaking.address,
            agilelyCore.hintHelpers.address
        ],
        {
          initializer: "setUp",
        }
    )


    await this.sendAndWaitForTransaction(
        troveRedemptor.setAGLParameters(
            agilelyCore.agilelyParameters.address,
            { gasLimit: 2000000 }
        )
    )
    await this.sendAndWaitForTransaction(
        agilelyCore.sortedTroves.setRedemptorAddress(
            troveRedemptor.address,
            { gasLimit: 2000000 }
        )
    )
    await this.sendAndWaitForTransaction(
        agilelyCore.usdaToken.setRedemptorAddress(
            troveRedemptor.address,
            { gasLimit: 2000000 }
        )
    )

    await this.sendAndWaitForTransaction(
        agilelyCore.troveManager.setRedemptorAddress(
            troveRedemptor.address,
            { gasLimit: 2000000 }
        )
    )
    await this.sendAndWaitForTransaction(
        agilelyCore.activePool.setRedemptorAddress(
            troveRedemptor.address,
            { gasLimit: 2000000 }
        )
    )
    await this.sendAndWaitForTransaction(
        agilelyCore.collSurplusPool.setRedemptorAddress(
            troveRedemptor.address,
            { gasLimit: 2000000 }
        )
    )
    await this.sendAndWaitForTransaction(
        AGLContracts.AGLStaking.setRedemptorAddress(
            troveRedemptor.address,
            { gasLimit: 2000000 }
        )
    )



  }

  async renounceOwnership(agilelyCore){
    await this.sendAndWaitForTransaction(
        agilelyCore.collSurplusPool.renounceOwnership(
            { gasLimit: 2000000 }
        )
    )
    await this.sendAndWaitForTransaction(
        agilelyCore.sortedTroves.renounceOwnership(
            { gasLimit: 2000000 }
        )
    )
  }

  async deployMultiTroveGetterMainnet(liquityCore, deploymentState) {
    const multiTroveGetterFactory = await this.getFactory("MultiTroveGetter")
    const multiTroveGetterParams = [
      liquityCore.troveManager.address,
      liquityCore.sortedTroves.address
    ]
    const multiTroveGetter = await this.loadOrDeploy(
      multiTroveGetterFactory,
      'multiTroveGetter',
      deploymentState,
      false,
      multiTroveGetterParams
    )

    if (!this.configParams.ETHERSCAN_BASE_URL) {
      console.log('No Etherscan Url defined, skipping verification')
    } else {
      await this.verifyContract('multiTroveGetter', deploymentState, multiTroveGetterParams)
    }

    return multiTroveGetter
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

  async setParamsToCoreMainnet(coreContracts, interestContracts, dexContracts, AGLContracts, deploymentState){
    await this.sendAndWaitForTransaction(
        coreContracts.troveManager.setInterestManager(
        interestContracts.agilelyInterestManager.address,
            { gasLimit: 2000000 }
    ));

    await this.sendAndWaitForTransaction(
        coreContracts.borrowerOperations.setAGLccess(
            interestContracts.agilelyInterestManager.address,
            true,
            { gasLimit: 2000000 }
        ));

    await this.sendAndWaitForTransaction(
        coreContracts.borrowerOperations.setDexTrader(
            dexContracts.dexTrader.address,
            { gasLimit: 2000000 }
        ));

    //stability pool
    //TODO
    //config eth stability pool

    await this.sendAndWaitForTransaction(
        AGLContracts.communityIssuance.configStabilityPoolAndSend(
            deploymentState['ProxyStabilityPoolETH'].address,
            AGLContracts.AGLToken.address,
            ethers.utils.parseEther("1"),
            ethers.utils.parseEther("10000"),
            { gasLimit: 2000000 }
        ));




    //setCollateralParameters

    //set SGLP

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

export default MainnetDeploymentHelper
