import { IconCurrencyBitcoin, IconCurrencyEthereum, IconHexagon, IconCurrencyDollar, IconLink } from "@tabler/icons-react";
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
