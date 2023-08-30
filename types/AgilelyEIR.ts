/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
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
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface AgilelyEIRInterface extends utils.Interface {
  contractName: "AgilelyEIR";
  functions: {
    "COMPOUND()": FunctionFragment;
    "PRECISION()": FunctionFragment;
    "YEAR_MINUTE()": FunctionFragment;
    "calculateEIR(uint8,uint256)": FunctionFragment;
    "compound(uint256,uint256,uint256)": FunctionFragment;
    "crops(address)": FunctionFragment;
    "currentEIR()": FunctionFragment;
    "decreaseDebt(address,uint256)": FunctionFragment;
    "exit(address)": FunctionFragment;
    "getDebtOf(address)": FunctionFragment;
    "getNotEmittedInterestRate(address)": FunctionFragment;
    "increaseDebt(address,uint256)": FunctionFragment;
    "interestManager()": FunctionFragment;
    "interestMinted()": FunctionFragment;
    "lastUpdate()": FunctionFragment;
    "name()": FunctionFragment;
    "netAssetsPerShareWAD()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "risk()": FunctionFragment;
    "setRisk(uint8)": FunctionFragment;
    "setUp(address,string,uint8)": FunctionFragment;
    "share()": FunctionFragment;
    "shareOf(address)": FunctionFragment;
    "stock()": FunctionFragment;
    "syncWithProtocol(uint256)": FunctionFragment;
    "totalDebt()": FunctionFragment;
    "totalWeight()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateEIR(uint256)": FunctionFragment;
    "userShares(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "COMPOUND", values?: undefined): string;
  encodeFunctionData(functionFragment: "PRECISION", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "YEAR_MINUTE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "calculateEIR",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "compound",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "crops", values: [string]): string;
  encodeFunctionData(
    functionFragment: "currentEIR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "decreaseDebt",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "exit", values: [string]): string;
  encodeFunctionData(functionFragment: "getDebtOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getNotEmittedInterestRate",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseDebt",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "interestManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "interestMinted",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lastUpdate",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "netAssetsPerShareWAD",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "risk", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setRisk",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setUp",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "share", values?: undefined): string;
  encodeFunctionData(functionFragment: "shareOf", values: [string]): string;
  encodeFunctionData(functionFragment: "stock", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "syncWithProtocol",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "totalDebt", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalWeight",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateEIR",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "userShares", values: [string]): string;

  decodeFunctionResult(functionFragment: "COMPOUND", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "PRECISION", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "YEAR_MINUTE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateEIR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "compound", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "crops", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "currentEIR", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getDebtOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getNotEmittedInterestRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "interestManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "interestMinted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lastUpdate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "netAssetsPerShareWAD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "risk", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRisk", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setUp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "share", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "shareOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "syncWithProtocol",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalDebt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalWeight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "updateEIR", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "userShares", data: BytesLike): Result;

  events: {
    "DebtChanged(address,uint256)": EventFragment;
    "EIRChanged(uint256)": EventFragment;
    "Exit(uint256)": EventFragment;
    "Flee()": EventFragment;
    "Initialized(uint8)": EventFragment;
    "InterestMinted(uint256)": EventFragment;
    "Join(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "RiskChanged(uint8)": EventFragment;
    "SystemDebtChanged(uint256)": EventFragment;
    "Tack(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DebtChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EIRChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Exit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Flee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "InterestMinted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Join"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RiskChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SystemDebtChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Tack"): EventFragment;
}

export type DebtChangedEvent = TypedEvent<
  [string, BigNumber],
  { user: string; debt: BigNumber }
>;

export type DebtChangedEventFilter = TypedEventFilter<DebtChangedEvent>;

export type EIRChangedEvent = TypedEvent<[BigNumber], { newEIR: BigNumber }>;

export type EIRChangedEventFilter = TypedEventFilter<EIRChangedEvent>;

export type ExitEvent = TypedEvent<[BigNumber], { val: BigNumber }>;

export type ExitEventFilter = TypedEventFilter<ExitEvent>;

export type FleeEvent = TypedEvent<[], {}>;

export type FleeEventFilter = TypedEventFilter<FleeEvent>;

export type InitializedEvent = TypedEvent<[number], { version: number }>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export type InterestMintedEvent = TypedEvent<
  [BigNumber],
  { interest: BigNumber }
>;

export type InterestMintedEventFilter = TypedEventFilter<InterestMintedEvent>;

export type JoinEvent = TypedEvent<[BigNumber], { val: BigNumber }>;

export type JoinEventFilter = TypedEventFilter<JoinEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type RiskChangedEvent = TypedEvent<[number], { risk: number }>;

export type RiskChangedEventFilter = TypedEventFilter<RiskChangedEvent>;

export type SystemDebtChangedEvent = TypedEvent<
  [BigNumber],
  { debt: BigNumber }
>;

export type SystemDebtChangedEventFilter =
  TypedEventFilter<SystemDebtChangedEvent>;

export type TackEvent = TypedEvent<
  [string, string, BigNumber],
  { src: string; dst: string; wad: BigNumber }
>;

export type TackEventFilter = TypedEventFilter<TackEvent>;

export interface AgilelyEIR extends BaseContract {
  contractName: "AgilelyEIR";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AgilelyEIRInterface;

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
    COMPOUND(overrides?: CallOverrides): Promise<[BigNumber]>;

    PRECISION(overrides?: CallOverrides): Promise<[BigNumber]>;

    YEAR_MINUTE(overrides?: CallOverrides): Promise<[BigNumber]>;

    calculateEIR(
      _risk: BigNumberish,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    compound(
      _eir: BigNumberish,
      _debt: BigNumberish,
      _timeInYear: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    crops(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    currentEIR(overrides?: CallOverrides): Promise<[BigNumber]>;

    decreaseDebt(
      _vault: string,
      _debt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exit(
      _vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getDebtOf(_vault: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getNotEmittedInterestRate(
      user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    increaseDebt(
      _vault: string,
      _debt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    interestManager(overrides?: CallOverrides): Promise<[string]>;

    interestMinted(overrides?: CallOverrides): Promise<[BigNumber]>;

    lastUpdate(overrides?: CallOverrides): Promise<[BigNumber]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    netAssetsPerShareWAD(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    risk(overrides?: CallOverrides): Promise<[number]>;

    setRisk(
      _newRisk: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setUp(
      _interestManager: string,
      _moduleName: string,
      _defaultRisk: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    share(overrides?: CallOverrides): Promise<[BigNumber]>;

    shareOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    stock(overrides?: CallOverrides): Promise<[BigNumber]>;

    syncWithProtocol(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalDebt(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalWeight(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateEIR(
      _usdaPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    userShares(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  COMPOUND(overrides?: CallOverrides): Promise<BigNumber>;

  PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

  YEAR_MINUTE(overrides?: CallOverrides): Promise<BigNumber>;

  calculateEIR(
    _risk: BigNumberish,
    _price: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  compound(
    _eir: BigNumberish,
    _debt: BigNumberish,
    _timeInYear: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  crops(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  currentEIR(overrides?: CallOverrides): Promise<BigNumber>;

  decreaseDebt(
    _vault: string,
    _debt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exit(
    _vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getDebtOf(_vault: string, overrides?: CallOverrides): Promise<BigNumber>;

  getNotEmittedInterestRate(
    user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  increaseDebt(
    _vault: string,
    _debt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  interestManager(overrides?: CallOverrides): Promise<string>;

  interestMinted(overrides?: CallOverrides): Promise<BigNumber>;

  lastUpdate(overrides?: CallOverrides): Promise<BigNumber>;

  name(overrides?: CallOverrides): Promise<string>;

  netAssetsPerShareWAD(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  risk(overrides?: CallOverrides): Promise<number>;

  setRisk(
    _newRisk: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setUp(
    _interestManager: string,
    _moduleName: string,
    _defaultRisk: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  share(overrides?: CallOverrides): Promise<BigNumber>;

  shareOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  stock(overrides?: CallOverrides): Promise<BigNumber>;

  syncWithProtocol(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalDebt(overrides?: CallOverrides): Promise<BigNumber>;

  totalWeight(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateEIR(
    _usdaPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  userShares(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    COMPOUND(overrides?: CallOverrides): Promise<BigNumber>;

    PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    YEAR_MINUTE(overrides?: CallOverrides): Promise<BigNumber>;

    calculateEIR(
      _risk: BigNumberish,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compound(
      _eir: BigNumberish,
      _debt: BigNumberish,
      _timeInYear: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    crops(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    currentEIR(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseDebt(
      _vault: string,
      _debt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exit(_vault: string, overrides?: CallOverrides): Promise<BigNumber>;

    getDebtOf(_vault: string, overrides?: CallOverrides): Promise<BigNumber>;

    getNotEmittedInterestRate(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increaseDebt(
      _vault: string,
      _debt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    interestManager(overrides?: CallOverrides): Promise<string>;

    interestMinted(overrides?: CallOverrides): Promise<BigNumber>;

    lastUpdate(overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<string>;

    netAssetsPerShareWAD(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    risk(overrides?: CallOverrides): Promise<number>;

    setRisk(_newRisk: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setUp(
      _interestManager: string,
      _moduleName: string,
      _defaultRisk: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    share(overrides?: CallOverrides): Promise<BigNumber>;

    shareOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    stock(overrides?: CallOverrides): Promise<BigNumber>;

    syncWithProtocol(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    totalDebt(overrides?: CallOverrides): Promise<BigNumber>;

    totalWeight(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateEIR(
      _usdaPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userShares(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "DebtChanged(address,uint256)"(
      user?: null,
      debt?: null
    ): DebtChangedEventFilter;
    DebtChanged(user?: null, debt?: null): DebtChangedEventFilter;

    "EIRChanged(uint256)"(newEIR?: null): EIRChangedEventFilter;
    EIRChanged(newEIR?: null): EIRChangedEventFilter;

    "Exit(uint256)"(val?: null): ExitEventFilter;
    Exit(val?: null): ExitEventFilter;

    "Flee()"(): FleeEventFilter;
    Flee(): FleeEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "InterestMinted(uint256)"(interest?: null): InterestMintedEventFilter;
    InterestMinted(interest?: null): InterestMintedEventFilter;

    "Join(uint256)"(val?: null): JoinEventFilter;
    Join(val?: null): JoinEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "RiskChanged(uint8)"(risk?: null): RiskChangedEventFilter;
    RiskChanged(risk?: null): RiskChangedEventFilter;

    "SystemDebtChanged(uint256)"(debt?: null): SystemDebtChangedEventFilter;
    SystemDebtChanged(debt?: null): SystemDebtChangedEventFilter;

    "Tack(address,address,uint256)"(
      src?: string | null,
      dst?: string | null,
      wad?: null
    ): TackEventFilter;
    Tack(src?: string | null, dst?: string | null, wad?: null): TackEventFilter;
  };

  estimateGas: {
    COMPOUND(overrides?: CallOverrides): Promise<BigNumber>;

    PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    YEAR_MINUTE(overrides?: CallOverrides): Promise<BigNumber>;

    calculateEIR(
      _risk: BigNumberish,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compound(
      _eir: BigNumberish,
      _debt: BigNumberish,
      _timeInYear: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    crops(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    currentEIR(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseDebt(
      _vault: string,
      _debt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exit(
      _vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getDebtOf(_vault: string, overrides?: CallOverrides): Promise<BigNumber>;

    getNotEmittedInterestRate(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increaseDebt(
      _vault: string,
      _debt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    interestManager(overrides?: CallOverrides): Promise<BigNumber>;

    interestMinted(overrides?: CallOverrides): Promise<BigNumber>;

    lastUpdate(overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    netAssetsPerShareWAD(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    risk(overrides?: CallOverrides): Promise<BigNumber>;

    setRisk(
      _newRisk: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setUp(
      _interestManager: string,
      _moduleName: string,
      _defaultRisk: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    share(overrides?: CallOverrides): Promise<BigNumber>;

    shareOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    stock(overrides?: CallOverrides): Promise<BigNumber>;

    syncWithProtocol(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalDebt(overrides?: CallOverrides): Promise<BigNumber>;

    totalWeight(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateEIR(
      _usdaPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    userShares(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    COMPOUND(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PRECISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    YEAR_MINUTE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    calculateEIR(
      _risk: BigNumberish,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compound(
      _eir: BigNumberish,
      _debt: BigNumberish,
      _timeInYear: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    crops(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentEIR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseDebt(
      _vault: string,
      _debt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exit(
      _vault: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getDebtOf(
      _vault: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNotEmittedInterestRate(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    increaseDebt(
      _vault: string,
      _debt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    interestManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    interestMinted(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastUpdate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    netAssetsPerShareWAD(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    risk(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setRisk(
      _newRisk: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setUp(
      _interestManager: string,
      _moduleName: string,
      _defaultRisk: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    share(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    shareOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    syncWithProtocol(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalDebt(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalWeight(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateEIR(
      _usdaPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    userShares(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
