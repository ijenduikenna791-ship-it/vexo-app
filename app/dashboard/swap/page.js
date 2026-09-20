import Link from "next/link";
import { IconShieldCheck } from "@tabler/icons-react";
import BottomNav from "../../components/BottomNav";

export default function Swap() {
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-10 flex flex-col items-center">
      <div className="bg-vexo-card border border-vexo-border rounded-3xl p-8 text-center w-full">
        <div className="w-14 h-14 rounded-full bg-vexo-card2 flex items-center justify-center mx-auto mb-5">
          <IconShieldCheck size={28} className="text-vexo-orange" />
        </div>
        <h1 className="text-xl font-bold">Identity Verification Required</h1>
        <p className="text-vexo-muted text-sm mt-3">
          You must complete KYC verification before making any transactions on Vexo.
        </p>
        <Link href="/dashboard/profile" className="mt-6 inline-block w-full py-3 rounded-xl bg-vexo-orange text-white font-bold">
          Verify My Identity
        </Link>
        <p className="text-vexo-muted text-xs mt-4">
          KYC verification is required by law to prevent fraud and money laundering.
        </p>
      </div>

      <BottomNav />
    </main>
  );
}
