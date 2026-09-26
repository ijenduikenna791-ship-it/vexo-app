"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  IconArrowLeft, IconBan, IconCircleCheck, IconShieldCheck, IconCoinBitcoin,
  IconArrowUpRight, IconArrowDownLeft, IconReceipt2, IconLock, IconX,
} from "@tabler/icons-react";
import UserAvatar from "../../../components/UserAvatar";
import StatusBadge from "../../../components/StatusBadge";
import BalanceRing from "../../../components/admin/BalanceRing";
import { supabase } from "../../../lib/supabaseClient";

const tabs = ["Overview", "Personal", "Wallets", "Transactions", "Deposits", "Withdrawals", "Billing", "Activity", "Security"];
const coinNames = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  BNB: "BNB",
  SOL: "Solana",
  XRP: "XRP",
  USDT_TRC20: "Tether (TRC-20)",
  USDT_ERC20: "Tether (ERC-20)",
  ADA: "Cardano",
  DOGE: "Dogecoin",
  MATIC: "Polygon",
  USDT: "Tether",
};

export default function UserDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [topUpNote, setTopUpNote] = useState("");
  const [topUpSaving, setTopUpSaving] = useState(false);
  const [topUpError, setTopUpError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [kycUpdating, setKycUpdating] = useState(false);
  const [depositActionId, setDepositActionId] = useState(null);
  const [withdrawalActionId, setWithdrawalActionId] = useState(null);
  const [actionMessage, setActionMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [billing, setBilling] = useState([]);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", id).single();
    const { data: walletRows } = await supabase.from("wallets").select("*").eq("user_id", id);
    const { data: txRows } = await supabase.from("transactions").select("*").eq("user_id", id).order("created_at", { ascending: false });
    const { data: depositRows } = await supabase.from("deposits").select("*").eq("user_id", id).order("created_at", { ascending: false });
    const { data: withdrawalRows } = await supabase.from("withdrawals").select("*").eq("user_id", id).order("created_at", { ascending: false });
    const { data: billingRows } = await supabase.from("billing").select("*").eq("user_id", id).order("created_at", { ascending: false });

    setUser(profile || null);
    setWallets(walletRows || []);
    setTransactions(txRows || []);
    setDeposits(depositRows || []);
    setWithdrawals(withdrawalRows || []);
    setBilling(billingRows || []);
    setLoading(false);
  }

  async function toggleStatus() {
    if (!user) return;
    setStatusUpdating(true);
    const newStatus = user.status === "suspended" ? "active" : "suspended";
    const { error } = await supabase.from("profiles").update({ status: newStatus }).eq("id", user.id);
    setStatusUpdating(false);
    if (!error) {
      setUser({ ...user, status: newStatus });
      setStatusMessage(newStatus === "suspended" ? "Account suspended." : "Account activated.");
      setTimeout(() => setStatusMessage(""), 4000);
    }
  }

  async function notifyUser(userId, message, type) {
    await supabase.from("notifications").insert({ user_id: userId, message, type: type || "info", read: false });
  }

  async function maybePayReferralReward(referredProfile) {
    if (!referredProfile || !referredProfile.referred_by || referredProfile.referral_reward_paid) return;

    const { count: approvedCount } = await supabase
      .from("deposits")
      .select("id", { count: "exact", head: true })
      .eq("user_id", referredProfile.id)
      .eq("status", "Approved");

    if ((approvedCount || 0) !== 1) return;

    const REFERRAL_BONUS = 5;
    const { data: referrerWallet } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", referredProfile.referred_by)
      .eq("symbol", "USDT")
      .maybeSingle();

    if (referrerWallet) {
      await supabase
        .from("wallets")
        .update({ amount: Number(referrerWallet.amount) + REFERRAL_BONUS })
        .eq("id", referrerWallet.id);
    } else {
      await supabase.from("wallets").insert({ user_id: referredProfile.referred_by, symbol: "USDT", amount: REFERRAL_BONUS });
    }

    await supabase.from("transactions").insert({
      user_id: referredProfile.referred_by,
      type: "Referral bonus",
      amount: REFERRAL_BONUS,
      status: "Completed",
    });

    await supabase.from("profiles").update({ referral_reward_paid: true }).eq("id", referredProfile.id);

    await notifyUser(referredProfile.referred_by, `You earned a ${REFERRAL_BONUS.toFixed(2)} referral bonus!`, "success");
  }

  async function setKyc(newStatus) {
    if (!user) return;
    setKycUpdating(true);
    const { error } = await supabase.from("profiles").update({ kyc_status: newStatus }).eq("id", user.id);
    setKycUpdating(false);
    if (!error) {
      setUser({ ...user, kyc_status: newStatus });
      if (newStatus === "verified") {
        await notifyUser(user.id, "Your identity verification was approved.", "success");
      } else if (newStatus === "rejected") {
        await notifyUser(user.id, "Your identity verification was rejected. Please resubmit.", "error");
      }
    }
  }

  async function confirmTopUp(e) {
    e.preventDefault();
    setTopUpError("");
    const amountNum = Number(topUpAmount);
    if (!amountNum || amountNum <= 0) {
      setTopUpError("Enter an amount greater than 0.");
      return;
    }
    setTopUpSaving(true);

    const creditRes = await fetch("/api/admin/wallet-credit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, symbol: "USDT", delta: amountNum }),
    });

    if (!creditRes.ok) {
      setTopUpSaving(false);
      setTopUpError("Could not update balance. Please try again.");
      return;
    }

    await supabase.from("transactions").insert({
      user_id: id,
      type: "Deposit",
      amount: amountNum,
      status: "Completed",
    });

    await notifyUser(id, `$${amountNum.toFixed(2)} USDT was added to your balance.`, "success");

    setTopUpSaving(false);
    setShowTopUp(false);
    setTopUpAmount("");
    setTopUpNote("");
    setStatusMessage(`Added $${amountNum.toFixed(2)} USDT to this user's balance.`);
    setTimeout(() => setStatusMessage(""), 5000);
    await loadData();
  }

  async function approveDeposit(d) {
    setDepositActionId(d.id);
    setActionMessage("");

    const creditRes = await fetch("/api/admin/wallet-credit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, symbol: d.asset, delta: Number(d.amount) }),
    });

    if (!creditRes.ok) {
      setDepositActionId(null);
      setActionMessage("Could not credit the wallet. Please try again.");
      return;
    }

    await supabase.from("deposits").update({ status: "Approved" }).eq("id", d.id);
    await supabase.from("transactions").insert({
      user_id: id,
      type: `Deposit approved: ${d.amount} ${d.asset}`,
      amount: d.amount,
      status: "Completed",
    });

    await notifyUser(id, `Your deposit of ${d.amount} ${d.asset} was approved and credited.`, "success");
    await maybePayReferralReward(user);

    setDepositActionId(null);
    setActionMessage(`Approved deposit of ${d.amount} ${d.asset} - balance credited.`);
    setTimeout(() => setActionMessage(""), 5000);
    await loadData();
  }

  async function rejectDeposit(d) {
    setDepositActionId(d.id);
    setActionMessage("");

    await supabase.from("deposits").update({ status: "Rejected" }).eq("id", d.id);

    await notifyUser(id, `Your deposit of ${d.amount} ${d.asset} was rejected.`, "error");

    setDepositActionId(null);
    setActionMessage(`Rejected deposit of ${d.amount} ${d.asset}. No balance change.`);
    setTimeout(() => setActionMessage(""), 5000);
    await loadData();
  }

  async function findMatchingWithdrawalTransaction(w) {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", id)
      .eq("type", `Withdrawal request: ${w.amount} ${w.asset}`)
      .eq("status", "Pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    return data || null;
  }

  async function approveWithdrawal(w) {
    setWithdrawalActionId(w.id);
    setActionMessage("");

    // Funds were already reserved (debited) when the user requested this,
    // so approving just marks it fulfilled without touching the wallet again.
    await supabase.from("withdrawals").update({ status: "Approved" }).eq("id", w.id);

    const matchingTx = await findMatchingWithdrawalTransaction(w);
    if (matchingTx) {
      await supabase.from("transactions").update({ status: "Completed" }).eq("id", matchingTx.id);
    }

    await notifyUser(id, `Your withdrawal of ${w.amount} ${w.asset} was approved and sent.`, "success");

    setWithdrawalActionId(null);
    setActionMessage(`Approved withdrawal of ${w.amount} ${w.asset}. Send the funds to ${w.destination}.`);
    setTimeout(() => setActionMessage(""), 6000);
    await loadData();
  }

  async function rejectWithdrawal(w) {
    setWithdrawalActionId(w.id);
    setActionMessage("");

    // Refund the reserved amount back to the user's wallet since this won't be sent.
    const creditRes = await fetch("/api/admin/wallet-credit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, symbol: w.asset, delta: Number(w.amount) }),
    });

    if (!creditRes.ok) {
      setWithdrawalActionId(null);
      setActionMessage("Could not refund the wallet. Please try again.");
      return;
    }

    await supabase.from("withdrawals").update({ status: "Rejected" }).eq("id", w.id);

    const matchingTx = await findMatchingWithdrawalTransaction(w);
    if (matchingTx) {
      await supabase.from("transactions").update({ status: "Failed" }).eq("id", matchingTx.id);
    }

    await notifyUser(id, `Your withdrawal of ${w.amount} ${w.asset} was rejected and refunded to your balance.`, "error");

    setWithdrawalActionId(null);
    setActionMessage(`Rejected withdrawal of ${w.amount} ${w.asset} - balance refunded.`);
    setTimeout(() => setActionMessage(""), 5000);
    await loadData();
  }

  if (loading) {
    return (
      <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6">
        <p className="text-vexo-muted text-sm text-center py-10">Loading...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-4">
        <button onClick={() => router.push("/admin/users")} className="flex items-center gap-1 text-sm text-vexo-muted">
          <IconArrowLeft size={16} /> Back to Users
        </button>
        <p className="text-vexo-muted text-sm text-center py-10">User not found.</p>
      </main>
    );
  }

  const displayName = user.username || user.email || "Unnamed user";
  const status = user.status === "suspended" ? "Suspended" : "Active";
  const verification = user.kyc_status === "verified" ? "Verified" : user.kyc_status === "submitted" ? "Pending" : user.kyc_status === "rejected" ? "Rejected" : "Pending";
  const balance = wallets.reduce((sum, w) => sum + Number(w.amount || 0), 0);
  const joined = user.created_at ? new Date(user.created_at).toLocaleDateString() : "-";

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.push("/admin/users")} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back to Users
      </button>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex items-center gap-4">
        <UserAvatar name={displayName} size={56} />
        <div className="min-w-0 flex-1">
          <p className="font-bold">{displayName}</p>
          <p className="text-vexo-muted text-xs truncate">{user.email}</p>
          <div className="flex gap-2 mt-2">
            <StatusBadge status={status} />
            <StatusBadge status={verification} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setShowTopUp(true)}
          className="flex items-center justify-center gap-2 bg-vexo-orange text-white rounded-xl py-2.5 text-sm font-semibold"
        >
          <IconCoinBitcoin size={16} /> Top Up
        </button>
        <button
          onClick={toggleStatus}
          disabled={statusUpdating}
          className="flex items-center justify-center gap-2 bg-vexo-card2 border border-vexo-border rounded-xl py-2.5 text-sm font-semibold disabled:opacity-60"
        >
          {status === "Active" ? <IconBan size={16} /> : <IconCircleCheck size={16} />}
          {statusUpdating ? "Updating..." : status === "Active" ? "Suspend" : "Activate"}
        </button>
      </div>

      {statusMessage && (
        <div className="bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-sm rounded-xl px-4 py-3">
          {statusMessage}
        </div>
      )}

      {showTopUp && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex flex-col gap-3">
          <p className="font-semibold text-sm">Top Up Balance (USDT)</p>
          {topUpError && <p className="text-red-400 text-xs">{topUpError}</p>}
          <form onSubmit={confirmTopUp} className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-vexo-muted">Amount (USD equivalent)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                placeholder="0.00"
                className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
              />
            </div>
            <div>
              <label className="text-xs text-vexo-muted">Reason / note (not saved yet, for your reference only)</label>
              <input
                type="text"
                value={topUpNote}
                onChange={(e) => setTopUpNote(e.target.value)}
                placeholder="e.g. manual reconciliation"
                className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
              />
            </div>
            <div className="flex gap-2 mt-1">
              <button type="button" onClick={() => setShowTopUp(false)} className="flex-1 py-2 rounded-lg border border-vexo-border text-sm font-semibold">Cancel</button>
              <button type="submit" disabled={topUpSaving} className="flex-1 py-2 rounded-lg bg-vexo-orange text-white text-sm font-semibold disabled:opacity-60">
                {topUpSaving ? "Adding..." : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
              activeTab === t ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="flex flex-col gap-3">
          <div className="bg-vexo-card border border-vexo-border rounded-2xl">
            <BalanceRing amount={balance} label="Balance" status={status} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
              <p className="text-vexo-muted text-xs">Balance</p>
              <p className="font-bold text-lg mt-1">${balance.toLocaleString()}</p>
            </div>
            <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
              <p className="text-vexo-muted text-xs">Wallets</p>
              <p className="font-bold text-lg mt-1">{wallets.length}</p>
            </div>
            <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
              <p className="text-vexo-muted text-xs">Transactions</p>
              <p className="font-bold text-lg mt-1">{transactions.length}</p>
            </div>
            <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
              <p className="text-vexo-muted text-xs">Joined</p>
              <p className="font-bold text-sm mt-1">{joined}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Personal" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4 py-2">
          {[
            ["User ID", user.id],
            ["Username", user.username || "-"],
            ["Email", user.email || "-"],
            ["Phone", user.phone || "-"],
            ["Country", user.country || "-"],
            ["Registered", joined],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-3 border-b border-vexo-border last:border-none text-sm">
              <span className="text-vexo-muted">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Wallets" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {wallets.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No wallet data available.</p>}
          {wallets.map((w) => (
            <div key={w.id} className="py-3 border-b border-vexo-border last:border-none">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{coinNames[w.symbol] || w.symbol} ({w.symbol})</span>
              </div>
              <p className="text-sm font-semibold mt-1">{w.amount} {w.symbol}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Transactions" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {transactions.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No transactions found.</p>}
          {transactions.map((t) => (
            <div key={t.id} className="flex justify-between items-center py-3 border-b border-vexo-border last:border-none">
              <div className="flex items-center gap-2">
                <IconReceipt2 size={16} className="text-vexo-muted" />
                <div>
                  <p className="text-sm font-semibold">{t.type}</p>
                  <p className="text-vexo-muted text-xs">{t.created_at ? new Date(t.created_at).toLocaleDateString() : ""}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">${Number(t.amount || 0).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Deposits" && (
        <div className="flex flex-col gap-3">
          {actionMessage && (
            <div className="bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-sm rounded-xl px-4 py-3">
              {actionMessage}
            </div>
          )}
          <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
            {deposits.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No deposits found.</p>}
            {deposits.map((d) => (
              <div key={d.id} className="py-3 border-b border-vexo-border last:border-none">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold flex items-center gap-1"><IconArrowDownLeft size={14} /> {d.asset} - {d.network}</span>
                  <StatusBadge status={d.status || "Pending"} />
                </div>
                <p className="text-sm font-semibold mt-1">{d.amount} {d.asset} - {d.created_at ? new Date(d.created_at).toLocaleDateString() : ""}</p>
                {(!d.status || d.status === "Pending") && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => approveDeposit(d)}
                      disabled={depositActionId === d.id}
                      className="flex-1 py-1.5 rounded-lg bg-vexo-green/20 text-vexo-green text-xs font-semibold disabled:opacity-60"
                    >
                      {depositActionId === d.id ? "Working..." : "Approve"}
                    </button>
                    <button
                      onClick={() => rejectDeposit(d)}
                      disabled={depositActionId === d.id}
                      className="flex-1 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold disabled:opacity-60"
                    >
                      {depositActionId === d.id ? "Working..." : "Reject"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Withdrawals" && (
        <div className="flex flex-col gap-3">
          {actionMessage && (
            <div className="bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-sm rounded-xl px-4 py-3">
              {actionMessage}
            </div>
          )}
          <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
            {withdrawals.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No withdrawals found.</p>}
            {withdrawals.map((w) => (
              <div key={w.id} className="py-3 border-b border-vexo-border last:border-none">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold flex items-center gap-1"><IconArrowUpRight size={14} /> {w.asset} - {w.network}</span>
                  <StatusBadge status={w.status || "Pending"} />
                </div>
                <p className="text-vexo-muted text-xs mt-1">To: {w.destination || "-"}</p>
                <p className="text-sm font-semibold mt-1">Net: {w.net} {w.asset} (fee {w.fee})</p>
                {(!w.status || w.status === "Pending") && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => approveWithdrawal(w)}
                      disabled={withdrawalActionId === w.id}
                      className="flex-1 py-1.5 rounded-lg bg-vexo-green/20 text-vexo-green text-xs font-semibold disabled:opacity-60"
                    >
                      {withdrawalActionId === w.id ? "Working..." : "Approve"}
                    </button>
                    <button
                      onClick={() => rejectWithdrawal(w)}
                      disabled={withdrawalActionId === w.id}
                      className="flex-1 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold disabled:opacity-60"
                    >
                      {withdrawalActionId === w.id ? "Working..." : "Reject"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Billing" && (
        <div className="flex flex-col gap-3">
          <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
            {billing.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No billing records.</p>}
            {billing.map((b) => (
              <div key={b.id} className="py-3 border-b border-vexo-border last:border-none">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{b.description}</span>
                  <StatusBadge status={b.status || "Unpaid"} />
                </div>
                <p className="text-vexo-muted text-xs mt-1">Due {b.due_date || "-"} - {b.currency || "USD"} {b.amount}</p>
              </div>
            ))}
        </div>
        </div>
      )}

      {activeTab === "Activity" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          <p className="text-vexo-muted text-sm text-center py-6">Activity logging requires a real backend audit trail.</p>
        </div>
      )}

      {activeTab === "Security" && (
        <div className="flex flex-col gap-3">
          <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4 py-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm">
              <IconShieldCheck size={16} className="text-vexo-muted" />
              <span>KYC status: <strong>{verification}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconLock size={16} className="text-vexo-muted" />
              <span>Password resets and 2FA state are never shown to admins for security reasons.</span>
          </div>

          {user.kyc_status === "submitted" && (
            <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4 flex flex-col gap-3">
              <p className="text-sm font-semibold">This user has submitted identity verification.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setKyc("verified")}
                  disabled={kycUpdating}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-vexo-green/20 text-vexo-green text-sm font-semibold disabled:opacity-60"
                >
                  <IconShieldCheck size={16} /> Approve
                </button>
                <button
                  onClick={() => setKyc("rejected")}
                  disabled={kycUpdating}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-semibold disabled:opacity-60"
                >
                  <IconX size={16} /> Reject
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </main>
  );
}
