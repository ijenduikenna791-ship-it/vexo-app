"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconMail, IconShieldLock, IconLock } from "@tabler/icons-react";
import { getAdminSession, setAdminSession } from "../../lib/auth";

export default function AdminProfile() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profileBusy, setProfileBusy] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const s = getAdminSession();
    setSession(s);
    setEmail(s?.email || "");
    setDisplayName(s?.displayName || "");
  }, []);

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setProfileError("");
    setProfileMsg("");
    if (!session?.id) {
      setProfileError("Your admin session has expired. Please sign in again.");
      return;
    }
    setProfileBusy(true);
    try {
      const res = await fetch("/api/admin/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId: session.id, email, displayName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setProfileError(data.error || "Could not update profile.");
      } else {
        setAdminSession(data.admin);
        setSession(data.admin);
        setProfileMsg("Profile updated.");
      }
    } catch (err) {
      setProfileError("Could not update profile. Please try again.");
    }
    setProfileBusy(false);
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setPasswordError("");
    setPasswordMsg("");
    if (!session?.id) {
      setPasswordError("Your admin session has expired. Please sign in again.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    setPasswordBusy(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId: session.id, currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || "Could not update password.");
      } else {
        setPasswordMsg("Password updated.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setPasswordError("Could not update password. Please try again.");
    }
    setPasswordBusy(false);
  }

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>

      <div className="flex flex-col items-center gap-2 py-4">
        <div className="w-20 h-20 rounded-full bg-vexo-orange/15 flex items-center justify-center">
          <IconShieldLock size={32} className="text-vexo-orange" />
        </div>
        <p className="font-bold text-lg">{session?.displayName || "Admin"}</p>
        <p className="text-vexo-muted text-sm">{session?.email || "admin@vexo.com"}</p>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        <div className="flex items-center gap-3 py-3 border-b border-vexo-border">
          <IconMail size={18} className="text-vexo-muted" />
          <div>
            <p className="text-xs text-vexo-muted">Email</p>
            <p className="text-sm font-semibold">{session?.email || "admin@vexo.com"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-3">
          <IconLock size={18} className="text-vexo-muted" />
          <div>
            <p className="text-xs text-vexo-muted">Role</p>
            <p className="text-sm font-semibold">Super Admin</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleProfileSubmit} className="bg-vexo-card border border-vexo-border rounded-2xl p-4 flex flex-col gap-3">
        <p className="text-sm font-semibold">Edit Profile</p>
        {profileError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-3 py-2">
            {profileError}
          </div>
        )}
        {profileMsg && (
          <div className="bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-xs rounded-lg px-3 py-2">
            {profileMsg}
          </div>
        )}
        <div>
          <label className="text-xs text-vexo-muted">Display name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Admin"
            className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
          />
        </div>
        <div>
          <label className="text-xs text-vexo-muted">Login email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
          />
        </div>
        <button
          type="submit"
          disabled={profileBusy}
          className="w-full py-2.5 rounded-xl bg-vexo-orange text-white text-sm font-semibold disabled:opacity-60"
        >
          {profileBusy ? "Saving..." : "Save Profile"}
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="bg-vexo-card border border-vexo-border rounded-2xl p-4 flex flex-col gap-3">
        <p className="text-sm font-semibold">Change Password</p>
        {passwordError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-3 py-2">
            {passwordError}
          </div>
        )}
        {passwordMsg && (
          <div className="bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-xs rounded-lg px-3 py-2">
            {passwordMsg}
          </div>
        )}
        <div>
          <label className="text-xs text-vexo-muted">Current password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
          />
        </div>
        <div>
          <label className="text-xs text-vexo-muted">New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
          />
        </div>
        <div>
          <label className="text-xs text-vexo-muted">Confirm new password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange"
          />
        </div>
        <button
          type="submit"
          disabled={passwordBusy}
          className="w-full py-2.5 rounded-xl bg-vexo-card2 border border-vexo-border text-sm font-semibold disabled:opacity-60"
        >
          {passwordBusy ? "Updating..." : "Update Password"}
        </button>
      </form>
    </main>
  );
}
