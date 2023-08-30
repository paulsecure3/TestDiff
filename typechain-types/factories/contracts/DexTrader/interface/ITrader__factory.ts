/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ITrader,
  ITraderInterface,
} from "../../../../contracts/DexTrader/interface/ITrader";

const _abi = [
  {
    inputs: [],
    name: "AmountInAndOutAreZeroOrSameValue",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidRequestEncoding",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_request",
        type: "bytes",
      },
    ],
    name: "exchange",
    outputs: [
      {
        internalType: "uint256",
        name: "swapResponse_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_request",
        type: "bytes",
      },
    ],
    name: "getAmountIn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_request",
        type: "bytes",
      },
    ],
    name: "getAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class ITrader__factory {
  static readonly abi = _abi;
  static createInterface(): ITraderInterface {
    return new utils.Interface(_abi) as ITraderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITrader {
    return new Contract(address, _abi, signerOrProvider) as ITrader;
  }
}