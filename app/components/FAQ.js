"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  { q: "How do I get started with Vexo?", a: "Create a free account, verify your email, and fund your wallet — you can be trading in under two minutes." },
  { q: "Is Vexo secure?", a: "Yes. We use AES-256 encryption, biometric login, 98% cold storage, and SOC2-audited infrastructure." },
  { q: "What cryptocurrencies are supported?", a: "Vexo supports 120+ coins including Bitcoin, Ethereum, Solana, and major stablecoins." },
  { q: "What are the fees?", a: "New accounts get zero trading fees for the first 30 days. After that, fees start at 0.1% per swap." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-vexo-orange text-sm font-semibold tracking-wide">FAQ</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">
          Got <span className="text-vexo-orange">questions?</span>
        </h2>
        <p className="text-vexo-muted mt-3">
          Everything you need to know about Vexo. Can't find what you're looking for? Our support team is available 24/7.
        </p>
        <button className="mt-6 px-6 py-3 rounded-full bg-vexo-orange text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
          Contact Support
        </button>
      </Reveal>

      <div className="mt-10 flex flex-col gap-3">
        {faqs.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.08} y={12}>
            <div className="border border-vexo-border rounded-2xl px-4 sm:px-5 py-4 transition-colors duration-300 hover:border-vexo-orange/40">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 text-left"
              >
                <span className="font-semibold text-sm">{item.q}</span>
                <span className={`w-7 h-7 rounded-full bg-vexo-card2 flex items-center justify-center text-sm shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="text-vexo-muted text-sm mt-3">{item.a}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
