/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IBaseVesta,
  IBaseVestaInterface,
} from "../../../../contracts/DexTrader/interface/IBaseVesta";

const _abi = [
  {
    inputs: [],
    name: "CannotBeNativeChainToken",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidContract",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPermission",
    type: "error",
  },
  {
    inputs: [],
    name: "NonReentrancy",
    type: "error",
  },
  {
    inputs: [],
    name: "NumberIsZero",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_paramValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_msgValue",
        type: "uint256",
      },
    ],
    name: "SanitizeMsgValueFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes1",
        name: "newPermission",
        type: "bytes1",
      },
    ],
    name: "PermissionChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getPermissionLevel",
    outputs: [
      {
        internalType: "bytes1",
        name: "",
        type: "bytes1",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "bytes1",
        name: "_accessLevel",
        type: "bytes1",
      },
    ],
    name: "hasPermissionLevel",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "bytes1",
        name: "_permission",
        type: "bytes1",
      },
    ],
    name: "setPermission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IBaseVesta__factory {
  static readonly abi = _abi;
  static createInterface(): IBaseVestaInterface {
    return new utils.Interface(_abi) as IBaseVestaInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IBaseVesta {
    return new Contract(address, _abi, signerOrProvider) as IBaseVesta;
  }
}