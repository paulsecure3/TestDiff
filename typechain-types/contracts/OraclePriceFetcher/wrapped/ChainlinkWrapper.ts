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

export declare namespace IOracleWrapper {
  export type SavedResponseStruct = {
    currentPrice: PromiseOrValue<BigNumberish>;
    lastPrice: PromiseOrValue<BigNumberish>;
    lastUpdate: PromiseOrValue<BigNumberish>;
  };

  export type SavedResponseStructOutput = [BigNumber, BigNumber, BigNumber] & {
    currentPrice: BigNumber;
    lastPrice: BigNumber;
    lastUpdate: BigNumber;
  };
}

export interface ChainlinkWrapperInterface extends utils.Interface {
  functions: {
    "TARGET_DIGITS()": FunctionFragment;
    "addOracle(address,address,address)": FunctionFragment;
    "aggregators(address)": FunctionFragment;
    "fetchPrice(address)": FunctionFragment;
    "flagSEQOffline()": FunctionFragment;
    "flagsContract()": FunctionFragment;
    "getCurrentPrice(address)": FunctionFragment;
    "getExternalPrice(address)": FunctionFragment;
    "getLastPrice(address)": FunctionFragment;
    "lastSavedResponses(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "removeOracle(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "retriveSavedResponses(address)": FunctionFragment;
    "savedResponses(address)": FunctionFragment;
    "setFlagContract(address)": FunctionFragment;
    "setFlagSEQ(address)": FunctionFragment;
    "setUp(address,address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "TARGET_DIGITS"
      | "addOracle"
      | "aggregators"
      | "fetchPrice"
      | "flagSEQOffline"
      | "flagsContract"
      | "getCurrentPrice"
      | "getExternalPrice"
      | "getLastPrice"
      | "lastSavedResponses"
      | "owner"
      | "removeOracle"
      | "renounceOwnership"
      | "retriveSavedResponses"
      | "savedResponses"
      | "setFlagContract"
      | "setFlagSEQ"
      | "setUp"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "TARGET_DIGITS",
    values?: undefined
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
    functionFragment: "aggregators",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "fetchPrice",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "flagSEQOffline",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "flagsContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentPrice",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getExternalPrice",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getLastPrice",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "lastSavedResponses",
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
    functionFragment: "retriveSavedResponses",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "savedResponses",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setFlagContract",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setFlagSEQ",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setUp",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "TARGET_DIGITS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addOracle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "aggregators",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fetchPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "flagSEQOffline",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "flagsContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getExternalPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLastPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastSavedResponses",
    data: BytesLike
  ): Result;
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
    functionFragment: "retriveSavedResponses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "savedResponses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFlagContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFlagSEQ", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setUp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "OracleAdded(address,address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OracleAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OracleAddedEventObject {
  _token: string;
  _priceAggregator: string;
  _indexAggregator: string;
}
export type OracleAddedEvent = TypedEvent<
  [string, string, string],
  OracleAddedEventObject
>;

export type OracleAddedEventFilter = TypedEventFilter<OracleAddedEvent>;

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

export interface ChainlinkWrapper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ChainlinkWrapperInterface;

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
    TARGET_DIGITS(overrides?: CallOverrides): Promise<[BigNumber]>;

    addOracle(
      _token: PromiseOrValue<string>,
      _priceAggregator: PromiseOrValue<string>,
      _indexAggregator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    aggregators(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string, string] & { price: string; index: string }>;

    fetchPrice(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    flagSEQOffline(overrides?: CallOverrides): Promise<[string]>;

    flagsContract(overrides?: CallOverrides): Promise<[string]>;

    getCurrentPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getExternalPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getLastPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    lastSavedResponses(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        price: BigNumber;
        index: BigNumber;
        lastUpdate: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeOracle(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    retriveSavedResponses(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    savedResponses(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        price: BigNumber;
        index: BigNumber;
        lastUpdate: BigNumber;
      }
    >;

    setFlagContract(
      _flagsContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFlagSEQ(
      _newFlagSEQ: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setUp(
      _flagSEQ: PromiseOrValue<string>,
      _flagContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  TARGET_DIGITS(overrides?: CallOverrides): Promise<BigNumber>;

  addOracle(
    _token: PromiseOrValue<string>,
    _priceAggregator: PromiseOrValue<string>,
    _indexAggregator: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  aggregators(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[string, string] & { price: string; index: string }>;

  fetchPrice(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  flagSEQOffline(overrides?: CallOverrides): Promise<string>;

  flagsContract(overrides?: CallOverrides): Promise<string>;

  getCurrentPrice(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getExternalPrice(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getLastPrice(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  lastSavedResponses(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      price: BigNumber;
      index: BigNumber;
      lastUpdate: BigNumber;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  removeOracle(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  retriveSavedResponses(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  savedResponses(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      price: BigNumber;
      index: BigNumber;
      lastUpdate: BigNumber;
    }
  >;

  setFlagContract(
    _flagsContract: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFlagSEQ(
    _newFlagSEQ: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setUp(
    _flagSEQ: PromiseOrValue<string>,
    _flagContract: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    TARGET_DIGITS(overrides?: CallOverrides): Promise<BigNumber>;

    addOracle(
      _token: PromiseOrValue<string>,
      _priceAggregator: PromiseOrValue<string>,
      _indexAggregator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    aggregators(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string, string] & { price: string; index: string }>;

    fetchPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    flagSEQOffline(overrides?: CallOverrides): Promise<string>;

    flagsContract(overrides?: CallOverrides): Promise<string>;

    getCurrentPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExternalPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLastPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastSavedResponses(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        price: BigNumber;
        index: BigNumber;
        lastUpdate: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    removeOracle(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    retriveSavedResponses(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<IOracleWrapper.SavedResponseStructOutput>;

    savedResponses(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        price: BigNumber;
        index: BigNumber;
        lastUpdate: BigNumber;
      }
    >;

    setFlagContract(
      _flagsContract: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFlagSEQ(
      _newFlagSEQ: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setUp(
      _flagSEQ: PromiseOrValue<string>,
      _flagContract: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OracleAdded(address,address,address)"(
      _token?: PromiseOrValue<string> | null,
      _priceAggregator?: null,
      _indexAggregator?: null
    ): OracleAddedEventFilter;
    OracleAdded(
      _token?: PromiseOrValue<string> | null,
      _priceAggregator?: null,
      _indexAggregator?: null
    ): OracleAddedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    TARGET_DIGITS(overrides?: CallOverrides): Promise<BigNumber>;

    addOracle(
      _token: PromiseOrValue<string>,
      _priceAggregator: PromiseOrValue<string>,
      _indexAggregator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    aggregators(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fetchPrice(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    flagSEQOffline(overrides?: CallOverrides): Promise<BigNumber>;

    flagsContract(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExternalPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLastPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastSavedResponses(
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

    retriveSavedResponses(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    savedResponses(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setFlagContract(
      _flagsContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFlagSEQ(
      _newFlagSEQ: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setUp(
      _flagSEQ: PromiseOrValue<string>,
      _flagContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    TARGET_DIGITS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addOracle(
      _token: PromiseOrValue<string>,
      _priceAggregator: PromiseOrValue<string>,
      _indexAggregator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    aggregators(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fetchPrice(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    flagSEQOffline(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    flagsContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getExternalPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLastPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastSavedResponses(
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

    retriveSavedResponses(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    savedResponses(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setFlagContract(
      _flagsContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFlagSEQ(
      _newFlagSEQ: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setUp(
      _flagSEQ: PromiseOrValue<string>,
      _flagContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
