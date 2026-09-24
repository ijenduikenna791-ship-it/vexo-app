"use client";
import Reveal from "./Reveal";
import HeroVisual from "./HeroVisual";
import { useLanguage } from "../lib/i18n";

export default function Hero() {
  const { t } = useLanguage();

  const trustList = [
    { icon: "🔒", title: t("trust1Title"), desc: t("trust1Desc") },
    { icon: "🆔", title: t("trust2Title"), desc: t("trust2Desc") },
    { icon: "👁", title: t("trust3Title"), desc: t("trust3Desc") },
    { icon: "🧊", title: t("trust4Title"), desc: t("trust4Desc") },
    { icon: "🎖", title: t("trust5Title"), desc: t("trust5Desc") },
    { icon: "🛡", title: t("trust6Title"), desc: t("trust6Desc") },
  ];

  return (
    <section id="security" className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-12">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <Reveal y={20} scale={0.97}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            {t("heroTitlePart1")} <span className="text-vexo-orange">{t("heroTitleHighlight")}</span> {t("heroTitlePart2")}
          </h1>
          <p className="text-vexo-muted mt-5 text-base sm:text-lg">
            {t("heroSubtitle")}
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
