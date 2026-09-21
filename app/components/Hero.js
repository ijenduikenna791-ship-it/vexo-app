import Reveal from "./Reveal";
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
