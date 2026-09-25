"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { supabase } from "../../lib/supabaseClient";
import UserAvatar from "../../components/UserAvatar";

export default function AdminKyc() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [processingId, setProcessingId] = useState(null);
  const [docBusyId, setDocBusyId] = useState(null);
  const [docError, setDocError] = useState("");

  async function notifyUser(userId, message, type) {
    await supabase.from("notifications").insert({ user_id: userId, message, type: type || "info", read: false });
  }

  useEffect(() => {
    async function loadData() {
      const { data: rows } = await supabase
        .from("profiles")
        .select("*")
        .eq("kyc_status", "submitted")
        .order("created_at", { ascending: false });
      setRequests(rows || []);
      setLoading(false);
    }
    loadData();
  }, []);

  async function approveKyc(u) {
    setProcessingId(u.id);
    await supabase.from("profiles").update({ kyc_status: "verified" }).eq("id", u.id);
    await notifyUser(u.id, "Your identity verification was approved.", "success");
    setRequests((prev) => prev.filter((x) => x.id !== u.id));
    setProcessingId(null);
  }

  async function rejectKyc(u) {
    setProcessingId(u.id);
    await supabase.from("profiles").update({ kyc_status: "rejected" }).eq("id", u.id);
    await notifyUser(u.id, "Your identity verification was rejected. Please resubmit your details.", "error");
    setRequests((prev) => prev.filter((x) => x.id !== u.id));
    setProcessingId(null);
  }

  async function viewDocuments(u) {
    setDocBusyId(u.id);
    setDocError("");
    try {
      const res = await fetch("/api/admin/kyc-documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: u.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDocError(data.error || "Could not load documents.");
        setDocBusyId(null);
        return;
      }
      if (data.idUrl) window.open(data.idUrl, "_blank");
      if (data.selfieUrl) window.open(data.selfieUrl, "_blank");
    } catch (err) {
      setDocError("Could not load documents.");
    }
    setDocBusyId(null);
  }

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div>
        <p className="text-3xl font-bold">KYC Review</p>
        <p className="text-vexo-muted text-sm mt-1">{requests.length} pending verification{requests.length === 1 ? "" : "s"}</p>
      </div>

      {docError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
          {docError}
        </div>
      )}

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {loading && <p className="text-vexo-muted text-sm text-center py-10">Loading...</p>}
        {!loading && requests.length === 0 && (
          <p className="text-vexo-muted text-sm text-center py-6">No pending KYC requests.</p>
        )}
        {requests.map((u) => (
          <div key={u.id} className="py-4 border-b border-vexo-border last:border-none">
            <div className="flex items-center gap-3 min-w-0">
              <UserAvatar name={u.username || u.email} size={36} />
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{u.username || "Unnamed user"}</p>
                <p className="text-vexo-muted text-xs truncate">{u.email}</p>
                <p className="text-vexo-muted text-xs truncate">{u.phone || "-"} / {u.country || "-"}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => viewDocuments(u)}
                disabled={docBusyId === u.id}
                className="flex-1 py-1.5 rounded-lg bg-vexo-card2 border border-vexo-border text-xs font-semibold disabled:opacity-60"
              >
                {docBusyId === u.id ? "Loading..." : "View Documents"}
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => approveKyc(u)}
                disabled={processingId === u.id}
                className="flex-1 py-1.5 rounded-lg bg-vexo-green/20 text-vexo-green text-xs font-semibold disabled:opacity-60"
              >
                {processingId === u.id ? "Working..." : "Approve"}
              </button>
              <button
                onClick={() => rejectKyc(u)}
                disabled={processingId === u.id}
                className="flex-1 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold disabled:opacity-60"
              >
                {processingId === u.id ? "Working..." : "Reject"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
