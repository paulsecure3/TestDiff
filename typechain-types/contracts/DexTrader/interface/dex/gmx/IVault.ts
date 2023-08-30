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
} from "../../../../../common";

export interface IVaultInterface extends utils.Interface {
  functions: {
    "adjustForDecimals(uint256,address,address)": FunctionFragment;
    "buyUSDG(address,address)": FunctionFragment;
    "getMaxPrice(address)": FunctionFragment;
    "getMinPrice(address)": FunctionFragment;
    "getTargetUsdgAmount(address)": FunctionFragment;
    "hasDynamicFees()": FunctionFragment;
    "mintBurnFeeBasisPoints()": FunctionFragment;
    "sellUSDG(address,address)": FunctionFragment;
    "stableSwapFeeBasisPoints()": FunctionFragment;
    "stableTaxBasisPoints()": FunctionFragment;
    "stableTokens(address)": FunctionFragment;
    "swap(address,address,address)": FunctionFragment;
    "swapFeeBasisPoints()": FunctionFragment;
    "taxBasisPoints()": FunctionFragment;
    "usdgAmounts(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "adjustForDecimals"
      | "buyUSDG"
      | "getMaxPrice"
      | "getMinPrice"
      | "getTargetUsdgAmount"
      | "hasDynamicFees"
      | "mintBurnFeeBasisPoints"
      | "sellUSDG"
      | "stableSwapFeeBasisPoints"
      | "stableTaxBasisPoints"
      | "stableTokens"
      | "swap"
      | "swapFeeBasisPoints"
      | "taxBasisPoints"
      | "usdgAmounts"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "adjustForDecimals",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "buyUSDG",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxPrice",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMinPrice",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTargetUsdgAmount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasDynamicFees",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintBurnFeeBasisPoints",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sellUSDG",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "stableSwapFeeBasisPoints",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stableTaxBasisPoints",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stableTokens",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swapFeeBasisPoints",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "taxBasisPoints",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "usdgAmounts",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "adjustForDecimals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buyUSDG", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getMaxPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMinPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTargetUsdgAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasDynamicFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintBurnFeeBasisPoints",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sellUSDG", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stableSwapFeeBasisPoints",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stableTaxBasisPoints",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stableTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "swapFeeBasisPoints",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "taxBasisPoints",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "usdgAmounts",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IVaultInterface;

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
    adjustForDecimals(
      _amount: PromiseOrValue<BigNumberish>,
      _tokenDiv: PromiseOrValue<string>,
      _tokenMul: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    buyUSDG(
      _token: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getMaxPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMinPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTargetUsdgAmount(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    hasDynamicFees(overrides?: CallOverrides): Promise<[boolean]>;

    mintBurnFeeBasisPoints(overrides?: CallOverrides): Promise<[BigNumber]>;

    sellUSDG(
      _token: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stableSwapFeeBasisPoints(overrides?: CallOverrides): Promise<[BigNumber]>;

    stableTaxBasisPoints(overrides?: CallOverrides): Promise<[BigNumber]>;

    stableTokens(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    swap(
      _tokenIn: PromiseOrValue<string>,
      _tokenOut: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swapFeeBasisPoints(overrides?: CallOverrides): Promise<[BigNumber]>;

    taxBasisPoints(overrides?: CallOverrides): Promise<[BigNumber]>;

    usdgAmounts(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  adjustForDecimals(
    _amount: PromiseOrValue<BigNumberish>,
    _tokenDiv: PromiseOrValue<string>,
    _tokenMul: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  buyUSDG(
    _token: PromiseOrValue<string>,
    _receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getMaxPrice(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMinPrice(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTargetUsdgAmount(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  hasDynamicFees(overrides?: CallOverrides): Promise<boolean>;

  mintBurnFeeBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

  sellUSDG(
    _token: PromiseOrValue<string>,
    _receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stableSwapFeeBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

  stableTaxBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

  stableTokens(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  swap(
    _tokenIn: PromiseOrValue<string>,
    _tokenOut: PromiseOrValue<string>,
    _receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swapFeeBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

  taxBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

  usdgAmounts(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    adjustForDecimals(
      _amount: PromiseOrValue<BigNumberish>,
      _tokenDiv: PromiseOrValue<string>,
      _tokenMul: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    buyUSDG(
      _token: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMinPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTargetUsdgAmount(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasDynamicFees(overrides?: CallOverrides): Promise<boolean>;

    mintBurnFeeBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

    sellUSDG(
      _token: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    stableSwapFeeBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

    stableTaxBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

    stableTokens(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    swap(
      _tokenIn: PromiseOrValue<string>,
      _tokenOut: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapFeeBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

    taxBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

    usdgAmounts(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    adjustForDecimals(
      _amount: PromiseOrValue<BigNumberish>,
      _tokenDiv: PromiseOrValue<string>,
      _tokenMul: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    buyUSDG(
      _token: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getMaxPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMinPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTargetUsdgAmount(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasDynamicFees(overrides?: CallOverrides): Promise<BigNumber>;

    mintBurnFeeBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

    sellUSDG(
      _token: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stableSwapFeeBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

    stableTaxBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

    stableTokens(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swap(
      _tokenIn: PromiseOrValue<string>,
      _tokenOut: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swapFeeBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

    taxBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;

    usdgAmounts(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    adjustForDecimals(
      _amount: PromiseOrValue<BigNumberish>,
      _tokenDiv: PromiseOrValue<string>,
      _tokenMul: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    buyUSDG(
      _token: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getMaxPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMinPrice(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTargetUsdgAmount(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasDynamicFees(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintBurnFeeBasisPoints(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sellUSDG(
      _token: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stableSwapFeeBasisPoints(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stableTaxBasisPoints(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stableTokens(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    swap(
      _tokenIn: PromiseOrValue<string>,
      _tokenOut: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swapFeeBasisPoints(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    taxBasisPoints(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    usdgAmounts(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}