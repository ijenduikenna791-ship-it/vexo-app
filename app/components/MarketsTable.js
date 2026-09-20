"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const tabs = ["All", "DeFi", "Layer 1", "Stablecoins"];

const assets = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", change: "+2.34%", price: "$67,842.5", up: true },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", change: "+1.87%", price: "$3,542.8", up: true },
  { symbol: "SOL", name: "Solana", icon: "◎", change: "+4.21%", price: "$182.4", up: true },
  { symbol: "XRP", name: "XRP", icon: "✕", change: "-0.87%", price: "$0.6182", up: false },
  { symbol: "ADA", name: "Cardano", icon: "𝔸", change: "-1.23%", price: "$0.4821", up: false },
  { symbol: "DOGE", name: "Dogecoin", icon: "Ð", change: "+3.45%", price: "$0.1634", up: true },
  { symbol: "USDT", name: "Tether", icon: "₮", change: "+0.01%", price: "$1.00", up: true },
  { symbol: "BNB", name: "BNB", icon: "B", change: "+0.92%", price: "$582.3", up: true },
];

export default function MarketsTable() {
  const [active, setActive] = useState("All");

  return (
    <section id="markets" className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  active === tab ? "bg-vexo-orange text-white scale-105" : "bg-vexo-card2 text-vexo-muted hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-2 text-vexo-green text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-vexo-green animate-pulse" /> Live
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-3 sm:px-6">
          <div className="flex justify-between text-vexo-muted text-xs uppercase tracking-wide py-3 border-b border-vexo-border">
            <span>Asset</span>
            <span>24h · Price</span>
          </div>
          {assets.map((a) => (
            <div key={a.symbol} className="flex items-center justify-between gap-2 py-4 border-b border-vexo-border last:border-none transition-colors duration-200 hover:bg-vexo-card2/50 rounded-lg px-2 -mx-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-vexo-card2 flex items-center justify-center shrink-0">{a.icon}</div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{a.symbol}</p>
                  <p className="text-vexo-muted text-xs truncate">{a.name}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-semibold ${a.up ? "text-vexo-green" : "text-red-400"}`}>{a.change}</p>
                <p className="font-semibold text-sm">{a.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
