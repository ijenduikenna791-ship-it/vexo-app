const steps = [
  { number: "01", title: "Create your wallet", desc: "Sign up in under two minutes — no paperwork needed." },
  { number: "02", title: "Fund your account", desc: "Deposit crypto or buy directly with a card or bank transfer." },
  { number: "03", title: "Track & trade", desc: "Watch your portfolio grow and swap coins whenever you want." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-extrabold text-center">How it works</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {steps.map((s) => (
          <div key={s.number} className="border border-vexo-border rounded-2xl p-6">
            <p className="text-vexo-orange font-extrabold text-2xl">{s.number}</p>
            <h3 className="font-semibold text-lg mt-3">{s.title}</h3>
            <p className="text-vexo-muted text-sm mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
