/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  CurveTrader,
  CurveTraderInterface,
} from "../../../../contracts/DexTrader/trader/CurveTrader";

const _abi = [
  {
    inputs: [],
    name: "AmountInAndOutAreZeroOrSameValue",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
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
    name: "BadReturnValueFromERC20OnTransfer",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotBeNativeChainToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
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
    name: "ErrorTransferETH",
    type: "error",
  },
  {
    inputs: [],
    name: "ExchangeReturnedRevert",
    type: "error",
  },
  {
    inputs: [],
    name: "GetDyReturnedRevert",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidCoinsSize",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidContract",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPermission",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidRequestEncoding",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "NoContract",
    type: "error",
  },
  {
    inputs: [],
    name: "NonReentrancy",
    type: "error",
  },
  {
    inputs: [],
    name: "NumberIsZero",
    type: "error",
  },
  {
    inputs: [],
    name: "PoolNotRegistered",
    type: "error",
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
        name: "_paramValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_msgValue",
        type: "uint256",
      },
    ],
    name: "SanitizeMsgValueFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
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
        name: "identifier",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenTransferGenericFailure",
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
        name: "_address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes1",
        name: "newPermission",
        type: "bytes1",
      },
    ],
    name: "PermissionChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "PoolRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "PoolUnRegistered",
    type: "event",
  },
  {
    inputs: [],
    name: "BPS_DEMOMINATOR",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CORRECTION_DENOMINATOR",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EXACT_AMOUNT_IN_CORRECTION",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PRECISION",
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
    name: "TARGET_DECIMALS",
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
        internalType: "bytes",
        name: "_request",
        type: "bytes",
      },
    ],
    name: "decodeDecodeRequestExactInOutParams",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "pool",
            type: "address",
          },
          {
            internalType: "uint8[2]",
            name: "coins",
            type: "uint8[2]",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint16",
            name: "slippage",
            type: "uint16",
          },
        ],
        internalType: "struct CurveRequestExactInOutParams",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_request",
        type: "bytes",
      },
    ],
    name: "decodeSwapRequest",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "pool",
            type: "address",
          },
          {
            internalType: "uint8[2]",
            name: "coins",
            type: "uint8[2]",
          },
          {
            internalType: "uint256",
            name: "expectedAmountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expectedAmountOut",
            type: "uint256",
          },
          {
            internalType: "uint16",
            name: "slippage",
            type: "uint16",
          },
        ],
        internalType: "struct CurveSwapRequest",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_request",
        type: "bytes",
      },
    ],
    name: "exchange",
    outputs: [
      {
        internalType: "uint256",
        name: "swapResponse_",
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
        name: "_pool",
        type: "address",
      },
      {
        internalType: "uint8[2]",
        name: "_coins",
        type: "uint8[2]",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "_slippage",
        type: "uint16",
      },
    ],
    name: "generateExpectInOutRequest",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
      {
        internalType: "uint8[2]",
        name: "_coins",
        type: "uint8[2]",
      },
      {
        internalType: "uint256",
        name: "_expectedAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expectedAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "_slippage",
        type: "uint16",
      },
    ],
    name: "generateSwapRequest",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_request",
        type: "bytes",
      },
    ],
    name: "getAmountIn",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_request",
        type: "bytes",
      },
    ],
    name: "getAmountOut",
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
        name: "_address",
        type: "address",
      },
    ],
    name: "getPermissionLevel",
    outputs: [
      {
        internalType: "bytes1",
        name: "",
        type: "bytes1",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
    ],
    name: "getPoolConfigOf",
    outputs: [
      {
        components: [
          {
            internalType: "address[]",
            name: "tokens",
            type: "address[]",
          },
          {
            internalType: "string",
            name: "get_dy_signature",
            type: "string",
          },
          {
            internalType: "string",
            name: "exchange_signature",
            type: "string",
          },
        ],
        internalType: "struct PoolConfig",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "bytes1",
        name: "accessLevel",
        type: "bytes1",
      },
    ],
    name: "hasPermissionLevel",
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
        name: "_pool",
        type: "address",
      },
    ],
    name: "isPoolRegistered",
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
        name: "_pool",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "_totalCoins",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_get_dy_signature",
        type: "string",
      },
      {
        internalType: "string",
        name: "_exchange_signature",
        type: "string",
      },
    ],
    name: "registerPool",
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
        name: "_address",
        type: "address",
      },
      {
        internalType: "bytes1",
        name: "_permission",
        type: "bytes1",
      },
    ],
    name: "setPermission",
    outputs: [],
    stateMutability: "nonpayable",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
    ],
    name: "unregisterPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506126f2806100206000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c8063881e142e116100c3578063ada61cc31161007c578063ada61cc314610313578063c248c3de14610326578063c673bdaf14610372578063d396f5811461039d578063f2fde38b146103bd578063f33ddb2a146103d057600080fd5b8063881e142e1461028c5780638da5cb5b1461029f5780639cfa9fd3146102ba578063a6d6c087146102da578063a8f1f52e146102ed578063aaf5eb681461030057600080fd5b8063548180c511610115578063548180c5146101ca578063580b9c03146101ea5780635ceecb711461020a578063715018a61461022557806371a1e2b81461022d5780638670588b1461027257600080fd5b806303962143146101525780630a9254e4146101675780631a80d0d71461016f5780632e8479fa14610182578063499a3c50146101a9575b600080fd5b610165610160366004611e3a565b6103d9565b005b610165610663565b61016561017d366004611ece565b610779565b61018c620186a081565b6040516001600160801b0390911681526020015b60405180910390f35b6101bc6101b7366004611fb6565b61078f565b6040519081526020016101a0565b6101dd6101d8366004611fb6565b6109c8565b6040516101a09190612010565b6101fd6101f8366004612074565b6109ea565b6040516101a09190612122565b610212600381565b60405161ffff90911681526020016101a0565b610165610a6f565b61025961023b366004612135565b6001600160a01b031660009081526066602052604090205460f81b90565b6040516001600160f81b031990911681526020016101a0565b61027a601281565b60405160ff90911681526020016101a0565b6101bc61029a366004612152565b610a83565b6033546040516001600160a01b0390911681526020016101a0565b6102cd6102c8366004612135565b610f92565b6040516101a091906121a1565b6101fd6102e8366004612236565b61115e565b6101bc6102fb366004611fb6565b6111d7565b6101bc6b033b2e3c9fd0803ce800000081565b610165610321366004612135565b6112b3565b610362610334366004611ece565b6001600160a01b039190911660009081526066602052604090205460f81b166001600160f81b031916151590565b60405190151581526020016101a0565b610362610380366004612135565b6001600160a01b0316600090815260986020526040902054151590565b6103b06103ab366004611fb6565b61136d565b6040516101a09190612288565b6101656103cb366004612135565b611389565b61018c61271081565b6103e16113ff565b85806001600160a01b03163b60000361040d576040516303777f6960e51b815260040160405180910390fd5b60028660ff1610156104325760405163265d3b6160e21b815260040160405180910390fd5b60008660ff166001600160401b0381111561044f5761044f611f14565b604051908082528060200260200182016040528015610478578160200160208202803683370190505b5090506000805b8860ff168110156105455760405163c661065760e01b8152600481018290526001600160a01b038b169063c661065790602401602060405180830381865afa1580156104cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104f391906122d5565b915081838281518110610508576105086122f2565b60200260200101906001600160a01b031690816001600160a01b031681525050610535828b600019611459565b61053e8161231e565b905061047f565b50604051806060016040528083815260200188888080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505090825250604080516020601f89018190048102820181019092528781529181019190889088908190840183828082843760009201829052509390945250506001600160a01b038c168152609860209081526040909120835180519193506105f7928492910190611c65565b506020820151600182019061060c90826123bf565b506040820151600282019061062190826123bf565b50506040516001600160a01b038b1691507f9cc152f4650ca2829a210a21551537f4cc4d48c2611ec06974f835e911921b9090600090a2505050505050505050565b600054610100900460ff16158080156106835750600054600160ff909116105b8061069d5750303b15801561069d575060005460ff166001145b6107055760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff191660011790558015610728576000805461ff0019166101001790555b61073061150e565b8015610776576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50565b6107816113ff565b61078b828261154f565b5050565b60008061079b836115b7565b80516001600160a01b031660009081526098602090815260408083208151815460809481028201850190935260608101838152959650939490928492849184018282801561081257602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116107f4575b5050505050815260200160018201805461082b90612337565b80601f016020809104026020016040519081016040528092919081815260200182805461085790612337565b80156108a45780601f10610879576101008083540402835291602001916108a4565b820191906000526020600020905b81548152906001019060200180831161088757829003601f168201915b505050505081526020016002820180546108bd90612337565b80601f01602080910402602001604051908101604052809291908181526020018280546108e990612337565b80156109365780601f1061090b57610100808354040283529160200191610936565b820191906000526020600020905b81548152906001019060200180831161091957829003601f168201915b5050505050815250509050610996826000015182602001518460200151600060028110610965576109656122f2565b602002015160000b8560200151600160028110610984576109846122f2565b602002015160000b8660400151611638565b92506109b683836060015161ffff166127106001600160801b03166116b5565b6109c0908461247e565b949350505050565b6109d0611cca565b818060200190518101906109e49190612509565b92915050565b6040805160a0810182526001600160a01b03871681528151808301835260609260208301919088906002908390839080828437600092019190915250505081526020808201879052604080830187905261ffff86166060909301929092529051610a55929101612288565b604051602081830303815290604052905095945050505050565b610a776113ff565b610a816000611769565b565b600080610a8f836117bb565b9050610aa38160400151826060015161181c565b80516001600160a01b0316600090815260986020526040902054610ada5760405163739f418560e01b815260040160405180910390fd5b80516001600160a01b031660009081526098602090815260408083208151815460809481028201850190935260608101838152909391928492849190840182828015610b4f57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610b31575b50505050508152602001600182018054610b6890612337565b80601f0160208091040260200160405190810160405280929190818152602001828054610b9490612337565b8015610be15780601f10610bb657610100808354040283529160200191610be1565b820191906000526020600020905b815481529060010190602001808311610bc457829003601f168201915b50505050508152602001600282018054610bfa90612337565b80601f0160208091040260200160405190810160405280929190818152602001828054610c2690612337565b8015610c735780601f10610c4857610100808354040283529160200191610c73565b820191906000526020600020905b815481529060010190602001808311610c5657829003601f168201915b50505091909252505083516020808601518051910151845180519596509294600092830b945090820b92906001600160801b038416908110610cb757610cb76122f2565b602002602001015190508560400151600003610d19576000610ce485876020015186868b60600151611638565b9050610d0481886080015161ffff166127106001600160801b03166116b5565b610d0e908261247e565b604088015250610d34565b610d2e84866020015185858a6040015161184f565b60608701525b610d6a8560000151846001600160801b031681518110610d5657610d566122f2565b602002602001015133308960400151611959565b6040516370a0823160e01b81523060048201526000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610db1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dd59190612583565b6040878101518982015160608b01518351600f8a810b602483015289900b604482015260648101929092526084820152600060a48083018290528451808403909101815260c4909201938490529394506001600160a01b038916928492610e3b9161259c565b60408051918290039091206020830180516001600160e01b03166001600160e01b031990921691909117905251610e72919061259c565b60006040518083038185875af1925050503d8060008114610eaf576040519150601f19603f3d011682016040523d82523d6000602084013e610eb4565b606091505b5050905080610ed657604051636de61f3f60e11b815260040160405180910390fd5b6040516370a0823160e01b81523060048201526000906001600160a01b038516906370a0823190602401602060405180830381865afa158015610f1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f419190612583565b90506000610f4f84836125b8565b9050610f828960000151876001600160801b031681518110610f7357610f736122f2565b60200260200101518e83611a72565b9c9b505050505050505050505050565b610fb660405180606001604052806060815260200160608152602001606081525090565b6001600160a01b0382166000908152609860209081526040918290208251815460809381028201840190945260608101848152909391928492849184018282801561102a57602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161100c575b5050505050815260200160018201805461104390612337565b80601f016020809104026020016040519081016040528092919081815260200182805461106f90612337565b80156110bc5780601f10611091576101008083540402835291602001916110bc565b820191906000526020600020905b81548152906001019060200180831161109f57829003601f168201915b505050505081526020016002820180546110d590612337565b80601f016020809104026020016040519081016040528092919081815260200182805461110190612337565b801561114e5780601f106111235761010080835404028352916020019161114e565b820191906000526020600020905b81548152906001019060200180831161113157829003601f168201915b5050505050815250509050919050565b604080516080810182526001600160a01b0386168152815180830183526060926020830191908790600290839083908082843760009201919091525050508152602080820186905261ffff851660409283015290516111be929101612010565b6040516020818303038152906040529050949350505050565b6000806111e3836115b7565b80516001600160a01b0381166000908152609860205260409020600101805492935090916109c091839161121690612337565b80601f016020809104026020016040519081016040528092919081815260200182805461124290612337565b801561128f5780601f106112645761010080835404028352916020019161128f565b820191906000526020600020905b81548152906001019060200180831161127257829003601f168201915b505050506020860151805160000b91506001602002015160000b866040015161184f565b6112bb6113ff565b6001600160a01b0381166000908152609860205260408120548291036112f45760405163739f418560e01b815260040160405180910390fd5b6001600160a01b0382166000908152609860205260408120906113178282611d01565b611325600183016000611d1f565b611333600283016000611d1f565b50506040516001600160a01b038316907f7f782c3d7f54c9202a189c9e456f23786fc45ae15e78ecdabdb7e6187475c70490600090a25050565b611375611d59565b818060200190518101906109e491906125cb565b6113916113ff565b6001600160a01b0381166113f65760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016106fc565b61077681611769565b6033546001600160a01b03163314610a815760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106fc565b60405163095ea7b360e01b81526001600160a01b0383811660048301526024820183905284169063095ea7b3906044016020604051808303816000875af11580156114a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114cc919061264f565b6115095760405162461bcd60e51b815260206004820152600e60248201526d105c1c1c9bdd994811985a5b195960921b60448201526064016106fc565b505050565b600054610100900460ff166115355760405162461bcd60e51b81526004016106fc90612671565b606580546001600160a01b03191630179055610a81611c0b565b6001600160a01b038216600081815260666020908152604091829020805460ff191660f886901c17905590516001600160f81b0319841681527f875cc7db9aab147d67906d9905e17f3ace84574847d15e4262794dfddb0daaa4910160405180910390a25050565b6115bf611cca565b60405163548180c560e01b8152309063548180c5906115e2908590600401612122565b60a060405180830381865afa92505050801561161b575060408051601f3d908101601f1916820190925261161891810190612509565b60015b6109e457604051638e8629e960e01b815260040160405180910390fd5b600080611648878786888761184f565b90506000611659888888888661184f565b90506000611674836b033b2e3c9fd0803ce8000000846116b5565b905061168d81866b033b2e3c9fd0803ce80000006116b5565b935061169e846003620186a06116b5565b6116a8908561247e565b9998505050505050505050565b60008080600019858709858702925082811083820303915050806000036116ee57600084116116e357600080fd5b508290049050611762565b8084116116fa57600080fd5b600084868809851960019081018716968790049682860381900495909211909303600082900391909104909201919091029190911760038402600290811880860282030280860282030280860282030280860282030280860282030280860290910302029150505b9392505050565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6117c3611d59565b60405163d396f58160e01b8152309063d396f581906117e6908590600401612122565b60c060405180830381865afa92505050801561161b575060408051601f3d908101601f19168201909252611618918101906125cb565b80821480611831575081158015611831575080155b1561078b576040516398779ec360e01b815260040160405180910390fd5b604051600f84810b602483015283900b60448201526064810182905260009081906060906001600160a01b03891690889060840160408051601f19818403018152908290529161189e9161259c565b60408051918290039091206020830180516001600160e01b03166001600160e01b0319909216919091179052516118d5919061259c565b600060405180830381855afa9150503d8060008114611910576040519150601f19603f3d011682016040523d82523d6000602084013e611915565b606091505b5090925090508161193957604051631c45311d60e21b815260040160405180910390fd5b8080602001905181019061194d9190612583565b98975050505050505050565b6001600160a01b03841615611a6c576040516323b872dd60e01b600052836004528260245281604452602060006064600080895af1803d15601f3d116001600051141617163d15158116611a615780873b151516611a615780611a4c5781611a2b573d15611a05576020601f3d01046020840481600302818311156119ec57818303600302610200838002858002030401015b5a602082011015611a01573d6000803e3d6000fd5b5050505b63f486bc8760e01b60005286600452856024528460445260006064528360845260a46000fd5b639889192360e01b6000528660045285602452846044528360645260846000fd5b632f8aeb3960e11b6000528660045260246000fd5b505060405260006060525b50505050565b6001600160a01b038316611b2657604080516000808252602082019092526001600160a01b038416908390604051611aaa919061259c565b60006040518083038185875af1925050503d8060008114611ae7576040519150601f19603f3d011682016040523d82523d6000602084013e611aec565b606091505b5050905080611a6c576040516354e0012d60e01b81523060048201526001600160a01b0385166024820152604481018390526064016106fc565b600030905060405163a9059cbb60e01b6000528360045282602452602060006044600080895af1803d15601f3d116001600051141617163d15158116611a615780873b151516611a615780611a4c5781611bea573d15611bc4576020601f3d0104602084048160030281831115611bab57818303600302610200838002858002030401015b5a602082011015611bc0573d6000803e3d6000fd5b5050505b63f486bc8760e01b60005286600452836024528560445260006064528460845260a46000fd5b639889192360e01b6000528660045283602452856044528460645260846000fd5b600054610100900460ff16611c325760405162461bcd60e51b81526004016106fc90612671565b610a81600054610100900460ff16611c5c5760405162461bcd60e51b81526004016106fc90612671565b610a8133611769565b828054828255906000526020600020908101928215611cba579160200282015b82811115611cba57825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190611c85565b50611cc6929150611d9b565b5090565b604051806080016040528060006001600160a01b03168152602001611ced611db0565b815260006020820181905260409091015290565b50805460008255906000526020600020908101906107769190611d9b565b508054611d2b90612337565b6000825580601f10611d3b575050565b601f0160209004906000526020600020908101906107769190611d9b565b6040518060a0016040528060006001600160a01b03168152602001611d7c611db0565b81526020016000815260200160008152602001600061ffff1681525090565b5b80821115611cc65760008155600101611d9c565b60405180604001604052806002906020820280368337509192915050565b6001600160a01b038116811461077657600080fd5b60ff8116811461077657600080fd5b60008083601f840112611e0457600080fd5b5081356001600160401b03811115611e1b57600080fd5b602083019150836020828501011115611e3357600080fd5b9250929050565b60008060008060008060808789031215611e5357600080fd5b8635611e5e81611dce565b95506020870135611e6e81611de3565b945060408701356001600160401b0380821115611e8a57600080fd5b611e968a838b01611df2565b90965094506060890135915080821115611eaf57600080fd5b50611ebc89828a01611df2565b979a9699509497509295939492505050565b60008060408385031215611ee157600080fd5b8235611eec81611dce565b915060208301356001600160f81b031981168114611f0957600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112611f3b57600080fd5b81356001600160401b0380821115611f5557611f55611f14565b604051601f8301601f19908116603f01168101908282118183101715611f7d57611f7d611f14565b81604052838152866020858801011115611f9657600080fd5b836020870160208301376000602085830101528094505050505092915050565b600060208284031215611fc857600080fd5b81356001600160401b03811115611fde57600080fd5b6109c084828501611f2a565b8060005b6002811015611a6c57815160ff16845260209384019390910190600101611fee565b81516001600160a01b0316815260208083015160a083019161203490840182611fea565b506040830151606083015261ffff606084015116608083015292915050565b80604081018310156109e457600080fd5b61ffff8116811461077657600080fd5b600080600080600060c0868803121561208c57600080fd5b853561209781611dce565b94506120a68760208801612053565b9350606086013592506080860135915060a08601356120c481612064565b809150509295509295909350565b60005b838110156120ed5781810151838201526020016120d5565b50506000910152565b6000815180845261210e8160208601602086016120d2565b601f01601f19169290920160200192915050565b60208152600061176260208301846120f6565b60006020828403121561214757600080fd5b813561176281611dce565b6000806040838503121561216557600080fd5b823561217081611dce565b915060208301356001600160401b0381111561218b57600080fd5b61219785828601611f2a565b9150509250929050565b6020808252825160608383015280516080840181905260009291820190839060a08601905b808310156121ef5783516001600160a01b031682529284019260019290920191908401906121c6565b50838701519350601f1992508286820301604087015261220f81856120f6565b9350505060408501518185840301606086015261222c83826120f6565b9695505050505050565b60008060008060a0858703121561224c57600080fd5b843561225781611dce565b93506122668660208701612053565b925060608501359150608085013561227d81612064565b939692955090935050565b81516001600160a01b0316815260208083015160c08301916122ac90840182611fea565b50604083015160608301526060830151608083015261ffff60808401511660a083015292915050565b6000602082840312156122e757600080fd5b815161176281611dce565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006001820161233057612330612308565b5060010190565b600181811c9082168061234b57607f821691505b60208210810361236b57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561150957600081815260208120601f850160051c810160208610156123985750805b601f850160051c820191505b818110156123b7578281556001016123a4565b505050505050565b81516001600160401b038111156123d8576123d8611f14565b6123ec816123e68454612337565b84612371565b602080601f83116001811461242157600084156124095750858301515b600019600386901b1c1916600185901b1785556123b7565b600085815260208120601f198616915b8281101561245057888601518255948401946001909101908401612431565b508582101561246e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b808201808211156109e4576109e4612308565b600082601f8301126124a257600080fd5b604051604081018181106001600160401b03821117156124c4576124c4611f14565b80604052508060408401858111156124db57600080fd5b845b818110156124fe5780516124f081611de3565b8352602092830192016124dd565b509195945050505050565b600060a0828403121561251b57600080fd5b604051608081018181106001600160401b038211171561253d5761253d611f14565b604052825161254b81611dce565b815261255a8460208501612491565b602082015260608301516040820152608083015161257781612064565b60608201529392505050565b60006020828403121561259557600080fd5b5051919050565b600082516125ae8184602087016120d2565b9190910192915050565b818103818111156109e4576109e4612308565b600060c082840312156125dd57600080fd5b60405160a081018181106001600160401b03821117156125ff576125ff611f14565b604052825161260d81611dce565b815261261c8460208501612491565b6020820152606083015160408201526080830151606082015260a083015161264381612064565b60808201529392505050565b60006020828403121561266157600080fd5b8151801515811461176257600080fd5b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea2646970667358221220d816dec9a703612dca280f9d2805c7eeaee52c08f549735c9ae53629223fa15164736f6c63430008130033";

type CurveTraderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CurveTraderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CurveTrader__factory extends ContractFactory {
  constructor(...args: CurveTraderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CurveTrader> {
    return super.deploy(overrides || {}) as Promise<CurveTrader>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CurveTrader {
    return super.attach(address) as CurveTrader;
  }
  override connect(signer: Signer): CurveTrader__factory {
    return super.connect(signer) as CurveTrader__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CurveTraderInterface {
    return new utils.Interface(_abi) as CurveTraderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CurveTrader {
    return new Contract(address, _abi, signerOrProvider) as CurveTrader;
  }
}