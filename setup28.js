const fs = require("fs");
const path = require("path");

// ============ 1. Light-mode CSS fix: override compiled utility classes directly ============

const cssPath = path.join(__dirname, "app/globals.css");
let css = fs.readFileSync(cssPath, "utf8");

css = css.replace(
  /\n\/\* ---- Light mode overrides[\s\S]*$/,
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
`;

fs.writeFileSync(cssPath, css, "utf8");
console.log("Fixed: app/globals.css");

// ============ 2. Full i18n.js with 10 languages + expanded keys ============

fs.writeFileSync(path.join(__dirname, "app/lib/i18n.js"), `"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const languages = [
  { code: "en", name: "English", flag: "gb" },
  { code: "es", name: "Espa\\u00f1ol", flag: "es" },
  { code: "fr", name: "Fran\\u00e7ais", flag: "fr" },
  { code: "ar", name: "\\u0627\\u0644\\u0639\\u0631\\u0628\\u064a\\u0629", flag: "sa" },
  { code: "zh", name: "\\u4e2d\\u6587", flag: "cn" },
  { code: "de", name: "Deutsch", flag: "de" },
  { code: "pt", name: "Portugu\\u00eas", flag: "pt" },
  { code: "hi", name: "\\u0939\\u093f\\u0928\\u094d\\u0926\\u0940", flag: "in" },
  { code: "ru", name: "\\u0420\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439", flag: "ru" },
  { code: "ja", name: "\\u65e5\\u672c\\u8a9e", flag: "jp" },
];

