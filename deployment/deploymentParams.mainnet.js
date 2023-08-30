const IsMainnet = false;

const externalAddrs = {
  CHAINLINK_ETHUSD_PROXY: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
  CHAINLINK_BTCUSD_PROXY: "0x6550bc2301936011c1334555e62A87705A81C12C",


  CHAINLINK_OHM_PROXY: "0x761aaeBf021F19F198D325D7979965D0c7C9e53b",
  CHAINLINK_OHM_INDEX_PROXY: "0x48C4721354A3B29D80EF03C65E6644A37338a0B1",
  CHAINLINK_FLAG_HEALTH: "0x7cA1E4C61840043BC11c8A8C2d3Ee4833e01240d",

  WETH_ERC20: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  REN_BTC: "0xdbf31df14b66535af65aac99c32e9ea844e14501",
  GOHM: "0x8d9ba570d6cb60c7e3e0f31343efe75ab8e65fb1",
}

const gOHMParameters = {
  MCR: "1750000000000000000",
  CCR: "2200000000000000000",
  PERCENT_DIVISOR: 33,
  BORROWING_FEE_FLOOR: 125
}


const agilelyAddresses = {
  ADMIN_MULTI: "0x7a1E196d992F04897D3269921727b3eB32438ddD",
  AGL_SAFE: "0x7a1E196d992F04897D3269921727b3eB32438ddD", // to be passed to AGLToken as the AGL multisig address
  DEPLOYER: "0x7a1E196d992F04897D3269921727b3eB32438ddD" // Mainnet REAL deployment address
}

// Beneficiaries for lockup contracts. 
const beneficiaries = {
  //CORE TEAM
  "0x00a329c0648769A73afAc7F9381E08FB43dBEA72": 2_100_000,
}


const REDEMPTION_SAFETY = 14;
const AGL_TOKEN_ONLY = false;

const OUTPUT_FILE = './mainnetDeploymentOutput.json'

const delay = ms => new Promise(res => setTimeout(res, ms));
const waitFunction = async () => {
  return delay(90000) // wait 90s
}

const GAS_PRICE = 25000000000
const TX_CONFIRMATIONS = 3 // for mainnet

const ETHERSCAN_BASE_URL = 'https://goerli.arbiscan.io/address'

module.exports = {
  externalAddrs,
  agilelyAddresses,
  beneficiaries,
  OUTPUT_FILE,
  waitFunction,
  GAS_PRICE,
  TX_CONFIRMATIONS,
  ETHERSCAN_BASE_URL,
  REDEMPTION_SAFETY,
  AGL_TOKEN_ONLY,
  gOHMParameters,
  IsMainnet
};
