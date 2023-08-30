/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  CustomOracleWrapper,
  CustomOracleWrapperInterface,
} from "../../../../contracts/OraclePriceFetcher/wrapped/CustomOracleWrapper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
    ],
    name: "ResponseFromOracleIsInvalid",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "TokenIsNotRegistered",
    type: "error",
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
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_externalOracle",
        type: "address",
      },
    ],
    name: "OracleAdded",
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
    inputs: [],
    name: "TARGET_DIGITS",
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
    name: "TIMEOUT",
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
        internalType: "address",
        name: "_externalOracle",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "_callCurrentPrice",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_callLastPrice",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_callLastUpdate",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_callDecimals",
        type: "bytes",
      },
    ],
    name: "addOracle",
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
    ],
    name: "fetchPrice",
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
    ],
    name: "getCurrentPrice",
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
    ],
    name: "getExternalPrice",
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
    ],
    name: "getLastPrice",
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
        name: "",
        type: "address",
      },
    ],
    name: "oracles",
    outputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "callCurrentPrice",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "callLastPrice",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "callLastUpdate",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "callDecimals",
        type: "bytes",
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
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "removeOracle",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "_token",
        type: "address",
      },
    ],
    name: "retriveSavedResponses",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "currentPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastUpdate",
            type: "uint256",
          },
        ],
        internalType: "struct IOracleWrapper.SavedResponse",
        name: "savedResponse",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "savedResponses",
    outputs: [
      {
        internalType: "uint256",
        name: "currentPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastUpdate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611866806100206000396000f3fe608060405234801561001057600080fd5b50600436106100e55760003560e01c80638da5cb5b11610097578063c692fc7411610066578063c692fc7414610238578063f2fde38b14610264578063f56f48f214610277578063fdc85fc41461028057600080fd5b80638da5cb5b146101d2578063ace1798e146101ed578063addd509914610200578063b4a4826b1461022557600080fd5b8063039b6858146100ea5780630a9254e4146101105780631be5c92f1461011a57806348fdadc5146101225780634aceaf2f1461016c578063715018a6146101a157806384cc315b146101a9575b600080fd5b6100fd6100f836600461126b565b610293565b6040519081526020015b60405180910390f35b6101186102a7565b005b6100fd601281565b61015161013036600461126b565b60666020526000908152604090208054600182015460029092015490919083565b60408051938452602084019290925290820152606001610107565b61017f61017a36600461126b565b6103bd565b6040805182518152602080840151908201529181015190820152606001610107565b61011861042c565b6100fd6101b736600461126b565b6001600160a01b031660009081526066602052604090205490565b6033546040516001600160a01b039091168152602001610107565b6101186101fb36600461126b565b610440565b61021361020e36600461126b565b6104ac565b604051610107969594939291906112d6565b610118610233366004611407565b610711565b6100fd61024636600461126b565b6001600160a01b031660009081526066602052604090206001015490565b61011861027236600461126b565b610987565b6100fd61384081565b61011861028e36600461126b565b6109fd565b60008061029f83610a8c565b519392505050565b600054610100900460ff16158080156102c75750600054600160ff909116105b806102e15750303b1580156102e1575060005460ff166001145b6103495760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff19166001179055801561036c576000805461ff0019166101001790555b610374610dfa565b80156103ba576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50565b6103e160405180606001604052806000815260200160008152602001600081525090565b6103ea82610440565b506001600160a01b0316600090815260666020908152604091829020825160608101845281548152600182015492810192909252600201549181019190915290565b610434610e29565b61043e6000610e83565b565b600061044b82610a8c565b6001600160a01b038316600090815260666020526040902090915061046f82610ed5565b15801561048957506104878260400151613840610f2e565b155b156104a7578151815560208201516001820155604082015160028201555b505050565b606560205260009081526040902080546001820180546001600160a01b03831693600160a01b90930460ff169291906104e4906114e6565b80601f0160208091040260200160405190810160405280929190818152602001828054610510906114e6565b801561055d5780601f106105325761010080835404028352916020019161055d565b820191906000526020600020905b81548152906001019060200180831161054057829003601f168201915b505050505090806002018054610572906114e6565b80601f016020809104026020016040519081016040528092919081815260200182805461059e906114e6565b80156105eb5780601f106105c0576101008083540402835291602001916105eb565b820191906000526020600020905b8154815290600101906020018083116105ce57829003601f168201915b505050505090806003018054610600906114e6565b80601f016020809104026020016040519081016040528092919081815260200182805461062c906114e6565b80156106795780601f1061064e57610100808354040283529160200191610679565b820191906000526020600020905b81548152906001019060200180831161065c57829003601f168201915b50505050509080600401805461068e906114e6565b80601f01602080910402602001604051908101604052809291908181526020018280546106ba906114e6565b80156107075780601f106106dc57610100808354040283529160200191610707565b820191906000526020600020905b8154815290600101906020018083116106ea57829003601f168201915b5050505050905086565b610719610e29565b60408051808201909152600f81526e496e76616c6964204164647265737360881b602082015286906001600160a01b0382166107685760405162461bcd60e51b81526004016103409190611520565b50803b806107b85760405162461bcd60e51b815260206004820152601960248201527f41646472657373206973206e6f74206120636f6e7472616374000000000000006044820152606401610340565b8660ff166000036107fe5760405162461bcd60e51b815260206004820152601060248201526f496e76616c696420446563696d616c7360801b6044820152606401610340565b6040805160c0810182526001600160a01b03808b16825260ff808b1660208085019182528486018c8152606086018c9052608086018b905260a086018a90528f851660009081526065909252959020845181549251909316600160a01b026001600160a81b03199092169290931691909117178155915190919060018201906108879082611581565b506060820151600282019061089c9082611581565b50608082015160038201906108b19082611581565b5060a082015160048201906108c69082611581565b5090505060006108d58a610a8c565b90506108e081610ed5565b1561091157604051637e7e748d60e01b81526001600160a01b03808c1660048301528a166024820152604401610340565b80516001600160a01b038b81166000818152606660209081526040918290209485558086015160018601558186015160029095019490945551918c168252917f828d2be040dede7698182e08dfa8bfbd663c879aee772509c4a2bd961d0ed43f910160405180910390a250505050505050505050565b61098f610e29565b6001600160a01b0381166109f45760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610340565b6103ba81610e83565b610a05610e29565b6001600160a01b038116600090815260656020526040812080546001600160a81b031916815590610a396001830182611201565b610a47600283016000611201565b610a55600383016000611201565b610a63600483016000611201565b50506001600160a01b031660009081526066602052604081208181556001810182905560020155565b610ab960405180608001604052806000815260200160008152602001600081526020016000151581525090565b6001600160a01b038281166000908152606560209081526040808320815160c08101835281549586168152600160a01b90950460ff169285019290925260018201805493949391840191610b0c906114e6565b80601f0160208091040260200160405190810160405280929190818152602001828054610b38906114e6565b8015610b855780601f10610b5a57610100808354040283529160200191610b85565b820191906000526020600020905b815481529060010190602001808311610b6857829003601f168201915b50505050508152602001600282018054610b9e906114e6565b80601f0160208091040260200160405190810160405280929190818152602001828054610bca906114e6565b8015610c175780601f10610bec57610100808354040283529160200191610c17565b820191906000526020600020905b815481529060010190602001808311610bfa57829003601f168201915b50505050508152602001600382018054610c30906114e6565b80601f0160208091040260200160405190810160405280929190818152602001828054610c5c906114e6565b8015610ca95780601f10610c7e57610100808354040283529160200191610ca9565b820191906000526020600020905b815481529060010190602001808311610c8c57829003601f168201915b50505050508152602001600482018054610cc2906114e6565b80601f0160208091040260200160405190810160405280929190818152602001828054610cee906114e6565b8015610d3b5780601f10610d1057610100808354040283529160200191610d3b565b820191906000526020600020905b815481529060010190602001808311610d1e57829003601f168201915b5050509190925250508151919250506001600160a01b0316610d7b57604051635c1b86b760e11b81526001600160a01b0384166004820152602401610340565b6000610d8682610f55565b90506000610d9383610f89565b90506000610da984600001518560400151610faf565b90506000610dbf85600001518660600151610faf565b604087018490529050610dd58260ff8616610fd9565b8652610de48160ff8616610fd9565b6020870152501515606085015250919392505050565b600054610100900460ff16610e215760405162461bcd60e51b815260040161034090611641565b61043e61102f565b6033546001600160a01b0316331461043e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610340565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60008160600151610ee857506001919050565b60408201511580610efc5750428260400151115b15610f0957506001919050565b81511580610f1957506020820151155b15610f2657506001919050565b506000919050565b600082421015610f4057506001610f4f565b81610f4b84426116a2565b1190505b92915050565b6000806000610f6c84600001518560a0015161105f565b9150915080610f7f578360200151610f81565b815b949350505050565b6000806000610fa0846000015185608001516110e4565b9150915080610f7f5742610f81565b6000806000610fbe85856110e4565b9150915080610fce576000610fd0565b815b95945050505050565b60006012821061100857610fee6012836116a2565b610ff990600a611799565b61100390846117a5565b611028565b6110138260126116a2565b61101e90600a611799565b61102890846117c7565b9392505050565b600054610100900460ff166110565760405162461bcd60e51b815260040161034090611641565b61043e33610e83565b6000807fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47083805190602001200361109b575060009050806110dd565b6000806110a8868661114b565b9150915081156110d357808060200190518101906110c691906117de565b60019350935050506110dd565b6000809350935050505b9250929050565b6000807fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470838051906020012003611120575060009050806110dd565b60008061112d868661114b565b9150915081156110d357808060200190518101906110c691906117fb565b600060607fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47083805190602001200361118657600091506110dd565b6001600160a01b03841661119d57600091506110dd565b836001600160a01b0316836040516111b59190611814565b600060405180830381855afa9150503d80600081146111f0576040519150601f19603f3d011682016040523d82523d6000602084013e6111f5565b606091505b50915091509250929050565b50805461120d906114e6565b6000825580601f1061121d575050565b601f0160209004906000526020600020908101906103ba91905b8082111561124b5760008155600101611237565b5090565b80356001600160a01b038116811461126657600080fd5b919050565b60006020828403121561127d57600080fd5b6110288261124f565b60005b838110156112a1578181015183820152602001611289565b50506000910152565b600081518084526112c2816020860160208601611286565b601f01601f19169290920160200192915050565b6001600160a01b038716815260ff8616602082015260c060408201819052600090611303908301876112aa565b828103606084015261131581876112aa565b9050828103608084015261132981866112aa565b905082810360a084015261133d81856112aa565b9998505050505050505050565b60ff811681146103ba57600080fd5b80356112668161134a565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261138b57600080fd5b813567ffffffffffffffff808211156113a6576113a6611364565b604051601f8301601f19908116603f011681019082821181831017156113ce576113ce611364565b816040528381528660208588010111156113e757600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600080600080600060e0888a03121561142257600080fd5b61142b8861124f565b96506114396020890161124f565b955061144760408901611359565b9450606088013567ffffffffffffffff8082111561146457600080fd5b6114708b838c0161137a565b955060808a013591508082111561148657600080fd5b6114928b838c0161137a565b945060a08a01359150808211156114a857600080fd5b6114b48b838c0161137a565b935060c08a01359150808211156114ca57600080fd5b506114d78a828b0161137a565b91505092959891949750929550565b600181811c908216806114fa57607f821691505b60208210810361151a57634e487b7160e01b600052602260045260246000fd5b50919050565b60208152600061102860208301846112aa565b601f8211156104a757600081815260208120601f850160051c8101602086101561155a5750805b601f850160051c820191505b8181101561157957828155600101611566565b505050505050565b815167ffffffffffffffff81111561159b5761159b611364565b6115af816115a984546114e6565b84611533565b602080601f8311600181146115e457600084156115cc5750858301515b600019600386901b1c1916600185901b178555611579565b600085815260208120601f198616915b82811015611613578886015182559484019460019091019084016115f4565b50858210156116315787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b81810381811115610f4f57610f4f61168c565b600181815b808511156116f05781600019048211156116d6576116d661168c565b808516156116e357918102915b93841c93908002906116ba565b509250929050565b60008261170757506001610f4f565b8161171457506000610f4f565b816001811461172a576002811461173457611750565b6001915050610f4f565b60ff8411156117455761174561168c565b50506001821b610f4f565b5060208310610133831016604e8410600b8410161715611773575081810a610f4f565b61177d83836116b5565b80600019048211156117915761179161168c565b029392505050565b600061102883836116f8565b6000826117c257634e487b7160e01b600052601260045260246000fd5b500490565b8082028115828204841417610f4f57610f4f61168c565b6000602082840312156117f057600080fd5b81516110288161134a565b60006020828403121561180d57600080fd5b5051919050565b60008251611826818460208701611286565b919091019291505056fea2646970667358221220391a241815c1afd40b3237323cb86ec7d777829c71ab455c83d1f435fec6e61e64736f6c63430008130033";

type CustomOracleWrapperConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CustomOracleWrapperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CustomOracleWrapper__factory extends ContractFactory {
  constructor(...args: CustomOracleWrapperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CustomOracleWrapper> {
    return super.deploy(overrides || {}) as Promise<CustomOracleWrapper>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CustomOracleWrapper {
    return super.attach(address) as CustomOracleWrapper;
  }
  override connect(signer: Signer): CustomOracleWrapper__factory {
    return super.connect(signer) as CustomOracleWrapper__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CustomOracleWrapperInterface {
    return new utils.Interface(_abi) as CustomOracleWrapperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CustomOracleWrapper {
    return new Contract(address, _abi, signerOrProvider) as CustomOracleWrapper;
  }
}