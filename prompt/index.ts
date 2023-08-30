// @ts-ignore
import { AutoComplete, Input } from 'enquirer';
import { exec } from "child_process";

import { join } from 'path';
import { writeDeployment } from '../utils/writeDeployment';

async function deploy() {
    // TODO - 支持用户输入自定义地址
    // const filePath = join(__dirname, "../deployment/mainnetDeploymentOutput.json"); // 替换 'yourFileName.json' 为你的文件名
    // console.log("filePath ", filePath)
    // writeDeployment("../deployment/mainnetDeploymentOutput.json", network.name, usda.address, usda.deployTransaction.hash);
    // writeDeployment("../deployment/mainnetDeploymentOutput.json", "goerli", "0x00000000000", "0x00000000000");


    console.log("Before deployment please make sure your account have same nonces");
    const networks = ["arbitrumGoerli", "mumbai"];

    try {
        for (const network of networks) {
            console.log(`Deloying in ${network} USDA...`);
            exec(`hh run scripts/deployUSDA.ts --network ${network}`, (error: any, stdout: any, stderr: any) => {
                if (error) {
                    console.log(`${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`${stderr}`);
                    return;
                }
                console.log(`Deploy in ${network} USDA done`);
            });  
        }
    } catch (err) {
        console.log(err)
    }


    const prompt = new AutoComplete({
        type: 'autocomplete',
        name: 'network',
        message: 'Select a network to deploy?',
        initial: 0,
        choices: [
            { name: 'arbitrumGoerli' },
            { name: 'goerli' },
            { name: 'ethereum' },
            { name: 'arbiturm' },
        ],
    });

    try {
        const network: string = await prompt.run();
        exec(`ts-node ./deployment/core.ts --network ${network}`, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.log(`${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`${stderr}`);
                return;
            }
            console.log(`${stdout}`);
        });
    } catch (error) {
        console.log(error); // { username: 'jonschlinkert' }
    }
}

deploy();
