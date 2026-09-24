const fs = require("fs");
const path = require("path");

// ============ 1. THEME (dark/light) ============

fs.writeFileSync(path.join(__dirname, "app/lib/theme.js"), `export function getTheme() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("vexo_theme") || "dark";
}

export function setTheme(theme) {
  if (typeof window === "undefined") return;
  localStorage.setItem("vexo_theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}
`, "utf8");
console.log("Created: app/lib/theme.js");

fs.writeFileSync(path.join(__dirname, "app/components/ThemeToggle.js"), `"use client";
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
      className={\`w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center \${className}\`}
      aria-label="Toggle dark/light mode"
    >
      {theme === "dark" ? <IconMoonStars size={17} /> : <IconSun size={17} />}
    </button>
  );
}
`, "utf8");
console.log("Created: app/components/ThemeToggle.js");

const cssPath = path.join(__dirname, "app/globals.css");
if (fs.existsSync(cssPath)) {
  const existing = fs.readFileSync(cssPath, "utf8");
  if (!existing.includes('[data-theme="light"]')) {
    fs.appendFileSync(cssPath, `
/* ---- Light mode overrides (added automatically, do not duplicate) ---- */
html[data-theme="light"] {
  --color-vexo-bg: #f5f6f8;
  --color-vexo-card: #ffffff;
  --color-vexo-card2: #eef0f3;
  --color-vexo-border: #e2e4e9;
  --color-vexo-muted: #6b7280;
}

html[data-theme="light"] body {
  background-color: #f5f6f8;
  color: #0a0a0b;
}
`, "utf8");
    console.log("Appended light-mode CSS overrides to: app/globals.css");
  } else {
    console.log("Light-mode CSS already present, skipped: app/globals.css");
  }
} else {
  console.log("WARNING: app/globals.css not found — could not append light mode styles.");
}

// ============ 2. LANGUAGE SWITCHER (now includes navbar labels too) ============

