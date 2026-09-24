const fs = require("fs");
const path = require("path");

// 1. Append aggregator helpers to the existing mock data file (append only —
//    nothing already in app/lib/mockUsers.js is touched or removed).
const mockUsersPath = path.join(__dirname, "app/lib/mockUsers.js");
const helperCode = `
export function getAllWallets() {
  return Object.entries(mockWalletsByUser).flatMap(([userId, wallets]) => {
    const user = mockUsers.find((u) => u.id === userId);
    return wallets.map((w) => ({ ...w, userId, userName: user ? user.name : userId }));
  });
}

export function getAllDeposits() {
  return Object.entries(mockDepositsByUser).flatMap(([userId, deposits]) => {
    const user = mockUsers.find((u) => u.id === userId);
    return deposits.map((d) => ({ ...d, userId, userName: user ? user.name : userId }));
  });
}

export function getAllWithdrawals() {
  return Object.entries(mockWithdrawalsByUser).flatMap(([userId, withdrawals]) => {
    const user = mockUsers.find((u) => u.id === userId);
    return withdrawals.map((w) => ({ ...w, userId, userName: user ? user.name : userId }));
  });
}

export function getAllBilling() {
  return Object.entries(mockBillingByUser).flatMap(([userId, bills]) => {
    const user = mockUsers.find((u) => u.id === userId);
    return bills.map((b) => ({ ...b, userId, userName: user ? user.name : userId }));
  });
}
`;

if (fs.existsSync(mockUsersPath)) {
  const existing = fs.readFileSync(mockUsersPath, "utf8");
  if (!existing.includes("getAllWallets")) {
    fs.appendFileSync(mockUsersPath, helperCode, "utf8");
    console.log("Appended aggregator helpers to: app/lib/mockUsers.js");
  } else {
    console.log("Aggregator helpers already present, skipped: app/lib/mockUsers.js");
  }
} else {
  console.log("WARNING: app/lib/mockUsers.js not found — cannot append helpers.");
}

// 2. Global Wallets page
fs.mkdirSync(path.join(__dirname, "app/admin/wallets"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "app/admin/wallets/page.js"), `"use client";
import { useState, useMemo } from "react";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { getAllWallets } from "../../lib/mockUsers";
import StatusBadge from "../../components/StatusBadge";

export default function AdminWallets() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const wallets = useMemo(() => getAllWallets(), []);

  const filtered = wallets.filter((w) => {
    const q = query.toLowerCase();
    return !q || w.asset.toLowerCase().includes(q) || w.userName.toLowerCase().includes(q) || w.address.toLowerCase().includes(q);
  });

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div>
        <p className="text-3xl font-bold">Wallets</p>
        <p className="text-vexo-muted text-sm mt-1">{wallets.length} wallets across all users</p>
      </div>

      <div className="relative">
        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by asset, user, or address"
          className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
        />
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {filtered.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No wallets found.</p>}
        {filtered.map((w, i) => (
          <div key={i} className="py-3 border-b border-vexo-border last:border-none">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{w.asset} ({w.symbol})</span>
              <StatusBadge status={w.status} />
            </div>
            <p className="text-vexo-muted text-xs mt-1">{w.userName} · {w.address}</p>
            <p className="text-sm font-semibold mt-1">{w.balance} {w.symbol}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
`, "utf8");
console.log("Created: app/admin/wallets/page.js");

// 3. Global Deposits page (with Approve/Reject marked backend-required)
fs.mkdirSync(path.join(__dirname, "app/admin/deposits"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "app/admin/deposits/page.js"), `"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { getAllDeposits } from "../../lib/mockUsers";
import StatusBadge from "../../components/StatusBadge";
import BackendNotice from "../../components/admin/BackendNotice";

export default function AdminDeposits() {
  const router = useRouter();
  const deposits = useMemo(() => getAllDeposits(), []);
  const [notice, setNotice] = useState(false);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div>
        <p className="text-3xl font-bold">Deposits</p>
        <p className="text-vexo-muted text-sm mt-1">{deposits.length} deposits across all users</p>
      </div>

      {notice && (
        <BackendNotice message="Approving or rejecting a deposit must update a real ledger and write an audit log entry. No data was changed here." />
      )}

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {deposits.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No deposits found.</p>}
        {deposits.map((d) => (
          <div key={d.id} className="py-3 border-b border-vexo-border last:border-none">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{d.asset} · {d.network}</span>
              <StatusBadge status={d.status} />
            </div>
            <p className="text-vexo-muted text-xs mt-1">{d.userName} · {d.date}</p>
            <p className="text-sm font-semibold mt-1">{d.amount} {d.asset}</p>
            {d.status === "Pending" && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => setNotice(true)} className="flex-1 py-1.5 rounded-lg bg-vexo-green/20 text-vexo-green text-xs font-semibold">Approve</button>
                <button onClick={() => setNotice(true)} className="flex-1 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold">Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
`, "utf8");
console.log("Created: app/admin/deposits/page.js");

