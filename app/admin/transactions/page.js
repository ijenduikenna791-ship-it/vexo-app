"use client";
import { useState } from "react";
import AdminBottomNav from "../../components/AdminBottomNav";

const tabs = ["All", "Deposits", "Withdrawals", "Swaps"];

const transactions = [
  { user: "Norman Osborn", type: "Deposit", amount: "+$5,200.00", status: "Completed", date: "Sep 17" },
  { user: "Priya Nair", type: "Withdraw", amount: "-$1,050.00", status: "Completed", date: "Sep 17" },
  { user: "Marcus Ade", type: "Swap", amount: "BTC → ETH", status: "Pending", date: "Sep 16" },
  { user: "Sarah Chen", type: "Deposit", amount: "+$800.00", status: "Completed", date: "Sep 16" },
  { user: "David Kim", type: "Withdraw", amount: "-$120.00", status: "Failed", date: "Sep 15" },
  { user: "Priya Nair", type: "Swap", amount: "ETH → USDT", status: "Completed", date: "Sep 15" },
];

const typeMap = { Deposits: "Deposit", Withdrawals: "Withdraw", Swaps: "Swap" };

const statusColor = {
  Completed: "text-vexo-green",
  Pending: "text-yellow-400",
  Failed: "text-red-400",
};

export default function AdminTransactions() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? transactions : transactions.filter((t) => t.type === typeMap[active]);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">Transactions</p>
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

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {filtered.map((tx, i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
            <div>
              <p className="font-semibold text-sm">{tx.user}</p>
              <p className="text-vexo-muted text-xs">{tx.type} · {tx.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">{tx.amount}</p>
              <p className={`text-xs ${statusColor[tx.status]}`}>{tx.status}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-vexo-muted text-sm text-center py-6">No transactions found.</p>
        )}
      </div>

      <AdminBottomNav />
    </main>
  );
}
