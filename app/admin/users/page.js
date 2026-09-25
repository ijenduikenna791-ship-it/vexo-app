"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
import AdminBottomNav from "../../components/AdminBottomNav";
import UserAvatar from "../../components/UserAvatar";
import { supabase } from "../../lib/supabaseClient";

const statusColor = {
  Active: "text-vexo-green",
  Suspended: "text-red-400",
  "Pending KYC": "text-yellow-400",
};

const filterTabs = ["All", "Active", "Suspended", "Pending KYC"];

export default function AdminUsers() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: profileRows } = await supabase.from("profiles").select("*");
      const { data: walletRows } = await supabase.from("wallets").select("user_id, amount");

      const balanceByUser = {};
      (walletRows || []).forEach((w) => {
        balanceByUser[w.user_id] = (balanceByUser[w.user_id] || 0) + Number(w.amount || 0);
      });

      const mapped = (profileRows || []).map((p) => ({
        id: p.id,
        name: p.username || p.email || "Unnamed user",
        email: p.email || "-",
        phone: p.phone || "-",
        balance: balanceByUser[p.id] || 0,
        status: p.status === "suspended" ? "Suspended" : p.kyc_status === "submitted" ? "Pending KYC" : "Active",
        joined: p.created_at ? new Date(p.created_at).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "-",
      }));

      setUsers(mapped);
      setLoading(false);
    }
    loadData();
  }, []);

  const filtered = users.filter((u) => {
    const matchesQuery =
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === "All" || u.status === activeFilter;
    return matchesQuery && matchesFilter;
  });

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

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filterTabs.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
              activeFilter === f ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {loading && <p className="text-vexo-muted text-sm text-center py-10">Loading...</p>}
        {!loading && filtered.map((u) => (
          <Link key={u.id} href={`/admin/users/${u.id}`} className="flex items-center justify-between gap-2 py-4 border-b border-vexo-border last:border-none">
            <div className="flex items-center gap-3 min-w-0">
              <UserAvatar name={u.name} size={36} />
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{u.name}</p>
                <p className="text-vexo-muted text-xs truncate">{u.email}</p>
                <p className="text-vexo-muted text-xs truncate">{u.phone}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-semibold text-sm">${u.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className={`text-xs ${statusColor[u.status]}`}>{u.status}</p>
            </div>
          </Link>
        ))}
        {!loading && filtered.length === 0 && (
          <p className="text-vexo-muted text-sm text-center py-6">No users found.</p>
        )}
      </div>

      <AdminBottomNav />
    </main>
  );
}
