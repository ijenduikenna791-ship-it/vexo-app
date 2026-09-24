const fs = require("fs");
const path = require("path");

// 1. New circular "balance ring" component, inspired by the reference screenshot.
const ringPath = path.join(__dirname, "app/components/admin/BalanceRing.js");
fs.mkdirSync(path.dirname(ringPath), { recursive: true });
fs.writeFileSync(ringPath, `"use client";

const statusColors = {
  Active: "#22c55e",
  Suspended: "#ef4444",
  Verified: "#22c55e",
  Pending: "#eab308",
};

export default function BalanceRing({ amount, label = "Balance", status = "Active" }) {
  const color = statusColors[status] || "#22c55e";
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative w-44 h-44">
        <svg className="w-44 h-44 -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.12}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-vexo-muted text-xs">{label}</p>
          <p className="text-2xl font-bold mt-1">\${amount.toLocaleString()}</p>
        </div>
      </div>
      <div
        className="flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-semibold"
        style={{ backgroundColor: \`\${color}22\`, color }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        {status}
      </div>
    </div>
  );
}
`, "utf8");
console.log("Created: app/components/admin/BalanceRing.js");

// 2. Redesign the Admin Overview page with a hero balance section + quick actions,
//    matching the reference layout (big number up top, action buttons, list below).
const overviewPath = path.join(__dirname, "app/admin/page.js");
fs.mkdirSync(path.dirname(overviewPath), { recursive: true });
fs.writeFileSync(overviewPath, `"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconEye, IconEyeOff, IconUsers, IconArrowsExchange, IconSettings,
  IconArrowUpRight, IconArrowDownLeft, IconClockHour4,
} from "@tabler/icons-react";
import { mockUsers } from "../lib/mockUsers";
import UserAvatar from "../components/UserAvatar";
import StatusBadge from "../components/StatusBadge";

export default function AdminOverview() {
  const [hidden, setHidden] = useState(false);

  const totalPlatformBalance = mockUsers.reduce((sum, u) => sum + u.balance, 0);
  const activeUsers = mockUsers.filter((u) => u.status === "Active").length;
  const suspendedUsers = mockUsers.filter((u) => u.status === "Suspended").length;
  const pendingKyc = mockUsers.filter((u) => u.verification === "Pending").length;

  const recentUsers = [...mockUsers]
    .sort((a, b) => new Date(b.joined) - new Date(a.joined))
    .slice(0, 5);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-sm">Good evening,</p>
        <p className="text-xl font-bold">Admin</p>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <p className="text-vexo-muted text-sm">Total platform balance</p>
          <button onClick={() => setHidden((h) => !h)} className="text-vexo-muted">
            {hidden ? <IconEyeOff size={16} /> : <IconEye size={16} />}
          </button>
        </div>
        <p className="text-4xl font-extrabold mt-2">
          {hidden ? "••••••••" : \`$\${totalPlatformBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}\`}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Link href="/admin/users" className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconUsers size={22} className="text-vexo-orange" />
          </div>
          <span className="text-xs text-vexo-muted">Users</span>
        </Link>
        <Link href="/admin/transactions" className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconArrowsExchange size={22} className="text-vexo-orange" />
          </div>
          <span className="text-xs text-vexo-muted">Transactions</span>
        </Link>
        <Link href="/admin/settings" className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconSettings size={22} className="text-vexo-orange" />
          </div>
          <span className="text-xs text-vexo-muted">Settings</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Total users</p>
          <p className="font-bold text-lg mt-1">{mockUsers.length}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Active</p>
          <p className="font-bold text-lg mt-1 text-vexo-green">{activeUsers}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Suspended</p>
          <p className="font-bold text-lg mt-1 text-red-400">{suspendedUsers}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">Pending KYC</p>
          <p className="font-bold text-lg mt-1 text-yellow-400">{pendingKyc}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-sm">Recently joined</p>
          <Link href="/admin/users" className="text-vexo-orange text-xs font-semibold">See all</Link>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {recentUsers.map((u) => (
            <Link
              key={u.id}
              href={\`/admin/users/\${u.id}\`}
              className="flex items-center justify-between py-3 border-b border-vexo-border last:border-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <UserAvatar name={u.name} size={36} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{u.name}</p>
                  <p className="text-vexo-muted text-xs truncate">{u.joined}</p>
                </div>
              </div>
              <StatusBadge status={u.status} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
`, "utf8");
console.log("Created: app/admin/page.js");

// 3. Insert the BalanceRing into the User Profile Overview tab (targeted edit,
//    everything else in that file is left exactly as-is).
const detailPath = path.join(__dirname, "app/admin/users/[id]/page.js");
if (fs.existsSync(detailPath)) {
  let content = fs.readFileSync(detailPath, "utf8");

  if (!content.includes("BalanceRing")) {
    content = content.replace(
      'import BackendNotice from "../../../components/admin/BackendNotice";',
      'import BackendNotice from "../../../components/admin/BackendNotice";\nimport BalanceRing from "../../../components/admin/BalanceRing";'
    );

    content = content.replace(
      '      {activeTab === "Overview" && (\n        <div className="flex flex-col gap-3">\n          <div className="grid grid-cols-2 gap-3">',
      '      {activeTab === "Overview" && (\n        <div className="flex flex-col gap-3">\n          <div className="bg-vexo-card border border-vexo-border rounded-2xl">\n            <BalanceRing amount={user.balance} label="Balance" status={user.status} />\n          </div>\n          <div className="grid grid-cols-2 gap-3">'
    );

    fs.writeFileSync(detailPath, content, "utf8");
    console.log("Updated: app/admin/users/[id]/page.js (added BalanceRing to Overview tab)");
  } else {
    console.log("Already has BalanceRing, skipped: app/admin/users/[id]/page.js");
  }
} else {
  console.log("Not found, skipped: app/admin/users/[id]/page.js");
}

console.log("\\nDone!");
