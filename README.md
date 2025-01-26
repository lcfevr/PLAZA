# PLAZA FINANCE BOT 使用默认认为知晓女巫风险 女巫风险自负！
Plaza是一个在Base上提供链上债券和杠杆的平台。

Plaza是一个在Base上构建的Solidity智能合约集，用于创建可编程衍生品。它提供两种核心产品：bondETH和levETH，这些是基于ETH流动性质押衍生品（LSTs）和流动性再质押衍生品（LRTs）如wstETH的可编程衍生品。用户可以存入基础池资产如wstETH，并接收levETH或bondETH，这些以ERC20代币形式体现。这些代币可以与DEX、借贷市场、再质押平台等协议进行组合。

![banner](image/image.png)

- 网站 [https://testnet.plaza.finance/](https://testnet.plaza.finance/rewards/0WkJP1uDWPis)
- 推特 [@plaza_finance](https://x.com/plaza_finance)

## 更新 

- `git pull` 后必须重新安装依赖：`npm install`
- 现在自动发送从一个钱包到另一个钱包，而不是从主钱包到所有钱包。

## 特性

- **每日自动交易**
- **自动获取水龙头**
- **自动生成新钱包**
- **发送资金到现有地址**
- **所有钱包信息保存在 wallets.json 中**
- **支持使用代理**

## 要求

- **Node.js**: 请确保已安装 Node.js。
- **npm**: 请确保已安装 npm。
- **钱包必须在eth/base/arb主网上有$1以获取水龙头**
- **使用自动发送功能向现有钱包发送资金**：每个地址发送 `0.00031` eth(大于1u)

## 设置

1. 克隆此仓库：
   ```bash
   git clone https://github.com/Gzgod/plaza.git
   cd plaza
   ```
2. 安装依赖：
   ```bash
   npm install
   ```
3. 设置：创建新钱包
   ```bash
   npm run create
   ```

4. 额外功能：

- 发送资金到现有地址

    ```bash
    npm run autosend
    ```
- 使用代理：可选，将代理粘贴到 proxy.txt 文件中。每行一个代理。
    ```bash
    nano proxy.txt
    ```
    格式：`http://user:password@ip:port`

5. 运行脚本：
   ```bash
   npm run start
   ```

## ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

此项目采用 [MIT License](LICENSE) 许可。
