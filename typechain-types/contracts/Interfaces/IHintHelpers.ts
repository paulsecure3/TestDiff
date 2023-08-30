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
} from "../../common";

export interface IHintHelpersInterface extends utils.Interface {
  functions: {
    "getRedemptionHints(address,uint256,uint256,uint256)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "getRedemptionHints"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getRedemptionHints",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "getRedemptionHints",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IHintHelpers extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IHintHelpersInterface;

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
    getRedemptionHints(
      _asset: PromiseOrValue<string>,
      _USDAamount: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _maxIterations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getRedemptionHints(
    _asset: PromiseOrValue<string>,
    _USDAamount: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    _maxIterations: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getRedemptionHints(
      _asset: PromiseOrValue<string>,
      _USDAamount: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _maxIterations: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber] & {
        firstRedemptionHint: string;
        partialRedemptionHintNICR: BigNumber;
        truncatedUSDAamount: BigNumber;
      }
    >;
  };

  filters: {};

  estimateGas: {
    getRedemptionHints(
      _asset: PromiseOrValue<string>,
      _USDAamount: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _maxIterations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getRedemptionHints(
      _asset: PromiseOrValue<string>,
      _USDAamount: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _maxIterations: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
