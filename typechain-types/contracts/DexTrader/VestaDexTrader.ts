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

export type ManualExchangeStruct = {
  traderSelector: PromiseOrValue<BytesLike>;
  tokenInOut: [PromiseOrValue<string>, PromiseOrValue<string>];
  data: PromiseOrValue<BytesLike>;
};

export type ManualExchangeStructOutput = [string, [string, string], string] & {
  traderSelector: string;
  tokenInOut: [string, string];
  data: string;
};

export interface VestaDexTraderInterface extends utils.Interface {
  functions: {
    "exchange(address,address,uint256,(bytes16,address[2],bytes)[])": FunctionFragment;
    "getAmountIn(uint256,(bytes16,address[2],bytes)[])": FunctionFragment;
    "getAmountOut(uint256,(bytes16,address[2],bytes)[])": FunctionFragment;
    "getPermissionLevel(address)": FunctionFragment;
    "getTraderAddressWithSelector(bytes16)": FunctionFragment;
    "hasPermissionLevel(address,bytes1)": FunctionFragment;
    "isRegisteredTrader(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "registerTrader(bytes16,address)": FunctionFragment;
    "removeTrader(bytes16,address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setPermission(address,bytes1)": FunctionFragment;
    "setUp()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "exchange"
      | "getAmountIn"
      | "getAmountOut"
      | "getPermissionLevel"
      | "getTraderAddressWithSelector"
      | "hasPermissionLevel"
      | "isRegisteredTrader"
      | "owner"
      | "registerTrader"
      | "removeTrader"
      | "renounceOwnership"
      | "setPermission"
      | "setUp"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "exchange",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      ManualExchangeStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAmountIn",
    values: [PromiseOrValue<BigNumberish>, ManualExchangeStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getAmountOut",
    values: [PromiseOrValue<BigNumberish>, ManualExchangeStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getPermissionLevel",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTraderAddressWithSelector",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasPermissionLevel",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "isRegisteredTrader",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerTrader",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeTrader",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setPermission",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "setUp", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "exchange", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAmountIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAmountOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPermissionLevel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTraderAddressWithSelector",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasPermissionLevel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isRegisteredTrader",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerTrader",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeTrader",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPermission",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setUp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "PermissionChanged(address,bytes1)": EventFragment;
    "RouteUpdated(address,address)": EventFragment;
    "SwapExecuted(address,address,address[2],uint256[2])": EventFragment;
    "TraderRegistered(address,bytes16)": EventFragment;
    "TraderRemoved(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PermissionChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouteUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SwapExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TraderRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TraderRemoved"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PermissionChangedEventObject {
  _address: string;
  newPermission: string;
}
export type PermissionChangedEvent = TypedEvent<
  [string, string],
  PermissionChangedEventObject
>;

export type PermissionChangedEventFilter =
  TypedEventFilter<PermissionChangedEvent>;

export interface RouteUpdatedEventObject {
  tokenIn: string;
  tokenOut: string;
}
export type RouteUpdatedEvent = TypedEvent<
  [string, string],
  RouteUpdatedEventObject
>;

export type RouteUpdatedEventFilter = TypedEventFilter<RouteUpdatedEvent>;

export interface SwapExecutedEventObject {
  executor: string;
  receiver: string;
  tokenInOut: [string, string];
  amountInOut: [BigNumber, BigNumber];
}
export type SwapExecutedEvent = TypedEvent<
  [string, string, [string, string], [BigNumber, BigNumber]],
  SwapExecutedEventObject
>;

export type SwapExecutedEventFilter = TypedEventFilter<SwapExecutedEvent>;

export interface TraderRegisteredEventObject {
  trader: string;
  selector: string;
}
export type TraderRegisteredEvent = TypedEvent<
  [string, string],
  TraderRegisteredEventObject
>;

export type TraderRegisteredEventFilter =
  TypedEventFilter<TraderRegisteredEvent>;

export interface TraderRemovedEventObject {
  trader: string;
}
export type TraderRemovedEvent = TypedEvent<[string], TraderRemovedEventObject>;

export type TraderRemovedEventFilter = TypedEventFilter<TraderRemovedEvent>;

export interface VestaDexTrader extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VestaDexTraderInterface;

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
    exchange(
      _receiver: PromiseOrValue<string>,
      _firstTokenIn: PromiseOrValue<string>,
      _firstAmountIn: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAmountIn(
      _amountOut: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountIn_: BigNumber }>;

    getAmountOut(
      _amountIn: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountOut_: BigNumber }>;

    getPermissionLevel(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getTraderAddressWithSelector(
      _selector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    hasPermissionLevel(
      _address: PromiseOrValue<string>,
      accessLevel: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isRegisteredTrader(
      _trader: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    registerTrader(
      _selector: PromiseOrValue<BytesLike>,
      _trader: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeTrader(
      _selector: PromiseOrValue<BytesLike>,
      _trader: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPermission(
      _address: PromiseOrValue<string>,
      _permission: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setUp(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  exchange(
    _receiver: PromiseOrValue<string>,
    _firstTokenIn: PromiseOrValue<string>,
    _firstAmountIn: PromiseOrValue<BigNumberish>,
    _requests: ManualExchangeStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAmountIn(
    _amountOut: PromiseOrValue<BigNumberish>,
    _requests: ManualExchangeStruct[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAmountOut(
    _amountIn: PromiseOrValue<BigNumberish>,
    _requests: ManualExchangeStruct[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPermissionLevel(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getTraderAddressWithSelector(
    _selector: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  hasPermissionLevel(
    _address: PromiseOrValue<string>,
    accessLevel: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isRegisteredTrader(
    _trader: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  registerTrader(
    _selector: PromiseOrValue<BytesLike>,
    _trader: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeTrader(
    _selector: PromiseOrValue<BytesLike>,
    _trader: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPermission(
    _address: PromiseOrValue<string>,
    _permission: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setUp(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    exchange(
      _receiver: PromiseOrValue<string>,
      _firstTokenIn: PromiseOrValue<string>,
      _firstAmountIn: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getAmountIn(
      _amountOut: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAmountOut(
      _amountIn: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPermissionLevel(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getTraderAddressWithSelector(
      _selector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    hasPermissionLevel(
      _address: PromiseOrValue<string>,
      accessLevel: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isRegisteredTrader(
      _trader: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    registerTrader(
      _selector: PromiseOrValue<BytesLike>,
      _trader: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeTrader(
      _selector: PromiseOrValue<BytesLike>,
      _trader: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setPermission(
      _address: PromiseOrValue<string>,
      _permission: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    setUp(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "PermissionChanged(address,bytes1)"(
      _address?: PromiseOrValue<string> | null,
      newPermission?: null
    ): PermissionChangedEventFilter;
    PermissionChanged(
      _address?: PromiseOrValue<string> | null,
      newPermission?: null
    ): PermissionChangedEventFilter;

    "RouteUpdated(address,address)"(
      tokenIn?: PromiseOrValue<string> | null,
      tokenOut?: PromiseOrValue<string> | null
    ): RouteUpdatedEventFilter;
    RouteUpdated(
      tokenIn?: PromiseOrValue<string> | null,
      tokenOut?: PromiseOrValue<string> | null
    ): RouteUpdatedEventFilter;

    "SwapExecuted(address,address,address[2],uint256[2])"(
      executor?: PromiseOrValue<string> | null,
      receiver?: PromiseOrValue<string> | null,
      tokenInOut?: null,
      amountInOut?: null
    ): SwapExecutedEventFilter;
    SwapExecuted(
      executor?: PromiseOrValue<string> | null,
      receiver?: PromiseOrValue<string> | null,
      tokenInOut?: null,
      amountInOut?: null
    ): SwapExecutedEventFilter;

    "TraderRegistered(address,bytes16)"(
      trader?: PromiseOrValue<string> | null,
      selector?: null
    ): TraderRegisteredEventFilter;
    TraderRegistered(
      trader?: PromiseOrValue<string> | null,
      selector?: null
    ): TraderRegisteredEventFilter;

    "TraderRemoved(address)"(
      trader?: PromiseOrValue<string> | null
    ): TraderRemovedEventFilter;
    TraderRemoved(
      trader?: PromiseOrValue<string> | null
    ): TraderRemovedEventFilter;
  };

  estimateGas: {
    exchange(
      _receiver: PromiseOrValue<string>,
      _firstTokenIn: PromiseOrValue<string>,
      _firstAmountIn: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAmountIn(
      _amountOut: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAmountOut(
      _amountIn: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPermissionLevel(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTraderAddressWithSelector(
      _selector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasPermissionLevel(
      _address: PromiseOrValue<string>,
      accessLevel: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isRegisteredTrader(
      _trader: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    registerTrader(
      _selector: PromiseOrValue<BytesLike>,
      _trader: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeTrader(
      _selector: PromiseOrValue<BytesLike>,
      _trader: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPermission(
      _address: PromiseOrValue<string>,
      _permission: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setUp(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    exchange(
      _receiver: PromiseOrValue<string>,
      _firstTokenIn: PromiseOrValue<string>,
      _firstAmountIn: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAmountIn(
      _amountOut: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAmountOut(
      _amountIn: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPermissionLevel(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTraderAddressWithSelector(
      _selector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasPermissionLevel(
      _address: PromiseOrValue<string>,
      accessLevel: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isRegisteredTrader(
      _trader: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    registerTrader(
      _selector: PromiseOrValue<BytesLike>,
      _trader: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeTrader(
      _selector: PromiseOrValue<BytesLike>,
      _trader: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPermission(
      _address: PromiseOrValue<string>,
      _permission: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setUp(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}