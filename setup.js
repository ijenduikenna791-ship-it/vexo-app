const fs = require("fs");
const path = require("path");

const files = {
  "app/layout.js": `import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito-sans",
});

export const metadata = {
  title: "Vexo — Crypto Wallet",
  description: "A modern crypto wallet dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={\`\${nunitoSans.variable} font-sans antialiased\`}>
        {children}
      </body>
    </html>
  );
}
`,

  "app/globals.css": `@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-nunito-sans);

  --color-vexo-bg: #0a0a0b;
  --color-vexo-card: #161618;
  --color-vexo-card2: #1e1e21;
  --color-vexo-border: #2a2a2e;
  --color-vexo-muted: #8a8a8e;
  --color-vexo-green: #22c55e;
  --color-vexo-orange: #f5590e;
}

html,
body {
  background-color: #0a0a0b;
  color: #ffffff;
}
`,

  "app/components/Sparkline.js": `export default function Sparkline({ data, color = "#22c55e", width = 100, height = 32 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return \`\${x},\${y}\`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={\`0 0 \${width} \${height}\`} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
`,

  "app/components/CoinCard.js": `import Sparkline from "./Sparkline";

export default function CoinCard({ name, symbol, price, change, changePercent, trend, sparkline, icon }) {
  const isUp = trend === "up";
  const color = isUp ? "#22c55e" : "#ef4444";

  return (
    <div className="bg-vexo-card border border-vexo-border rounded-2xl p-4 flex flex-col gap-3 min-w-[160px]">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-vexo-card2 flex items-center justify-center text-lg">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">{name}</p>
          <p className="text-vexo-muted text-xs">{symbol}</p>
        </div>
      </div>
      <Sparkline data={sparkline} color={color} width={120} height={36} />
      <div>
        <p className="font-bold text-lg">\${price}</p>
        <p className="text-xs" style={{ color }}>
          {isUp ? "+" : ""}{change} · {isUp ? "+" : ""}{changePercent}%
        </p>
      </div>
    </div>
  );
}
`,

  "app/components/CoinRow.js": `import Sparkline from "./Sparkline";

export default function CoinRow({ name, symbol, price, change, changePercent, trend, sparkline, icon }) {
  const isUp = trend === "up";
  const color = isUp ? "#22c55e" : "#ef4444";

  return (
    <div className="flex items-center justify-between py-3 border-b border-vexo-border last:border-none">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-vexo-card2 flex items-center justify-center text-lg">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-vexo-muted text-xs">{symbol}</p>
        </div>
      </div>
      <Sparkline data={sparkline} color={color} width={70} height={24} />
      <div className="text-right">
        <p className="font-semibold text-sm">\${price}</p>
        <p className="text-xs" style={{ color }}>
          {isUp ? "+" : ""}{change} · {isUp ? "+" : ""}{changePercent}%
        </p>
      </div>
    </div>
  );
}
`,

  "app/components/BalanceCard.js": `export default function BalanceCard({ name, email, balance, pnl, pnlPercent }) {
  return (
    <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-vexo-card2" />
          <div>
            <p className="font-semibold text-sm">Hello, {name}!</p>
            <p className="text-vexo-muted text-xs">{email}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-vexo-green text-sm font-semibold">+\${pnl}</p>
          <p className="text-vexo-green text-xs">+{pnlPercent}%</p>
        </div>
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Main Portfolio</p>
        <p className="text-3xl font-bold mt-1">\${balance}</p>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-vexo-card2 border border-vexo-border rounded-full py-2.5 text-sm font-semibold">
          ↑ Withdraw
        </button>
        <button className="flex-1 bg-white text-black rounded-full py-2.5 text-sm font-semibold">
          ↓ Deposit
        </button>
      </div>
    </div>
  );
}
`,

  "app/components/BottomNav.js": `export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-vexo-card border-t border-vexo-border">
      <div className="max-w-md mx-auto flex items-center justify-between px-6 py-3 relative">
        <button className="flex flex-col items-center gap-1 text-white text-xs">
          <span>🏠</span>
          Home
        </button>
        <button className="flex flex-col items-center gap-1 text-vexo-muted text-xs">
          <span>💳</span>
          Wallet
        </button>

        <button className="absolute left-1/2 -translate-x-1/2 -top-5 w-12 h-12 rounded-full bg-vexo-orange flex items-center justify-center text-white text-lg shadow-lg">
          ⇄
        </button>

        <button className="flex flex-col items-center gap-1 text-vexo-muted text-xs">
          <span>📊</span>
          Analytics
        </button>
        <button className="flex flex-col items-center gap-1 text-vexo-muted text-xs">
          <span>⚙️</span>
          Settings
        </button>
      </div>
    </nav>
  );
}
`,

  "app/components/Navbar.js": `export default function Navbar() {
  return (
    <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
      <p className="text-xl font-extrabold">Vexo</p>
      <nav className="hidden md:flex items-center gap-8 text-sm text-vexo-muted">
        <a href="#features" className="hover:text-white">Features</a>
        <a href="#how-it-works" className="hover:text-white">How it works</a>
        <a href="#" className="hover:text-white">Pricing</a>
      </nav>
      <div className="flex items-center gap-3">
        <button className="text-sm font-semibold px-4 py-2">Log in</button>
        <button className="text-sm font-semibold px-5 py-2 rounded-full bg-vexo-orange text-white">
          Get Started
        </button>
      </div>
    </header>
  );
}
`,

  "app/components/Hero.js": `export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          The modern way to manage your crypto.
        </h1>
        <p className="text-vexo-muted mt-5 text-lg">
          Track, swap, and grow your portfolio across every major coin — all in one clean, secure wallet.
        </p>
        <div className="flex gap-4 mt-8">
          <button className="px-6 py-3 rounded-full bg-vexo-orange text-white font-semibold">
            Get Started Free
          </button>
          <button className="px-6 py-3 rounded-full border border-vexo-border font-semibold">
            See how it works
          </button>
        </div>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-3xl p-6">
        <p className="text-vexo-muted text-xs uppercase tracking-wide">Main Portfolio</p>
        <p className="text-4xl font-bold mt-2">$5,271.39</p>
        <p className="text-vexo-green text-sm mt-1">+$2,979.23 · +130.62%</p>
        <div className="flex gap-3 mt-6">
          <div className="flex-1 bg-vexo-card2 border border-vexo-border rounded-2xl p-4">
            <p className="text-sm font-semibold">Bitcoin</p>
            <p className="text-lg font-bold mt-1">$27,642.01</p>
            <p className="text-vexo-green text-xs">+0.97%</p>
          </div>
          <div className="flex-1 bg-vexo-card2 border border-vexo-border rounded-2xl p-4">
            <p className="text-sm font-semibold">Ethereum</p>
            <p className="text-lg font-bold mt-1">$1,666.36</p>
            <p className="text-vexo-green text-xs">+0.01%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
`,

  "app/components/StatsBar.js": `const stats = [
  { label: "Assets under management", value: "$2.4B+" },
  { label: "Active users", value: "500K+" },
  { label: "Supported coins", value: "120+" },
  { label: "Countries", value: "40+" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-vexo-border">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl md:text-3xl font-extrabold">{stat.value}</p>
            <p className="text-vexo-muted text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
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
      <h2 className="text-3xl font-extrabold text-center">Everything you need, in one wallet</h2>
      <p className="text-vexo-muted text-center mt-3 max-w-xl mx-auto">
        Vexo brings together tracking, trading, and security in a single modern dashboard.
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

  "app/components/HowItWorks.js": `const steps = [
  { number: "01", title: "Create your wallet", desc: "Sign up in under two minutes — no paperwork needed." },
  { number: "02", title: "Fund your account", desc: "Deposit crypto or buy directly with a card or bank transfer." },
  { number: "03", title: "Track & trade", desc: "Watch your portfolio grow and swap coins whenever you want." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-extrabold text-center">How it works</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {steps.map((s) => (
          <div key={s.number} className="border border-vexo-border rounded-2xl p-6">
            <p className="text-vexo-orange font-extrabold text-2xl">{s.number}</p>
            <h3 className="font-semibold text-lg mt-3">{s.title}</h3>
            <p className="text-vexo-muted text-sm mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
`,

  "app/components/CTASection.js": `export default function CTASection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="bg-vexo-card border border-vexo-border rounded-3xl px-8 py-14 text-center">
        <h2 className="text-3xl font-extrabold">Start managing your crypto today</h2>
        <p className="text-vexo-muted mt-3">Join thousands of users already growing their portfolio with Vexo.</p>
        <button className="mt-8 px-8 py-3 rounded-full bg-vexo-orange text-white font-semibold">
          Get Started Free
        </button>
      </div>
    </section>
  );
}
`,

  "app/components/Footer.js": `export default function Footer() {
  return (
    <footer className="border-t border-vexo-border">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6">
        <p className="font-extrabold text-lg">Vexo</p>
        <div className="flex gap-8 text-sm text-vexo-muted">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how-it-works" className="hover:text-white">How it works</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
        <p className="text-vexo-muted text-sm">© 2026 Vexo. All rights reserved.</p>
      </div>
    </footer>
  );
}
`,

  "app/page.js": `import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
`,

  "app/dashboard/page.js": `import BalanceCard from "../components/BalanceCard";
import CoinCard from "../components/CoinCard";
import CoinRow from "../components/CoinRow";
import BottomNav from "../components/BottomNav";

const myFunds = [
  { name: "Bitcoin", symbol: "BTC", icon: "₿", price: "27,642.01", change: "268.12", changePercent: "0.97", trend: "up", sparkline: [10, 12, 11, 14, 16, 15, 18, 20] },
  { name: "Ethereum", symbol: "ETH", icon: "Ξ", price: "1,666.36", change: "0.16", changePercent: "0.01", trend: "up", sparkline: [8, 9, 8, 10, 12, 11, 13, 14] },
];

const coinList = [
  { name: "Polygon", symbol: "MATIC", icon: "◈", price: "0.51", change: "0.02", changePercent: "0.49", trend: "down", sparkline: [14, 12, 15, 11, 13, 10, 12, 9] },
  { name: "Tether", symbol: "USDT", icon: "₮", price: "1.1", change: "0.1", changePercent: "0.1", trend: "up", sparkline: [9, 10, 9, 11, 10, 12, 13, 14] },
  { name: "Chainlink", symbol: "LINK", icon: "⬡", price: "7.72", change: "0.05", changePercent: "0.72", trend: "down", sparkline: [13, 11, 12, 10, 11, 9, 8, 7] },
];

export default function Dashboard() {
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <BalanceCard name="Norman" email="n.osborn@shakuro.com" balance="5,271.39" pnl="2,979.23" pnlPercent="130.62" />

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-3">My Funds</p>
        <div className="flex gap-3 overflow-x-auto">
          {myFunds.map((coin) => (
            <CoinCard key={coin.symbol} {...coin} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">Most Popular</p>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {coinList.map((coin) => (
            <CoinRow key={coin.symbol} {...coin} />
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
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

console.log("\nDone! All Vexo files created.");