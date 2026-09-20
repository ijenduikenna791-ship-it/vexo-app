import { IconUsers, IconChartBar, IconWallet, IconClockHour4 } from "@tabler/icons-react";
import AdminBottomNav from "../components/AdminBottomNav";

const stats = [
  { icon: IconUsers, label: "Total Users", value: "248,391", change: "+1.4%", up: true },
  { icon: IconChartBar, label: "24h Volume", value: "$18.2M", change: "+6.2%", up: true },
  { icon: IconWallet, label: "Active Wallets", value: "94,120", change: "+0.8%", up: true },
  { icon: IconClockHour4, label: "Pending KYC", value: "412", change: "-3.1%", up: false },
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
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">Overview</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
            <div className="w-9 h-9 rounded-lg bg-vexo-card2 flex items-center justify-center mb-3">
              <s.icon size={18} />
            </div>
            <p className="font-bold text-lg leading-tight">{s.value}</p>
            <p className="text-vexo-muted text-xs mt-1">{s.label}</p>
            <p className={`text-xs mt-1 ${s.up ? "text-vexo-green" : "text-red-400"}`}>{s.change}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Recent Transactions</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {recentTx.map((tx, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
              <div>
                <p className="font-semibold text-sm">{tx.user}</p>
                <p className="text-vexo-muted text-xs">{tx.type}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{tx.amount}</p>
                <p className={`text-xs ${tx.status === "Completed" ? "text-vexo-green" : "text-yellow-400"}`}>{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminBottomNav />
    </main>
  );
}
