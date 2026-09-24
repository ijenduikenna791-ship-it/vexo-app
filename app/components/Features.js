"use client";
import Reveal from "./Reveal";
import { useLanguage } from "../lib/i18n";

export default function Features() {
  const { t } = useLanguage();

  const features = [
    { icon: "🔒", title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: "⚡", title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: "📊", title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: "🌍", title: t("feature4Title"), desc: t("feature4Desc") },
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-vexo-orange text-sm font-semibold text-center tracking-wide">{t("featuresLabel")}</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mt-2">
          {t("featuresHeadingPart1")} <span className="text-vexo-orange">{t("featuresHeadingHighlight")}</span>
        </h2>
        <p className="text-vexo-muted text-center mt-3 max-w-xl mx-auto">
          {t("featuresSubtitle")}
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
