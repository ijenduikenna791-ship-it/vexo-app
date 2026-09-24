"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconReceipt2 } from "@tabler/icons-react";
import { getSession } from "../../lib/auth";
import { supabase } from "../../lib/supabaseClient";

const filters = ["All", "Completed", "Pending", "Failed"];

export default function History() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/login");
      return;
    }
    setSession(s);
    loadTransactions(s.id);
  }, []);

  async function loadTransactions(userId) {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(200);
    setTransactions(data || []);
    setLoading(false);
  }

  const filtered = transactions.filter((t) => {
    if (active === "All") return true;
    return (t.status || "Completed") === active;
  });

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.push("/dashboard")} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>

      <p className="text-2xl font-bold">Activity</p>

      <div className="flex gap-2 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              active === f ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {loading && <p className="text-vexo-muted text-sm text-center py-10">Loading...</p>}
        {!loading && filtered.length === 0 && (
          <p className="text-vexo-muted text-sm text-center py-10">No activity found.</p>
        )}
        {filtered.map((t) => (
          <div key={t.id} className="flex items-center justify-between gap-3 py-4 border-b border-vexo-border last:border-none">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-vexo-card2 flex items-center justify-center shrink-0">
                <IconReceipt2 size={16} className="text-vexo-muted" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{t.type}</p>
                <p className="text-vexo-muted text-xs">
                  {t.created_at ? new Date(t.created_at).toLocaleString() : ""}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-semibold text-sm">
                ${Number(t.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                (t.status || "Completed") === "Completed" ? "bg-vexo-green/10 text-vexo-green" :
                (t.status || "Completed") === "Failed" ? "bg-red-500/10 text-red-400" :
                "bg-vexo-orange/10 text-vexo-orange"
              }`}>
                {t.status || "Completed"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
