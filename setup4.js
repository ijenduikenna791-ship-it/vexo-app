const fs = require("fs");
const path = require("path");

const files = {
  "app/login/page.js": `import Link from "next/link";
import { IconMail, IconLock } from "@tabler/icons-react";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg bg-vexo-orange flex items-center justify-center text-white font-bold">V</div>
          <p className="text-lg font-extrabold">Vexo</p>
        </div>

        <h1 className="text-2xl font-extrabold text-center">Welcome back</h1>
        <p className="text-vexo-muted text-sm text-center mt-2">Log in to access your portfolio</p>

        <form className="flex flex-col gap-4 mt-8">
          <div className="relative">
            <IconMail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
            />
          </div>
          <div className="relative">
            <IconLock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-vexo-orange text-xs font-semibold">Forgot password?</a>
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold mt-2">
            Log In
          </button>
        </form>

        <p className="text-vexo-muted text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-white font-semibold">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
`,

  "app/signup/page.js": `import Link from "next/link";
import { IconMail, IconLock, IconUser } from "@tabler/icons-react";

export default function Signup() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg bg-vexo-orange flex items-center justify-center text-white font-bold">V</div>
          <p className="text-lg font-extrabold">Vexo</p>
        </div>

        <h1 className="text-2xl font-extrabold text-center">Create your account</h1>
        <p className="text-vexo-muted text-sm text-center mt-2">Start your crypto journey — zero fees for 30 days</p>

        <form className="flex flex-col gap-4 mt-8">
          <div className="relative">
            <IconUser size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
            <input
              type="text"
              placeholder="Full name"
              className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
            />
          </div>
          <div className="relative">
            <IconMail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
            />
          </div>
          <div className="relative">
            <IconLock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
            />
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold mt-2">
            Create Free Account
          </button>
        </form>

        <p className="text-vexo-muted text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-white font-semibold">Log in</Link>
        </p>
      </div>
    </main>
  );
}
`,

  "app/components/Navbar.js": `"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-vexo-bg/90 backdrop-blur border-b border-vexo-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-vexo-orange flex items-center justify-center text-white font-bold">
            V
          </div>
          <p className="text-lg font-extrabold">Vexo</p>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-vexo-muted">
          <a href="#security" className="hover:text-white">Security</a>
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#markets" className="hover:text-white">Markets</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold px-4 py-2">Log in</Link>
          <Link href="/signup" className="text-sm font-semibold px-5 py-2 rounded-full bg-vexo-orange text-white">
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 rounded-lg bg-vexo-card2 border border-vexo-border flex items-center justify-center"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 text-sm text-vexo-muted">
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
    </header>
  );
}
`,

  "app/components/GetStartedPanel.js": `import Link from "next/link";

const stats = [
  { icon: "🛡", value: "248K+", label: "Active Users" },
  { icon: "📈", value: "$2.84B", label: "Assets Secured" },
  { icon: "⚡", value: "<0.1s", label: "Swap Execution" },
];

const bars = [20, 28, 24, 34, 40, 38, 48, 52, 60, 58, 68, 74];

export default function GetStartedPanel() {
  return (
    <section className="max-w-3xl mx-auto px-6 pb-20">
      <div className="flex flex-col gap-4">
        <Link href="/signup" className="w-full py-4 rounded-2xl bg-vexo-orange text-white font-bold text-lg flex items-center justify-center gap-2">
          Create Free Account <span>→</span>
        </Link>
        <Link href="/login" className="w-full py-4 rounded-2xl border border-vexo-border font-semibold text-lg text-center">
          Sign In
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 bg-vexo-card border border-vexo-border rounded-2xl p-4">
            <div className="w-9 h-9 rounded-lg bg-vexo-card2 flex items-center justify-center text-lg">
              {s.icon}
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">{s.value}</p>
              <p className="text-vexo-muted text-xs">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-md mx-auto bg-vexo-card border border-vexo-border rounded-[2.5rem] p-8">
        <div className="flex justify-between text-xs text-vexo-muted mb-8">
          <span>9:41</span>
          <span className="w-8 h-3 rounded-full bg-vexo-green" />
        </div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Total Balance</p>
        <p className="text-4xl font-bold mt-2">$67,894.23</p>
        <p className="text-vexo-green text-sm mt-2">▲ +$2,840 (+4.36%)</p>
        <div className="flex items-end gap-2 mt-10 h-40">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 bg-vexo-orange/80 rounded-t" style={{ height: \`\${h}%\` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
`,

  "app/components/CTASection.js": `import Link from "next/link";

export default function CTASection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-vexo-card border border-vexo-border rounded-3xl px-8 py-14 text-center">
        <p className="text-vexo-orange text-sm font-semibold tracking-wide">GET STARTED TODAY</p>
        <h2 className="text-3xl font-extrabold mt-3">
          Start your crypto journey — zero fees for 30 days
        </h2>
        <p className="text-vexo-muted mt-3">Join 248,000+ users already trading on Vexo.</p>
        <Link href="/signup" className="mt-8 inline-block px-8 py-3 rounded-full bg-vexo-orange text-white font-semibold">
          Create Free Account
        </Link>
      </div>
    </section>
  );
}
`,
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("Created:", relativePath);
}

console.log("\nDone! Login/Signup pages created and all buttons wired up.");