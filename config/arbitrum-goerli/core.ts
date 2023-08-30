import { ethers } from "hardhat";


/**
 * @description 最小抵押率 MCR （Min Collateral rate）
 * 当前设置 175%
 */
const MCR = ethers.utils.parseEther("1.75");

/**
 * @description 最小抵押率 CCR
 * 当前设置 220%
 */
const CCR = ethers.utils.parseEther("2.2");


/**
 * @description PERCENT_DIVISOR 
 * 当前设置 33
 */
const PERCENT_DIVISOR = 33;

/**
 * @description BORROWING_FEE_FLOOR 
 * 当前设置 125
 */
const BORROWING_FEE_FLOOR = 125;

/**
 * @description 赎回的安全指数 
 */
const REDEMPTION_SAFETY = 14;

export {
    MCR,
    CCR,
    PERCENT_DIVISOR,
    REDEMPTION_SAFETY,
    BORROWING_FEE_FLOOR,
}