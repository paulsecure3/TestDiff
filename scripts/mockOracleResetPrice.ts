import { ethers } from 'hardhat';
import { PriceOracleV1 } from '../typechain-types';

async function main() {

    const mockOracleAddress = "0x8520A92fF73CaE912DF52c56931A095eb459E2bA"
    const mockPrice = ethers.utils.parseEther('10000')
    const orcale = await ethers.getContractAt("PriceOracleV1",mockOracleAddress) as PriceOracleV1;
    let tx = await orcale.update(mockPrice);
    await tx.wait();
     tx = await orcale.update(mockPrice);
    await tx.wait();
    console.log(await orcale.getPriceData());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });