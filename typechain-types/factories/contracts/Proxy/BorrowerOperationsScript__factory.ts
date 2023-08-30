/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  BorrowerOperationsScript,
  BorrowerOperationsScriptInterface,
} from "../../../contracts/Proxy/BorrowerOperationsScript";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IBorrowerOperations",
        name: "_borrowerOperations",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b506040516105cb3803806105cb83398101604081905261002f916100f7565b61003881610049565b6001600160a01b0316608052610127565b6001600160a01b0381166100a45760405162461bcd60e51b815260206004820152601e60248201527f4163636f756e742063616e6e6f74206265207a65726f2061646472657373000060448201526064015b60405180910390fd5b803b806100f35760405162461bcd60e51b815260206004820181905260248201527f4163636f756e7420636f64652073697a652063616e6e6f74206265207a65726f604482015260640161009b565b5050565b60006020828403121561010957600080fd5b81516001600160a01b038116811461012057600080fd5b9392505050565b6080516104756101566000396000818160ae0152818161017e0152818161025901526102d801526104756000f3fe60806040526004361061003f5760003560e01c806374399021146100445780637da0b1fa146100595780638235b2841461006c578063cbd138ae1461008c575b600080fd5b610057610052366004610343565b6100ac565b005b6100576100673660046103c5565b61017c565b34801561007857600080fd5b50610057610087366004610424565b61023a565b34801561009857600080fd5b506100576100a7366004610424565b6102b9565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663743990216100e58a8a610307565b6040516001600160e01b031960e084901b1681526001600160a01b03808d166004830152602482018c9052604482018b9052606482018a90526084820189905287151560a483015280871660c4830152851660e4820152610104016000604051808303818588803b15801561015957600080fd5b505af115801561016d573d6000803e3d6000fd5b50505050505050505050505050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637da0b1fa6101b58888610307565b6040516001600160e01b031960e084901b1681526001600160a01b03808b166004830152602482018a905260448201899052606482018890528087166084830152851660a482015260c4016000604051808303818588803b15801561021957600080fd5b505af115801561022d573d6000803e3d6000fd5b5050505050505050505050565b60405163208d6ca160e21b81526001600160a01b0382811660048301527f00000000000000000000000000000000000000000000000000000000000000001690638235b284906024015b600060405180830381600087803b15801561029e57600080fd5b505af11580156102b2573d6000803e3d6000fd5b5050505050565b6040516365e89c5760e11b81526001600160a01b0382811660048301527f0000000000000000000000000000000000000000000000000000000000000000169063cbd138ae90602401610284565b60006001600160a01b0383161561031e5781610320565b345b9392505050565b80356001600160a01b038116811461033e57600080fd5b919050565b600080600080600080600080610100898b03121561036057600080fd5b61036989610327565b97506020890135965060408901359550606089013594506080890135935060a0890135801515811461039a57600080fd5b92506103a860c08a01610327565b91506103b660e08a01610327565b90509295985092959890939650565b60008060008060008060c087890312156103de57600080fd5b6103e787610327565b955060208701359450604087013593506060870135925061040a60808801610327565b915061041860a08801610327565b90509295509295509295565b60006020828403121561043657600080fd5b6103208261032756fea2646970667358221220eea36dd07a689530f7c8a5c57e1153e143a7010948738bdd8ecbda162552761064736f6c63430008130033";

type BorrowerOperationsScriptConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BorrowerOperationsScriptConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BorrowerOperationsScript__factory extends ContractFactory {
  constructor(...args: BorrowerOperationsScriptConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _borrowerOperations: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BorrowerOperationsScript> {
    return super.deploy(
      _borrowerOperations,
      overrides || {}
    ) as Promise<BorrowerOperationsScript>;
  }
  override getDeployTransaction(
    _borrowerOperations: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_borrowerOperations, overrides || {});
  }
  override attach(address: string): BorrowerOperationsScript {
    return super.attach(address) as BorrowerOperationsScript;
  }
  override connect(signer: Signer): BorrowerOperationsScript__factory {
    return super.connect(signer) as BorrowerOperationsScript__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BorrowerOperationsScriptInterface {
    return new utils.Interface(_abi) as BorrowerOperationsScriptInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BorrowerOperationsScript {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BorrowerOperationsScript;
  }
}