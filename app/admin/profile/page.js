"use client";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconMail, IconShieldLock, IconLock } from "@tabler/icons-react";
import { getAdminSession } from "../../lib/auth";
import BackendNotice from "../../components/admin/BackendNotice";

export default function AdminProfile() {
  const router = useRouter();
  const session = getAdminSession();

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>

      <div className="flex flex-col items-center gap-2 py-4">
        <div className="w-20 h-20 rounded-full bg-vexo-orange/15 flex items-center justify-center">
          <IconShieldLock size={32} className="text-vexo-orange" />
        </div>
        <p className="font-bold text-lg">Admin</p>
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

      <BackendNotice message="Editing admin details or changing the password needs a real backend with proper authentication. These are placeholders for now." />

      <button disabled className="w-full py-2.5 rounded-xl bg-vexo-card2 border border-vexo-border text-vexo-muted text-sm font-semibold cursor-not-allowed">
        Edit Profile (backend required)
      </button>
      <button disabled className="w-full py-2.5 rounded-xl bg-vexo-card2 border border-vexo-border text-vexo-muted text-sm font-semibold cursor-not-allowed">
        Change Password (backend required)
      </button>
    </main>
  );
}
