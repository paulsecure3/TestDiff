import { ethers } from "hardhat";
import { USDAToken } from "../typechain-types/contracts/Token";
import {
  TroveManager,
  AGLParameters,
  StabilityPoolManager,
  CommunityIssuance,
} from "../typechain-types/contracts/Core";
import { AgilelyInterestManager } from "../types/AgilelyInterestManager";
import { AgilelyEIR } from "../types/AgilelyEIR";
import AgilelyInterestManagerJson from "../types/AgilelyInterestManager.json";
import AgilelyEIRJson from "../types/AgilelyEIR.json";
import { StabilityPool } from "../typechain-types/contracts/Pool";
import { PriceFeed } from "../typechain-types/contracts/Dependencies";
import ContractAddress from "../deployment/mainnetDeploymentOutput.json";
import { BigNumber } from "ethers";
import base = Mocha.reporters.base;

interface PageInfo {
  userUSDANumber: BigNumber;
  totalMinted: BigNumber;
  mintCap: BigNumber;
  minNetDebt: BigNumber;
  referenceRate: number;
  oraclePrice: BigNumber;
  userDeposited: BigNumber;
  totalDeposited: BigNumber;
  collateral: BigNumber;
  totalDebt: BigNumber;
  collateralRatio: number;
  liquidationPrice: BigNumber;
  accumulatedInterest: BigNumber;
  liquidationBonus: BigNumber;
  userLiquidationGain: BigNumber;
  userPoolShare: number;
  newPoolShare: number;
}

function decreaseDecimal(num: BigNumber): BigNumber {
  return num.div(BigNumber.from(10).pow(18));
}

export async function getPageInfo(
  asset: string,
  usdaChange: number
): Promise<PageInfo> {
  const [signer] = await ethers.getSigners();
  const usdaToken = (await ethers.getContractAt(
    "USDAToken",
    ContractAddress.USDAToken.address
  )) as USDAToken;
  const troveManager = (await ethers.getContractAt(
    "TroveManager",
    ContractAddress.troveManager.address
  )) as TroveManager;
  const aglParameters = (await ethers.getContractAt(
    "AGLParameters",
    ContractAddress.agilelyParameters.address
  )) as AGLParameters;
  const priceFeed = (await ethers.getContractAt(
    "PriceFeed",
    await aglParameters.priceFeed()
  )) as PriceFeed;
  const stabilityPoolManager = (await ethers.getContractAt(
    "StabilityPoolManager",
    ContractAddress.stabilityPoolManager.address
  )) as StabilityPoolManager;
  const stabilityPoolAddress = await stabilityPoolManager.getAssetStabilityPool(
    asset
  );
  const stabilityPool = (await ethers.getContractAt(
    "StabilityPool",
    stabilityPoolAddress
  )) as StabilityPool;
  const interestManager = (await ethers.getContractAt(
    AgilelyInterestManagerJson.abi,
    "0xA1640C3C1038835CeF76504a8be13f1ab3E08616"
  )) as AgilelyInterestManager;
  const assetInterestModuleAddress = await interestManager.getInterestModule(
    asset
  );
  const assetInterestModule = (await ethers.getContractAt(
    AgilelyEIRJson.abi,
    assetInterestModuleAddress
  )) as AgilelyEIR;

  const userUSDANumber = await usdaToken.balanceOf(signer.address);
  const totalDeposited = decreaseDecimal(
    await stabilityPool.getTotalUSDADeposits()
  );
  const userDeposited = decreaseDecimal(
    await stabilityPool.getCompoundedUSDADeposit(signer.address)
  );
  const minNetDebt = decreaseDecimal(await aglParameters.MIN_NET_DEBT(asset));
  const mintCap = decreaseDecimal(await aglParameters.usdaMintCap(asset));
  const systemDebt = await troveManager.getEntireSystemDebt(asset);
  const unpaidInterest = await troveManager.getUnpaidInterestOfUser(
    asset,
    signer.address
  );
  const totalMinted = decreaseDecimal(systemDebt.sub(unpaidInterest));
  const tx = await priceFeed.fetchPrice(asset);
  const receipt = await tx.wait();
  const oraclePrice = decreaseDecimal(BigNumber.from(receipt.logs[0].data));
  const collateralNumber = await troveManager.getTroveColl(
    asset,
    signer.address
  );
  const collateral = decreaseDecimal(collateralNumber.mul(oraclePrice));
  const totalDebt = decreaseDecimal(
    await troveManager.getTroveDebt(asset, signer.address)
  );
  const collateralRatio = collateral.toNumber() / totalDebt.toNumber();
  const minCollRatio = await aglParameters.MCR(asset);
  const liquidationPrice = minCollRatio.mul(totalDebt).div(collateralNumber);
  const { pendingInterest_ } = await interestManager.getUserDebt(
    asset,
    signer.address
  );
  const usdaPrice = await interestManager.getLastUSDAPrice();
  const liquidationBonus = await aglParameters.BonusToSP(asset);
  const userLiquidationGain = await stabilityPool.getDepositorAssetGain(
    signer.address
  );
  const userPoolShare = userDeposited.toNumber() / totalDeposited.toNumber();
  const newPoolShare =
    (userDeposited.toNumber() + usdaChange) / totalDeposited.toNumber();

  const communityIssuance = (await ethers.getContractAt(
    "CommunityIssuance",
    ContractAddress.communityIssuance.address
  )) as CommunityIssuance;

  // TODO 具体 _weeklyReward 及 _totalSupply 需要调整
  await communityIssuance.configStabilityPoolAndSend(
    stabilityPoolAddress,
    ContractAddress.AGLToken.address,
    ethers.utils.parseEther("1"),
    ethers.utils.parseEther("10000")
  );

  console.log(newPoolShare);
  console.log("userPoolShare", userPoolShare);
  //const referenceRate = await assetInterestModule.calculateEIR(0, usdaPrice);
  const pageInfo: PageInfo = {
    userUSDANumber,
    totalMinted,
    mintCap,
    minNetDebt,
    referenceRate: 0.5,
    oraclePrice,
    userDeposited,
    totalDeposited,
    collateral,
    totalDebt,
    collateralRatio,
    liquidationPrice,
    accumulatedInterest: pendingInterest_,
    liquidationBonus,
    userLiquidationGain,
    userPoolShare,
    newPoolShare,
  };
  return pageInfo;
}

