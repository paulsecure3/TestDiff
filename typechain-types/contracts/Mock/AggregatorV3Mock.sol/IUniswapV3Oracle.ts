/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
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
} from "../../../common";

export interface IUniswapV3OracleInterface extends utils.Interface {
  functions: {
    "consult(address,uint256,address)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "consult"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "consult",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "consult", data: BytesLike): Result;

  events: {};
}

export interface IUniswapV3Oracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IUniswapV3OracleInterface;

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
    consult(
      tokenIn: PromiseOrValue<string>,
      amountIn: PromiseOrValue<BigNumberish>,
      tokenOut: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountOut: BigNumber }>;
  };

  consult(
    tokenIn: PromiseOrValue<string>,
    amountIn: PromiseOrValue<BigNumberish>,
    tokenOut: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    consult(
      tokenIn: PromiseOrValue<string>,
      amountIn: PromiseOrValue<BigNumberish>,
      tokenOut: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    consult(
      tokenIn: PromiseOrValue<string>,
      amountIn: PromiseOrValue<BigNumberish>,
      tokenOut: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    consult(
      tokenIn: PromiseOrValue<string>,
      amountIn: PromiseOrValue<BigNumberish>,
      tokenOut: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}