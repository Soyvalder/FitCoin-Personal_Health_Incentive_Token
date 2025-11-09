import * as dotenv from "dotenv";
dotenv.config();

import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/types";

const isValidPk = (pk?: string) => !!pk && pk.startsWith("0x") && pk.length === 66;
const accountsArbitrum = isValidPk(process.env.DEPLOYER_PRIVATE_KEY) ? [process.env.DEPLOYER_PRIVATE_KEY as string] : [];

const rpcUrlArbitrumSepolia = process.env.ALCHEMY_API_KEY
  ? `https://arb-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  : (process.env.ARB_SEPOLIA_RPC_URL || "https://sepolia-rollup.arbitrum.io/rpc");

const etherscanApiKey = process.env.ETHERSCAN_API_KEY || process.env.ARBISCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    arbitrumSepolia: {
      url: rpcUrlArbitrumSepolia,
      accounts: accountsArbitrum,
      chainId: 421614,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: etherscanApiKey,
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io",
        },
      },
    ],
  },
  // ... resto de config
};

export default config;