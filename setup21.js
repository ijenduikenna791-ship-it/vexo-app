const fs = require("fs");
const path = require("path");

// 1. Placeholder pages for menu items that don't exist yet, following the same
//    "clearly needs backend" pattern used in the admin dashboard.
const kycPath = path.join(__dirname, "app/dashboard/kyc/page.js");
fs.mkdirSync(path.dirname(kycPath), { recursive: true });
fs.writeFileSync(kycPath, `"use client";
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
`, "utf8");
console.log("Created: app/dashboard/kyc/page.js");

const transferPath = path.join(__dirname, "app/dashboard/transfer/page.js");
fs.mkdirSync(path.dirname(transferPath), { recursive: true });
fs.writeFileSync(transferPath, `"use client";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconArrowsExchange2 } from "@tabler/icons-react";

export default function TransferPage() {
  const router = useRouter();
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div className="flex flex-col items-center text-center gap-3 py-10">
        <div className="w-14 h-14 rounded-full bg-vexo-card2 flex items-center justify-center">
          <IconArrowsExchange2 size={26} className="text-vexo-orange" />
        </div>
        <p className="font-bold text-lg">Transfer</p>
        <p className="text-vexo-muted text-sm max-w-xs">
          Sending funds to another Vexo user requires a real backend to move balances safely.
          This page is a placeholder until that's connected.
        </p>
      </div>
    </main>
  );
}
`, "utf8");
console.log("Created: app/dashboard/transfer/page.js");

// 2. The slide-out drawer itself.
const drawerPath = path.join(__dirname, "app/components/UserDrawer.js");
fs.writeFileSync(drawerPath, `"use client";
import { useRouter } from "next/navigation";
import {
  IconUser, IconShoppingCart, IconChartLine, IconIdBadge2, IconArrowsExchange2,
  IconLink, IconWallet, IconShieldLock, IconLogout, IconX,
} from "@tabler/icons-react";
import { getSession, logout } from "../lib/auth";

const menuItems = [
  { label: "Profile", href: "/dashboard/profile", icon: IconUser },
  { label: "Buy", href: "/dashboard/market", icon: IconShoppingCart },
  { label: "Market", href: "/dashboard/market", icon: IconChartLine },
  { label: "KYC", href: "/dashboard/kyc", icon: IconIdBadge2 },
  { label: "Transfer", href: "/dashboard/transfer", icon: IconArrowsExchange2 },
  { label: "Wallet Connect", href: "#", icon: IconLink, placeholder: true },
  { label: "My Wallet", href: "/dashboard", icon: IconWallet },
  { label: "Admin Panel", href: "/admin/login", icon: IconShieldLock },
];

export default function UserDrawer({ open, onClose }) {
  const router = useRouter();
  const session = getSession();

  const handleNavigate = (item) => {
    onClose();
    if (item.placeholder) return;
    router.push(item.href);
  };

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/login");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={\`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 \${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }\`}
      />
      <div
        className={\`fixed top-0 right-0 h-full w-[78%] max-w-xs bg-vexo-card border-l border-vexo-border z-50 transition-transform duration-300 flex flex-col \${
          open ? "translate-x-0" : "translate-x-full"
        }\`}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <span />
          <button onClick={onClose} className="text-vexo-muted">
            <IconX size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 py-4 border-b border-vexo-border">
          <div className="w-16 h-16 rounded-full bg-vexo-card2 flex items-center justify-center">
            <IconUser size={28} className="text-vexo-muted" />
          </div>
          <p className="text-vexo-muted text-xs">Hello</p>
          <p className="font-bold">{session?.username || "Guest"}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigate(item)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-left hover:bg-vexo-card2 transition-colors"
            >
              <item.icon size={18} className="text-vexo-orange" />
              {item.label}
              {item.placeholder && (
                <span className="ml-auto text-[10px] text-vexo-muted font-normal">Soon</span>
              )}
            </button>
          ))}
        </div>

        <div className="px-4 pb-6 pt-2">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-full bg-gradient-to-r from-vexo-orange to-vexo-green text-white font-semibold text-sm"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
`, "utf8");
console.log("Created: app/components/UserDrawer.js");

// 3. Rewrite app/dashboard/layout.js: keeps the existing session-check redirect,
//    and adds a floating hamburger button + the drawer on top of every dashboard
//    page, WITHOUT touching what each page renders inside {children}.
const layoutPath = path.join(__dirname, "app/dashboard/layout.js");
fs.mkdirSync(path.dirname(layoutPath), { recursive: true });
fs.writeFileSync(layoutPath, `"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconMenu2 } from "@tabler/icons-react";
import { getSession } from "../lib/auth";
import UserDrawer from "../components/UserDrawer";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/login");
      return;
    }
    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-vexo-bg text-white relative">
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed top-4 right-4 z-30 w-10 h-10 rounded-full bg-vexo-card border border-vexo-border flex items-center justify-center"
      >
        <IconMenu2 size={18} />
      </button>

      {children}

      <UserDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
`, "utf8");
console.log("Created: app/dashboard/layout.js");

console.log("\\nDone!");
