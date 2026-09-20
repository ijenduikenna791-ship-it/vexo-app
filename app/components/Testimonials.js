import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Day Trader",
    quote: "Vexo's swap speed is unreal — I've never had a trade lag during a volatile market. The dashboard is the cleanest I've used.",
    rating: 5,
  },
  {
    name: "Marcus Ade",
    role: "Long-term Holder",
    quote: "The security features finally let me sleep at night. Cold storage plus biometric login is exactly what I needed.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Crypto Newcomer",
    quote: "I was intimidated by crypto until I tried Vexo. The interface made everything click within minutes.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-vexo-orange text-sm font-semibold text-center tracking-wide">TESTIMONIALS</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mt-2">
          Loved by <span className="text-vexo-orange">traders everywhere</span>
        </h2>
        <p className="text-vexo-muted text-center mt-3 max-w-xl mx-auto">
          Don't just take our word for it — here's what real Vexo users have to say.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.12}>
            <div className="bg-vexo-card border border-vexo-border rounded-2xl p-6 flex flex-col gap-4 h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-vexo-orange/40">
              <div className="flex gap-1 text-vexo-orange text-sm">
                {"★".repeat(t.rating)}
              </div>
              <p className="text-sm text-white leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-auto pt-2">
                <div className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-vexo-muted text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
