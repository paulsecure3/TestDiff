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
} from "../../../common";

export interface IBaseVestaInterface extends utils.Interface {
  functions: {
    "getPermissionLevel(address)": FunctionFragment;
    "hasPermissionLevel(address,bytes1)": FunctionFragment;
    "setPermission(address,bytes1)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getPermissionLevel"
      | "hasPermissionLevel"
      | "setPermission"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getPermissionLevel",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasPermissionLevel",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "setPermission",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "getPermissionLevel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasPermissionLevel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPermission",
    data: BytesLike
  ): Result;

  events: {
    "PermissionChanged(address,bytes1)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PermissionChanged"): EventFragment;
}

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

export interface IBaseVesta extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IBaseVestaInterface;

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
    getPermissionLevel(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    hasPermissionLevel(
      _address: PromiseOrValue<string>,
      _accessLevel: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    setPermission(
      _address: PromiseOrValue<string>,
      _permission: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getPermissionLevel(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  hasPermissionLevel(
    _address: PromiseOrValue<string>,
    _accessLevel: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  setPermission(
    _address: PromiseOrValue<string>,
    _permission: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getPermissionLevel(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    hasPermissionLevel(
      _address: PromiseOrValue<string>,
      _accessLevel: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setPermission(
      _address: PromiseOrValue<string>,
      _permission: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "PermissionChanged(address,bytes1)"(
      _address?: PromiseOrValue<string> | null,
      newPermission?: null
    ): PermissionChangedEventFilter;
    PermissionChanged(
      _address?: PromiseOrValue<string> | null,
      newPermission?: null
    ): PermissionChangedEventFilter;
  };

  estimateGas: {
    getPermissionLevel(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasPermissionLevel(
      _address: PromiseOrValue<string>,
      _accessLevel: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setPermission(
      _address: PromiseOrValue<string>,
      _permission: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getPermissionLevel(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasPermissionLevel(
      _address: PromiseOrValue<string>,
      _accessLevel: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setPermission(
      _address: PromiseOrValue<string>,
      _permission: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
