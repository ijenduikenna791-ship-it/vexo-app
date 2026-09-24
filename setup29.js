const fs = require("fs");
const path = require("path");

// Fix app/admin/page.js — corrected backtick escaping
fs.writeFileSync(path.join(__dirname, "app/admin/page.js"), `"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconEye, IconEyeOff, IconUsers, IconArrowsExchange, IconSettings,
} from "@tabler/icons-react";
import { mockUsers } from "../lib/mockUsers";
import UserAvatar from "../components/UserAvatar";
import StatusBadge from "../components/StatusBadge";
import BalanceRing from "../components/admin/BalanceRing";
import { useLanguage } from "../lib/i18n";

export default function AdminOverview() {
  const [hidden, setHidden] = useState(false);
  const { t } = useLanguage();

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
        <p className="text-vexo-muted text-sm">{t("goodEvening")}</p>
        <p className="text-xl font-bold">Admin</p>
      </div>

      <div className="flex justify-center">
        <BalanceRing
          amount={totalPlatformBalance}
          label={t("totalPlatformBalance")}
          status={t("live")}
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
          {hidden ? t("showBalance") : t("hideBalance")}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Link href="/admin/users" className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconUsers size={22} className="text-vexo-orange" />
          </div>
          <span className="text-xs text-vexo-muted">{t("users")}</span>
        </Link>
        <Link href="/admin/transactions" className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconArrowsExchange size={22} className="text-vexo-orange" />
          </div>
          <span className="text-xs text-vexo-muted">{t("transactions")}</span>
        </Link>
        <Link href="/admin/settings" className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconSettings size={22} className="text-vexo-orange" />
          </div>
          <span className="text-xs text-vexo-muted">{t("settings")}</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">{t("totalUsersLabel")}</p>
          <p className="font-bold text-lg mt-1">{mockUsers.length}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">{t("active")}</p>
          <p className="font-bold text-lg mt-1 text-vexo-green">{activeUsers}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">{t("suspended")}</p>
          <p className="font-bold text-lg mt-1 text-red-400">{suspendedUsers}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">{t("pendingKyc")}</p>
          <p className="font-bold text-lg mt-1 text-yellow-400">{pendingKyc}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-sm">{t("recentlyJoined")}</p>
          <Link href="/admin/users" className="text-vexo-orange text-xs font-semibold">{t("seeAll")}</Link>
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
console.log("Fixed: app/admin/page.js");

// Fix app/admin/users/page.js — corrected backtick escaping
fs.writeFileSync(path.join(__dirname, "app/admin/users/page.js"), `"use client";
import { useState, useMemo } from "react";
import { IconSearch, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { mockUsers } from "../../lib/mockUsers";
import UserTableRow from "../../components/admin/UserTableRow";
import { useLanguage } from "../../lib/i18n";

const PAGE_SIZE = 6;

export default function AdminUsers() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filterTabs = [
    { key: "All", label: t("all") },
    { key: "Active", label: t("active") },
    { key: "Suspended", label: t("suspended") },
    { key: "Pending", label: t("pending") },
  ];

  const sortOptions = [
    { value: "newest", label: t("sortNewest") },
    { value: "oldest", label: t("sortOldest") },
    { value: "balance-high", label: t("sortBalanceHigh") },
    { value: "balance-low", label: t("sortBalanceLow") },
    { value: "name", label: t("sortName") },
  ];

  const filtered = useMemo(() => {
    let result = mockUsers.filter((u) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q);

      const matchesTab =
        tab === "All" ||
        (tab === "Active" && u.status === "Active") ||
        (tab === "Suspended" && u.status === "Suspended") ||
        (tab === "Pending" && u.verification === "Pending");

      return matchesQuery && matchesTab;
    });

    result = [...result].sort((a, b) => {
      if (sort === "newest") return new Date(b.joined) - new Date(a.joined);
      if (sort === "oldest") return new Date(a.joined) - new Date(b.joined);
      if (sort === "balance-high") return b.balance - a.balance;
      if (sort === "balance-low") return a.balance - b.balance;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [query, tab, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changePage = (delta) => {
    setPage((p) => Math.min(totalPages, Math.max(1, p + delta)));
  };

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <div>
        <p className="text-vexo-orange text-xs font-semibold uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">{t("users")}</p>
        <p className="text-vexo-muted text-sm mt-1">{mockUsers.length} {t("totalUsersLabel").toLowerCase()}</p>
      </div>

      <div className="relative">
        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder={t("searchUsersPlaceholder")}
          className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2 overflow-x-auto">
          {filterTabs.map((ft) => (
            <button
              key={ft.key}
              onClick={() => { setTab(ft.key); setPage(1); }}
              className={\`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap \${
                tab === ft.key ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
              }\`}
            >
              {ft.label}
            </button>
          ))}
        </div>
      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full bg-vexo-card border border-vexo-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-vexo-orange appearance-none"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {paged.map((u) => (
          <UserTableRow key={u.id} user={u} />
        ))}
        {paged.length === 0 && (
          <p className="text-vexo-muted text-sm text-center py-6">No users found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => changePage(-1)}
            disabled={page === 1}
            className="flex items-center gap-1 text-sm font-semibold text-vexo-muted disabled:opacity-30"
          >
            <IconChevronLeft size={16} /> Prev
          </button>
          <p className="text-vexo-muted text-xs">{t("page")} {page} {t("of")} {totalPages}</p>
          <button
            onClick={() => changePage(1)}
            disabled={page === totalPages}
            className="flex items-center gap-1 text-sm font-semibold text-vexo-muted disabled:opacity-30"
          >
            Next <IconChevronRight size={16} />
          </button>
        </div>
      )}
    </main>
  );
}
`, "utf8");
console.log("Fixed: app/admin/users/page.js");

console.log("\\nDone! Both files rewritten with correct syntax.");
