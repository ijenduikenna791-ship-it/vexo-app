"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setHidden(true), 900);
    const removeTimer = setTimeout(() => setMounted(false), 1400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-vexo-card transition-opacity duration-500 ease-out ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-vexo-border" />
          <div className="absolute inset-0 rounded-full border-2 border-t-vexo-green border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <div className="absolute inset-[10px] rounded-full bg-vexo-green/10 animate-pulse" />
        </div>
        <span className="text-lg font-bold tracking-wide">Vexo</span>
      </div>
    </div>
  );
}