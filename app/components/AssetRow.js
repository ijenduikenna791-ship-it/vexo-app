export default function AssetRow({ icon: Icon, iconColor, name, symbol, amount, value, changePercent }) {
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
        <p className="font-semibold text-sm">${value}</p>
        {changePercent && <p className="text-vexo-green text-xs">+{changePercent}%</p>}
      </div>
    </div>
  );
}
