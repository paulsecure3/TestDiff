const { ChainlinkAggregatorV3Interface } = require("../utils/ABIs/ChainlinkAggregatorV3Interface.js")
const { TestHelper: th, TimeValues: timeVals } = require("../utils/testHelpers.js")
const { dec } = th
const assert = require("node:assert");
const MainnetDeploymentHelper = require("../utils/mainnetDeploymentHelpers.js")
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants")

const { ethers } = require("hardhat")
const toBN = ethers.BigNumber.from

let mdh
let config
let deployerWallet
let gasPrice
let agilelyCore
let AGLContracts
let deploymentState

let ADMIN_WALLET
let TREASURY_WALLET

async function mainnetDeploy(configParams) {
	console.log(new Date().toUTCString())

	config = configParams
	gasPrice = config.GAS_PRICE

	ADMIN_WALLET = config.agilelyAddresses.ADMIN_MULTI
	TREASURY_WALLET = config.agilelyAddresses.AGL_SAFE

	deployerWallet = (await ethers.getSigners())[0]

	mdh = new MainnetDeploymentHelper(config, deployerWallet)

	deploymentState = mdh.loadPreviousDeployment()
	console.log(deploymentState)
	console.log(`deployer address: ${deployerWallet.address}`)
	assert.equal(deployerWallet.address, config.agilelyAddresses.DEPLOYER)

	console.log(
		`deployerETHBalance before: ${await ethers.provider.getBalance(deployerWallet.address)}`
	)

	if (config.AGL_TOKEN_ONLY) {
		console.log("INIT AGL ONLY")
		const partialContracts = await mdh.deployPartially(TREASURY_WALLET, deploymentState)

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
	agilelyCore = await mdh.deployLiquityCoreMainnet(deploymentState, ADMIN_WALLET)

	await mdh.logContractObjects(agilelyCore)

	// Deploy AGL Contracts
	AGLContracts = await mdh.deployAGLContractsMainnet(
		TREASURY_WALLET, // multisig AGL endowment address
		deploymentState
	)

	// Connect all core contracts up
	console.log("Connect Core Contracts up")

	await mdh.connectCoreContractsMainnet(
		agilelyCore,
		AGLContracts,
		config.externalAddrs.CHAINLINK_FLAG_HEALTH
	)

	console.log("Connect AGL Contract to Core")
	await mdh.connectAGLContractsToCoreMainnet(AGLContracts, agilelyCore, TREASURY_WALLET)

	console.log("Adding Collaterals")
	console.log("AGLContracts.communityIssuance.address ", 	AGLContracts.communityIssuance.address)

	const allowance = await AGLContracts.AGLToken.allowance(
		deployerWallet.address,
		AGLContracts.communityIssuance.address
	)

	if (allowance == 0)
		await AGLContracts.AGLToken.approve(
			AGLContracts.communityIssuance.address,
			ethers.constants.MaxUint256
		)


	// 添加 ETH BTC 抵押逻辑待定
	 await addETHCollaterals()
	await addGLPCollaterals(configParams)
	//await addBTCCollaterals()
	// await addGOHMCollaterals()

	mdh.saveDeployment(deploymentState)

	await mdh.deployMultiTroveGetterMainnet(agilelyCore, deploymentState)
	await mdh.logContractObjects(AGLContracts)

	// await giveContractsOwnerships();
}

async function addETHCollaterals() {
	if (
		(await agilelyCore.stabilityPoolManager.unsafeGetAssetStabilityPool(ZERO_ADDRESS)) ==
		ZERO_ADDRESS
	) {
		console.log("Creating Collateral - ETH")

		const decVal = dec(1, 18);
		const bnVal = toBN(dec(1, 18));

		console.log("deploying value ", {
			CHAINLINK_ETHUSD_PROXY: config.externalAddrs.CHAINLINK_ETHUSD_PROXY,
			agilelyStabilityPool: agilelyCore.agilelyStabilityPool.address,
			decVal,
			bnVal,
			ZERO_ADDRESS,
		})

		const tx  = await agilelyCore.adminContract.addNewCollateral(
				ZERO_ADDRESS,
				agilelyCore.agilelyStabilityPool.address,
				config.externalAddrs.CHAINLINK_ETHUSD_PROXY,
				ZERO_ADDRESS,
				decVal,
				bnVal,
				config.REDEMPTION_SAFETY,
			{
				gasPrice,
				gasLimit:20000000
			}
			);
		await tx.wait();




		deploymentState["ProxyStabilityPoolETH"] = {
			address: await agilelyCore.stabilityPoolManager.getAssetStabilityPool(ZERO_ADDRESS),
			txHash: tx.hash,
		}
	}
}


async function addGLPCollaterals() {
	const sglpAddress = config.externalAddrs.SGLP
	if (
		(await agilelyCore.stabilityPoolManager.unsafeGetAssetStabilityPool(sglpAddress)) ==
		ZERO_ADDRESS
	) {
		console.log("Creating Collateral - GLP")

		const decVal = dec(1, 18);
		const bnVal = toBN(dec(1, 18));

		console.log("deploying value ", {
			GLPUSD_Oracle: config.externalAddrs.Custom_Oracle,
			agilelyStabilityPool: agilelyCore.agilelyStabilityPool.address,
			decVal,
			bnVal,
			ZERO_ADDRESS,
		})

		const tx  = await agilelyCore.adminContract.addNewCollateral(
			sglpAddress,
			agilelyCore.agilelyStabilityPool.address,
			config.externalAddrs.Custom_Oracle,
			ZERO_ADDRESS,
			decVal,
			bnVal,
			config.REDEMPTION_SAFETY,
			{
				gasPrice,
				gasLimit:20000000
			}
		);
		await tx.wait();

		deploymentState["ProxyStabilityPoolSGLP"] = {
			address: await agilelyCore.stabilityPoolManager.getAssetStabilityPool(sglpAddress),
			txHash: tx.hash,
		}
	}
}

async function addBTCCollaterals() {
	const BTCAddress = !config.IsMainnet
		? await mdh.deployMockERC20Contract(deploymentState, "renBTC", 8)
		: config.externalAddrs.REN_BTC

	if (!BTCAddress || BTCAddress == "") throw "CANNOT FIND THE renBTC Address"

	// console.log((await agilelyCore.priceFeed.lastGoodPrice(BTCAddress)).toString())

	if (
		(await agilelyCore.stabilityPoolManager.unsafeGetAssetStabilityPool(BTCAddress)) ==
		ZERO_ADDRESS
	) {
		console.log("Creating Collateral - BTC")
		const tx = await agilelyCore.adminContract.addNewCollateral(
			BTCAddress,
			agilelyCore.agilelyStabilityPool.address,
			config.externalAddrs.CHAINLINK_BTCUSD_PROXY,
			ZERO_ADDRESS,
			dec(0, 18),
			toBN(dec(0, 18)),
			config.REDEMPTION_SAFETY,{
				gasLimit:20000000
			}
		);
		await tx.wait();
		console.log(tx.hash);
		/*const txReceiptProxyBTC = await mdh.sendAndWaitForTransaction(
			agilelyCore.adminContract.addNewCollateral(
				BTCAddress,
				agilelyCore.agilelyStabilityPool.address,
				config.externalAddrs.CHAINLINK_BTCUSD_PROXY,
				ZERO_ADDRESS,
				dec(0, 18),
				toBN(dec(0, 18)),
				config.REDEMPTION_SAFETY
			)
		)
		console.log(txReceiptProxyBTC)
		deploymentState["ProxyStabilityPoolRenBTC"] = {
			address: await agilelyCore.stabilityPoolManager.getAssetStabilityPool(BTCAddress),
			txHash: txReceiptProxyBTC.transactionHash,
		}*/
	}
}

async function addGOHMCollaterals() {
	const OHMAddress = !config.IsMainnet
		? await mdh.deployMockERC20Contract(deploymentState, "gOHM")
		: config.externalAddrs.GOHM

	if (!OHMAddress || OHMAddress == "") throw "CANNOT FIND THE renBTC Address"

	if (
		(await agilelyCore.stabilityPoolManager.unsafeGetAssetStabilityPool(OHMAddress)) ==
		ZERO_ADDRESS
	) {
		console.log("Creating Collateral - OHM")
		let txReceiptProxyOHM

		txReceiptProxyOHM = await mdh.sendAndWaitForTransaction(
			agilelyCore.adminContract.addNewCollateral(
				OHMAddress,
				agilelyCore.agilelyStabilityPool.address,
				config.externalAddrs.CHAINLINK_OHM_PROXY,
				config.IsMainnet ? config.externalAddrs.CHAINLINK_OHM_INDEX_PROXY : ZERO_ADDRESS,
				dec(30_000, 18),
				toBN(dec(500, 18)),
				config.REDEMPTION_SAFETY
			)
		)

		deploymentState["ProxyStabilityPoolOHM"] = {
			address: await agilelyCore.stabilityPoolManager.getAssetStabilityPool(OHMAddress),
			txHash: txReceiptProxyOHM.transactionHash,
		}
		//Configure Collateral;
		await mdh.sendAndWaitForTransaction(
			agilelyCore.agilelyParameters.setMCR(OHMAddress, config.gOHMParameters.MCR)
		)
		await mdh.sendAndWaitForTransaction(
			agilelyCore.agilelyParameters.setCCR(OHMAddress, config.gOHMParameters.CCR)
		)
		await mdh.sendAndWaitForTransaction(
			agilelyCore.agilelyParameters.setPercentDivisor(
				OHMAddress,
				config.gOHMParameters.PERCENT_DIVISOR
			)
		)
		await mdh.sendAndWaitForTransaction(
			agilelyCore.agilelyParameters.setBorrowingFeeFloor(
				OHMAddress,
				config.gOHMParameters.BORROWING_FEE_FLOOR
			)
		)
	}
}

async function giveContractsOwnerships() {
	await transferOwnership(agilelyCore.adminContract, ADMIN_WALLET)
	await transferOwnership(agilelyCore.priceFeed, ADMIN_WALLET)
	await transferOwnership(agilelyCore.agilelyParameters, ADMIN_WALLET)
	await transferOwnership(agilelyCore.stabilityPoolManager, ADMIN_WALLET)
	await transferOwnership(agilelyCore.usdaToken, ADMIN_WALLET)
	await transferOwnership(AGLContracts.AGLStaking, ADMIN_WALLET)

	await transferOwnership(agilelyCore.lockedVsta, TREASURY_WALLET)
	await transferOwnership(AGLContracts.communityIssuance, TREASURY_WALLET)
}

async function transferOwnership(contract, newOwner) {
	console.log("Transfering Ownership of", contract.address)

	if (!newOwner) throw "Transfering ownership to null address"

	if ((await contract.owner()) != newOwner) await contract.transferOwnership(newOwner)

	console.log("Transfered Ownership of", contract.address)
}

module.exports = {
	mainnetDeploy,
}

