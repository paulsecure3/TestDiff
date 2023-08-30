/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IPriceOracleV1,
  IPriceOracleV1Interface,
} from "../../../contracts/Interfaces/IPriceOracleV1";

const _abi = [
  {
    inputs: [],
    name: "AddressNotTrusted",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "getPriceData",
    outputs: [
      {
        internalType: "uint256",
        name: "_currentPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lastPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lastUpdate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_node",
        type: "address",
      },
    ],
    name: "registerTrustedNode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
    ],
    name: "setDecimals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_node",
        type: "address",
      },
    ],
    name: "unregisterTrustedNode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IPriceOracleV1__factory {
  static readonly abi = _abi;
  static createInterface(): IPriceOracleV1Interface {
    return new utils.Interface(_abi) as IPriceOracleV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPriceOracleV1 {
    return new Contract(address, _abi, signerOrProvider) as IPriceOracleV1;
  }
}
