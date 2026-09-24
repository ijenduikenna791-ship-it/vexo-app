"use client";

const statusColors = {
  Active: "#22c55e",
  Suspended: "#ef4444",
  Verified: "#22c55e",
  Pending: "#eab308",
  Live: "#22c55e",
};

export default function BalanceRing({ amount, label = "Balance", status = "Active", size = 176, hidden = false }) {
  const color = statusColors[status] || "#22c55e";
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const scale = size / 160;

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div style={{ width: size, height: size }} className="relative">
        <svg
          style={{ width: size, height: size }}
          className="-rotate-90"
          viewBox="0 0 160 160"
        >
          <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.12}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <p className="text-vexo-muted text-xs text-center">{label}</p>
          <p className="font-extrabold mt-1 text-center" style={{ fontSize: 22 * scale > 34 ? 34 : 22 * scale }}>
            {hidden ? "••••••" : `$${amount.toLocaleString(undefined, { minimumFractionDigits: amount % 1 === 0 ? 0 : 2 })}`}
          </p>
        </div>
      </div>
      <div
        className="flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-semibold"
        style={{ backgroundColor: `${color}22`, color }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        {status}
      </div>
    </div>
  );
}
