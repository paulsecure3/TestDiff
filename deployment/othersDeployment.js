const assert = require("node:assert");
const OthersDeploymentHelper = require("../utils/othersHelpers.js")

const { ethers } = require("hardhat")

async function othersDeploy(configParams) {
	console.log(new Date().toUTCString())

	const config = configParams
	const ADMIN_WALLET = config.agilelyAddresses.ADMIN_MULTI

	const deployerWallet = (await ethers.getSigners())[0]

	const mdh = new OthersDeploymentHelper(config, deployerWallet)
	const deploymentState = mdh.loadPreviousDeployment()
	// Deploy core logic contracts
	await mdh.deployLiquityCoreOthers(deploymentState, ADMIN_WALLET)

}

module.exports = {
	othersDeploy,
}

