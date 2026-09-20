const fs = require("fs");
const path = require("path");

const files = {
  "app/components/StatusBadge.js": `const styles = {
  Active: "bg-vexo-green/10 text-vexo-green",
  Completed: "bg-vexo-green/10 text-vexo-green",
  Suspended: "bg-red-500/10 text-red-400",
  Failed: "bg-red-500/10 text-red-400",
  "Pending KYC": "bg-yellow-500/10 text-yellow-400",
  Pending: "bg-yellow-500/10 text-yellow-400",
};

export default function StatusBadge({ status }) {
  return (
    <span className={\`text-xs font-semibold px-2.5 py-1 rounded-full \${styles[status] || "bg-vexo-card2 text-vexo-muted"}\`}>
      {status}
    </span>
  );
}
`,

  "app/components/UserAvatar.js": `const colors = ["#F5590E", "#22C55E", "#8247E5", "#3B82F6", "#EAB308", "#EC4899"];

function hashName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
}

export default function UserAvatar({ name, size = 40 }) {
  const initial = name?.charAt(0)?.toUpperCase() || "?";
  const color = colors[hashName(name || "") % colors.length];

  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white shrink-0"
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.4 }}
    >
      {initial}
    </div>
  );
}
`,

  "app/admin/login/page.js": `"use client";
import { useState } from "react";
import { IconEye, IconEyeOff, IconShieldLock } from "@tabler/icons-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-vexo-orange flex items-center justify-center text-white font-bold text-lg">V</div>
          <p className="text-xl font-extrabold">Vexo</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <IconShieldLock size={16} className="text-vexo-orange" />
          <p className="text-vexo-orange text-xs font-semibold uppercase tracking-wide">Admin Portal</p>
        </div>
        <h1 className="text-2xl font-extrabold text-center">Admin Sign In</h1>
        <p className="text-vexo-muted text-sm text-center mt-2">Authorized personnel only</p>

        <form className="flex flex-col gap-5 mt-8">
          <div>
            <label className="text-sm font-semibold">Admin email</label>
            <input
              type="email"
              placeholder="admin@vexo.com"
              className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-vexo-orange"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-vexo-muted"
              >
                {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold">
            Sign In to Admin
          </button>
        </form>

        <p className="text-vexo-muted text-xs text-center mt-6">
          This portal is restricted to Vexo staff. Unauthorized access attempts are logged.
        </p>
      </div>
    </main>
  );
}
`,

  "app/admin/page.js": `import { IconUsers, IconChartBar, IconWallet, IconClockHour4, IconShieldLock } from "@tabler/icons-react";
import UserAvatar from "../components/UserAvatar";
import StatusBadge from "../components/StatusBadge";
import AdminBottomNav from "../components/AdminBottomNav";

const stats = [
  { icon: IconUsers, iconColor: "#3B82F6", label: "Total Users", value: "248,391", change: "+1.4%", up: true },
  { icon: IconChartBar, iconColor: "#22C55E", label: "24h Volume", value: "$18.2M", change: "+6.2%", up: true },
  { icon: IconWallet, iconColor: "#F5590E", label: "Active Wallets", value: "94,120", change: "+0.8%", up: true },
  { icon: IconClockHour4, iconColor: "#EAB308", label: "Pending KYC", value: "412", change: "-3.1%", up: false },
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
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <IconShieldLock size={14} className="text-vexo-orange" />
            <p className="text-vexo-orange text-xs font-semibold uppercase tracking-wide">Admin</p>
          </div>
          <p className="text-3xl font-bold mt-1">Overview</p>
        </div>
        <UserAvatar name="Admin" size={40} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: \`\${s.iconColor}1A\`, color: s.iconColor }}>
              <s.icon size={18} />
            </div>
            <p className="font-bold text-lg leading-tight">{s.value}</p>
            <p className="text-vexo-muted text-xs mt-1">{s.label}</p>
            <p className={\`text-xs mt-1 font-semibold \${s.up ? "text-vexo-green" : "text-red-400"}\`}>{s.change}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Recent Transactions</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {recentTx.map((tx, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
              <div className="flex items-center gap-3">
                <UserAvatar name={tx.user} size={36} />
                <div>
                  <p className="font-semibold text-sm">{tx.user}</p>
                  <p className="text-vexo-muted text-xs">{tx.type}</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <p className="font-semibold text-sm">{tx.amount}</p>
                <StatusBadge status={tx.status} />
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
import UserAvatar from "../../components/UserAvatar";
import StatusBadge from "../../components/StatusBadge";
import AdminBottomNav from "../../components/AdminBottomNav";

const filterTabs = ["All", "Active", "Suspended", "Pending KYC"];

const users = [
  { name: "Norman Osborn", email: "n.osborn@shakuro.com", balance: "$5,271.39", status: "Active", joined: "Jan 2025" },
  { name: "Priya Nair", email: "priya.n@example.com", balance: "$12,940.10", status: "Active", joined: "Mar 2025" },
  { name: "Marcus Ade", email: "marcus.ade@example.com", balance: "$820.00", status: "Suspended", joined: "Jun 2025" },
  { name: "Sarah Chen", email: "sarah.chen@example.com", balance: "$34,102.55", status: "Active", joined: "Feb 2025" },
  { name: "David Kim", email: "d.kim@example.com", balance: "$0.00", status: "Pending KYC", joined: "Sep 2026" },
];

export default function AdminUsers() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");

  const filtered = users.filter((u) => {
    const matchesQuery = u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase());
    const matchesTab = tab === "All" || u.status === tab;
    return matchesQuery && matchesTab;
  });

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <div>
        <p className="text-vexo-orange text-xs font-semibold uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">Users</p>
        <p className="text-vexo-muted text-sm mt-1">{users.length} total users</p>
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

      <div className="flex gap-2 overflow-x-auto">
        {filterTabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={\`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap \${
              tab === t ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
            }\`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {filtered.map((u) => (
          <div key={u.email} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
            <div className="flex items-center gap-3">
              <UserAvatar name={u.name} size={40} />
              <div>
                <p className="font-semibold text-sm">{u.name}</p>
                <p className="text-vexo-muted text-xs">{u.email}</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <p className="font-semibold text-sm">{u.balance}</p>
              <StatusBadge status={u.status} />
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
import { IconArrowDown, IconArrowUp, IconArrowsExchange } from "@tabler/icons-react";
import UserAvatar from "../../components/UserAvatar";
import StatusBadge from "../../components/StatusBadge";
import AdminBottomNav from "../../components/AdminBottomNav";

const tabs = ["All", "Deposits", "Withdrawals", "Swaps"];

const typeIcons = {
  Deposit: { icon: IconArrowDown, color: "#22C55E" },
  Withdraw: { icon: IconArrowUp, color: "#EF4444" },
  Swap: { icon: IconArrowsExchange, color: "#F5590E" },
};

const transactions = [
  { user: "Norman Osborn", type: "Deposit", amount: "+$5,200.00", status: "Completed", date: "Sep 17" },
  { user: "Priya Nair", type: "Withdraw", amount: "-$1,050.00", status: "Completed", date: "Sep 17" },
  { user: "Marcus Ade", type: "Swap", amount: "BTC → ETH", status: "Pending", date: "Sep 16" },
  { user: "Sarah Chen", type: "Deposit", amount: "+$800.00", status: "Completed", date: "Sep 16" },
  { user: "David Kim", type: "Withdraw", amount: "-$120.00", status: "Failed", date: "Sep 15" },
  { user: "Priya Nair", type: "Swap", amount: "ETH → USDT", status: "Completed", date: "Sep 15" },
];

const typeMap = { Deposits: "Deposit", Withdrawals: "Withdraw", Swaps: "Swap" };

export default function AdminTransactions() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? transactions : transactions.filter((t) => t.type === typeMap[active]);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <div>
        <p className="text-vexo-orange text-xs font-semibold uppercase tracking-wide">Admin</p>
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
        {filtered.map((tx, i) => {
          const meta = typeIcons[tx.type];
          return (
            <div key={i} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: \`\${meta.color}1A\`, color: meta.color }}>
                  <meta.icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{tx.user}</p>
                  <p className="text-vexo-muted text-xs">{tx.type} · {tx.date}</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <p className="font-semibold text-sm">{tx.amount}</p>
                <StatusBadge status={tx.status} />
              </div>
            </div>
          );
        })}
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
import { IconAlertTriangle, IconShieldCheck, IconUserPlus, IconReceipt2 } from "@tabler/icons-react";
import UserAvatar from "../../components/UserAvatar";
import AdminBottomNav from "../../components/AdminBottomNav";

const initialToggles = [
  { key: "maintenance", label: "Maintenance Mode", desc: "Temporarily disable trading platform-wide.", icon: IconAlertTriangle, iconColor: "#EF4444", on: false },
  { key: "kyc", label: "Require KYC for Withdrawals", desc: "Users must verify identity before withdrawing.", icon: IconShieldCheck, iconColor: "#22C55E", on: true },
  { key: "newSignups", label: "Allow New Signups", desc: "Turn off to pause new account creation.", icon: IconUserPlus, iconColor: "#3B82F6", on: true },
  { key: "swapFees", label: "Charge Swap Fees", desc: "Apply the standard 0.1% fee to all swaps.", icon: IconReceipt2, iconColor: "#F5590E", on: true },
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
        <p className="text-vexo-orange text-xs font-semibold uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">Platform Settings</p>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex items-center gap-3">
        <UserAvatar name="Admin User" size={44} />
        <div>
          <p className="font-semibold text-sm">Admin User</p>
          <p className="text-vexo-muted text-xs">admin@vexo.com · Super Admin</p>
        </div>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {toggles.map((t) => (
          <div key={t.key} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: \`\${t.iconColor}1A\`, color: t.iconColor }}>
                <t.icon size={16} />
              </div>
              <div>
                <p className="font-semibold text-sm">{t.label}</p>
                <p className="text-vexo-muted text-xs mt-0.5">{t.desc}</p>
              </div>
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

console.log("\nDone! Admin login page added, and Overview/Users/Transactions/Settings polished with avatars, colored icons, and status badges.");
