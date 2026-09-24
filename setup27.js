const fs = require("fs");
const path = require("path");

// ============ 1. Fix light-mode CSS: override the actual utility classes ============

const cssPath = path.join(__dirname, "app/globals.css");
let css = fs.readFileSync(cssPath, "utf8");

// Remove the old (non-working) variable-based block if present.
css = css.replace(
  /\n\/\* ---- Light mode overrides \(added automatically, do not duplicate\) ---- \*\/[\s\S]*?html\[data-theme="light"\] body \{[\s\S]*?\}\n/,
  ""
);

css += `
/* ---- Light mode overrides v2 (overrides compiled utility classes directly) ---- */
html[data-theme="light"] body {
  background-color: #f5f6f8 !important;
  color: #0a0a0b !important;
}
html[data-theme="light"] .bg-vexo-bg { background-color: #f5f6f8 !important; }
html[data-theme="light"] .bg-vexo-card { background-color: #ffffff !important; }
html[data-theme="light"] .bg-vexo-card2 { background-color: #eef0f3 !important; }
html[data-theme="light"] .border-vexo-border { border-color: #e2e4e9 !important; }
html[data-theme="light"] .text-vexo-muted { color: #6b7280 !important; }
html[data-theme="light"] .text-white { color: #0a0a0b !important; }
html[data-theme="light"] .bg-vexo-bg\\/95 { background-color: rgba(245,246,248,0.95) !important; }
html[data-theme="light"] .bg-black\\/60 { background-color: rgba(0,0,0,0.35) !important; }
`;

fs.writeFileSync(cssPath, css, "utf8");
console.log("Fixed: app/globals.css (light mode now overrides the compiled utility classes directly)");

// ============ 2. Expand languages: add German, Portuguese, Hindi, Russian, Japanese ============

const i18nPath = path.join(__dirname, "app/lib/i18n.js");
let i18n = fs.readFileSync(i18nPath, "utf8");

const newLanguagesEntry = `  { code: "de", name: "Deutsch", flag: "de" },
  { code: "pt", name: "Portugu\\u00eas", flag: "pt" },
  { code: "hi", name: "\\u0939\\u093f\\u0928\\u094d\\u0926\\u0940", flag: "in" },
  { code: "ru", name: "\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439", flag: "ru" },
  { code: "ja", name: "\\u65e5\\u672c\\u8a9e", flag: "jp" },
];`;

i18n = i18n.replace(
  '  { code: "zh", name: "\\u4e2d\\u6587", flag: "cn" },\n];',
  '  { code: "zh", name: "\\u4e2d\\u6587", flag: "cn" },\n' + newLanguagesEntry
);

