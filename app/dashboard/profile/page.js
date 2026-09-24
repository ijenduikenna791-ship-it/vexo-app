"use client";
import { useRouter } from "next/navigation";
import { logout, getSession } from "../../lib/auth";
import { useState, useEffect } from "react";
import {
  IconSettings, IconShieldCheck, IconPencil, IconLock, IconFingerprint,
  IconShieldLock, IconBell, IconGift, IconHelpCircle, IconChevronRight, IconLogout,
  IconCopy, IconCheck,
} from "@tabler/icons-react";
import BottomNav from "../../components/BottomNav";
import { useLanguage } from "../../lib/i18n";
import { supabase } from "../../lib/supabaseClient";

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
  const router = useRouter();
  const { t } = useLanguage();
  const session = getSession();
  const displayName = session?.username || session?.email || "Guest";
  const initial = displayName.charAt(0).toUpperCase();

  const [portfolioValue, setPortfolioValue] = useState(0);
  const [tradesCount, setTradesCount] = useState(0);
  const [joinedLabel, setJoinedLabel] = useState("—");

  const [kycStatus, setKycStatus] = useState("pending");
  const [kycSubmitting, setKycSubmitting] = useState(false);

  const [toggles, setToggles] = useState({ biometric: true, twoFactor: true, notifications: true });

  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editForm, setEditForm] = useState({ username: "", phone: "", country: "" });
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [pwForm, setPwForm] = useState({ password: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!session?.id) return;

      const { data: walletRows } = await supabase
        .from("wallets")
        .select("amount")
        .eq("user_id", session.id);

      const { data: txRows } = await supabase
        .from("transactions")
        .select("id")
        .eq("user_id", session.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.id)
        .single();

      setPortfolioValue((walletRows || []).reduce((sum, w) => sum + Number(w.amount || 0), 0));
      setTradesCount((txRows || []).length);

      if (profile?.created_at) {
        setJoinedLabel(new Date(profile.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }));
      }

      if (profile) {
        setKycStatus(profile.kyc_status || "pending");
        setToggles({
          biometric: profile.biometric_enabled ?? true,
          twoFactor: profile.two_factor_enabled ?? true,
          notifications: profile.notifications_enabled ?? true,
        });
        setEditForm({
          username: profile.username || "",
          phone: profile.phone || "",
          country: profile.country || "",
        });

        let code = profile.referral_code;
        if (!code) {
          const base = (profile.username || session.email.split("@")[0]).toUpperCase().replace(/[^A-Z0-9]/g, "");
          code = `${base.slice(0, 8)}${Math.floor(1000 + Math.random() * 9000)}`;
          await supabase.from("profiles").update({ referral_code: code }).eq("id", session.id);
        }
        setReferralCode(code);
      }
    }
    loadData();
  }, [session?.id]);

  async function flipToggle(key) {
    const newVal = !toggles[key];
    setToggles((prev) => ({ ...prev, [key]: newVal }));
    const columnMap = {
      biometric: "biometric_enabled",
      twoFactor: "two_factor_enabled",
      notifications: "notifications_enabled",
    };
    if (session?.id) {
      await supabase.from("profiles").update({ [columnMap[key]]: newVal }).eq("id", session.id);
    }
  }

  async function submitKyc() {
    if (!session?.id) return;
    setKycSubmitting(true);
    await supabase.from("profiles").update({ kyc_status: "submitted" }).eq("id", session.id);
    setKycStatus("submitted");
    setKycSubmitting(false);
  }

  async function saveProfileEdits(e) {
    e.preventDefault();
    if (!session?.id) return;
    setEditSaving(true);
    setEditError("");
    const { error } = await supabase
      .from("profiles")
      .update({ username: editForm.username, phone: editForm.phone, country: editForm.country })
      .eq("id", session.id);
    setEditSaving(false);
    if (error) {
      setEditError("Could not save changes. Please try again.");
      return;
    }
    localStorage.setItem(
      "vexo_session",
      JSON.stringify({ ...session, username: editForm.username, phone: editForm.phone, country: editForm.country })
    );
    setShowEditProfile(false);
  }

  async function savePasswordChange(e) {
    e.preventDefault();
    setPwError("");
    if (pwForm.password.length < 6) {
      setPwError("Password must be at least 6 characters.");
      return;
    }
    if (pwForm.password !== pwForm.confirm) {
      setPwError("Passwords do not match.");
      return;
    }
    setPwSaving(true);
    const { error } = await supabase.auth.updateUser({ password: pwForm.password });
    setPwSaving(false);
    if (error) {
      setPwError(error.message);
      return;
    }
    setShowChangePassword(false);
    setPwForm({ password: "", confirm: "" });
    setPwSuccess(true);
    setTimeout(() => setPwSuccess(false), 4000);
  }

  function copyReferral() {
    if (!referralCode) return;
    const link = `${window.location.origin}/signup?ref=${referralCode}`;
    navigator.clipboard?.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const kycSubLabel =
    kycStatus === "verified" ? t("enabledLabel") :
    kycStatus === "submitted" ? "Under review" :
    kycStatus === "rejected" ? "Rejected — resubmit" :
    t("notVerifiedSub");

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center font-bold">{initial}</div>
            <div>
              <p className="font-semibold text-sm">{session?.email || "Guest"}</p>
              <div className="flex gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${kycStatus === "verified" ? "bg-vexo-green/10 text-vexo-green" : "bg-red-500/10 text-red-400"}`}>
                  {kycStatus === "verified" ? "Verified" : t("unverifiedBadge")}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-vexo-orange/10 text-vexo-orange font-semibold">{t("vipBadge")}</span>
              </div>
            </div>
          </div>
          <button onClick={() => setShowEditProfile(true)} className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconSettings size={16} />
          </button>
        </div>

        <div className="flex justify-between mt-5 pt-5 border-t border-vexo-border text-center">
          <div><p className="font-bold">${portfolioValue.toFixed(2)}</p><p className="text-vexo-muted text-xs">{t("portfolioLabel")}</p></div>
          <div><p className="font-bold">{tradesCount}</p><p className="text-vexo-muted text-xs">{t("tradesLabel")}</p></div>
          <div><p className="font-bold">{joinedLabel}</p><p className="text-vexo-muted text-xs">{t("joinedLabel")}</p></div>
        </div>
      </div>

      {pwSuccess && (
        <div className="bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-sm rounded-xl px-4 py-3">
          Password updated successfully.
        </div>
      )}

      {kycStatus !== "verified" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-vexo-orange/10 flex items-center justify-center shrink-0">
            <IconShieldCheck size={18} className="text-vexo-orange" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{t("identityNotVerifiedTitle")}</p>
            <p className="text-vexo-muted text-xs mt-0.5">
              {kycStatus === "submitted" ? "Your verification is under review." : t("identityNotVerifiedDesc")}
            </p>
          </div>
          <button
            onClick={submitKyc}
            disabled={kycStatus === "submitted" || kycSubmitting}
            className="text-vexo-orange text-sm font-semibold border border-vexo-orange rounded-full px-4 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {kycStatus === "submitted" ? "Pending" : kycStatus === "rejected" ? "Resubmit" : t("verifyButton")}
          </button>
        </div>
      )}

      {kycStatus === "verified" && (
        <div className="bg-vexo-green/10 border border-vexo-green/30 rounded-2xl p-5 flex items-center gap-4">
          <IconShieldCheck size={20} className="text-vexo-green shrink-0" />
          <p className="text-sm font-semibold text-vexo-green">Your identity has been verified.</p>
        </div>
      )}

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">{t("accountSectionLabel")}</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          <div className="w-full flex items-center justify-between py-4 border-b border-vexo-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-vexo-green/15 flex items-center justify-center"><IconShieldCheck size={16} className="text-vexo-green" /></div>
              <div className="text-left">
                <p className="text-sm font-semibold">{t("kycVerificationLabel")}</p>
                <p className="text-vexo-muted text-xs">{kycSubLabel}</p>
              </div>
            </div>
          </div>
          <button onClick={() => setShowEditProfile(true)} className="w-full flex items-center justify-between py-4 border-b border-vexo-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center"><IconPencil size={16} className="text-indigo-400" /></div>
              <div className="text-left">
                <p className="text-sm font-semibold">{t("editProfileLabel")}</p>
                <p className="text-vexo-muted text-xs">{t("editProfileSub")}</p>
              </div>
            </div>
            <IconChevronRight size={16} className="text-vexo-muted" />
          </button>
          <button onClick={() => setShowChangePassword(true)} className="w-full flex items-center justify-between py-4 last:border-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center"><IconLock size={16} className="text-amber-400" /></div>
              <div className="text-left">
                <p className="text-sm font-semibold">{t("changePasswordLabel")}</p>
                <p className="text-vexo-muted text-xs">{t("changePasswordSub")}</p>
              </div>
            </div>
            <IconChevronRight size={16} className="text-vexo-muted" />
          </button>
        </div>
      </div>

      {showEditProfile && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex flex-col gap-3">
          <p className="font-semibold text-sm">{t("editProfileLabel")}</p>
          {editError && <p className="text-red-400 text-xs">{editError}</p>}
          <form onSubmit={saveProfileEdits} className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-vexo-muted">Username</label>
              <input
                type="text"
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
              />
            </div>
            <div>
              <label className="text-xs text-vexo-muted">Phone number</label>
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
              />
            </div>
            <div>
              <label className="text-xs text-vexo-muted">Country</label>
              <input
                type="text"
                value={editForm.country}
                onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
              />
            </div>
            <div className="flex gap-2 mt-1">
              <button type="button" onClick={() => setShowEditProfile(false)} className="flex-1 py-2 rounded-lg border border-vexo-border text-sm font-semibold">Cancel</button>
              <button type="submit" disabled={editSaving} className="flex-1 py-2 rounded-lg bg-vexo-orange text-white text-sm font-semibold disabled:opacity-60">
                {editSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      {showChangePassword && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex flex-col gap-3">
          <p className="font-semibold text-sm">{t("changePasswordLabel")}</p>
          {pwError && <p className="text-red-400 text-xs">{pwError}</p>}
          <form onSubmit={savePasswordChange} className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-vexo-muted">New password</label>
              <input
                type="password"
                value={pwForm.password}
                onChange={(e) => setPwForm({ ...pwForm, password: e.target.value })}
                className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
              />
            </div>
            <div>
              <label className="text-xs text-vexo-muted">Confirm new password</label>
              <input
                type="password"
                value={pwForm.confirm}
                onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
              />
            </div>
            <div className="flex gap-2 mt-1">
              <button type="button" onClick={() => setShowChangePassword(false)} className="flex-1 py-2 rounded-lg border border-vexo-border text-sm font-semibold">Cancel</button>
              <button type="submit" disabled={pwSaving} className="flex-1 py-2 rounded-lg bg-vexo-orange text-white text-sm font-semibold disabled:opacity-60">
                {pwSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">{t("securitySectionLabel")}</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          <div className="flex items-center justify-between py-4 border-b border-vexo-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-vexo-green/15 flex items-center justify-center"><IconFingerprint size={16} className="text-vexo-green" /></div>
              <div>
                <p className="text-sm font-semibold">{t("biometricAuthLabel")}</p>
                <p className="text-vexo-muted text-xs">{toggles.biometric ? t("enabledLabel") : t("disabledLabel")}</p>
              </div>
            </div>
            <Toggle on={toggles.biometric} onClick={() => flipToggle("biometric")} />
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-vexo-green/15 flex items-center justify-center"><IconShieldLock size={16} className="text-vexo-green" /></div>
              <div>
                <p className="text-sm font-semibold">{t("twoFactorAuthLabel")}</p>
                <p className="text-vexo-muted text-xs">{toggles.twoFactor ? t("enabledLabel") : t("disabledLabel")}</p>
              </div>
            </div>
            <Toggle on={toggles.twoFactor} onClick={() => flipToggle("twoFactor")} />
          </div>
        </div>
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">{t("preferencesSectionLabel")}</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          <div className="w-full flex items-center justify-between py-4 border-b border-vexo-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-vexo-orange/15 flex items-center justify-center"><IconBell size={16} className="text-vexo-orange" /></div>
              <div className="text-left">
                <p className="text-sm font-semibold">{t("notificationsLabel")}</p>
                <p className="text-vexo-muted text-xs">{toggles.notifications ? t("enabledLabel") : t("disabledLabel")}</p>
              </div>
            </div>
            <Toggle on={toggles.notifications} onClick={() => flipToggle("notifications")} />
          </div>

          <button onClick={() => setShowReferral(!showReferral)} className="w-full flex items-center justify-between py-4 border-b border-vexo-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-500/15 flex items-center justify-center"><IconGift size={16} className="text-pink-400" /></div>
              <div className="text-left">
                <p className="text-sm font-semibold">{t("referralProgramLabel")}</p>
                <p className="text-vexo-muted text-xs">{t("referralProgramSub")}</p>
              </div>
            </div>
            <IconChevronRight size={16} className={`text-vexo-muted transition-transform ${showReferral ? "rotate-90" : ""}`} />
          </button>
          {showReferral && (
            <div className="pb-4 pt-1">
              <div className="flex items-center justify-between bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2.5">
                <span className="font-mono text-sm font-semibold">{referralCode || "-"}</span>
                <button onClick={copyReferral} className="text-vexo-orange text-xs font-semibold flex items-center gap-1">
                  {copied ? <><IconCheck size={14} /> Copied</> : <><IconCopy size={14} /> Copy link</>}
                </button>
              </div>
              <p className="text-vexo-muted text-xs mt-2">Share this link with friends - you will get a $5 bonus once they make their first deposit.</p>
            </div>
          )}

          <button onClick={() => setShowHelp(!showHelp)} className="w-full flex items-center justify-between py-4 last:border-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconHelpCircle size={16} className="text-vexo-muted" /></div>
              <div className="text-left">
                <p className="text-sm font-semibold">{t("helpSupportLabel")}</p>
                <p className="text-vexo-muted text-xs">{t("helpSupportSub")}</p>
              </div>
            </div>
            <IconChevronRight size={16} className={`text-vexo-muted transition-transform ${showHelp ? "rotate-90" : ""}`} />
          </button>
          {showHelp && (
            <div className="pb-4 pt-1 flex flex-col gap-3 text-sm">
              <div>
                <p className="font-semibold">How do I fund my wallet?</p>
                <p className="text-vexo-muted text-xs mt-1">Use the Receive button on your dashboard to get a deposit address once deposits are enabled.</p>
              </div>
              <div>
                <p className="font-semibold">Why do I need to verify my identity?</p>
                <p className="text-vexo-muted text-xs mt-1">Verification (KYC) is required before withdrawals to keep the platform secure and compliant.</p>
              </div>
              <div>
                <p className="font-semibold">Need more help?</p>
                <p className="text-vexo-muted text-xs mt-1">Email us at <span className="text-vexo-orange">support@vexo.com</span>.</p>
              </div>
            </div>
          )}
        </div>
      </div>

     <button
  onClick={async () => { await logout(); router.push("/login"); }}
  className="flex items-center justify-center gap-2 text-red-400 font-semibold text-sm py-4 border border-red-400/30 rounded-2xl"
>
  <IconLogout size={18} /> {t("signOutLabel")}
</button>
      <BottomNav />
    </main>
  );
}