// 4. Global Withdrawals page
fs.mkdirSync(path.join(__dirname, "app/admin/withdrawals"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "app/admin/withdrawals/page.js"), `"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { getAllWithdrawals } from "../../lib/mockUsers";
import StatusBadge from "../../components/StatusBadge";
import BackendNotice from "../../components/admin/BackendNotice";

export default function AdminWithdrawals() {
  const router = useRouter();
  const withdrawals = useMemo(() => getAllWithdrawals(), []);
  const [notice, setNotice] = useState(false);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div>
        <p className="text-3xl font-bold">Withdrawals</p>
        <p className="text-vexo-muted text-sm mt-1">{withdrawals.length} withdrawals across all users</p>
      </div>

      {notice && (
        <BackendNotice message="Approving or rejecting a withdrawal must move real funds and write an audit log entry. No data was changed here." />
      )}

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {withdrawals.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No withdrawals found.</p>}
        {withdrawals.map((w) => (
          <div key={w.id} className="py-3 border-b border-vexo-border last:border-none">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{w.asset} · {w.network}</span>
              <StatusBadge status={w.status} />
            </div>
            <p className="text-vexo-muted text-xs mt-1">{w.userName} · To {w.destination}</p>
            <p className="text-sm font-semibold mt-1">Net: {w.net} {w.asset} (fee {w.fee})</p>
            {w.status === "Pending" && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => setNotice(true)} className="flex-1 py-1.5 rounded-lg bg-vexo-green/20 text-vexo-green text-xs font-semibold">Approve</button>
                <button onClick={() => setNotice(true)} className="flex-1 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold">Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
`, "utf8");
console.log("Created: app/admin/withdrawals/page.js");

// 5. Global Billing page
fs.mkdirSync(path.join(__dirname, "app/admin/billing"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "app/admin/billing/page.js"), `"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { getAllBilling } from "../../lib/mockUsers";
import StatusBadge from "../../components/StatusBadge";
import BackendNotice from "../../components/admin/BackendNotice";

export default function AdminBilling() {
  const router = useRouter();
  const billing = useMemo(() => getAllBilling(), []);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div>
        <p className="text-3xl font-bold">Billing</p>
        <p className="text-vexo-muted text-sm mt-1">{billing.length} billing records across all users</p>
      </div>

      <BackendNotice message="Creating new billing requirements or marking one as paid needs a real backend ledger. This view is read-only mock data." />

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {billing.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No billing records.</p>}
        {billing.map((b) => (
          <div key={b.id} className="py-3 border-b border-vexo-border last:border-none">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{b.description}</span>
              <StatusBadge status={b.status} />
            </div>
            <p className="text-vexo-muted text-xs mt-1">{b.userName} · Due {b.due}</p>
            <p className="text-sm font-semibold mt-1">{b.currency} {b.amount}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
`, "utf8");
console.log("Created: app/admin/billing/page.js");

