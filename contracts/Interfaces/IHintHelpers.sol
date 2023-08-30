pragma solidity >=0.8.0;

interface IHintHelpers {

    function getRedemptionHints(
        address _asset,
        uint256 _USDAamount,
        uint256 _price,
        uint256 _maxIterations
    )
    external
    returns (
        address firstRedemptionHint,
        uint256 partialRedemptionHintNICR,
        uint256 truncatedUSDAamount
    );
}
