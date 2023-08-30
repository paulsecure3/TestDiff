/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  AGLBase,
  AGLBaseInterface,
} from "../../../contracts/Core/AGLBase";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "VaultParametersBaseChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "DECIMAL_PRECISION",
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
    name: "ETH_REF_ADDRESS",
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
  {
    inputs: [],
    name: "aglParams",
    outputs: [
      {
        internalType: "contract IAGLParameters",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
    ],
    name: "getEntireSystemColl",
    outputs: [
      {
        internalType: "uint256",
        name: "entireSystemColl",
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
        name: "_asset",
        type: "address",
      },
    ],
    name: "getEntireSystemDebt",
    outputs: [
      {
        internalType: "uint256",
        name: "entireSystemDebt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultParams",
        type: "address",
      },
    ],
    name: "setAGLParameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610732806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80639e86d0c4116100665780639e86d0c4146100f9578063a20baee61461010c578063b398aaf11461011b578063f2fde38b1461012e578063fe30525b1461014157600080fd5b806327d04b3514610098578063715018a6146100be57806372141e63146100c85780638da5cb5b146100e8575b600080fd5b6100ab6100a6366004610681565b610154565b6040519081526020015b60405180910390f35b6100c6610336565b005b6100d0600081565b6040516001600160a01b0390911681526020016100b5565b6033546001600160a01b03166100d0565b6100ab610107366004610681565b61034a565b6100ab670de0b6b3a764000081565b6065546100d0906001600160a01b031681565b6100c661013c366004610681565b6104db565b6100c661014f366004610681565b610559565b600080606560009054906101000a90046001600160a01b03166001600160a01b0316637f7dde4a6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ce91906106a5565b60405163104a6a6560e01b81526001600160a01b038581166004830152919091169063104a6a6590602401602060405180830381865afa158015610216573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061023a91906106c2565b90506000606560009054906101000a90046001600160a01b03166001600160a01b0316633cc742256040518163ffffffff1660e01b8152600401602060405180830381865afa158015610291573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102b591906106a5565b60405163104a6a6560e01b81526001600160a01b038681166004830152919091169063104a6a65906024015b602060405180830381865afa1580156102fe573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032291906106c2565b905061032e82826105ab565b949350505050565b61033e6105c0565b610348600061061a565b565b600080606560009054906101000a90046001600160a01b03166001600160a01b0316637f7dde4a6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103c491906106a5565b604051635373433f60e01b81526001600160a01b0385811660048301529190911690635373433f90602401602060405180830381865afa15801561040c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061043091906106c2565b90506000606560009054906101000a90046001600160a01b03166001600160a01b0316633cc742256040518163ffffffff1660e01b8152600401602060405180830381865afa158015610487573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ab91906106a5565b604051635373433f60e01b81526001600160a01b0386811660048301529190911690635373433f906024016102e1565b6104e36105c0565b6001600160a01b03811661054d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6105568161061a565b50565b6105616105c0565b606580546001600160a01b0319166001600160a01b0383169081179091556040517f98c5e303d085e26fdf8af6a41184b0937ed01142ae7fdfa02dcc87e7079c325390600090a250565b60006105b782846106db565b90505b92915050565b6033546001600160a01b031633146103485760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610544565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038116811461055657600080fd5b60006020828403121561069357600080fd5b813561069e8161066c565b9392505050565b6000602082840312156106b757600080fd5b815161069e8161066c565b6000602082840312156106d457600080fd5b5051919050565b808201808211156105ba57634e487b7160e01b600052601160045260246000fdfea2646970667358221220d6958ea599e48f8a87d6552b63ef6bf7c2962d115219610be77c5761ab850d5f64736f6c63430008130033";

type AGLBaseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AGLBaseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AGLBase__factory extends ContractFactory {
  constructor(...args: AGLBaseConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AGLBase> {
    return super.deploy(overrides || {}) as Promise<AGLBase>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): AGLBase {
    return super.attach(address) as AGLBase;
  }
  override connect(signer: Signer): AGLBase__factory {
    return super.connect(signer) as AGLBase__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AGLBaseInterface {
    return new utils.Interface(_abi) as AGLBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AGLBase {
    return new Contract(address, _abi, signerOrProvider) as AGLBase;
  }
}
