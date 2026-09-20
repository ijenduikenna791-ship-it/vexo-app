"use client";
import { useState } from "react";
import { IconArrowDown, IconArrowUp, IconArrowsExchange } from "@tabler/icons-react";
import UserAvatar from "../../components/UserAvatar";
import StatusBadge from "../../components/StatusBadge";
import AdminBottomNav from "../../components/AdminBottomNav";

const tabs = ["All", "Deposits", "Withdrawals", "Swaps"];

const typeIcons = {
  Deposit: { icon: IconArrowDown, color: "#22C55E" },
  Withdraw: { icon: IconArrowUp, color: "#EF4444" },
  Swap: { icon: IconArrowsExchange, color: "#F5590E" },
};

const transactions = [
  { user: "Norman Osborn", type: "Deposit", amount: "+$5,200.00", status: "Completed", date: "Sep 17" },
  { user: "Priya Nair", type: "Withdraw", amount: "-$1,050.00", status: "Completed", date: "Sep 17" },
  { user: "Marcus Ade", type: "Swap", amount: "BTC → ETH", status: "Pending", date: "Sep 16" },
  { user: "Sarah Chen", type: "Deposit", amount: "+$800.00", status: "Completed", date: "Sep 16" },
  { user: "David Kim", type: "Withdraw", amount: "-$120.00", status: "Failed", date: "Sep 15" },
  { user: "Priya Nair", type: "Swap", amount: "ETH → USDT", status: "Completed", date: "Sep 15" },
];

const typeMap = { Deposits: "Deposit", Withdrawals: "Withdraw", Swaps: "Swap" };

export default function AdminTransactions() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? transactions : transactions.filter((t) => t.type === typeMap[active]);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <div>
        <p className="text-vexo-orange text-xs font-semibold uppercase tracking-wide">Admin</p>
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
        {filtered.map((tx, i) => {
          const meta = typeIcons[tx.type];
          return (
            <div key={i} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}>
                  <meta.icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{tx.user}</p>
                  <p className="text-vexo-muted text-xs">{tx.type} · {tx.date}</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <p className="font-semibold text-sm">{tx.amount}</p>
                <StatusBadge status={tx.status} />
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-vexo-muted text-sm text-center py-6">No transactions found.</p>
        )}
      </div>

      <AdminBottomNav />
    </main>
  );
}
