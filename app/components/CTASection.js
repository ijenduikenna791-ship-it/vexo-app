"use client";
import Link from "next/link";
import Reveal from "./Reveal";
import { useLanguage } from "../lib/i18n";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <Reveal scale={0.92}>
        <div className="bg-vexo-card border border-vexo-border rounded-3xl px-6 sm:px-8 py-10 sm:py-14 text-center transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(34,197,94,0.12)]">
          <p className="text-vexo-orange text-sm font-semibold tracking-wide">{t("ctaLabel")}</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
            {t("ctaHeading")}
          </h2>
          <p className="text-vexo-muted mt-3">{t("ctaSubtitle")}</p>
          <Link href="/signup" className="mt-8 inline-block px-8 py-3 rounded-full bg-vexo-orange text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(34,197,94,0.4)]">
            {t("createFreeAccount")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
