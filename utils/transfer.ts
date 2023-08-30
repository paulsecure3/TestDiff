export type TransferContract = { address: any; owner: () => any; transferOwnership: (arg0: any) => any; };

export type TransferContractData = Record<string, TransferContract>;

// export async function giveContractsOwnerships(contracts: TransferContractData) {
//     const transferPromises: Promise<void>[] = [];

//     for (const address in contracts) {
//         transferPromises.push(transferOwnership(contracts[address], address))
//     }

//     await Promise.all(transferPromises);
// }

export async function transferOwnership(contract: { address: any; owner: () => any; transferOwnership: (arg0: any) => any; }, newOwner: any) {
    console.log("Transfering Ownership of", contract.address)

    if (!newOwner) throw "Transfering ownership to null address"

    if ((await contract.owner()) != newOwner) await contract.transferOwnership(newOwner)

    console.log("Transfered Ownership of", contract.address)
}

export async function giveContractsOwnerships(agilelyCore: any, ADMIN_WALLET: string, TREASURY_WALLET: string, AGLContracts: any) {
	await transferOwnership(agilelyCore.adminContract, ADMIN_WALLET)
	await transferOwnership(agilelyCore.priceFeed, ADMIN_WALLET)
	await transferOwnership(agilelyCore.agilelyParameters, ADMIN_WALLET)
	await transferOwnership(agilelyCore.stabilityPoolManager, ADMIN_WALLET)
	await transferOwnership(agilelyCore.usdaToken, ADMIN_WALLET)
	await transferOwnership(AGLContracts.AGLStaking, ADMIN_WALLET)

	await transferOwnership(agilelyCore.lockedVsta, TREASURY_WALLET)
	await transferOwnership(AGLContracts.communityIssuance, TREASURY_WALLET)
}
