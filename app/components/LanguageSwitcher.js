"use client";
import { useState } from "react";
import { IconWorld } from "@tabler/icons-react";
import { languages, useLanguage } from "../lib/i18n";

function Flag({ code }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={code}
      className="w-5 h-3.5 object-cover rounded-sm"
    />
  );
}

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center"
        aria-label="Change language"
      >
        <IconWorld size={17} />
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} className="fixed inset-0 z-40" />
          <div className="absolute right-0 mt-2 w-44 bg-vexo-card border border-vexo-border rounded-xl shadow-lg z-50 py-1">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-vexo-card2 ${
                  l.code === current.code ? "text-vexo-orange font-semibold" : ""
                }`}
              >
                <Flag code={l.flag} /> {l.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
