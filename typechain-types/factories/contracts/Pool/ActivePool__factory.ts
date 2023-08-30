/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ActivePool,
  ActivePoolInterface,
} from "../../../contracts/Pool/ActivePool";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newActivePoolAddress",
        type: "address",
      },
    ],
    name: "ActivePoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_balance",
        type: "uint256",
      },
    ],
    name: "ActivePoolAssetBalanceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_USDADebt",
        type: "uint256",
      },
    ],
    name: "ActivePoolUSDADebtUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_assetAddress",
        type: "address",
      },
    ],
    name: "AssetAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_newBalance",
        type: "uint256",
      },
    ],
    name: "AssetBalanceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "AssetSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newBorrowerOperationsAddress",
        type: "address",
      },
    ],
    name: "BorrowerOperationsAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newDefaultPoolAddress",
        type: "address",
      },
    ],
    name: "DefaultPoolAddressChanged",
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
        indexed: false,
        internalType: "address",
        name: "_newStabilityPoolAddress",
        type: "address",
      },
    ],
    name: "StabilityPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newTroveManagerAddress",
        type: "address",
      },
    ],
    name: "TroveManagerAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_newBalance",
        type: "uint256",
      },
    ],
    name: "USDABalanceUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "GMX_TOKEN",
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
    inputs: [],
    name: "SGLP",
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
    name: "VESTA_ADMIN",
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
    name: "agilelyGLPStaking",
    outputs: [
      {
        internalType: "contract IAgilelyGMXStaking",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "agilelyGMXStaking",
    outputs: [
      {
        internalType: "contract IAgilelyGMXStaking",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowerOperationsAddress",
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
    name: "collSurplusPool",
    outputs: [
      {
        internalType: "contract ICollSurplusPool",
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
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "decreaseUSDADebt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultPool",
    outputs: [
      {
        internalType: "contract IDefaultPool",
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
    name: "getAssetBalance",
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
        name: "_asset",
        type: "address",
      },
    ],
    name: "getUSDADebt",
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
        name: "_asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "increaseUSDADebt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isInitialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        name: "_vaultOwner",
        type: "address",
      },
    ],
    name: "isStaked",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_vaults",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_collaterals",
        type: "uint256[]",
      },
    ],
    name: "manuallyEnterVaultsToGMXStaking",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "receivedERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "redemptorAddress",
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
    name: "restorAdminToAgilely",
    outputs: [],
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
        name: "_vaultOwner",
        type: "address",
      },
    ],
    name: "retryStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "sendAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrowerOperationsAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_troveManagerAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_stabilityManagerAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_defaultPoolAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_collSurplusPoolAddress",
        type: "address",
      },
    ],
    name: "setAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_agilelyGLPStaking",
        type: "address",
      },
    ],
    name: "setAgilelyGLPStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_agilelyGMXStaking",
        type: "address",
      },
    ],
    name: "setAgilelyGMXStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_redemptorAddress",
        type: "address",
      },
    ],
    name: "setRedemptorAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stabilityPoolManager",
    outputs: [
      {
        internalType: "contract IStabilityPoolManager",
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
      {
        internalType: "address",
        name: "_behalfOf",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "stake",
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
    name: "troveManagerAddress",
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
        name: "_asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50612987806100206000396000f3fe6080604052600436106101e75760003560e01c806361d38de411610102578063bf6eac2f11610095578063eeeab08c11610064578063eeeab08c146106d3578063f2fde38b146106fb578063fda9be9b1461071b578063fe6480b91461073b57600080fd5b8063bf6eac2f14610653578063cda775f914610673578063e9bd117714610693578063eb16f004146106b357600080fd5b80638f7d6ccb116100d15780638f7d6ccb146105b0578063a3f4df7e146105d0578063a936bd8614610613578063b7f8cf9b1461063357600080fd5b806361d38de41461053d578063715018a61461055d578063797191a9146105725780638da5cb5b1461059257600080fd5b8063471ced0b1161017a5780635373433f116101495780635373433f146104a75780635a4d28bb146104dd5780635dd68acd146104fd57806360829f8a1461051d57600080fd5b8063471ced0b1461042a57806347878f151461044a5780634cd6c00b1461046a5780634f34c8c21461047f57600080fd5b80632c0a350c116101b65780632c0a350c146103995780632f2b4e90146103b9578063392e53cd146103d95780633cc742251461040a57600080fd5b8063031e7523146102d5578063104a6a651461030b5780631547b06f1461034f578063244d5ac51461037757600080fd5b366102d0576097546001600160a01b031633148061020f57506099546001600160a01b031633145b6102345760405162461bcd60e51b815260040161022b9061237b565b60405180910390fd5b60008052609c6020527f21d5695aeb71770b4b420e85352fe1a012fa06ae92de02f7ee513765e0afa02354610269903461075b565b6000808052609c6020527f21d5695aeb71770b4b420e85352fe1a012fa06ae92de02f7ee513765e0afa0238290556040517fd9d22224b27bb4fd824c68076d2a2f5ecbe57af6aadc3564516e4d14dd0930f9926102c692916123cc565b60405180910390a1005b600080fd5b3480156102e157600080fd5b50609f546102f5906001600160a01b031681565b60405161030291906123e5565b60405180910390f35b34801561031757600080fd5b50610341610326366004612415565b6001600160a01b03166000908152609d602052604090205490565b604051908152602001610302565b34801561035b57600080fd5b506102f5734bb86f8e3ffec0bc25fce38faec99cb81bb133af81565b34801561038357600080fd5b50610397610392366004612415565b610770565b005b3480156103a557600080fd5b506103976103b4366004612430565b6107fe565b3480156103c557600080fd5b50609b546102f5906001600160a01b031681565b3480156103e557600080fd5b50609b546103fa90600160a01b900460ff1681565b6040519015158152602001610302565b34801561041657600080fd5b506099546102f5906001600160a01b031681565b34801561043657600080fd5b506103fa61044536600461245a565b610944565b34801561045657600080fd5b5061039761046536600461248d565b610ac6565b34801561047657600080fd5b50610397610dc5565b34801561048b57600080fd5b506102f57312ea0f9fdc9eb371307f1a87e2cdeb26d1128df881565b3480156104b357600080fd5b506103416104c2366004612415565b6001600160a01b03166000908152609c602052604090205490565b3480156104e957600080fd5b506098546102f5906001600160a01b031681565b34801561050957600080fd5b506103976105183660046124c9565b610e4e565b34801561052957600080fd5b5061039761053836600461248d565b61112f565b34801561054957600080fd5b50610397610558366004612415565b6111f0565b34801561056957600080fd5b50610397611223565b34801561057e57600080fd5b5060a0546102f5906001600160a01b031681565b34801561059e57600080fd5b506033546001600160a01b03166102f5565b3480156105bc57600080fd5b50609e546102f5906001600160a01b031681565b3480156105dc57600080fd5b506106066040518060400160405280600a8152602001691058dd1a5d99541bdbdb60b21b81525081565b6040516103029190612552565b34801561061f57600080fd5b5061039761062e3660046125d1565b611235565b34801561063f57600080fd5b506097546102f5906001600160a01b031681565b34801561065f57600080fd5b5061039761066e36600461248d565b6114a6565b34801561067f57600080fd5b50609a546102f5906001600160a01b031681565b34801561069f57600080fd5b506103976106ae36600461245a565b611543565b3480156106bf57600080fd5b506103976106ce366004612430565b611727565b3480156106df57600080fd5b506102f5734a4651b31d747d1ddbddadcf1b1e24a5f6dcc7b081565b34801561070757600080fd5b50610397610716366004612415565b6117de565b34801561072757600080fd5b50610397610736366004612415565b611854565b34801561074757600080fd5b50610397610756366004612430565b6118df565b60006107678284612653565b90505b92915050565b6107786119a1565b610781816119fb565b609e546001600160a01b0316156107bf57609e546107bf90734bb86f8e3ffec0bc25fce38faec99cb81bb133af906001600160a01b03166000611aa4565b609e80546001600160a01b0319166001600160a01b0383161790556107fb734bb86f8e3ffec0bc25fce38faec99cb81bb133af82600019611aa4565b50565b6097546001600160a01b031633148061082157506098546001600160a01b031633145b806108985750609b54604051633c5f6d8f60e21b81526001600160a01b039091169063f17db63c906108579033906004016123e5565b602060405180830381865afa158015610874573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108989190612666565b806108ad575060a0546001600160a01b031633145b6108c95760405162461bcd60e51b815260040161022b9061268f565b6001600160a01b0382166000908152609d60205260409020546108ec9082611bdf565b6001600160a01b0383166000908152609d602052604090819020829055517fb08274bad696b94a8752e2099a23b487daf56b24b87edfdd9a2866f3498c900391610938918591906123cc565b60405180910390a15050565b600080600061095285611beb565b9150915081158015610962575080155b156109a85760405162461bcd60e51b8152602060048201526016602482015275151bdad95b8818d85b9b9bdd081899481cdd185ad95960521b604482015260640161022b565b6098546040516309bde83560e21b81526001600160a01b038781166004830152868116602483015260009216906326f7a0d490604401608060405180830381865afa1580156109fb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a1f9190612708565b5050915050600083610a3c57609f546001600160a01b0316610a49565b609e546001600160a01b03165b905081816001600160a01b03166311ce4f0a886040518263ffffffff1660e01b8152600401610a7891906123e5565b602060405180830381865afa158015610a95573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ab9919061273e565b1015979650505050505050565b610ace611c66565b6097546001600160a01b0316331480610af157506098546001600160a01b031633145b80610b685750609b54604051633c5f6d8f60e21b81526001600160a01b039091169063f17db63c90610b279033906004016123e5565b602060405180830381865afa158015610b44573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b689190612666565b80610b7d575060a0546001600160a01b031633145b610b995760405162461bcd60e51b815260040161022b9061268f565b6000610ba58483611cbf565b905080600003610bb55750610db6565b6001600160a01b0384166000908152609c602052604081208054849290610bdd908490612757565b90915550506001600160a01b03841615610c7957610c056001600160a01b0385168483611d88565b610c0e83611da7565b15610c7457604051633ac5bc0160e21b81526001600160a01b0384169063eb16f00490610c4190879086906004016123cc565b600060405180830381600087803b158015610c5b57600080fd5b505af1158015610c6f573d6000803e3d6000fd5b505050505b610d1e565b6000836001600160a01b03168360405160006040518083038185875af1925050503d8060008114610cc6576040519150601f19603f3d011682016040523d82523d6000602084013e610ccb565b606091505b5050905080610d1c5760405162461bcd60e51b815260206004820152601e60248201527f416374697665506f6f6c3a2073656e64696e6720455448206661696c65640000604482015260640161022b565b505b6001600160a01b0384166000908152609c6020526040908190205490517fd9d22224b27bb4fd824c68076d2a2f5ecbe57af6aadc3564516e4d14dd0930f991610d69918791906123cc565b60405180910390a1836001600160a01b03167ff89c3306c782ffbbe4593aa5673e97e9ad6a8c65d240405e8986363fada663928483604051610dac9291906123cc565b60405180910390a2505b610dc06001606555565b505050565b6000610dd96033546001600160a01b031690565b6001600160a01b031614610e2f5760405162461bcd60e51b815260206004820152601960248201527f4f7765727368697020616c726561647920726573746f72656400000000000000604482015260640161022b565b610e4c734a4651b31d747d1ddbddadcf1b1e24a5f6dcc7b0611e51565b565b600054610100900460ff1615808015610e6e5750600054600160ff909116105b80610e885750303b158015610e88575060005460ff166001145b610eeb5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161022b565b6000805460ff191660011790558015610f0e576000805461ff0019166101001790555b609b54600160a01b900460ff1615610f5e5760405162461bcd60e51b8152602060048201526013602482015272105b1c9958591e481a5b9a5d1a585b1a5e9959606a1b604482015260640161022b565b610f67866119fb565b610f70856119fb565b610f79846119fb565b610f82836119fb565b610f8b826119fb565b609b805460ff60a01b1916600160a01b179055610fa6611ea3565b610fae611ed2565b609780546001600160a01b03199081166001600160a01b0389811691909117909255609880548216888416179055609b80548216878416179055609980548216868416179055609a80549091169184169190911790556040517f3ca631ffcd2a9b5d9ae18543fc82f58eb4ca33af9e6ab01b7a8e95331e6ed985906110349088906123e5565b60405180910390a17f143219c9e69b09e07e095fcc889b43d8f46ca892bba65f08dc3a0050869a56788560405161106b91906123e5565b60405180910390a17f82966d27eea39b038ee0fa30cd16532bb24f6e65d31cb58fb227aa5766cdcc7f846040516110a291906123e5565b60405180910390a17f5ee0cae2f063ed938bb55046f6a932fb6ae792bf43624806bb90abe68a50be9b836040516110d991906123e5565b60405180910390a18015611127576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b6097546001600160a01b031633148061115257506098546001600160a01b031633145b806111c95750609b54604051633c5f6d8f60e21b81526001600160a01b039091169063f17db63c906111889033906004016123e5565b602060405180830381865afa1580156111a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111c99190612666565b6111e55760405162461bcd60e51b815260040161022b9061268f565b610dc0838383611f01565b6111f86119a1565b611201816119fb565b60a080546001600160a01b0319166001600160a01b0392909216919091179055565b61122b6119a1565b610e4c6000611e51565b61123d6119a1565b60008484808060200260200160405190810160405280939291908181526020018383602002808284376000920182905250604080516020808a02828101820190935289825296975091959194508893508792508291850190849080828437600092019190915250508451835193945092831491506112f190505760405162461bcd60e51b815260206004820152600f60248201526e125b9d985b1a59081c185e5b1bd859608a1b604482015260640161022b565b60005b8181101561149c5760008482815181106113105761131061276a565b6020908102919091010151609e546040516308e7278560e11b81529192506001600160a01b0316906311ce4f0a9061134c9084906004016123e5565b602060405180830381865afa158015611369573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061138d919061273e565b156113f05760405162461bcd60e51b815260206004820152602d60248201527f41207661756c7420697320616c7265616479207374616b656420696e7369646560448201526c081d1a194818dbdb9d1c9858dd609a1b606482015260840161022b565b609e5485516001600160a01b039091169063adc9772e908790859081106114195761141961276a565b60200260200101518685815181106114335761143361276a565b60200260200101516040518363ffffffff1660e01b81526004016114589291906123cc565b600060405180830381600087803b15801561147257600080fd5b505af1158015611486573d6000803e3d6000fd5b50505050508061149590612780565b90506112f4565b5050505050505050565b6097546001600160a01b03163314806114c957506099546001600160a01b031633145b6114e55760405162461bcd60e51b815260040161022b9061237b565b6000806114f185611beb565b9150915081158015611501575080155b1561150d575050505050565b61153c8261152657609f546001600160a01b0316611533565b609e546001600160a01b03165b85856001611f54565b5050505050565b60008061154f84611beb565b915091508115801561155f575080155b156115a55760405162461bcd60e51b8152602060048201526016602482015275151bdad95b8818d85b9b9bdd081899481cdd185ad95960521b604482015260640161022b565b6098546040516309bde83560e21b81526001600160a01b038681166004830152858116602483015260009216906326f7a0d490604401608060405180830381865afa1580156115f8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061161c9190612708565b505091505060008361163957609f546001600160a01b0316611646565b609e546001600160a01b03165b90506000816001600160a01b03166311ce4f0a876040518263ffffffff1660e01b815260040161167691906123e5565b602060405180830381865afa158015611693573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b7919061273e565b90508281106117085760405162461bcd60e51b815260206004820152601960248201527f416c6c20636f6c6c61746572616c20617265207374616b656400000000000000604482015260640161022b565b61171e82876117178487612757565b6001611f54565b50505050505050565b6097546001600160a01b031633148061174a57506099546001600160a01b031633145b6117665760405162461bcd60e51b815260040161022b9061237b565b6001600160a01b0382166000908152609c60205260408120805483929061178e908490612653565b90915550506001600160a01b0382166000908152609c6020526040908190205490517fd9d22224b27bb4fd824c68076d2a2f5ecbe57af6aadc3564516e4d14dd0930f991610938918591906123cc565b6117e66119a1565b6001600160a01b03811661184b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161022b565b6107fb81611e51565b61185c6119a1565b611865816119fb565b609f546001600160a01b0316156118a357609f546118a3907312ea0f9fdc9eb371307f1a87e2cdeb26d1128df8906001600160a01b03166000611aa4565b609f80546001600160a01b0319166001600160a01b0383161790556107fb7312ea0f9fdc9eb371307f1a87e2cdeb26d1128df882600019611aa4565b6097546001600160a01b031633148061190257506098546001600160a01b031633145b61197e5760405162461bcd60e51b815260206004820152604160248201527f416374697665506f6f6c3a2043616c6c6572206973206e65697468657220426f60448201527f72726f7765724f7065726174696f6e73206e6f722054726f76654d616e6167656064820152603960f91b608482015260a40161022b565b6001600160a01b0382166000908152609d60205260409020546108ec908261075b565b6033546001600160a01b03163314610e4c5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161022b565b6001600160a01b038116611a515760405162461bcd60e51b815260206004820152601e60248201527f4163636f756e742063616e6e6f74206265207a65726f20616464726573730000604482015260640161022b565b803b80611aa05760405162461bcd60e51b815260206004820181905260248201527f4163636f756e7420636f64652073697a652063616e6e6f74206265207a65726f604482015260640161022b565b5050565b801580611b1e5750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa158015611af8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b1c919061273e565b155b611b895760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527520746f206e6f6e2d7a65726f20616c6c6f77616e636560501b606482015260840161022b565b610dc08363095ea7b360e01b8484604051602401611ba89291906123cc565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091526120b3565b60006107678284612757565b609e5460009081906001600160a01b031615801590611c2657506001600160a01b038316734bb86f8e3ffec0bc25fce38faec99cb81bb133af145b609f549092506001600160a01b031615801590611c5f57506001600160a01b0383167312ea0f9fdc9eb371307f1a87e2cdeb26d1128df8145b9050915091565b600260655403611cb85760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161022b565b6002606555565b60006001600160a01b038316611cd657508061076a565b81600003611ce65750600061076a565b6000836001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d26573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d4a9190612799565b905060128160ff161015611d8057611d78611d668260126127bc565b611d7190600a6128b9565b8490612188565b91505061076a565b509092915050565b610dc08363a9059cbb60e01b8484604051602401611ba89291906123cc565b6099546000906001600160a01b0383811691161480611dd35750609a546001600160a01b038381169116145b8061076a5750609b54604051633c5f6d8f60e21b81526001600160a01b039091169063f17db63c90611e099085906004016123e5565b602060405180830381865afa158015611e26573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076a9190612666565b6001606555565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff16611eca5760405162461bcd60e51b815260040161022b906128c8565b610e4c612194565b600054610100900460ff16611ef95760405162461bcd60e51b815260040161022b906128c8565b610e4c6121c4565b600080611f0d85611beb565b9150915081158015611f1d575080155b15611f29575050505050565b61153c82611f4257609f546001600160a01b0316611f4f565b609e546001600160a01b03165b858560005b8015611fbf576040516356e4bb9760e11b81526001600160a01b0385169063adc9772e90611f8890869086906004016123cc565b600060405180830381600087803b158015611fa257600080fd5b505af1158015611fb6573d6000803e3d6000fd5b505050506120ad565b6040516308e7278560e11b81526000906001600160a01b038616906311ce4f0a90611fee9087906004016123e5565b602060405180830381865afa15801561200b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061202f919061273e565b90508060000361203f57506120ad565b8083111561204b578092505b604051630615339760e51b81526001600160a01b0386169063c2a672e09061207990879087906004016123cc565b600060405180830381600087803b15801561209357600080fd5b505af11580156120a7573d6000803e3d6000fd5b50505050505b50505050565b6000612108826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166121eb9092919063ffffffff16565b90508051600014806121295750808060200190518101906121299190612666565b610dc05760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161022b565b60006107678284612913565b600054610100900460ff166121bb5760405162461bcd60e51b815260040161022b906128c8565b610e4c33611e51565b600054610100900460ff16611e4a5760405162461bcd60e51b815260040161022b906128c8565b60606121fa8484600085612202565b949350505050565b6060824710156122635760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161022b565b600080866001600160a01b0316858760405161227f9190612935565b60006040518083038185875af1925050503d80600081146122bc576040519150601f19603f3d011682016040523d82523d6000602084013e6122c1565b606091505b50915091506122d2878383876122dd565b979650505050505050565b6060831561234c578251600003612345576001600160a01b0385163b6123455760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161022b565b50816121fa565b6121fa83838151156123615781518083602001fd5b8060405162461bcd60e51b815260040161022b9190612552565b60208082526031908201527f416374697665506f6f6c3a2043616c6c6572206973206e65697468657220424f604082015270081b9bdc88111959985d5b1d08141bdbdb607a1b606082015260800190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0391909116815260200190565b80356001600160a01b038116811461241057600080fd5b919050565b60006020828403121561242757600080fd5b610767826123f9565b6000806040838503121561244357600080fd5b61244c836123f9565b946020939093013593505050565b6000806040838503121561246d57600080fd5b612476836123f9565b9150612484602084016123f9565b90509250929050565b6000806000606084860312156124a257600080fd5b6124ab846123f9565b92506124b9602085016123f9565b9150604084013590509250925092565b600080600080600060a086880312156124e157600080fd5b6124ea866123f9565b94506124f8602087016123f9565b9350612506604087016123f9565b9250612514606087016123f9565b9150612522608087016123f9565b90509295509295909350565b60005b83811015612549578181015183820152602001612531565b50506000910152565b602081526000825180602084015261257181604085016020870161252e565b601f01601f19169190910160400192915050565b60008083601f84011261259757600080fd5b50813567ffffffffffffffff8111156125af57600080fd5b6020830191508360208260051b85010111156125ca57600080fd5b9250929050565b600080600080604085870312156125e757600080fd5b843567ffffffffffffffff808211156125ff57600080fd5b61260b88838901612585565b9096509450602087013591508082111561262457600080fd5b5061263187828801612585565b95989497509550505050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561076a5761076a61263d565b60006020828403121561267857600080fd5b8151801515811461268857600080fd5b9392505050565b60208082526053908201527f416374697665506f6f6c3a2043616c6c6572206973206e65697468657220426f60408201527f72726f7765724f7065726174696f6e73206e6f722054726f76654d616e6167656060820152721c881b9bdc8814dd18589a5b1a5d1e541bdbdb606a1b608082015260a00190565b6000806000806080858703121561271e57600080fd5b505082516020840151604085015160609095015191969095509092509050565b60006020828403121561275057600080fd5b5051919050565b8181038181111561076a5761076a61263d565b634e487b7160e01b600052603260045260246000fd5b6000600182016127925761279261263d565b5060010190565b6000602082840312156127ab57600080fd5b815160ff8116811461268857600080fd5b60ff828116828216039081111561076a5761076a61263d565b600181815b808511156128105781600019048211156127f6576127f661263d565b8085161561280357918102915b93841c93908002906127da565b509250929050565b6000826128275750600161076a565b816128345750600061076a565b816001811461284a576002811461285457612870565b600191505061076a565b60ff8411156128655761286561263d565b50506001821b61076a565b5060208310610133831016604e8410600b8410161715612893575081810a61076a565b61289d83836127d5565b80600019048211156128b1576128b161263d565b029392505050565b600061076760ff841683612818565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60008261293057634e487b7160e01b600052601260045260246000fd5b500490565b6000825161294781846020870161252e565b919091019291505056fea2646970667358221220c69e5353d64dda4e433c675f875bb5ea433c84dcc2b76bcde4b743630b2404a464736f6c63430008130033";

type ActivePoolConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ActivePoolConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ActivePool__factory extends ContractFactory {
  constructor(...args: ActivePoolConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ActivePool> {
    return super.deploy(overrides || {}) as Promise<ActivePool>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ActivePool {
    return super.attach(address) as ActivePool;
  }
  override connect(signer: Signer): ActivePool__factory {
    return super.connect(signer) as ActivePool__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ActivePoolInterface {
    return new utils.Interface(_abi) as ActivePoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ActivePool {
    return new Contract(address, _abi, signerOrProvider) as ActivePool;
  }
}
