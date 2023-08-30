// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IStabilityPool.sol";

interface IStabilityPoolManager {
    // 判断是否为稳定池
    function isStabilityPool(
        address stabilityPool
    ) external view returns (bool);

    // 将 asset 添加到对应的 stabilityPool
    function addStabilityPool(address asset, address stabilityPool) external;

    // 从指定的 stabilityPool 获取 asset
    function getAssetStabilityPool(
        address asset
    ) external view returns (IStabilityPool);

    // 不安全的，从指定的 stabilityPool 获取 asset
    function unsafeGetAssetStabilityPool(
        address asset
    ) external view returns (address);
}
