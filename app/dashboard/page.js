"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconBell, IconEye, IconEyeOff, IconSend2, IconArrowDown,
  IconArrowsExchange, IconCreditCard, IconCurrencyBitcoin,
  IconCurrencyEthereum, IconHexagon, IconCircleLetterB,
  IconCircleLetterS, IconCircleLetterX, IconCircleLetterT,
  IconCircleLetterA, IconCircleLetterD, IconTrendingUp, IconTrendingDown,
} from "@tabler/icons-react";
import Sparkline from "../components/Sparkline";
import BottomNav from "../components/BottomNav";
import { getSession } from "../lib/auth";
import { supabase } from "../lib/supabaseClient";

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

const quickActions = [
  { icon: IconSend2, label: "Send", href: "/dashboard/send", bg: "bg-vexo-green/15", color: "text-vexo-green" },
  { icon: IconArrowDown, label: "Deposit", href: "/dashboard/deposit", bg: "bg-blue-500/15", color: "text-blue-400" },
  { icon: IconArrowsExchange, label: "Swap", href: "/dashboard/swap", bg: "bg-vexo-orange/15", color: "text-vexo-orange" },
  { icon: IconCreditCard, label: "Withdraw", href: "/dashboard/withdraw", bg: "bg-purple-500/15", color: "text-purple-400" },
];

export default function Dashboard() {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [session, setSession] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/login");
      return;
    }
    setSession(s);
    loadData(s.id);
    loadUnreadCount(s.id);
  }, []);

  async function loadData(userId) {
    const { data: walletRows } = await supabase.from("wallets").select("*").eq("user_id", userId);
    const { data: txRows } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);
    setWallets(walletRows || []);
    setTransactions(txRows || []);
    setLoading(false);
  }

  async function loadUnreadCount(userId) {
    const { count } = await supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("read", false);
    setUnreadCount(count || 0);
  }

  const totalValue = wallets.reduce((sum, w) => {
    const price = coinMeta[w.symbol]?.price || 0;
    return sum + Number(w.amount) * price;
  }, 0);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-20 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center font-bold">
            {(session?.username || session?.email || "N")[0].toUpperCase()}
          </div>
          <div>
            <p className="text-vexo-muted text-xs">Good afternoon {"\u{1F44B}"}</p>
            <p className="font-semibold text-sm">{session?.email || ""}</p>
          </div>
        </div>
        <Link href="/dashboard/notifications" className="relative w-10 h-10 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
          <IconBell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-vexo-orange text-white text-[10px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">Total Portfolio Value</p>
          <button onClick={() => setHidden(!hidden)} className="text-vexo-muted">
            {hidden ? <IconEyeOff size={16} /> : <IconEye size={16} />}
          </button>
        </div>
        <p className="text-3xl font-bold mt-2">
          {loading ? "..." : hidden ? "••••••" : `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        </p>
        <div className="mt-4">
          <Sparkline data={[20, 24, 22, 28, 30, 29, 34, 38, 36, 42]} color="#F5590E" width={320} height={50} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((a) =>
          a.href ? (
            <Link key={a.label} href={a.href} className="flex flex-col items-center gap-2 bg-vexo-card border border-vexo-border rounded-2xl py-4">
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${a.bg} ${a.color}`}>
                <a.icon size={18} />
              </span>
              <span className="text-xs font-semibold">{a.label}</span>
            </Link>
          ) : (
            <button key={a.label} className="flex flex-col items-center gap-2 bg-vexo-card border border-vexo-border rounded-2xl py-4">
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${a.bg} ${a.color}`}>
                <a.icon size={18} />
              </span>
              <span className="text-xs font-semibold">{a.label}</span>
            </button>
          )
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">My Assets</p>
          <Link href="/dashboard/assets" className="text-vexo-orange text-xs font-semibold">View all</Link>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {Object.keys(coinMeta).map((symbol) => {
            const meta = coinMeta[symbol];
            const wallet = wallets.find((w) => w.symbol === symbol);
            const amount = wallet ? Number(wallet.amount) : 0;
            const value = (amount * (meta.price || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            const Icon = meta.icon || IconCurrencyBitcoin;
            const isUp = meta.change >= 0;
            const TrendIcon = isUp ? IconTrendingUp : IconTrendingDown;
            return (
              <Link key={symbol} href={`/dashboard/coin/${symbol}`} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${meta.iconColor}22` }}
                  >
                    <Icon size={20} style={{ color: meta.iconColor }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{meta.name}</p>
                    <p className="text-vexo-muted text-xs truncate">{amount.toFixed(6)} {symbol}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-sm">${amount > 0 ? value : "0"}</p>
                  <p className={`text-xs font-semibold flex items-center justify-end gap-1 ${isUp ? "text-vexo-green" : "text-red-400"}`}>
                    <TrendIcon size={12} /> {isUp ? "+" : ""}{meta.change}%
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">Recent Activity</p>
          <Link href="/dashboard/history" className="text-vexo-orange text-xs font-semibold">View all</Link>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {!loading && transactions.length === 0 && (
            <p className="text-vexo-muted text-sm text-center py-6">No activity yet.</p>
          )}
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-2 py-3 border-b border-vexo-border last:border-none">
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{t.type}</p>
                <p className="text-vexo-muted text-xs">{t.created_at ? new Date(t.created_at).toLocaleDateString() : ""}</p>
              </div>
              <p className="font-semibold text-sm shrink-0">${Number(t.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