fs.writeFileSync(path.join(__dirname, "app/lib/i18n.js"), `"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const languages = [
  { code: "en", name: "English", flag: "gb" },
  { code: "es", name: "Espa\\u00f1ol", flag: "es" },
  { code: "fr", name: "Fran\\u00e7ais", flag: "fr" },
  { code: "ar", name: "\\u0627\\u0644\\u0639\\u0631\\u0628\\u064a\\u0629", flag: "sa" },
  { code: "zh", name: "\\u4e2d\\u6587", flag: "cn" },
];

const dictionary = {
  en: {
    overview: "Overview", users: "Users", wallets: "Wallets", transactions: "Transactions",
    deposits: "Deposits", withdrawals: "Withdrawals", billing: "Billing", settings: "Settings",
    auditLogs: "Audit Logs", roles: "Roles & Permissions", support: "Support Center",
    adminProfile: "Admin Profile", logout: "Log out", analytics: "Analytics",
    login: "Log in", signup: "Sign Up", getStarted: "Get Started", hello: "Hello",
    profile: "Profile", buy: "Buy", market: "Market", kyc: "KYC", transfer: "Transfer",
    walletConnect: "Wallet Connect", myWallet: "My Wallet", adminPanel: "Admin Panel",
    security: "Security", features: "Features", markets: "Markets", faq: "FAQ",
  },
  es: {
    overview: "Resumen", users: "Usuarios", wallets: "Billeteras", transactions: "Transacciones",
    deposits: "Dep\\u00f3sitos", withdrawals: "Retiros", billing: "Facturaci\\u00f3n", settings: "Ajustes",
    auditLogs: "Registros de auditor\\u00eda", roles: "Roles y permisos", support: "Centro de soporte",
    adminProfile: "Perfil de admin", logout: "Cerrar sesi\\u00f3n", analytics: "Anal\\u00edtica",
    login: "Iniciar sesi\\u00f3n", signup: "Registrarse", getStarted: "Comenzar", hello: "Hola",
    profile: "Perfil", buy: "Comprar", market: "Mercado", kyc: "KYC", transfer: "Transferir",
    walletConnect: "Conectar billetera", myWallet: "Mi billetera", adminPanel: "Panel de admin",
    security: "Seguridad", features: "Caracter\\u00edsticas", markets: "Mercados", faq: "Preguntas",
  },
  fr: {
    overview: "Aper\\u00e7u", users: "Utilisateurs", wallets: "Portefeuilles", transactions: "Transactions",
    deposits: "D\\u00e9p\\u00f4ts", withdrawals: "Retraits", billing: "Facturation", settings: "Param\\u00e8tres",
    auditLogs: "Journaux d'audit", roles: "R\\u00f4les et permissions", support: "Centre d'assistance",
    adminProfile: "Profil admin", logout: "D\\u00e9connexion", analytics: "Analytique",
    login: "Connexion", signup: "S'inscrire", getStarted: "Commencer", hello: "Bonjour",
    profile: "Profil", buy: "Acheter", market: "March\\u00e9", kyc: "KYC", transfer: "Transf\\u00e9rer",
    walletConnect: "Connecter le portefeuille", myWallet: "Mon portefeuille", adminPanel: "Panneau admin",
    security: "S\\u00e9curit\\u00e9", features: "Fonctionnalit\\u00e9s", markets: "March\\u00e9s", faq: "FAQ",
  },
  ar: {
    overview: "\\u0646\\u0638\\u0631\\u0629 \\u0639\\u0627\\u0645\\u0629", users: "\\u0627\\u0644\\u0645\\u0633\\u062a\\u062e\\u062f\\u0645\\u0648\\u0646",
    wallets: "\\u0627\\u0644\\u0645\\u062d\\u0627\\u0641\\u0638", transactions: "\\u0627\\u0644\\u0645\\u0639\\u0627\\u0645\\u0644\\u0627\\u062a",
    deposits: "\\u0627\\u0644\\u0625\\u064a\\u062f\\u0627\\u0639\\u0627\\u062a", withdrawals: "\\u0627\\u0644\\u0633\\u062d\\u0648\\u0628\\u0627\\u062a",
    billing: "\\u0627\\u0644\\u0641\\u0648\\u062a\\u0631\\u0629", settings: "\\u0627\\u0644\\u0625\\u0639\\u062f\\u0627\\u062f\\u0627\\u062a",
    auditLogs: "\\u0633\\u062c\\u0644\\u0627\\u062a \\u0627\\u0644\\u062a\\u062f\\u0642\\u064a\\u0642", roles: "\\u0627\\u0644\\u0623\\u062f\\u0648\\u0627\\u0631 \\u0648\\u0627\\u0644\\u0635\\u0644\\u0627\\u062d\\u064a\\u0627\\u062a",
    support: "\\u0645\\u0631\\u0643\\u0632 \\u0627\\u0644\\u062f\\u0639\\u0645", adminProfile: "\\u0645\\u0644\\u0641 \\u0627\\u0644\\u0645\\u0634\\u0631\\u0641",
    logout: "\\u062a\\u0633\\u062c\\u064a\\u0644 \\u0627\\u0644\\u062e\\u0631\\u0648\\u062c", analytics: "\\u0627\\u0644\\u062a\\u062d\\u0644\\u064a\\u0644\\u0627\\u062a",
    login: "\\u062a\\u0633\\u062c\\u064a\\u0644 \\u0627\\u0644\\u062f\\u062e\\u0648\\u0644", signup: "\\u0625\\u0646\\u0634\\u0627\\u0621 \\u062d\\u0633\\u0627\\u0628", getStarted: "\\u0627\\u0628\\u062f\\u0623 \\u0627\\u0644\\u0622\\u0646",
    hello: "\\u0645\\u0631\\u062d\\u0628\\u064b\\u0627", profile: "\\u0627\\u0644\\u0645\\u0644\\u0641 \\u0627\\u0644\\u0634\\u062e\\u0635\\u064a", buy: "\\u0634\\u0631\\u0627\\u0621",
    market: "\\u0627\\u0644\\u0633\\u0648\\u0642", kyc: "\\u0627\\u0644\\u062a\\u062d\\u0642\\u0642 \\u0645\\u0646 \\u0627\\u0644\\u0647\\u0648\\u064a\\u0629", transfer: "\\u062a\\u062d\\u0648\\u064a\\u0644",
    walletConnect: "\\u0631\\u0628\\u0637 \\u0627\\u0644\\u0645\\u062d\\u0641\\u0638\\u0629", myWallet: "\\u0645\\u062d\\u0641\\u0638\\u062a\\u064a", adminPanel: "\\u0644\\u0648\\u062d\\u0629 \\u0627\\u0644\\u0625\\u062f\\u0627\\u0631\\u0629",
    security: "\\u0627\\u0644\\u0623\\u0645\\u0627\\u0646", features: "\\u0627\\u0644\\u0645\\u064a\\u0632\\u0627\\u062a", markets: "\\u0627\\u0644\\u0623\\u0633\\u0648\\u0627\\u0642", faq: "\\u0627\\u0644\\u0623\\u0633\\u0626\\u0644\\u0629 \\u0627\\u0644\\u0634\\u0627\\u0626\\u0639\\u0629",
  },
  zh: {
    overview: "\\u6982\\u89c8", users: "\\u7528\\u6237", wallets: "\\u94b1\\u5305", transactions: "\\u4ea4\\u6613",
    deposits: "\\u5145\\u503c", withdrawals: "\\u63d0\\u73b0", billing: "\\u8d26\\u5355", settings: "\\u8bbe\\u7f6e",
    auditLogs: "\\u5ba1\\u8ba1\\u65e5\\u5fd7", roles: "\\u89d2\\u8272\\u4e0e\\u6743\\u9650", support: "\\u652f\\u6301\\u4e2d\\u5fc3",
    adminProfile: "\\u7ba1\\u7406\\u5458\\u8d44\\u6599", logout: "\\u9000\\u51fa\\u767b\\u5f55", analytics: "\\u6570\\u636e\\u5206\\u6790",
    login: "\\u767b\\u5f55", signup: "\\u6ce8\\u518c", getStarted: "\\u5f00\\u59cb\\u4f7f\\u7528", hello: "\\u4f60\\u597d",
    profile: "\\u4e2a\\u4eba\\u8d44\\u6599", buy: "\\u8d2d\\u4e70", market: "\\u5e02\\u573a", kyc: "\\u8eab\\u4efd\\u9a8c\\u8bc1",
    transfer: "\\u8f6c\\u8d26", walletConnect: "\\u94b1\\u5305\\u8fde\\u63a5", myWallet: "\\u6211\\u7684\\u94b1\\u5305", adminPanel: "\\u7ba1\\u7406\\u9762\\u677f",
    security: "\\u5b89\\u5168", features: "\\u529f\\u80fd", markets: "\\u5e02\\u573a\\u884c\\u60c5", faq: "\\u5e38\\u89c1\\u95ee\\u9898",
  },
};

const LanguageContext = createContext({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("vexo_lang");
    if (saved && dictionary[saved]) setLangState(saved);
  }, []);

  const setLang = (code) => {
    setLangState(code);
    localStorage.setItem("vexo_lang", code);
    document.documentElement.setAttribute("dir", code === "ar" ? "rtl" : "ltr");
  };

  const t = (key) => (dictionary[lang] && dictionary[lang][key]) || dictionary.en[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
`, "utf8");
console.log("Created: app/lib/i18n.js");

