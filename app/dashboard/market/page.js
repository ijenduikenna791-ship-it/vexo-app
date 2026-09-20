"use client";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import Sparkline from "../../components/Sparkline";
import BottomNav from "../../components/BottomNav";

const tabs = ["All", "Favorites", "Gainers", "Losers"];

const stats = [
  { label: "Mkt Cap", value: "$2.7T", up: true },
  { label: "24h Vol", value: "$142B", up: false },
  { label: "BTC Dom", value: "49.2%", up: true },
  { label: "Fear/Greed", value: "68 Greed", up: true },
];

const coins = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", price: "$67,842.5", change: "+2.34%", up: true, sparkline: [10, 12, 11, 14, 16, 15, 18] },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", price: "$3,542.8", change: "+1.87%", up: true, sparkline: [8, 9, 8, 10, 12, 11, 13] },
  { symbol: "SOL", name: "Solana", icon: "◎", price: "$182.4", change: "+4.21%", up: true, sparkline: [7, 9, 10, 9, 12, 14, 15] },
  { symbol: "XRP", name: "XRP", icon: "✕", price: "$0.6182", change: "-0.87%", up: false, sparkline: [12, 11, 12, 10, 9, 10, 8] },
  { symbol: "ADA", name: "Cardano", icon: "𝔸", price: "$0.4821", change: "-1.23%", up: false, sparkline: [10, 9, 9, 8, 7, 8, 6] },
  { symbol: "DOGE", name: "Dogecoin", icon: "Ð", price: "$0.1634", change: "+3.45%", up: true, sparkline: [6, 7, 8, 8, 10, 11, 13] },
];

export default function Market() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = coins.filter((c) => {
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase()) || c.symbol.toLowerCase().includes(query.toLowerCase());
    const matchesTab = active === "All" || (active === "Gainers" && c.up) || (active === "Losers" && !c.up) || active === "Favorites";
    return matchesQuery && matchesTab;
  });

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <p className="text-3xl font-bold">Market</p>

      <div className="relative">
        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search coins..."
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

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-vexo-card border border-vexo-border rounded-xl p-3">
            <p className="text-vexo-muted text-xs">{s.label}</p>
            <p className={`font-bold text-sm mt-1 ${s.up ? "text-vexo-green" : "text-red-400"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {filtered.map((c) => (
          <div key={c.symbol} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-vexo-card2 flex items-center justify-center">{c.icon}</div>
              <div>
                <p className="font-semibold text-sm">{c.symbol}</p>
                <p className="text-vexo-muted text-xs">{c.name}</p>
              </div>
            </div>
            <Sparkline data={c.sparkline} color={c.up ? "#22c55e" : "#ef4444"} width={60} height={22} />
            <div className="text-right">
              <p className="font-semibold text-sm">{c.price}</p>
              <p className={`text-xs ${c.up ? "text-vexo-green" : "text-red-400"}`}>{c.change}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No coins found.</p>}
      </div>

      <BottomNav />
    </main>
  );
}
