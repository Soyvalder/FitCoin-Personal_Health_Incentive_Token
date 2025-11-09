# 🚀 FitCoin – Activities and Rewards on Arbitrum

Small dapp to earn points (FIT) by completing activities and redeem rewards. The contract is deployed and verified on Arbitrum Sepolia, and the interface is ready to use.

**Verified contract:** `0x4BF07E7522DeE6D83F8EE66D12e1E88d28Eb9D24`

**Explorer:** https://sepolia.arbiscan.io/address/0x4BF07E7522DeE6D83F8EE66D12e1E88d28Eb9D24#code

## 📝 Brief Description

FitCoin lets users log activities to earn `FIT` tokens and redeem them for rewards. Simple rules: minimum 1 FIT per activity and maximum 100 FIT, and balance checks when redeeming.

## 🧰 Technologies Used

- Next.js + TypeScript + TailwindCSS ✨
- Wagmi + Viem + RainbowKit 🎒
- Hardhat + Etherscan (V2 verification) 🔧
- Arbitrum Sepolia (`chainId 421614`) 🌐
- Yarn (workspace monorepo) 🧶

## ⚙️ Technical Approach and Key Decisions

- Single extended ERC20 contract (`FitCoinToken`) with two business actions: `logActivity` (mint) and `redeemReward` (burn).
- Contract validations: `tokensToEarn > 0` and `≤ 100 * 10^decimals`; `tokensToBurn > 0` and `balance ≥ tokensToBurn`.
- Contract verified with Etherscan V2 (one API key, no per-network config).
- Frontend connects by contract name (`FitCoinToken`) reading address and ABI from `packages/nextjs/contracts/deployedContracts.ts` based on selected network.
- Target network configured in `packages/nextjs/scaffold.config.ts` (RPC: Alchemy if available, public fallback).

## ✨ Main Features

- Quick activity logging (Gym, Run, Yoga, Swimming) 🏃‍♂️
- Custom activities (1–100 FIT) 📝
- Rewards with FIT cost and locked state if balance is insufficient 🎁
- Balance display and updates after each action 💳
- Explorer links to review transactions 🔎

## 📦 Project Structure

- `packages/nextjs/`: Web interface (Next.js), hooks and components.
- `packages/nextjs/contracts/deployedContracts.ts`: Addresses and ABI per network.
- `packages/nextjs/scaffold.config.ts`: Network and RPC configuration.
- `packages/hardhat/`: Contract config, deployments and verification.
- `packages/hardhat/contracts/`: Solidity contracts (includes `FitCoinToken.sol`).
- `contracts/` and `packages/stylus/`: Stylus resources (not used in FitCoin).
- `nitro-devnode/`: Local Nitro node (not required for testnet dapp).

## 🚀 Deployment

### Smart Contract

- Network: Arbitrum Sepolia (`421614`).
- Address: `0x4BF07E7522DeE6D83F8EE66D12e1E88d28Eb9D24`.
- Verified on Arbiscan (V2) ✅.

If you need to redeploy:

- Configure `packages/hardhat/.env`:
  - `ALCHEMY_API_KEY=...`
  - `ARB_SEPOLIA_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc`
  - `DEPLOYER_PRIVATE_KEY=0x...`
  - `ETHERSCAN_API_KEY=...`
- Commands:
  - `yarn workspace @ss/hardhat deploy --network arbitrumSepolia`
  - `yarn workspace @ss/hardhat hardhat verify --network arbitrumSepolia <ADDRESS>`

### Interface (Frontend)

- Variables (optional):
  - `NEXT_PUBLIC_ALCHEMY_API_KEY=...`
  - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=...`
- Local development:
  - `yarn workspace @ss/nextjs dev`
  - Open `http://localhost:3001/` and connect your wallet.

### Test on Arbitrum (ARB)

- Connect your wallet to Arbitrum Sepolia.
- On “Home” hit “Gym 20 FIT” → balance +20.
- On “Rewards” redeem “Pizza 100 FIT” if you have balance → balance −100.
- Check both transactions in the explorer.

## 🔒 Smart Contract API

Contract: `FitCoinToken` (extended ERC20)

- `logActivity(string activityName, uint256 tokensToEarn)` → mints to `msg.sender`.
  - Rules: `tokensToEarn > 0` and `≤ 100 * 10^decimals`.
  - Event: `ActivityCompleted(address user, string activityName, uint256 tokensEarned, uint256 timestamp)`.
- `redeemReward(string rewardName, uint256 tokensToBurn)` → burns from `msg.sender`.
  - Rules: `tokensToBurn > 0` and `balance ≥ tokensToBurn`.
  - Event: `RewardRedeemed(address user, string rewardName, uint256 tokensBurned, uint256 timestamp)`.
- `mint(address to, uint256 amount)` → only `owner` (administration).
- Standard ERC20: `balanceOf`, `transfer`, `approve`, `allowance`, `transferFrom`, `totalSupply`, `decimals`.

## 🧪 Development Notes

- Target network: Arbitrum Sepolia (`421614`).
- Frontend resolves contract/ABI by name and network (`useDeployedContractInfo`).
- RPC: uses Alchemy if `NEXT_PUBLIC_ALCHEMY_API_KEY` exists, otherwise public fallback.
- Business validations in contract (limit 100, minimum 1, sufficient balance).
- Testing suggestion: screenshots before/after mint and redeem, and limit errors.
- Security: never share keys; keep `.env` variables out of version control.

---

Made with ❤️ to learn and test on Arbitrum ✨
