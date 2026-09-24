"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { supabase } from "../../lib/supabaseClient";
import StatusBadge from "../../components/StatusBadge";
import BackendNotice from "../../components/admin/BackendNotice";

export default function AdminWithdrawals() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [withdrawals, setWithdrawals] = useState([]);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data: rows } = await supabase.from("withdrawals").select("*").order("created_at", { ascending: false });
      const { data: profileRows } = await supabase.from("profiles").select("id, username, email");

      const mapped = (rows || []).map((w) => {
        const owner = (profileRows || []).find((p) => p.id === w.user_id);
        return { ...w, userName: owner?.username || owner?.email || "Unknown user" };
      });

      setWithdrawals(mapped);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div>
        <p className="text-3xl font-bold">Withdrawals</p>
        <p className="text-vexo-muted text-sm mt-1">{withdrawals.length} withdrawals across all users</p>
      </div>

      {notice && (
        <BackendNotice message="Approving or rejecting a withdrawal must move real funds and write an audit log entry. No data was changed here." />
      )}

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {!loading && withdrawals.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No withdrawals found.</p>}
        {withdrawals.map((w) => (
          <div key={w.id} className="py-3 border-b border-vexo-border last:border-none">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{w.asset} · {w.network}</span>
              <StatusBadge status={w.status || "Pending"} />
            </div>
            <p className="text-vexo-muted text-xs mt-1">{w.userName} · To {w.destination}</p>
            <p className="text-sm font-semibold mt-1">Net: {w.net} {w.asset} (fee {w.fee})</p>
            {(w.status || "Pending") === "Pending" && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => setNotice(true)} className="flex-1 py-1.5 rounded-lg bg-vexo-green/20 text-vexo-green text-xs font-semibold">Approve</button>
                <button onClick={() => setNotice(true)} className="flex-1 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold">Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
