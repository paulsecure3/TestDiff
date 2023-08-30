/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IStargateFactory,
  IStargateFactoryInterface,
} from "../../../../../contracts/Dependencies/layerzero/interfaces/IStargateFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_srcPoolId",
        type: "uint256",
      },
    ],
    name: "getPool",
    outputs: [
      {
        internalType: "contract IStargatePool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IStargateFactory__factory {
  static readonly abi = _abi;
  static createInterface(): IStargateFactoryInterface {
    return new utils.Interface(_abi) as IStargateFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IStargateFactory {
    return new Contract(address, _abi, signerOrProvider) as IStargateFactory;
  }
}