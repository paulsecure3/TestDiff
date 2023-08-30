/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface ISavingModuleStabilityPoolInterface extends utils.Interface {
  functions: {
    "getAssetBalances()": FunctionFragment;
    "getAssets()": FunctionFragment;
    "getCompoundedTotalStake()": FunctionFragment;
    "getCompoundedUSDADeposit(uint256)": FunctionFragment;
    "getLockAssetsGain(uint256)": FunctionFragment;
    "getTotalUSDADeposits()": FunctionFragment;
    "offset(address,uint256,uint256)": FunctionFragment;
    "provideToSP(address,uint256,uint256)": FunctionFragment;
    "receivedERC20(address,uint256)": FunctionFragment;
    "withdrawFromSP(address,uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getAssetBalances"
      | "getAssets"
      | "getCompoundedTotalStake"
      | "getCompoundedUSDADeposit"
      | "getLockAssetsGain"
      | "getTotalUSDADeposits"
      | "offset"
      | "provideToSP"
      | "receivedERC20"
      | "withdrawFromSP"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getAssetBalances",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getAssets", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getCompoundedTotalStake",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCompoundedUSDADeposit",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getLockAssetsGain",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalUSDADeposits",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "offset",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "provideToSP",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "receivedERC20",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFromSP",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "getAssetBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAssets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCompoundedTotalStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCompoundedUSDADeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLockAssetsGain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalUSDADeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "offset", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "provideToSP",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "receivedERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFromSP",
    data: BytesLike
  ): Result;

  events: {
    "AssetBalanceUpdated(address,uint256)": EventFragment;
    "AssetSent(address,uint256)": EventFragment;
    "EpochUpdated(uint256)": EventFragment;
    "LockDepositChanged(uint256,uint256)": EventFragment;
    "LockSnapshotUpdated(uint256,uint256,uint256)": EventFragment;
    "P_Updated(uint256)": EventFragment;
    "S_Updated(address,uint256,uint256,uint256)": EventFragment;
    "ScaleUpdated(uint256)": EventFragment;
    "StakeChanged(uint256)": EventFragment;
    "SystemSnapshotUpdated(uint256)": EventFragment;
    "USDABalanceUpdated(uint256)": EventFragment;
    "USDALoss(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssetBalanceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetSent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EpochUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LockDepositChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LockSnapshotUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "P_Updated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "S_Updated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ScaleUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StakeChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SystemSnapshotUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "USDABalanceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "USDALoss"): EventFragment;
}

export interface AssetBalanceUpdatedEventObject {
  asset: string;
  amount: BigNumber;
}
export type AssetBalanceUpdatedEvent = TypedEvent<
  [string, BigNumber],
  AssetBalanceUpdatedEventObject
>;

export type AssetBalanceUpdatedEventFilter =
  TypedEventFilter<AssetBalanceUpdatedEvent>;

export interface AssetSentEventObject {
  user: string;
  amount: BigNumber;
}
export type AssetSentEvent = TypedEvent<
  [string, BigNumber],
  AssetSentEventObject
>;

export type AssetSentEventFilter = TypedEventFilter<AssetSentEvent>;

export interface EpochUpdatedEventObject {
  epoch: BigNumber;
}
export type EpochUpdatedEvent = TypedEvent<
  [BigNumber],
  EpochUpdatedEventObject
>;

export type EpochUpdatedEventFilter = TypedEventFilter<EpochUpdatedEvent>;

export interface LockDepositChangedEventObject {
  lockId: BigNumber;
  deposit: BigNumber;
}
export type LockDepositChangedEvent = TypedEvent<
  [BigNumber, BigNumber],
  LockDepositChangedEventObject
>;

export type LockDepositChangedEventFilter =
  TypedEventFilter<LockDepositChangedEvent>;

export interface LockSnapshotUpdatedEventObject {
  lockId: BigNumber;
  p: BigNumber;
  scale: BigNumber;
}
export type LockSnapshotUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  LockSnapshotUpdatedEventObject
>;

export type LockSnapshotUpdatedEventFilter =
  TypedEventFilter<LockSnapshotUpdatedEvent>;

export interface P_UpdatedEventObject {
  newP: BigNumber;
}
export type P_UpdatedEvent = TypedEvent<[BigNumber], P_UpdatedEventObject>;

export type P_UpdatedEventFilter = TypedEventFilter<P_UpdatedEvent>;

