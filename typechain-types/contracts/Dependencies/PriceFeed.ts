/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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

export interface PriceFeedInterface extends utils.Interface {
  functions: {
    "accesses(address)": FunctionFragment;
    "addOracle(address,address,address)": FunctionFragment;
    "changeVerificator(address)": FunctionFragment;
    "fetchPrice(address)": FunctionFragment;
    "getExternalPrice(address)": FunctionFragment;
    "lastGoodPrice(address)": FunctionFragment;
    "oracles(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "removeOracle(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAccessTo(address,bool)": FunctionFragment;
    "setUp(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "verificator()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "accesses"
      | "addOracle"
      | "changeVerificator"
      | "fetchPrice"
      | "getExternalPrice"
      | "lastGoodPrice"
      | "oracles"
      | "owner"
      | "removeOracle"
      | "renounceOwnership"
      | "setAccessTo"
      | "setUp"
      | "transferOwnership"
      | "verificator"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "accesses",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "addOracle",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "changeVerificator",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "fetchPrice",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getExternalPrice",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "lastGoodPrice",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "oracles",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeOracle",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAccessTo",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setUp",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "verificator",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "accesses", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addOracle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeVerificator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fetchPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getExternalPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastGoodPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "oracles", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAccessTo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setUp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verificator",
    data: BytesLike
  ): Result;

  events: {
    "AccessChanged(address,bool)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "OracleAdded(address,address,address)": EventFragment;
    "OracleRemoved(address)": EventFragment;
    "OracleVerificationChanged(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "TokenPriceUpdated(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AccessChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OracleAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OracleRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OracleVerificationChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenPriceUpdated"): EventFragment;
}

export interface AccessChangedEventObject {
  _token: string;
  _hasAccess: boolean;
}
export type AccessChangedEvent = TypedEvent<
  [string, boolean],
  AccessChangedEventObject
>;

export type AccessChangedEventFilter = TypedEventFilter<AccessChangedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OracleAddedEventObject {
  _token: string;
  _primaryWrappedOracle: string;
  _secondaryWrappedOracle: string;
}
export type OracleAddedEvent = TypedEvent<
  [string, string, string],
  OracleAddedEventObject
>;

export type OracleAddedEventFilter = TypedEventFilter<OracleAddedEvent>;

export interface OracleRemovedEventObject {
  _token: string;
}
export type OracleRemovedEvent = TypedEvent<[string], OracleRemovedEventObject>;

export type OracleRemovedEventFilter = TypedEventFilter<OracleRemovedEvent>;

export interface OracleVerificationChangedEventObject {
  _newVerificator: string;
}
export type OracleVerificationChangedEvent = TypedEvent<
  [string],
  OracleVerificationChangedEventObject
>;

export type OracleVerificationChangedEventFilter =
  TypedEventFilter<OracleVerificationChangedEvent>;

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

export interface TokenPriceUpdatedEventObject {
  _token: string;
  _price: BigNumber;
}
export type TokenPriceUpdatedEvent = TypedEvent<
  [string, BigNumber],
  TokenPriceUpdatedEventObject
>;

export type TokenPriceUpdatedEventFilter =
  TypedEventFilter<TokenPriceUpdatedEvent>;

export interface PriceFeed extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PriceFeedInterface;

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
    accesses(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    addOracle(
      _token: PromiseOrValue<string>,
      _primaryOracle: PromiseOrValue<string>,
      _secondaryOracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    changeVerificator(
      _verificator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fetchPrice(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getExternalPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    lastGoodPrice(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    oracles(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string] & { primaryWrapper: string; secondaryWrapper: string }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeOracle(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAccessTo(
      _addr: PromiseOrValue<string>,
      _hasAccess: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setUp(
      _verificator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    verificator(overrides?: CallOverrides): Promise<[string]>;
  };

  accesses(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  addOracle(
    _token: PromiseOrValue<string>,
    _primaryOracle: PromiseOrValue<string>,
    _secondaryOracle: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  changeVerificator(
    _verificator: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fetchPrice(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getExternalPrice(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  lastGoodPrice(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  oracles(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [string, string] & { primaryWrapper: string; secondaryWrapper: string }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  removeOracle(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAccessTo(
    _addr: PromiseOrValue<string>,
    _hasAccess: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setUp(
    _verificator: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  verificator(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    accesses(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    addOracle(
      _token: PromiseOrValue<string>,
      _primaryOracle: PromiseOrValue<string>,
      _secondaryOracle: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    changeVerificator(
      _verificator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    fetchPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExternalPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastGoodPrice(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    oracles(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string] & { primaryWrapper: string; secondaryWrapper: string }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    removeOracle(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setAccessTo(
      _addr: PromiseOrValue<string>,
      _hasAccess: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setUp(
      _verificator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    verificator(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "AccessChanged(address,bool)"(
      _token?: PromiseOrValue<string> | null,
      _hasAccess?: null
    ): AccessChangedEventFilter;
    AccessChanged(
      _token?: PromiseOrValue<string> | null,
      _hasAccess?: null
    ): AccessChangedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OracleAdded(address,address,address)"(
      _token?: PromiseOrValue<string> | null,
      _primaryWrappedOracle?: null,
      _secondaryWrappedOracle?: null
    ): OracleAddedEventFilter;
    OracleAdded(
      _token?: PromiseOrValue<string> | null,
      _primaryWrappedOracle?: null,
      _secondaryWrappedOracle?: null
    ): OracleAddedEventFilter;

    "OracleRemoved(address)"(
      _token?: PromiseOrValue<string> | null
    ): OracleRemovedEventFilter;
    OracleRemoved(
      _token?: PromiseOrValue<string> | null
    ): OracleRemovedEventFilter;

    "OracleVerificationChanged(address)"(
      _newVerificator?: PromiseOrValue<string> | null
    ): OracleVerificationChangedEventFilter;
    OracleVerificationChanged(
      _newVerificator?: PromiseOrValue<string> | null
    ): OracleVerificationChangedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "TokenPriceUpdated(address,uint256)"(
      _token?: PromiseOrValue<string> | null,
      _price?: null
    ): TokenPriceUpdatedEventFilter;
    TokenPriceUpdated(
      _token?: PromiseOrValue<string> | null,
      _price?: null
    ): TokenPriceUpdatedEventFilter;
  };

  estimateGas: {
    accesses(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addOracle(
      _token: PromiseOrValue<string>,
      _primaryOracle: PromiseOrValue<string>,
      _secondaryOracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    changeVerificator(
      _verificator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fetchPrice(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getExternalPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastGoodPrice(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    oracles(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    removeOracle(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAccessTo(
      _addr: PromiseOrValue<string>,
      _hasAccess: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setUp(
      _verificator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    verificator(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    accesses(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addOracle(
      _token: PromiseOrValue<string>,
      _primaryOracle: PromiseOrValue<string>,
      _secondaryOracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    changeVerificator(
      _verificator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fetchPrice(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getExternalPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastGoodPrice(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    oracles(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeOracle(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAccessTo(
      _addr: PromiseOrValue<string>,
      _hasAccess: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setUp(
      _verificator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    verificator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
