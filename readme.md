# 🚀 FitCoin — Activities and Rewards on Arbitrum

[![Template: Scaffold-ETH 2](https://img.shields.io/badge/Template-Scaffold--ETH%202-2C4DF7)](https://github.com/scaffold-eth/scaffold-eth-2)
[![Includes: Scaffold-Stylus](https://img.shields.io/badge/Includes-Scaffold--Stylus-F26B00)](https://github.com/OffchainLabs/scaffold-stylus)

Small dApp to earn points (`FIT`) by logging activities and redeeming rewards. The contract is deployed and verified on Arbitrum Sepolia, and the interface is ready to use.

- Verified contract: `0x4BF07E7522DeE6D83F8EE66D12e1E88d28Eb9D24`
- Explorer: https://sepolia.arbiscan.io/address/0x4BF07E7522DeE6D83F8EE66D12e1E88d28Eb9D24#code
- Website: https://fit-coin-personal-health-incentive-eight.vercel.app/

## 📝 What is FitCoin

Log activities (Gym, Running, Yoga, Swimming, and custom ones) to earn between 1 and 100 FIT per action. Use your FIT to redeem rewards. The contract enforces limits and checks available balance.

## 🧰 Technologies

- `Next.js`, `TypeScript`, `TailwindCSS`
- `Wagmi`, `Viem`, `RainbowKit`
- `Hardhat` with `Etherscan V2` verification
- Network: Arbitrum Sepolia (`chainId 421614`)
- Monorepo with `Yarn`

## ✨ Features

- Quickly log activities (20–100 FIT) and custom ones (1–100 FIT)
- Show balance and refresh it after each action
- Redeem rewards; rewards are locked if balance is insufficient
- Explorer links to review transactions

## 📦 Project Structure

- `packages/nextjs/`: Web interface (Next.js), hooks and components
- `packages/nextjs/contracts/deployedContracts.ts`: Addresses and ABI per network
- `packages/nextjs/scaffold.config.ts`: Network and RPC configuration
- `packages/hardhat/`: Contract configuration, deployments and verification
- `packages/hardhat/contracts/`: Solidity contracts (`FitCoinToken.sol`)
- `contracts/` and `packages/stylus/`: Stylus resources (not used in FitCoin)
- `nitro-devnode/`: Local Nitro node (not required for testnet)

## 🧩 Templates and Scope

- Base template: Scaffold‑ETH 2 (Next.js + Hardhat). Used for the active frontend and smart contracts.
- Optional resources: Scaffold‑Stylus available under `packages/stylus/` and `nitro-devnode/` for experimentation; not used by FitCoin in production.
- When to use Stylus: if deploying Stylus contracts on Arbitrum Nitro. See `nitro-devnode/README.md` and the Scaffold‑Stylus repo for setup.

## 🚀 Deployment

### Smart Contract

- Network: Arbitrum Sepolia (`421614`)
- Address: `0x4BF07E7522DeE6D83F8EE66D12e1E88d28Eb9D24`
- Verified on Arbiscan (V2) ✅

### Interface (Frontend)

- Local development:
  - `yarn workspace @ss/nextjs dev`
  - Open `http://localhost:3001/` and connect your wallet
- Optional variables:
  - `NEXT_PUBLIC_ALCHEMY_API_KEY=...`
  - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=...`

## 🔒 Smart Contract API

Contract: `FitCoinToken` (extended ERC20)

- `logActivity(string activityName, uint256 tokensToEarn)` → mints to `msg.sender`
  - Rules: `tokensToEarn > 0` and `≤ 100 * 10^decimals`
  - Event: `ActivityCompleted(address user, string activityName, uint256 tokensEarned, uint256 timestamp)`
- `redeemReward(string rewardName, uint256 tokensToBurn)` → burns from `msg.sender`
  - Rules: `tokensToBurn > 0` and `balance ≥ tokensToBurn`
  - Event: `RewardRedeemed(address user, string rewardName, uint256 tokensBurned, uint256 timestamp)`
- `mint(address to, uint256 amount)` → only `owner`
- Standard ERC20: `balanceOf`, `transfer`, `approve`, `allowance`, `transferFrom`, `totalSupply`, `decimals`

## 🧪 Development Notes

- Target network: Arbitrum Sepolia (`421614`)
- Frontend resolves contract/ABI by name and network (`useDeployedContractInfo`)
- RPC: uses Alchemy if `NEXT_PUBLIC_ALCHEMY_API_KEY` exists, otherwise public fallback
- Business validations in contract (limit 100, minimum 1, sufficient balance)
- Security: never share keys; keep `.env` out of the repository

---

Built with ❤️ to learn and test on Arbitrum ✨
