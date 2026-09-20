const fs = require("fs");
const path = require("path");

const files = {
  "app/components/BottomNav.js": `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconChartBar, IconArrowsExchange, IconHistory, IconUser } from "@tabler/icons-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: IconHome },
  { href: "/dashboard/market", label: "Market", icon: IconChartBar },
  { href: "/dashboard/swap", label: "Swap", icon: IconArrowsExchange },
  { href: "/dashboard/history", label: "History", icon: IconHistory },
  { href: "/dashboard/profile", label: "Profile", icon: IconUser },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-vexo-card border-t border-vexo-border">
      <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={\`flex flex-col items-center gap-1 text-xs \${active ? "text-vexo-orange" : "text-vexo-muted"}\`}
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

  "app/components/AssetRow.js": `export default function AssetRow({ icon: Icon, iconColor, name, symbol, amount, value, changePercent }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-vexo-border last:border-none">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-vexo-card2 flex items-center justify-center" style={{ color: iconColor }}>
          <Icon size={18} />
        </div>
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-vexo-muted text-xs">{amount} {symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-sm">\${value}</p>
        {changePercent && <p className="text-vexo-green text-xs">+{changePercent}%</p>}
      </div>
    </div>
  );
}
`,

  "app/dashboard/page.js": `"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconBell, IconEye, IconEyeOff, IconSend2, IconArrowDown,
  IconArrowsExchange, IconCreditCard, IconCurrencyBitcoin,
  IconCurrencyEthereum, IconHexagon,
} from "@tabler/icons-react";
import Sparkline from "../components/Sparkline";
import AssetRow from "../components/AssetRow";
import BottomNav from "../components/BottomNav";

const assets = [
  { name: "Bitcoin", symbol: "BTC", icon: IconCurrencyBitcoin, iconColor: "#F7931A", amount: "0.412", value: "27,642.01", changePercent: "0.97" },
  { name: "Ethereum", symbol: "ETH", icon: IconCurrencyEthereum, iconColor: "#8A92B2", amount: "1.85", value: "6,556.18", changePercent: "1.87" },
  { name: "Polygon", symbol: "MATIC", icon: IconHexagon, iconColor: "#8247E5", amount: "1,240", value: "632.40", changePercent: "0.49" },
];

const recentActivity = [
  { label: "Deposit received", detail: "Sep 17", amount: "+$5,200.00" },
  { label: "Swap: BTC → ETH", detail: "Sep 16", amount: "" },
  { label: "Withdrawal", detail: "Sep 15", amount: "-$1,050.00" },
];

