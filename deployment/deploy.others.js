const { othersDeploy } = require('./othersDeployment.js')
const configParams = require("./others.deployment.js")

async function main() {
    console.log("Deploying others network on testnet");
    await othersDeploy(configParams)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

