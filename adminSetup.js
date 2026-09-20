const fs = require("fs");
const path = require("path");

const files = {
  "app/components/AdminBottomNav.js": `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLayoutDashboard, IconUsers, IconReceipt2, IconSettings } from "@tabler/icons-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: IconLayoutDashboard },
  { href: "/admin/users", label: "Users", icon: IconUsers },
  { href: "/admin/transactions", label: "Transactions", icon: IconReceipt2 },
  { href: "/admin/settings", label: "Settings", icon: IconSettings },
];

export default function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-vexo-card border-t border-vexo-border">
      <div className="max-w-md mx-auto flex items-center justify-between px-6 py-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={\`flex flex-col items-center gap-1 text-xs \${active ? "text-white" : "text-vexo-muted"}\`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
`,

  "app/admin/page.js": `import { IconUsers, IconChartBar, IconWallet, IconClockHour4 } from "@tabler/icons-react";
import AdminBottomNav from "../components/AdminBottomNav";

const stats = [
  { icon: IconUsers, label: "Total Users", value: "248,391", change: "+1.4%", up: true },
  { icon: IconChartBar, label: "24h Volume", value: "$18.2M", change: "+6.2%", up: true },
  { icon: IconWallet, label: "Active Wallets", value: "94,120", change: "+0.8%", up: true },
  { icon: IconClockHour4, label: "Pending KYC", value: "412", change: "-3.1%", up: false },
];

const recentTx = [
  { user: "Norman Osborn", type: "Deposit", amount: "+$5,200.00", status: "Completed" },
  { user: "Priya Nair", type: "Withdraw", amount: "-$1,050.00", status: "Completed" },
  { user: "Marcus Ade", type: "Swap", amount: "BTC → ETH", status: "Pending" },
  { user: "Sarah Chen", type: "Deposit", amount: "+$800.00", status: "Completed" },
];

export default function AdminOverview() {
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">Overview</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
            <div className="w-9 h-9 rounded-lg bg-vexo-card2 flex items-center justify-center mb-3">
              <s.icon size={18} />
            </div>
            <p className="font-bold text-lg leading-tight">{s.value}</p>
            <p className="text-vexo-muted text-xs mt-1">{s.label}</p>
            <p className={\`text-xs mt-1 \${s.up ? "text-vexo-green" : "text-red-400"}\`}>{s.change}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Recent Transactions</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {recentTx.map((tx, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
              <div>
                <p className="font-semibold text-sm">{tx.user}</p>
                <p className="text-vexo-muted text-xs">{tx.type}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{tx.amount}</p>
                <p className={\`text-xs \${tx.status === "Completed" ? "text-vexo-green" : "text-yellow-400"}\`}>{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminBottomNav />
    </main>
  );
}
`,

  "app/admin/users/page.js": `"use client";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import AdminBottomNav from "../../components/AdminBottomNav";

const users = [
  { name: "Norman Osborn", email: "n.osborn@shakuro.com", balance: "$5,271.39", status: "Active", joined: "Jan 2025" },
  { name: "Priya Nair", email: "priya.n@example.com", balance: "$12,940.10", status: "Active", joined: "Mar 2025" },
  { name: "Marcus Ade", email: "marcus.ade@example.com", balance: "$820.00", status: "Suspended", joined: "Jun 2025" },
  { name: "Sarah Chen", email: "sarah.chen@example.com", balance: "$34,102.55", status: "Active", joined: "Feb 2025" },
  { name: "David Kim", email: "d.kim@example.com", balance: "$0.00", status: "Pending KYC", joined: "Sep 2026" },
];

const statusColor = {
  Active: "text-vexo-green",
  Suspended: "text-red-400",
  "Pending KYC": "text-yellow-400",
};

export default function AdminUsers() {
  const [query, setQuery] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">Users</p>
      </div>

      <div className="relative">
        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email"
          className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
        />
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {filtered.map((u) => (
          <div key={u.email} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border" />
              <div>
                <p className="font-semibold text-sm">{u.name}</p>
                <p className="text-vexo-muted text-xs">{u.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">{u.balance}</p>
              <p className={\`text-xs \${statusColor[u.status]}\`}>{u.status}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-vexo-muted text-sm text-center py-6">No users found.</p>
        )}
      </div>

      <AdminBottomNav />
    </main>
  );
}
`,

  "app/admin/transactions/page.js": `"use client";
import { useState } from "react";
import AdminBottomNav from "../../components/AdminBottomNav";

const tabs = ["All", "Deposits", "Withdrawals", "Swaps"];

const transactions = [
  { user: "Norman Osborn", type: "Deposit", amount: "+$5,200.00", status: "Completed", date: "Sep 17" },
  { user: "Priya Nair", type: "Withdraw", amount: "-$1,050.00", status: "Completed", date: "Sep 17" },
  { user: "Marcus Ade", type: "Swap", amount: "BTC → ETH", status: "Pending", date: "Sep 16" },
  { user: "Sarah Chen", type: "Deposit", amount: "+$800.00", status: "Completed", date: "Sep 16" },
  { user: "David Kim", type: "Withdraw", amount: "-$120.00", status: "Failed", date: "Sep 15" },
  { user: "Priya Nair", type: "Swap", amount: "ETH → USDT", status: "Completed", date: "Sep 15" },
];

const typeMap = { Deposits: "Deposit", Withdrawals: "Withdraw", Swaps: "Swap" };

const statusColor = {
  Completed: "text-vexo-green",
  Pending: "text-yellow-400",
  Failed: "text-red-400",
};

export default function AdminTransactions() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? transactions : transactions.filter((t) => t.type === typeMap[active]);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">Transactions</p>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={\`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap \${
              active === tab ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
            }\`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {filtered.map((tx, i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
            <div>
              <p className="font-semibold text-sm">{tx.user}</p>
              <p className="text-vexo-muted text-xs">{tx.type} · {tx.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">{tx.amount}</p>
              <p className={\`text-xs \${statusColor[tx.status]}\`}>{tx.status}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-vexo-muted text-sm text-center py-6">No transactions found.</p>
        )}
      </div>

      <AdminBottomNav />
    </main>
  );
}
`,

  "app/admin/settings/page.js": `"use client";
import { useState } from "react";
import AdminBottomNav from "../../components/AdminBottomNav";

const initialToggles = [
  { key: "maintenance", label: "Maintenance Mode", desc: "Temporarily disable trading platform-wide.", on: false },
  { key: "kyc", label: "Require KYC for Withdrawals", desc: "Users must verify identity before withdrawing.", on: true },
  { key: "newSignups", label: "Allow New Signups", desc: "Turn off to pause new account creation.", on: true },
  { key: "swapFees", label: "Charge Swap Fees", desc: "Apply the standard 0.1% fee to all swaps.", on: true },
];

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      className={\`w-11 h-6 rounded-full flex items-center px-1 transition-colors \${on ? "bg-vexo-orange justify-end" : "bg-vexo-card2 justify-start"}\`}
    >
      <span className="w-4 h-4 rounded-full bg-white" />
    </button>
  );
}

export default function AdminSettings() {
  const [toggles, setToggles] = useState(initialToggles);

  const flip = (key) => {
    setToggles((prev) => prev.map((t) => (t.key === key ? { ...t, on: !t.on } : t)));
  };

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">Platform Settings</p>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {toggles.map((t) => (
          <div key={t.key} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none gap-4">
            <div>
              <p className="font-semibold text-sm">{t.label}</p>
              <p className="text-vexo-muted text-xs mt-1">{t.desc}</p>
            </div>
            <Toggle on={t.on} onClick={() => flip(t.key)} />
          </div>
        ))}
      </div>

      <AdminBottomNav />
    </main>
  );
}
`,
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("Created:", relativePath);
}

console.log("\nDone! Admin dashboard created: Overview, Users, Transactions, Settings.");