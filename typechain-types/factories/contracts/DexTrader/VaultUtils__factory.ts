/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  VaultUtils,
  VaultUtilsInterface,
} from "../../../contracts/DexTrader/VaultUtils";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_vault",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BASIS_POINTS_DIVISOR",
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
    name: "FUNDING_RATE_PRECISION",
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
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_usdgAmount",
        type: "uint256",
      },
    ],
    name: "getBuyUsdgFeeBasisPoints",
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
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_usdgDelta",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_feeBasisPoints",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_taxBasisPoints",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_increment",
        type: "bool",
      },
    ],
    name: "getFeeBasisPoints",
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
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_usdgAmount",
        type: "uint256",
      },
    ],
    name: "getSellUsdgFeeBasisPoints",
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
        name: "_tokenIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_usdgAmount",
        type: "uint256",
      },
    ],
    name: "getSwapFeeBasisPoints",
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
    name: "vault",
    outputs: [
      {
        internalType: "contract IVault",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610b6b380380610b6b83398101604081905261002f916100ae565b6001600160a01b0381166100895760405162461bcd60e51b815260206004820152601560248201527f496e76616c6964205661756c7420416464726573730000000000000000000000604482015260640160405180910390fd5b600080546001600160a01b0319166001600160a01b03929092169190911790556100de565b6000602082840312156100c057600080fd5b81516001600160a01b03811681146100d757600080fd5b9392505050565b610a7e806100ed6000396000f3fe608060405234801561001057600080fd5b506004361061006d5760003560e01c8063126082cf146100725780634adeddc61461008e5780636be6026b146100a1578063c7e074c3146100ab578063da133816146100be578063eb0835bf146100d1578063fbfa77cf146100e4575b600080fd5b61007b61271081565b6040519081526020015b60405180910390f35b61007b61009c3660046108cb565b61010f565b61007b620f424081565b61007b6100b9366004610906565b610210565b61007b6100cc36600461095a565b6104a1565b61007b6100df3660046108cb565b6107b7565b6000546100f7906001600160a01b031681565b6040516001600160a01b039091168152602001610085565b6000610207838360008054906101000a90046001600160a01b03166001600160a01b0316634d47b3046040518163ffffffff1660e01b8152600401602060405180830381865afa158015610167573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061018b9190610996565b60008054906101000a90046001600160a01b03166001600160a01b0316637a210a2b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101dc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102009190610996565b6001610210565b90505b92915050565b60008060009054906101000a90046001600160a01b03166001600160a01b0316639f392eb36040518163ffffffff1660e01b8152600401602060405180830381865afa158015610264573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061028891906109af565b610293575082610498565b60008054604051631aa4ace560e01b81526001600160a01b03898116600483015290911690631aa4ace590602401602060405180830381865afa1580156102de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103029190610996565b9050600061031087836109e9565b9050836103335781871161032d5761032887836109fc565b610330565b60005b90505b60008054604051633a05dcc160e01b81526001600160a01b038b8116600483015290911690633a05dcc190602401602060405180830381865afa15801561037e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a29190610996565b9050806000036103b757869350505050610498565b60008184116103cf576103ca84836109fc565b6103d9565b6103d982856109fc565b905060008284116103f3576103ee84846109fc565b6103fd565b6103fd83856109fc565b90508181101561044657600083610414848b610a0f565b61041e9190610a26565b905089811161043657610431818b6109fc565b610439565b60005b9650505050505050610498565b6000600261045483856109e9565b61045e9190610a26565b90508381111561046b5750825b600084610478838c610a0f565b6104829190610a26565b905061048e818c6109e9565b9750505050505050505b95945050505050565b600080546040516342b60b0360e01b81526001600160a01b038681166004830152839216906342b60b0390602401602060405180830381865afa1580156104ec573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051091906109af565b801561058557506000546040516342b60b0360e01b81526001600160a01b038681166004830152909116906342b60b0390602401602060405180830381865afa158015610561573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058591906109af565b90506000816106085760008054906101000a90046001600160a01b03166001600160a01b031663a22f23926040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105df573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106039190610996565b61067d565b60008054906101000a90046001600160a01b03166001600160a01b031663df73a2676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610659573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067d9190610996565b90506000826107005760008054906101000a90046001600160a01b03166001600160a01b0316637a210a2b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156106d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106fb9190610996565b610775565b60008054906101000a90046001600160a01b03166001600160a01b03166310eb56c26040518163ffffffff1660e01b8152600401602060405180830381865afa158015610751573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107759190610996565b90506000610787888785856001610210565b90506000610799888886866000610210565b90508082116107a857806107aa565b815b9998505050505050505050565b6000610207838360008054906101000a90046001600160a01b03166001600160a01b0316634d47b3046040518163ffffffff1660e01b8152600401602060405180830381865afa15801561080f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108339190610996565b60008054906101000a90046001600160a01b03166001600160a01b0316637a210a2b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610884573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a89190610996565b6000610210565b80356001600160a01b03811681146108c657600080fd5b919050565b600080604083850312156108de57600080fd5b6108e7836108af565b946020939093013593505050565b801515811461090357600080fd5b50565b600080600080600060a0868803121561091e57600080fd5b610927866108af565b9450602086013593506040860135925060608601359150608086013561094c816108f5565b809150509295509295909350565b60008060006060848603121561096f57600080fd5b610978846108af565b9250610986602085016108af565b9150604084013590509250925092565b6000602082840312156109a857600080fd5b5051919050565b6000602082840312156109c157600080fd5b81516109cc816108f5565b9392505050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561020a5761020a6109d3565b8181038181111561020a5761020a6109d3565b808202811582820484141761020a5761020a6109d3565b600082610a4357634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220e828bf8c03ebe9e7246832be3411fdaa768cfbd2aa48f969e19a21fef901b7a264736f6c63430008130033";

type VaultUtilsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VaultUtilsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VaultUtils__factory extends ContractFactory {
  constructor(...args: VaultUtilsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _vault: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<VaultUtils> {
    return super.deploy(_vault, overrides || {}) as Promise<VaultUtils>;
  }
  override getDeployTransaction(
    _vault: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_vault, overrides || {});
  }
  override attach(address: string): VaultUtils {
    return super.attach(address) as VaultUtils;
  }
  override connect(signer: Signer): VaultUtils__factory {
    return super.connect(signer) as VaultUtils__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VaultUtilsInterface {
    return new utils.Interface(_abi) as VaultUtilsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VaultUtils {
    return new Contract(address, _abi, signerOrProvider) as VaultUtils;
  }
}
