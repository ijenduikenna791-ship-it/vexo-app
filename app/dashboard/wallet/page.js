import { IconCurrencyBitcoin, IconCurrencyEthereum, IconHexagon, IconCurrencyDollar, IconLink, IconArrowUp, IconArrowDown, IconArrowsExchange } from "@tabler/icons-react";
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
              <p className="font-semibold text-sm">${a.value}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
