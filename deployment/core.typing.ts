export type SupportedChain =
	| "mainnet"
	| "ropsten"
	| "rinkeby"
	| "goerli"
	| "kovan"
	// binance smart chain
	| "bsc"
	| "bscTestnet"
	// huobi eco chain
	| "heco"
	| "hecoTestnet"
	// fantom mainnet
	| "opera"
	| "ftmTestnet"
	// optimistim
	| "optimisticEthereum"
	| "optimisticKovan"
	// polygon
	| "polygon"
	| "polygonMumbai"
	// arbitrum
	| "arbitrumOne"
	| "arbitrumTestnet"
	// avalanche
	| "avalanche"
	| "avalancheFujiTestnet"
	// moonriver
	| "moonriver"
	| "moonbaseAlpha"
	// xdai
	| "xdai"
	| "sokol"
	// localhost
	| "localhost"

export type ChainConfig = {
	[key in SupportedChain]?: Network
}

export interface Network {
	RPC_URL: string
	PRIVATE_KEY: string
	ETHERSCAN_API_KEY?: string
}

export interface NetworkConfig {
	networks: ChainConfig
}


export interface FirstDeployment {
	isTestnet: boolean
	chainlinkSEQFlag?: string
	chainlinkFlagsContract?: string
	adminAddress: string

	usda: string
	usdaChainlink: IChainlinkOracle
	ethChainlink: IChainlinkOracle
	btcChainlink?: IChainlinkOracle
	glpOracle: {
		sglp: string,
		oracle: string
	}
	twap?: ITwapConfigConstructor
	gmx?: ITwapOracle
}

export interface IChainlinkOracle {
	priceOracle: string
	indexOracle: string
}

export interface ICustomOracle {
	contract: string
	decimals: number
	currentPriceHex: string
	lastPriceHex: string
	lastUpdateHex: string
	decimalsHex: string
}

export interface ITwapConfigConstructor {
	weth: string
	chainlinkEth: string
	chainlingFlagSEQ: string
	chainlinkFlagsContract: string
}

export interface ITwapOracle {
	token: string
	pool: string
}


export type CrossChainFirstDeployment = {
	[key in SupportedChain | string]?: FirstDeployment
}


export interface USDAOracleConfig {
	oracleName: string
	trustedNode: string
	admin: string
}

export interface GLPOracleConfig {
	glpManager: string
	glpToken: string
	gmxVault: string
	trustedNode: string
}



export interface IDeployConfig {
	TX_CONFIRMATIONS: number
	FirstDeployment?: CrossChainFirstDeployment
	USDADeployment?: USDAOracleConfig
	GLPOracleConfig?: GLPOracleConfig
	AdminContract?: string
}


export type AgilelyCoreInfo = { usdaOracle: any; stabilityPoolManager: any; chainlinkOracle: any; agilelyStabilityPool: any; adminContract: any;  customOracle: any; agilelyParameters: any; priceFeed: any; usdaToken: any; lockedVsta?: any; sortedTroves?: any; troveManager?: any; activePool?: any; usdaScript?: any; gasPool?: any; defaultPool?: any; collSurplusPool?: any; borrowerOperations?: any; hintHelpers?: any; lockedAgl?: any; glpStaking?: any; }
export type AgilelyContractInfo = { communityIssuance: any; AGLToken: any; AGLStaking: any; }


