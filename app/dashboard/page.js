"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconBell, IconEye, IconEyeOff, IconSend2, IconArrowDown,
  IconArrowsExchange, IconCreditCard, IconCurrencyBitcoin,
  IconCurrencyEthereum, IconHexagon,
} from "@tabler/icons-react";
import Sparkline from "../components/Sparkline";
import AssetRow from "../components/AssetRow";
import BottomNav from "../components/BottomNav";

const assets = [
  { name: "Bitcoin", symbol: "BTC", icon: IconCurrencyBitcoin, iconColor: "#F7931A", amount: "0.412", value: "27,642.01", changePercent: "0.97" },
  { name: "Ethereum", symbol: "ETH", icon: IconCurrencyEthereum, iconColor: "#8A92B2", amount: "1.85", value: "6,556.18", changePercent: "1.87" },
  { name: "Polygon", symbol: "MATIC", icon: IconHexagon, iconColor: "#8247E5", amount: "1,240", value: "632.40", changePercent: "0.49" },
];

const recentActivity = [
  { label: "Deposit received", detail: "Sep 17", amount: "+$5,200.00" },
  { label: "Swap: BTC → ETH", detail: "Sep 16", amount: "" },
  { label: "Withdrawal", detail: "Sep 15", amount: "-$1,050.00" },
];

export default function Dashboard() {
  const [hidden, setHidden] = useState(false);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center font-bold">N</div>
          <div>
            <p className="text-vexo-muted text-xs">Good afternoon 👋</p>
            <p className="font-semibold text-sm">n.osborn@shakuro.com</p>
          </div>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
          <IconBell size={18} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-vexo-orange text-[10px] flex items-center justify-center text-white">2</span>
        </button>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">Total Portfolio Value</p>
          <button onClick={() => setHidden(!hidden)} className="text-vexo-muted">
            {hidden ? <IconEyeOff size={16} /> : <IconEye size={16} />}
          </button>
        </div>
        <p className="text-3xl font-bold mt-2">{hidden ? "••••••" : "$34,830.59"}</p>
        <p className="text-vexo-green text-sm mt-1">▲ +$2,979.23 (+130.62%) today</p>
        <div className="mt-4">
          <Sparkline data={[20, 24, 22, 28, 30, 29, 34, 38, 36, 42]} color="#F5590E" width={320} height={50} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: IconSend2, label: "Send" },
          { icon: IconArrowDown, label: "Receive" },
          { icon: IconArrowsExchange, label: "Swap" },
          { icon: IconCreditCard, label: "Card" },
        ].map((a) => (
          <button key={a.label} className="flex flex-col items-center gap-2 bg-vexo-card border border-vexo-border rounded-2xl py-4">
            <a.icon size={18} />
            <span className="text-xs font-semibold">{a.label}</span>
          </button>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">My Assets</p>
          <Link href="/dashboard/assets" className="text-vexo-orange text-xs font-semibold">View all</Link>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {assets.map((a) => (
            <AssetRow key={a.symbol} {...a} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">Recent Activity</p>
          <Link href="/dashboard/history" className="text-vexo-orange text-xs font-semibold">View all</Link>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-vexo-border last:border-none">
              <div>
                <p className="font-semibold text-sm">{a.label}</p>
                <p className="text-vexo-muted text-xs">{a.detail}</p>
              </div>
              {a.amount && <p className="font-semibold text-sm">{a.amount}</p>}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
