import { IconUsers, IconChartBar, IconWallet, IconClockHour4, IconShieldLock } from "@tabler/icons-react";
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
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${s.iconColor}1A`, color: s.iconColor }}>
              <s.icon size={18} />
            </div>
            <p className="font-bold text-lg leading-tight">{s.value}</p>
            <p className="text-vexo-muted text-xs mt-1">{s.label}</p>
            <p className={`text-xs mt-1 font-semibold ${s.up ? "text-vexo-green" : "text-red-400"}`}>{s.change}</p>
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
