"use client";
import { useState, useEffect } from "react";
import { IconMessageCircle2 } from "@tabler/icons-react";

export default function ChatButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.Tawk_API && typeof window.Tawk_API.toggle === "function") {
        setVisible(true);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  function handleClick() {
    if (typeof window !== "undefined" && window.Tawk_API && typeof window.Tawk_API.toggle === "function") {
      window.Tawk_API.toggle();
    }
  }

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      aria-label="Chat with support"
      className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-vexo-green text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <IconMessageCircle2 size={26} />
    </button>
  );
}
