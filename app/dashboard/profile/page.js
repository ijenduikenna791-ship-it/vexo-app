"use client";
import { useRouter } from "next/navigation";
import { logout } from "../../lib/auth";
import { useState } from "react";
import {
  IconSettings, IconShieldCheck, IconPencil, IconLock, IconFingerprint,
  IconShieldLock, IconBell, IconGift, IconHelpCircle, IconChevronRight, IconLogout,
} from "@tabler/icons-react";
import BottomNav from "../../components/BottomNav";

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

export default function Profile() {
  const [security, setSecurity] = useState({ biometric: true, twoFactor: true });
const router = useRouter();
  const flip = (key) => setSecurity((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center font-bold">N</div>
            <div>
              <p className="font-semibold text-sm">n.osborn@shakuro.com</p>
              <div className="flex gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-semibold">Unverified</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-vexo-orange/10 text-vexo-orange font-semibold">VIP 0</span>
              </div>
            </div>
          </div>
          <button className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconSettings size={16} />
          </button>
        </div>

        <div className="flex justify-between mt-5 pt-5 border-t border-vexo-border text-center">
          <div><p className="font-bold">$0</p><p className="text-vexo-muted text-xs">Portfolio</p></div>
          <div><p className="font-bold">0</p><p className="text-vexo-muted text-xs">Trades</p></div>
          <div><p className="font-bold">Sep 15</p><p className="text-vexo-muted text-xs">Joined</p></div>
        </div>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-vexo-orange/10 flex items-center justify-center shrink-0">
          <IconShieldCheck size={18} className="text-vexo-orange" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">Identity Not Verified</p>
          <p className="text-vexo-muted text-xs mt-0.5">Complete KYC to unlock all features</p>
        </div>
        <button className="text-vexo-orange text-sm font-semibold border border-vexo-orange rounded-full px-4 py-1.5">
          Verify
        </button>
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Account</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {[
            { icon: IconShieldCheck, label: "KYC Verification", sub: "Not verified" },
            { icon: IconPencil, label: "Edit Profile", sub: "Change your name" },
            { icon: IconLock, label: "Change Password", sub: "Update your password" },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><item.icon size={16} /></div>
                <div className="text-left">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-vexo-muted text-xs">{item.sub}</p>
                </div>
              </div>
              <IconChevronRight size={16} className="text-vexo-muted" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Security</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          <div className="flex items-center justify-between py-4 border-b border-vexo-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconFingerprint size={16} /></div>
              <div>
                <p className="text-sm font-semibold">Biometric Auth</p>
                <p className="text-vexo-muted text-xs">{security.biometric ? "Enabled" : "Disabled"}</p>
              </div>
            </div>
            <Toggle on={security.biometric} onClick={() => flip("biometric")} />
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconShieldLock size={16} /></div>
              <div>
                <p className="text-sm font-semibold">2-Factor Auth</p>
                <p className="text-vexo-muted text-xs">{security.twoFactor ? "Enabled" : "Disabled"}</p>
              </div>
            </div>
            <Toggle on={security.twoFactor} onClick={() => flip("twoFactor")} />
          </div>
        </div>
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Preferences</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {[
            { icon: IconBell, label: "Notifications", sub: "2 unread" },
            { icon: IconGift, label: "Referral Program", sub: "Earn $50/referral" },
            { icon: IconHelpCircle, label: "Help & Support", sub: "FAQ & contact" },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><item.icon size={16} /></div>
                <div className="text-left">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-vexo-muted text-xs">{item.sub}</p>
                </div>
              </div>
              <IconChevronRight size={16} className="text-vexo-muted" />
            </button>
          ))}
        </div>
      </div>

     <button
  onClick={() => { logout(); router.push("/login"); }}
  className="flex items-center justify-center gap-2 text-red-400 font-semibold text-sm py-4 border border-red-400/30 rounded-2xl"
>
  <IconLogout size={18} /> Sign Out
</button>
      <BottomNav />
    </main>
  );
}
