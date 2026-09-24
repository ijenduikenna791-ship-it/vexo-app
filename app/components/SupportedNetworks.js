"use client";
import Reveal from "./Reveal";
import { useLanguage } from "../lib/i18n";

const networks = [
  { symbol: "₿", name: "Bitcoin" },
  { symbol: "Ξ", name: "Ethereum" },
  { symbol: "◈", name: "Polygon" },
  { symbol: "◎", name: "Solana" },
  { symbol: "B", name: "BNB Chain" },
  { symbol: "A", name: "Arbitrum" },
  { symbol: "O", name: "Optimism" },
  { symbol: "8", name: "Base" },
];

export default function SupportedNetworks() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-vexo-orange text-sm font-semibold text-center tracking-wide">{t("networksLabel")}</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mt-2">
          {t("networksHeadingPart1")} <span className="text-vexo-orange">{t("networksHeadingHighlight")}</span>
        </h2>
        <p className="text-vexo-muted text-center mt-3 max-w-xl mx-auto">
          {t("networksSubtitle")}
        </p>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10">
        {networks.map((n, i) => (
          <Reveal key={n.name} delay={i * 0.06}>
            <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4 sm:p-5 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-vexo-orange/50 hover:shadow-[0_0_24px_rgba(34,197,94,0.15)]">
              <div className="w-10 h-10 rounded-full bg-vexo-card2 flex items-center justify-center font-bold shrink-0">
                {n.symbol}
              </div>
              <p className="font-semibold text-sm truncate">{n.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
