"use client";
import { useState } from "react";
import { IconSearch, IconRefresh, IconMailbox } from "@tabler/icons-react";
import BottomNav from "../../components/BottomNav";

const tabs = ["All", "Buy", "Sell", "Send", "Receive", "Swap"];

export default function History() {
  const [active, setActive] = useState("All");

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">History</p>
          <p className="text-vexo-muted text-sm mt-1">Your transaction history</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
          <IconRefresh size={16} />
        </button>
      </div>

      <div className="relative">
        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              active === tab ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3 text-center">
          <p className="text-vexo-green font-bold">+$0</p>
          <p className="text-vexo-muted text-xs mt-1">Total In</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3 text-center">
          <p className="text-red-400 font-bold">-$0</p>
          <p className="text-vexo-muted text-xs mt-1">Total Out</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3 text-center">
          <p className="font-bold">0</p>
          <p className="text-vexo-muted text-xs mt-1">Pending</p>
        </div>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl py-16 flex flex-col items-center gap-3">
        <IconMailbox size={32} className="text-vexo-muted" />
        <p className="text-vexo-muted text-sm">No transactions found</p>
      </div>

      <BottomNav />
    </main>
  );
}
