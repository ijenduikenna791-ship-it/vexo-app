"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconIdBadge2, IconCheck } from "@tabler/icons-react";
import { getSession } from "../../lib/auth";
import { supabase } from "../../lib/supabaseClient";

export default function KycPage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/login");
      return;
    }
    setSession(s);
    loadStatus(s.id);
  }, []);

  async function loadStatus(userId) {
    const { data } = await supabase.from("profiles").select("kyc_status").eq("id", userId).maybeSingle();
    setStatus(data?.kyc_status || "unsubmitted");
    setLoading(false);
  }

  async function uploadFile(file, label) {
    const ext = file.name.split(".").pop();
    const path = `${session.id}/${label}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("kyc-documents").upload(path, file, {
      upsert: true,
    });
    if (uploadError) throw uploadError;
    return path;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!idFile || !selfieFile) {
      setError("Please select both your ID document and a selfie.");
      return;
    }
    setSubmitting(true);
    try {
      const idPath = await uploadFile(idFile, "id-document");
      const selfiePath = await uploadFile(selfieFile, "selfie");
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          kyc_doc_id_path: idPath,
          kyc_doc_selfie_path: selfiePath,
          kyc_status: "submitted",
          kyc_submitted_at: new Date().toISOString(),
        })
        .eq("id", session.id);
      if (updateError) throw updateError;
      setStatus("submitted");
      setSuccess("Your documents were submitted for review.");
    } catch (err) {
      setError("Could not submit your documents. Please try again.");
    }
    setSubmitting(false);
  }

  if (loading) {
    return (
      <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6">
        <p className="text-vexo-muted text-sm text-center py-10">Loading...</p>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>

      <div className="flex flex-col items-center text-center gap-3 py-4">
        <div className="w-14 h-14 rounded-full bg-vexo-card2 flex items-center justify-center">
          <IconIdBadge2 size={26} className="text-vexo-orange" />
        </div>
        <p className="font-bold text-lg">Identity Verification (KYC)</p>
      </div>

      {status === "verified" && (
        <div className="bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-sm rounded-xl px-4 py-3 flex items-center gap-2">
          <IconCheck size={18} /> Your identity has been verified.
        </div>
      )}

      {status === "submitted" && (
        <div className="bg-vexo-card2 border border-vexo-border text-vexo-muted text-sm rounded-xl px-4 py-3">
          Your documents are under review. We&apos;ll notify you once there&apos;s an update.
        </div>
      )}

      {(status === "unsubmitted" || status === "rejected") && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {status === "rejected" && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
              Your previous submission was rejected. Please resubmit your documents.
            </div>
          )}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-sm rounded-xl px-4 py-3">
              {success}
            </div>
          )}

          <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
            <label className="text-xs text-vexo-muted">Government-issued ID (front)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setIdFile(e.target.files?.[0] || null)}
              className="w-full text-sm mt-2 text-vexo-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-vexo-orange file:text-white file:text-xs file:font-semibold"
            />
          </div>

          <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
            <label className="text-xs text-vexo-muted">Selfie holding your ID</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelfieFile(e.target.files?.[0] || null)}
              className="w-full text-sm mt-2 text-vexo-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-vexo-orange file:text-white file:text-xs file:font-semibold"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit for Verification"}
          </button>
        </form>
      )}
    </main>
  );
}
