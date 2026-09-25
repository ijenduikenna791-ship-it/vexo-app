export default function AssetRow({ icon: Icon, iconColor, name, symbol, amount, value, changePercent }) {
  return (
    <div className="flex items-center justify-between gap-2 py-3 border-b border-vexo-border last:border-none">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-vexo-card2 flex items-center justify-center shrink-0" style={{ color: iconColor }}>
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{name}</p>
          <p className="text-vexo-muted text-xs truncate">{amount} {symbol}</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="font-semibold text-sm">${value}</p>
        {changePercent && <p className="text-vexo-green text-xs">+{changePercent}%</p>}
      </div>
    </div>
  );
}
