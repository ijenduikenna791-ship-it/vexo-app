const prices = [
  { symbol: "BTC", price: "$67,842.5", change: "+2.34%", up: true },
  { symbol: "ETH", price: "$3,542.8", change: "+1.87%", up: true },
  { symbol: "SOL", price: "$182.4", change: "+4.21%", up: true },
  { symbol: "XRP", price: "$0.6182", change: "-0.87%", up: false },
  { symbol: "ADA", price: "$0.4821", change: "-1.23%", up: false },
  { symbol: "DOGE", price: "$0.1634", change: "+3.45%", up: true },
  { symbol: "BNB", price: "$582.3", change: "+0.92%", up: true },
];

export default function PriceTicker() {
  const row = [...prices, ...prices];

  return (
    <div className="border-y border-vexo-border overflow-hidden bg-vexo-card">
      <div className="flex gap-10 py-3 px-6 animate-[scroll_25s_linear_infinite] w-max">
        {row.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-sm whitespace-nowrap">
            <span className="font-semibold">{p.symbol}</span>
            <span className="text-vexo-muted">{p.price}</span>
            <span className={p.up ? "text-vexo-green" : "text-red-400"}>{p.change}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
