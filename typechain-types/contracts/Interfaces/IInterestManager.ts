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

export interface IInterestManagerInterface extends utils.Interface {
  functions: {
    "decreaseDebt(address,address,uint256)": FunctionFragment;
    "exit(address,address)": FunctionFragment;
    "getInterestModule(address)": FunctionFragment;
    "getLastUSDAPrice()": FunctionFragment;
    "getModules()": FunctionFragment;
    "getUserDebt(address,address)": FunctionFragment;
    "increaseDebt(address,address,uint256)": FunctionFragment;
    "updateModules()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "decreaseDebt"
      | "exit"
      | "getInterestModule"
      | "getLastUSDAPrice"
      | "getModules"
      | "getUserDebt"
      | "increaseDebt"
      | "updateModules"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "decreaseDebt",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "exit",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getInterestModule",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getLastUSDAPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getModules",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUserDebt",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseDebt",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateModules",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "decreaseDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getInterestModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLastUSDAPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getModules", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUserDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateModules",
    data: BytesLike
  ): Result;

  events: {
    "DebtChanged(address,address,uint256)": EventFragment;
    "InterestMinted(address,uint256)": EventFragment;
    "ModuleLinked(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DebtChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "InterestMinted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ModuleLinked"): EventFragment;
}

export interface DebtChangedEventObject {
  token: string;
  user: string;
  newDebt: BigNumber;
}
export type DebtChangedEvent = TypedEvent<
  [string, string, BigNumber],
  DebtChangedEventObject
>;

export type DebtChangedEventFilter = TypedEventFilter<DebtChangedEvent>;

export interface InterestMintedEventObject {
  module: string;
  interestMinted: BigNumber;
}
export type InterestMintedEvent = TypedEvent<
  [string, BigNumber],
  InterestMintedEventObject
>;

export type InterestMintedEventFilter = TypedEventFilter<InterestMintedEvent>;

export interface ModuleLinkedEventObject {
  token: string;
  module: string;
}
export type ModuleLinkedEvent = TypedEvent<
  [string, string],
  ModuleLinkedEventObject
>;

export type ModuleLinkedEventFilter = TypedEventFilter<ModuleLinkedEvent>;

export interface IInterestManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IInterestManagerInterface;

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
    decreaseDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _debt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    exit(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getInterestModule(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getLastUSDAPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    getModules(overrides?: CallOverrides): Promise<[string[]]>;

    getUserDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        currentDebt_: BigNumber;
        pendingInterest_: BigNumber;
      }
    >;

    increaseDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _debt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateModules(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  decreaseDebt(
    _token: PromiseOrValue<string>,
    _user: PromiseOrValue<string>,
    _debt: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  exit(
    _token: PromiseOrValue<string>,
    _user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getInterestModule(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getLastUSDAPrice(overrides?: CallOverrides): Promise<BigNumber>;

  getModules(overrides?: CallOverrides): Promise<string[]>;

  getUserDebt(
    _token: PromiseOrValue<string>,
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      currentDebt_: BigNumber;
      pendingInterest_: BigNumber;
    }
  >;

  increaseDebt(
    _token: PromiseOrValue<string>,
    _user: PromiseOrValue<string>,
    _debt: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateModules(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    decreaseDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _debt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exit(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInterestModule(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getLastUSDAPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getModules(overrides?: CallOverrides): Promise<string[]>;

    getUserDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        currentDebt_: BigNumber;
        pendingInterest_: BigNumber;
      }
    >;

    increaseDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _debt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateModules(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "DebtChanged(address,address,uint256)"(
      token?: PromiseOrValue<string> | null,
      user?: PromiseOrValue<string> | null,
      newDebt?: null
    ): DebtChangedEventFilter;
    DebtChanged(
      token?: PromiseOrValue<string> | null,
      user?: PromiseOrValue<string> | null,
      newDebt?: null
    ): DebtChangedEventFilter;

    "InterestMinted(address,uint256)"(
      module?: PromiseOrValue<string> | null,
      interestMinted?: null
    ): InterestMintedEventFilter;
    InterestMinted(
      module?: PromiseOrValue<string> | null,
      interestMinted?: null
    ): InterestMintedEventFilter;

    "ModuleLinked(address,address)"(
      token?: PromiseOrValue<string> | null,
      module?: PromiseOrValue<string> | null
    ): ModuleLinkedEventFilter;
    ModuleLinked(
      token?: PromiseOrValue<string> | null,
      module?: PromiseOrValue<string> | null
    ): ModuleLinkedEventFilter;
  };

  estimateGas: {
    decreaseDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _debt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    exit(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getInterestModule(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLastUSDAPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getModules(overrides?: CallOverrides): Promise<BigNumber>;

    getUserDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increaseDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _debt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateModules(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    decreaseDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _debt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    exit(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getInterestModule(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLastUSDAPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getModules(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUserDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    increaseDebt(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      _debt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateModules(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}