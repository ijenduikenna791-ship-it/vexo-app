const fs = require("fs");
const path = require("path");

const files = {
  "app/components/HeroVisual.js": `export default function HeroVisual() {
  return (
    <div className="relative w-full h-[420px] sm:h-[480px] flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full opacity-70"
        style={{ filter: "blur(0.5px)" }}
      >
        <polyline
          points="20,320 140,80 260,260 380,40"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
        <polyline
          points="40,60 180,220 320,100 370,300"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />
      </svg>

      <div className="relative w-[150px] sm:w-[170px] rotate-[-8deg] -translate-x-6 sm:-translate-x-10 z-10">
        <div className="bg-vexo-card border border-vexo-border rounded-[1.75rem] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="bg-vexo-bg rounded-[1.4rem] p-3 h-[280px] sm:h-[320px] flex flex-col gap-2">
            <div className="flex items-center justify-between text-[9px] text-vexo-muted">
              <span>News</span>
              <span>🔔</span>
            </div>
            <div className="flex gap-1">
              {["Latest", "Hot", "BTC"].map((t) => (
                <span key={t} className="text-[8px] px-2 py-1 rounded-full bg-vexo-card2 text-vexo-muted">{t}</span>
              ))}
            </div>
            <div className="rounded-xl bg-gradient-to-br from-vexo-orange to-vexo-orange/60 p-2 h-14">
              <p className="text-[9px] font-bold text-white">Vexo Special Event</p>
              <p className="text-[7px] text-white/80 mt-1">Be first in line</p>
            </div>
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2 bg-vexo-card2 rounded-lg p-1.5">
                <div className="w-6 h-6 rounded bg-vexo-border shrink-0" />
                <p className="text-[7px] leading-tight text-vexo-muted">Bitcoin market update, on-chain data</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-[150px] sm:w-[170px] rotate-[7deg] translate-x-6 sm:translate-x-10 -translate-y-4 z-20">
        <div className="bg-vexo-card border border-vexo-border rounded-[1.75rem] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="bg-vexo-bg rounded-[1.4rem] p-3 h-[280px] sm:h-[320px] flex flex-col gap-2">
            <div className="flex items-center justify-between text-[9px]">
              <span>← BTC</span>
              <span>☆</span>
            </div>
            <p className="text-[8px] text-vexo-muted">Bitcoin</p>
            <p className="text-sm font-bold">$67,842.5</p>
            <svg viewBox="0 0 120 50" className="w-full h-12">
              <polyline
                points="0,35 15,30 30,38 45,20 60,25 75,10 90,18 105,8 120,15"
                fill="none"
                stroke="#F5590E"
                strokeWidth="2"
              />
            </svg>
            <div className="flex gap-1 mt-1">
              {["1D", "1W", "1M", "1Y"].map((t) => (
                <span key={t} className="text-[7px] px-1.5 py-0.5 rounded bg-vexo-card2 text-vexo-muted">{t}</span>
              ))}
            </div>
            <div className="mt-auto grid grid-cols-2 gap-1 text-[7px] text-vexo-muted">
              <p>Market Cap<br /><span className="text-white font-semibold">$1.3T</span></p>
              <p>24h Vol<br /><span className="text-vexo-green font-semibold">+1.52%</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,

  "app/components/Hero.js": `import Reveal from "./Reveal";
import HeroVisual from "./HeroVisual";

const trustList = [
  { icon: "🔒", title: "AES-256 Encryption", desc: "Military-grade encryption for all data at rest and in transit." },
  { icon: "🆔", title: "Biometric Auth", desc: "Face ID and fingerprint login for instant, passwordless access." },
  { icon: "👁", title: "24/7 Monitoring", desc: "Real-time anomaly detection with automated threat response." },
  { icon: "🧊", title: "Cold Storage 98%", desc: "Majority of assets held in air-gapped, offline cold wallets." },
  { icon: "🎖", title: "SOC2 Certified", desc: "Independently audited by Big-4 security firms every year." },
  { icon: "🛡", title: "$500M Insurance", desc: "Full asset coverage through leading global insurance policies." },
];

export default function Hero() {
  return (
    <section id="security" className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-12">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <Reveal y={20} scale={0.97}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Your crypto, <span className="text-vexo-orange">Fort Knox</span> protected
          </h1>
          <p className="text-vexo-muted mt-5 text-base sm:text-lg">
            We obsess over security so you don't have to. Every layer of Vexo is engineered to protect your assets with the highest standards in the industry.
          </p>
        </Reveal>

        <Reveal delay={0.15} scale={0.9}>
          <HeroVisual />
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-10 max-w-3xl mx-auto">
        {trustList.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} y={16}>
            <div className="flex items-start gap-3 group">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-vexo-card2 border border-vexo-border flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-vexo-orange/50">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-vexo-muted text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
`,
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("Created:", relativePath);
}

console.log("\nDone! Added floating phone-mockup hero visual with neon zigzag lines, placed beside the Hero headline.");
