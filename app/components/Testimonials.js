"use client";
import Reveal from "./Reveal";
import { useLanguage } from "../lib/i18n";

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    { name: "Sarah Chen", role: t("testimonial1Role"), quote: t("testimonial1Quote"), rating: 5 },
    { name: "Marcus Ade", role: t("testimonial2Role"), quote: t("testimonial2Quote"), rating: 5 },
    { name: "Priya Nair", role: t("testimonial3Role"), quote: t("testimonial3Quote"), rating: 5 },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-vexo-orange text-sm font-semibold text-center tracking-wide">{t("testimonialsLabel")}</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mt-2">
          {t("testimonialsHeadingPart1")} <span className="text-vexo-orange">{t("testimonialsHeadingHighlight")}</span>
        </h2>
        <p className="text-vexo-muted text-center mt-3 max-w-xl mx-auto">
          {t("testimonialsSubtitle")}
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {testimonials.map((tItem, i) => (
          <Reveal key={tItem.name} delay={i * 0.12}>
            <div className="bg-vexo-card border border-vexo-border rounded-2xl p-6 flex flex-col gap-4 h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-vexo-orange/40">
              <div className="flex gap-1 text-vexo-orange text-sm">
                {"★".repeat(tItem.rating)}
              </div>
              <p className="text-sm text-white leading-relaxed">"{tItem.quote}"</p>
              <div className="flex items-center gap-3 mt-auto pt-2">
                <div className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{tItem.name}</p>
                  <p className="text-vexo-muted text-xs">{tItem.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
