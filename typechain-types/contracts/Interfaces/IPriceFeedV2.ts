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

export interface IPriceFeedV2Interface extends utils.Interface {
  functions: {
    "addOracle(address,address,address)": FunctionFragment;
    "fetchPrice(address)": FunctionFragment;
    "getExternalPrice(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "addOracle" | "fetchPrice" | "getExternalPrice"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addOracle",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "fetchPrice",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getExternalPrice",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "addOracle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fetchPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getExternalPrice",
    data: BytesLike
  ): Result;

  events: {
    "AccessChanged(address,bool)": EventFragment;
    "OracleAdded(address,address,address)": EventFragment;
    "OracleRemoved(address)": EventFragment;
    "OracleVerificationChanged(address)": EventFragment;
    "TokenPriceUpdated(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AccessChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OracleAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OracleRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OracleVerificationChanged"): EventFragment;
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

export interface IPriceFeedV2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IPriceFeedV2Interface;

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
    addOracle(
      _token: PromiseOrValue<string>,
      _primaryOracle: PromiseOrValue<string>,
      _secondaryOracle: PromiseOrValue<string>,
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
  };

  addOracle(
    _token: PromiseOrValue<string>,
    _primaryOracle: PromiseOrValue<string>,
    _secondaryOracle: PromiseOrValue<string>,
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

  callStatic: {
    addOracle(
      _token: PromiseOrValue<string>,
      _primaryOracle: PromiseOrValue<string>,
      _secondaryOracle: PromiseOrValue<string>,
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
    addOracle(
      _token: PromiseOrValue<string>,
      _primaryOracle: PromiseOrValue<string>,
      _secondaryOracle: PromiseOrValue<string>,
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
  };

  populateTransaction: {
    addOracle(
      _token: PromiseOrValue<string>,
      _primaryOracle: PromiseOrValue<string>,
      _secondaryOracle: PromiseOrValue<string>,
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
  };
}