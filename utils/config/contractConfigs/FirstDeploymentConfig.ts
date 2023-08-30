export interface FirstDeployment {
	isTestnet: boolean
	chainlinkSEQFlag?: string
	chainlinkFlagsContract?: string
	adminAddress: string

	usda: string
	usdaChainlink: IChainlinkOracle
	ethChainlink: IChainlinkOracle
	btcChainlink?: IChainlinkOracle
	glpOracle:{
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
