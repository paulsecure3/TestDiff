import fs from 'fs';
import { join } from 'path';

export const writeDeployment = async (path: string, network: string, address: string, txHash: string) => {
    const filePath = join(__dirname, path); // 替换 'yourFileName.json' 为你的文件名

    // 检查文件是否存在
    if (fs.existsSync(filePath)) {
        console.log('File exists. Writing data...');
    } else {
        console.log('File does not exist. Creating and writing data...');
    }

    // 读取 JSON 文件
    // 读取文件内容
    // 读取文件内容
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        // 解析 JSON 数据
        const jsonData = JSON.parse(data);

        // 往 JSON 数据中插入新的数据
        jsonData[`${network}USDA`] = {
            address,
            txHash,
        }

        if (!jsonData[`USDAToken`]) {
            jsonData[`USDAToken`] = {
                address,
            }
        }


        console.log("jsonData ", jsonData)

        // 将更新后的 JSON 数据写回文件
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 4));
    } catch (err: any) {
        console.error('Error:', err);
    }
}