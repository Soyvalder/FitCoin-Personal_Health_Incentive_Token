"use client";

import { useAccount } from "wagmi";
import Link from "next/link";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { formatEther } from "viem";
import { useState } from "react";

export default function Home() {
  const { address } = useAccount();
  const [activityName, setActivityName] = useState("");
  const [tokensToEarn, setTokensToEarn] = useState("");

  // Leer balance del usuario
  const { data: balance } = useScaffoldReadContract({
    contractName: "FitCoinToken",
    functionName: "balanceOf",
    args: [address],
  });

  // Hook para registrar actividad
  const { writeContractAsync: logActivity, isPending } = useScaffoldWriteContract({
    contractName: "FitCoinToken",
  });

  // Actividades predefinidas
  const quickActivities = [
    { name: "🏋️ Gym", tokens: "20" },
    { name: "🏃 Run 5km", tokens: "15" },
    { name: "🧘 Yoga", tokens: "10" },
    { name: "🏊 Swimming", tokens: "15" },
  ];

  const handleQuickActivity = async (name: string, tokens: string) => {
    try {
      await logActivity({
        functionName: "logActivity",
        args: [name, BigInt(tokens) * BigInt(10 ** 18)],
      });
      alert(`Completed: ${name}! +${tokens} FIT 🎉`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error logging activity");
    }
  };

  const handleCustomActivity = async () => {
    if (!activityName || !tokensToEarn) {
      alert("Please fill out all fields");
      return;
    }

    try {
      await logActivity({
        functionName: "logActivity",
        args: [activityName, BigInt(tokensToEarn) * BigInt(10 ** 18)],
      });
      alert(`Completed: ${activityName}! +${tokensToEarn} FIT 🎉`);
      setActivityName("");
      setTokensToEarn("");
    } catch (error) {
      console.error("Error:", error);
      alert("Error logging activity");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      {/* Header */}
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-center mb-4">💪 FitCoin Tracker</h1>
        <p className="text-center text-lg opacity-70 mb-8">Earn tokens by completing healthy activities</p>

        {/* Rewards Link */}
        <div className="flex justify-center mb-6">
          <Link href="/rewards" className="btn btn-secondary">
            🎁 Go to Rewards
          </Link>
        </div>

        {/* Balance Card */}
        <div className="card bg-primary text-primary-content shadow-xl mb-8">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl">Your Balance</h2>
            <p className="text-6xl font-bold mt-4">{balance ? formatEther(balance) : "0"} FIT</p>
            <p className="text-sm opacity-70 mt-2">🪙 Tokens earned</p>
          </div>
        </div>

        {/* Quick Activities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">⚡ Quick Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActivities.map((activity, index) => (
              <div key={index} className="card bg-base-200 shadow-xl hover:shadow-2xl transition">
                <div className="card-body items-center text-center p-6">
                  <p className="text-4xl mb-2">{activity.name.split(" ")[0]}</p>
                  <h3 className="font-bold">{activity.name.split(" ").slice(1).join(" ")}</h3>
                  <div className="badge badge-primary mt-2">+{activity.tokens} FIT</div>
                  <button
                    className="btn btn-primary btn-sm mt-4 w-full"
                    onClick={() => handleQuickActivity(activity.name, activity.tokens)}
                    disabled={isPending || !address}
                  >
                    {isPending ? "⏳" : "✓ Completed"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Activity */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">➕ Custom Activity</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Activity name</span>
              </label>
              <input
                type="text"
                placeholder="e.g., 10km Walk"
                className="input input-bordered"
                value={activityName}
                onChange={e => setActivityName(e.target.value)}
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Tokens to earn (max 100)</span>
              </label>
              <input
                type="number"
                placeholder="e.g., 25"
                className="input input-bordered"
                value={tokensToEarn}
                onChange={e => setTokensToEarn(e.target.value)}
                max="100"
              />
            </div>
            <button className="btn btn-primary mt-6" onClick={handleCustomActivity} disabled={isPending || !address}>
              {isPending ? "Registrando..." : "🎯 Registrar Actividad"}
            </button>
          </div>
        </div>

        {/* Conectar Wallet */}
        {!address && (
          <div className="alert alert-warning mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Por favor conecta tu wallet para comenzar</span>
          </div>
        )}
      </div>
    </div>
  );
}
