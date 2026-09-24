const fs = require("fs");
const path = require("path");

const overviewPath = path.join(__dirname, "app/admin/page.js");
fs.mkdirSync(path.dirname(overviewPath), { recursive: true });
fs.writeFileSync(overviewPath, `"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconEye, IconEyeOff, IconUsers, IconArrowsExchange, IconSettings,
} from "@tabler/icons-react";
import { mockUsers } from "../lib/mockUsers";
import UserAvatar from "../components/UserAvatar";
import StatusBadge from "../components/StatusBadge";
import BalanceRing from "../components/admin/BalanceRing";

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

      <div className="flex justify-center">
        <BalanceRing
          amount={totalPlatformBalance}
          label="Total platform balance"
          status="Live"
          size={220}
          hidden={hidden}
        />
      </div>

      <div className="flex justify-center -mt-2">
        <button
          onClick={() => setHidden((h) => !h)}
          className="flex items-center gap-1.5 text-vexo-muted text-xs font-semibold"
        >
          {hidden ? <IconEyeOff size={14} /> : <IconEye size={14} />}
          {hidden ? "Show balance" : "Hide balance"}
        </button>
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

console.log("Created: app/admin/page.js (balance now inside the ring)");
