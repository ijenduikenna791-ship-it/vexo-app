const fs = require("fs");
const path = require("path");

const files = {
  "app/components/BottomNav.js": `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconWallet, IconArrowsExchange, IconChartBar, IconSettings } from "@tabler/icons-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: IconHome },
  { href: "/dashboard/wallet", label: "Wallet", icon: IconWallet },
];

const navItemsRight = [
  { href: "/dashboard/analytics", label: "Analytics", icon: IconChartBar },
  { href: "/dashboard/settings", label: "Settings", icon: IconSettings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-vexo-card border-t border-vexo-border">
      <div className="max-w-md mx-auto flex items-center justify-between px-6 py-3 relative">
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

        <button className="absolute left-1/2 -translate-x-1/2 -top-5 w-12 h-12 rounded-full bg-vexo-orange flex items-center justify-center text-white shadow-lg">
          <IconArrowsExchange size={22} />
        </button>

        {navItemsRight.map((item) => {
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

  "app/dashboard/wallet/page.js": `import { IconCurrencyBitcoin, IconCurrencyEthereum, IconHexagon, IconCurrencyDollar, IconLink, IconArrowUp, IconArrowDown, IconArrowsExchange } from "@tabler/icons-react";
import BottomNav from "../../components/BottomNav";

const assets = [
  { name: "Bitcoin", symbol: "BTC", icon: IconCurrencyBitcoin, iconColor: "#F7931A", amount: "0.412", value: "27,642.01" },
  { name: "Ethereum", symbol: "ETH", icon: IconCurrencyEthereum, iconColor: "#8A92B2", amount: "1.85", value: "6,556.18" },
  { name: "Polygon", symbol: "MATIC", icon: IconHexagon, iconColor: "#8247E5", amount: "1,240", value: "632.40" },
  { name: "Tether", symbol: "USDT", icon: IconCurrencyDollar, iconColor: "#26A17B", amount: "890", value: "890.00" },
  { name: "Chainlink", symbol: "LINK", icon: IconLink, iconColor: "#2A5ADA", amount: "64.2", value: "495.62" },
];

export default function Wallet() {
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Wallet</p>
        <p className="text-3xl font-bold mt-1">$36,216.21</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button className="flex flex-col items-center gap-2 bg-vexo-card border border-vexo-border rounded-2xl py-4">
          <IconArrowDown size={18} />
          <span className="text-xs font-semibold">Deposit</span>
        </button>
        <button className="flex flex-col items-center gap-2 bg-vexo-card border border-vexo-border rounded-2xl py-4">
          <IconArrowUp size={18} />
          <span className="text-xs font-semibold">Withdraw</span>
        </button>
        <button className="flex flex-col items-center gap-2 bg-vexo-card border border-vexo-border rounded-2xl py-4">
          <IconArrowsExchange size={18} />
          <span className="text-xs font-semibold">Swap</span>
        </button>
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Your Assets</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {assets.map((a) => (
            <div key={a.symbol} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-vexo-card2 flex items-center justify-center" style={{ color: a.iconColor }}>
                  <a.icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{a.name}</p>
                  <p className="text-vexo-muted text-xs">{a.amount} {a.symbol}</p>
                </div>
              </div>
              <p className="font-semibold text-sm">\${a.value}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
`,

  "app/dashboard/analytics/page.js": `import Sparkline from "../../components/Sparkline";
import BottomNav from "../../components/BottomNav";

const portfolioHistory = [30, 34, 32, 38, 42, 40, 46, 50, 48, 54, 58, 62, 60, 66];

const allocations = [
  { name: "Bitcoin", percent: 54, color: "#F7931A" },
  { name: "Ethereum", percent: 22, color: "#8A92B2" },
  { name: "Polygon", percent: 12, color: "#8247E5" },
  { name: "Others", percent: 12, color: "#8A8A8E" },
];

export default function Analytics() {
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Analytics</p>
        <p className="text-3xl font-bold mt-1">Portfolio Performance</p>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Total Value (30 days)</p>
        <p className="text-2xl font-bold mt-1">$36,216.21</p>
        <p className="text-vexo-green text-sm mt-1">▲ +$4,120.50 (+12.8%)</p>
        <div className="mt-4">
          <Sparkline data={portfolioHistory} color="#F5590E" width={320} height={80} />
        </div>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-4">Allocation</p>
        <div className="flex flex-col gap-3">
          {allocations.map((a) => (
            <div key={a.name}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-semibold">{a.name}</span>
                <span className="text-vexo-muted">{a.percent}%</span>
              </div>
              <div className="w-full h-2 bg-vexo-card2 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: \`\${a.percent}%\`, backgroundColor: a.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
          <p className="text-vexo-muted text-xs">Best Performer</p>
          <p className="font-semibold mt-1">Bitcoin</p>
          <p className="text-vexo-green text-xs">+18.4% (30d)</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
          <p className="text-vexo-muted text-xs">Worst Performer</p>
          <p className="font-semibold mt-1">Chainlink</p>
          <p className="text-red-400 text-xs">-4.2% (30d)</p>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
`,

  "app/dashboard/settings/page.js": `import { IconUser, IconShieldLock, IconBell, IconCreditCard, IconLanguage, IconLogout, IconChevronRight } from "@tabler/icons-react";
import BottomNav from "../../components/BottomNav";

const settingsGroups = [
  {
    title: "Account",
    items: [
      { label: "Profile", icon: IconUser },
      { label: "Security", icon: IconShieldLock },
      { label: "Notifications", icon: IconBell },
    ],
  },
  {
    title: "Preferences",
    items: [
      { label: "Payment Methods", icon: IconCreditCard },
      { label: "Language & Currency", icon: IconLanguage },
    ],
  },
];

export default function Settings() {
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-vexo-card2 border border-vexo-border" />
        <div>
          <p className="font-semibold">Norman Osborn</p>
          <p className="text-vexo-muted text-xs">n.osborn@shakuro.com</p>
        </div>
      </div>

      {settingsGroups.map((group) => (
        <div key={group.title}>
          <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">{group.title}</p>
          <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
            {group.items.map((item) => (
              <button key={item.label} className="w-full flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
                <div className="flex items-center gap-3">
                  <item.icon size={18} className="text-vexo-muted" />
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                <IconChevronRight size={16} className="text-vexo-muted" />
              </button>
            ))}
          </div>
        </div>
      ))}

      <button className="flex items-center justify-center gap-2 text-red-400 font-semibold text-sm py-4">
        <IconLogout size={18} /> Log Out
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

console.log("\nDone! Wallet, Analytics, and Settings pages created, and BottomNav now has working links.");