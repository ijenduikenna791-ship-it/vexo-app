"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";
import {
  IconCurrencyBitcoin, IconCurrencyEthereum, IconHexagon, IconCircleLetterB,
  IconCircleLetterS, IconCircleLetterX, IconCircleLetterT,
  IconCircleLetterA, IconCircleLetterD,
} from "@tabler/icons-react";
import { getSession } from "../../lib/auth";
import { supabase } from "../../lib/supabaseClient";

const coinMeta = {
  BTC: { name: "Bitcoin", icon: IconCurrencyBitcoin, iconColor: "#F7931A", price: 67842.5 },
  ETH: { name: "Ethereum", icon: IconCurrencyEthereum, iconColor: "#8A92B2", price: 3542.8 },
  BNB: { name: "BNB", icon: IconCircleLetterB, iconColor: "#F3BA2F", price: 580.2 },
  SOL: { name: "Solana", icon: IconCircleLetterS, iconColor: "#9945FF", price: 182.4 },
  XRP: { name: "XRP", icon: IconCircleLetterX, iconColor: "#23A9E0", price: 0.6182 },
  USDT_TRC20: { name: "Tether (TRC-20)", icon: IconCircleLetterT, iconColor: "#26A17B", price: 1 },
  USDT_ERC20: { name: "Tether (ERC-20)", icon: IconCircleLetterT, iconColor: "#1BA27A", price: 1 },
  ADA: { name: "Cardano", icon: IconCircleLetterA, iconColor: "#0033AD", price: 0.4821 },
  DOGE: { name: "Dogecoin", icon: IconCircleLetterD, iconColor: "#C2A633", price: 0.1634 },
  MATIC: { name: "Polygon", icon: IconHexagon, iconColor: "#8247E5", price: 0.51 },
  USDT: { name: "Tether", icon: IconCurrencyBitcoin, iconColor: "#26A17B", price: 1 },
};

export default function Assets() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/login");
      return;
    }
    setSession(s);
    loadWallets(s.id);
  }, []);

  async function loadWallets(userId) {
    const { data } = await supabase.from("wallets").select("*").eq("user_id", userId);
    setWallets(data || []);
    setLoading(false);
  }

  const totalValue = wallets.reduce((sum, w) => {
    const price = coinMeta[w.symbol]?.price || 0;
    return sum + Number(w.amount) * price;
  }, 0);

  const filtered = wallets.filter((w) => {
    const meta = coinMeta[w.symbol] || {};
    const q = query.toLowerCase();
    return w.symbol.toLowerCase().includes(q) || (meta.name || "").toLowerCase().includes(q);
  });

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.push("/dashboard")} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>

      <p className="text-2xl font-bold">My Assets</p>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Total Value</p>
        <p className="text-3xl font-bold mt-2">
          {loading ? "..." : `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        </p>
      </div>

      <div className="relative">
        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search assets"
          className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
        />
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {!loading && filtered.length === 0 && (
          <p className="text-vexo-muted text-sm text-center py-6">
            {wallets.length === 0 ? "No assets yet." : "No assets match your search."}
          </p>
        )}
        {filtered.map((w) => {
          const meta = coinMeta[w.symbol] || {};
          const Icon = meta.icon || IconCurrencyBitcoin;
          const price = meta.price || 0;
          const value = (Number(w.amount) * price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          return (
            <div key={w.id} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${meta.iconColor || "#F5590E"}22` }}
                >
                  <Icon size={20} style={{ color: meta.iconColor || "#F5590E" }} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{meta.name || w.symbol}</p>
                  <p className="text-vexo-muted text-xs">{w.amount} {w.symbol}</p>
                </div>
              </div>
              <p className="font-semibold text-sm">${value}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
