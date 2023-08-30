/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  BorrowerWrappersScript,
  BorrowerWrappersScriptInterface,
} from "../../../contracts/Proxy/BorrowerWrappersScript";

const _abi = [
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
        name: "_AGLStakingAddress",
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
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_assetAmountSent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_collWithdrawal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_debtChange",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isDebtIncrease",
        type: "bool",
      },
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
    name: "adjustTrove",
    outputs: [],
    stateMutability: "payable",
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
    name: "claimCollateral",
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
        internalType: "uint256",
        name: "_maxFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_AGLmount",
        type: "uint256",
      },
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
    name: "claimCollateralAndOpenTrove",
    outputs: [],
    stateMutability: "payable",
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
        name: "_maxFee",
        type: "uint256",
      },
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
    name: "claimSPRewardsAndRecycle",
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
        internalType: "uint256",
        name: "_maxFee",
        type: "uint256",
      },
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
    name: "claimStakingGainsAndRecycle",
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
    ],
    name: "closeTrove",
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
        internalType: "uint256",
        name: "_assetAmountSent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_AGLmount",
        type: "uint256",
      },
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
    name: "openTrove",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_AGLamount",
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
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferETH",
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
] as const;

const _bytecode =
  "0x6101606040523480156200001257600080fd5b5060405162001dae38038062001dae8339810160408190526200003591620004ec565b8083620000428162000426565b6001600160a01b0316608052620000598162000426565b6001600160a01b031660a052620000708262000426565b6000829050806001600160a01b031660c0816001600160a01b0316815250506000816001600160a01b0316632f2b4e906040518163ffffffff1660e01b8152600401602060405180830381865afa158015620000d0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000f6919062000540565b9050620001038162000426565b806001600160a01b031660e0816001600160a01b0316815250506000826001600160a01b031663b398aaf16040518163ffffffff1660e01b8152600401602060405180830381865afa1580156200015e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000184919062000540565b6001600160a01b031663741bef1a6040518163ffffffff1660e01b8152600401602060405180830381865afa158015620001c2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001e8919062000540565b9050620001f58162000426565b806001600160a01b0316610100816001600160a01b0316815250506000836001600160a01b0316630736747a6040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000251573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000277919062000540565b9050620002848162000426565b806001600160a01b0316610120816001600160a01b0316815250506000856001600160a01b031663974715bc6040518163ffffffff1660e01b8152600401602060405180830381865afa158015620002e0573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000306919062000540565b9050620003138162000426565b806001600160a01b0316610140816001600160a01b0316815250506000856001600160a01b031663310b4e986040518163ffffffff1660e01b8152600401602060405180830381865afa1580156200036f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000395919062000540565b9050806001600160a01b0316876001600160a01b031614620004175760405162461bcd60e51b815260206004820152603060248201527f426f72726f77657257726170706572735363726970743a2057726f6e6720414760448201526f4c5374616b696e67206164647265737360801b60648201526084015b60405180910390fd5b50505050505050505062000567565b6001600160a01b0381166200047e5760405162461bcd60e51b815260206004820152601e60248201527f4163636f756e742063616e6e6f74206265207a65726f2061646472657373000060448201526064016200040e565b803b80620004cf5760405162461bcd60e51b815260206004820181905260248201527f4163636f756e7420636f64652073697a652063616e6e6f74206265207a65726f60448201526064016200040e565b5050565b6001600160a01b0381168114620004e957600080fd5b50565b6000806000606084860312156200050257600080fd5b83516200050f81620004d3565b60208501519093506200052281620004d3565b60408501519092506200053581620004d3565b809150509250925092565b6000602082840312156200055357600080fd5b81516200056081620004d3565b9392505050565b60805160a05160c05160e05161010051610120516101405161176e6200064060003960008181610409015281816107c301528181610b8f0152610d0d01526000818161038d0152610530015260006111330152600081816106d501528181610c210152610e9001526000818161104b015281816111f2015261127b0152600081816104ad0152818161086601528181610ac20152610f9401526000818161020e015281816102a8015281816105f2015281816108dc015281816109a001528181610a4201528181610b100152610dc2015261176e6000f3fe6080604052600436106100915760003560e01c80638235b284116100595780638235b28414610126578063a3f4df7e14610146578063a694fc3a14610195578063cbd138ae146101b5578063dde90cb3146101d557600080fd5b80634cda9c901461009657806371c9382c146100ab57806374399021146100cb5780637b1a4909146100de5780637da0b1fa14610113575b600080fd5b6100a96100a436600461138c565b6101f5565b005b3480156100b757600080fd5b506100a96100c63660046113eb565b610343565b6100a96100d936600461143e565b6108da565b3480156100ea57600080fd5b506100fe6100f93660046114c8565b61093e565b60405190151581526020015b60405180910390f35b6100a96101213660046114f4565b61099e565b34801561013257600080fd5b506100a961014136600461155b565b610a2b565b34801561015257600080fd5b5061018860405180604001604052806016815260200175109bdc9c9bddd95c95dc985c1c195c9cd4d8dc9a5c1d60521b81525081565b60405161010a9190611578565b3480156101a157600080fd5b506100a96101b03660046115c6565b610aac565b3480156101c157600080fd5b506100a96101d036600461155b565b610af9565b3480156101e157600080fd5b506100a96101f03660046113eb565b610b45565b60405163208d6ca160e21b815247906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690638235b284906102439089906004016115df565b600060405180830381600087803b15801561025d57600080fd5b505af1158015610271573d6000803e3d6000fd5b504792505050818111610286576102866115f3565b600061029c346102968486611005565b90611018565b90506001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811690637da0b1fa908a16156102de5760006102e0565b825b8a848b8b8b8b6040518863ffffffff1660e01b815260040161030796959493929190611609565b6000604051808303818588803b15801561032057600080fd5b505af1158015610334573d6000803e3d6000fd5b50505050505050505050505050565b6040805160a0810182526001600160a01b0380871682526020820186905284811682840152838116606083015260006080830181905292516370a0823160e01b81529192479290917f000000000000000000000000000000000000000000000000000000000000000016906370a08231906103c29030906004016115df565b602060405180830381865afa1580156103df573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104039190611643565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166370a08231306040518263ffffffff1660e01b815260040161045391906115df565b602060405180830381865afa158015610470573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104949190611643565b6040516305c2fbcf60e31b8152600060048201529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e17de7890602401600060405180830381600087803b1580156104f957600080fd5b505af115801561050d573d6000803e3d6000fd5b505050506000610526844761100590919063ffffffff16565b905060006105c1847f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166370a08231306040518263ffffffff1660e01b815260040161057a91906115df565b602060405180830381865afa158015610597573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105bb9190611643565b90611005565b9050811561069d5785516105d59030611024565b85516105e1908361112e565b608087015285516001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116916374399021911615610627576000610629565b835b8860000151858a6020015160008c6080015160018e604001518f606001516040518a63ffffffff1660e01b815260040161066a98979695949392919061165c565b6000604051808303818588803b15801561068357600080fd5b505af1158015610697573d6000803e3d6000fd5b50505050505b60006106b687608001518361101890919063ffffffff16565b905080156108cd5760405163065c20bb60e41b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906365c20bb09061070a908e906004016115df565b602060405180830381865afa158015610727573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074b91906116a6565b6001600160a01b03166378c77a24826040518263ffffffff1660e01b815260040161077891815260200190565b600060405180830381600087803b15801561079257600080fd5b505af11580156107a6573d6000803e3d6000fd5b50506040516370a0823160e01b8152600092506001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001691506370a08231906107f99030906004016115df565b602060405180830381865afa158015610816573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061083a9190611643565b905060006108488287611005565b905080156103345760405163534a7e1d60e11b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a694fc3a90602401600060405180830381600087803b1580156108b257600080fd5b505af11580156108c6573d6000803e3d6000fd5b5050505050505b5050505050505050505050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663743990216109138a8a61133d565b8a8a8a8a8a8a8a8a6040518a63ffffffff1660e01b815260040161030798979695949392919061165c565b600080836001600160a01b03168360405160006040518083038185875af1925050503d806000811461098c576040519150601f19603f3d011682016040523d82523d6000602084013e610991565b606091505b5090925050505b92915050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637da0b1fa6109d7888861133d565b8888888888886040518863ffffffff1660e01b81526004016109fe96959493929190611609565b6000604051808303818588803b158015610a1757600080fd5b505af11580156108cd573d6000803e3d6000fd5b60405163208d6ca160e21b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690638235b28490610a779084906004016115df565b600060405180830381600087803b158015610a9157600080fd5b505af1158015610aa5573d6000803e3d6000fd5b5050505050565b60405163534a7e1d60e11b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a694fc3a90602401610a77565b6040516365e89c5760e11b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063cbd138ae90610a779084906004016115df565b6040805160a0810182526001600160a01b0380871682526020820186905284811682840152838116606083015260006080830181905292516370a0823160e01b81529192479290917f000000000000000000000000000000000000000000000000000000000000000016906370a0823190610bc49030906004016115df565b602060405180830381865afa158015610be1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c059190611643565b835160405163065c20bb60e41b81529192506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016916365c20bb091610c54916004016115df565b602060405180830381865afa158015610c71573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9591906116a6565b604051632e54bf9560e01b8152600060048201526001600160a01b039190911690632e54bf9590602401600060405180830381600087803b158015610cd957600080fd5b505af1158015610ced573d6000803e3d6000fd5b50506040516370a0823160e01b8152479250600091506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906370a0823190610d429030906004016115df565b602060405180830381865afa158015610d5f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d839190611643565b90506000610d918386611005565b90508015610f6a578551610da59030611024565b8551610db1908261112e565b608087015285516001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116916374399021911615610df7576000610df9565b825b8860000151848a6020015160008c6080015160018e604001518f606001516040518a63ffffffff1660e01b8152600401610e3a98979695949392919061165c565b6000604051808303818588803b158015610e5357600080fd5b505af1158015610e67573d6000803e3d6000fd5b5050505050600086608001511115610f6a5760405163065c20bb60e41b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906365c20bb090610ec5908d906004016115df565b602060405180830381865afa158015610ee2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0691906116a6565b6001600160a01b03166378c77a2487608001516040518263ffffffff1660e01b8152600401610f3791815260200190565b600060405180830381600087803b158015610f5157600080fd5b505af1158015610f65573d6000803e3d6000fd5b505050505b6000610f768386611005565b905080156108cd5760405163534a7e1d60e11b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a694fc3a90602401600060405180830381600087803b158015610fe057600080fd5b505af1158015610ff4573d6000803e3d6000fd5b505050505050505050505050505050565b600061101182846116d9565b9392505050565b600061101182846116ec565b60405163614d120960e01b81526001600160a01b03838116600483015282811660248301527f0000000000000000000000000000000000000000000000000000000000000000169063614d120990604401602060405180830381865afa158015611092573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110b69190611643565b60011461112a5760405162461bcd60e51b815260206004820152603860248201527f426f72726f77657257726170706572735363726970743a2063616c6c6572206d604482015277757374206861766520616e206163746976652074726f766560401b606482015260840160405180910390fd5b5050565b6000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663ace1798e856040518263ffffffff1660e01b815260040161117d91906115df565b6020604051808303816000875af115801561119c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111c09190611643565b60405163b1eafaab60e01b81526001600160a01b038681166004830152306024830152604482018390529192506000917f0000000000000000000000000000000000000000000000000000000000000000169063b1eafaab90606401602060405180830381865afa158015611239573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061125d9190611643565b905060006112758261126f878661135c565b90611368565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316631400de71886040518263ffffffff1660e01b81526004016112c591906115df565b602060405180830381865afa1580156112e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113069190611643565b9050600061133161131f670de0b6b3a764000084611018565b61126f85670de0b6b3a764000061135c565b98975050505050505050565b60006001600160a01b038316156113545781611011565b503492915050565b600061101182846116ff565b60006110118284611716565b6001600160a01b038116811461138957600080fd5b50565b600080600080600060a086880312156113a457600080fd5b85356113af81611374565b9450602086013593506040860135925060608601356113cd81611374565b915060808601356113dd81611374565b809150509295509295909350565b6000806000806080858703121561140157600080fd5b843561140c81611374565b935060208501359250604085013561142381611374565b9150606085013561143381611374565b939692955090935050565b600080600080600080600080610100898b03121561145b57600080fd5b883561146681611374565b97506020890135965060408901359550606089013594506080890135935060a0890135801515811461149757600080fd5b925060c08901356114a781611374565b915060e08901356114b781611374565b809150509295985092959890939650565b600080604083850312156114db57600080fd5b82356114e681611374565b946020939093013593505050565b60008060008060008060c0878903121561150d57600080fd5b863561151881611374565b9550602087013594506040870135935060608701359250608087013561153d81611374565b915060a087013561154d81611374565b809150509295509295509295565b60006020828403121561156d57600080fd5b813561101181611374565b600060208083528351808285015260005b818110156115a557858101830151858201604001528201611589565b506000604082860101526040601f19601f8301168501019250505092915050565b6000602082840312156115d857600080fd5b5035919050565b6001600160a01b0391909116815260200190565b634e487b7160e01b600052600160045260246000fd5b6001600160a01b0396871681526020810195909552604085019390935260608401919091528316608083015290911660a082015260c00190565b60006020828403121561165557600080fd5b5051919050565b6001600160a01b0398891681526020810197909752604087019590955260608601939093526080850191909152151560a0840152831660c083015290911660e08201526101000190565b6000602082840312156116b857600080fd5b815161101181611374565b634e487b7160e01b600052601160045260246000fd5b81810381811115610998576109986116c3565b80820180821115610998576109986116c3565b8082028115828204841417610998576109986116c3565b60008261173357634e487b7160e01b600052601260045260246000fd5b50049056fea264697066735822122044864fd99193dcc5b9b0814284ad0b8b5b33e2e83b6ecfbb2c1d798d607d595a64736f6c63430008130033";

type BorrowerWrappersScriptConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BorrowerWrappersScriptConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BorrowerWrappersScript__factory extends ContractFactory {
  constructor(...args: BorrowerWrappersScriptConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _borrowerOperationsAddress: PromiseOrValue<string>,
    _troveManagerAddress: PromiseOrValue<string>,
    _AGLStakingAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BorrowerWrappersScript> {
    return super.deploy(
      _borrowerOperationsAddress,
      _troveManagerAddress,
      _AGLStakingAddress,
      overrides || {}
    ) as Promise<BorrowerWrappersScript>;
  }
  override getDeployTransaction(
    _borrowerOperationsAddress: PromiseOrValue<string>,
    _troveManagerAddress: PromiseOrValue<string>,
    _AGLStakingAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _borrowerOperationsAddress,
      _troveManagerAddress,
      _AGLStakingAddress,
      overrides || {}
    );
  }
  override attach(address: string): BorrowerWrappersScript {
    return super.attach(address) as BorrowerWrappersScript;
  }
  override connect(signer: Signer): BorrowerWrappersScript__factory {
    return super.connect(signer) as BorrowerWrappersScript__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BorrowerWrappersScriptInterface {
    return new utils.Interface(_abi) as BorrowerWrappersScriptInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BorrowerWrappersScript {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BorrowerWrappersScript;
  }
}