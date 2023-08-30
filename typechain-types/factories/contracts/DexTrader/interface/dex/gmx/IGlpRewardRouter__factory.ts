/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IGlpRewardRouter,
  IGlpRewardRouterInterface,
} from "../../../../../../contracts/DexTrader/interface/dex/gmx/IGlpRewardRouter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minUsdg",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minGlp",
        type: "uint256",
      },
    ],
    name: "mintAndStakeGlp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "_tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_glpAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minOut",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "unstakeAndRedeemGlp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IGlpRewardRouter__factory {
  static readonly abi = _abi;
  static createInterface(): IGlpRewardRouterInterface {
    return new utils.Interface(_abi) as IGlpRewardRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGlpRewardRouter {
    return new Contract(address, _abi, signerOrProvider) as IGlpRewardRouter;
  }
}