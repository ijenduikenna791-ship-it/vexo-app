"use client";
import { useEffect, useState } from "react";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { getTheme, setTheme } from "../lib/theme";

export default function ThemeToggle({ className = "" }) {
  const [theme, setThemeState] = useState("dark");

  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
  };

  return (
    <button
      onClick={toggle}
      className={`w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center ${className}`}
      aria-label="Toggle dark/light mode"
    >
      {theme === "dark" ? <IconMoonStars size={17} /> : <IconSun size={17} />}
    </button>
  );
}
