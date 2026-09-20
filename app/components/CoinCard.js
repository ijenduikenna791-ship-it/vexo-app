import Sparkline from "./Sparkline";

export default function CoinCard({ name, symbol, price, change, changePercent, trend, sparkline, icon: Icon, iconColor }) {
  const isUp = trend === "up";
  const color = isUp ? "#22c55e" : "#ef4444";

  return (
    <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4 flex flex-col gap-3 min-w-[160px]">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-vexo-card2 flex items-center justify-center" style={{ color: iconColor }}>
          <Icon size={18} />
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">{name}</p>
          <p className="text-vexo-muted text-xs">{symbol}</p>
        </div>
      </div>
      <Sparkline data={sparkline} color={color} width={120} height={36} />
      <div>
        <p className="font-bold text-lg">${price}</p>
        <p className="text-xs" style={{ color }}>
          {isUp ? "+" : ""}{change} · {isUp ? "+" : ""}{changePercent}%
        </p>
      </div>
    </div>
  );
}