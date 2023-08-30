// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

// 引入模拟合约的接口
interface IAggregatorV3Mock {
    function setLatestPrice(int256 _price) external;
}

contract ChainlinkAutomation {
    IAggregatorV3Mock public mockPriceFeed;

    constructor(address _mockPriceFeedAddress) {
        mockPriceFeed = IAggregatorV3Mock(_mockPriceFeedAddress);
    }

    // 添加一个函数来调用模拟合约的setLatestPrice
    function setMockPrice(int256 _price) external {
        mockPriceFeed.setLatestPrice(_price);
    }
}