fs.writeFileSync(path.join(__dirname, "app/components/LanguageSwitcher.js"), `"use client";
import { useState } from "react";
import { IconWorld } from "@tabler/icons-react";
import { languages, useLanguage } from "../lib/i18n";

function Flag({ code }) {
  return (
    <img
      src={\`https://flagcdn.com/w40/\${code}.png\`}
      alt={code}
      className="w-5 h-3.5 object-cover rounded-sm"
    />
  );
}

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div className={\`relative \${className}\`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center"
        aria-label="Change language"
      >
        <IconWorld size={17} />
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} className="fixed inset-0 z-40" />
          <div className="absolute right-0 mt-2 w-44 bg-vexo-card border border-vexo-border rounded-xl shadow-lg z-50 py-1">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={\`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-vexo-card2 \${
                  l.code === current.code ? "text-vexo-orange font-semibold" : ""
                }\`}
              >
                <Flag code={l.flag} /> {l.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
`, "utf8");
console.log("Created: app/components/LanguageSwitcher.js");

// ============ 3. Admin navbar ============

fs.writeFileSync(path.join(__dirname, "app/components/AdminNavbar.js"), `"use client";
import { useState } from "react";
import { IconShieldLock, IconMenu2 } from "@tabler/icons-react";
import AdminDrawer from "./AdminDrawer";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default function AdminNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-vexo-bg/95 backdrop-blur border-b border-vexo-border">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-vexo-orange/15 flex items-center justify-center">
              <IconShieldLock size={18} className="text-vexo-orange" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Vexo</p>
              <p className="text-[10px] text-vexo-muted leading-none mt-0.5">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center"
            >
              <IconMenu2 size={18} />
            </button>
          </div>
        </div>
      </header>

      <AdminDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
`, "utf8");
console.log("Updated: app/components/AdminNavbar.js");

