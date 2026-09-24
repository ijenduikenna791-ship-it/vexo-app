"use client";
import { useState } from "react";
import { IconPlugConnected } from "@tabler/icons-react";

export default function BackendNotice({ message }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3 text-sm">
      <IconPlugConnected size={18} className="text-yellow-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-semibold text-yellow-400">Requires backend integration</p>
        <p className="text-vexo-muted text-xs mt-0.5">{message}</p>
      </div>
      <button onClick={() => setDismissed(true)} className="text-vexo-muted text-xs shrink-0">Dismiss</button>
    </div>
  );
}
