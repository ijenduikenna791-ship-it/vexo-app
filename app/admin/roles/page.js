"use client";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconLock } from "@tabler/icons-react";

export default function Placeholder() {
  const router = useRouter();
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div className="flex flex-col items-center text-center gap-3 py-10">
        <div className="w-14 h-14 rounded-full bg-vexo-card2 flex items-center justify-center">
          <IconLock size={26} className="text-vexo-orange" />
        </div>
        <p className="font-bold text-lg">Roles & Permissions</p>
        <p className="text-vexo-muted text-sm max-w-xs">Assigning admin roles and permissions requires a real backend with proper authorization checks. This page is a placeholder until that's connected.</p>
      </div>
    </main>
  );
}
