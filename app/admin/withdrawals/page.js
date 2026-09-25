"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { supabase } from "../../lib/supabaseClient";
import StatusBadge from "../../components/StatusBadge";

export default function AdminWithdrawals() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [withdrawals, setWithdrawals] = useState([]);
  const [processingId, setProcessingId] = useState(null);

  async function notifyUser(userId, message, type) {
    await supabase.from("notifications").insert({ user_id: userId, message, type: type || "info", read: false });
  }

  async function findMatchingWithdrawalTransaction(w) {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", w.user_id)
      .eq("type", `Withdrawal request: ${w.amount} ${w.asset}`)
      .eq("status", "Pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    return data || null;
  }

  async function approveWithdrawal(w) {
    setProcessingId(w.id);

    await supabase.from("withdrawals").update({ status: "Approved" }).eq("id", w.id);

    const matchingTx = await findMatchingWithdrawalTransaction(w);
    if (matchingTx) {
      await supabase.from("transactions").update({ status: "Completed" }).eq("id", matchingTx.id);
    }

    await notifyUser(w.user_id, `Your withdrawal of ${w.amount} ${w.asset} was approved and sent.`, "success");

    setWithdrawals((prev) => prev.map((x) => (x.id === w.id ? { ...x, status: "Approved" } : x)));
    setProcessingId(null);
  }

  async function rejectWithdrawal(w) {
    setProcessingId(w.id);

    const { data: walletRow } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", w.user_id)
      .eq("symbol", w.asset)
      .maybeSingle();

    if (walletRow) {
      await supabase
        .from("wallets")
        .update({ amount: Number(walletRow.amount) + Number(w.amount) })
        .eq("id", walletRow.id);
    } else {
      await supabase.from("wallets").insert({ user_id: w.user_id, symbol: w.asset, amount: w.amount });
    }

    await supabase.from("withdrawals").update({ status: "Rejected" }).eq("id", w.id);

    const matchingTx = await findMatchingWithdrawalTransaction(w);
    if (matchingTx) {
      await supabase.from("transactions").update({ status: "Failed" }).eq("id", matchingTx.id);
    }

    await notifyUser(w.user_id, `Your withdrawal of ${w.amount} ${w.asset} was rejected and refunded to your balance.`, "error");

    setWithdrawals((prev) => prev.map((x) => (x.id === w.id ? { ...x, status: "Rejected" } : x)));
    setProcessingId(null);
  }

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

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {!loading && withdrawals.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No withdrawals found.</p>}
        {withdrawals.map((w) => (
          <div key={w.id} className="py-3 border-b border-vexo-border last:border-none">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{w.asset} · {w.network}</span>
              <StatusBadge status={w.status || "Pending"} />
            </div>
            <p className="text-vexo-muted text-xs mt-1 break-all">{w.userName} · To {w.destination}</p>
            <p className="text-sm font-semibold mt-1">Net: {w.net} {w.asset} (fee {w.fee})</p>
            {(w.status || "Pending") === "Pending" && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => approveWithdrawal(w)}
                  disabled={processingId === w.id}
                  className="flex-1 py-1.5 rounded-lg bg-vexo-green/20 text-vexo-green text-xs font-semibold disabled:opacity-60"
                >
                  {processingId === w.id ? "Working..." : "Approve"}
                </button>
                <button
                  onClick={() => rejectWithdrawal(w)}
                  disabled={processingId === w.id}
                  className="flex-1 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold disabled:opacity-60"
                >
                  {processingId === w.id ? "Working..." : "Reject"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
