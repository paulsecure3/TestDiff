// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UniswapV3PoolMock {
    uint256 public mockTimeWeightedAverageTick;

    function setMockTimeWeightedAverageTick(uint256 _tick) external {
        mockTimeWeightedAverageTick = _tick;
    }

    function consult(
        uint32 /* period */
    ) external view returns (uint256 timeWeightedAverageTick) {
        return mockTimeWeightedAverageTick;
    }
}
