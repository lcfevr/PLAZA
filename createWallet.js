import { ethers } from 'ethers';
import fs from 'fs';
import { askQuestion } from "./utils/script.js";
import log from "./utils/logger.js"
import iniBapakBudi from "./utils/banner.js"


// 函数用于创建新钱包
function createNewWallet() {
    const wallet = ethers.Wallet.createRandom();

    const walletDetails = {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase
    };

    // 日志记录钱包详情
    log.info("创建了新的以太坊钱包:");
    log.info(`地址: ${walletDetails.address}`);
    log.info(`私钥: ${walletDetails.privateKey}`);
    log.info(`助记词: ${walletDetails.mnemonic}`);

    return walletDetails;
}

// 函数用于保存钱包到文件
function saveWalletToFile(walletDetails) {
    let wallets = [];
    if (fs.existsSync("wallets-tmp.json")) {
        const data = fs.readFileSync("wallets-tmp.json");
        wallets = JSON.parse(data);
    }

    wallets.push(walletDetails);

    fs.writeFileSync("wallets-tmp.json", JSON.stringify(wallets, null, 2));

    log.warn("钱包已保存到 wallets-tmp.json");
}

async function askingHowManyWallets() {
    const answer = await askQuestion('您想创建多少个钱包？ ');
    return parseInt(answer);
}

// 主函数
async function main() {
    log.warn(iniBapakBudi)
    const numWallets = await askingHowManyWallets();
    for (let i = 0; i < numWallets; i++) {
        log.info(`正在创建第${i + 1}个钱包...`);

        const newWallet = createNewWallet();
        saveWalletToFile(newWallet);
    }

    log.info("所有钱包已创建。");
}

// 运行
main();
