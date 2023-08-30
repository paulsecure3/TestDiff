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
} from "../../../../common";

export declare namespace IStargateWidget {
  export type FeeObjStruct = {
    tenthBps: PromiseOrValue<BigNumberish>;
    feeCollector: PromiseOrValue<string>;
  };

  export type FeeObjStructOutput = [BigNumber, string] & {
    tenthBps: BigNumber;
    feeCollector: string;
  };
}

export declare namespace IStargateRouter {
  export type LzTxObjStruct = {
    dstGasForCall: PromiseOrValue<BigNumberish>;
    dstNativeAmount: PromiseOrValue<BigNumberish>;
    dstNativeAddr: PromiseOrValue<BytesLike>;
  };

  export type LzTxObjStructOutput = [BigNumber, BigNumber, string] & {
    dstGasForCall: BigNumber;
    dstNativeAmount: BigNumber;
    dstNativeAddr: string;
  };
}

export interface IStargateWidgetInterface extends utils.Interface {
  functions: {
    "partnerSwap(bytes2)": FunctionFragment;
    "swapETH(uint16,uint256,uint256,bytes,bytes2,(uint256,address))": FunctionFragment;
    "swapTokens(uint16,uint16,uint16,uint256,uint256,(uint256,uint256,bytes),bytes,bytes2,(uint256,address))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "partnerSwap" | "swapETH" | "swapTokens"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "partnerSwap",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "swapETH",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      IStargateWidget.FeeObjStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swapTokens",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      IStargateRouter.LzTxObjStruct,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      IStargateWidget.FeeObjStruct
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "partnerSwap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swapETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swapTokens", data: BytesLike): Result;

  events: {
    "PartnerSwap(bytes2)": EventFragment;
    "WidgetSwapped(bytes2,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PartnerSwap"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WidgetSwapped"): EventFragment;
}

export interface PartnerSwapEventObject {
  partnerId: string;
}
export type PartnerSwapEvent = TypedEvent<[string], PartnerSwapEventObject>;

export type PartnerSwapEventFilter = TypedEventFilter<PartnerSwapEvent>;

export interface WidgetSwappedEventObject {
  partnerId: string;
  tenthBps: BigNumber;
  widgetFee: BigNumber;
}
export type WidgetSwappedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  WidgetSwappedEventObject
>;

export type WidgetSwappedEventFilter = TypedEventFilter<WidgetSwappedEvent>;

export interface IStargateWidget extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IStargateWidgetInterface;

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
    partnerSwap(
      _partnerId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swapETH(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _amountLD: PromiseOrValue<BigNumberish>,
      _minAmountLD: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<BytesLike>,
      _partnerId: PromiseOrValue<BytesLike>,
      _feeObj: IStargateWidget.FeeObjStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swapTokens(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _srcPoolId: PromiseOrValue<BigNumberish>,
      _dstPoolId: PromiseOrValue<BigNumberish>,
      _amountLD: PromiseOrValue<BigNumberish>,
      _minAmountLD: PromiseOrValue<BigNumberish>,
      _lzTxParams: IStargateRouter.LzTxObjStruct,
      _to: PromiseOrValue<BytesLike>,
      _partnerId: PromiseOrValue<BytesLike>,
      _feeObj: IStargateWidget.FeeObjStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  partnerSwap(
    _partnerId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swapETH(
    _dstChainId: PromiseOrValue<BigNumberish>,
    _amountLD: PromiseOrValue<BigNumberish>,
    _minAmountLD: PromiseOrValue<BigNumberish>,
    _to: PromiseOrValue<BytesLike>,
    _partnerId: PromiseOrValue<BytesLike>,
    _feeObj: IStargateWidget.FeeObjStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swapTokens(
    _dstChainId: PromiseOrValue<BigNumberish>,
    _srcPoolId: PromiseOrValue<BigNumberish>,
    _dstPoolId: PromiseOrValue<BigNumberish>,
    _amountLD: PromiseOrValue<BigNumberish>,
    _minAmountLD: PromiseOrValue<BigNumberish>,
    _lzTxParams: IStargateRouter.LzTxObjStruct,
    _to: PromiseOrValue<BytesLike>,
    _partnerId: PromiseOrValue<BytesLike>,
    _feeObj: IStargateWidget.FeeObjStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    partnerSwap(
      _partnerId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    swapETH(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _amountLD: PromiseOrValue<BigNumberish>,
      _minAmountLD: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<BytesLike>,
      _partnerId: PromiseOrValue<BytesLike>,
      _feeObj: IStargateWidget.FeeObjStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    swapTokens(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _srcPoolId: PromiseOrValue<BigNumberish>,
      _dstPoolId: PromiseOrValue<BigNumberish>,
      _amountLD: PromiseOrValue<BigNumberish>,
      _minAmountLD: PromiseOrValue<BigNumberish>,
      _lzTxParams: IStargateRouter.LzTxObjStruct,
      _to: PromiseOrValue<BytesLike>,
      _partnerId: PromiseOrValue<BytesLike>,
      _feeObj: IStargateWidget.FeeObjStruct,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "PartnerSwap(bytes2)"(
      partnerId?: PromiseOrValue<BytesLike> | null
    ): PartnerSwapEventFilter;
    PartnerSwap(
      partnerId?: PromiseOrValue<BytesLike> | null
    ): PartnerSwapEventFilter;

    "WidgetSwapped(bytes2,uint256,uint256)"(
      partnerId?: PromiseOrValue<BytesLike> | null,
      tenthBps?: null,
      widgetFee?: null
    ): WidgetSwappedEventFilter;
    WidgetSwapped(
      partnerId?: PromiseOrValue<BytesLike> | null,
      tenthBps?: null,
      widgetFee?: null
    ): WidgetSwappedEventFilter;
  };

  estimateGas: {
    partnerSwap(
      _partnerId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swapETH(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _amountLD: PromiseOrValue<BigNumberish>,
      _minAmountLD: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<BytesLike>,
      _partnerId: PromiseOrValue<BytesLike>,
      _feeObj: IStargateWidget.FeeObjStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swapTokens(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _srcPoolId: PromiseOrValue<BigNumberish>,
      _dstPoolId: PromiseOrValue<BigNumberish>,
      _amountLD: PromiseOrValue<BigNumberish>,
      _minAmountLD: PromiseOrValue<BigNumberish>,
      _lzTxParams: IStargateRouter.LzTxObjStruct,
      _to: PromiseOrValue<BytesLike>,
      _partnerId: PromiseOrValue<BytesLike>,
      _feeObj: IStargateWidget.FeeObjStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    partnerSwap(
      _partnerId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swapETH(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _amountLD: PromiseOrValue<BigNumberish>,
      _minAmountLD: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<BytesLike>,
      _partnerId: PromiseOrValue<BytesLike>,
      _feeObj: IStargateWidget.FeeObjStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swapTokens(
      _dstChainId: PromiseOrValue<BigNumberish>,
      _srcPoolId: PromiseOrValue<BigNumberish>,
      _dstPoolId: PromiseOrValue<BigNumberish>,
      _amountLD: PromiseOrValue<BigNumberish>,
      _minAmountLD: PromiseOrValue<BigNumberish>,
      _lzTxParams: IStargateRouter.LzTxObjStruct,
      _to: PromiseOrValue<BytesLike>,
      _partnerId: PromiseOrValue<BytesLike>,
      _feeObj: IStargateWidget.FeeObjStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
