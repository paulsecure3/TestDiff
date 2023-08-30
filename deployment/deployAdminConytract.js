const {ethers} = require("hardhat");
const { AdminContract} = require("../typechain-types/contracts/Core")
async function main() {

    const adminContractFactory = ethers.getContractFactory("AdminContract", )
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

