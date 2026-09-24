"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  IconArrowLeft, IconSend2, IconArrowDown, IconArrowsExchange,
  IconCurrencyBitcoin, IconCurrencyEthereum, IconHexagon, IconCircleLetterB,
  IconCircleLetterS, IconCircleLetterX, IconCircleLetterT, IconCircleLetterA,
  IconCircleLetterD, IconTrendingUp, IconTrendingDown,
} from "@tabler/icons-react";
import Sparkline from "../../../components/Sparkline";
import { getSession } from "../../../lib/auth";
import { supabase } from "../../../lib/supabaseClient";

const coinMeta = {
  BTC: { name: "Bitcoin", icon: IconCurrencyBitcoin, iconColor: "#F7931A", price: 67842.5, change: 2.34 },
  ETH: { name: "Ethereum", icon: IconCurrencyEthereum, iconColor: "#8A92B2", price: 3542.8, change: 1.87 },
  BNB: { name: "BNB", icon: IconCircleLetterB, iconColor: "#F3BA2F", price: 580.2, change: 0.92 },
  SOL: { name: "Solana", icon: IconCircleLetterS, iconColor: "#9945FF", price: 182.4, change: 4.21 },
  XRP: { name: "XRP", icon: IconCircleLetterX, iconColor: "#23A9E0", price: 0.6182, change: -0.87 },
  USDT_TRC20: { name: "Tether (TRC-20)", icon: IconCircleLetterT, iconColor: "#26A17B", price: 1, change: 0.01 },
  USDT_ERC20: { name: "Tether (ERC-20)", icon: IconCircleLetterT, iconColor: "#1BA27A", price: 1, change: 0.01 },
  ADA: { name: "Cardano", icon: IconCircleLetterA, iconColor: "#0033AD", price: 0.4821, change: -1.23 },
  DOGE: { name: "Dogecoin", icon: IconCircleLetterD, iconColor: "#C2A633", price: 0.1634, change: 3.45 },
  MATIC: { name: "Polygon", icon: IconHexagon, iconColor: "#8247E5", price: 0.51, change: -0.34 },
  USDT: { name: "Tether", icon: IconCurrencyBitcoin, iconColor: "#26A17B", price: 1, change: 0.0 },
};

export default function CoinDetail() {
  const router = useRouter();
  const params = useParams();
  const symbol = decodeURIComponent(params?.symbol || "");
  const meta = coinMeta[symbol] || { name: symbol, icon: IconCurrencyBitcoin, iconColor: "#F5590E", price: 0, change: 0 };
  const Icon = meta.icon;
  const isUp = meta.change >= 0;
  const TrendIcon = isUp ? IconTrendingUp : IconTrendingDown;

  const [session, setSession] = useState(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/login");
      return;
    }
    setSession(s);
    loadWallet(s.id);
  }, []);

  async function loadWallet(userId) {
    const { data } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", userId)
      .eq("symbol", symbol)
      .maybeSingle();
    setAmount(data ? Number(data.amount) : 0);
    setLoading(false);
  }

  const value = (amount * (meta.price || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <button onClick={() => router.push("/dashboard")} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>

      <div className="flex flex-col items-center gap-3 py-2">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${meta.iconColor}22` }}>
          <Icon size={32} style={{ color: meta.iconColor }} />
        </div>
        <p className="text-lg font-bold">{meta.name}</p>
        <p className="text-3xl font-bold">{loading ? "..." : amount.toFixed(6)} {symbol}</p>
        <p className="text-vexo-muted text-sm">${loading ? "..." : value}</p>
        <p className={`text-xs font-semibold flex items-center gap-1 ${isUp ? "text-vexo-green" : "text-red-400"}`}>
          <TrendIcon size={12} /> {isUp ? "+" : ""}{meta.change}% today
        </p>
      </div>

      <div className="mt-2">
        <Sparkline data={[20, 24, 22, 28, 30, 29, 34, 38, 36, 42]} color={meta.iconColor} width={320} height={60} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Link href={`/dashboard/send?coin=${symbol}`} className="flex flex-col items-center gap-2 bg-vexo-card border border-vexo-border rounded-2xl py-4">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center bg-vexo-green/15 text-vexo-green">
            <IconSend2 size={18} />
          </span>
          <span className="text-xs font-semibold">Send</span>
        </Link>
        <Link href={`/dashboard/deposit?coin=${symbol}`} className="flex flex-col items-center gap-2 bg-vexo-card border border-vexo-border rounded-2xl py-4">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-500/15 text-blue-400">
            <IconArrowDown size={18} />
          </span>
          <span className="text-xs font-semibold">Receive</span>
        </Link>
        <Link href={`/dashboard/swap?coin=${symbol}`} className="flex flex-col items-center gap-2 bg-vexo-card border border-vexo-border rounded-2xl py-4">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center bg-vexo-orange/15 text-vexo-orange">
            <IconArrowsExchange size={18} />
          </span>
          <span className="text-xs font-semibold">Swap</span>
        </Link>
      </div>
    </main>
  );
}
