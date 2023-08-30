/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  StabilityPoolScript,
  StabilityPoolScriptInterface,
} from "../../../contracts/Proxy/StabilityPoolScript";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IStabilityPool",
        name: "_stabilityPool",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "NAME",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
    name: "provideToSP",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_upperHint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lowerHint",
        type: "address",
      },
    ],
    name: "withdrawAssetGainToTrove",
    outputs: [],
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
    name: "withdrawFromSP",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161046138038061046183398101604081905261002f916100f7565b61003881610049565b6001600160a01b0316608052610127565b6001600160a01b0381166100a45760405162461bcd60e51b815260206004820152601e60248201527f4163636f756e742063616e6e6f74206265207a65726f2061646472657373000060448201526064015b60405180910390fd5b803b806100f35760405162461bcd60e51b815260206004820181905260248201527f4163636f756e7420636f64652073697a652063616e6e6f74206265207a65726f604482015260640161009b565b5050565b60006020828403121561010957600080fd5b81516001600160a01b038116811461012057600080fd5b9392505050565b60805161031261014f6000396000818160ea0152818161016801526101c601526103126000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80632e54bf951461005157806378c77a2414610066578063a3f4df7e14610079578063c2eeb958146100c1575b600080fd5b61006461005f366004610226565b6100d4565b005b610064610074366004610226565b610152565b6100ab6040518060400160405280601381526020017214dd18589a5b1a5d1e541bdbdb14d8dc9a5c1d606a1b81525081565b6040516100b8919061023f565b60405180910390f35b6100646100cf3660046102a9565b61019f565b604051632e54bf9560e01b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e54bf95906024015b600060405180830381600087803b15801561013757600080fd5b505af115801561014b573d6000803e3d6000fd5b5050505050565b604051631e31de8960e21b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906378c77a249060240161011d565b60405163185dd72b60e31b81526001600160a01b03838116600483015282811660248301527f0000000000000000000000000000000000000000000000000000000000000000169063c2eeb95890604401600060405180830381600087803b15801561020a57600080fd5b505af115801561021e573d6000803e3d6000fd5b505050505050565b60006020828403121561023857600080fd5b5035919050565b600060208083528351808285015260005b8181101561026c57858101830151858201604001528201610250565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146102a457600080fd5b919050565b600080604083850312156102bc57600080fd5b6102c58361028d565b91506102d36020840161028d565b9050925092905056fea264697066735822122030f67f49b32ba624854d9c494011208c4ba160d8099937d498298d9084dd2bc564736f6c63430008130033";

type StabilityPoolScriptConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StabilityPoolScriptConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StabilityPoolScript__factory extends ContractFactory {
  constructor(...args: StabilityPoolScriptConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _stabilityPool: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StabilityPoolScript> {
    return super.deploy(
      _stabilityPool,
      overrides || {}
    ) as Promise<StabilityPoolScript>;
  }
  override getDeployTransaction(
    _stabilityPool: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_stabilityPool, overrides || {});
  }
  override attach(address: string): StabilityPoolScript {
    return super.attach(address) as StabilityPoolScript;
  }
  override connect(signer: Signer): StabilityPoolScript__factory {
    return super.connect(signer) as StabilityPoolScript__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StabilityPoolScriptInterface {
    return new utils.Interface(_abi) as StabilityPoolScriptInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StabilityPoolScript {
    return new Contract(address, _abi, signerOrProvider) as StabilityPoolScript;
  }
}
