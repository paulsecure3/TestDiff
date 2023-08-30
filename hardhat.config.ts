import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import fs from 'fs';
import '@openzeppelin/hardhat-upgrades';
import "hardhat-deploy"
import accountsList from "./utils/accounts/hardhatAccountsList2k";
//import "./tasks"
import "hardhat-contract-sizer"
import "@nomicfoundation/hardhat-foundry";

const getSecret = (secretKey: string, defaultValue = '') => {
  const SECRETS_FILE = "./secrets.js"
  let secret = defaultValue
  if (fs.existsSync(SECRETS_FILE)) {
    const { secrets } = require(SECRETS_FILE)
    if (secrets[secretKey]) { secret = secrets[secretKey] }
  }

  return secret
}


const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 150
          }
        }
      },
      {
        version: "0.5.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 150
          }
        }
      },
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 150
          }
        }
      },
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 150
          }
        }
      },
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 150
          }
        }
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      accounts: accountsList,
      initialBaseFeePerGas: 0,
      gas: 10000000,  // tx gas limit
      // blockGasLimit: 15000000,
      gasPrice: 20000000000,
      hardfork: "london",
      forking: {
        url: "https://arb-mainnet.g.alchemy.com/v2/g6hyDl61H4u-Dv6oPO-tvifspX5Tmlf0",
      }
    },
    localhost: {
      url: "http://localhost:8545",
      gas: 20000000,  // tx gas limit
      allowUnlimitedContractSize: true
    },
    arbitrumGoerli: {
      url: "https://arb-goerli.g.alchemy.com/v2/B3AjvdCFVaKh845e62PFl5uwLJsaU04k",
      accounts: [getSecret('GEORLI_DEPLOYER_PRIVATEKEY', '0x0')]
    },
    arbitrumTestnet: {
      url: "https://arb-goerli.g.alchemy.com/v2/B3AjvdCFVaKh845e62PFl5uwLJsaU04k",
      accounts: [getSecret('GEORLI_DEPLOYER_PRIVATEKEY', '0x0')]
    },
    mainnet: {
      url: "https://arb1.arbitrum.io/rpc",
      gasPrice: process.env.GAS_PRICE ? parseInt(process.env.GAS_PRICE) : 20000000000,
      accounts: [
        getSecret('DEPLOYER_PRIVATEKEY', '0x0')
      ]
    },
    arbGoerli: {
      url: "https://arb-goerli.g.alchemy.com/v2/B3AjvdCFVaKh845e62PFl5uwLJsaU04k",
      accounts: [getSecret('GEORLI_DEPLOYER_PRIVATEKEY', '0x0')]
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/HR3lAYLclnYvIvaJGAvWGQH0-aH0gwyn`,
      accounts: [getSecret('GEORLI_DEPLOYER_PRIVATEKEY', '0x0')]
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/i1je89ouiTKxHN9dk8h4R19hfctEpmSj`,
      accounts: [getSecret('GEORLI_DEPLOYER_PRIVATEKEY', '0x0')]
    }
  },
  defaultNetwork: "arbitrumGoerli",
  // url: "https://arb-mainnet.g.alchemy.com/v2/g6hyDl61H4u-Dv6oPO-tvifspX5Tmlf0",
  etherscan: {
    apiKey: {
      arbitrumOne: getSecret("ETHERSCAN_API_KEY"),
      arbitrumTestnet: getSecret("ETHERSCAN_API_KEY"),
      arbitrumGoerli: getSecret("ETHERSCAN_API_KEY"),
    }
  },
  mocha: { timeout: 12000000 },
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true : false
  }
};

export default config;
