import Sparkline from "../../components/Sparkline";
import BottomNav from "../../components/BottomNav";

const portfolioHistory = [30, 34, 32, 38, 42, 40, 46, 50, 48, 54, 58, 62, 60, 66];

const allocations = [
  { name: "Bitcoin", percent: 54, color: "#F7931A" },
  { name: "Ethereum", percent: 22, color: "#8A92B2" },
  { name: "Polygon", percent: 12, color: "#8247E5" },
  { name: "Others", percent: 12, color: "#8A8A8E" },
];

export default function Analytics() {
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Analytics</p>
        <p className="text-3xl font-bold mt-1">Portfolio Performance</p>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Total Value (30 days)</p>
        <p className="text-2xl font-bold mt-1">$36,216.21</p>
        <p className="text-vexo-green text-sm mt-1">▲ +$4,120.50 (+12.8%)</p>
        <div className="mt-4">
          <Sparkline data={portfolioHistory} color="#F5590E" width={320} height={80} />
        </div>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-4">Allocation</p>
        <div className="flex flex-col gap-3">
          {allocations.map((a) => (
            <div key={a.name}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-semibold">{a.name}</span>
                <span className="text-vexo-muted">{a.percent}%</span>
              </div>
              <div className="w-full h-2 bg-vexo-card2 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${a.percent}%`, backgroundColor: a.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
          <p className="text-vexo-muted text-xs">Best Performer</p>
          <p className="font-semibold mt-1">Bitcoin</p>
          <p className="text-vexo-green text-xs">+18.4% (30d)</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4">
          <p className="text-vexo-muted text-xs">Worst Performer</p>
          <p className="font-semibold mt-1">Chainlink</p>
          <p className="text-red-400 text-xs">-4.2% (30d)</p>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
