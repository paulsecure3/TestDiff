const { mainnetDeploy } = require('./mainnetDeployment.js')
const configParams = require("./arbitrum.deployment.js")

async function main() {
    console.log("Deploying on testnet");
    await mainnetDeploy(configParams)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

