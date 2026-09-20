import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";

export default function BalanceCard({ name, email, balance, pnl, pnlPercent }) {
  return (
    <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-vexo-card2" />
          <div>
            <p className="font-semibold text-sm">Hello, {name}!</p>
            <p className="text-vexo-muted text-xs">{email}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-vexo-green text-sm font-semibold">+${pnl}</p>
          <p className="text-vexo-green text-xs">+{pnlPercent}%</p>
        </div>
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Main Portfolio</p>
        <p className="text-3xl font-bold mt-1">${balance}</p>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-vexo-card2 border border-vexo-border rounded-full py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5">
          <IconArrowUp size={16} /> Withdraw
        </button>
        <button className="flex-1 bg-white text-black rounded-full py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5">
          <IconArrowDown size={16} /> Deposit
        </button>
      </div>
    </div>
  );
}