// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

enum Status {
	nonExistent,
	active,
	closedByOwner,
	closedByLiquidation,
	closedByRedemption
}

// Store the necessary data for a trove
struct Trove {
	address asset;
	uint256 debt;
	uint256 coll;
	uint256 stake;
	Status status;
	uint128 arrayIndex;
}

/*
 * --- Variable container structs for liquidations ---
 *
 * These structs are used to hold, return and assign variables inside the liquidation functions,
 * in order to avoid the error: "CompilerError: Stack too deep".
 **/

struct LocalVariables_OuterLiquidationFunction {
	uint256 price;
	uint256 USDAInStabPool;
	bool recoveryModeAtStart;
	uint256 liquidatedDebt;
	uint256 liquidatedColl;
}

struct LocalVariables_InnerSingleLiquidateFunction {
	uint256 collToLiquidate;
	uint256 pendingDebtReward;
	uint256 pendingCollReward;
}

struct LocalVariables_LiquidationSequence {
	uint256 remainingUSDAInStabPool;
	uint256 i;
	uint256 ICR;
	address user;
	bool backToNormalMode;
	uint256 entireSystemDebt;
	uint256 entireSystemColl;
}

struct LocalVariables_AssetBorrowerPrice {
	address _asset;
	address _borrower;
	uint256 _price;
	address _upper;
	address _lower;
}

struct LiquidationValues {
	uint256 entireTroveDebt;
	uint256 entireTroveColl;
	uint256 collGasCompensation;
	uint256 USDAGasCompensation;
	uint256 debtToOffset;
	uint256 collToSendToSP;
	uint256 debtToRedistribute;
	uint256 collToRedistribute;
	uint256 collSurplus;
}

struct LiquidationTotals {
	uint256 totalCollInSequence;
	uint256 totalDebtInSequence;
	uint256 totalCollGasCompensation;
	uint256 totalUSDAGasCompensation;
	uint256 totalDebtToOffset;
	uint256 totalCollToSendToSP;
	uint256 totalDebtToRedistribute;
	uint256 totalCollToRedistribute;
	uint256 totalCollSurplus;
}

// --- Variable container structs for redemptions ---

struct RedemptionTotals {
	uint256 remainingUSDA;
	uint256 totalUSDAToRedeem;
	uint256 totalAssetDrawn;
	uint256 AssetFee;
	uint256 AssetToSendToRedeemer;
	uint256 decayedBaseRate;
	uint256 price;
	uint256 totalUSDASupplyAtStart;
}

struct SingleRedemptionValues {
	uint256 USDALot;
	uint256 AssetLot;
	bool cancelledPartial;
}
