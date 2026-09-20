const fs = require("fs");
const path = require("path");

const files = {
  "app/components/Navbar.js": `"use client";
import { useState } from "react";

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
          <button className="text-sm font-semibold px-4 py-2">Log in</button>
          <button className="text-sm font-semibold px-5 py-2 rounded-full bg-vexo-orange text-white">
            Get Started
          </button>
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
          <button className="text-left font-semibold text-white">Log in</button>
          <button className="text-sm font-semibold px-5 py-2 rounded-full bg-vexo-orange text-white w-fit">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
`,

  "app/components/Hero.js": `const trustList = [
  { icon: "🔒", title: "AES-256 Encryption", desc: "Military-grade encryption for all data at rest and in transit." },
  { icon: "🆔", title: "Biometric Auth", desc: "Face ID and fingerprint login for instant, passwordless access." },
  { icon: "👁", title: "24/7 Monitoring", desc: "Real-time anomaly detection with automated threat response." },
  { icon: "🧊", title: "Cold Storage 98%", desc: "Majority of assets held in air-gapped, offline cold wallets." },
  { icon: "🎖", title: "SOC2 Certified", desc: "Independently audited by Big-4 security firms every year." },
  { icon: "🛡", title: "$500M Insurance", desc: "Full asset coverage through leading global insurance policies." },
];

export default function Hero() {
  return (
    <section id="security" className="max-w-3xl mx-auto px-6 pt-16 pb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
        Your crypto, <span className="text-vexo-orange">Fort Knox</span> protected
      </h1>
      <p className="text-vexo-muted mt-5 text-lg">
        We obsess over security so you don't have to. Every layer of Vexo is engineered to protect your assets with the highest standards in the industry.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mt-10">
        {trustList.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-vexo-card2 border border-vexo-border flex items-center justify-center text-lg">
              {item.icon}
            </div>
            <div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-vexo-muted text-sm mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,

  "app/components/GetStartedPanel.js": `const stats = [
  { icon: "🛡", value: "248K+", label: "Active Users" },
  { icon: "📈", value: "$2.84B", label: "Assets Secured" },
  { icon: "⚡", value: "<0.1s", label: "Swap Execution" },
];

const bars = [20, 28, 24, 34, 40, 38, 48, 52, 60, 58, 68, 74];

export default function GetStartedPanel() {
  return (
    <section className="max-w-3xl mx-auto px-6 pb-20">
      <div className="flex flex-col gap-4">
        <button className="w-full py-4 rounded-2xl bg-vexo-orange text-white font-bold text-lg flex items-center justify-center gap-2">
          Create Free Account <span>→</span>
        </button>
        <button className="w-full py-4 rounded-2xl border border-vexo-border font-semibold text-lg">
          Sign In
        </button>
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

      <div className="mt-10 max-w-xs mx-auto bg-vexo-card border border-vexo-border rounded-[2.5rem] p-5">
        <div className="flex justify-between text-xs text-vexo-muted mb-6">
          <span>9:41</span>
          <span className="w-8 h-3 rounded-full bg-vexo-green" />
        </div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Total Balance</p>
        <p className="text-3xl font-bold mt-1">$67,894.23</p>
        <p className="text-vexo-green text-sm mt-1">▲ +$2,840 (+4.36%)</p>
        <div className="flex items-end gap-1.5 mt-6 h-20">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 bg-vexo-orange/80 rounded-t" style={{ height: \`\${h}%\` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
`,

  "app/components/PriceTicker.js": `const prices = [
  { symbol: "BTC", price: "$67,842.5", change: "+2.34%", up: true },
  { symbol: "ETH", price: "$3,542.8", change: "+1.87%", up: true },
  { symbol: "SOL", price: "$182.4", change: "+4.21%", up: true },
  { symbol: "XRP", price: "$0.6182", change: "-0.87%", up: false },
  { symbol: "ADA", price: "$0.4821", change: "-1.23%", up: false },
  { symbol: "DOGE", price: "$0.1634", change: "+3.45%", up: true },
  { symbol: "BNB", price: "$582.3", change: "+0.92%", up: true },
];

export default function PriceTicker() {
  const row = [...prices, ...prices];

  return (
    <div className="border-y border-vexo-border overflow-hidden bg-vexo-card">
      <div className="flex gap-10 py-3 px-6 animate-[scroll_25s_linear_infinite] w-max">
        {row.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-sm whitespace-nowrap">
            <span className="font-semibold">{p.symbol}</span>
            <span className="text-vexo-muted">{p.price}</span>
            <span className={p.up ? "text-vexo-green" : "text-red-400"}>{p.change}</span>
          </div>
        ))}
      </div>
      <style>{\`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      \`}</style>
    </div>
  );
}
`,

  "app/components/Features.js": `const features = [
  { icon: "🔒", title: "Bank-grade security", desc: "Your assets are protected with multi-layer encryption and cold storage." },
  { icon: "⚡", title: "Instant swaps", desc: "Trade between 120+ coins in seconds with the best available rates." },
  { icon: "📊", title: "Live portfolio tracking", desc: "See your gains, losses, and trends update in real time." },
  { icon: "🌍", title: "Global access", desc: "Use Vexo anywhere — no bank account or borders required." },
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-vexo-orange text-sm font-semibold text-center tracking-wide">WHY VEXO</p>
      <h2 className="text-3xl font-extrabold text-center mt-2">
        Everything you need to <span className="text-vexo-orange">master crypto</span>
      </h2>
      <p className="text-vexo-muted text-center mt-3 max-w-xl mx-auto">
        Built for crypto natives. Every feature crafted for power, simplicity, and trust.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {features.map((f) => (
          <div key={f.title} className="bg-vexo-card border border-vexo-border rounded-2xl p-6">
            <div className="w-11 h-11 rounded-xl bg-vexo-card2 flex items-center justify-center text-xl mb-4">
              {f.icon}
            </div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-vexo-muted text-sm mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
`,

  "app/components/MarketsTable.js": `"use client";
import { useState } from "react";

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
    <section id="markets" className="max-w-4xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={\`px-4 py-2 rounded-full text-sm font-semibold \${
                active === tab ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
              }\`}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="flex items-center gap-2 text-vexo-green text-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-vexo-green" /> Live
        </span>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4 md:px-6">
        <div className="flex justify-between text-vexo-muted text-xs uppercase tracking-wide py-3 border-b border-vexo-border">
          <span>Asset</span>
          <span>24h · Price</span>
        </div>
        {assets.map((a) => (
          <div key={a.symbol} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-vexo-card2 flex items-center justify-center">{a.icon}</div>
              <div>
                <p className="font-semibold text-sm">{a.symbol}</p>
                <p className="text-vexo-muted text-xs">{a.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={\`text-sm font-semibold \${a.up ? "text-vexo-green" : "text-red-400"}\`}>{a.change}</p>
              <p className="font-semibold text-sm">{a.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,

  "app/components/FAQ.js": `"use client";
import { useState } from "react";

const faqs = [
  { q: "How do I get started with Vexo?", a: "Create a free account, verify your email, and fund your wallet — you can be trading in under two minutes." },
  { q: "Is Vexo secure?", a: "Yes. We use AES-256 encryption, biometric login, 98% cold storage, and SOC2-audited infrastructure." },
  { q: "What cryptocurrencies are supported?", a: "Vexo supports 120+ coins including Bitcoin, Ethereum, Solana, and major stablecoins." },
  { q: "What are the fees?", a: "New accounts get zero trading fees for the first 30 days. After that, fees start at 0.1% per swap." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-vexo-orange text-sm font-semibold tracking-wide">FAQ</p>
      <h2 className="text-3xl font-extrabold mt-2">
        Got <span className="text-vexo-orange">questions?</span>
      </h2>
      <p className="text-vexo-muted mt-3">
        Everything you need to know about Vexo. Can't find what you're looking for? Our support team is available 24/7.
      </p>
      <button className="mt-6 px-6 py-3 rounded-full bg-vexo-orange text-white font-semibold">
        Contact Support
      </button>

      <div className="mt-10 flex flex-col gap-3">
        {faqs.map((item, i) => (
          <div key={item.q} className="border border-vexo-border rounded-2xl px-5 py-4">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="font-semibold text-sm">{item.q}</span>
              <span className="w-7 h-7 rounded-full bg-vexo-card2 flex items-center justify-center text-sm shrink-0">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <p className="text-vexo-muted text-sm mt-3">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
`,

  "app/components/CTASection.js": `export default function CTASection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-vexo-card border border-vexo-border rounded-3xl px-8 py-14 text-center">
        <p className="text-vexo-orange text-sm font-semibold tracking-wide">GET STARTED TODAY</p>
        <h2 className="text-3xl font-extrabold mt-3">
          Start your crypto journey — zero fees for 30 days
        </h2>
        <p className="text-vexo-muted mt-3">Join 248,000+ users already trading on Vexo.</p>
        <button className="mt-8 px-8 py-3 rounded-full bg-vexo-orange text-white font-semibold">
          Create Free Account
        </button>
      </div>
    </section>
  );
}
`,

  "app/components/Footer.js": `const columns = [
  { title: "Product", links: ["Features", "Markets", "Security", "Earn", "Crypto Card"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press", "Partners"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Licenses"] },
  { title: "Support", links: ["Help Center", "Contact Us", "Status Page", "Bug Bounty"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-vexo-border">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-vexo-orange flex items-center justify-center text-white font-bold">V</div>
          <p className="text-lg font-extrabold">Vexo</p>
        </div>
        <p className="text-vexo-muted text-sm mt-3 max-w-sm">
          The premium crypto exchange platform. Secure. Fast. Reimagined.
        </p>
        <div className="flex gap-3 mt-5">
          {["🌐", "✉️", "📡", "➤"].map((icon, i) => (
            <span key={i} className="w-9 h-9 rounded-lg bg-vexo-card2 border border-vexo-border flex items-center justify-center text-sm">
              {icon}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-wide text-vexo-muted mb-3">{col.title}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-vexo-muted hover:text-white">{link}</a>
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
    </footer>
  );
}
`,

  "app/page.js": `import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GetStartedPanel from "./components/GetStartedPanel";
import PriceTicker from "./components/PriceTicker";
import Features from "./components/Features";
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
      <Features />
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

console.log("\nDone! Landing page rebuilt with SwiftBit-inspired structure.");