export async function stake(asset: string, amount: number) {
  const [deployer] = await ethers.getSigners();
  const stabilityPoolManager = (await ethers.getContractAt(
    "StabilityPoolManager",
    ContractAddress.stabilityPoolManager.address
  )) as StabilityPoolManager;

  const stabilityPoolAddress = await stabilityPoolManager.getAssetStabilityPool(
    asset
  );


  const stabilityPool = (await ethers.getContractAt(
    "StabilityPool",
    stabilityPoolAddress
  )) as StabilityPool;
  const tx = await stabilityPool.provideToSP(
    ethers.utils.parseEther(`${amount}`)
  );

  // stake 之后查询账户状态
  const data = await tx.wait();
  const aglGainNumber = decreaseDecimal(
    await stabilityPool.getDepositorAGLGain(deployer.address)
  );
  const compoundedUSDA = decreaseDecimal(
    await stabilityPool.getCompoundedUSDADeposit(deployer.address)
  );
  const compoundedUSDAStake = decreaseDecimal(
    await stabilityPool.getCompoundedTotalStake()
  );

  console.log("stake info ", {
    data,
    aglGainNumber,
    compoundedUSDA,
    compoundedUSDAStake,
  });
}

export async function unStake(asset: string, amount: number) {
  const [deployer] = await ethers.getSigners();
  const stabilityPoolManager = (await ethers.getContractAt(
    "StabilityPoolManager",
    ContractAddress.stabilityPoolManager.address
  )) as StabilityPoolManager;
  const stabilityPoolAddress = await stabilityPoolManager.getAssetStabilityPool(
    asset
  );
  const stabilityPool = (await ethers.getContractAt(
    "StabilityPool",
    stabilityPoolAddress
  )) as StabilityPool;
  const tx = await stabilityPool.withdrawFromSP(
    ethers.utils.parseEther(`${amount}`)
  );

  // unstake 之后查询账户状态
  const data = await tx.wait();
  const aglGainNumber = decreaseDecimal(
    await stabilityPool.getDepositorAGLGain(deployer.address)
  );
  const compoundedUSDA = decreaseDecimal(
    await stabilityPool.getCompoundedUSDADeposit(deployer.address)
  );
  const compoundedUSDAStake = decreaseDecimal(
    await stabilityPool.getCompoundedTotalStake()
  );

  console.log("unstake info ", {
    data,
    aglGainNumber,
    compoundedUSDA,
    compoundedUSDAStake,
  });
}

//unStake("0x0000000000000000000000000000000000000000",1).then().catch()


// getPageInfo("0x0000000000000000000000000000000000000000", 10)
//   .then((pageInfo) => {
//     console.log("minNetDebt", pageInfo.minNetDebt.toString());
//     console.log("totalMinted", pageInfo.totalMinted.toString());
//     console.log("mintCap", pageInfo.mintCap.toString());
//     console.log("oraclePrice", pageInfo.oraclePrice.toString());
//     console.log("userDeposited", pageInfo.userDeposited.toString());
//     console.log("totalDeposited", pageInfo.totalDeposited.toString());
//     console.log("collateral", pageInfo.collateral.toString());
//     console.log("totaldebt", pageInfo.totalDebt.toString());
//     console.log("collateralRatio", pageInfo.collateralRatio.toString());
//     console.log("userUSDANumber", pageInfo.userUSDANumber.toString());
//     console.log("accumulatedInterest", pageInfo.accumulatedInterest.toString());
//     console.log("newPoolShare", pageInfo.newPoolShare.toString());
//   })
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

export interface ManualExchange{
    traderSelector: string,
    tokenInOut: string[],
    data: string
}
export function encodeData(tokenIn: string, tokenOut: string): string{
    //const wethAddress = "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3"
    //const tokenOut = "0xc46fDae6C2ef338B077B8e11778b096A3873FeF5"
    const path = ethers.utils.defaultAbiCoder.encode(["address", "uint24"],[tokenOut, 3000])
    const swapRequestEncoding = "tuple(bytes path, address tokenIn, uint256 expectedAmountIn, uint256 expectedAmountOut, uint256 amountInMaximum, bool usingHop)";
    const swapRequest = {
        path,
        tokenIn,
        expectedAmountIn: ethers.BigNumber.from(0),
        expectedAmountOut: ethers.BigNumber.from(0),
        amountInMaximum: ethers.utils.parseEther('0.1'),
        usingHop: false
    };
    const encodedData = ethers.utils.defaultAbiCoder.encode([swapRequestEncoding], [
        swapRequest
    ]);
    return encodedData;

}
export function mutualExchange(tokenIn: string, tokenOut: string):ManualExchange{
    return {
        traderSelector: "0x0fa74b3ade106cd68a66c0ef6dfe2154",
        data: encodeData(tokenIn, tokenOut),
        tokenInOut: [tokenIn, tokenOut]
    }
}
