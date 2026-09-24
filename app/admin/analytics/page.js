"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminAnalytics() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalTx, setTotalTx] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { data: profileRows } = await supabase.from("profiles").select("*");
      const { data: walletRows } = await supabase.from("wallets").select("amount");
      const { data: txRows } = await supabase.from("transactions").select("id");

      setProfiles(profileRows || []);
      setTotalBalance((walletRows || []).reduce((sum, w) => sum + Number(w.amount || 0), 0));
      setTotalTx((txRows || []).length);
      setLoading(false);
    }
    loadData();
  }, []);

  const verified = profiles.filter((u) => u.kyc_status === "verified").length;

  const monthlyGrowth = (() => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, month: d.toLocaleString("default", { month: "short" }), users: 0 });
    }
    profiles.forEach((p) => {
      if (!p.created_at) return;
      const d = new Date(p.created_at);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const bucket = months.find((m) => m.key === key);
      if (bucket) bucket.users += 1;
    });
    let running = 0;
    return months.map((m) => { running += m.users; return { ...m, users: running }; });
  })();

  const maxUsers = Math.max(1, ...monthlyGrowth.map((m) => m.users));

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div>
        <p className="text-3xl font-bold">Analytics</p>
        <p className="text-vexo-muted text-sm mt-1">Platform performance at a glance</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Total balance</p>
          <p className="font-bold text-lg mt-1">${totalBalance.toLocaleString()}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Total transactions</p>
          <p className="font-bold text-lg mt-1">{totalTx}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Verified users</p>
          <p className="font-bold text-lg mt-1 text-vexo-green">{verified}/{profiles.length}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Avg balance</p>
          <p className="font-bold text-lg mt-1">${profiles.length ? Math.round(totalBalance / profiles.length).toLocaleString() : "0"}</p>
        </div>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
        <p className="font-semibold text-sm mb-4">User growth (last 6 months)</p>
        <div className="flex items-end justify-between gap-2 h-32">
          {monthlyGrowth.map((m) => (
            <div key={m.key} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-vexo-orange"
                style={{ height: `${(m.users / maxUsers) * 100}%` }}
              />
              <span className="text-vexo-muted text-[10px]">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-vexo-muted text-xs text-center">Live data from your database.</p>
    </main>
  );
}
