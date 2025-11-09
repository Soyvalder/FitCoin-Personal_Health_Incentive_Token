// Configuration for scaffold-stylus

import { defineChain } from "viem";
import type { ScaffoldConfig } from "~~/utils/scaffold-eth/contract";

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const rpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  ? `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  : "https://sepolia-rollup.arbitrum.io/rpc";

const arbitrumSepolia = defineChain({
  id: 421614,
  name: "Arbitrum Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [rpcUrl] },
  },
  blockExplorers: {
    default: { name: "Arbiscan", url: "https://sepolia.arbiscan.io" },
  },
  testnet: true,
});

const scaffoldConfig = {
  targetNetworks: [arbitrumSepolia],
  pollingInterval: 30000,
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",
  onlyLocalBurnerWallet: false, // Cambiar a false para usar Metamask
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
