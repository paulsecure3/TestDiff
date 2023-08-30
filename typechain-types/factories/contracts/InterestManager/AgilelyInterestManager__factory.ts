/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  AgilelyInterestManager,
  AgilelyInterestManagerInterface,
} from "../../../contracts/InterestManager/AgilelyInterestManager";

const _abi = [
  {
    inputs: [],
    name: "ErrorModuleAlreadySet",
    type: "error",
  },
  {
    inputs: [],
    name: "ModuleNotActive",
    type: "error",
  },
  {
    inputs: [],
    name: "NotTroveManager",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newDebt",
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
        name: "module",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "interestMinted",
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
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "module",
        type: "address",
      },
    ],
    name: "ModuleLinked",
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
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_user",
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
        name: "interestAdded_",
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
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "exit",
    outputs: [
      {
        internalType: "uint256",
        name: "interestAdded_",
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
        name: "_token",
        type: "address",
      },
    ],
    name: "getInterestModule",
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
    name: "getLastUSDAPrice",
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
    name: "getModules",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
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
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserDebt",
    outputs: [
      {
        internalType: "uint256",
        name: "currentDebt_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pendingInterest_",
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
        internalType: "address",
        name: "_user",
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
        name: "interestAdded_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "contract IPriceFeed",
        name: "",
        type: "address",
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
    inputs: [],
    name: "safetyVault",
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
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_module",
        type: "address",
      },
    ],
    name: "setModuleFor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newSafetyVault",
        type: "address",
      },
    ],
    name: "setSafetyVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_usda",
        type: "address",
      },
      {
        internalType: "address",
        name: "_troveManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_priceFeed",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdaOperator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_safetyVault",
        type: "address",
      },
    ],
    name: "setUp",
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
  {
    inputs: [],
    name: "troveManager",
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
    name: "updateModules",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usda",
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
    name: "usdaOperator",
    outputs: [
      {
        internalType: "contract IUSDAOperator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061117f806100206000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80639ee97a20116100ad578063e2b19ff011610071578063e2b19ff01461024a578063ed60f1881461025d578063ee9e819914610270578063f2fde38b14610283578063ff4322051461029657600080fd5b80639ee97a20146101ea578063a2a00ed6146101f2578063a625403a1461021a578063b2494df31461022d578063bafa14051461024257600080fd5b80636de24492116100f45780636de244921461018a578063715018a6146101ab5780637dc0d1d0146101b35780638261f533146101c65780638da5cb5b146101d957600080fd5b806339945e33146101265780633d83908a1461013b57806353b087f0146101645780635bccabb014610177575b600080fd5b610139610134366004610f3d565b6102a9565b005b60675461014e906001600160a01b031681565b60405161015b9190610f70565b60405180910390f35b606a5461014e906001600160a01b031681565b61014e610185366004610f84565b6103f6565b61019d610198366004610f9f565b610414565b60405190815260200161015b565b6101396105a1565b60695461014e906001600160a01b031681565b6101396101d4366004610f84565b6105b5565b6033546001600160a01b031661014e565b6101396105df565b610205610200366004610f3d565b61083d565b6040805192835260208301919091520161015b565b61019d610228366004610f3d565b61094b565b610235610a6d565b60405161015b9190610fdb565b60655461019d565b60665461014e906001600160a01b031681565b61019d61026b366004610f9f565b610acf565b60685461014e906001600160a01b031681565b610139610291366004610f84565b610b5f565b6101396102a4366004611028565b610bdd565b6102b1610e1b565b60006102bc836103f6565b6001600160a01b0316146102e35760405163a8a769db60e01b815260040160405180910390fd5b6001600160a01b038281166000908152606c602052604080822080546001600160a01b0319908116948616948517909155606b805460018101825593527fbd43cb8ece8cd1863bcd6082d65c5b0d25665b1ce17980f0da43c0ed545f98b49092018054909216831790915560655490516305d79b4560e31b81526004810191909152632ebcda28906024016020604051808303816000875af115801561038d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b1919061108d565b50806001600160a01b0316826001600160a01b03167f26502afab58534a89f6d728ca1f766d0e74401cc1c78a26a96572856047eca8960405160405180910390a35050565b6001600160a01b039081166000908152606c60205260409020541690565b6067546000906001600160a01b0316331461044257604051636003da5960e01b815260040160405180910390fd5b61044a6105df565b6000610455856103f6565b90506001600160a01b03811661046f57600091505061059a565b60405163f8585db360e01b81526001600160a01b0385811660048301526024820185905282169063f8585db3906044015b6020604051808303816000875af11580156104bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e3919061108d565b9150836001600160a01b0316856001600160a01b03167fbcc98ff4e0ebfe6a94a66cdfea3cd8b0ddbc45a7cc4254a0c0f62a3dba65fe1a836001600160a01b031663a5537620886040518263ffffffff1660e01b81526004016105469190610f70565b602060405180830381865afa158015610563573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610587919061108d565b60405190815260200160405180910390a3505b9392505050565b6105a9610e1b565b6105b36000610e75565b565b6105bd610e1b565b606880546001600160a01b0319166001600160a01b0392909216919091179055565b606954606654604051635670bcc760e11b81526001600160a01b039283169263ace1798e9261061392911690600401610f70565b6020604051808303816000875af1158015610632573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610656919061108d565b606555606b5460008080805b8481101561076957606b818154811061067d5761067d6110a6565b6000918252602090912001546065546040516305d79b4560e31b81526001600160a01b0390921693508391632ebcda28916106be9160040190815260200190565b6020604051808303816000875af11580156106dd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610701919061108d565b935083156107595761071384846110d2565b9250816001600160a01b03167f2ee35aad2e33f2a57a13f55b273b9ab5bf3cdd683fe413a7d9e22bcb8b3f67dd8560405161075091815260200190565b60405180910390a25b610762816110e5565b9050610662565b50811561083757606a546068546040516340c10f1960e01b81526001600160a01b039182166004820152602481018590529116906340c10f1990604401600060405180830381600087803b1580156107c057600080fd5b505af11580156107d4573d6000803e3d6000fd5b50506068546040516303373ff360e61b8152600481018690526001600160a01b03909116925063cdcffcc09150602401600060405180830381600087803b15801561081e57600080fd5b505af1158015610832573d6000803e3d6000fd5b505050505b50505050565b600080600061084b856103f6565b90506001600160a01b0381161561093b5760405163052a9bb160e51b81526001600160a01b0382169063a553762090610888908790600401610f70565b602060405180830381865afa1580156108a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108c9919061108d565b60405163de364b0760e01b81526001600160a01b0383169063de364b07906108f5908890600401610f70565b602060405180830381865afa158015610912573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610936919061108d565b61093f565b6000805b92509250509250929050565b6067546000906001600160a01b0316331461097957604051636003da5960e01b815260040160405180910390fd5b6109816105df565b600061098c846103f6565b90506001600160a01b0381166109a6576000915050610a67565b60405163b42652e960e01b81526001600160a01b0382169063b42652e9906109d2908690600401610f70565b6020604051808303816000875af11580156109f1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a15919061108d565b9150826001600160a01b0316846001600160a01b03167fbcc98ff4e0ebfe6a94a66cdfea3cd8b0ddbc45a7cc4254a0c0f62a3dba65fe1a6000604051610a5d91815260200190565b60405180910390a3505b92915050565b6060606b805480602002602001604051908101604052809291908181526020018280548015610ac557602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610aa7575b5050505050905090565b6067546000906001600160a01b03163314610afd57604051636003da5960e01b815260040160405180910390fd5b610b056105df565b6000610b10856103f6565b90506001600160a01b038116610b2a57600091505061059a565b604051632fb9ba3160e01b81526001600160a01b03858116600483015260248201859052821690632fb9ba31906044016104a0565b610b67610e1b565b6001600160a01b038116610bd15760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b610bda81610e75565b50565b600054610100900460ff1615808015610bfd5750600054600160ff909116105b80610c175750303b158015610c17575060005460ff166001145b610c7a5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610bc8565b6000805460ff191660011790558015610c9d576000805461ff0019166101001790555b610ca5610ec7565b606680546001600160a01b03199081166001600160a01b038981169182179093556067805483168985161790556069805490921692871692831790915560405162736d0b60e31b815263039b685891610d0091600401610f70565b602060405180830381865afa158015610d1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d41919061108d565b6065819055606a80546001600160a01b038087166001600160a01b0319928316179092556068805492861692909116919091179055610dcd5760405162461bcd60e51b815260206004820152602260248201527f4f7261636c65204661696c656420746f20666574636820555344412070726963604482015261329760f11b6064820152608401610bc8565b8015610e13576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b6033546001600160a01b031633146105b35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610bc8565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff16610eee5760405162461bcd60e51b8152600401610bc8906110fe565b6105b3600054610100900460ff16610f185760405162461bcd60e51b8152600401610bc8906110fe565b6105b333610e75565b80356001600160a01b0381168114610f3857600080fd5b919050565b60008060408385031215610f5057600080fd5b610f5983610f21565b9150610f6760208401610f21565b90509250929050565b6001600160a01b0391909116815260200190565b600060208284031215610f9657600080fd5b61059a82610f21565b600080600060608486031215610fb457600080fd5b610fbd84610f21565b9250610fcb60208501610f21565b9150604084013590509250925092565b6020808252825182820181905260009190848201906040850190845b8181101561101c5783516001600160a01b031683529284019291840191600101610ff7565b50909695505050505050565b600080600080600060a0868803121561104057600080fd5b61104986610f21565b945061105760208701610f21565b935061106560408701610f21565b925061107360608701610f21565b915061108160808701610f21565b90509295509295909350565b60006020828403121561109f57600080fd5b5051919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b80820180821115610a6757610a676110bc565b6000600182016110f7576110f76110bc565b5060010190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea2646970667358221220ff261c5f1834ae940fa6baa952ec3ff317d4f3ab67873ab7836b696882cd0dfc64736f6c63430008130033";

type AgilelyInterestManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AgilelyInterestManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AgilelyInterestManager__factory extends ContractFactory {
  constructor(...args: AgilelyInterestManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AgilelyInterestManager> {
    return super.deploy(overrides || {}) as Promise<AgilelyInterestManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): AgilelyInterestManager {
    return super.attach(address) as AgilelyInterestManager;
  }
  override connect(signer: Signer): AgilelyInterestManager__factory {
    return super.connect(signer) as AgilelyInterestManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AgilelyInterestManagerInterface {
    return new utils.Interface(_abi) as AgilelyInterestManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AgilelyInterestManager {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as AgilelyInterestManager;
  }
}