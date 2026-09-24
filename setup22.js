const fs = require("fs");
const path = require("path");

// 1. Placeholder admin pages for menu items we haven't built full features for yet.
const placeholders = [
  {
    file: "app/admin/audit-logs/page.js",
    title: "Audit Logs",
    icon: "IconHistory",
    text: "Every balance adjustment, top-up, and sensitive action will be recorded here once connected to a real backend. This page is a placeholder until that logging system exists.",
  },
  {
    file: "app/admin/roles/page.js",
    title: "Roles & Permissions",
    icon: "IconLock",
    text: "Assigning admin roles and permissions requires a real backend with proper authorization checks. This page is a placeholder until that's connected.",
  },
  {
    file: "app/admin/support/page.js",
    title: "Support Center",
    icon: "IconHeadset",
    text: "Viewing and responding to user support tickets requires a real backend. This page is a placeholder until that's connected.",
  },
];

for (const p of placeholders) {
  const fullPath = path.join(__dirname, p.file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, `"use client";
import { useRouter } from "next/navigation";
import { IconArrowLeft, ${p.icon} } from "@tabler/icons-react";

export default function Placeholder() {
  const router = useRouter();
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div className="flex flex-col items-center text-center gap-3 py-10">
        <div className="w-14 h-14 rounded-full bg-vexo-card2 flex items-center justify-center">
          <${p.icon} size={26} className="text-vexo-orange" />
        </div>
        <p className="font-bold text-lg">${p.title}</p>
        <p className="text-vexo-muted text-sm max-w-xs">${p.text}</p>
      </div>
    </main>
  );
}
`, "utf8");
  console.log("Created:", p.file);
}

// 2. Admin slide-out drawer.
const drawerPath = path.join(__dirname, "app/components/AdminDrawer.js");
fs.writeFileSync(drawerPath, `"use client";
import { useRouter } from "next/navigation";
import {
  IconLayoutDashboard, IconUsers, IconArrowsExchange, IconSettings,
  IconHistory, IconLock, IconHeadset, IconShieldLock, IconLogout, IconX,
} from "@tabler/icons-react";
import { adminLogout } from "../lib/auth";

const menuItems = [
  { label: "Overview", href: "/admin", icon: IconLayoutDashboard },
  { label: "Users", href: "/admin/users", icon: IconUsers },
  { label: "Transactions", href: "/admin/transactions", icon: IconArrowsExchange },
  { label: "Settings", href: "/admin/settings", icon: IconSettings },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: IconHistory },
  { label: "Roles & Permissions", href: "/admin/roles", icon: IconLock },
  { label: "Support Center", href: "/admin/support", icon: IconHeadset },
];

export default function AdminDrawer({ open, onClose }) {
  const router = useRouter();

  const handleNavigate = (href) => {
    onClose();
    router.push(href);
  };

  const handleLogout = () => {
    adminLogout();
    onClose();
    router.push("/admin/login");
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
          <div className="w-16 h-16 rounded-full bg-vexo-orange/15 flex items-center justify-center">
            <IconShieldLock size={26} className="text-vexo-orange" />
          </div>
          <p className="text-vexo-muted text-xs">Hello</p>
          <p className="font-bold">Admin</p>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigate(item.href)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-left hover:bg-vexo-card2 transition-colors"
            >
              <item.icon size={18} className="text-vexo-orange" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="px-4 pb-6 pt-2">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-full bg-gradient-to-r from-vexo-orange to-vexo-green text-white font-semibold text-sm flex items-center justify-center gap-2"
          >
            <IconLogout size={16} /> Log out
          </button>
        </div>
      </div>
    </>
  );
}
`, "utf8");
console.log("Created: app/components/AdminDrawer.js");

// 3. Update AdminNavbar to open the drawer via a hamburger button (self-contained,
//    manages its own open/close state — no other files need to change).
const navbarPath = path.join(__dirname, "app/components/AdminNavbar.js");
fs.writeFileSync(navbarPath, `"use client";
import { useState } from "react";
import { IconShieldLock, IconMenu2 } from "@tabler/icons-react";
import AdminDrawer from "./AdminDrawer";

export default function AdminNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-vexo-bg/95 backdrop-blur border-b border-vexo-border">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-vexo-orange/15 flex items-center justify-center">
              <IconShieldLock size={18} className="text-vexo-orange" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Vexo</p>
              <p className="text-[10px] text-vexo-muted leading-none mt-0.5">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center"
          >
            <IconMenu2 size={18} />
          </button>
        </div>
      </header>

      <AdminDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
`, "utf8");
console.log("Updated: app/components/AdminNavbar.js (hamburger now opens the drawer)");

console.log("\\nDone!");