// ============ 4. User dashboard floating bar ============

fs.writeFileSync(path.join(__dirname, "app/dashboard/layout.js"), `"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconMenu2 } from "@tabler/icons-react";
import { getSession } from "../lib/auth";
import UserDrawer from "../components/UserDrawer";
import ThemeToggle from "../components/ThemeToggle";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/login");
      return;
    }
    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-vexo-bg text-white relative">
      <div className="fixed top-4 right-4 z-30 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-10 h-10 rounded-full bg-vexo-card border border-vexo-border flex items-center justify-center"
        >
          <IconMenu2 size={18} />
        </button>
      </div>

      {children}

      <UserDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
`, "utf8");
console.log("Updated: app/dashboard/layout.js");

// ============ 5. Root layout — matches your ORIGINAL exactly ============

fs.writeFileSync(path.join(__dirname, "app/layout.js"), `import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./lib/i18n";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito-sans",
});

export const metadata = {
  title: "Vexo — Crypto Wallet",
  description: "A modern crypto wallet dashboard.",
};

const themeInitScript = \`
(function() {
  try {
    var theme = localStorage.getItem("vexo_theme") || "dark";
    document.documentElement.setAttribute("data-theme", theme);
    var lang = localStorage.getItem("vexo_lang") || "en";
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  } catch (e) {}
})();
\`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={\`\${nunitoSans.variable} font-sans antialiased\`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
`, "utf8");
console.log("Created: app/layout.js");

// ============ 6. Landing page Navbar — your exact layout, with theme + language added ============

fs.writeFileSync(path.join(__dirname, "app/components/Navbar.js"), `"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../lib/i18n";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

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
          <a href="#security" className="hover:text-white transition-colors duration-200">{t("security")}</a>
          <a href="#features" className="hover:text-white transition-colors duration-200">{t("features")}</a>
          <a href="#markets" className="hover:text-white transition-colors duration-200">{t("markets")}</a>
          <a href="#faq" className="hover:text-white transition-colors duration-200">{t("faq")}</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/login" className="text-sm font-semibold px-4 py-2 transition-transform duration-200 hover:scale-105 inline-block">{t("login")}</Link>
          <Link href="/signup" className="text-sm font-semibold px-5 py-2 rounded-full bg-vexo-orange text-white transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] inline-block">
            {t("getStarted")}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-lg bg-vexo-card2 border border-vexo-border flex items-center justify-center transition-transform duration-200 active:scale-90"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 px-4 sm:px-6 pb-6 text-sm text-vexo-muted animate-[fadeIn_0.25s_ease-out]">
          <a href="#security" onClick={() => setOpen(false)}>{t("security")}</a>
          <a href="#features" onClick={() => setOpen(false)}>{t("features")}</a>
          <a href="#markets" onClick={() => setOpen(false)}>{t("markets")}</a>
          <a href="#faq" onClick={() => setOpen(false)}>{t("faq")}</a>
          <Link href="/login" onClick={() => setOpen(false)} className="text-left font-semibold text-white">{t("login")}</Link>
          <Link href="/signup" onClick={() => setOpen(false)} className="text-sm font-semibold px-5 py-2 rounded-full bg-vexo-orange text-white w-fit">
            {t("getStarted")}
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
`, "utf8");
console.log("Updated: app/components/Navbar.js (theme + language switcher added, nav labels now translate)");

console.log("\\nDone!");
