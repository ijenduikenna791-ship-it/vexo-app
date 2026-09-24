"use client";
import { useState, useEffect } from "react";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const coinNames = { BTC: "Bitcoin", ETH: "Ethereum", MATIC: "Polygon" };

export default function AdminWallets() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: walletRows } = await supabase.from("wallets").select("*");
      const { data: profileRows } = await supabase.from("profiles").select("id, username, email");

      const mapped = (walletRows || []).map((w) => {
        const owner = (profileRows || []).find((p) => p.id === w.user_id);
        return {
          asset: coinNames[w.symbol] || w.symbol,
          symbol: w.symbol,
          balance: w.amount,
          userName: owner?.username || owner?.email || "Unknown user",
        };
      });

      setWallets(mapped);
      setLoading(false);
    }
    loadData();
  }, []);

  const filtered = wallets.filter((w) => {
    const q = query.toLowerCase();
    return !q || w.asset.toLowerCase().includes(q) || w.userName.toLowerCase().includes(q);
  });

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div>
        <p className="text-3xl font-bold">Wallets</p>
        <p className="text-vexo-muted text-sm mt-1">{wallets.length} wallets across all users</p>
      </div>

      <div className="relative">
        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by asset or user"
          className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
        />
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {!loading && filtered.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No wallets found.</p>}
        {filtered.map((w, i) => (
          <div key={i} className="py-3 border-b border-vexo-border last:border-none">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{w.asset} ({w.symbol})</span>
            </div>
            <p className="text-vexo-muted text-xs mt-1">{w.userName}</p>
            <p className="text-sm font-semibold mt-1">{w.balance} {w.symbol}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