export default function Dashboard() {
  const [hidden, setHidden] = useState(false);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center font-bold">N</div>
          <div>
            <p className="text-vexo-muted text-xs">Good afternoon 👋</p>
            <p className="font-semibold text-sm">n.osborn@shakuro.com</p>
          </div>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
          <IconBell size={18} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-vexo-orange text-[10px] flex items-center justify-center text-white">2</span>
        </button>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">Total Portfolio Value</p>
          <button onClick={() => setHidden(!hidden)} className="text-vexo-muted">
            {hidden ? <IconEyeOff size={16} /> : <IconEye size={16} />}
          </button>
        </div>
        <p className="text-3xl font-bold mt-2">{hidden ? "••••••" : "$34,830.59"}</p>
        <p className="text-vexo-green text-sm mt-1">▲ +$2,979.23 (+130.62%) today</p>
        <div className="mt-4">
          <Sparkline data={[20, 24, 22, 28, 30, 29, 34, 38, 36, 42]} color="#F5590E" width={320} height={50} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: IconSend2, label: "Send" },
          { icon: IconArrowDown, label: "Receive" },
          { icon: IconArrowsExchange, label: "Swap" },
          { icon: IconCreditCard, label: "Card" },
        ].map((a) => (
          <button key={a.label} className="flex flex-col items-center gap-2 bg-vexo-card border border-vexo-border rounded-2xl py-4">
            <a.icon size={18} />
            <span className="text-xs font-semibold">{a.label}</span>
          </button>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">My Assets</p>
          <Link href="/dashboard/assets" className="text-vexo-orange text-xs font-semibold">View all</Link>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {assets.map((a) => (
            <AssetRow key={a.symbol} {...a} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">Recent Activity</p>
          <Link href="/dashboard/history" className="text-vexo-orange text-xs font-semibold">View all</Link>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-vexo-border last:border-none">
              <div>
                <p className="font-semibold text-sm">{a.label}</p>
                <p className="text-vexo-muted text-xs">{a.detail}</p>
              </div>
              {a.amount && <p className="font-semibold text-sm">{a.amount}</p>}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
`,

  "app/dashboard/assets/page.js": `import { IconCurrencyBitcoin, IconCurrencyEthereum, IconHexagon, IconCurrencyDollar, IconLink } from "@tabler/icons-react";
import AssetRow from "../../components/AssetRow";
import BottomNav from "../../components/BottomNav";

const assets = [
  { name: "Bitcoin", symbol: "BTC", icon: IconCurrencyBitcoin, iconColor: "#F7931A", amount: "0.412", value: "27,642.01", changePercent: "0.97" },
  { name: "Ethereum", symbol: "ETH", icon: IconCurrencyEthereum, iconColor: "#8A92B2", amount: "1.85", value: "6,556.18", changePercent: "1.87" },
  { name: "Polygon", symbol: "MATIC", icon: IconHexagon, iconColor: "#8247E5", amount: "1,240", value: "632.40", changePercent: "0.49" },
  { name: "Tether", symbol: "USDT", icon: IconCurrencyDollar, iconColor: "#26A17B", amount: "890", value: "890.00", changePercent: "0.01" },
  { name: "Chainlink", symbol: "LINK", icon: IconLink, iconColor: "#2A5ADA", amount: "64.2", value: "495.62", changePercent: null },
];

export default function Assets() {
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">My Assets</p>
        <p className="text-3xl font-bold mt-1">$36,216.21</p>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {assets.map((a) => (
          <AssetRow key={a.symbol} {...a} />
        ))}
      </div>

      <BottomNav />
    </main>
  );
}
`,

  "app/dashboard/market/page.js": `"use client";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import Sparkline from "../../components/Sparkline";
import BottomNav from "../../components/BottomNav";

const tabs = ["All", "Favorites", "Gainers", "Losers"];

const stats = [
  { label: "Mkt Cap", value: "$2.7T", up: true },
  { label: "24h Vol", value: "$142B", up: false },
  { label: "BTC Dom", value: "49.2%", up: true },
  { label: "Fear/Greed", value: "68 Greed", up: true },
];

const coins = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", price: "$67,842.5", change: "+2.34%", up: true, sparkline: [10, 12, 11, 14, 16, 15, 18] },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", price: "$3,542.8", change: "+1.87%", up: true, sparkline: [8, 9, 8, 10, 12, 11, 13] },
  { symbol: "SOL", name: "Solana", icon: "◎", price: "$182.4", change: "+4.21%", up: true, sparkline: [7, 9, 10, 9, 12, 14, 15] },
  { symbol: "XRP", name: "XRP", icon: "✕", price: "$0.6182", change: "-0.87%", up: false, sparkline: [12, 11, 12, 10, 9, 10, 8] },
  { symbol: "ADA", name: "Cardano", icon: "𝔸", price: "$0.4821", change: "-1.23%", up: false, sparkline: [10, 9, 9, 8, 7, 8, 6] },
  { symbol: "DOGE", name: "Dogecoin", icon: "Ð", price: "$0.1634", change: "+3.45%", up: true, sparkline: [6, 7, 8, 8, 10, 11, 13] },
];

export default function Market() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = coins.filter((c) => {
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase()) || c.symbol.toLowerCase().includes(query.toLowerCase());
    const matchesTab = active === "All" || (active === "Gainers" && c.up) || (active === "Losers" && !c.up) || active === "Favorites";
    return matchesQuery && matchesTab;
  });

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <p className="text-3xl font-bold">Market</p>

      <div className="relative">
        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search coins..."
          className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
        />
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

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-vexo-card border border-vexo-border rounded-xl p-3">
            <p className="text-vexo-muted text-xs">{s.label}</p>
            <p className={\`font-bold text-sm mt-1 \${s.up ? "text-vexo-green" : "text-red-400"}\`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {filtered.map((c) => (
          <div key={c.symbol} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-vexo-card2 flex items-center justify-center">{c.icon}</div>
              <div>
                <p className="font-semibold text-sm">{c.symbol}</p>
                <p className="text-vexo-muted text-xs">{c.name}</p>
              </div>
            </div>
            <Sparkline data={c.sparkline} color={c.up ? "#22c55e" : "#ef4444"} width={60} height={22} />
            <div className="text-right">
              <p className="font-semibold text-sm">{c.price}</p>
              <p className={\`text-xs \${c.up ? "text-vexo-green" : "text-red-400"}\`}>{c.change}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-vexo-muted text-sm text-center py-6">No coins found.</p>}
      </div>

      <BottomNav />
    </main>
  );
}
`,

  "app/dashboard/swap/page.js": `import Link from "next/link";
import { IconShieldCheck } from "@tabler/icons-react";
import BottomNav from "../../components/BottomNav";

export default function Swap() {
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-10 flex flex-col items-center">
      <div className="bg-vexo-card border border-vexo-border rounded-3xl p-8 text-center w-full">
        <div className="w-14 h-14 rounded-full bg-vexo-card2 flex items-center justify-center mx-auto mb-5">
          <IconShieldCheck size={28} className="text-vexo-orange" />
        </div>
        <h1 className="text-xl font-bold">Identity Verification Required</h1>
        <p className="text-vexo-muted text-sm mt-3">
          You must complete KYC verification before making any transactions on Vexo.
        </p>
        <Link href="/dashboard/profile" className="mt-6 inline-block w-full py-3 rounded-xl bg-vexo-orange text-white font-bold">
          Verify My Identity
        </Link>
        <p className="text-vexo-muted text-xs mt-4">
          KYC verification is required by law to prevent fraud and money laundering.
        </p>
      </div>

      <BottomNav />
    </main>
  );
}
`,

  "app/dashboard/history/page.js": `"use client";
import { useState } from "react";
import { IconSearch, IconRefresh, IconMailbox } from "@tabler/icons-react";
import BottomNav from "../../components/BottomNav";

const tabs = ["All", "Buy", "Sell", "Send", "Receive", "Swap"];

export default function History() {
  const [active, setActive] = useState("All");

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">History</p>
          <p className="text-vexo-muted text-sm mt-1">Your transaction history</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
          <IconRefresh size={16} />
        </button>
      </div>

      <div className="relative">
        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
        />
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

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3 text-center">
          <p className="text-vexo-green font-bold">+$0</p>
          <p className="text-vexo-muted text-xs mt-1">Total In</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3 text-center">
          <p className="text-red-400 font-bold">-$0</p>
          <p className="text-vexo-muted text-xs mt-1">Total Out</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3 text-center">
          <p className="font-bold">0</p>
          <p className="text-vexo-muted text-xs mt-1">Pending</p>
        </div>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl py-16 flex flex-col items-center gap-3">
        <IconMailbox size={32} className="text-vexo-muted" />
        <p className="text-vexo-muted text-sm">No transactions found</p>
      </div>

      <BottomNav />
    </main>
  );
}
`,

  "app/dashboard/profile/page.js": `"use client";
import { useState } from "react";
import {
  IconSettings, IconShieldCheck, IconPencil, IconLock, IconFingerprint,
  IconShieldLock, IconBell, IconGift, IconHelpCircle, IconChevronRight, IconLogout,
} from "@tabler/icons-react";
import BottomNav from "../../components/BottomNav";

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

export default function Profile() {
  const [security, setSecurity] = useState({ biometric: true, twoFactor: true });

  const flip = (key) => setSecurity((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center font-bold">N</div>
            <div>
              <p className="font-semibold text-sm">n.osborn@shakuro.com</p>
              <div className="flex gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-semibold">Unverified</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-vexo-orange/10 text-vexo-orange font-semibold">VIP 0</span>
              </div>
            </div>
          </div>
          <button className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconSettings size={16} />
          </button>
        </div>

        <div className="flex justify-between mt-5 pt-5 border-t border-vexo-border text-center">
          <div><p className="font-bold">$0</p><p className="text-vexo-muted text-xs">Portfolio</p></div>
          <div><p className="font-bold">0</p><p className="text-vexo-muted text-xs">Trades</p></div>
          <div><p className="font-bold">Sep 15</p><p className="text-vexo-muted text-xs">Joined</p></div>
        </div>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-vexo-orange/10 flex items-center justify-center shrink-0">
          <IconShieldCheck size={18} className="text-vexo-orange" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">Identity Not Verified</p>
          <p className="text-vexo-muted text-xs mt-0.5">Complete KYC to unlock all features</p>
        </div>
        <button className="text-vexo-orange text-sm font-semibold border border-vexo-orange rounded-full px-4 py-1.5">
          Verify
        </button>
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Account</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {[
            { icon: IconShieldCheck, label: "KYC Verification", sub: "Not verified" },
            { icon: IconPencil, label: "Edit Profile", sub: "Change your name" },
            { icon: IconLock, label: "Change Password", sub: "Update your password" },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><item.icon size={16} /></div>
                <div className="text-left">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-vexo-muted text-xs">{item.sub}</p>
                </div>
              </div>
              <IconChevronRight size={16} className="text-vexo-muted" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Security</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          <div className="flex items-center justify-between py-4 border-b border-vexo-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconFingerprint size={16} /></div>
              <div>
                <p className="text-sm font-semibold">Biometric Auth</p>
                <p className="text-vexo-muted text-xs">{security.biometric ? "Enabled" : "Disabled"}</p>
              </div>
            </div>
            <Toggle on={security.biometric} onClick={() => flip("biometric")} />
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconShieldLock size={16} /></div>
              <div>
                <p className="text-sm font-semibold">2-Factor Auth</p>
                <p className="text-vexo-muted text-xs">{security.twoFactor ? "Enabled" : "Disabled"}</p>
              </div>
            </div>
            <Toggle on={security.twoFactor} onClick={() => flip("twoFactor")} />
          </div>
        </div>
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Preferences</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {[
            { icon: IconBell, label: "Notifications", sub: "2 unread" },
            { icon: IconGift, label: "Referral Program", sub: "Earn $50/referral" },
            { icon: IconHelpCircle, label: "Help & Support", sub: "FAQ & contact" },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><item.icon size={16} /></div>
                <div className="text-left">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-vexo-muted text-xs">{item.sub}</p>
                </div>
              </div>
              <IconChevronRight size={16} className="text-vexo-muted" />
            </button>
          ))}
        </div>
      </div>

      <button className="flex items-center justify-center gap-2 text-red-400 font-semibold text-sm py-4 border border-red-400/30 rounded-2xl">
        <IconLogout size={18} /> Sign Out
      </button>

      <BottomNav />
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

console.log("\nDone! User dashboard rebuilt with SwiftBit-inspired flow: Home, Market, Swap, History, Profile.");
