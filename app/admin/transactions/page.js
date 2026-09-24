"use client";
import { useState, useEffect } from "react";
import { IconArrowDown, IconArrowUp, IconArrowsExchange } from "@tabler/icons-react";
import StatusBadge from "../../components/StatusBadge";
import { supabase } from "../../lib/supabaseClient";

const tabs = ["All", "Deposits", "Withdrawals", "Swaps"];

const typeIcons = {
  Deposit: { icon: IconArrowDown, color: "#22C55E" },
  Withdraw: { icon: IconArrowUp, color: "#EF4444" },
  Swap: { icon: IconArrowsExchange, color: "#F5590E" },
};

const typeMap = { Deposits: "Deposit", Withdrawals: "Withdraw", Swaps: "Swap" };

export default function AdminTransactions() {
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: txRows } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });
      const { data: profileRows } = await supabase.from("profiles").select("id, username, email");

      const mapped = (txRows || []).map((t) => {
        const owner = (profileRows || []).find((p) => p.id === t.user_id);
        const amountNum = Number(t.amount || 0);
        let amountDisplay = `$${amountNum.toFixed(2)}`;
        if (t.type === "Deposit") amountDisplay = `+$${amountNum.toFixed(2)}`;
        if (t.type === "Withdraw") amountDisplay = `-$${amountNum.toFixed(2)}`;
        return {
          user: owner?.username || owner?.email || "Unknown user",
          type: t.type,
          amount: amountDisplay,
          status: t.status || "Completed",
          date: t.created_at ? new Date(t.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "",
        };
      });

      setTransactions(mapped);
      setLoading(false);
    }
    loadData();
  }, []);

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
        {!loading && filtered.map((tx, i) => {
          const meta = typeIcons[tx.type] || typeIcons.Deposit;
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
        {!loading && filtered.length === 0 && (
          <p className="text-vexo-muted text-sm text-center py-6">No transactions found.</p>
        )}
      </div>
    </main>
  );
}
