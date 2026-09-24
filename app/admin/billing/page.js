"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { supabase } from "../../lib/supabaseClient";
import StatusBadge from "../../components/StatusBadge";
import BackendNotice from "../../components/admin/BackendNotice";

export default function AdminBilling() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: rows } = await supabase.from("billing").select("*").order("created_at", { ascending: false });
      const { data: profileRows } = await supabase.from("profiles").select("id, username, email");

      const mapped = (rows || []).map((b) => {
        const owner = (profileRows || []).find((p) => p.id === b.user_id);
        return { ...b, userName: owner?.username || owner?.email || "Unknown user" };
      });

      setBilling(mapped);
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
        <p className="text-3xl font-bold">Billing</p>
        <p className="text-vexo-muted text-sm mt-1">{billing.length} billing records across all users</p>
      </div>

      <BackendNotice message="Creating new billing requirements or marking one as paid needs a real backend ledger. This list is read-only until that's connected." />

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {!loading && billing.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No billing records.</p>}
        {billing.map((b) => (
          <div key={b.id} className="py-3 border-b border-vexo-border last:border-none">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{b.description}</span>
              <StatusBadge status={b.status || "Unpaid"} />
            </div>
            <p className="text-vexo-muted text-xs mt-1">{b.userName} · Due {b.due_date || "—"}</p>
            <p className="text-sm font-semibold mt-1">{b.currency || "USD"} {b.amount}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
