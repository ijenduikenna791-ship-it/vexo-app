"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconArrowsExchange } from "@tabler/icons-react";
import { getSession } from "../../lib/auth";
import { supabase } from "../../lib/supabaseClient";

const coinMeta = {
  BTC: { name: "Bitcoin", price: 67842.5 },
  ETH: { name: "Ethereum", price: 3542.8 },
  BNB: { name: "BNB", price: 580.2 },
  SOL: { name: "Solana", price: 182.4 },
  XRP: { name: "XRP", price: 0.6182 },
  USDT_TRC20: { name: "Tether (TRC-20)", price: 1 },
  USDT_ERC20: { name: "Tether (ERC-20)", price: 1 },
  ADA: { name: "Cardano", price: 0.4821 },
  DOGE: { name: "Dogecoin", price: 0.1634 },
  MATIC: { name: "Polygon", price: 0.51 },
  USDT: { name: "Tether", price: 1 },
};
const allSymbols = Object.keys(coinMeta);

export default function Swap() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromSymbol, setFromSymbol] = useState("BTC");
  const [toSymbol, setToSymbol] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/login");
      return;
    }
    setSession(s);
    loadWallets(s.id);
  }, []);

  async function loadWallets(userId) {
    const { data } = await supabase.from("wallets").select("*").eq("user_id", userId);
    setWallets(data || []);
    setLoading(false);
  }

  const fromWallet = wallets.find((w) => w.symbol === fromSymbol);
  const fromBalance = fromWallet ? Number(fromWallet.amount) : 0;
  const amountNum = Number(amount) || 0;
  const usdValue = amountNum * (coinMeta[fromSymbol]?.price || 0);
  const receiveAmount = coinMeta[toSymbol]?.price ? usdValue / coinMeta[toSymbol].price : 0;

  function switchDirection() {
    const oldFrom = fromSymbol;
    setFromSymbol(toSymbol);
    setToSymbol(oldFrom);
    setAmount("");
    setError("");
  }

  async function confirmSwap(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (fromSymbol === toSymbol) {
      setError("Choose two different assets.");
      return;
    }
    if (!amountNum || amountNum <= 0) {
      setError("Enter an amount greater than 0.");
      return;
    }
    if (amountNum > fromBalance) {
      setError(`You only have ${fromBalance} ${fromSymbol} available.`);
      return;
    }

    setSwapping(true);

    const newFromAmount = fromBalance - amountNum;
    const { error: fromError } = await supabase
      .from("wallets")
      .update({ amount: newFromAmount })
      .eq("id", fromWallet.id);

    if (fromError) {
      setSwapping(false);
      setError("Could not complete the swap. Please try again.");
      return;
    }

    const toWallet = wallets.find((w) => w.symbol === toSymbol);
    let toError = null;
    if (toWallet) {
      const { error } = await supabase
        .from("wallets")
        .update({ amount: Number(toWallet.amount) + receiveAmount })
        .eq("id", toWallet.id);
      toError = error;
    } else {
      const { error } = await supabase
        .from("wallets")
        .insert({ user_id: session.id, symbol: toSymbol, amount: receiveAmount });
      toError = error;
    }

    if (toError) {
      // roll back the debit since the credit failed
      await supabase.from("wallets").update({ amount: fromBalance }).eq("id", fromWallet.id);
      setSwapping(false);
      setError("Could not complete the swap. Please try again.");
      return;
    }

    await supabase.from("transactions").insert({
      user_id: session.id,
      type: `Swap: ${fromSymbol} -> ${toSymbol}`,
      amount: usdValue,
      status: "Completed",
    });

    setSwapping(false);
    setSuccess(`Swapped ${amountNum} ${fromSymbol} for ${receiveAmount.toFixed(6)} ${toSymbol}.`);
    setAmount("");
    await loadWallets(session.id);
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

      <p className="text-2xl font-bold">Swap</p>

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

      <form onSubmit={confirmSwap} className="flex flex-col gap-4">
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-vexo-muted">From</label>
            <span className="text-xs text-vexo-muted">Balance: {fromBalance} {fromSymbol}</span>
          </div>
          <div className="flex gap-2">
            <select
              value={fromSymbol}
              onChange={(e) => setFromSymbol(e.target.value)}
              className="bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
            >
              {allSymbols.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="number"
              step="any"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={switchDirection}
            className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center"
          >
            <IconArrowsExchange size={16} />
          </button>
        </div>

        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
          <label className="text-xs text-vexo-muted">To (estimated)</label>
          <div className="flex gap-2 mt-2">
            <select
              value={toSymbol}
              onChange={(e) => setToSymbol(e.target.value)}
              className="bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
            >
              {allSymbols.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="flex-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm text-vexo-muted">
              {receiveAmount ? receiveAmount.toFixed(6) : "0.00"}
            </div>
          </div>
        </div>

        <p className="text-vexo-muted text-xs text-center">
          Rate: 1 {fromSymbol} {"\u2248"} {(coinMeta[fromSymbol]?.price / (coinMeta[toSymbol]?.price || 1)).toFixed(6)} {toSymbol}
        </p>

        <button
          type="submit"
          disabled={swapping}
          className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold disabled:opacity-60"
        >
          {swapping ? "Swapping..." : "Confirm Swap"}
        </button>
      </form>
    </main>
  );
}