// 6. Analytics page
fs.mkdirSync(path.join(__dirname, "app/admin/analytics"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "app/admin/analytics/page.js"), `"use client";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { mockUsers } from "../../lib/mockUsers";

const monthlyGrowth = [
  { month: "Apr", users: 3 },
  { month: "May", users: 5 },
  { month: "Jun", users: 7 },
  { month: "Jul", users: 8 },
  { month: "Aug", users: 10 },
  { month: "Sep", users: 12 },
];

export default function AdminAnalytics() {
  const router = useRouter();
  const totalBalance = mockUsers.reduce((sum, u) => sum + u.balance, 0);
  const totalTx = mockUsers.reduce((sum, u) => sum + u.transactionsCount, 0);
  const verified = mockUsers.filter((u) => u.verification === "Verified").length;
  const maxUsers = Math.max(...monthlyGrowth.map((m) => m.users));

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>
      <div>
        <p className="text-3xl font-bold">Analytics</p>
        <p className="text-vexo-muted text-sm mt-1">Platform performance at a glance</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Total balance</p>
          <p className="font-bold text-lg mt-1">\${totalBalance.toLocaleString()}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Total transactions</p>
          <p className="font-bold text-lg mt-1">{totalTx}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Verified users</p>
          <p className="font-bold text-lg mt-1 text-vexo-green">{verified}/{mockUsers.length}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Avg balance</p>
          <p className="font-bold text-lg mt-1">\${Math.round(totalBalance / mockUsers.length).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
        <p className="font-semibold text-sm mb-4">User growth (last 6 months)</p>
        <div className="flex items-end justify-between gap-2 h-32">
          {monthlyGrowth.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-vexo-orange"
                style={{ height: \`\${(m.users / maxUsers) * 100}%\` }}
              />
              <span className="text-vexo-muted text-[10px]">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-vexo-muted text-xs text-center">Sample data shown. Live analytics require a real backend to aggregate.</p>
    </main>
  );
}
`, "utf8");
console.log("Created: app/admin/analytics/page.js");

// 7. Admin's own profile page
fs.mkdirSync(path.join(__dirname, "app/admin/profile"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "app/admin/profile/page.js"), `"use client";
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
`, "utf8");
console.log("Created: app/admin/profile/page.js");

// 8. Updated AdminDrawer with the full feature set, grouped into sections.
const drawerPath = path.join(__dirname, "app/components/AdminDrawer.js");
fs.writeFileSync(drawerPath, `"use client";
import { useRouter } from "next/navigation";
import {
  IconLayoutDashboard, IconUsers, IconWallet, IconArrowsExchange, IconArrowDownLeft,
  IconArrowUpRight, IconReceipt2, IconChartBar, IconSettings, IconHistory, IconLock,
  IconHeadset, IconUserCog, IconLink, IconShieldLock, IconLogout, IconX,
} from "@tabler/icons-react";
import { adminLogout } from "../lib/auth";

const sections = [
  {
    label: "Dashboard",
    items: [
      { label: "Overview", href: "/admin", icon: IconLayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: IconChartBar },
    ],
  },
  {
    label: "Users",
    items: [
      { label: "Users", href: "/admin/users", icon: IconUsers },
    ],
  },
  {
    label: "Financial",
    items: [
      { label: "Wallets", href: "/admin/wallets", icon: IconWallet },
      { label: "Transactions", href: "/admin/transactions", icon: IconArrowsExchange },
      { label: "Deposits", href: "/admin/deposits", icon: IconArrowDownLeft },
      { label: "Withdrawals", href: "/admin/withdrawals", icon: IconArrowUpRight },
      { label: "Billing", href: "/admin/billing", icon: IconReceipt2 },
      { label: "Wallet Connect", href: "#", icon: IconLink, placeholder: true },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Settings", href: "/admin/settings", icon: IconSettings },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: IconHistory },
      { label: "Roles & Permissions", href: "/admin/roles", icon: IconLock },
      { label: "Support Center", href: "/admin/support", icon: IconHeadset },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Admin Profile", href: "/admin/profile", icon: IconUserCog },
    ],
  },
];

export default function AdminDrawer({ open, onClose }) {
  const router = useRouter();

  const handleNavigate = (item) => {
    onClose();
    if (item.placeholder) return;
    router.push(item.href);
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
        className={\`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-vexo-card border-l border-vexo-border z-50 transition-transform duration-300 flex flex-col \${
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

        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-4">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="text-vexo-muted text-[10px] uppercase tracking-wide px-3 mb-1">{section.label}</p>
              <div className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavigate(item)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left hover:bg-vexo-card2 transition-colors"
                  >
                    <item.icon size={17} className="text-vexo-orange" />
                    {item.label}
                    {item.placeholder && (
                      <span className="ml-auto text-[10px] text-vexo-muted font-normal">Soon</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
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
console.log("Updated: app/components/AdminDrawer.js (full feature set, grouped into sections)");

console.log("\\nDone!");
