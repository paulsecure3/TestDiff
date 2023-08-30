/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BigNumberish,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ERC20Mock,
  ERC20MockInterface,
} from "../../../contracts/Test/ERC20Mock";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approveInternal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
    inputs: [],
    name: "symbol",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferInternal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060408190526005805460ff1916601217905562000e2938819003908190833981016040819052620000329162000137565b828260036200004283826200024b565b5060046200005182826200024b565b50506005805460ff191660ff93909316929092179091555062000317915050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200009a57600080fd5b81516001600160401b0380821115620000b757620000b762000072565b604051601f8301601f19908116603f01168101908282118183101715620000e257620000e262000072565b81604052838152602092508683858801011115620000ff57600080fd5b600091505b8382101562000123578582018301518183018401529082019062000104565b600093810190920192909252949350505050565b6000806000606084860312156200014d57600080fd5b83516001600160401b03808211156200016557600080fd5b620001738783880162000088565b945060208601519150808211156200018a57600080fd5b50620001998682870162000088565b925050604084015160ff81168114620001b157600080fd5b809150509250925092565b600181811c90821680620001d157607f821691505b602082108103620001f257634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200024657600081815260208120601f850160051c81016020861015620002215750805b601f850160051c820191505b8181101562000242578281556001016200022d565b5050505b505050565b81516001600160401b0381111562000267576200026762000072565b6200027f81620002788454620001bc565b84620001f8565b602080601f831160018114620002b757600084156200029e5750858301515b600019600386901b1c1916600185901b17855562000242565b600085815260208120601f198616915b82811015620002e857888601518255948401946001909101908401620002c7565b5085821015620003075787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610b0280620003276000396000f3fe608060405234801561001057600080fd5b50600436106100e55760003560e01c806340c10f19116100975780639dc29fac116100665780639dc29fac146101e4578063a457c2d7146101f7578063a9059cbb1461020a578063dd62ed3e1461021d57600080fd5b806340c10f191461018d57806356189cb4146101a057806370a08231146101b357806395d89b41146101dc57600080fd5b806306fdde03146100ea578063095ea7b31461010857806318160ddd1461012b578063222f5be01461013d57806323b872dd14610152578063313ce56714610165578063395093511461017a575b600080fd5b6100f2610230565b6040516100ff919061094c565b60405180910390f35b61011b6101163660046109b6565b6102c2565b60405190151581526020016100ff565b6002545b6040519081526020016100ff565b61015061014b3660046109e0565b6102dc565b005b61011b6101603660046109e0565b6102ec565b60055460405160ff90911681526020016100ff565b61011b6101883660046109b6565b610310565b61015061019b3660046109b6565b610332565b6101506101ae3660046109e0565b610340565b61012f6101c1366004610a1c565b6001600160a01b031660009081526020819052604090205490565b6100f261034b565b6101506101f23660046109b6565b61035a565b61011b6102053660046109b6565b610364565b61011b6102183660046109b6565b6103e4565b61012f61022b366004610a3e565b6103f2565b60606003805461023f90610a71565b80601f016020809104026020016040519081016040528092919081815260200182805461026b90610a71565b80156102b85780601f1061028d576101008083540402835291602001916102b8565b820191906000526020600020905b81548152906001019060200180831161029b57829003601f168201915b5050505050905090565b6000336102d081858561041d565b60019150505b92915050565b6102e7838383610541565b505050565b6000336102fa8582856106e7565b610305858585610541565b506001949350505050565b6000336102d081858561032383836103f2565b61032d9190610aab565b61041d565b61033c828261075b565b5050565b6102e783838361041d565b60606004805461023f90610a71565b61033c828261081a565b6000338161037282866103f2565b9050838110156103d75760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b610305828686840361041d565b6000336102d0818585610541565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b03831661047f5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103ce565b6001600160a01b0382166104e05760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103ce565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166105a55760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103ce565b6001600160a01b0382166106075760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103ce565b6001600160a01b0383166000908152602081905260409020548181101561067f5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103ce565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35b50505050565b60006106f384846103f2565b905060001981146106e1578181101561074e5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103ce565b6106e1848484840361041d565b6001600160a01b0382166107b15760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103ce565b80600260008282546107c39190610aab565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b6001600160a01b03821661087a5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016103ce565b6001600160a01b038216600090815260208190526040902054818110156108ee5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016103ce565b6001600160a01b0383166000818152602081815260408083208686039055600280548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3505050565b600060208083528351808285015260005b818110156109795785810183015185820160400152820161095d565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146109b157600080fd5b919050565b600080604083850312156109c957600080fd5b6109d28361099a565b946020939093013593505050565b6000806000606084860312156109f557600080fd5b6109fe8461099a565b9250610a0c6020850161099a565b9150604084013590509250925092565b600060208284031215610a2e57600080fd5b610a378261099a565b9392505050565b60008060408385031215610a5157600080fd5b610a5a8361099a565b9150610a686020840161099a565b90509250929050565b600181811c90821680610a8557607f821691505b602082108103610aa557634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156102d657634e487b7160e01b600052601160045260246000fdfea26469706673582212200204308a6d816b53a554a33d32202c91500d261a00af9c24663a52d226774fe564736f6c63430008130033";

type ERC20MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20Mock__factory extends ContractFactory {
  constructor(...args: ERC20MockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC20Mock> {
    return super.deploy(
      name,
      symbol,
      _decimals,
      overrides || {}
    ) as Promise<ERC20Mock>;
  }
  override getDeployTransaction(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, _decimals, overrides || {});
  }
  override attach(address: string): ERC20Mock {
    return super.attach(address) as ERC20Mock;
  }
  override connect(signer: Signer): ERC20Mock__factory {
    return super.connect(signer) as ERC20Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20MockInterface {
    return new utils.Interface(_abi) as ERC20MockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20Mock {
    return new Contract(address, _abi, signerOrProvider) as ERC20Mock;
  }
}