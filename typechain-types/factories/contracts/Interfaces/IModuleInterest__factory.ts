/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IModuleInterest,
  IModuleInterestInterface,
} from "../../../contracts/Interfaces/IModuleInterest";

const _abi = [
  {
    inputs: [],
    name: "CannotBeZero",
    type: "error",
  },
  {
    inputs: [],
    name: "NoDebtFound",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInterestManager",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "debt",
        type: "uint256",
      },
    ],
    name: "DebtChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newEIR",
        type: "uint256",
      },
    ],
    name: "EIRChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "interest",
        type: "uint256",
      },
    ],
    name: "InterestMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "risk",
        type: "uint8",
      },
    ],
    name: "RiskChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "debt",
        type: "uint256",
      },
    ],
    name: "SystemDebtChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vault",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_debt",
        type: "uint256",
      },
    ],
    name: "decreaseDebt",
    outputs: [
      {
        internalType: "uint256",
        name: "addedInterest_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vault",
        type: "address",
      },
    ],
    name: "exit",
    outputs: [
      {
        internalType: "uint256",
        name: "addedInterest_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vault",
        type: "address",
      },
    ],
    name: "getDebtOf",
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
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getNotEmittedInterestRate",
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
        internalType: "address",
        name: "_vault",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_debt",
        type: "uint256",
      },
    ],
    name: "increaseDebt",
    outputs: [
      {
        internalType: "uint256",
        name: "addedInterest_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "syncWithProtocol",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_usdaPrice",
        type: "uint256",
      },
    ],
    name: "updateEIR",
    outputs: [
      {
        internalType: "uint256",
        name: "mintedInterest_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IModuleInterest__factory {
  static readonly abi = _abi;
  static createInterface(): IModuleInterestInterface {
    return new utils.Interface(_abi) as IModuleInterestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IModuleInterest {
    return new Contract(address, _abi, signerOrProvider) as IModuleInterest;
  }
}
