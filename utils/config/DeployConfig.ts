import { SupportedChain } from "./NetworkConfig"
import { FirstDeployment } from "./contractConfigs/FirstDeploymentConfig"
import { USDAOracleConfig } from "./contractConfigs/USDAOracleConfig"
import { GLPOracleConfig } from "./contractConfigs/GLPOracleConfig"

export interface IDeployConfig {
	TX_CONFIRMATIONS: number
	FirstDeployment?: CrossChainFirstDeployment
	USDADeployment?: USDAOracleConfig
	GLPOracleConfig?: GLPOracleConfig
	AdminContract?: string
}

export type CrossChainFirstDeployment = {
	[key in SupportedChain | string]?: FirstDeployment
}
