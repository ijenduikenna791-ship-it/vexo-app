"use client";
import { useLanguage } from "../lib/i18n";

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { number: "01", title: t("step1Title"), desc: t("step1Desc") },
    { number: "02", title: t("step2Title"), desc: t("step2Desc") },
    { number: "03", title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center">{t("howItWorksHeading")}</h2>
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
