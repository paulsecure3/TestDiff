/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IGMXRewardTracker,
  IGMXRewardTrackerInterface,
} from "../../../contracts/Interfaces/IGMXRewardTracker";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
    ],
    name: "claimable",
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
    name: "tokensPerInterval",
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
    name: "totalSupply",
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

export class IGMXRewardTracker__factory {
  static readonly abi = _abi;
  static createInterface(): IGMXRewardTrackerInterface {
    return new utils.Interface(_abi) as IGMXRewardTrackerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGMXRewardTracker {
    return new Contract(address, _abi, signerOrProvider) as IGMXRewardTracker;
  }
}
