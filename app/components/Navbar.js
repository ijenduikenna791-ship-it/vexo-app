"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-vexo-bg/90 backdrop-blur border-b border-vexo-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
          <div className="w-8 h-8 rounded-lg bg-vexo-orange flex items-center justify-center text-white font-bold">
            V
          </div>
          <p className="text-lg font-extrabold">Vexo</p>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-vexo-muted">
          <a href="#security" className="hover:text-white transition-colors duration-200">Security</a>
          <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
          <a href="#markets" className="hover:text-white transition-colors duration-200">Markets</a>
          <a href="#faq" className="hover:text-white transition-colors duration-200">FAQ</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold px-4 py-2 transition-transform duration-200 hover:scale-105 inline-block">Log in</Link>
          <Link href="/signup" className="text-sm font-semibold px-5 py-2 rounded-full bg-vexo-orange text-white transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] inline-block">
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 rounded-lg bg-vexo-card2 border border-vexo-border flex items-center justify-center transition-transform duration-200 active:scale-90"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 px-4 sm:px-6 pb-6 text-sm text-vexo-muted animate-[fadeIn_0.25s_ease-out]">
          <a href="#security" onClick={() => setOpen(false)}>Security</a>
          <a href="#features" onClick={() => setOpen(false)}>Features</a>
          <a href="#markets" onClick={() => setOpen(false)}>Markets</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          <Link href="/login" onClick={() => setOpen(false)} className="text-left font-semibold text-white">Log in</Link>
          <Link href="/signup" onClick={() => setOpen(false)} className="text-sm font-semibold px-5 py-2 rounded-full bg-vexo-orange text-white w-fit">
            Get Started
          </Link>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
