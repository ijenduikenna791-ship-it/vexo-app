"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconCopy } from "@tabler/icons-react";
import { getSession } from "../../lib/auth";
import { supabase } from "../../lib/supabaseClient";

const networkMap = {
  BTC: "Bitcoin",
  ETH: "Ethereum (ERC-20)",
  BNB: "BNB Smart Chain (BEP-20)",
  SOL: "Solana",
  XRP: "XRP Ledger",
  USDT_TRC20: "Tron (TRC-20)",
  USDT_ERC20: "Ethereum (ERC-20)",
  ADA: "Cardano",
  DOGE: "Dogecoin",
  MATIC: "Polygon",
  USDT: "Ethereum (ERC-20)",
};
const allSymbols = Object.keys(networkMap);

function mockAddress(userId, symbol) {
  const seed = `${userId}-${symbol}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const hex = hash.toString(16).padStart(8, "0");
  if (symbol === "BTC") return `bc1q${hex}${hex.slice(0, 6)}`;
  return `0x${hex}${hex}${hex.slice(0, 8)}`;
}

export default function Deposit() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [symbol, setSymbol] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/login");
      return;
    }
    setSession(s);
    loadDeposits(s.id);
  }, []);

  async function loadDeposits(userId) {
    const { data } = await supabase
      .from("deposits")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);
    setDeposits(data || []);
    setLoading(false);
  }

  const address = session ? mockAddress(session.id, symbol) : "";

  function copyAddress() {
    navigator.clipboard?.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function submitDeposit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const amountNum = Number(amount);
    if (!amountNum || amountNum <= 0) {
      setError("Enter the amount you sent.");
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase.from("deposits").insert({
      user_id: session.id,
      asset: symbol,
      network: networkMap[symbol],
      amount: amountNum,
      status: "Pending",
    });

    setSubmitting(false);
    if (insertError) {
      setError("Could not submit your deposit request. Please try again.");
      return;
    }

    setSuccess("Deposit request submitted. Your balance will update once our team confirms it on-chain.");
    setAmount("");
    await loadDeposits(session.id);
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
      <button onClick={() => router.push("/dashboard")} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>

      <p className="text-2xl font-bold">Deposit</p>

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
        <label className="text-xs text-vexo-muted">Asset</label>
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
        >
          {allSymbols.map((s) => (
            <option key={s} value={s}>{s} - {networkMap[s]}</option>
          ))}
        </select>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
        <p className="text-xs text-vexo-muted">Your {symbol} deposit address ({networkMap[symbol]})</p>
        <div className="flex items-center gap-2 mt-2">
          <p className="flex-1 font-mono text-xs bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 truncate">{address}</p>
          <button type="button" onClick={copyAddress} className="w-9 h-9 shrink-0 rounded-lg bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconCopy size={16} />
          </button>
        </div>
        {copied && <p className="text-vexo-green text-xs mt-1">Copied!</p>}
        <p className="text-vexo-muted text-xs mt-3">
          Send only {symbol} on the {networkMap[symbol]} network to this address. After sending, tell us the amount below so we can confirm it and credit your balance.
        </p>
      </div>

      <form onSubmit={submitDeposit} className="flex flex-col gap-4">
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
          <label className="text-xs text-vexo-muted">Amount sent</label>
          <input
            type="number"
            step="any"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "I've Sent It - Submit for Review"}
        </button>
      </form>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Recent Deposit Requests</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {deposits.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No deposit requests yet.</p>}
          {deposits.map((d) => (
            <div key={d.id} className="flex items-center justify-between py-3 border-b border-vexo-border last:border-none">
              <div>
                <p className="text-sm font-semibold">{d.amount} {d.asset}</p>
                <p className="text-vexo-muted text-xs">{d.created_at ? new Date(d.created_at).toLocaleDateString() : ""}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                d.status === "Approved" ? "bg-vexo-green/10 text-vexo-green" :
                d.status === "Rejected" ? "bg-red-500/10 text-red-400" :
                "bg-vexo-orange/10 text-vexo-orange"
              }`}>
                {d.status || "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
