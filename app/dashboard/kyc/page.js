"use client";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconIdBadge2 } from "@tabler/icons-react";

export default function KycPage() {
  const router = useRouter();
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div className="flex flex-col items-center text-center gap-3 py-10">
        <div className="w-14 h-14 rounded-full bg-vexo-card2 flex items-center justify-center">
          <IconIdBadge2 size={26} className="text-vexo-orange" />
        </div>
        <p className="font-bold text-lg">Identity Verification (KYC)</p>
        <p className="text-vexo-muted text-sm max-w-xs">
          Document upload and identity verification require a real backend and secure storage.
          This page is a placeholder until that's connected.
        </p>
      </div>
    </main>
  );
}