const newDictEntries = `  de: {
    overview: "\\u00dcbersicht", users: "Benutzer", wallets: "Wallets", transactions: "Transaktionen",
    deposits: "Einzahlungen", withdrawals: "Auszahlungen", billing: "Abrechnung", settings: "Einstellungen",
    auditLogs: "Pr\\u00fcfprotokolle", roles: "Rollen & Berechtigungen", support: "Support-Center",
    adminProfile: "Admin-Profil", logout: "Abmelden", analytics: "Analytik",
    login: "Anmelden", signup: "Registrieren", getStarted: "Loslegen", hello: "Hallo",
    profile: "Profil", buy: "Kaufen", market: "Markt", kyc: "KYC", transfer: "\\u00dcberweisung",
    walletConnect: "Wallet verbinden", myWallet: "Meine Wallet", adminPanel: "Admin-Bereich",
    security: "Sicherheit", features: "Funktionen", markets: "M\\u00e4rkte", faq: "FAQ",
  },
  pt: {
    overview: "Vis\\u00e3o geral", users: "Usu\\u00e1rios", wallets: "Carteiras", transactions: "Transa\\u00e7\\u00f5es",
    deposits: "Dep\\u00f3sitos", withdrawals: "Saques", billing: "Faturamento", settings: "Configura\\u00e7\\u00f5es",
    auditLogs: "Registros de auditoria", roles: "Fun\\u00e7\\u00f5es e permiss\\u00f5es", support: "Central de suporte",
    adminProfile: "Perfil do admin", logout: "Sair", analytics: "An\\u00e1lise",
    login: "Entrar", signup: "Cadastrar", getStarted: "Come\\u00e7ar", hello: "Ol\\u00e1",
    profile: "Perfil", buy: "Comprar", market: "Mercado", kyc: "KYC", transfer: "Transferir",
    walletConnect: "Conectar carteira", myWallet: "Minha carteira", adminPanel: "Painel admin",
    security: "Seguran\\u00e7a", features: "Recursos", markets: "Mercados", faq: "Perguntas",
  },
  hi: {
    overview: "\\u0905\\u0935\\u0932\\u094b\\u0915\\u0928", users: "\\u0909\\u092a\\u092f\\u094b\\u0917\\u0915\\u0930\\u094d\\u0924\\u093e", wallets: "\\u0935\\u0949\\u0932\\u0947\\u091f", transactions: "\\u0932\\u0947\\u0928\\u0926\\u0947\\u0928",
    deposits: "\\u091c\\u092e\\u093e", withdrawals: "\\u0928\\u093f\\u0915\\u093e\\u0938\\u0940", billing: "\\u092c\\u093f\\u0932\\u093f\\u0902\\u0917", settings: "\\u0938\\u0947\\u091f\\u093f\\u0902\\u0917",
    auditLogs: "\\u0911\\u0921\\u093f\\u091f \\u0932\\u0949\\u0917", roles: "\\u092d\\u0942\\u092e\\u093f\\u0915\\u093e\\u090f\\u0902 \\u0914\\u0930 \\u0905\\u0928\\u0941\\u092e\\u0924\\u093f\\u092f\\u093e\\u0902", support: "\\u0938\\u0939\\u093e\\u092f\\u0924\\u093e \\u0915\\u0947\\u0902\\u0926\\u094d\\u0930",
    adminProfile: "\\u0910\\u0921\\u092e\\u093f\\u0928 \\u092a\\u094d\\u0930\\u094b\\u092b\\u093c\\u093e\\u0907\\u0932", logout: "\\u0932\\u0949\\u0917 \\u0906\\u0909\\u091f", analytics: "\\u0935\\u093f\\u0936\\u094d\\u0932\\u0947\\u0937\\u0923",
    login: "\\u0932\\u0949\\u0917\\u093f\\u0928", signup: "\\u0938\\u093e\\u0907\\u0928 \\u0905\\u092a", getStarted: "\\u0936\\u0941\\u0930\\u0942 \\u0915\\u0930\\u0947\\u0902", hello: "\\u0928\\u092e\\u0938\\u094d\\u0924\\u0947",
    profile: "\\u092a\\u094d\\u0930\\u094b\\u092b\\u093c\\u093e\\u0907\\u0932", buy: "\\u0916\\u0930\\u0940\\u0926\\u0947\\u0902", market: "\\u092c\\u093e\\u091c\\u093c\\u093e\\u0930", kyc: "KYC", transfer: "\\u0938\\u094d\\u0925\\u093e\\u0928\\u093e\\u0902\\u0924\\u0930\\u0923",
    walletConnect: "\\u0935\\u0949\\u0932\\u0947\\u091f \\u0915\\u0928\\u0947\\u0915\\u094d\\u091f", myWallet: "\\u092e\\u0947\\u0930\\u093e \\u0935\\u0949\\u0932\\u0947\\u091f", adminPanel: "\\u0910\\u0921\\u092e\\u093f\\u0928 \\u092a\\u0948\\u0928\\u0932",
    security: "\\u0938\\u0941\\u0930\\u0915\\u094d\\u0937\\u093e", features: "\\u0938\\u0941\\u0935\\u093f\\u0927\\u093e\\u090f\\u0902", markets: "\\u092c\\u093e\\u091c\\u093c\\u093e\\u0930", faq: "\\u0938\\u093e\\u092e\\u093e\\u0928\\u094d\\u092f \\u092a\\u094d\\u0930\\u0936\\u094d\\u0928",
  },
  ru: {
    overview: "\\u041e\\u0431\\u0437\\u043e\\u0440", users: "\\u041f\\u043e\\u043b\\u044c\\u0437\\u043e\\u0432\\u0430\\u0442\\u0435\\u043b\\u0438", wallets: "\\u041a\\u043e\\u0448\\u0435\\u043b\\u044c\\u043a\\u0438", transactions: "\\u0422\\u0440\\u0430\\u043d\\u0437\\u0430\\u043a\\u0446\\u0438\\u0438",
    deposits: "\\u0414\\u0435\\u043f\\u043e\\u0437\\u0438\\u0442\\u044b", withdrawals: "\\u0412\\u044b\\u0432\\u043e\\u0434\\u044b", billing: "\\u0421\\u0447\\u0435\\u0442\\u0430", settings: "\\u041d\\u0430\\u0441\\u0442\\u0440\\u043e\\u0439\\u043a\\u0438",
    auditLogs: "\\u0416\\u0443\\u0440\\u043d\\u0430\\u043b\\u044b \\u0430\\u0443\\u0434\\u0438\\u0442\\u0430", roles: "\\u0420\\u043e\\u043b\\u0438 \\u0438 \\u043f\\u0440\\u0430\\u0432\\u0430", support: "\\u0426\\u0435\\u043d\\u0442\\u0440 \\u043f\\u043e\\u0434\\u0434\\u0435\\u0440\\u0436\\u043a\\u0438",
    adminProfile: "\\u041f\\u0440\\u043e\\u0444\\u0438\\u043b\\u044c \\u0430\\u0434\\u043c\\u0438\\u043d\\u0430", logout: "\\u0412\\u044b\\u0439\\u0442\\u0438", analytics: "\\u0410\\u043d\\u0430\\u043b\\u0438\\u0442\\u0438\\u043a\\u0430",
    login: "\\u0412\\u043e\\u0439\\u0442\\u0438", signup: "\\u0417\\u0430\\u0440\\u0435\\u0433\\u0438\\u0441\\u0442\\u0440\\u0438\\u0440\\u043e\\u0432\\u0430\\u0442\\u044c\\u0441\\u044f", getStarted: "\\u041d\\u0430\\u0447\\u0430\\u0442\\u044c", hello: "\\u041f\\u0440\\u0438\\u0432\\u0435\\u0442",
    profile: "\\u041f\\u0440\\u043e\\u0444\\u0438\\u043b\\u044c", buy: "\\u041a\\u0443\\u043f\\u0438\\u0442\\u044c", market: "\\u0420\\u044b\\u043d\\u043e\\u043a", kyc: "KYC", transfer: "\\u041f\\u0435\\u0440\\u0435\\u0432\\u043e\\u0434",
    walletConnect: "\\u041f\\u043e\\u0434\\u043a\\u043b\\u044e\\u0447\\u0438\\u0442\\u044c \\u043a\\u043e\\u0448\\u0435\\u043b\\u0435\\u043a", myWallet: "\\u041c\\u043e\\u0439 \\u043a\\u043e\\u0448\\u0435\\u043b\\u0435\\u043a", adminPanel: "\\u041f\\u0430\\u043d\\u0435\\u043b\\u044c \\u0430\\u0434\\u043c\\u0438\\u043d\\u0430",
    security: "\\u0411\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u043e\\u0441\\u0442\\u044c", features: "\\u0424\\u0443\\u043d\\u043a\\u0446\\u0438\\u0438", markets: "\\u0420\\u044b\\u043d\\u043a\\u0438", faq: "\\u0412\\u043e\\u043f\\u0440\\u043e\\u0441\\u044b",
  },
  ja: {
    overview: "\\u6982\\u8981", users: "\\u30e6\\u30fc\\u30b6\\u30fc", wallets: "\\u30a6\\u30a9\\u30ec\\u30c3\\u30c8", transactions: "\\u53d6\\u5f15",
    deposits: "\\u5165\\u91d1", withdrawals: "\\u51fa\\u91d1", billing: "\\u8acb\\u6c42", settings: "\\u8a2d\\u5b9a",
    auditLogs: "\\u76e3\\u67fb\\u30ed\\u30b0", roles: "\\u5f79\\u5272\\u3068\\u6a29\\u9650", support: "\\u30b5\\u30dd\\u30fc\\u30c8\\u30bb\\u30f3\\u30bf\\u30fc",
    adminProfile: "\\u7ba1\\u7406\\u8005\\u30d7\\u30ed\\u30d5\\u30a3\\u30fc\\u30eb", logout: "\\u30ed\\u30b0\\u30a2\\u30a6\\u30c8", analytics: "\\u5206\\u6790",
    login: "\\u30ed\\u30b0\\u30a4\\u30f3", signup: "\\u65b0\\u898f\\u767b\\u9332", getStarted: "\\u59cb\\u3081\\u308b", hello: "\\u3053\\u3093\\u306b\\u3061\\u306f",
    profile: "\\u30d7\\u30ed\\u30d5\\u30a3\\u30fc\\u30eb", buy: "\\u8cfc\\u5165", market: "\\u30de\\u30fc\\u30b1\\u30c3\\u30c8", kyc: "KYC", transfer: "\\u9001\\u91d1",
    walletConnect: "\\u30a6\\u30a9\\u30ec\\u30c3\\u30c8\\u63a5\\u7d9a", myWallet: "\\u30de\\u30a4\\u30a6\\u30a9\\u30ec\\u30c3\\u30c8", adminPanel: "\\u7ba1\\u7406\\u30d1\\u30cd\\u30eb",
    security: "\\u30bb\\u30ad\\u30e5\\u30ea\\u30c6\\u30a3", features: "\\u6a5f\\u80fd", markets: "\\u30de\\u30fc\\u30b1\\u30c3\\u30c8", faq: "\\u3088\\u304f\\u3042\\u308b\\u8cea\\u554f",
  },
`;

