"use client";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconHistory } from "@tabler/icons-react";

export default function Placeholder() {
  const router = useRouter();
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div className="flex flex-col items-center text-center gap-3 py-10">
        <div className="w-14 h-14 rounded-full bg-vexo-card2 flex items-center justify-center">
          <IconHistory size={26} className="text-vexo-orange" />
        </div>
        <p className="font-bold text-lg">Audit Logs</p>
        <p className="text-vexo-muted text-sm max-w-xs">Every balance adjustment, top-up, and sensitive action will be recorded here once connected to a real backend. This page is a placeholder until that logging system exists.</p>
      </div>
    </main>
  );
}
