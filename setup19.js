const fs = require("fs");
const path = require("path");

// 1. Upgrade BalanceRing so it supports a bigger size and a "hidden" (eye-toggle) state.
const ringPath = path.join(__dirname, "app/components/admin/BalanceRing.js");
fs.writeFileSync(ringPath, `"use client";

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
            {hidden ? "••••••" : \`$\${amount.toLocaleString(undefined, { minimumFractionDigits: amount % 1 === 0 ? 0 : 2 })}\`}
          </p>
        </div>
      </div>
      <div
        className="flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-semibold"
        style={{ backgroundColor: \`\${color}22\`, color }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        {status}
      </div>
    </div>
  );
}
`, "utf8");
console.log("Updated: app/components/admin/BalanceRing.js");

// 2. Update the Admin Overview page: wrap the total platform balance in the ring.
const overviewPath = path.join(__dirname, "app/admin/page.js");
let content = fs.readFileSync(overviewPath, "utf8");

if (!content.includes("BalanceRing")) {
  content = content.replace(
    'import UserAvatar from "../components/UserAvatar";',
    'import UserAvatar from "../components/UserAvatar";\nimport BalanceRing from "../components/admin/BalanceRing";'
  );

  content = content.replace(
    /      <div className="text-center">[\\s\\S]*?<\/div>\\n\\n      <div className="grid grid-cols-3 gap-3">/,
    `      <div className="flex justify-center">
        <BalanceRing
          amount={totalPlatformBalance}
          label="Total platform balance"
          status="Live"
          size={220}
          hidden={hidden}
        />
      </div>

      <div className="flex justify-center -mt-2">
        <button onClick={() => setHidden((h) => !h)} className="flex items-center gap-1.5 text-vexo-muted text-xs font-semibold">
          {hidden ? <IconEyeOff size={14} /> : <IconEye size={14} />} {hidden ? "Show balance" : "Hide balance"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">`
  );

  fs.writeFileSync(overviewPath, content, "utf8");
  console.log("Updated: app/admin/page.js (balance now shown inside the ring)");
} else {
  console.log("Already using BalanceRing, skipped: app/admin/page.js");
}

console.log("\\nDone!");
