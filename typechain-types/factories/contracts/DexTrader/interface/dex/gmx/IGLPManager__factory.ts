/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IGLPManager,
  IGLPManagerInterface,
} from "../../../../../../contracts/DexTrader/interface/dex/gmx/IGLPManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "bool",
        name: "maximise",
        type: "bool",
      },
    ],
    name: "getAum",
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
        internalType: "bool",
        name: "maximise",
        type: "bool",
      },
    ],
    name: "getAumInUsdg",
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
    inputs: [],
    name: "glp",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IGLPManager__factory {
  static readonly abi = _abi;
  static createInterface(): IGLPManagerInterface {
    return new utils.Interface(_abi) as IGLPManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGLPManager {
    return new Contract(address, _abi, signerOrProvider) as IGLPManager;
  }
}