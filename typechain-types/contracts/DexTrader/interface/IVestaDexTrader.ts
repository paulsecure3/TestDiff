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
} from "../../../common";

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

export interface IVestaDexTraderInterface extends utils.Interface {
  functions: {
    "exchange(address,address,uint256,(bytes16,address[2],bytes)[])": FunctionFragment;
    "getAmountIn(uint256,(bytes16,address[2],bytes)[])": FunctionFragment;
    "getAmountOut(uint256,(bytes16,address[2],bytes)[])": FunctionFragment;
    "getTraderAddressWithSelector(bytes16)": FunctionFragment;
    "isRegisteredTrader(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "exchange"
      | "getAmountIn"
      | "getAmountOut"
      | "getTraderAddressWithSelector"
      | "isRegisteredTrader"
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
    functionFragment: "getTraderAddressWithSelector",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "isRegisteredTrader",
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
    functionFragment: "getTraderAddressWithSelector",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isRegisteredTrader",
    data: BytesLike
  ): Result;

  events: {
    "RouteUpdated(address,address)": EventFragment;
    "SwapExecuted(address,address,address[2],uint256[2])": EventFragment;
    "TraderRegistered(address,bytes16)": EventFragment;
    "TraderRemoved(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RouteUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SwapExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TraderRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TraderRemoved"): EventFragment;
}

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

export interface IVestaDexTrader extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IVestaDexTraderInterface;

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
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAmountOut(
      _amountIn: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getTraderAddressWithSelector(
      _selector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isRegisteredTrader(
      _trader: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
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
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAmountOut(
    _amountIn: PromiseOrValue<BigNumberish>,
    _requests: ManualExchangeStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getTraderAddressWithSelector(
    _selector: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  isRegisteredTrader(
    _trader: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

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

    getTraderAddressWithSelector(
      _selector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    isRegisteredTrader(
      _trader: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
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
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAmountOut(
      _amountIn: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getTraderAddressWithSelector(
      _selector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isRegisteredTrader(
      _trader: PromiseOrValue<string>,
      overrides?: CallOverrides
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
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAmountOut(
      _amountIn: PromiseOrValue<BigNumberish>,
      _requests: ManualExchangeStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getTraderAddressWithSelector(
      _selector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isRegisteredTrader(
      _trader: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
