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
  PayableOverrides,
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
} from "../../../../../../common";

export interface IComposableOFTCoreInterface extends utils.Interface {
  functions: {
    "circulatingSupply()": FunctionFragment;
    "estimateSendAndCallFee(uint16,bytes,uint256,bytes,uint64,bool,bytes)": FunctionFragment;
    "estimateSendFee(uint16,bytes,uint256,bool,bytes)": FunctionFragment;
    "retryOFTReceived(uint16,bytes,uint64,bytes,address,uint256,bytes)": FunctionFragment;
    "sendAndCall(address,uint16,bytes,uint256,bytes,uint64,address,address,bytes)": FunctionFragment;
    "sendFrom(address,uint16,bytes,uint256,address,address,bytes)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "token()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "circulatingSupply"
      | "estimateSendAndCallFee"
      | "estimateSendFee"
      | "retryOFTReceived"
      | "sendAndCall"
      | "sendFrom"
      | "supportsInterface"
      | "token"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "circulatingSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "estimateSendAndCallFee",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "estimateSendFee",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "retryOFTReceived",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "sendAndCall",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "sendFrom",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "circulatingSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "estimateSendAndCallFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "estimateSendFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "retryOFTReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sendFrom", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;

  events: {
    "CallOFTReceivedFailure(uint16,bytes,uint64,bytes,address,uint256,bytes,bytes)": EventFragment;
    "CallOFTReceivedSuccess(uint16,bytes,uint64,bytes32)": EventFragment;
    "NonContractAddress(address)": EventFragment;
    "ReceiveFromChain(uint16,address,uint256)": EventFragment;
    "RetryOFTReceivedSuccess(bytes32)": EventFragment;
    "SendToChain(uint16,address,bytes,uint256)": EventFragment;
    "SetUseCustomAdapterParams(bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CallOFTReceivedFailure"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CallOFTReceivedSuccess"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NonContractAddress"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ReceiveFromChain"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RetryOFTReceivedSuccess"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SendToChain"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetUseCustomAdapterParams"): EventFragment;
}

export interface CallOFTReceivedFailureEventObject {
  _srcChainId: number;
  _srcAddress: string;
  _nonce: BigNumber;
  _from: string;
  _to: string;
  _amount: BigNumber;
  _payload: string;
  _reason: string;
}
export type CallOFTReceivedFailureEvent = TypedEvent<
  [number, string, BigNumber, string, string, BigNumber, string, string],
  CallOFTReceivedFailureEventObject
>;

export type CallOFTReceivedFailureEventFilter =
  TypedEventFilter<CallOFTReceivedFailureEvent>;

export interface CallOFTReceivedSuccessEventObject {
  _srcChainId: number;
  _srcAddress: string;
  _nonce: BigNumber;
  _hash: string;
}
export type CallOFTReceivedSuccessEvent = TypedEvent<
  [number, string, BigNumber, string],
  CallOFTReceivedSuccessEventObject
>;

export type CallOFTReceivedSuccessEventFilter =
  TypedEventFilter<CallOFTReceivedSuccessEvent>;

export interface NonContractAddressEventObject {
  _address: string;
}
export type NonContractAddressEvent = TypedEvent<
  [string],
  NonContractAddressEventObject
>;

export type NonContractAddressEventFilter =
  TypedEventFilter<NonContractAddressEvent>;

export interface ReceiveFromChainEventObject {
  _srcChainId: number;
  _to: string;
  _amount: BigNumber;
}
export type ReceiveFromChainEvent = TypedEvent<
  [number, string, BigNumber],
  ReceiveFromChainEventObject
>;

export type ReceiveFromChainEventFilter =
  TypedEventFilter<ReceiveFromChainEvent>;

export interface RetryOFTReceivedSuccessEventObject {
  _messageHash: string;
}
export type RetryOFTReceivedSuccessEvent = TypedEvent<
  [string],
  RetryOFTReceivedSuccessEventObject
>;

export type RetryOFTReceivedSuccessEventFilter =
  TypedEventFilter<RetryOFTReceivedSuccessEvent>;

export interface SendToChainEventObject {
  _dstChainId: number;
  _from: string;
  _toAddress: string;
  _amount: BigNumber;
}
export type SendToChainEvent = TypedEvent<
  [number, string, string, BigNumber],
  SendToChainEventObject
>;

export type SendToChainEventFilter = TypedEventFilter<SendToChainEvent>;

export interface SetUseCustomAdapterParamsEventObject {
  _useCustomAdapterParams: boolean;
}
export type SetUseCustomAdapterParamsEvent = TypedEvent<
  [boolean],
  SetUseCustomAdapterParamsEventObject
>;

export type SetUseCustomAdapterParamsEventFilter =
  TypedEventFilter<SetUseCustomAdapterParamsEvent>;

export interface IComposableOFTCore extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IComposableOFTCoreInterface;

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
    circulatingSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    estimateSendAndCallFee(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      _dstGasForCall: PromiseOrValue<BigNumberish>,
      _useZro: PromiseOrValue<boolean>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { nativeFee: BigNumber; zroFee: BigNumber }
    >;

    estimateSendFee(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _useZro: PromiseOrValue<boolean>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { nativeFee: BigNumber; zroFee: BigNumber }
    >;

    retryOFTReceived(
      _srcChainId: PromiseOrValue<BigNumberish>,
      _srcAddress: PromiseOrValue<BytesLike>,
      _nonce: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<BytesLike>,
      _to: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sendAndCall(
      _from: PromiseOrValue<string>,
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      _dstGasForCall: PromiseOrValue<BigNumberish>,
      _refundAddress: PromiseOrValue<string>,
      _zroPaymentAddress: PromiseOrValue<string>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sendFrom(
      _from: PromiseOrValue<string>,
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _refundAddress: PromiseOrValue<string>,
      _zroPaymentAddress: PromiseOrValue<string>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    token(overrides?: CallOverrides): Promise<[string]>;
  };

  circulatingSupply(overrides?: CallOverrides): Promise<BigNumber>;

  estimateSendAndCallFee(
    _dstChainId: PromiseOrValue<BigNumberish>,
    _toAddress: PromiseOrValue<BytesLike>,
    _amount: PromiseOrValue<BigNumberish>,
    _payload: PromiseOrValue<BytesLike>,
    _dstGasForCall: PromiseOrValue<BigNumberish>,
    _useZro: PromiseOrValue<boolean>,
    _adapterParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { nativeFee: BigNumber; zroFee: BigNumber }
  >;

  estimateSendFee(
    _dstChainId: PromiseOrValue<BigNumberish>,
    _toAddress: PromiseOrValue<BytesLike>,
    _amount: PromiseOrValue<BigNumberish>,
    _useZro: PromiseOrValue<boolean>,
    _adapterParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { nativeFee: BigNumber; zroFee: BigNumber }
  >;

  retryOFTReceived(
    _srcChainId: PromiseOrValue<BigNumberish>,
    _srcAddress: PromiseOrValue<BytesLike>,
    _nonce: PromiseOrValue<BigNumberish>,
    _from: PromiseOrValue<BytesLike>,
    _to: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _payload: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sendAndCall(
    _from: PromiseOrValue<string>,
    _dstChainId: PromiseOrValue<BigNumberish>,
    _toAddress: PromiseOrValue<BytesLike>,
    _amount: PromiseOrValue<BigNumberish>,
    _payload: PromiseOrValue<BytesLike>,
    _dstGasForCall: PromiseOrValue<BigNumberish>,
    _refundAddress: PromiseOrValue<string>,
    _zroPaymentAddress: PromiseOrValue<string>,
    _adapterParams: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sendFrom(
    _from: PromiseOrValue<string>,
    _dstChainId: PromiseOrValue<BigNumberish>,
    _toAddress: PromiseOrValue<BytesLike>,
    _amount: PromiseOrValue<BigNumberish>,
    _refundAddress: PromiseOrValue<string>,
    _zroPaymentAddress: PromiseOrValue<string>,
    _adapterParams: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  token(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    circulatingSupply(overrides?: CallOverrides): Promise<BigNumber>;

    estimateSendAndCallFee(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      _dstGasForCall: PromiseOrValue<BigNumberish>,
      _useZro: PromiseOrValue<boolean>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { nativeFee: BigNumber; zroFee: BigNumber }
    >;

    estimateSendFee(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _useZro: PromiseOrValue<boolean>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { nativeFee: BigNumber; zroFee: BigNumber }
    >;

    retryOFTReceived(
      _srcChainId: PromiseOrValue<BigNumberish>,
      _srcAddress: PromiseOrValue<BytesLike>,
      _nonce: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<BytesLike>,
      _to: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    sendAndCall(
      _from: PromiseOrValue<string>,
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      _dstGasForCall: PromiseOrValue<BigNumberish>,
      _refundAddress: PromiseOrValue<string>,
      _zroPaymentAddress: PromiseOrValue<string>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    sendFrom(
      _from: PromiseOrValue<string>,
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _refundAddress: PromiseOrValue<string>,
      _zroPaymentAddress: PromiseOrValue<string>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    token(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "CallOFTReceivedFailure(uint16,bytes,uint64,bytes,address,uint256,bytes,bytes)"(
      _srcChainId?: PromiseOrValue<BigNumberish> | null,
      _srcAddress?: null,
      _nonce?: null,
      _from?: null,
      _to?: PromiseOrValue<string> | null,
      _amount?: null,
      _payload?: null,
      _reason?: null
    ): CallOFTReceivedFailureEventFilter;
    CallOFTReceivedFailure(
      _srcChainId?: PromiseOrValue<BigNumberish> | null,
      _srcAddress?: null,
      _nonce?: null,
      _from?: null,
      _to?: PromiseOrValue<string> | null,
      _amount?: null,
      _payload?: null,
      _reason?: null
    ): CallOFTReceivedFailureEventFilter;

    "CallOFTReceivedSuccess(uint16,bytes,uint64,bytes32)"(
      _srcChainId?: PromiseOrValue<BigNumberish> | null,
      _srcAddress?: null,
      _nonce?: null,
      _hash?: null
    ): CallOFTReceivedSuccessEventFilter;
    CallOFTReceivedSuccess(
      _srcChainId?: PromiseOrValue<BigNumberish> | null,
      _srcAddress?: null,
      _nonce?: null,
      _hash?: null
    ): CallOFTReceivedSuccessEventFilter;

    "NonContractAddress(address)"(
      _address?: null
    ): NonContractAddressEventFilter;
    NonContractAddress(_address?: null): NonContractAddressEventFilter;

    "ReceiveFromChain(uint16,address,uint256)"(
      _srcChainId?: PromiseOrValue<BigNumberish> | null,
      _to?: PromiseOrValue<string> | null,
      _amount?: null
    ): ReceiveFromChainEventFilter;
    ReceiveFromChain(
      _srcChainId?: PromiseOrValue<BigNumberish> | null,
      _to?: PromiseOrValue<string> | null,
      _amount?: null
    ): ReceiveFromChainEventFilter;

    "RetryOFTReceivedSuccess(bytes32)"(
      _messageHash?: null
    ): RetryOFTReceivedSuccessEventFilter;
    RetryOFTReceivedSuccess(
      _messageHash?: null
    ): RetryOFTReceivedSuccessEventFilter;

    "SendToChain(uint16,address,bytes,uint256)"(
      _dstChainId?: PromiseOrValue<BigNumberish> | null,
      _from?: PromiseOrValue<string> | null,
      _toAddress?: null,
      _amount?: null
    ): SendToChainEventFilter;
    SendToChain(
      _dstChainId?: PromiseOrValue<BigNumberish> | null,
      _from?: PromiseOrValue<string> | null,
      _toAddress?: null,
      _amount?: null
    ): SendToChainEventFilter;

    "SetUseCustomAdapterParams(bool)"(
      _useCustomAdapterParams?: null
    ): SetUseCustomAdapterParamsEventFilter;
    SetUseCustomAdapterParams(
      _useCustomAdapterParams?: null
    ): SetUseCustomAdapterParamsEventFilter;
  };

  estimateGas: {
    circulatingSupply(overrides?: CallOverrides): Promise<BigNumber>;

    estimateSendAndCallFee(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      _dstGasForCall: PromiseOrValue<BigNumberish>,
      _useZro: PromiseOrValue<boolean>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    estimateSendFee(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _useZro: PromiseOrValue<boolean>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    retryOFTReceived(
      _srcChainId: PromiseOrValue<BigNumberish>,
      _srcAddress: PromiseOrValue<BytesLike>,
      _nonce: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<BytesLike>,
      _to: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sendAndCall(
      _from: PromiseOrValue<string>,
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      _dstGasForCall: PromiseOrValue<BigNumberish>,
      _refundAddress: PromiseOrValue<string>,
      _zroPaymentAddress: PromiseOrValue<string>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sendFrom(
      _from: PromiseOrValue<string>,
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _refundAddress: PromiseOrValue<string>,
      _zroPaymentAddress: PromiseOrValue<string>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    circulatingSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    estimateSendAndCallFee(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      _dstGasForCall: PromiseOrValue<BigNumberish>,
      _useZro: PromiseOrValue<boolean>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    estimateSendFee(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _useZro: PromiseOrValue<boolean>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    retryOFTReceived(
      _srcChainId: PromiseOrValue<BigNumberish>,
      _srcAddress: PromiseOrValue<BytesLike>,
      _nonce: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<BytesLike>,
      _to: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sendAndCall(
      _from: PromiseOrValue<string>,
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      _dstGasForCall: PromiseOrValue<BigNumberish>,
      _refundAddress: PromiseOrValue<string>,
      _zroPaymentAddress: PromiseOrValue<string>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sendFrom(
      _from: PromiseOrValue<string>,
      _dstChainId: PromiseOrValue<BigNumberish>,
      _toAddress: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _refundAddress: PromiseOrValue<string>,
      _zroPaymentAddress: PromiseOrValue<string>,
      _adapterParams: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}