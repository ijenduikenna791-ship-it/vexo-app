"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IconUsers, IconChartBar, IconWallet, IconClockHour4 } from "@tabler/icons-react";
import AdminBottomNav from "../components/AdminBottomNav";
import { supabase } from "../lib/supabaseClient";

export default function AdminOverview() {
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [volume24h, setVolume24h] = useState(0);
  const [activeWallets, setActiveWallets] = useState(0);
  const [pendingKyc, setPendingKyc] = useState(0);
  const [recentTx, setRecentTx] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: profileRows } = await supabase.from("profiles").select("id, kyc_status");
      const { data: walletRows } = await supabase.from("wallets").select("id, amount");

      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { data: recentTxRows } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      const txList = recentTxRows || [];
      const userIds = [...new Set(txList.map((t) => t.user_id).filter(Boolean))];
      let profileMap = {};
      if (userIds.length > 0) {
        const { data: txProfiles } = await supabase.from("profiles").select("id, username, email").in("id", userIds);
        (txProfiles || []).forEach((p) => { profileMap[p.id] = p.username || p.email || "Unknown user"; });
      }

      const volume = txList
        .filter((t) => t.created_at && t.created_at >= cutoff)
        .reduce((sum, t) => sum + Math.abs(Number(t.amount || 0)), 0);

      setTotalUsers((profileRows || []).length);
      setPendingKyc((profileRows || []).filter((p) => p.kyc_status === "submitted").length);
      setActiveWallets((walletRows || []).filter((w) => Number(w.amount) > 0).length);
      setVolume24h(volume);
      setRecentTx(
        txList.slice(0, 5).map((t) => ({
          user: profileMap[t.user_id] || "Unknown user",
          type: t.type,
          amount: `$${Number(t.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          status: t.status || "Pending",
        }))
      );
      setLoading(false);
    }
    loadData();
  }, []);

  const stats = [
    { icon: IconUsers, label: "Total Users", value: loading ? "..." : totalUsers.toLocaleString(), bg: "bg-blue-500/15", color: "text-blue-400" },
    { icon: IconChartBar, label: "24h Volume", value: loading ? "..." : `${volume24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, bg: "bg-vexo-orange/15", color: "text-vexo-orange" },
    { icon: IconWallet, label: "Active Wallets", value: loading ? "..." : activeWallets.toLocaleString(), bg: "bg-vexo-green/15", color: "text-vexo-green" },
    { icon: IconClockHour4, label: "Pending KYC", value: loading ? "..." : pendingKyc.toLocaleString(), bg: "bg-amber-500/15", color: "text-amber-400", href: "/admin/kyc" },
  ];

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">Overview</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => {
          const CardTag = s.href ? Link : "div";
          const cardProps = s.href ? { href: s.href } : {};
          return (
            <CardTag key={s.label} {...cardProps} className="bg-vexo-card border border-vexo-border rounded-2xl p-4 block">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.bg} ${s.color}`}>
                <s.icon size={18} />
              </div>
              <p className="font-bold text-lg leading-tight">{s.value}</p>
              <p className="text-vexo-muted text-xs mt-1">{s.label}</p>
            </CardTag>
          );
        })}
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Recent Transactions</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {!loading && recentTx.length === 0 && (
            <p className="text-vexo-muted text-sm text-center py-6">No transactions yet.</p>
          )}
          {recentTx.map((tx, i) => (
            <div key={i} className="flex items-center justify-between gap-2 py-4 border-b border-vexo-border last:border-none">
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{tx.user}</p>
                <p className="text-vexo-muted text-xs truncate">{tx.type}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-sm">{tx.amount}</p>
                <p className={`text-xs ${tx.status === "Completed" ? "text-vexo-green" : tx.status === "Failed" || tx.status === "Rejected" ? "text-red-400" : "text-yellow-400"}`}>{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminBottomNav />
    </main>
  );
}