export interface S_UpdatedEventObject {
  asset: string;
  newS: BigNumber;
  epoch: BigNumber;
  scale: BigNumber;
}
export type S_UpdatedEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber],
  S_UpdatedEventObject
>;

export type S_UpdatedEventFilter = TypedEventFilter<S_UpdatedEvent>;

export interface ScaleUpdatedEventObject {
  scale: BigNumber;
}
export type ScaleUpdatedEvent = TypedEvent<
  [BigNumber],
  ScaleUpdatedEventObject
>;

export type ScaleUpdatedEventFilter = TypedEventFilter<ScaleUpdatedEvent>;

export interface StakeChangedEventObject {
  stake: BigNumber;
}
export type StakeChangedEvent = TypedEvent<
  [BigNumber],
  StakeChangedEventObject
>;

export type StakeChangedEventFilter = TypedEventFilter<StakeChangedEvent>;

export interface SystemSnapshotUpdatedEventObject {
  P: BigNumber;
}
export type SystemSnapshotUpdatedEvent = TypedEvent<
  [BigNumber],
  SystemSnapshotUpdatedEventObject
>;

export type SystemSnapshotUpdatedEventFilter =
  TypedEventFilter<SystemSnapshotUpdatedEvent>;

export interface USDABalanceUpdatedEventObject {
  balance: BigNumber;
}
export type USDABalanceUpdatedEvent = TypedEvent<
  [BigNumber],
  USDABalanceUpdatedEventObject
>;

export type USDABalanceUpdatedEventFilter =
  TypedEventFilter<USDABalanceUpdatedEvent>;

export interface USDALossEventObject {
  lockId: BigNumber;
  usdaLost: BigNumber;
}
export type USDALossEvent = TypedEvent<
  [BigNumber, BigNumber],
  USDALossEventObject
>;

export type USDALossEventFilter = TypedEventFilter<USDALossEvent>;