const dictionary = {
  en: {
  "overview": "Overview",
  "users": "Users",
  "wallets": "Wallets",
  "transactions": "Transactions",
  "deposits": "Deposits",
  "withdrawals": "Withdrawals",
  "billing": "Billing",
  "settings": "Settings",
  "auditLogs": "Audit Logs",
  "roles": "Roles & Permissions",
  "support": "Support Center",
  "adminProfile": "Admin Profile",
  "logout": "Log out",
  "analytics": "Analytics",
  "login": "Log in",
  "signup": "Sign Up",
  "getStarted": "Get Started",
  "hello": "Hello",
  "profile": "Profile",
  "buy": "Buy",
  "market": "Market",
  "kyc": "KYC",
  "transfer": "Transfer",
  "walletConnect": "Wallet Connect",
  "myWallet": "My Wallet",
  "adminPanel": "Admin Panel",
  "security": "Security",
  "features": "Features",
  "markets": "Markets",
  "faq": "FAQ",
  "goodEvening": "Good evening,",
  "totalPlatformBalance": "Total platform balance",
  "live": "Live",
  "showBalance": "Show balance",
  "hideBalance": "Hide balance",
  "totalUsersLabel": "Total users",
  "active": "Active",
  "suspended": "Suspended",
  "pendingKyc": "Pending KYC",
  "recentlyJoined": "Recently joined",
  "seeAll": "See all",
  "searchUsersPlaceholder": "Search by name, email, phone, or ID",
  "all": "All",
  "pending": "Pending",
  "sortNewest": "Newest first",
  "sortOldest": "Oldest first",
  "sortBalanceHigh": "Balance: High to Low",
  "sortBalanceLow": "Balance: Low to High",
  "sortName": "Name A-Z",
  "page": "Page",
  "of": "of"
},
  es: {
  "overview": "Resumen",
  "users": "Usuarios",
  "wallets": "Billeteras",
  "transactions": "Transacciones",
  "deposits": "Dep\\u00f3sitos",
  "withdrawals": "Retiros",
  "billing": "Facturaci\\u00f3n",
  "settings": "Ajustes",
  "auditLogs": "Registros de auditor\\u00eda",
  "roles": "Roles y permisos",
  "support": "Centro de soporte",
  "adminProfile": "Perfil de admin",
  "logout": "Cerrar sesi\\u00f3n",
  "analytics": "Anal\\u00edtica",
  "login": "Iniciar sesi\\u00f3n",
  "signup": "Registrarse",
  "getStarted": "Comenzar",
  "hello": "Hola",
  "profile": "Perfil",
  "buy": "Comprar",
  "market": "Mercado",
  "kyc": "KYC",
  "transfer": "Transferir",
  "walletConnect": "Conectar billetera",
  "myWallet": "Mi billetera",
  "adminPanel": "Panel de admin",
  "security": "Seguridad",
  "features": "Caracter\\u00edsticas",
  "markets": "Mercados",
  "faq": "Preguntas",
  "goodEvening": "Buenas noches,",
  "totalPlatformBalance": "Saldo total de la plataforma",
  "live": "En vivo",
  "showBalance": "Mostrar saldo",
  "hideBalance": "Ocultar saldo",
  "totalUsersLabel": "Usuarios totales",
  "active": "Activos",
  "suspended": "Suspendidos",
  "pendingKyc": "KYC pendiente",
  "recentlyJoined": "Reci\\u00e9n unidos",
  "seeAll": "Ver todo",
  "searchUsersPlaceholder": "Buscar por nombre, correo, tel\\u00e9fono o ID",
  "all": "Todos",
  "pending": "Pendiente",
  "sortNewest": "M\\u00e1s recientes",
  "sortOldest": "M\\u00e1s antiguos",
  "sortBalanceHigh": "Saldo: Mayor a menor",
  "sortBalanceLow": "Saldo: Menor a mayor",
  "sortName": "Nombre A-Z",
  "page": "P\\u00e1gina",
  "of": "de"
},
  fr: {
  "overview": "Aper\\u00e7u",
  "users": "Utilisateurs",
  "wallets": "Portefeuilles",
  "transactions": "Transactions",
  "deposits": "D\\u00e9p\\u00f4ts",
  "withdrawals": "Retraits",
  "billing": "Facturation",
  "settings": "Param\\u00e8tres",
  "auditLogs": "Journaux d'audit",
  "roles": "R\\u00f4les et permissions",
  "support": "Centre d'assistance",
  "adminProfile": "Profil admin",
  "logout": "D\\u00e9connexion",
  "analytics": "Analytique",
  "login": "Connexion",
  "signup": "S'inscrire",
  "getStarted": "Commencer",
  "hello": "Bonjour",
  "profile": "Profil",
  "buy": "Acheter",
  "market": "March\\u00e9",
  "kyc": "KYC",
  "transfer": "Transf\\u00e9rer",
  "walletConnect": "Connecter le portefeuille",
  "myWallet": "Mon portefeuille",
  "adminPanel": "Panneau admin",
  "security": "S\\u00e9curit\\u00e9",
  "features": "Fonctionnalit\\u00e9s",
  "markets": "March\\u00e9s",
  "faq": "FAQ",
  "goodEvening": "Bonsoir,",
  "totalPlatformBalance": "Solde total de la plateforme",
  "live": "En direct",
  "showBalance": "Afficher le solde",
  "hideBalance": "Masquer le solde",
  "totalUsersLabel": "Utilisateurs totaux",
  "active": "Actifs",
  "suspended": "Suspendus",
  "pendingKyc": "KYC en attente",
  "recentlyJoined": "R\\u00e9cemment inscrits",
  "seeAll": "Tout voir",
  "searchUsersPlaceholder": "Rechercher par nom, email, t\\u00e9l\\u00e9phone ou ID",
  "all": "Tous",
  "pending": "En attente",
  "sortNewest": "Plus r\\u00e9cents",
  "sortOldest": "Plus anciens",
  "sortBalanceHigh": "Solde: \\u00c9lev\\u00e9 \\u00e0 bas",
  "sortBalanceLow": "Solde: Bas \\u00e0 \\u00e9lev\\u00e9",
  "sortName": "Nom A-Z",
  "page": "Page",
  "of": "sur"
},
  ar: {
  "overview": "\\u0646\\u0638\\u0631\\u0629 \\u0639\\u0627\\u0645\\u0629",
  "users": "\\u0627\\u0644\\u0645\\u0633\\u062a\\u062e\\u062f\\u0645\\u0648\\u0646",
  "wallets": "\\u0627\\u0644\\u0645\\u062d\\u0627\\u0641\\u0638",
  "transactions": "\\u0627\\u0644\\u0645\\u0639\\u0627\\u0645\\u0644\\u0627\\u062a",
  "deposits": "\\u0627\\u0644\\u0625\\u064a\\u062f\\u0627\\u0639\\u0627\\u062a",
  "withdrawals": "\\u0627\\u0644\\u0633\\u062d\\u0648\\u0628\\u0627\\u062a",
  "billing": "\\u0627\\u0644\\u0641\\u0648\\u062a\\u0631\\u0629",
  "settings": "\\u0627\\u0644\\u0625\\u0639\\u062f\\u0627\\u062f\\u0627\\u062a",
  "auditLogs": "\\u0633\\u062c\\u0644\\u0627\\u062a \\u0627\\u0644\\u062a\\u062f\\u0642\\u064a\\u0642",
  "roles": "\\u0627\\u0644\\u0623\\u062f\\u0648\\u0627\\u0631 \\u0648\\u0627\\u0644\\u0635\\u0644\\u0627\\u062d\\u064a\\u0627\\u062a",
  "support": "\\u0645\\u0631\\u0643\\u0632 \\u0627\\u0644\\u062f\\u0639\\u0645",
  "adminProfile": "\\u0645\\u0644\\u0641 \\u0627\\u0644\\u0645\\u0634\\u0631\\u0641",
  "logout": "\\u062a\\u0633\\u062c\\u064a\\u0644 \\u0627\\u0644\\u062e\\u0631\\u0648\\u062c",
  "analytics": "\\u0627\\u0644\\u062a\\u062d\\u0644\\u064a\\u0644\\u0627\\u062a",
  "login": "\\u062a\\u0633\\u062c\\u064a\\u0644 \\u0627\\u0644\\u062f\\u062e\\u0648\\u0644",
  "signup": "\\u0625\\u0646\\u0634\\u0627\\u0621 \\u062d\\u0633\\u0627\\u0628",
  "getStarted": "\\u0627\\u0628\\u062f\\u0623 \\u0627\\u0644\\u0622\\u0646",
  "hello": "\\u0645\\u0631\\u062d\\u0628\\u064b\\u0627",
  "profile": "\\u0627\\u0644\\u0645\\u0644\\u0641 \\u0627\\u0644\\u0634\\u062e\\u0635\\u064a",
  "buy": "\\u0634\\u0631\\u0627\\u0621",
  "market": "\\u0627\\u0644\\u0633\\u0648\\u0642",
  "kyc": "\\u0627\\u0644\\u062a\\u062d\\u0642\\u0642 \\u0645\\u0646 \\u0627\\u0644\\u0647\\u0648\\u064a\\u0629",
  "transfer": "\\u062a\\u062d\\u0648\\u064a\\u0644",
  "walletConnect": "\\u0631\\u0628\\u0637 \\u0627\\u0644\\u0645\\u062d\\u0641\\u0638\\u0629",
  "myWallet": "\\u0645\\u062d\\u0641\\u0638\\u062a\\u064a",
  "adminPanel": "\\u0644\\u0648\\u062d\\u0629 \\u0627\\u0644\\u0625\\u062f\\u0627\\u0631\\u0629",
  "security": "\\u0627\\u0644\\u0623\\u0645\\u0627\\u0646",
  "features": "\\u0627\\u0644\\u0645\\u064a\\u0632\\u0627\\u062a",
  "markets": "\\u0627\\u0644\\u0623\\u0633\\u0648\\u0627\\u0642",
  "faq": "\\u0627\\u0644\\u0623\\u0633\\u0626\\u0644\\u0629 \\u0627\\u0644\\u0634\\u0627\\u0626\\u0639\\u0629",
  "goodEvening": "\\u0645\\u0633\\u0627\\u0621 \\u0627\\u0644\\u062e\\u064a\\u0631\\u060c",
  "totalPlatformBalance": "\\u0625\\u062c\\u0645\\u0627\\u0644\\u064a \\u0631\\u0635\\u064a\\u062f \\u0627\\u0644\\u0645\\u0646\\u0635\\u0629",
  "live": "\\u0645\\u0628\\u0627\\u0634\\u0631",
  "showBalance": "\\u0625\\u0638\\u0647\\u0627\\u0631 \\u0627\\u0644\\u0631\\u0635\\u064a\\u062f",
  "hideBalance": "\\u0625\\u062e\\u0641\\u0627\\u0621 \\u0627\\u0644\\u0631\\u0635\\u064a\\u062f",
  "totalUsersLabel": "\\u0625\\u062c\\u0645\\u0627\\u0644\\u064a \\u0627\\u0644\\u0645\\u0633\\u062a\\u062e\\u062f\\u0645\\u064a\\u0646",
  "active": "\\u0646\\u0634\\u0637",
  "suspended": "\\u0645\\u0648\\u0642\\u0648\\u0641",
  "pendingKyc": "\\u0628\\u0627\\u0646\\u062a\\u0638\\u0627\\u0631 \\u0627\\u0644\\u062a\\u062d\\u0642\\u0642",
  "recentlyJoined": "\\u0627\\u0644\\u0645\\u0646\\u0636\\u0645\\u0648\\u0646 \\u062d\\u062f\\u064a\\u062b\\u064b\\u0627",
  "seeAll": "\\u0639\\u0631\\u0636 \\u0627\\u0644\\u0643\\u0644",
  "searchUsersPlaceholder": "\\u0627\\u0644\\u0628\\u062d\\u062b \\u0628\\u0627\\u0644\\u0627\\u0633\\u0645 \\u0623\\u0648 \\u0627\\u0644\\u0628\\u0631\\u064a\\u062f \\u0623\\u0648 \\u0627\\u0644\\u0647\\u0627\\u062a\\u0641 \\u0623\\u0648 \\u0627\\u0644\\u0645\\u0639\\u0631\\u0641",
  "all": "\\u0627\\u0644\\u0643\\u0644",
  "pending": "\\u0642\\u064a\\u062f \\u0627\\u0644\\u0627\\u0646\\u062a\\u0638\\u0627\\u0631",
  "sortNewest": "\\u0627\\u0644\\u0623\\u062d\\u062f\\u062b \\u0623\\u0648\\u0644\\u0627\\u064b",
  "sortOldest": "\\u0627\\u0644\\u0623\\u0642\\u062f\\u0645 \\u0623\\u0648\\u0644\\u0627\\u064b",
  "sortBalanceHigh": "\\u0627\\u0644\\u0631\\u0635\\u064a\\u062f: \\u0645\\u0646 \\u0627\\u0644\\u0623\\u0639\\u0644\\u0649 \\u0644\\u0644\\u0623\\u0642\\u0644",
  "sortBalanceLow": "\\u0627\\u0644\\u0631\\u0635\\u064a\\u062f: \\u0645\\u0646 \\u0627\\u0644\\u0623\\u0642\\u0644 \\u0644\\u0644\\u0623\\u0639\\u0644\\u0649",
  "sortName": "\\u0627\\u0644\\u0627\\u0633\\u0645 \\u0623-\\u064a",
  "page": "\\u0635\\u0641\\u062d\\u0629",
  "of": "\\u0645\\u0646"
},
  zh: {
  "overview": "\\u6982\\u89c8",
  "users": "\\u7528\\u6237",
  "wallets": "\\u94b1\\u5305",
  "transactions": "\\u4ea4\\u6613",
  "deposits": "\\u5145\\u503c",
  "withdrawals": "\\u63d0\\u73b0",
  "billing": "\\u8d26\\u5355",
  "settings": "\\u8bbe\\u7f6e",
  "auditLogs": "\\u5ba1\\u8ba1\\u65e5\\u5fd7",
  "roles": "\\u89d2\\u8272\\u4e0e\\u6743\\u9650",
  "support": "\\u652f\\u6301\\u4e2d\\u5fc3",
  "adminProfile": "\\u7ba1\\u7406\\u5458\\u8d44\\u6599",
  "logout": "\\u9000\\u51fa\\u767b\\u5f55",
  "analytics": "\\u6570\\u636e\\u5206\\u6790",
  "login": "\\u767b\\u5f55",
  "signup": "\\u6ce8\\u518c",
  "getStarted": "\\u5f00\\u59cb\\u4f7f\\u7528",
  "hello": "\\u4f60\\u597d",
  "profile": "\\u4e2a\\u4eba\\u8d44\\u6599",
  "buy": "\\u8d2d\\u4e70",
  "market": "\\u5e02\\u573a",
  "kyc": "\\u8eab\\u4efd\\u9a8c\\u8bc1",
  "transfer": "\\u8f6c\\u8d26",
  "walletConnect": "\\u8fde\\u63a5\\u94b1\\u5305",
  "myWallet": "\\u6211\\u7684\\u94b1\\u5305",
  "adminPanel": "\\u7ba1\\u7406\\u9762\\u677f",
  "security": "\\u5b89\\u5168",
  "features": "\\u529f\\u80fd",
  "markets": "\\u5e02\\u573a\\u884c\\u60c5",
  "faq": "\\u5e38\\u89c1\\u95ee\\u9898",
  "goodEvening": "\\u665a\\u4e0a\\u597d\\uff0c",
  "totalPlatformBalance": "\\u5e73\\u53f0\\u603b\\u4f59\\u989d",
  "live": "\\u5b9e\\u65f6",
  "showBalance": "\\u663e\\u793a\\u4f59\\u989d",
  "hideBalance": "\\u9690\\u85cf\\u4f59\\u989d",
  "totalUsersLabel": "\\u603b\\u7528\\u6237\\u6570",
  "active": "\\u6d3b\\u8dc3",
  "suspended": "\\u5df2\\u505c\\u7528",
  "pendingKyc": "\\u5f85\\u9a8c\\u8bc1",
  "recentlyJoined": "\\u6700\\u8fd1\\u52a0\\u5165",
  "seeAll": "\\u67e5\\u770b\\u5168\\u90e8",
  "searchUsersPlaceholder": "\\u6309\\u59d3\\u540d\\u3001\\u90ae\\u7bb1\\u3001\\u7535\\u8bdd\\u6216ID\\u641c\\u7d22",
  "all": "\\u5168\\u90e8",
  "pending": "\\u5f85\\u5904\\u7406",
  "sortNewest": "\\u6700\\u65b0\\u4f18\\u5148",
  "sortOldest": "\\u6700\\u65e9\\u4f18\\u5148",
  "sortBalanceHigh": "\\u4f59\\u989d\\uff1a\\u4ece\\u9ad8\\u5230\\u4f4e",
  "sortBalanceLow": "\\u4f59\\u989d\\uff1a\\u4ece\\u4f4e\\u5230\\u9ad8",
  "sortName": "\\u59d3\\u540d A-Z",
  "page": "\\u7b2c",
  "of": "\\u9875\\uff0c\\u5171"
},
  de: {
  "overview": "\\u00dcbersicht",
  "users": "Benutzer",
  "wallets": "Wallets",
  "transactions": "Transaktionen",
  "deposits": "Einzahlungen",
  "withdrawals": "Auszahlungen",
  "billing": "Abrechnung",
  "settings": "Einstellungen",
  "auditLogs": "Pr\\u00fcfprotokolle",
  "roles": "Rollen & Berechtigungen",
  "support": "Support-Center",
  "adminProfile": "Admin-Profil",
  "logout": "Abmelden",
  "analytics": "Analytik",
  "login": "Anmelden",
  "signup": "Registrieren",
  "getStarted": "Loslegen",
  "hello": "Hallo",
  "profile": "Profil",
  "buy": "Kaufen",
  "market": "Markt",
  "kyc": "KYC",
  "transfer": "\\u00dcberweisung",
  "walletConnect": "Wallet verbinden",
  "myWallet": "Meine Wallet",
  "adminPanel": "Admin-Bereich",
  "security": "Sicherheit",
  "features": "Funktionen",
  "markets": "M\\u00e4rkte",
  "faq": "FAQ",
  "goodEvening": "Guten Abend,",
  "totalPlatformBalance": "Gesamtguthaben der Plattform",
  "live": "Live",
  "showBalance": "Guthaben anzeigen",
  "hideBalance": "Guthaben verbergen",
  "totalUsersLabel": "Benutzer insgesamt",
  "active": "Aktiv",
  "suspended": "Gesperrt",
  "pendingKyc": "KYC ausstehend",
  "recentlyJoined": "K\\u00fcrzlich beigetreten",
  "seeAll": "Alle anzeigen",
  "searchUsersPlaceholder": "Suche nach Name, E-Mail, Telefon oder ID",
  "all": "Alle",
  "pending": "Ausstehend",
  "sortNewest": "Neueste zuerst",
  "sortOldest": "\\u00c4lteste zuerst",
  "sortBalanceHigh": "Guthaben: Hoch zu niedrig",
  "sortBalanceLow": "Guthaben: Niedrig zu hoch",
  "sortName": "Name A-Z",
  "page": "Seite",
  "of": "von"
},
  pt: {
  "overview": "Vis\\u00e3o geral",
  "users": "Usu\\u00e1rios",
  "wallets": "Carteiras",
  "transactions": "Transa\\u00e7\\u00f5es",
  "deposits": "Dep\\u00f3sitos",
  "withdrawals": "Saques",
  "billing": "Faturamento",
  "settings": "Configura\\u00e7\\u00f5es",
  "auditLogs": "Registros de auditoria",
  "roles": "Fun\\u00e7\\u00f5es e permiss\\u00f5es",
  "support": "Central de suporte",
  "adminProfile": "Perfil do admin",
  "logout": "Sair",
  "analytics": "An\\u00e1lise",
  "login": "Entrar",
  "signup": "Cadastrar",
  "getStarted": "Come\\u00e7ar",
  "hello": "Ol\\u00e1",
  "profile": "Perfil",
  "buy": "Comprar",
  "market": "Mercado",
  "kyc": "KYC",
  "transfer": "Transferir",
  "walletConnect": "Conectar carteira",
  "myWallet": "Minha carteira",
  "adminPanel": "Painel admin",
  "security": "Seguran\\u00e7a",
  "features": "Recursos",
  "markets": "Mercados",
  "faq": "Perguntas",
  "goodEvening": "Boa noite,",
  "totalPlatformBalance": "Saldo total da plataforma",
  "live": "Ao vivo",
  "showBalance": "Mostrar saldo",
  "hideBalance": "Ocultar saldo",
  "totalUsersLabel": "Total de usu\\u00e1rios",
  "active": "Ativos",
  "suspended": "Suspensos",
  "pendingKyc": "KYC pendente",
  "recentlyJoined": "Ingressados recentemente",
  "seeAll": "Ver tudo",
  "searchUsersPlaceholder": "Buscar por nome, e-mail, telefone ou ID",
  "all": "Todos",
  "pending": "Pendente",
  "sortNewest": "Mais recentes",
  "sortOldest": "Mais antigos",
  "sortBalanceHigh": "Saldo: Maior para menor",
  "sortBalanceLow": "Saldo: Menor para maior",
  "sortName": "Nome A-Z",
  "page": "P\\u00e1gina",
  "of": "de"
},
  hi: {
  "overview": "\\u0905\\u0935\\u0932\\u094b\\u0915\\u0928",
  "users": "\\u0909\\u092a\\u092f\\u094b\\u0917\\u0915\\u0930\\u094d\\u0924\\u093e",
  "wallets": "\\u0935\\u0949\\u0932\\u0947\\u091f",
  "transactions": "\\u0932\\u0947\\u0928\\u0926\\u0947\\u0928",
  "deposits": "\\u091c\\u092e\\u093e",
  "withdrawals": "\\u0928\\u093f\\u0915\\u093e\\u0938\\u0940",
  "billing": "\\u092c\\u093f\\u0932\\u093f\\u0902\\u0917",
  "settings": "\\u0938\\u0947\\u091f\\u093f\\u0902\\u0917\\u094d\\u0938",
  "auditLogs": "\\u0911\\u0921\\u093f\\u091f \\u0932\\u0949\\u0917",
  "roles": "\\u092d\\u0942\\u092e\\u093f\\u0915\\u093e\\u090f\\u0902 \\u0914\\u0930 \\u0905\\u0928\\u0941\\u092e\\u0924\\u093f\\u092f\\u093e\\u0902",
  "support": "\\u0938\\u0939\\u093e\\u092f\\u0924\\u093e \\u0915\\u0947\\u0902\\u0926\\u094d\\u0930",
  "adminProfile": "\\u090f\\u0921\\u092e\\u093f\\u0928 \\u092a\\u094d\\u0930\\u094b\\u092b\\u093e\\u0907\\u0932",
  "logout": "\\u0932\\u0949\\u0917 \\u0906\\u0909\\u091f",
  "analytics": "\\u0935\\u093f\\u0936\\u094d\\u0932\\u0947\\u0937\\u0923",
  "login": "\\u0932\\u0949\\u0917\\u093f\\u0928",
  "signup": "\\u0938\\u093e\\u0907\\u0928 \\u0905\\u092a",
  "getStarted": "\\u0936\\u0941\\u0930\\u0942 \\u0915\\u0930\\u0947\\u0902",
  "hello": "\\u0928\\u092e\\u0938\\u094d\\u0924\\u0947",
  "profile": "\\u092a\\u094d\\u0930\\u094b\\u092b\\u093e\\u0907\\u0932",
  "buy": "\\u0916\\u0930\\u0940\\u0926\\u0947\\u0902",
  "market": "\\u092c\\u093e\\u091c\\u093c\\u093e\\u0930",
  "kyc": "KYC",
  "transfer": "\\u0938\\u094d\\u0925\\u093e\\u0928\\u093e\\u0902\\u0924\\u0930\\u0923",
  "walletConnect": "\\u0935\\u0949\\u0932\\u0947\\u091f \\u0915\\u0928\\u0947\\u0915\\u094d\\u091f",
  "myWallet": "\\u092e\\u0947\\u0930\\u093e \\u0935\\u0949\\u0932\\u0947\\u091f",
  "adminPanel": "\\u090f\\u0921\\u092e\\u093f\\u0928 \\u092a\\u0948\\u0928\\u0932",
  "security": "\\u0938\\u0941\\u0930\\u0915\\u094d\\u0937\\u093e",
  "features": "\\u0938\\u0941\\u0935\\u093f\\u0927\\u093e\\u090f\\u0902",
  "markets": "\\u092c\\u093e\\u091c\\u093c\\u093e\\u0930",
  "faq": "\\u0938\\u093e\\u092e\\u093e\\u0928\\u094d\\u092f \\u092a\\u094d\\u0930\\u0936\\u094d\\u0928",
  "goodEvening": "\\u0936\\u0941\\u092d \\u0938\\u0902\\u0927\\u094d\\u092f\\u093e,",
  "totalPlatformBalance": "\\u0915\\u0941\\u0932 \\u092a\\u094d\\u0932\\u0947\\u091f\\u092b\\u093c\\u0949\\u0930\\u094d\\u092e \\u092c\\u0948\\u0932\\u0947\\u0902\\u0938",
  "live": "\\u0932\\u093e\\u0907\\u0935",
  "showBalance": "\\u092c\\u0948\\u0932\\u0947\\u0902\\u0938 \\u0926\\u093f\\u0916\\u093e\\u090f\\u0902",
  "hideBalance": "\\u092c\\u0948\\u0932\\u0947\\u0902\\u0938 \\u091b\\u093f\\u092a\\u093e\\u090f\\u0902",
  "totalUsersLabel": "\\u0915\\u0941\\u0932 \\u0909\\u092a\\u092f\\u094b\\u0917\\u0915\\u0930\\u094d\\u0924\\u093e",
  "active": "\\u0938\\u0915\\u094d\\u0930\\u093f\\u092f",
  "suspended": "\\u0928\\u093f\\u0932\\u0902\\u092c\\u093f\\u0924",
  "pendingKyc": "KYC \\u0932\\u0902\\u092c\\u093f\\u0924",
  "recentlyJoined": "\\u0939\\u093e\\u0932 \\u0939\\u0940 \\u092e\\u0947\\u0902 \\u091c\\u0941\\u0921\\u093c\\u0947",
  "seeAll": "\\u0938\\u092d\\u0940 \\u0926\\u0947\\u0916\\u0947\\u0902",
  "searchUsersPlaceholder": "\\u0928\\u093e\\u092e, \\u0908\\u092e\\u0947\\u0932, \\u092b\\u094b\\u0928 \\u092f\\u093e \\u0906\\u0908\\u0921\\u0940 \\u0938\\u0947 \\u0916\\u094b\\u091c\\u0947\\u0902",
  "all": "\\u0938\\u092d\\u0940",
  "pending": "\\u0932\\u0902\\u092c\\u093f\\u0924",
  "sortNewest": "\\u0928\\u0935\\u0940\\u0928\\u0924\\u092e \\u092a\\u0939\\u0932\\u0947",
  "sortOldest": "\\u092a\\u0941\\u0930\\u093e\\u0928\\u0947 \\u092a\\u0939\\u0932\\u0947",
  "sortBalanceHigh": "\\u092c\\u0948\\u0932\\u0947\\u0902\\u0938: \\u0909\\u091a\\u094d\\u091a \\u0938\\u0947 \\u0928\\u093f\\u092e\\u094d\\u0928",
  "sortBalanceLow": "\\u092c\\u0948\\u0932\\u0947\\u0902\\u0938: \\u0928\\u093f\\u092e\\u094d\\u0928 \\u0938\\u0947 \\u0909\\u091a\\u094d\\u091a",
  "sortName": "\\u0928\\u093e\\u092e A-Z",
  "page": "\\u092a\\u0943\\u0937\\u094d\\u0920",
  "of": "\\u0915\\u093e"
},
  ru: {
  "overview": "\\u041e\\u0431\\u0437\\u043e\\u0440",
  "users": "\\u041f\\u043e\\u043b\\u044c\\u0437\\u043e\\u0432\\u0430\\u0442\\u0435\\u043b\\u0438",
  "wallets": "\\u041a\\u043e\\u0448\\u0435\\u043b\\u044c\\u043a\\u0438",
  "transactions": "\\u0422\\u0440\\u0430\\u043d\\u0437\\u0430\\u043a\\u0446\\u0438\\u0438",
  "deposits": "\\u0414\\u0435\\u043f\\u043e\\u0437\\u0438\\u0442\\u044b",
  "withdrawals": "\\u0412\\u044b\\u0432\\u043e\\u0434\\u044b",
  "billing": "\\u0421\\u0447\\u0435\\u0442\\u0430",
  "settings": "\\u041d\\u0430\\u0441\\u0442\\u0440\\u043e\\u0439\\u043a\\u0438",
  "auditLogs": "\\u0416\\u0443\\u0440\\u043d\\u0430\\u043b\\u044b \\u0430\\u0443\\u0434\\u0438\\u0442\\u0430",
  "roles": "\\u0420\\u043e\\u043b\\u0438 \\u0438 \\u043f\\u0440\\u0430\\u0432\\u0430",
  "support": "\\u0426\\u0435\\u043d\\u0442\\u0440 \\u043f\\u043e\\u0434\\u0434\\u0435\\u0440\\u0436\\u043a\\u0438",
  "adminProfile": "\\u041f\\u0440\\u043e\\u0444\\u0438\\u043b\\u044c \\u0430\\u0434\\u043c\\u0438\\u043d\\u0430",
  "logout": "\\u0412\\u044b\\u0439\\u0442\\u0438",
  "analytics": "\\u0410\\u043d\\u0430\\u043b\\u0438\\u0442\\u0438\\u043a\\u0430",
  "login": "\\u0412\\u043e\\u0439\\u0442\\u0438",
  "signup": "\\u0417\\u0430\\u0440\\u0435\\u0433\\u0438\\u0441\\u0442\\u0440\\u0438\\u0440\\u043e\\u0432\\u0430\\u0442\\u044c\\u0441\\u044f",
  "getStarted": "\\u041d\\u0430\\u0447\\u0430\\u0442\\u044c",
  "hello": "\\u041f\\u0440\\u0438\\u0432\\u0435\\u0442",
  "profile": "\\u041f\\u0440\\u043e\\u0444\\u0438\\u043b\\u044c",
  "buy": "\\u041a\\u0443\\u043f\\u0438\\u0442\\u044c",
  "market": "\\u0420\\u044b\\u043d\\u043e\\u043a",
  "kyc": "KYC",
  "transfer": "\\u041f\\u0435\\u0440\\u0435\\u0432\\u043e\\u0434",
  "walletConnect": "\\u041f\\u043e\\u0434\\u043a\\u043b\\u044e\\u0447\\u0438\\u0442\\u044c \\u043a\\u043e\\u0448\\u0435\\u043b\\u0435\\u043a",
  "myWallet": "\\u041c\\u043e\\u0439 \\u043a\\u043e\\u0448\\u0435\\u043b\\u0435\\u043a",
  "adminPanel": "\\u041f\\u0430\\u043d\\u0435\\u043b\\u044c \\u0430\\u0434\\u043c\\u0438\\u043d\\u0430",
  "security": "\\u0411\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u043e\\u0441\\u0442\\u044c",
  "features": "\\u0424\\u0443\\u043d\\u043a\\u0446\\u0438\\u0438",
  "markets": "\\u0420\\u044b\\u043d\\u043a\\u0438",
  "faq": "\\u0412\\u043e\\u043f\\u0440\\u043e\\u0441\\u044b",
  "goodEvening": "\\u0414\\u043e\\u0431\\u0440\\u044b\\u0439 \\u0432\\u0435\\u0447\\u0435\\u0440,",
  "totalPlatformBalance": "\\u041e\\u0431\\u0449\\u0438\\u0439 \\u0431\\u0430\\u043b\\u0430\\u043d\\u0441 \\u043f\\u043b\\u0430\\u0442\\u0444\\u043e\\u0440\\u043c\\u044b",
  "live": "\\u0412 \\u0440\\u0435\\u0430\\u043b\\u044c\\u043d\\u043e\\u043c \\u0432\\u0440\\u0435\\u043c\\u0435\\u043d\\u0438",
  "showBalance": "\\u041f\\u043e\\u043a\\u0430\\u0437\\u0430\\u0442\\u044c \\u0431\\u0430\\u043b\\u0430\\u043d\\u0441",
  "hideBalance": "\\u0421\\u043a\\u0440\\u044b\\u0442\\u044c \\u0431\\u0430\\u043b\\u0430\\u043d\\u0441",
  "totalUsersLabel": "\\u0412\\u0441\\u0435\\u0433\\u043e \\u043f\\u043e\\u043b\\u044c\\u0437\\u043e\\u0432\\u0430\\u0442\\u0435\\u043b\\u0435\\u0439",
  "active": "\\u0410\\u043a\\u0442\\u0438\\u0432\\u043d\\u044b\\u0435",
  "suspended": "\\u0417\\u0430\\u0431\\u043b\\u043e\\u043a\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u043d\\u044b\\u0435",
  "pendingKyc": "KYC \\u0432 \\u043e\\u0436\\u0438\\u0434\\u0430\\u043d\\u0438\\u0438",
  "recentlyJoined": "\\u041d\\u0435\\u0434\\u0430\\u0432\\u043d\\u043e \\u043f\\u0440\\u0438\\u0441\\u043e\\u0435\\u0434\\u0438\\u043d\\u0438\\u043b\\u0438\\u0441\\u044c",
  "seeAll": "\\u0421\\u043c\\u043e\\u0442\\u0440\\u0435\\u0442\\u044c \\u0432\\u0441\\u0435",
  "searchUsersPlaceholder": "\\u041f\\u043e\\u0438\\u0441\\u043a \\u043f\\u043e \\u0438\\u043c\\u0435\\u043d\\u0438, email, \\u0442\\u0435\\u043b\\u0435\\u0444\\u043e\\u043d\\u0443 \\u0438\\u043b\\u0438 ID",
  "all": "\\u0412\\u0441\\u0435",
  "pending": "\\u0412 \\u043e\\u0436\\u0438\\u0434\\u0430\\u043d\\u0438\\u0438",
  "sortNewest": "\\u0421\\u043d\\u0430\\u0447\\u0430\\u043b\\u0430 \\u043d\\u043e\\u0432\\u044b\\u0435",
  "sortOldest": "\\u0421\\u043d\\u0430\\u0447\\u0430\\u043b\\u0430 \\u0441\\u0442\\u0430\\u0440\\u044b\\u0435",
  "sortBalanceHigh": "\\u0411\\u0430\\u043b\\u0430\\u043d\\u0441: \\u0441\\u043d\\u0430\\u0447\\u0430\\u043b\\u0430 \\u0431\\u043e\\u043b\\u044c\\u0448\\u043e\\u0439",
  "sortBalanceLow": "\\u0411\\u0430\\u043b\\u0430\\u043d\\u0441: \\u0441\\u043d\\u0430\\u0447\\u0430\\u043b\\u0430 \\u043c\\u0430\\u043b\\u044b\\u0439",
  "sortName": "\\u0418\\u043c\\u044f \\u0410-\\u042f",
  "page": "\\u0421\\u0442\\u0440\\u0430\\u043d\\u0438\\u0446\\u0430",
  "of": "\\u0438\\u0437"
},
  ja: {
  "overview": "\\u6982\\u8981",
  "users": "\\u30e6\\u30fc\\u30b6\\u30fc",
  "wallets": "\\u30a6\\u30a9\\u30ec\\u30c3\\u30c8",
  "transactions": "\\u53d6\\u5f15",
  "deposits": "\\u5165\\u91d1",
  "withdrawals": "\\u51fa\\u91d1",
  "billing": "\\u8acb\\u6c42",
  "settings": "\\u8a2d\\u5b9a",
  "auditLogs": "\\u76e3\\u67fb\\u30ed\\u30b0",
  "roles": "\\u5f79\\u5272\\u3068\\u6a29\\u9650",
  "support": "\\u30b5\\u30dd\\u30fc\\u30c8\\u30bb\\u30f3\\u30bf\\u30fc",
  "adminProfile": "\\u7ba1\\u7406\\u8005\\u30d7\\u30ed\\u30d5\\u30a3\\u30fc\\u30eb",
  "logout": "\\u30ed\\u30b0\\u30a2\\u30a6\\u30c8",
  "analytics": "\\u5206\\u6790",
  "login": "\\u30ed\\u30b0\\u30a4\\u30f3",
  "signup": "\\u65b0\\u898f\\u767b\\u9332",
  "getStarted": "\\u59cb\\u3081\\u308b",
  "hello": "\\u3053\\u3093\\u306b\\u3061\\u306f",
  "profile": "\\u30d7\\u30ed\\u30d5\\u30a3\\u30fc\\u30eb",
  "buy": "\\u8cfc\\u5165",
  "market": "\\u30de\\u30fc\\u30b1\\u30c3\\u30c8",
  "kyc": "\\u672c\\u4eba\\u78ba\\u8a8d",
  "transfer": "\\u9001\\u91d1",
  "walletConnect": "\\u30a6\\u30a9\\u30ec\\u30c3\\u30c8\\u63a5\\u7d9a",
  "myWallet": "\\u30de\\u30a4\\u30a6\\u30a9\\u30ec\\u30c3\\u30c8",
  "adminPanel": "\\u7ba1\\u7406\\u30d1\\u30cd\\u30eb",
  "security": "\\u30bb\\u30ad\\u30e5\\u30ea\\u30c6\\u30a3",
  "features": "\\u6a5f\\u80fd",
  "markets": "\\u30de\\u30fc\\u30b1\\u30c3\\u30c8",
  "faq": "\\u3088\\u304f\\u3042\\u308b\\u8cea\\u554f",
  "goodEvening": "\\u3053\\u3093\\u3070\\u3093\\u306f\\u3001",
  "totalPlatformBalance": "\\u30d7\\u30e9\\u30c3\\u30c8\\u30d5\\u30a9\\u30fc\\u30e0\\u7dcf\\u6b8b\\u9ad8",
  "live": "\\u30e9\\u30a4\\u30d6",
  "showBalance": "\\u6b8b\\u9ad8\\u3092\\u8868\\u793a",
  "hideBalance": "\\u6b8b\\u9ad8\\u3092\\u96a0\\u3059",
  "totalUsersLabel": "\\u7dcf\\u30e6\\u30fc\\u30b6\\u30fc\\u6570",
  "active": "\\u30a2\\u30af\\u30c6\\u30a3\\u30d6",
  "suspended": "\\u505c\\u6b62\\u4e2d",
  "pendingKyc": "KYC \\u4fdd\\u7559\\u4e2d",
  "recentlyJoined": "\\u6700\\u8fd1\\u53c2\\u52a0",
  "seeAll": "\\u3059\\u3079\\u3066\\u898b\\u308b",
  "searchUsersPlaceholder": "\\u540d\\u524d\\u3001\\u30e1\\u30fc\\u30eb\\u3001\\u96fb\\u8a71\\u3001ID\\u3067\\u691c\\u7d22",
  "all": "\\u3059\\u3079\\u3066",
  "pending": "\\u4fdd\\u7559\\u4e2d",
  "sortNewest": "\\u65b0\\u3057\\u3044\\u9806",
  "sortOldest": "\\u53e4\\u3044\\u9806",
  "sortBalanceHigh": "\\u6b8b\\u9ad8\\uff1a\\u9ad8\\u3044\\u9806",
  "sortBalanceLow": "\\u6b8b\\u9ad8\\uff1a\\u4f4e\\u3044\\u9806",
  "sortName": "\\u540d\\u524d A-Z",
  "page": "\\u30da\\u30fc\\u30b8",
  "of": "/"
}
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
console.log("Updated: app/lib/i18n.js (10 languages, expanded keys)");

// ============ 3. Admin Overview page: wired to t() ============

fs.writeFileSync(path.join(__dirname, "app/admin/page.js"), `"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconEye, IconEyeOff, IconUsers, IconArrowsExchange, IconSettings,
} from "@tabler/icons-react";
import { mockUsers } from "../lib/mockUsers";
import UserAvatar from "../components/UserAvatar";
import StatusBadge from "../components/StatusBadge";
import BalanceRing from "../components/admin/BalanceRing";
import { useLanguage } from "../lib/i18n";

export default function AdminOverview() {
  const [hidden, setHidden] = useState(false);
  const { t } = useLanguage();

  const totalPlatformBalance = mockUsers.reduce((sum, u) => sum + u.balance, 0);
  const activeUsers = mockUsers.filter((u) => u.status === "Active").length;
  const suspendedUsers = mockUsers.filter((u) => u.status === "Suspended").length;
  const pendingKyc = mockUsers.filter((u) => u.verification === "Pending").length;

  const recentUsers = [...mockUsers]
    .sort((a, b) => new Date(b.joined) - new Date(a.joined))
    .slice(0, 5);

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div>
        <p className="text-vexo-muted text-sm">{t("goodEvening")}</p>
        <p className="text-xl font-bold">Admin</p>
      </div>

      <div className="flex justify-center">
        <BalanceRing
          amount={totalPlatformBalance}
          label={t("totalPlatformBalance")}
          status={t("live")}
          size={220}
          hidden={hidden}
        />
      </div>

      <div className="flex justify-center -mt-2">
        <button
          onClick={() => setHidden((h) => !h)}
          className="flex items-center gap-1.5 text-vexo-muted text-xs font-semibold"
        >
          {hidden ? <IconEyeOff size={14} /> : <IconEye size={14} />}
          {hidden ? t("showBalance") : t("hideBalance")}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Link href="/admin/users" className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconUsers size={22} className="text-vexo-orange" />
          </div>
          <span className="text-xs text-vexo-muted">{t("users")}</span>
        </Link>
        <Link href="/admin/transactions" className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconArrowsExchange size={22} className="text-vexo-orange" />
          </div>
          <span className="text-xs text-vexo-muted">{t("transactions")}</span>
        </Link>
        <Link href="/admin/settings" className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
            <IconSettings size={22} className="text-vexo-orange" />
          </div>
          <span className="text-xs text-vexo-muted">{t("settings")}</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">{t("totalUsersLabel")}</p>
          <p className="font-bold text-lg mt-1">{mockUsers.length}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">{t("active")}</p>
          <p className="font-bold text-lg mt-1 text-vexo-green">{activeUsers}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">{t("suspended")}</p>
          <p className="font-bold text-lg mt-1 text-red-400">{suspendedUsers}</p>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-xl p-3">
          <p className="text-vexo-muted text-xs">{t("pendingKyc")}</p>
          <p className="font-bold text-lg mt-1 text-yellow-400">{pendingKyc}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-sm">{t("recentlyJoined")}</p>
          <Link href="/admin/users" className="text-vexo-orange text-xs font-semibold">{t("seeAll")}</Link>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {recentUsers.map((u) => (
            <Link
              key={u.id}
              href={\\\`/admin/users/\\\${u.id}\\\`}
              className="flex items-center justify-between py-3 border-b border-vexo-border last:border-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <UserAvatar name={u.name} size={36} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{u.name}</p>
                  <p className="text-vexo-muted text-xs truncate">{u.joined}</p>
                </div>
              </div>
              <StatusBadge status={u.status} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
`, "utf8");
console.log("Updated: app/admin/page.js (translated)");

// ============ 4. Admin Users list page: wired to t() ============

fs.writeFileSync(path.join(__dirname, "app/admin/users/page.js"), `"use client";
import { useState, useMemo } from "react";
import { IconSearch, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { mockUsers } from "../../lib/mockUsers";
import UserTableRow from "../../components/admin/UserTableRow";
import { useLanguage } from "../../lib/i18n";

const PAGE_SIZE = 6;

export default function AdminUsers() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filterTabs = [
    { key: "All", label: t("all") },
    { key: "Active", label: t("active") },
    { key: "Suspended", label: t("suspended") },
    { key: "Pending", label: t("pending") },
  ];

  const sortOptions = [
    { value: "newest", label: t("sortNewest") },
    { value: "oldest", label: t("sortOldest") },
    { value: "balance-high", label: t("sortBalanceHigh") },
    { value: "balance-low", label: t("sortBalanceLow") },
    { value: "name", label: t("sortName") },
  ];

  const filtered = useMemo(() => {
    let result = mockUsers.filter((u) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q);

      const matchesTab =
        tab === "All" ||
        (tab === "Active" && u.status === "Active") ||
        (tab === "Suspended" && u.status === "Suspended") ||
        (tab === "Pending" && u.verification === "Pending");

      return matchesQuery && matchesTab;
    });

    result = [...result].sort((a, b) => {
      if (sort === "newest") return new Date(b.joined) - new Date(a.joined);
      if (sort === "oldest") return new Date(a.joined) - new Date(b.joined);
      if (sort === "balance-high") return b.balance - a.balance;
      if (sort === "balance-low") return a.balance - b.balance;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [query, tab, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changePage = (delta) => {
    setPage((p) => Math.min(totalPages, Math.max(1, p + delta)));
  };

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <div>
        <p className="text-vexo-orange text-xs font-semibold uppercase tracking-wide">Admin</p>
        <p className="text-3xl font-bold mt-1">{t("users")}</p>
        <p className="text-vexo-muted text-sm mt-1">{mockUsers.length} {t("totalUsersLabel").toLowerCase()}</p>
      </div>

      <div className="relative">
        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-vexo-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder={t("searchUsersPlaceholder")}
          className="w-full bg-vexo-card border border-vexo-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-vexo-orange"
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2 overflow-x-auto">
          {filterTabs.map((t2) => (
            <button
              key={t2.key}
              onClick={() => { setTab(t2.key); setPage(1); }}
              className={\\\`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap \\\${
                tab === t2.key ? "bg-vexo-orange text-white" : "bg-vexo-card2 text-vexo-muted"
              }\\\`}
            >
              {t2.label}
            </button>
          ))}
        </div>
      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full bg-vexo-card border border-vexo-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-vexo-orange appearance-none"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {paged.map((u) => (
          <UserTableRow key={u.id} user={u} />
        ))}
        {paged.length === 0 && (
          <p className="text-vexo-muted text-sm text-center py-6">No users found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => changePage(-1)}
            disabled={page === 1}
            className="flex items-center gap-1 text-sm font-semibold text-vexo-muted disabled:opacity-30"
          >
            <IconChevronLeft size={16} /> Prev
          </button>
          <p className="text-vexo-muted text-xs">{t("page")} {page} {t("of")} {totalPages}</p>
          <button
            onClick={() => changePage(1)}
            disabled={page === totalPages}
            className="flex items-center gap-1 text-sm font-semibold text-vexo-muted disabled:opacity-30"
          >
            Next <IconChevronRight size={16} />
          </button>
        </div>
      )}
    </main>
  );
}
`, "utf8");
console.log("Updated: app/admin/users/page.js (translated)");

console.log("\\nDone!");
