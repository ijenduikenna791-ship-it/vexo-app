"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconUser, IconWorld } from "@tabler/icons-react";
import { getSession } from "../../lib/auth";
import { supabase } from "../../lib/supabaseClient";

const coinMeta = {
  BTC: { name: "Bitcoin" },
  ETH: { name: "Ethereum" },
  BNB: { name: "BNB" },
  SOL: { name: "Solana" },
  XRP: { name: "XRP" },
  USDT_TRC20: { name: "Tether (TRC-20)" },
  USDT_ERC20: { name: "Tether (ERC-20)" },
  ADA: { name: "Cardano" },
  DOGE: { name: "Dogecoin" },
  MATIC: { name: "Polygon" },
  USDT: { name: "Tether" },
};
const allSymbols = Object.keys(coinMeta);

export default function Send() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("internal"); // "internal" | "external"
  const [symbol, setSymbol] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sending, setSending] = useState(false);

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

  const wallet = wallets.find((w) => w.symbol === symbol);
  const balance = wallet ? Number(wallet.amount) : 0;
  const amountNum = Number(amount) || 0;

  function resetMessages() {
    setError("");
    setSuccess("");
  }

  async function sendInternal(e) {
    e.preventDefault();
    resetMessages();

    if (!amountNum || amountNum <= 0) {
      setError("Enter an amount greater than 0.");
      return;
    }
    if (amountNum > balance) {
      setError(`You only have ${balance} ${symbol} available.`);
      return;
    }
    const identifier = recipient.trim();
    if (!identifier) {
      setError("Enter the recipient's email or username.");
      return;
    }
    const dest = address.trim();
    if (!dest || dest.length < 6) {
      setError(`Enter the recipient's ${symbol} address.`);
      return;
    }

    setSending(true);

    const { data: recipientProfile, error: lookupError } = await supabase
      .from("profiles")
      .select("*")
      .or(`email.eq.${identifier},username.eq.${identifier}`)
      .maybeSingle();

    if (lookupError || !recipientProfile) {
      setSending(false);
      setError("No Vexo user found with that email or username.");
      return;
    }
    if (recipientProfile.id === session.id) {
      setSending(false);
      setError("You can't send funds to yourself.");
      return;
    }

    const newSenderAmount = balance - amountNum;
    const { error: debitError } = await supabase
      .from("wallets")
      .update({ amount: newSenderAmount })
      .eq("id", wallet.id);

    if (debitError) {
      setSending(false);
      setError("Could not complete the transfer. Please try again.");
      return;
    }

    const { data: recipientWallet } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", recipientProfile.id)
      .eq("symbol", symbol)
      .maybeSingle();

    let creditError = null;
    if (recipientWallet) {
      const { error } = await supabase
        .from("wallets")
        .update({ amount: Number(recipientWallet.amount) + amountNum })
        .eq("id", recipientWallet.id);
      creditError = error;
    } else {
      const { error } = await supabase
        .from("wallets")
        .insert({ user_id: recipientProfile.id, symbol, amount: amountNum });
      creditError = error;
    }

    if (creditError) {
      await supabase.from("wallets").update({ amount: balance }).eq("id", wallet.id);
      setSending(false);
      setError("Could not complete the transfer. Please try again.");
      return;
    }

    const recipientLabel = recipientProfile.username || recipientProfile.email;
    const senderLabel = session.username || session.email;
    const shortDest = dest.length > 10 ? `${dest.slice(0, 6)}...${dest.slice(-4)}` : dest;

    await supabase.from("transactions").insert([
      { user_id: session.id, type: `Send: ${amountNum} ${symbol} to ${recipientLabel} (${shortDest})`, amount: amountNum, status: "Completed" },
      { user_id: recipientProfile.id, type: `Received: ${amountNum} ${symbol} from ${senderLabel}`, amount: amountNum, status: "Completed" },
    ]);

    setSending(false);
    setSuccess(`Sent ${amountNum} ${symbol} to ${recipientLabel}.`);
    setAmount("");
    setRecipient("");
    setAddress("");
    await loadWallets(session.id);
  }

  async function sendExternal(e) {
    e.preventDefault();
    resetMessages();

    if (!amountNum || amountNum <= 0) {
      setError("Enter an amount greater than 0.");
      return;
    }
    if (amountNum > balance) {
      setError(`You only have ${balance} ${symbol} available.`);
      return;
    }
    const dest = address.trim();
    if (!dest || dest.length < 6) {
      setError("Enter a valid destination address.");
      return;
    }

    setSending(true);

    const newAmount = balance - amountNum;
    const { error: debitError } = await supabase
      .from("wallets")
      .update({ amount: newAmount })
      .eq("id", wallet.id);

    if (debitError) {
      setSending(false);
      setError("Could not complete the transfer. Please try again.");
      return;
    }

    const shortDest = dest.length > 10 ? `${dest.slice(0, 6)}...${dest.slice(-4)}` : dest;
    await supabase.from("transactions").insert({
      user_id: session.id,
      type: `Send: ${amountNum} ${symbol} to ${shortDest}`,
      amount: amountNum,
      status: "Completed",
    });

    setSending(false);
    setSuccess(`Sent ${amountNum} ${symbol} to ${shortDest}. This leaves Vexo and can't be reversed.`);
    setAmount("");
    setAddress("");
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

      <p className="text-2xl font-bold">Send</p>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => { setMode("internal"); resetMessages(); }}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold ${
            mode === "internal" ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted border border-vexo-border"
          }`}
        >
          <IconUser size={16} /> To Vexo User
        </button>
        <button
          onClick={() => { setMode("external"); resetMessages(); }}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold ${
            mode === "external" ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted border border-vexo-border"
          }`}
        >
          <IconWorld size={16} /> External Address
        </button>
      </div>

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
            <option key={s} value={s}>{s} - {coinMeta[s].name}</option>
          ))}
        </select>
      </div>

      {mode === "internal" ? (
        <form onSubmit={sendInternal} className="flex flex-col gap-4">
          <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
            <label className="text-xs text-vexo-muted">Recipient email or username</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="alice@example.com or alice"
              className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
            />
          </div>
          <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
            <label className="text-xs text-vexo-muted">Recipient's {symbol} address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={`${symbol} address`}
              className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange font-mono"
            />
            <p className="text-vexo-muted text-xs mt-2">
              The transfer still routes by their Vexo account, not this address - it's recorded alongside the transaction for your records.
            </p>
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
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send to Vexo User"}
          </button>
        </form>
      ) : (
        <form onSubmit={sendExternal} className="flex flex-col gap-4">
          <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
            <label className="text-xs text-vexo-muted">Destination address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
          </div>
          <p className="text-vexo-muted text-xs">
            This leaves Vexo permanently - there's no real blockchain wired up yet, so this only deducts your balance here and logs the send. It doesn't actually broadcast a transaction.
          </p>
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send to Address"}
          </button>
        </form>
      )}
    </main>
  );
}
