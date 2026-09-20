import Link from "next/link";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <Reveal scale={0.92}>
        <div className="bg-vexo-card border border-vexo-border rounded-3xl px-6 sm:px-8 py-10 sm:py-14 text-center transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(34,197,94,0.12)]">
          <p className="text-vexo-orange text-sm font-semibold tracking-wide">GET STARTED TODAY</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
            Start your crypto journey — zero fees for 30 days
          </h2>
          <p className="text-vexo-muted mt-3">Join 248,000+ users already trading on Vexo.</p>
          <Link href="/signup" className="mt-8 inline-block px-8 py-3 rounded-full bg-vexo-orange text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(34,197,94,0.4)]">
            Create Free Account
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