export interface ISavingModuleStabilityPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISavingModuleStabilityPoolInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getAssetBalances(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getAssets(overrides?: CallOverrides): Promise<[string[]]>;

    getCompoundedTotalStake(overrides?: CallOverrides): Promise<[BigNumber]>;

    getCompoundedUSDADeposit(
      _lockId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getLockAssetsGain(
      _lockId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;

    getTotalUSDADeposits(overrides?: CallOverrides): Promise<[BigNumber]>;

    offset(
      _asset: PromiseOrValue<string>,
      _debtToOffset: PromiseOrValue<BigNumberish>,
      _collToAdd: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    provideToSP(
      _receiver: PromiseOrValue<string>,
      _lockId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    receivedERC20(
      _asset: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawFromSP(
      _receiver: PromiseOrValue<string>,
      _lockId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getAssetBalances(overrides?: CallOverrides): Promise<BigNumber[]>;

  getAssets(overrides?: CallOverrides): Promise<string[]>;

  getCompoundedTotalStake(overrides?: CallOverrides): Promise<BigNumber>;

  getCompoundedUSDADeposit(
    _lockId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getLockAssetsGain(
    _lockId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[string[], BigNumber[]]>;

  getTotalUSDADeposits(overrides?: CallOverrides): Promise<BigNumber>;

  offset(
    _asset: PromiseOrValue<string>,
    _debtToOffset: PromiseOrValue<BigNumberish>,
    _collToAdd: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  provideToSP(
    _receiver: PromiseOrValue<string>,
    _lockId: PromiseOrValue<BigNumberish>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  receivedERC20(
    _asset: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawFromSP(
    _receiver: PromiseOrValue<string>,
    _lockId: PromiseOrValue<BigNumberish>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getAssetBalances(overrides?: CallOverrides): Promise<BigNumber[]>;

    getAssets(overrides?: CallOverrides): Promise<string[]>;

    getCompoundedTotalStake(overrides?: CallOverrides): Promise<BigNumber>;

    getCompoundedUSDADeposit(
      _lockId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLockAssetsGain(
      _lockId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;

    getTotalUSDADeposits(overrides?: CallOverrides): Promise<BigNumber>;

    offset(
      _asset: PromiseOrValue<string>,
      _debtToOffset: PromiseOrValue<BigNumberish>,
      _collToAdd: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    provideToSP(
      _receiver: PromiseOrValue<string>,
      _lockId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    receivedERC20(
      _asset: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawFromSP(
      _receiver: PromiseOrValue<string>,
      _lockId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AssetBalanceUpdated(address,uint256)"(
      asset?: PromiseOrValue<string> | null,
      amount?: null
    ): AssetBalanceUpdatedEventFilter;
    AssetBalanceUpdated(
      asset?: PromiseOrValue<string> | null,
      amount?: null
    ): AssetBalanceUpdatedEventFilter;

    "AssetSent(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): AssetSentEventFilter;
    AssetSent(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): AssetSentEventFilter;

    "EpochUpdated(uint256)"(epoch?: null): EpochUpdatedEventFilter;
    EpochUpdated(epoch?: null): EpochUpdatedEventFilter;

    "LockDepositChanged(uint256,uint256)"(
      lockId?: PromiseOrValue<BigNumberish> | null,
      deposit?: null
    ): LockDepositChangedEventFilter;
    LockDepositChanged(
      lockId?: PromiseOrValue<BigNumberish> | null,
      deposit?: null
    ): LockDepositChangedEventFilter;

    "LockSnapshotUpdated(uint256,uint256,uint256)"(
      lockId?: PromiseOrValue<BigNumberish> | null,
      p?: null,
      scale?: null
    ): LockSnapshotUpdatedEventFilter;
    LockSnapshotUpdated(
      lockId?: PromiseOrValue<BigNumberish> | null,
      p?: null,
      scale?: null
    ): LockSnapshotUpdatedEventFilter;

    "P_Updated(uint256)"(newP?: null): P_UpdatedEventFilter;
    P_Updated(newP?: null): P_UpdatedEventFilter;

    "S_Updated(address,uint256,uint256,uint256)"(
      asset?: PromiseOrValue<string> | null,
      newS?: null,
      epoch?: null,
      scale?: null
    ): S_UpdatedEventFilter;
    S_Updated(
      asset?: PromiseOrValue<string> | null,
      newS?: null,
      epoch?: null,
      scale?: null
    ): S_UpdatedEventFilter;

    "ScaleUpdated(uint256)"(scale?: null): ScaleUpdatedEventFilter;
    ScaleUpdated(scale?: null): ScaleUpdatedEventFilter;

    "StakeChanged(uint256)"(stake?: null): StakeChangedEventFilter;
    StakeChanged(stake?: null): StakeChangedEventFilter;

    "SystemSnapshotUpdated(uint256)"(
      P?: null
    ): SystemSnapshotUpdatedEventFilter;
    SystemSnapshotUpdated(P?: null): SystemSnapshotUpdatedEventFilter;

    "USDABalanceUpdated(uint256)"(
      balance?: null
    ): USDABalanceUpdatedEventFilter;
    USDABalanceUpdated(balance?: null): USDABalanceUpdatedEventFilter;

    "USDALoss(uint256,uint256)"(
      lockId?: PromiseOrValue<BigNumberish> | null,
      usdaLost?: null
    ): USDALossEventFilter;
    USDALoss(
      lockId?: PromiseOrValue<BigNumberish> | null,
      usdaLost?: null
    ): USDALossEventFilter;
  };

  estimateGas: {
    getAssetBalances(overrides?: CallOverrides): Promise<BigNumber>;

    getAssets(overrides?: CallOverrides): Promise<BigNumber>;

    getCompoundedTotalStake(overrides?: CallOverrides): Promise<BigNumber>;

    getCompoundedUSDADeposit(
      _lockId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLockAssetsGain(
      _lockId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalUSDADeposits(overrides?: CallOverrides): Promise<BigNumber>;

    offset(
      _asset: PromiseOrValue<string>,
      _debtToOffset: PromiseOrValue<BigNumberish>,
      _collToAdd: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    provideToSP(
      _receiver: PromiseOrValue<string>,
      _lockId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    receivedERC20(
      _asset: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawFromSP(
      _receiver: PromiseOrValue<string>,
      _lockId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getAssetBalances(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAssets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCompoundedTotalStake(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCompoundedUSDADeposit(
      _lockId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLockAssetsGain(
      _lockId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalUSDADeposits(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    offset(
      _asset: PromiseOrValue<string>,
      _debtToOffset: PromiseOrValue<BigNumberish>,
      _collToAdd: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    provideToSP(
      _receiver: PromiseOrValue<string>,
      _lockId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    receivedERC20(
      _asset: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFromSP(
      _receiver: PromiseOrValue<string>,
      _lockId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}