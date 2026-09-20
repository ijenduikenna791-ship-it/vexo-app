import Link from "next/link";
import Reveal from "./Reveal";

const stats = [
  { icon: "🛡", value: "248K+", label: "Active Users" },
  { icon: "📈", value: "$2.84B", label: "Assets Secured" },
  { icon: "⚡", value: "<0.1s", label: "Swap Execution" },
];

const bars = [20, 28, 24, 34, 40, 38, 48, 52, 60, 58, 68, 74];

export default function GetStartedPanel() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
      <Reveal>
        <div className="flex flex-col gap-4">
          <Link href="/signup" className="w-full py-4 rounded-2xl bg-vexo-orange text-white font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(34,197,94,0.4)] active:scale-[0.98]">
            Create Free Account <span>→</span>
          </Link>
          <Link href="/login" className="w-full py-4 rounded-2xl border border-vexo-border font-semibold text-lg text-center transition-all duration-300 hover:border-vexo-orange/50 hover:bg-vexo-card">
            Sign In
          </Link>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="flex items-center gap-3 bg-vexo-card border border-vexo-border rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-vexo-orange/40">
              <div className="w-9 h-9 rounded-lg bg-vexo-card2 flex items-center justify-center text-lg">
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-lg leading-tight">{s.value}</p>
                <p className="text-vexo-muted text-xs">{s.label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} y={36}>
        <div className="mt-10 max-w-sm sm:max-w-md mx-auto bg-vexo-card border border-vexo-border rounded-[2.5rem] p-6 sm:p-8 transition-transform duration-500 hover:scale-[1.015]">
          <div className="flex justify-between text-xs text-vexo-muted mb-8">
            <span>9:41</span>
            <span className="w-8 h-3 rounded-full bg-vexo-green" />
          </div>
          <p className="text-vexo-muted text-xs uppercase tracking-wide">Total Balance</p>
          <p className="text-3xl sm:text-4xl font-bold mt-2">$67,894.23</p>
          <p className="text-vexo-green text-sm mt-2">▲ +$2,840 (+4.36%)</p>
          <div className="flex items-end gap-1.5 sm:gap-2 mt-10 h-32 sm:h-40">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 bg-vexo-orange/80 rounded-t transition-all duration-700" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