i18n = i18n.replace(
  "};\n\nconst LanguageContext",
  newDictEntries + "};\n\nconst LanguageContext"
);

fs.writeFileSync(i18nPath, i18n, "utf8");
console.log("Updated: app/lib/i18n.js (added German, Portuguese, Hindi, Russian, Japanese)");

// ============ 3. Wire real translations into AdminDrawer ============

fs.writeFileSync(path.join(__dirname, "app/components/AdminDrawer.js"), `"use client";
import { useRouter } from "next/navigation";
import {
  IconLayoutDashboard, IconUsers, IconWallet, IconArrowsExchange, IconArrowDownLeft,
  IconArrowUpRight, IconReceipt2, IconChartBar, IconSettings, IconHistory, IconLock,
  IconHeadset, IconUserCog, IconLink, IconShieldLock, IconLogout, IconX,
} from "@tabler/icons-react";
import { adminLogout } from "../lib/auth";
import { useLanguage } from "../lib/i18n";

export default function AdminDrawer({ open, onClose }) {
  const router = useRouter();
  const { t } = useLanguage();

  const sections = [
    {
      label: "Dashboard",
      items: [
        { label: t("overview"), href: "/admin", icon: IconLayoutDashboard },
        { label: t("analytics"), href: "/admin/analytics", icon: IconChartBar },
      ],
    },
    {
      label: "Users",
      items: [
        { label: t("users"), href: "/admin/users", icon: IconUsers },
      ],
    },
    {
      label: "Financial",
      items: [
        { label: t("wallets"), href: "/admin/wallets", icon: IconWallet },
        { label: t("transactions"), href: "/admin/transactions", icon: IconArrowsExchange },
        { label: t("deposits"), href: "/admin/deposits", icon: IconArrowDownLeft },
        { label: t("withdrawals"), href: "/admin/withdrawals", icon: IconArrowUpRight },
        { label: t("billing"), href: "/admin/billing", icon: IconReceipt2 },
        { label: t("walletConnect"), href: "#", icon: IconLink, placeholder: true },
      ],
    },
    {
      label: "Administration",
      items: [
        { label: t("settings"), href: "/admin/settings", icon: IconSettings },
        { label: t("auditLogs"), href: "/admin/audit-logs", icon: IconHistory },
        { label: t("roles"), href: "/admin/roles", icon: IconLock },
        { label: t("support"), href: "/admin/support", icon: IconHeadset },
      ],
    },
    {
      label: "Account",
      items: [
        { label: t("adminProfile"), href: "/admin/profile", icon: IconUserCog },
      ],
    },
  ];

  const handleNavigate = (item) => {
    onClose();
    if (item.placeholder) return;
    router.push(item.href);
  };

  const handleLogout = () => {
    adminLogout();
    onClose();
    router.push("/admin/login");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={\`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 \${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }\`}
      />
      <div
        className={\`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-vexo-card border-l border-vexo-border z-50 transition-transform duration-300 flex flex-col \${
          open ? "translate-x-0" : "translate-x-full"
        }\`}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <span />
          <button onClick={onClose} className="text-vexo-muted">
            <IconX size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 py-4 border-b border-vexo-border">
          <div className="w-16 h-16 rounded-full bg-vexo-orange/15 flex items-center justify-center">
            <IconShieldLock size={26} className="text-vexo-orange" />
          </div>
          <p className="text-vexo-muted text-xs">{t("hello")}</p>
          <p className="font-bold">Admin</p>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-4">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="text-vexo-muted text-[10px] uppercase tracking-wide px-3 mb-1">{section.label}</p>
              <div className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavigate(item)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left hover:bg-vexo-card2 transition-colors"
                  >
                    <item.icon size={17} className="text-vexo-orange" />
                    {item.label}
                    {item.placeholder && (
                      <span className="ml-auto text-[10px] text-vexo-muted font-normal">Soon</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pb-6 pt-2">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-full bg-gradient-to-r from-vexo-orange to-vexo-green text-white font-semibold text-sm flex items-center justify-center gap-2"
          >
            <IconLogout size={16} /> {t("logout")}
          </button>
        </div>
      </div>
    </>
  );
}
`, "utf8");
console.log("Updated: app/components/AdminDrawer.js (labels now translate)");

