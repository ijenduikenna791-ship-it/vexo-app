"use client";
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
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              tab === t ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
            }`}
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
