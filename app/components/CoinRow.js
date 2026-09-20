import Sparkline from "./Sparkline";

export default function CoinRow({ name, symbol, price, change, changePercent, trend, sparkline, icon: Icon, iconColor }) {
  const isUp = trend === "up";
  const color = isUp ? "#22c55e" : "#ef4444";

  return (
    <div className="flex items-center justify-between py-3 border-b border-vexo-border last:border-none">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-vexo-card2 flex items-center justify-center" style={{ color: iconColor }}>
          <Icon size={18} />
        </div>
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-vexo-muted text-xs">{symbol}</p>
        </div>
      </div>
      <Sparkline data={sparkline} color={color} width={70} height={24} />
      <div className="text-right">
        <p className="font-semibold text-sm">${price}</p>
        <p className="text-xs" style={{ color }}>
          {isUp ? "+" : ""}{change} · {isUp ? "+" : ""}{changePercent}%
        </p>
      </div>
    </div>
  );
}