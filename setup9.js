const fs = require("fs");
const path = require("path");

const files = {
  "app/components/Reveal.js": `"use client";
import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, y = 28, scale = 0.94, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
`,

  "app/components/SupportedNetworks.js": `import Reveal from "./Reveal";

const networks = [
  { symbol: "₿", name: "Bitcoin" },
  { symbol: "Ξ", name: "Ethereum" },
  { symbol: "◈", name: "Polygon" },
  { symbol: "◎", name: "Solana" },
  { symbol: "B", name: "BNB Chain" },
  { symbol: "A", name: "Arbitrum" },
  { symbol: "O", name: "Optimism" },
  { symbol: "8", name: "Base" },
];

export default function SupportedNetworks() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-vexo-orange text-sm font-semibold text-center tracking-wide">MULTI-CHAIN SUPPORT</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mt-2">
          One wallet, <span className="text-vexo-orange">every major chain</span>
        </h2>
        <p className="text-vexo-muted text-center mt-3 max-w-xl mx-auto">
          Move seamlessly across the networks you already use — no bridging headaches, no extra apps.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10">
        {networks.map((n, i) => (
          <Reveal key={n.name} delay={i * 0.06}>
            <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4 sm:p-5 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-vexo-orange/50 hover:shadow-[0_0_24px_rgba(34,197,94,0.15)]">
              <div className="w-10 h-10 rounded-full bg-vexo-card2 flex items-center justify-center font-bold shrink-0">
                {n.symbol}
              </div>
              <p className="font-semibold text-sm truncate">{n.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
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

      <style>{\`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      \`}</style>
    </header>
  );
}
`,

  "app/components/Hero.js": `import Reveal from "./Reveal";

const trustList = [
  { icon: "🔒", title: "AES-256 Encryption", desc: "Military-grade encryption for all data at rest and in transit." },
  { icon: "🆔", title: "Biometric Auth", desc: "Face ID and fingerprint login for instant, passwordless access." },
  { icon: "👁", title: "24/7 Monitoring", desc: "Real-time anomaly detection with automated threat response." },
  { icon: "🧊", title: "Cold Storage 98%", desc: "Majority of assets held in air-gapped, offline cold wallets." },
  { icon: "🎖", title: "SOC2 Certified", desc: "Independently audited by Big-4 security firms every year." },
  { icon: "🛡", title: "$500M Insurance", desc: "Full asset coverage through leading global insurance policies." },
];

export default function Hero() {
  return (
    <section id="security" className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-12">
      <Reveal y={20} scale={0.97}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Your crypto, <span className="text-vexo-orange">Fort Knox</span> protected
        </h1>
        <p className="text-vexo-muted mt-5 text-base sm:text-lg">
          We obsess over security so you don't have to. Every layer of Vexo is engineered to protect your assets with the highest standards in the industry.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-6 mt-10">
        {trustList.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} y={16}>
            <div className="flex items-start gap-3 group">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-vexo-card2 border border-vexo-border flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-vexo-orange/50">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-vexo-muted text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
`,

  "app/components/GetStartedPanel.js": `import Link from "next/link";
import Reveal from "./Reveal";

const stats = [
  { icon: "🛡", value: "248K+", label: "Active Users" },
  { icon: "📈", value: "$2.84B", label: "Assets Secured" },
  { icon: "⚡", value: "<0.1s", label: "Swap Execution" },
];

const bars = [20, 28, 24, 34, 40, 38, 48, 52, 60, 58, 68, 74];

export default function GetStartedPanel() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
      <Reveal>
        <div className="flex flex-col gap-4">
          <Link href="/signup" className="w-full py-4 rounded-2xl bg-vexo-orange text-white font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(34,197,94,0.4)] active:scale-[0.98]">
            Create Free Account <span>→</span>
          </Link>
          <Link href="/login" className="w-full py-4 rounded-2xl border border-vexo-border font-semibold text-lg text-center transition-all duration-300 hover:border-vexo-orange/50 hover:bg-vexo-card">
            Sign In
          </Link>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="flex items-center gap-3 bg-vexo-card border border-vexo-border rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-vexo-orange/40">
              <div className="w-9 h-9 rounded-lg bg-vexo-card2 flex items-center justify-center text-lg">
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-lg leading-tight">{s.value}</p>
                <p className="text-vexo-muted text-xs">{s.label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} y={36}>
        <div className="mt-10 max-w-sm sm:max-w-md mx-auto bg-vexo-card border border-vexo-border rounded-[2.5rem] p-6 sm:p-8 transition-transform duration-500 hover:scale-[1.015]">
          <div className="flex justify-between text-xs text-vexo-muted mb-8">
            <span>9:41</span>
            <span className="w-8 h-3 rounded-full bg-vexo-green" />
          </div>
          <p className="text-vexo-muted text-xs uppercase tracking-wide">Total Balance</p>
          <p className="text-3xl sm:text-4xl font-bold mt-2">$67,894.23</p>
          <p className="text-vexo-green text-sm mt-2">▲ +$2,840 (+4.36%)</p>
          <div className="flex items-end gap-1.5 sm:gap-2 mt-10 h-32 sm:h-40">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 bg-vexo-orange/80 rounded-t transition-all duration-700" style={{ height: \`\${h}%\` }} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
`,

  "app/components/Features.js": `import Reveal from "./Reveal";

const features = [
  { icon: "🔒", title: "Bank-grade security", desc: "Your assets are protected with multi-layer encryption and cold storage." },
  { icon: "⚡", title: "Instant swaps", desc: "Trade between 120+ coins in seconds with the best available rates." },
  { icon: "📊", title: "Live portfolio tracking", desc: "See your gains, losses, and trends update in real time." },
  { icon: "🌍", title: "Global access", desc: "Use Vexo anywhere — no bank account or borders required." },
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-vexo-orange text-sm font-semibold text-center tracking-wide">WHY VEXO</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mt-2">
          Everything you need to <span className="text-vexo-orange">master crypto</span>
        </h2>
        <p className="text-vexo-muted text-center mt-3 max-w-xl mx-auto">
          Built for crypto natives. Every feature crafted for power, simplicity, and trust.
        </p>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1}>
            <div className="bg-vexo-card border border-vexo-border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-vexo-orange/40 hover:shadow-[0_8px_30px_rgba(34,197,94,0.12)] group">
              <div className="w-11 h-11 rounded-xl bg-vexo-card2 flex items-center justify-center text-xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-vexo-muted text-sm mt-2">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
`,

  "app/components/Testimonials.js": `import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Day Trader",
    quote: "Vexo's swap speed is unreal — I've never had a trade lag during a volatile market. The dashboard is the cleanest I've used.",
    rating: 5,
  },
  {
    name: "Marcus Ade",
    role: "Long-term Holder",
    quote: "The security features finally let me sleep at night. Cold storage plus biometric login is exactly what I needed.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Crypto Newcomer",
    quote: "I was intimidated by crypto until I tried Vexo. The interface made everything click within minutes.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-vexo-orange text-sm font-semibold text-center tracking-wide">TESTIMONIALS</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mt-2">
          Loved by <span className="text-vexo-orange">traders everywhere</span>
        </h2>
        <p className="text-vexo-muted text-center mt-3 max-w-xl mx-auto">
          Don't just take our word for it — here's what real Vexo users have to say.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.12}>
            <div className="bg-vexo-card border border-vexo-border rounded-2xl p-6 flex flex-col gap-4 h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-vexo-orange/40">
              <div className="flex gap-1 text-vexo-orange text-sm">
                {"★".repeat(t.rating)}
              </div>
              <p className="text-sm text-white leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-auto pt-2">
                <div className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-vexo-muted text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
`,

  "app/components/MarketsTable.js": `"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const tabs = ["All", "DeFi", "Layer 1", "Stablecoins"];

const assets = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", change: "+2.34%", price: "$67,842.5", up: true },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", change: "+1.87%", price: "$3,542.8", up: true },
  { symbol: "SOL", name: "Solana", icon: "◎", change: "+4.21%", price: "$182.4", up: true },
  { symbol: "XRP", name: "XRP", icon: "✕", change: "-0.87%", price: "$0.6182", up: false },
  { symbol: "ADA", name: "Cardano", icon: "𝔸", change: "-1.23%", price: "$0.4821", up: false },
  { symbol: "DOGE", name: "Dogecoin", icon: "Ð", change: "+3.45%", price: "$0.1634", up: true },
  { symbol: "USDT", name: "Tether", icon: "₮", change: "+0.01%", price: "$1.00", up: true },
  { symbol: "BNB", name: "BNB", icon: "B", change: "+0.92%", price: "$582.3", up: true },
];

export default function MarketsTable() {
  const [active, setActive] = useState("All");

  return (
    <section id="markets" className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={\`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 \${
                  active === tab ? "bg-vexo-orange text-white scale-105" : "bg-vexo-card2 text-vexo-muted hover:text-white"
                }\`}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-2 text-vexo-green text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-vexo-green animate-pulse" /> Live
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-3 sm:px-6">
          <div className="flex justify-between text-vexo-muted text-xs uppercase tracking-wide py-3 border-b border-vexo-border">
            <span>Asset</span>
            <span>24h · Price</span>
          </div>
          {assets.map((a) => (
            <div key={a.symbol} className="flex items-center justify-between gap-2 py-4 border-b border-vexo-border last:border-none transition-colors duration-200 hover:bg-vexo-card2/50 rounded-lg px-2 -mx-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-vexo-card2 flex items-center justify-center shrink-0">{a.icon}</div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{a.symbol}</p>
                  <p className="text-vexo-muted text-xs truncate">{a.name}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={\`text-sm font-semibold \${a.up ? "text-vexo-green" : "text-red-400"}\`}>{a.change}</p>
                <p className="font-semibold text-sm">{a.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
`,

  "app/components/FAQ.js": `"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  { q: "How do I get started with Vexo?", a: "Create a free account, verify your email, and fund your wallet — you can be trading in under two minutes." },
  { q: "Is Vexo secure?", a: "Yes. We use AES-256 encryption, biometric login, 98% cold storage, and SOC2-audited infrastructure." },
  { q: "What cryptocurrencies are supported?", a: "Vexo supports 120+ coins including Bitcoin, Ethereum, Solana, and major stablecoins." },
  { q: "What are the fees?", a: "New accounts get zero trading fees for the first 30 days. After that, fees start at 0.1% per swap." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-vexo-orange text-sm font-semibold tracking-wide">FAQ</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">
          Got <span className="text-vexo-orange">questions?</span>
        </h2>
        <p className="text-vexo-muted mt-3">
          Everything you need to know about Vexo. Can't find what you're looking for? Our support team is available 24/7.
        </p>
        <button className="mt-6 px-6 py-3 rounded-full bg-vexo-orange text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
          Contact Support
        </button>
      </Reveal>

      <div className="mt-10 flex flex-col gap-3">
        {faqs.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.08} y={12}>
            <div className="border border-vexo-border rounded-2xl px-4 sm:px-5 py-4 transition-colors duration-300 hover:border-vexo-orange/40">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 text-left"
              >
                <span className="font-semibold text-sm">{item.q}</span>
                <span className={\`w-7 h-7 rounded-full bg-vexo-card2 flex items-center justify-center text-sm shrink-0 transition-transform duration-300 \${openIndex === i ? "rotate-45" : ""}\`}>
                  +
                </span>
              </button>
              <div
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="text-vexo-muted text-sm mt-3">{item.a}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
`,

  "app/components/CTASection.js": `import Link from "next/link";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <Reveal scale={0.92}>
        <div className="bg-vexo-card border border-vexo-border rounded-3xl px-6 sm:px-8 py-10 sm:py-14 text-center transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(34,197,94,0.12)]">
          <p className="text-vexo-orange text-sm font-semibold tracking-wide">GET STARTED TODAY</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
            Start your crypto journey — zero fees for 30 days
          </h2>
          <p className="text-vexo-muted mt-3">Join 248,000+ users already trading on Vexo.</p>
          <Link href="/signup" className="mt-8 inline-block px-8 py-3 rounded-full bg-vexo-orange text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(34,197,94,0.4)]">
            Create Free Account
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
`,

  "app/components/Footer.js": `import Reveal from "./Reveal";

const columns = [
  { title: "Product", links: ["Features", "Markets", "Security", "Earn", "Crypto Card"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press", "Partners"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Licenses"] },
  { title: "Support", links: ["Help Center", "Contact Us", "Status Page", "Bug Bounty"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-vexo-border">
      <Reveal y={16} scale={1}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-vexo-orange flex items-center justify-center text-white font-bold">V</div>
            <p className="text-lg font-extrabold">Vexo</p>
          </div>
          <p className="text-vexo-muted text-sm mt-3 max-w-sm">
            The premium crypto exchange platform. Secure. Fast. Reimagined.
          </p>
          <div className="flex gap-3 mt-5">
            {["🌐", "✉️", "📡", "➤"].map((icon, i) => (
              <span key={i} className="w-9 h-9 rounded-lg bg-vexo-card2 border border-vexo-border flex items-center justify-center text-sm transition-all duration-200 hover:scale-110 hover:border-vexo-orange/50 cursor-pointer">
                {icon}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-10">
            {columns.map((col) => (
              <div key={col.title} className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-vexo-muted mb-3">{col.title}</p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-vexo-muted hover:text-white transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-vexo-border mt-10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-vexo-muted text-xs">
            <p>© 2026 Vexo Technologies Ltd. All rights reserved.</p>
            <p>Regulated by FCA & MiCA</p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
`,

  "app/page.js": `import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GetStartedPanel from "./components/GetStartedPanel";
import PriceTicker from "./components/PriceTicker";
import SupportedNetworks from "./components/SupportedNetworks";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import MarketsTable from "./components/MarketsTable";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <GetStartedPanel />
      <PriceTicker />
      <SupportedNetworks />
      <Features />
      <Testimonials />
      <MarketsTable />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
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

console.log("\nDone! Added Multi-Chain Support card section, plus scroll fade+zoom animations (Reveal component) and hover/transition effects across the entire landing page.");