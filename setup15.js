const fs = require("fs");
const path = require("path");

const files = {
  "app/lib/mockUsers.js": `export const mockUsers = [
  {
    id: "USR-1001",
    username: "n.osborn",
    name: "Norman Osborn",
    email: "n.osborn@shakuro.com",
    phone: "+1 555 123 4567",
    country: "United States",
    status: "Active",
    verification: "Verified",
    joined: "2025-01-14",
    lastLogin: "2026-09-20",
    balance: 34830.59,
    wallets: 3,
    transactionsCount: 42,
  },
  {
    id: "USR-1002",
    username: "priya.n",
    name: "Priya Nair",
    email: "priya.n@example.com",
    phone: "+91 98765 43210",
    country: "India",
    status: "Active",
    verification: "Verified",
    joined: "2025-03-02",
    lastLogin: "2026-09-19",
    balance: 12940.10,
    wallets: 2,
    transactionsCount: 27,
  },
  {
    id: "USR-1003",
    username: "marcus.a",
    name: "Marcus Ade",
    email: "marcus.ade@example.com",
    phone: "+234 803 123 4567",
    country: "Nigeria",
    status: "Suspended",
    verification: "Verified",
    joined: "2025-06-18",
    lastLogin: "2026-08-30",
    balance: 820.00,
    wallets: 1,
    transactionsCount: 9,
  },
  {
    id: "USR-1004",
    username: "sarah.chen",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    phone: "+1 555 987 6543",
    country: "Canada",
    status: "Active",
    verification: "Verified",
    joined: "2025-02-21",
    lastLogin: "2026-09-21",
    balance: 34102.55,
    wallets: 4,
    transactionsCount: 61,
  },
  {
    id: "USR-1005",
    username: "d.kim",
    name: "David Kim",
    email: "d.kim@example.com",
    phone: "+82 10 1234 5678",
    country: "South Korea",
    status: "Active",
    verification: "Pending",
    joined: "2026-09-10",
    lastLogin: "2026-09-22",
    balance: 0.00,
    wallets: 1,
    transactionsCount: 0,
  },
  {
    id: "USR-1006",
    username: "amara.o",
    name: "Amara Okafor",
    email: "amara.okafor@example.com",
    phone: "+234 802 456 7890",
    country: "Nigeria",
    status: "Active",
    verification: "Verified",
    joined: "2025-11-05",
    lastLogin: "2026-09-18",
    balance: 5620.00,
    wallets: 2,
    transactionsCount: 15,
  },
  {
    id: "USR-1007",
    username: "lucas.f",
    name: "Lucas Ferreira",
    email: "lucas.ferreira@example.com",
    phone: "+55 11 91234 5678",
    country: "Brazil",
    status: "Active",
    verification: "Verified",
    joined: "2025-07-22",
    lastLogin: "2026-09-15",
    balance: 8900.42,
    wallets: 2,
    transactionsCount: 33,
  },
  {
    id: "USR-1008",
    username: "hana.s",
    name: "Hana Suzuki",
    email: "hana.suzuki@example.com",
    phone: "+81 90 1234 5678",
    country: "Japan",
    status: "Suspended",
    verification: "Verified",
    joined: "2025-05-11",
    lastLogin: "2026-07-02",
    balance: 210.00,
    wallets: 1,
    transactionsCount: 4,
  },
  {
    id: "USR-1009",
    username: "eli.t",
    name: "Eli Turner",
    email: "eli.turner@example.com",
    phone: "+44 7911 123456",
    country: "United Kingdom",
    status: "Active",
    verification: "Pending",
    joined: "2026-08-30",
    lastLogin: "2026-09-22",
    balance: 150.00,
    wallets: 1,
    transactionsCount: 1,
  },
  {
    id: "USR-1010",
    username: "zara.k",
    name: "Zara Khan",
    email: "zara.khan@example.com",
    phone: "+92 300 1234567",
    country: "Pakistan",
    status: "Active",
    verification: "Verified",
    joined: "2025-09-19",
    lastLogin: "2026-09-21",
    balance: 21430.80,
    wallets: 3,
    transactionsCount: 48,
  },
  {
    id: "USR-1011",
    username: "tom.wilson",
    name: "Tom Wilson",
    email: "tom.wilson@example.com",
    phone: "+61 412 345 678",
    country: "Australia",
    status: "Active",
    verification: "Verified",
    joined: "2025-04-08",
    lastLogin: "2026-09-14",
    balance: 3200.00,
    wallets: 1,
    transactionsCount: 12,
  },
  {
    id: "USR-1012",
    username: "mei.lin",
    name: "Mei Lin",
    email: "mei.lin@example.com",
    phone: "+65 8123 4567",
    country: "Singapore",
    status: "Active",
    verification: "Verified",
    joined: "2025-10-02",
    lastLogin: "2026-09-22",
    balance: 68420.15,
    wallets: 5,
    transactionsCount: 89,
  },
];

export const mockWalletsByUser = {
  "USR-1001": [
    { asset: "Bitcoin", symbol: "BTC", address: "bc1q...a92f", balance: 0.412, status: "Active", created: "2025-01-14" },
    { asset: "Ethereum", symbol: "ETH", address: "0x71...C3d4", balance: 1.85, status: "Active", created: "2025-01-14" },
    { asset: "Polygon", symbol: "MATIC", address: "0x9a...11b2", balance: 1240, status: "Active", created: "2025-02-01" },
  ],
};

export const mockTransactionsByUser = {
  "USR-1001": [
    { id: "TXN-88213", type: "Deposit", asset: "BTC", amount: 0.05, status: "Completed", date: "2026-09-17" },
    { id: "TXN-88190", type: "Withdrawal", asset: "USDT", amount: 500, status: "Completed", date: "2026-09-10" },
    { id: "TXN-88144", type: "Swap", asset: "BTC → ETH", amount: 0.01, status: "Completed", date: "2026-08-29" },
    { id: "TXN-88099", type: "Deposit", asset: "ETH", amount: 0.3, status: "Pending", date: "2026-08-20" },
  ],
};

export const mockDepositsByUser = {
  "USR-1001": [
    { id: "DEP-4021", asset: "BTC", network: "Bitcoin", amount: 0.05, address: "bc1q...a92f", txHash: "3a9f...c821", status: "Confirmed", date: "2026-09-17" },
    { id: "DEP-3988", asset: "ETH", network: "Ethereum", amount: 0.3, address: "0x71...C3d4", txHash: "8b21...f019", status: "Pending", date: "2026-08-20" },
  ],
};

export const mockWithdrawalsByUser = {
  "USR-1001": [
    { id: "WD-2210", asset: "USDT", network: "TRC20", amount: 500, fee: 1.5, net: 498.5, destination: "T9xR...88Kd", status: "Completed", date: "2026-09-10" },
  ],
};

export const mockBillingByUser = {
  "USR-1001": [
    { id: "BILL-551", amount: 25, currency: "USD", description: "Account maintenance fee", status: "Paid", created: "2026-06-01", due: "2026-06-15", paymentDate: "2026-06-10" },
  ],
};

export const mockActivityByUser = {
  "USR-1001": [
    { action: "Logged in", device: "Chrome on Windows", date: "2026-09-20 14:22" },
    { action: "Changed password", device: "Chrome on Windows", date: "2026-08-11 09:03" },
    { action: "Logged in", device: "Safari on iPhone", date: "2026-08-01 18:47" },
  ],
};
`,

  "app/components/admin/UserTableRow.js": `import Link from "next/link";
import UserAvatar from "../UserAvatar";
import StatusBadge from "../StatusBadge";

export default function UserTableRow({ user }) {
  return (
    <Link
      href={\`/admin/users/\${user.id}\`}
      className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none transition-colors duration-150 hover:bg-vexo-card2/40 -mx-2 px-2 rounded-lg"
    >
      <div className="flex items-center gap-3 min-w-0">
        <UserAvatar name={user.name} size={40} />
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{user.name}</p>
          <p className="text-vexo-muted text-xs truncate">{user.email}</p>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-1 shrink-0">
        <p className="font-semibold text-sm">\${user.balance.toLocaleString()}</p>
        <StatusBadge status={user.status} />
      </div>
    </Link>
  );
}
`,

  "app/components/admin/BackendNotice.js": `"use client";
import { useState } from "react";
import { IconPlugConnected } from "@tabler/icons-react";

export default function BackendNotice({ message }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3 text-sm">
      <IconPlugConnected size={18} className="text-yellow-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-semibold text-yellow-400">Requires backend integration</p>
        <p className="text-vexo-muted text-xs mt-0.5">{message}</p>
      </div>
      <button onClick={() => setDismissed(true)} className="text-vexo-muted text-xs shrink-0">Dismiss</button>
    </div>
  );
}
`,

  "app/admin/users/page.js": `"use client";
import { useState, useMemo } from "react";
import { IconSearch, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { mockUsers } from "../../lib/mockUsers";
import UserTableRow from "../../components/admin/UserTableRow";
import AdminBottomNav from "../../components/AdminBottomNav";

const filterTabs = ["All", "Active", "Suspended", "Pending"];
const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "balance-high", label: "Balance: High to Low" },
  { value: "balance-low", label: "Balance: Low to High" },
  { value: "name", label: "Name A-Z" },
];

const PAGE_SIZE = 6;

export default function AdminUsers() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

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
        <p className="text-3xl font-bold mt-1">Users</p>
        <p className="text-vexo-muted text-sm mt-1">{mockUsers.length} total users</p>
      </div>

      <div className="relative">
        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search by name, email, phone, or ID"
          className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2 overflow-x-auto">
          {filterTabs.map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setPage(1); }}
              className={\`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap \${
                tab === t ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
              }\`}
            >
              {t}
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
          <p className="text-vexo-muted text-xs">Page {page} of {totalPages}</p>
          <button
            onClick={() => changePage(1)}
            disabled={page === totalPages}
            className="flex items-center gap-1 text-sm font-semibold text-vexo-muted disabled:opacity-30"
          >
            Next <IconChevronRight size={16} />
          </button>
        </div>
      )}

      <AdminBottomNav />
    </main>
  );
}
`,

  "app/admin/users/[id]/page.js": `"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  IconArrowLeft, IconBan, IconCircleCheck, IconShieldCheck, IconCoinBitcoin,
  IconArrowUpRight, IconArrowDownLeft, IconReceipt2, IconHistory, IconLock,
} from "@tabler/icons-react";
import {
  mockUsers, mockWalletsByUser, mockTransactionsByUser,
  mockDepositsByUser, mockWithdrawalsByUser, mockBillingByUser, mockActivityByUser,
} from "../../../lib/mockUsers";
import UserAvatar from "../../../components/UserAvatar";
import StatusBadge from "../../../components/StatusBadge";
import BackendNotice from "../../../components/admin/BackendNotice";
import AdminBottomNav from "../../../components/AdminBottomNav";

const tabs = ["Overview", "Personal", "Wallets", "Transactions", "Deposits", "Withdrawals", "Billing", "Activity", "Security"];

export default function UserDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [showTopUp, setShowTopUp] = useState(false);

  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-4">
        <button onClick={() => router.push("/admin/users")} className="flex items-center gap-1 text-sm text-vexo-muted">
          <IconArrowLeft size={16} /> Back to Users
        </button>
        <p className="text-vexo-muted text-sm text-center py-10">User not found.</p>
        <AdminBottomNav />
      </main>
    );
  }

  const wallets = mockWalletsByUser[user.id] || [];
  const transactions = mockTransactionsByUser[user.id] || [];
  const deposits = mockDepositsByUser[user.id] || [];
  const withdrawals = mockWithdrawalsByUser[user.id] || [];
  const billing = mockBillingByUser[user.id] || [];
  const activity = mockActivityByUser[user.id] || [];

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.push("/admin/users")} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back to Users
      </button>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex items-center gap-4">
        <UserAvatar name={user.name} size={56} />
        <div className="min-w-0 flex-1">
          <p className="font-bold">{user.name}</p>
          <p className="text-vexo-muted text-xs truncate">{user.email}</p>
          <div className="flex gap-2 mt-2">
            <StatusBadge status={user.status} />
            <StatusBadge status={user.verification} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setShowTopUp(true)}
          className="flex items-center justify-center gap-2 bg-vexo-orange text-white rounded-xl py-2.5 text-sm font-semibold"
        >
          <IconCoinBitcoin size={16} /> Top Up
        </button>
        <button className="flex items-center justify-center gap-2 bg-vexo-card2 border border-vexo-border rounded-xl py-2.5 text-sm font-semibold">
          {user.status === "Active" ? <IconBan size={16} /> : <IconCircleCheck size={16} />}
          {user.status === "Active" ? "Suspend" : "Activate"}
        </button>
      </div>

      {showTopUp && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex flex-col gap-3">
          <p className="font-semibold text-sm">Top Up Balance</p>
          <BackendNotice message="Balance top-ups must be processed through a real backend with a ledger record, audit log entry, and admin authorization check. This form is UI-only until that's connected." />
          <div>
            <label className="text-xs text-vexo-muted">Amount (USD equivalent)</label>
            <input type="number" placeholder="0.00" className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange" />
          </div>
          <div>
            <label className="text-xs text-vexo-muted">Reason / note</label>
            <input type="text" placeholder="e.g. manual reconciliation" className="w-full mt-1 bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2 text-sm outline-none focus:border-vexo-orange" />
          </div>
          <div className="flex gap-2 mt-1">
            <button onClick={() => setShowTopUp(false)} className="flex-1 py-2 rounded-lg border border-vexo-border text-sm font-semibold">Cancel</button>
            <button disabled className="flex-1 py-2 rounded-lg bg-vexo-orange/40 text-white/60 text-sm font-semibold cursor-not-allowed">Confirm (backend required)</button>
          </div>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={\`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap \${
              activeTab === t ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
            }\`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
              <p className="text-vexo-muted text-xs">Balance</p>
              <p className="font-bold text-lg mt-1">\${user.balance.toLocaleString()}</p>
            </div>
            <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
              <p className="text-vexo-muted text-xs">Wallets</p>
              <p className="font-bold text-lg mt-1">{user.wallets}</p>
            </div>
            <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
              <p className="text-vexo-muted text-xs">Transactions</p>
              <p className="font-bold text-lg mt-1">{user.transactionsCount}</p>
            </div>
            <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
              <p className="text-vexo-muted text-xs">Joined</p>
              <p className="font-bold text-sm mt-1">{user.joined}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Personal" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4 py-2">
          {[
            ["User ID", user.id],
            ["Username", user.username],
            ["Full name", user.name],
            ["Email", user.email],
            ["Phone", user.phone],
            ["Country", user.country],
            ["Registered", user.joined],
            ["Last login", user.lastLogin],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-3 border-b border-vexo-border last:border-none text-sm">
              <span className="text-vexo-muted">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Wallets" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {wallets.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No wallet data available.</p>}
          {wallets.map((w, i) => (
            <div key={i} className="py-3 border-b border-vexo-border last:border-none">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{w.asset} ({w.symbol})</span>
                <StatusBadge status={w.status} />
              </div>
              <p className="text-vexo-muted text-xs mt-1">{w.address}</p>
              <p className="text-sm font-semibold mt-1">{w.balance} {w.symbol}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Transactions" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {transactions.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No transactions found.</p>}
          {transactions.map((t) => (
            <div key={t.id} className="flex justify-between items-center py-3 border-b border-vexo-border last:border-none">
              <div className="flex items-center gap-2">
                <IconReceipt2 size={16} className="text-vexo-muted" />
                <div>
                  <p className="text-sm font-semibold">{t.type} · {t.asset}</p>
                  <p className="text-vexo-muted text-xs">{t.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{t.amount}</p>
                <StatusBadge status={t.status} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Deposits" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {deposits.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No deposits found.</p>}
          {deposits.map((d) => (
            <div key={d.id} className="py-3 border-b border-vexo-border last:border-none">
              <div className="flex justify-between text-sm">
                <span className="font-semibold flex items-center gap-1"><IconArrowDownLeft size={14} /> {d.asset} · {d.network}</span>
                <StatusBadge status={d.status} />
              </div>
              <p className="text-vexo-muted text-xs mt-1">Hash: {d.txHash}</p>
              <p className="text-sm font-semibold mt-1">{d.amount} {d.asset} — {d.date}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Withdrawals" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {withdrawals.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No withdrawals found.</p>}
          {withdrawals.map((w) => (
            <div key={w.id} className="py-3 border-b border-vexo-border last:border-none">
              <div className="flex justify-between text-sm">
                <span className="font-semibold flex items-center gap-1"><IconArrowUpRight size={14} /> {w.asset} · {w.network}</span>
                <StatusBadge status={w.status} />
              </div>
              <p className="text-vexo-muted text-xs mt-1">To: {w.destination}</p>
              <p className="text-sm font-semibold mt-1">Net: {w.net} {w.asset} (fee {w.fee}) — {w.date}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Billing" && (
        <div className="flex flex-col gap-3">
          <BackendNotice message="Creating a new billing requirement must write to a real billing/ledger system with due dates and payment status tracked server-side." />
          <button disabled className="py-2.5 rounded-xl bg-vexo-orange/40 text-white/60 text-sm font-semibold cursor-not-allowed">
            + Create Billing (backend required)
          </button>
          <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
            {billing.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No billing records.</p>}
            {billing.map((b) => (
              <div key={b.id} className="py-3 border-b border-vexo-border last:border-none">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{b.description}</span>
                  <StatusBadge status={b.status} />
                </div>
                <p className="text-vexo-muted text-xs mt-1">Due {b.due} · {b.currency} {b.amount}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Activity" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {activity.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No activity recorded.</p>}
          {activity.map((a, i) => (
            <div key={i} className="flex items-center gap-2 py-3 border-b border-vexo-border last:border-none">
              <IconHistory size={16} className="text-vexo-muted" />
              <div>
                <p className="text-sm font-semibold">{a.action}</p>
                <p className="text-vexo-muted text-xs">{a.device} · {a.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Security" && (
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm">
            <IconShieldCheck size={16} className="text-vexo-muted" />
            <span>KYC status: <strong>{user.verification}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <IconLock size={16} className="text-vexo-muted" />
            <span>Password resets and 2FA state are never shown to admins for security reasons.</span>
          </div>
        </div>
      )}

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

console.log("\nDone! Admin Users page now has real search/filter/sort/pagination over 12 mock users, and clicking a user opens a full profile with 9 tabs (Overview, Personal, Wallets, Transactions, Deposits, Withdrawals, Billing, Activity, Security). Financial action buttons (Top Up, Create Billing) show a clear backend-required notice instead of faking a result.");
