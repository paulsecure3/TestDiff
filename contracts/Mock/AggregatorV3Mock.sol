// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface IUniswapV3Oracle {
    function consult(
        address tokenIn,
        uint256 amountIn,
        address tokenOut
    ) external view returns (uint256 amountOut);
}

contract CustomAggregator is AggregatorV3Interface {
    IUniswapV3Oracle public uniswapOracle;
    address public tokenIn;
    address public tokenOut;
    uint256 public amountIn;

    constructor(
        address _uniswapOracle,
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn
    ) {
        uniswapOracle = IUniswapV3Oracle(_uniswapOracle);
        tokenIn = _tokenIn;
        tokenOut = _tokenOut;
        amountIn = _amountIn;
    }

    // 实现AggregatorV3Interface中的方法
    function latestRoundData()
        public
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        uint256 price = uniswapOracle.consult(tokenIn, amountIn, tokenOut);
        return (1, int256(price), block.timestamp, block.timestamp, 1);
    }

    function decimals() external view override returns (uint8) {}

    function description() external view override returns (string memory) {}

    function version() external view override returns (uint256) {}

    function getRoundData(
        uint80 _roundId
    )
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {}
}
