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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../../../common";

export interface IOFTReceiverInterface extends utils.Interface {
  functions: {
    "onOFTReceived(uint16,bytes,uint64,bytes,uint256,bytes)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "onOFTReceived"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "onOFTReceived",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "onOFTReceived",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IOFTReceiver extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IOFTReceiverInterface;

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
    onOFTReceived(
      _srcChainId: PromiseOrValue<BigNumberish>,
      _srcAddress: PromiseOrValue<BytesLike>,
      _nonce: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  onOFTReceived(
    _srcChainId: PromiseOrValue<BigNumberish>,
    _srcAddress: PromiseOrValue<BytesLike>,
    _nonce: PromiseOrValue<BigNumberish>,
    _from: PromiseOrValue<BytesLike>,
    _amount: PromiseOrValue<BigNumberish>,
    _payload: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    onOFTReceived(
      _srcChainId: PromiseOrValue<BigNumberish>,
      _srcAddress: PromiseOrValue<BytesLike>,
      _nonce: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    onOFTReceived(
      _srcChainId: PromiseOrValue<BigNumberish>,
      _srcAddress: PromiseOrValue<BytesLike>,
      _nonce: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    onOFTReceived(
      _srcChainId: PromiseOrValue<BigNumberish>,
      _srcAddress: PromiseOrValue<BytesLike>,
      _nonce: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
