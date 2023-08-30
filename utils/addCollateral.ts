import { ethers } from "hardhat"
import { ZERO_ADDRESS } from "../config";
import { AdminContract } from "../typechain-types/contracts/Core/AdminContract";
import { StabilityPoolManager } from "../typechain-types";

type ContractParams = {
    /**
     * @description stabilityPoolManager
     */
    stabilityPoolManager: StabilityPoolManager;
    /**
     * @description adminContract 管理员合约
     */
    adminContract: AdminContract;
}

type NetworkInfo = {
    gasLimit?: number;
    gasPrice?: any;
}

type CollateralParams = {
    /**
     * @description 当前稳定池在 stabilityPoolManager 的索引
     */
    _asset: string;
    /**
     * @description 当前稳定池在 _stabilityPoolImplementation 的实现合约地址
     */
    _stabilityPoolImplementation: string;
    /**
     * @description 依赖的 oracle 的实现合约地址
     */
    _chainlinkOracle: string;
    /**
     * @description 依赖的 oracle 的索引
     */
    _chainlinkIndex: string;
    /**
     * @description 赎回锁定时间 单位 day
     */
    redemptionLockInDay: number;
}

/**
 * 通过此函数向稳定池添加 特定稳定币类型资产
 * @param contracts ContractParams 依赖部署和实例
 * @param collateralParams CollateralParams 依赖外部合约地址及索引参数
 * @param networkInfo NetworkInfo 包含 Gas 及 安全系数相关参数
 * @param poolName String 当前稳定池名称，非必须
 * @returns address 当前添加资产  
 * @returns hash 合约执行  
 */
export async function addCollaterals(contracts: ContractParams, collateralParams: CollateralParams, networkInfo: NetworkInfo, poolName: string) {
    const { stabilityPoolManager, adminContract } = contracts;
    const { _asset, _stabilityPoolImplementation, _chainlinkOracle, _chainlinkIndex, redemptionLockInDay } = collateralParams;


    if (
        (await stabilityPoolManager.unsafeGetAssetStabilityPool(_asset)) ==
        ZERO_ADDRESS
    ) {
        console.log(`Creating Collateral - ${poolName}`)

        const decVal = ethers.utils.parseEther("1");
        const bnVal = ethers.utils.parseEther("1");

        const tx = await adminContract.addNewCollateral(
            _asset,
            _stabilityPoolImplementation,
            _chainlinkOracle,
            _chainlinkIndex,
            decVal,
            bnVal,
            redemptionLockInDay,
            // gas 相关参数
            networkInfo,
        );

        await tx.wait();
        const assetPoolAddress = await stabilityPoolManager.getAssetStabilityPool(_asset);

        return {
            address: assetPoolAddress,
            txHash: tx.hash,
        }

    }
}