// ============ 4. Wire real translations into UserDrawer ============

fs.writeFileSync(path.join(__dirname, "app/components/UserDrawer.js"), `"use client";
import { useRouter } from "next/navigation";
import {
  IconUser, IconShoppingCart, IconChartLine, IconIdBadge2, IconArrowsExchange2,
  IconLink, IconWallet, IconShieldLock, IconLogout, IconX,
} from "@tabler/icons-react";
import { getSession, logout } from "../lib/auth";
import { useLanguage } from "../lib/i18n";

export default function UserDrawer({ open, onClose }) {
  const router = useRouter();
  const session = getSession();
  const { t } = useLanguage();

  const menuItems = [
    { label: t("profile"), href: "/dashboard/profile", icon: IconUser },
    { label: t("buy"), href: "/dashboard/market", icon: IconShoppingCart },
    { label: t("market"), href: "/dashboard/market", icon: IconChartLine },
    { label: t("kyc"), href: "/dashboard/kyc", icon: IconIdBadge2 },
    { label: t("transfer"), href: "/dashboard/transfer", icon: IconArrowsExchange2 },
    { label: t("walletConnect"), href: "#", icon: IconLink, placeholder: true },
    { label: t("myWallet"), href: "/dashboard", icon: IconWallet },
    { label: t("adminPanel"), href: "/admin/login", icon: IconShieldLock },
  ];

  const handleNavigate = (item) => {
    onClose();
    if (item.placeholder) return;
    router.push(item.href);
  };

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/login");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={\`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 \${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }\`}
      />
      <div
        className={\`fixed top-0 right-0 h-full w-[78%] max-w-xs bg-vexo-card border-l border-vexo-border z-50 transition-transform duration-300 flex flex-col \${
          open ? "translate-x-0" : "translate-x-full"
        }\`}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <span />
          <button onClick={onClose} className="text-vexo-muted">
            <IconX size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 py-4 border-b border-vexo-border">
          <div className="w-16 h-16 rounded-full bg-vexo-card2 flex items-center justify-center">
            <IconUser size={28} className="text-vexo-muted" />
          </div>
          <p className="text-vexo-muted text-xs">{t("hello")}</p>
          <p className="font-bold">{session?.username || "Guest"}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigate(item)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-left hover:bg-vexo-card2 transition-colors"
            >
              <item.icon size={18} className="text-vexo-orange" />
              {item.label}
              {item.placeholder && (
                <span className="ml-auto text-[10px] text-vexo-muted font-normal">Soon</span>
              )}
            </button>
          ))}
        </div>

        <div className="px-4 pb-6 pt-2">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-full bg-gradient-to-r from-vexo-orange to-vexo-green text-white font-semibold text-sm"
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </>
  );
}
`, "utf8");
console.log("Updated: app/components/UserDrawer.js (labels now translate)");

console.log("\\nDone!");
