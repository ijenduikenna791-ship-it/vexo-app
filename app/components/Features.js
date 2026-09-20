import Reveal from "./Reveal";

const features = [
  { icon: "🔒", title: "Bank-grade security", desc: "Your assets are protected with multi-layer encryption and cold storage." },
  { icon: "⚡", title: "Instant swaps", desc: "Trade between 120+ coins in seconds with the best available rates." },
  { icon: "📊", title: "Live portfolio tracking", desc: "See your gains, losses, and trends update in real time." },
  { icon: "🌍", title: "Global access", desc: "Use Vexo anywhere — no bank account or borders required." },
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-vexo-orange text-sm font-semibold text-center tracking-wide">WHY VEXO</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mt-2">
          Everything you need to <span className="text-vexo-orange">master crypto</span>
        </h2>
        <p className="text-vexo-muted text-center mt-3 max-w-xl mx-auto">
          Built for crypto natives. Every feature crafted for power, simplicity, and trust.
        </p>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1}>
            <div className="bg-vexo-card border border-vexo-border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-vexo-orange/40 hover:shadow-[0_8px_30px_rgba(34,197,94,0.12)] group">
              <div className="w-11 h-11 rounded-xl bg-vexo-card2 flex items-center justify-center text-xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-vexo-muted text-sm mt-2">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
