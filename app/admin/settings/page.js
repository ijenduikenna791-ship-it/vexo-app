"use client";
import { useState } from "react";
import AdminBottomNav from "../../components/AdminBottomNav";

const initialToggles = [
  { key: "maintenance", label: "Maintenance Mode", desc: "Temporarily disable trading platform-wide.", on: false },
  { key: "kyc", label: "Require KYC for Withdrawals", desc: "Users must verify identity before withdrawing.", on: true },
  { key: "newSignups", label: "Allow New Signups", desc: "Turn off to pause new account creation.", on: true },
  { key: "swapFees", label: "Charge Swap Fees", desc: "Apply the standard 0.1% fee to all swaps.", on: true },
];

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${on ? "bg-vexo-orange justify-end" : "bg-vexo-card2 justify-start"}`}
    >
      <span className="w-4 h-4 rounded-full bg-white" />
    </button>
  );
}

export default function AdminSettings() {
  const [toggles, setToggles] = useState(initialToggles);

  const flip = (key) => {
    setToggles((prev) => prev.map((t) => (t.key === key ? { ...t, on: !t.on } : t)));
  };

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">Platform Settings</p>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {toggles.map((t) => (
          <div key={t.key} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none gap-4">
            <div>
              <p className="font-semibold text-sm">{t.label}</p>
              <p className="text-vexo-muted text-xs mt-1">{t.desc}</p>
            </div>
            <Toggle on={t.on} onClick={() => flip(t.key)} />
          </div>
        ))}
      </div>

      <AdminBottomNav />
    </main>
  );
}
