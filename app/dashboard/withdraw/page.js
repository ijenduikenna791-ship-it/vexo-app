"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
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
const FEE_RATE = 0.01; // 1% flat network/service fee, mock

export default function Withdraw() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/login");
      return;
    }
    setSession(s);
    loadData(s.id);
  }, []);

  async function loadData(userId) {
    const { data: walletRows } = await supabase.from("wallets").select("*").eq("user_id", userId);
    const { data: withdrawalRows } = await supabase
      .from("withdrawals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);
    setWallets(walletRows || []);
    setWithdrawals(withdrawalRows || []);
    setLoading(false);
  }

  const wallet = wallets.find((w) => w.symbol === symbol);
  const balance = wallet ? Number(wallet.amount) : 0;
  const amountNum = Number(amount) || 0;
  const fee = amountNum * FEE_RATE;
  const net = amountNum - fee;

  async function submitWithdrawal(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amountNum || amountNum <= 0) {
      setError("Enter an amount greater than 0.");
      return;
    }
    if (amountNum > balance) {
      setError(`You only have ${balance} ${symbol} available.`);
      return;
    }
    const dest = destination.trim();
    if (!dest || dest.length < 6) {
      setError("Enter a valid destination address.");
      return;
    }

    setSubmitting(true);

    // Reserve the funds immediately so the same balance can't be withdrawn twice
    // while this request is pending admin review.
    const newBalance = balance - amountNum;
    const { error: reserveError } = await supabase
      .from("wallets")
      .update({ amount: newBalance })
      .eq("id", wallet.id);

    if (reserveError) {
      setSubmitting(false);
      setError("Could not submit your withdrawal request. Please try again.");
      return;
    }

    const { error: insertError } = await supabase.from("withdrawals").insert({
      user_id: session.id,
      asset: symbol,
      network: networkMap[symbol],
      amount: amountNum,
      fee,
      net,
      destination: dest,
      status: "Pending",
    });

    if (insertError) {
      // roll back the reservation since the request record failed to save
      await supabase.from("wallets").update({ amount: balance }).eq("id", wallet.id);
      setSubmitting(false);
      setError("Could not submit your withdrawal request. Please try again.");
      return;
    }

    await supabase.from("transactions").insert({
      user_id: session.id,
      type: `Withdrawal request: ${amountNum} ${symbol}`,
      amount: amountNum,
      status: "Pending",
    });

    setSubmitting(false);
    setSuccess(`Withdrawal request submitted. ${amountNum} ${symbol} has been reserved from your balance and will be sent once approved.`);
    setAmount("");
    setDestination("");
    await loadData(session.id);
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

      <p className="text-2xl font-bold">Withdraw</p>

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

      <form onSubmit={submitWithdrawal} className="flex flex-col gap-4">
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-vexo-muted">Asset</label>
            <span className="text-xs text-vexo-muted">Balance: {balance} {symbol}</span>
          </div>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
          >
            {allSymbols.map((s) => (
              <option key={s} value={s}>{s} - {networkMap[s]}</option>
            ))}
          </select>
        </div>

        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
          <label className="text-xs text-vexo-muted">Destination address</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder={`${symbol} address`}
            className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange font-mono"
          />
        </div>

        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
          <label className="text-xs text-vexo-muted">Amount</label>
          <input
            type="number"
            step="any"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
          />
          {amountNum > 0 && (
            <p className="text-vexo-muted text-xs mt-2">
              Fee (1%): {fee.toFixed(6)} {symbol} - You'll receive: {net.toFixed(6)} {symbol}
            </p>
          )}
        </div>

        <p className="text-vexo-muted text-xs">
          Withdrawals are reviewed before funds are sent. The amount is deducted from your balance now to reserve it.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Request Withdrawal"}
        </button>
      </form>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Recent Withdrawal Requests</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {withdrawals.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No withdrawal requests yet.</p>}
          {withdrawals.map((w) => (
            <div key={w.id} className="flex items-center justify-between py-3 border-b border-vexo-border last:border-none">
              <div>
                <p className="text-sm font-semibold">{w.amount} {w.asset}</p>
                <p className="text-vexo-muted text-xs">{w.created_at ? new Date(w.created_at).toLocaleDateString() : ""}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                w.status === "Approved" ? "bg-vexo-green/10 text-vexo-green" :
                w.status === "Rejected" ? "bg-red-500/10 text-red-400" :
                "bg-vexo-orange/10 text-vexo-orange"
              }`}>
                {w.status || "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
