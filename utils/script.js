import fs from 'fs';
import readline from 'readline';
import log from './logger.js';
import { ethers } from 'ethers';

export async function askQuestion(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

export function readProxyFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const proxyArray = data.split('\n').map(line => line.trim()).filter(line => line);
        if (proxyArray.length === 0) {
            log.warn('文件中未找到代理。');
        }
        return proxyArray;
    } catch (error) {
        log.error('读取代理文件时出错:', error);
        return [];
    }
}

// 从wallets.json读取钱包
export function readWallets() {
    if (fs.existsSync("wallets.json")) {
        const data = fs.readFileSync("wallets.json");
        return JSON.parse(data);
    } else {
        log.info("在wallets.json中未找到钱包");
        return [];
    }
}

// 发送资金到钱包的函数
export async function sendFaucet(faucetAmount, addressRecipient, pvkey) {
    log.info(`发送水龙头 ${faucetAmount} 到地址 ${addressRecipient}`);
    try {
        const provider = new ethers.JsonRpcProvider('https://base.llamarpc.com');
        const wallet = new ethers.Wallet(pvkey, provider);
        const feeData = await provider.getFeeData();

        const tx = {
            to: addressRecipient,
            value: ethers.parseEther(faucetAmount),
            gasLimit: 21000,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas || feeData.gasPrice,
            maxFeePerGas: feeData.maxFeePerGas || feeData.gasPrice
        };

        const txResponse = await wallet.sendTransaction(tx);
        log.info(`交易发送到 ${addressRecipient}: https://basescan.org/tx/${txResponse.hash}`);

        await txResponse.wait();
        return txResponse.hash;
    } catch (error) {
        log.error("发送水龙头时出错:", error);
        return null;
    }
}
