"use client";
import { useState, useEffect } from "react";
import { IconAlertTriangle, IconShieldCheck, IconUserPlus, IconReceipt2 } from "@tabler/icons-react";
import UserAvatar from "../../components/UserAvatar";
import { getAdminSession } from "../../lib/auth";
import { supabase } from "../../lib/supabaseClient";

const toggleMeta = [
  { key: "maintenance_mode", label: "Maintenance Mode", desc: "Temporarily disable trading platform-wide.", icon: IconAlertTriangle, iconColor: "#EF4444" },
  { key: "require_kyc_for_withdrawals", label: "Require KYC for Withdrawals", desc: "Users must verify identity before withdrawing.", icon: IconShieldCheck, iconColor: "#22C55E" },
  { key: "allow_new_signups", label: "Allow New Signups", desc: "Turn off to pause new account creation.", icon: IconUserPlus, iconColor: "#3B82F6" },
  { key: "charge_swap_fees", label: "Charge Swap Fees", desc: "Apply the standard 0.1% fee to all swaps.", icon: IconReceipt2, iconColor: "#F5590E" },
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
  const adminSession = getAdminSession();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    maintenance_mode: false,
    require_kyc_for_withdrawals: true,
    allow_new_signups: true,
    charge_swap_fees: true,
  });

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from("platform_settings").select("*").eq("id", 1).single();
      if (data) {
        setSettings({
          maintenance_mode: data.maintenance_mode,
          require_kyc_for_withdrawals: data.require_kyc_for_withdrawals,
          allow_new_signups: data.allow_new_signups,
          charge_swap_fees: data.charge_swap_fees,
        });
      }
      setLoading(false);
    }
    loadData();
  }, []);

  async function flip(key) {
    const newVal = !settings[key];
    setSettings((prev) => ({ ...prev, [key]: newVal }));
    await supabase.from("platform_settings").update({ [key]: newVal, updated_at: new Date().toISOString() }).eq("id", 1);
  }

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-orange text-xs font-semibold uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">Platform Settings</p>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex items-center gap-3">
        <UserAvatar name="Admin User" size={44} />
        <div>
          <p className="font-semibold text-sm">Admin User</p>
          <p className="text-vexo-muted text-xs">{adminSession?.email || "admin"} · Super Admin</p>
        </div>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {!loading && toggleMeta.map((t) => (
          <div key={t.key} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${t.iconColor}1A`, color: t.iconColor }}>
                <t.icon size={16} />
              </div>
              <div>
                <p className="font-semibold text-sm">{t.label}</p>
                <p className="text-vexo-muted text-xs mt-0.5">{t.desc}</p>
              </div>
            </div>
            <Toggle on={settings[t.key]} onClick={() => flip(t.key)} />
          </div>
        ))}
      </div>
    </main>
  );
}
