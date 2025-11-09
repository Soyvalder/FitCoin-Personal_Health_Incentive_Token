"use client";

import { useAccount } from "wagmi";
import Link from "next/link";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { formatEther } from "viem";

const rewards = [
  { name: "🍕 Pizza cheat meal", cost: "100" },
  { name: "🎬 Movie night", cost: "80" },
  { name: "☕ Premium coffee", cost: "20" },
  { name: "🧖 Spa day", cost: "150" },
];

export default function RewardsPage() {
  const { address } = useAccount();

  const { data: balance } = useScaffoldReadContract({
    contractName: "FitCoinToken",
    functionName: "balanceOf",
    args: [address],
  });

  const { writeContractAsync: writeAsync, isPending } = useScaffoldWriteContract({
    contractName: "FitCoinToken",
  });

  const redeem = async (rewardName: string, cost: string) => {
    try {
      await writeAsync({
        functionName: "redeemReward",
        args: [rewardName, BigInt(cost) * BigInt(10 ** 18)],
      });
      alert(`Redeemed: ${rewardName} for ${cost} FIT ✨`);
    } catch (err) {
      console.error(err);
      alert("Error redeeming reward");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-center mb-4">🎁 Rewards</h1>
        <p className="text-center text-lg opacity-70 mb-8">Redeem your FIT for rewards</p>

        {/* Balance */}
        <div className="card bg-secondary text-secondary-content shadow-xl mb-8">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl">Your Balance</h2>
            <p className="text-6xl font-bold mt-4">{balance ? formatEther(balance) : "0"} FIT</p>
            <p className="text-sm opacity-70 mt-2">🔥 Tokens available to redeem</p>
          </div>
        </div>

        {/* Rewards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((r, i) => {
            const costWei = BigInt(r.cost) * BigInt(10 ** 18);
            const locked = balance ? balance < costWei : true;
            return (
              <div key={i} className="card bg-base-200 shadow-xl">
                <div className="card-body items-center text-center p-6">
                  <p className="text-4xl mb-2">{r.name.split(" ")[0]}</p>
                  <h3 className="font-bold">{r.name.split(" ").slice(1).join(" ")}</h3>
                  <div className="badge badge-accent mt-2">-{r.cost} FIT</div>
                  <button
                    className={`btn btn-primary btn-sm mt-4 w-full ${locked ? "btn-disabled" : ""}`}
                    onClick={() => redeem(r.name, r.cost)}
                    disabled={isPending || !address || locked}
                  >
                    {locked ? "🔒 Locked" : isPending ? "⏳" : "✨ Redeem"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link href="/" className="link link-primary">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
