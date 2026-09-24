const fs = require("fs");
const path = require("path");

fs.writeFileSync(path.join(__dirname, "app/lib/i18n.js"), `"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const languages = [
  { code: "en", name: "English", flag: "gb" },
  { code: "es", name: "Espa\u00f1ol", flag: "es" },
  { code: "fr", name: "Fran\u00e7ais", flag: "fr" },
  { code: "ar", name: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "sa" },
  { code: "zh", name: "\u4e2d\u6587", flag: "cn" },
  { code: "de", name: "Deutsch", flag: "de" },
  { code: "pt", name: "Portugu\u00eas", flag: "pt" },
  { code: "hi", name: "\u0939\u093f\u0928\u094d\u0926\u0940", flag: "in" },
  { code: "ru", name: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", flag: "ru" },
  { code: "ja", name: "\u65e5\u672c\u8a9e", flag: "jp" },
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
  "of": "of",
  "heroTitlePart1": "Your crypto,",
  "heroTitleHighlight": "Fort Knox",
  "heroTitlePart2": "protected",
  "heroSubtitle": "We obsess over security so you don't have to. Every layer of Vexo is engineered to protect your assets with the highest standards in the industry.",
  "trust1Title": "AES-256 Encryption",
  "trust1Desc": "Military-grade encryption for all data at rest and in transit.",
  "trust2Title": "Biometric Auth",
  "trust2Desc": "Face ID and fingerprint login for instant, passwordless access.",
  "trust3Title": "24/7 Monitoring",
  "trust3Desc": "Real-time anomaly detection with automated threat response.",
  "trust4Title": "Cold Storage 98%",
  "trust4Desc": "Majority of assets held in air-gapped, offline cold wallets.",
  "trust5Title": "SOC2 Certified",
  "trust5Desc": "Independently audited by Big-4 security firms every year.",
  "trust6Title": "$500M Insurance",
  "trust6Desc": "Full asset coverage through leading global insurance policies.",
  "goodAfternoon": "Good afternoon",
  "totalPortfolioValue": "Total Portfolio Value",
  "myAssets": "My Assets",
  "viewAll": "View all",
  "recentActivity": "Recent Activity",
  "send": "Send",
  "receive": "Receive",
  "swapAction": "Swap",
  "card": "Card",
  "depositReceived": "Deposit received",
  "withdrawalLabel": "Withdrawal"
},
  es: {
  "overview": "Resumen",
  "users": "Usuarios",
  "wallets": "Billeteras",
  "transactions": "Transacciones",
  "deposits": "Dep\u00f3sitos",
  "withdrawals": "Retiros",
  "billing": "Facturaci\u00f3n",
  "settings": "Ajustes",
  "auditLogs": "Registros de auditor\u00eda",
  "roles": "Roles y permisos",
  "support": "Centro de soporte",
  "adminProfile": "Perfil de admin",
  "logout": "Cerrar sesi\u00f3n",
  "analytics": "Anal\u00edtica",
  "login": "Iniciar sesi\u00f3n",
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
  "features": "Caracter\u00edsticas",
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
  "recentlyJoined": "Reci\u00e9n unidos",
  "seeAll": "Ver todo",
  "searchUsersPlaceholder": "Buscar por nombre, correo, tel\u00e9fono o ID",
  "all": "Todos",
  "pending": "Pendiente",
  "sortNewest": "M\u00e1s recientes",
  "sortOldest": "M\u00e1s antiguos",
  "sortBalanceHigh": "Saldo: Mayor a menor",
  "sortBalanceLow": "Saldo: Menor a mayor",
  "sortName": "Nombre A-Z",
  "page": "P\u00e1gina",
  "of": "de",
  "heroTitlePart1": "Tu cripto,",
  "heroTitleHighlight": "protegida como",
  "heroTitlePart2": "Fort Knox",
  "heroSubtitle": "Nos obsesionamos con la seguridad para que t\u00fa no tengas que hacerlo. Cada capa de Vexo est\u00e1 dise\u00f1ada para proteger tus activos con los m\u00e1s altos est\u00e1ndares de la industria.",
  "trust1Title": "Cifrado AES-256",
  "trust1Desc": "Cifrado de nivel militar para todos los datos en reposo y en tr\u00e1nsito.",
  "trust2Title": "Autenticaci\u00f3n biom\u00e9trica",
  "trust2Desc": "Inicio de sesi\u00f3n con Face ID y huella digital, instant\u00e1neo y sin contrase\u00f1a.",
  "trust3Title": "Monitoreo 24/7",
  "trust3Desc": "Detecci\u00f3n de anomal\u00edas en tiempo real con respuesta autom\u00e1tica a amenazas.",
  "trust4Title": "98% en almacenamiento fr\u00edo",
  "trust4Desc": "La mayor\u00eda de los activos se guardan en billeteras fr\u00edas fuera de l\u00ednea.",
  "trust5Title": "Certificaci\u00f3n SOC2",
  "trust5Desc": "Auditado de forma independiente por firmas de seguridad Big-4 cada a\u00f1o.",
  "trust6Title": "Seguro de $500M",
  "trust6Desc": "Cobertura total de activos mediante p\u00f3lizas de seguro globales l\u00edderes.",
  "goodAfternoon": "Buenas tardes",
  "totalPortfolioValue": "Valor total del portafolio",
  "myAssets": "Mis activos",
  "viewAll": "Ver todo",
  "recentActivity": "Actividad reciente",
  "send": "Enviar",
  "receive": "Recibir",
  "swapAction": "Canjear",
  "card": "Tarjeta",
  "depositReceived": "Dep\u00f3sito recibido",
  "withdrawalLabel": "Retiro"
},
  fr: {
  "overview": "Aper\u00e7u",
  "users": "Utilisateurs",
  "wallets": "Portefeuilles",
  "transactions": "Transactions",
  "deposits": "D\u00e9p\u00f4ts",
  "withdrawals": "Retraits",
  "billing": "Facturation",
  "settings": "Param\u00e8tres",
  "auditLogs": "Journaux d'audit",
  "roles": "R\u00f4les et permissions",
  "support": "Centre d'assistance",
  "adminProfile": "Profil admin",
  "logout": "D\u00e9connexion",
  "analytics": "Analytique",
  "login": "Connexion",
  "signup": "S'inscrire",
  "getStarted": "Commencer",
  "hello": "Bonjour",
  "profile": "Profil",
  "buy": "Acheter",
  "market": "March\u00e9",
  "kyc": "KYC",
  "transfer": "Transf\u00e9rer",
  "walletConnect": "Connecter le portefeuille",
  "myWallet": "Mon portefeuille",
  "adminPanel": "Panneau admin",
  "security": "S\u00e9curit\u00e9",
  "features": "Fonctionnalit\u00e9s",
  "markets": "March\u00e9s",
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
  "recentlyJoined": "R\u00e9cemment inscrits",
  "seeAll": "Tout voir",
  "searchUsersPlaceholder": "Rechercher par nom, email, t\u00e9l\u00e9phone ou ID",
  "all": "Tous",
  "pending": "En attente",
  "sortNewest": "Plus r\u00e9cents",
  "sortOldest": "Plus anciens",
  "sortBalanceHigh": "Solde: \u00c9lev\u00e9 \u00e0 bas",
  "sortBalanceLow": "Solde: Bas \u00e0 \u00e9lev\u00e9",
  "sortName": "Nom A-Z",
  "page": "Page",
  "of": "sur",
  "heroTitlePart1": "Votre crypto,",
  "heroTitleHighlight": "prot\u00e9g\u00e9e comme",
  "heroTitlePart2": "Fort Knox",
  "heroSubtitle": "Nous nous obs\u00e9dons pour la s\u00e9curit\u00e9 afin que vous n'ayez pas \u00e0 le faire. Chaque couche de Vexo est con\u00e7ue pour prot\u00e9ger vos actifs selon les normes les plus \u00e9lev\u00e9es du secteur.",
  "trust1Title": "Chiffrement AES-256",
  "trust1Desc": "Chiffrement de qualit\u00e9 militaire pour toutes les donn\u00e9es au repos et en transit.",
  "trust2Title": "Authentification biom\u00e9trique",
  "trust2Desc": "Connexion par Face ID et empreinte digitale, instantan\u00e9e et sans mot de passe.",
  "trust3Title": "Surveillance 24h/24",
  "trust3Desc": "D\u00e9tection d'anomalies en temps r\u00e9el avec r\u00e9ponse automatis\u00e9e aux menaces.",
  "trust4Title": "98% en stockage \u00e0 froid",
  "trust4Desc": "La majorit\u00e9 des actifs sont conserv\u00e9s dans des portefeuilles froids hors ligne.",
  "trust5Title": "Certifi\u00e9 SOC2",
  "trust5Desc": "Audit\u00e9 ind\u00e9pendamment par des cabinets de s\u00e9curit\u00e9 Big-4 chaque ann\u00e9e.",
  "trust6Title": "Assurance de 500M$",
  "trust6Desc": "Couverture totale des actifs gr\u00e2ce \u00e0 des polices d'assurance mondiales de premier plan.",
  "goodAfternoon": "Bon apr\u00e8s-midi",
  "totalPortfolioValue": "Valeur totale du portefeuille",
  "myAssets": "Mes actifs",
  "viewAll": "Tout voir",
  "recentActivity": "Activit\u00e9 r\u00e9cente",
  "send": "Envoyer",
  "receive": "Recevoir",
  "swapAction": "\u00c9changer",
  "card": "Carte",
  "depositReceived": "D\u00e9p\u00f4t re\u00e7u",
  "withdrawalLabel": "Retrait"
},
  ar: {
  "overview": "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629",
  "users": "\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u0648\u0646",
  "wallets": "\u0627\u0644\u0645\u062d\u0627\u0641\u0638",
  "transactions": "\u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062a",
  "deposits": "\u0627\u0644\u0625\u064a\u062f\u0627\u0639\u0627\u062a",
  "withdrawals": "\u0627\u0644\u0633\u062d\u0648\u0628\u0627\u062a",
  "billing": "\u0627\u0644\u0641\u0648\u062a\u0631\u0629",
  "settings": "\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a",
  "auditLogs": "\u0633\u062c\u0644\u0627\u062a \u0627\u0644\u062a\u062f\u0642\u064a\u0642",
  "roles": "\u0627\u0644\u0623\u062f\u0648\u0627\u0631 \u0648\u0627\u0644\u0635\u0644\u0627\u062d\u064a\u0627\u062a",
  "support": "\u0645\u0631\u0643\u0632 \u0627\u0644\u062f\u0639\u0645",
  "adminProfile": "\u0645\u0644\u0641 \u0627\u0644\u0645\u0634\u0631\u0641",
  "logout": "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c",
  "analytics": "\u0627\u0644\u062a\u062d\u0644\u064a\u0644\u0627\u062a",
  "login": "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644",
  "signup": "\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628",
  "getStarted": "\u0627\u0628\u062f\u0623 \u0627\u0644\u0622\u0646",
  "hello": "\u0645\u0631\u062d\u0628\u064b\u0627",
  "profile": "\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a",
  "buy": "\u0634\u0631\u0627\u0621",
  "market": "\u0627\u0644\u0633\u0648\u0642",
  "kyc": "\u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0647\u0648\u064a\u0629",
  "transfer": "\u062a\u062d\u0648\u064a\u0644",
  "walletConnect": "\u0631\u0628\u0637 \u0627\u0644\u0645\u062d\u0641\u0638\u0629",
  "myWallet": "\u0645\u062d\u0641\u0638\u062a\u064a",
  "adminPanel": "\u0644\u0648\u062d\u0629 \u0627\u0644\u0625\u062f\u0627\u0631\u0629",
  "security": "\u0627\u0644\u0623\u0645\u0627\u0646",
  "features": "\u0627\u0644\u0645\u064a\u0632\u0627\u062a",
  "markets": "\u0627\u0644\u0623\u0633\u0648\u0627\u0642",
  "faq": "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629",
  "goodEvening": "\u0645\u0633\u0627\u0621 \u0627\u0644\u062e\u064a\u0631\u060c",
  "totalPlatformBalance": "\u0625\u062c\u0645\u0627\u0644\u064a \u0631\u0635\u064a\u062f \u0627\u0644\u0645\u0646\u0635\u0629",
  "live": "\u0645\u0628\u0627\u0634\u0631",
  "showBalance": "\u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u0631\u0635\u064a\u062f",
  "hideBalance": "\u0625\u062e\u0641\u0627\u0621 \u0627\u0644\u0631\u0635\u064a\u062f",
  "totalUsersLabel": "\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646",
  "active": "\u0646\u0634\u0637",
  "suspended": "\u0645\u0648\u0642\u0648\u0641",
  "pendingKyc": "\u0628\u0627\u0646\u062a\u0638\u0627\u0631 \u0627\u0644\u062a\u062d\u0642\u0642",
  "recentlyJoined": "\u0627\u0644\u0645\u0646\u0636\u0645\u0648\u0646 \u062d\u062f\u064a\u062b\u064b\u0627",
  "seeAll": "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644",
  "searchUsersPlaceholder": "\u0627\u0644\u0628\u062d\u062b \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0628\u0631\u064a\u062f \u0623\u0648 \u0627\u0644\u0647\u0627\u062a\u0641 \u0623\u0648 \u0627\u0644\u0645\u0639\u0631\u0641",
  "all": "\u0627\u0644\u0643\u0644",
  "pending": "\u0642\u064a\u062f \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631",
  "sortNewest": "\u0627\u0644\u0623\u062d\u062f\u062b \u0623\u0648\u0644\u0627\u064b",
  "sortOldest": "\u0627\u0644\u0623\u0642\u062f\u0645 \u0623\u0648\u0644\u0627\u064b",
  "sortBalanceHigh": "\u0627\u0644\u0631\u0635\u064a\u062f: \u0645\u0646 \u0627\u0644\u0623\u0639\u0644\u0649 \u0644\u0644\u0623\u0642\u0644",
  "sortBalanceLow": "\u0627\u0644\u0631\u0635\u064a\u062f: \u0645\u0646 \u0627\u0644\u0623\u0642\u0644 \u0644\u0644\u0623\u0639\u0644\u0649",
  "sortName": "\u0627\u0644\u0627\u0633\u0645 \u0623-\u064a",
  "page": "\u0635\u0641\u062d\u0629",
  "of": "\u0645\u0646",
  "heroTitlePart1": "\u0639\u0645\u0644\u062a\u0643 \u0627\u0644\u0631\u0642\u0645\u064a\u0629\u060c",
  "heroTitleHighlight": "\u0645\u062d\u0645\u064a\u0629 \u0645\u062b\u0644",
  "heroTitlePart2": "\u0641\u0648\u0631\u062a \u0646\u0648\u0643\u0633",
  "heroSubtitle": "\u0646\u062d\u0646 \u0646\u0647\u062a\u0645 \u0628\u0627\u0644\u0623\u0645\u0627\u0646 \u062d\u062a\u0649 \u0644\u0627 \u062a\u0636\u0637\u0631 \u0623\u0646\u062a \u0644\u0630\u0644\u0643. \u0643\u0644 \u0637\u0628\u0642\u0629 \u0641\u064a \u0641\u064a\u0643\u0633\u0648 \u0645\u0635\u0645\u0645\u0629 \u0644\u062d\u0645\u0627\u064a\u0629 \u0623\u0635\u0648\u0644\u0643 \u0628\u0623\u0639\u0644\u0649 \u0645\u0639\u0627\u064a\u064a\u0631 \u0627\u0644\u0635\u0646\u0627\u0639\u0629.",
  "trust1Title": "\u062a\u0634\u0641\u064a\u0631 AES-256",
  "trust1Desc": "\u062a\u0634\u0641\u064a\u0631 \u0628\u0645\u0633\u062a\u0648\u0649 \u0639\u0633\u0643\u0631\u064a \u0644\u062c\u0645\u064a\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0623\u062b\u0646\u0627\u0621 \u0627\u0644\u062a\u062e\u0632\u064a\u0646 \u0648\u0627\u0644\u0646\u0642\u0644.",
  "trust2Title": "\u0627\u0644\u0645\u0635\u0627\u062f\u0642\u0629 \u0627\u0644\u0628\u064a\u0648\u0645\u062a\u0631\u064a\u0629",
  "trust2Desc": "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u0628\u0635\u0645\u0629 \u0627\u0644\u0648\u062c\u0647 \u0648\u0627\u0644\u0625\u0635\u0628\u0639\u060c \u0641\u0648\u0631\u064a \u0648\u0628\u062f\u0648\u0646 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631.",
  "trust3Title": "\u0645\u0631\u0627\u0642\u0628\u0629 \u0639\u0644\u0649 \u0645\u062f\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629",
  "trust3Desc": "\u0643\u0634\u0641 \u0627\u0644\u062d\u0627\u0644\u0627\u062a \u0627\u0644\u0634\u0627\u0630\u0629 \u0641\u064a \u0627\u0644\u0648\u0642\u062a \u0627\u0644\u0641\u0639\u0644\u064a \u0645\u0639 \u0627\u0633\u062a\u062c\u0627\u0628\u0629 \u062a\u0644\u0642\u0627\u0626\u064a\u0629 \u0644\u0644\u062a\u0647\u062f\u064a\u062f\u0627\u062a.",
  "trust4Title": "98% \u0641\u064a \u0627\u0644\u062a\u062e\u0632\u064a\u0646 \u0627\u0644\u0628\u0627\u0631\u062f",
  "trust4Desc": "\u063a\u0627\u0644\u0628\u064a\u0629 \u0627\u0644\u0623\u0635\u0648\u0644 \u0645\u062d\u0641\u0648\u0638\u0629 \u0641\u064a \u0645\u062d\u0627\u0641\u0638 \u0628\u0627\u0631\u062f\u0629 \u063a\u064a\u0631 \u0645\u062a\u0635\u0644\u0629 \u0628\u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a.",
  "trust5Title": "\u0645\u0639\u062a\u0645\u062f SOC2",
  "trust5Desc": "\u064a\u062a\u0645 \u062a\u062f\u0642\u064a\u0642\u0647 \u0628\u0634\u0643\u0644 \u0645\u0633\u062a\u0642\u0644 \u0645\u0646 \u0642\u0628\u0644 \u0634\u0631\u0643\u0627\u062a \u0623\u0645\u0646 \u0643\u0628\u0631\u0649 \u0643\u0644 \u0639\u0627\u0645.",
  "trust6Title": "\u062a\u0623\u0645\u064a\u0646 \u0628\u0642\u064a\u0645\u0629 500 \u0645\u0644\u064a\u0648\u0646 \u062f\u0648\u0644\u0627\u0631",
  "trust6Desc": "\u062a\u063a\u0637\u064a\u0629 \u0643\u0627\u0645\u0644\u0629 \u0644\u0644\u0623\u0635\u0648\u0644 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0628\u0648\u0644\u064a\u0635\u0627\u062a \u062a\u0623\u0645\u064a\u0646 \u0639\u0627\u0644\u0645\u064a\u0629 \u0631\u0627\u0626\u062f\u0629.",
  "goodAfternoon": "\u0645\u0633\u0627\u0621 \u0627\u0644\u062e\u064a\u0631",
  "totalPortfolioValue": "\u0625\u062c\u0645\u0627\u0644\u064a \u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u062d\u0641\u0638\u0629",
  "myAssets": "\u0623\u0635\u0648\u0644\u064a",
  "viewAll": "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644",
  "recentActivity": "\u0627\u0644\u0646\u0634\u0627\u0637 \u0627\u0644\u0623\u062e\u064a\u0631",
  "send": "\u0625\u0631\u0633\u0627\u0644",
  "receive": "\u0627\u0633\u062a\u0644\u0627\u0645",
  "swapAction": "\u0645\u0628\u0627\u062f\u0644\u0629",
  "card": "\u0627\u0644\u0628\u0637\u0627\u0642\u0629",
  "depositReceived": "\u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 \u0627\u0644\u0625\u064a\u062f\u0627\u0639",
  "withdrawalLabel": "\u0633\u062d\u0628"
},
  zh: {
  "overview": "\u6982\u89c8",
  "users": "\u7528\u6237",
  "wallets": "\u94b1\u5305",
  "transactions": "\u4ea4\u6613",
  "deposits": "\u5145\u503c",
  "withdrawals": "\u63d0\u73b0",
  "billing": "\u8d26\u5355",
  "settings": "\u8bbe\u7f6e",
  "auditLogs": "\u5ba1\u8ba1\u65e5\u5fd7",
  "roles": "\u89d2\u8272\u4e0e\u6743\u9650",
  "support": "\u652f\u6301\u4e2d\u5fc3",
  "adminProfile": "\u7ba1\u7406\u5458\u8d44\u6599",
  "logout": "\u9000\u51fa\u767b\u5f55",
  "analytics": "\u6570\u636e\u5206\u6790",
  "login": "\u767b\u5f55",
  "signup": "\u6ce8\u518c",
  "getStarted": "\u5f00\u59cb\u4f7f\u7528",
  "hello": "\u4f60\u597d",
  "profile": "\u4e2a\u4eba\u8d44\u6599",
  "buy": "\u8d2d\u4e70",
  "market": "\u5e02\u573a",
  "kyc": "\u8eab\u4efd\u9a8c\u8bc1",
  "transfer": "\u8f6c\u8d26",
  "walletConnect": "\u8fde\u63a5\u94b1\u5305",
  "myWallet": "\u6211\u7684\u94b1\u5305",
  "adminPanel": "\u7ba1\u7406\u9762\u677f",
  "security": "\u5b89\u5168",
  "features": "\u529f\u80fd",
  "markets": "\u5e02\u573a\u884c\u60c5",
  "faq": "\u5e38\u89c1\u95ee\u9898",
  "goodEvening": "\u665a\u4e0a\u597d\uff0c",
  "totalPlatformBalance": "\u5e73\u53f0\u603b\u4f59\u989d",
  "live": "\u5b9e\u65f6",
  "showBalance": "\u663e\u793a\u4f59\u989d",
  "hideBalance": "\u9690\u85cf\u4f59\u989d",
  "totalUsersLabel": "\u603b\u7528\u6237\u6570",
  "active": "\u6d3b\u8dc3",
  "suspended": "\u5df2\u505c\u7528",
  "pendingKyc": "\u5f85\u9a8c\u8bc1",
  "recentlyJoined": "\u6700\u8fd1\u52a0\u5165",
  "seeAll": "\u67e5\u770b\u5168\u90e8",
  "searchUsersPlaceholder": "\u6309\u59d3\u540d\u3001\u90ae\u7bb1\u3001\u7535\u8bdd\u6216ID\u641c\u7d22",
  "all": "\u5168\u90e8",
  "pending": "\u5f85\u5904\u7406",
  "sortNewest": "\u6700\u65b0\u4f18\u5148",
  "sortOldest": "\u6700\u65e9\u4f18\u5148",
  "sortBalanceHigh": "\u4f59\u989d\uff1a\u4ece\u9ad8\u5230\u4f4e",
  "sortBalanceLow": "\u4f59\u989d\uff1a\u4ece\u4f4e\u5230\u9ad8",
  "sortName": "\u59d3\u540d A-Z",
  "page": "\u7b2c",
  "of": "\u9875\uff0c\u5171",
  "heroTitlePart1": "\u4f60\u7684\u52a0\u5bc6\u8d44\u4ea7\uff0c",
  "heroTitleHighlight": "\u5982\u8bfa\u514b\u65af\u5821\u822c",
  "heroTitlePart2": "\u5b89\u5168",
  "heroSubtitle": "\u6211\u4eec\u4e13\u6ce8\u4e8e\u5b89\u5168\uff0c\u8ba9\u60a8\u65e0\u9700\u62c5\u5fc3\u3002Vexo \u7684\u6bcf\u4e00\u5c42\u90fd\u6309\u7167\u884c\u4e1a\u6700\u9ad8\u6807\u51c6\u8bbe\u8ba1\uff0c\u4ee5\u4fdd\u62a4\u60a8\u7684\u8d44\u4ea7\u3002",
  "trust1Title": "AES-256 \u52a0\u5bc6",
  "trust1Desc": "\u5bf9\u6240\u6709\u9759\u6001\u548c\u4f20\u8f93\u4e2d\u7684\u6570\u636e\u91c7\u7528\u519b\u7528\u7ea7\u52a0\u5bc6\u3002",
  "trust2Title": "\u751f\u7269\u8bc6\u522b\u8ba4\u8bc1",
  "trust2Desc": "\u652f\u6301\u9762\u5bb9ID\u548c\u6307\u7eb9\u767b\u5f55\uff0c\u5373\u65f6\u4e14\u65e0\u9700\u5bc6\u7801\u3002",
  "trust3Title": "24/7 \u76d1\u63a7",
  "trust3Desc": "\u5b9e\u65f6\u5f02\u5e38\u68c0\u6d4b\uff0c\u81ea\u52a8\u54cd\u5e94\u5a01\u80c1\u3002",
  "trust4Title": "98% \u51b7\u5b58\u50a8",
  "trust4Desc": "\u5927\u90e8\u5206\u8d44\u4ea7\u5b58\u653e\u5728\u79bb\u7ebf\u51b7\u94b1\u5305\u4e2d\u3002",
  "trust5Title": "SOC2 \u8ba4\u8bc1",
  "trust5Desc": "\u6bcf\u5e74\u63a5\u53d7\u56db\u5927\u5b89\u5168\u5ba1\u8ba1\u516c\u53f8\u7684\u72ec\u7acb\u5ba1\u8ba1\u3002",
  "trust6Title": "5\u4ebf\u7f8e\u5143\u4fdd\u9669",
  "trust6Desc": "\u901a\u8fc7\u9886\u5148\u7684\u5168\u7403\u4fdd\u9669\u653f\u7b56\u63d0\u4f9b\u5168\u989d\u8d44\u4ea7\u4fdd\u969c\u3002",
  "goodAfternoon": "\u4e0b\u5348\u597d",
  "totalPortfolioValue": "\u6295\u8d44\u7ec4\u5408\u603b\u4ef7\u503c",
  "myAssets": "\u6211\u7684\u8d44\u4ea7",
  "viewAll": "\u67e5\u770b\u5168\u90e8",
  "recentActivity": "\u6700\u8fd1\u6d3b\u52a8",
  "send": "\u53d1\u9001",
  "receive": "\u63a5\u6536",
  "swapAction": "\u5151\u6362",
  "card": "\u5361\u7247",
  "depositReceived": "\u5df2\u6536\u5230\u5145\u503c",
  "withdrawalLabel": "\u63d0\u73b0"
},
  de: {
  "overview": "\u00dcbersicht",
  "users": "Benutzer",
  "wallets": "Wallets",
  "transactions": "Transaktionen",
  "deposits": "Einzahlungen",
  "withdrawals": "Auszahlungen",
  "billing": "Abrechnung",
  "settings": "Einstellungen",
  "auditLogs": "Pr\u00fcfprotokolle",
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
  "transfer": "\u00dcberweisung",
  "walletConnect": "Wallet verbinden",
  "myWallet": "Meine Wallet",
  "adminPanel": "Admin-Bereich",
  "security": "Sicherheit",
  "features": "Funktionen",
  "markets": "M\u00e4rkte",
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
  "recentlyJoined": "K\u00fcrzlich beigetreten",
  "seeAll": "Alle anzeigen",
  "searchUsersPlaceholder": "Suche nach Name, E-Mail, Telefon oder ID",
  "all": "Alle",
  "pending": "Ausstehend",
  "sortNewest": "Neueste zuerst",
  "sortOldest": "\u00c4lteste zuerst",
  "sortBalanceHigh": "Guthaben: Hoch zu niedrig",
  "sortBalanceLow": "Guthaben: Niedrig zu hoch",
  "sortName": "Name A-Z",
  "page": "Seite",
  "of": "von",
  "heroTitlePart1": "Ihre Kryptow\u00e4hrung,",
  "heroTitleHighlight": "gesch\u00fctzt wie",
  "heroTitlePart2": "Fort Knox",
  "heroSubtitle": "Wir k\u00fcmmern uns um die Sicherheit, damit Sie es nicht m\u00fcssen. Jede Schicht von Vexo ist darauf ausgelegt, Ihre Verm\u00f6genswerte nach h\u00f6chsten Branchenstandards zu sch\u00fctzen.",
  "trust1Title": "AES-256-Verschl\u00fcsselung",
  "trust1Desc": "Milit\u00e4rische Verschl\u00fcsselung f\u00fcr alle Daten im Ruhezustand und bei der \u00dcbertragung.",
  "trust2Title": "Biometrische Authentifizierung",
  "trust2Desc": "Face-ID- und Fingerabdruck-Login f\u00fcr sofortigen, passwortlosen Zugriff.",
  "trust3Title": "24/7-\u00dcberwachung",
  "trust3Desc": "Echtzeit-Anomalieerkennung mit automatisierter Bedrohungsreaktion.",
  "trust4Title": "98% Kaltlagerung",
  "trust4Desc": "Der Gro\u00dfteil der Verm\u00f6genswerte wird in Offline-Cold-Wallets aufbewahrt.",
  "trust5Title": "SOC2-zertifiziert",
  "trust5Desc": "J\u00e4hrlich unabh\u00e4ngig von Big-4-Sicherheitsfirmen gepr\u00fcft.",
  "trust6Title": "500-Mio.-$-Versicherung",
  "trust6Desc": "Vollst\u00e4ndige Verm\u00f6gensdeckung durch f\u00fchrende globale Versicherungspolicen.",
  "goodAfternoon": "Guten Tag",
  "totalPortfolioValue": "Gesamtportfoliowert",
  "myAssets": "Meine Verm\u00f6genswerte",
  "viewAll": "Alle anzeigen",
  "recentActivity": "Letzte Aktivit\u00e4t",
  "send": "Senden",
  "receive": "Empfangen",
  "swapAction": "Tauschen",
  "card": "Karte",
  "depositReceived": "Einzahlung erhalten",
  "withdrawalLabel": "Auszahlung"
},
  pt: {
  "overview": "Vis\u00e3o geral",
  "users": "Usu\u00e1rios",
  "wallets": "Carteiras",
  "transactions": "Transa\u00e7\u00f5es",
  "deposits": "Dep\u00f3sitos",
  "withdrawals": "Saques",
  "billing": "Faturamento",
  "settings": "Configura\u00e7\u00f5es",
  "auditLogs": "Registros de auditoria",
  "roles": "Fun\u00e7\u00f5es e permiss\u00f5es",
  "support": "Central de suporte",
  "adminProfile": "Perfil do admin",
  "logout": "Sair",
  "analytics": "An\u00e1lise",
  "login": "Entrar",
  "signup": "Cadastrar",
  "getStarted": "Come\u00e7ar",
  "hello": "Ol\u00e1",
  "profile": "Perfil",
  "buy": "Comprar",
  "market": "Mercado",
  "kyc": "KYC",
  "transfer": "Transferir",
  "walletConnect": "Conectar carteira",
  "myWallet": "Minha carteira",
  "adminPanel": "Painel admin",
  "security": "Seguran\u00e7a",
  "features": "Recursos",
  "markets": "Mercados",
  "faq": "Perguntas",
  "goodEvening": "Boa noite,",
  "totalPlatformBalance": "Saldo total da plataforma",
  "live": "Ao vivo",
  "showBalance": "Mostrar saldo",
  "hideBalance": "Ocultar saldo",
  "totalUsersLabel": "Total de usu\u00e1rios",
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
  "page": "P\u00e1gina",
  "of": "de",
  "heroTitlePart1": "Sua cripto,",
  "heroTitleHighlight": "protegida como",
  "heroTitlePart2": "Fort Knox",
  "heroSubtitle": "N\u00f3s nos preocupamos com a seguran\u00e7a para que voc\u00ea n\u00e3o precise. Cada camada da Vexo \u00e9 projetada para proteger seus ativos com os mais altos padr\u00f5es do setor.",
  "trust1Title": "Criptografia AES-256",
  "trust1Desc": "Criptografia de n\u00edvel militar para todos os dados em repouso e em tr\u00e2nsito.",
  "trust2Title": "Autentica\u00e7\u00e3o biom\u00e9trica",
  "trust2Desc": "Login por Face ID e impress\u00e3o digital, instant\u00e2neo e sem senha.",
  "trust3Title": "Monitoramento 24/7",
  "trust3Desc": "Detec\u00e7\u00e3o de anomalias em tempo real com resposta automatizada a amea\u00e7as.",
  "trust4Title": "98% em armazenamento frio",
  "trust4Desc": "A maioria dos ativos \u00e9 mantida em carteiras frias offline.",
  "trust5Title": "Certificado SOC2",
  "trust5Desc": "Auditado de forma independente por empresas de seguran\u00e7a Big-4 todos os anos.",
  "trust6Title": "Seguro de US$ 500M",
  "trust6Desc": "Cobertura total de ativos por meio de ap\u00f3lices de seguro globais l\u00edderes.",
  "goodAfternoon": "Boa tarde",
  "totalPortfolioValue": "Valor total do portf\u00f3lio",
  "myAssets": "Meus ativos",
  "viewAll": "Ver tudo",
  "recentActivity": "Atividade recente",
  "send": "Enviar",
  "receive": "Receber",
  "swapAction": "Trocar",
  "card": "Cart\u00e3o",
  "depositReceived": "Dep\u00f3sito recebido",
  "withdrawalLabel": "Saque"
},
  hi: {
  "overview": "\u0905\u0935\u0932\u094b\u0915\u0928",
  "users": "\u0909\u092a\u092f\u094b\u0917\u0915\u0930\u094d\u0924\u093e",
  "wallets": "\u0935\u0949\u0932\u0947\u091f",
  "transactions": "\u0932\u0947\u0928\u0926\u0947\u0928",
  "deposits": "\u091c\u092e\u093e",
  "withdrawals": "\u0928\u093f\u0915\u093e\u0938\u0940",
  "billing": "\u092c\u093f\u0932\u093f\u0902\u0917",
  "settings": "\u0938\u0947\u091f\u093f\u0902\u0917\u094d\u0938",
  "auditLogs": "\u0911\u0921\u093f\u091f \u0932\u0949\u0917",
  "roles": "\u092d\u0942\u092e\u093f\u0915\u093e\u090f\u0902 \u0914\u0930 \u0905\u0928\u0941\u092e\u0924\u093f\u092f\u093e\u0902",
  "support": "\u0938\u0939\u093e\u092f\u0924\u093e \u0915\u0947\u0902\u0926\u094d\u0930",
  "adminProfile": "\u090f\u0921\u092e\u093f\u0928 \u092a\u094d\u0930\u094b\u092b\u093e\u0907\u0932",
  "logout": "\u0932\u0949\u0917 \u0906\u0909\u091f",
  "analytics": "\u0935\u093f\u0936\u094d\u0932\u0947\u0937\u0923",
  "login": "\u0932\u0949\u0917\u093f\u0928",
  "signup": "\u0938\u093e\u0907\u0928 \u0905\u092a",
  "getStarted": "\u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902",
  "hello": "\u0928\u092e\u0938\u094d\u0924\u0947",
  "profile": "\u092a\u094d\u0930\u094b\u092b\u093e\u0907\u0932",
  "buy": "\u0916\u0930\u0940\u0926\u0947\u0902",
  "market": "\u092c\u093e\u091c\u093c\u093e\u0930",
  "kyc": "KYC",
  "transfer": "\u0938\u094d\u0925\u093e\u0928\u093e\u0902\u0924\u0930\u0923",
  "walletConnect": "\u0935\u0949\u0932\u0947\u091f \u0915\u0928\u0947\u0915\u094d\u091f",
  "myWallet": "\u092e\u0947\u0930\u093e \u0935\u0949\u0932\u0947\u091f",
  "adminPanel": "\u090f\u0921\u092e\u093f\u0928 \u092a\u0948\u0928\u0932",
  "security": "\u0938\u0941\u0930\u0915\u094d\u0937\u093e",
  "features": "\u0938\u0941\u0935\u093f\u0927\u093e\u090f\u0902",
  "markets": "\u092c\u093e\u091c\u093c\u093e\u0930",
  "faq": "\u0938\u093e\u092e\u093e\u0928\u094d\u092f \u092a\u094d\u0930\u0936\u094d\u0928",
  "goodEvening": "\u0936\u0941\u092d \u0938\u0902\u0927\u094d\u092f\u093e,",
  "totalPlatformBalance": "\u0915\u0941\u0932 \u092a\u094d\u0932\u0947\u091f\u092b\u093c\u0949\u0930\u094d\u092e \u092c\u0948\u0932\u0947\u0902\u0938",
  "live": "\u0932\u093e\u0907\u0935",
  "showBalance": "\u092c\u0948\u0932\u0947\u0902\u0938 \u0926\u093f\u0916\u093e\u090f\u0902",
  "hideBalance": "\u092c\u0948\u0932\u0947\u0902\u0938 \u091b\u093f\u092a\u093e\u090f\u0902",
  "totalUsersLabel": "\u0915\u0941\u0932 \u0909\u092a\u092f\u094b\u0917\u0915\u0930\u094d\u0924\u093e",
  "active": "\u0938\u0915\u094d\u0930\u093f\u092f",
  "suspended": "\u0928\u093f\u0932\u0902\u092c\u093f\u0924",
  "pendingKyc": "KYC \u0932\u0902\u092c\u093f\u0924",
  "recentlyJoined": "\u0939\u093e\u0932 \u0939\u0940 \u092e\u0947\u0902 \u091c\u0941\u0921\u093c\u0947",
  "seeAll": "\u0938\u092d\u0940 \u0926\u0947\u0916\u0947\u0902",
  "searchUsersPlaceholder": "\u0928\u093e\u092e, \u0908\u092e\u0947\u0932, \u092b\u094b\u0928 \u092f\u093e \u0906\u0908\u0921\u0940 \u0938\u0947 \u0916\u094b\u091c\u0947\u0902",
  "all": "\u0938\u092d\u0940",
  "pending": "\u0932\u0902\u092c\u093f\u0924",
  "sortNewest": "\u0928\u0935\u0940\u0928\u0924\u092e \u092a\u0939\u0932\u0947",
  "sortOldest": "\u092a\u0941\u0930\u093e\u0928\u0947 \u092a\u0939\u0932\u0947",
  "sortBalanceHigh": "\u092c\u0948\u0932\u0947\u0902\u0938: \u0909\u091a\u094d\u091a \u0938\u0947 \u0928\u093f\u092e\u094d\u0928",
  "sortBalanceLow": "\u092c\u0948\u0932\u0947\u0902\u0938: \u0928\u093f\u092e\u094d\u0928 \u0938\u0947 \u0909\u091a\u094d\u091a",
  "sortName": "\u0928\u093e\u092e A-Z",
  "page": "\u092a\u0943\u0937\u094d\u0920",
  "of": "\u0915\u093e",
  "heroTitlePart1": "\u0906\u092a\u0915\u0940 \u0915\u094d\u0930\u093f\u092a\u094d\u091f\u094b,",
  "heroTitleHighlight": "\u092b\u094b\u0930\u094d\u091f \u0928\u0949\u0915\u094d\u0938 \u091c\u0948\u0938\u0940",
  "heroTitlePart2": "\u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924",
  "heroSubtitle": "\u0939\u092e \u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0915\u094b \u0932\u0947\u0915\u0930 \u0917\u0902\u092d\u0940\u0930 \u0939\u0948\u0902 \u0924\u093e\u0915\u093f \u0906\u092a\u0915\u094b \u091a\u093f\u0902\u0924\u093e \u0928 \u0915\u0930\u0928\u0940 \u092a\u0921\u093c\u0947\u0964 Vexo \u0915\u0940 \u0939\u0930 \u092a\u0930\u0924 \u0906\u092a\u0915\u0940 \u0938\u0902\u092a\u0924\u094d\u0924\u093f \u0915\u094b \u0909\u0926\u094d\u092f\u094b\u0917 \u0915\u0947 \u0909\u091a\u094d\u091a\u0924\u092e \u092e\u093e\u0928\u0915\u094b\u0902 \u0915\u0947 \u0938\u093e\u0925 \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u092c\u0928\u093e\u0908 \u0917\u0908 \u0939\u0948\u0964",
  "trust1Title": "AES-256 \u090f\u0928\u094d\u0915\u094d\u0930\u093f\u092a\u094d\u0936\u0928",
  "trust1Desc": "\u0938\u092d\u0940 \u0921\u0947\u091f\u093e \u0915\u0947 \u0932\u093f\u090f \u0938\u0948\u0928\u094d\u092f-\u0938\u094d\u0924\u0930 \u0915\u0940 \u090f\u0928\u094d\u0915\u094d\u0930\u093f\u092a\u094d\u0936\u0928, \u0938\u094d\u091f\u094b\u0930\u0947\u091c \u0914\u0930 \u091f\u094d\u0930\u093e\u0902\u0938\u092e\u093f\u0936\u0928 \u0926\u094b\u0928\u094b\u0902 \u092e\u0947\u0902\u0964",
  "trust2Title": "\u092c\u093e\u092f\u094b\u092e\u0947\u091f\u094d\u0930\u093f\u0915 \u092a\u094d\u0930\u092e\u093e\u0923\u0940\u0915\u0930\u0923",
  "trust2Desc": "\u092b\u0947\u0938 \u0906\u0908\u0921\u0940 \u0914\u0930 \u092b\u093f\u0902\u0917\u0930\u092a\u094d\u0930\u093f\u0902\u091f \u0932\u0949\u0917\u093f\u0928, \u0924\u0941\u0930\u0902\u0924 \u0914\u0930 \u092c\u093f\u0928\u093e \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0915\u0947\u0964",
  "trust3Title": "24/7 \u0928\u093f\u0917\u0930\u093e\u0928\u0940",
  "trust3Desc": "\u0938\u094d\u0935\u091a\u093e\u0932\u093f\u0924 \u0916\u0924\u0930\u0947 \u0915\u0940 \u092a\u094d\u0930\u0924\u093f\u0915\u094d\u0930\u093f\u092f\u093e \u0915\u0947 \u0938\u093e\u0925 \u0930\u093f\u092f\u0932-\u091f\u093e\u0907\u092e \u0905\u0938\u093e\u092e\u093e\u0928\u094d\u092f\u0924\u093e \u092a\u0939\u091a\u093e\u0928\u0964",
  "trust4Title": "98% \u0915\u094b\u0932\u094d\u0921 \u0938\u094d\u091f\u094b\u0930\u0947\u091c",
  "trust4Desc": "\u0905\u0927\u093f\u0915\u093e\u0902\u0936 \u0938\u0902\u092a\u0924\u094d\u0924\u093f \u0911\u092b\u093c\u0932\u093e\u0907\u0928 \u0915\u094b\u0932\u094d\u0921 \u0935\u0949\u0932\u0947\u091f \u092e\u0947\u0902 \u0930\u0916\u0940 \u091c\u093e\u0924\u0940 \u0939\u0948\u0964",
  "trust5Title": "SOC2 \u092a\u094d\u0930\u092e\u093e\u0923\u093f\u0924",
  "trust5Desc": "\u0939\u0930 \u0938\u093e\u0932 \u092c\u0921\u093c\u0940 \u0938\u0941\u0930\u0915\u094d\u0937\u093e \u092b\u0930\u094d\u092e\u094b\u0902 \u0926\u094d\u0935\u093e\u0930\u093e \u0938\u094d\u0935\u0924\u0902\u0924\u094d\u0930 \u0930\u0942\u092a \u0938\u0947 \u0911\u0921\u093f\u091f \u0915\u093f\u092f\u093e \u091c\u093e\u0924\u093e \u0939\u0948\u0964",
  "trust6Title": "$500M \u092c\u0940\u092e\u093e",
  "trust6Desc": "\u0905\u0917\u094d\u0930\u0923\u0940 \u0935\u0948\u0936\u094d\u0935\u093f\u0915 \u092c\u0940\u092e\u093e \u0928\u0940\u0924\u093f\u092f\u094b\u0902 \u0915\u0947 \u092e\u093e\u0927\u094d\u092f\u092e \u0938\u0947 \u092a\u0942\u0930\u094d\u0923 \u0938\u0902\u092a\u0924\u094d\u0924\u093f \u0915\u0935\u0930\u0947\u091c\u0964",
  "goodAfternoon": "\u0928\u092e\u0938\u094d\u0915\u093e\u0930",
  "totalPortfolioValue": "\u0915\u0941\u0932 \u092a\u094b\u0930\u094d\u091f\u092b\u094b\u0932\u093f\u092f\u094b \u092e\u0942\u0932\u094d\u092f",
  "myAssets": "\u092e\u0947\u0930\u0940 \u0938\u0902\u092a\u0924\u094d\u0924\u093f\u092f\u093e\u0902",
  "viewAll": "\u0938\u092d\u0940 \u0926\u0947\u0916\u0947\u0902",
  "recentActivity": "\u0939\u093e\u0932 \u0915\u0940 \u0917\u0924\u093f\u0935\u093f\u0927\u093f",
  "send": "\u092d\u0947\u091c\u0947\u0902",
  "receive": "\u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0915\u0930\u0947\u0902",
  "swapAction": "\u0938\u094d\u0935\u0948\u092a \u0915\u0930\u0947\u0902",
  "card": "\u0915\u093e\u0930\u094d\u0921",
  "depositReceived": "\u091c\u092e\u093e \u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0939\u0941\u0908",
  "withdrawalLabel": "\u0928\u093f\u0915\u093e\u0938\u0940"
},
  ru: {
  "overview": "\u041e\u0431\u0437\u043e\u0440",
  "users": "\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438",
  "wallets": "\u041a\u043e\u0448\u0435\u043b\u044c\u043a\u0438",
  "transactions": "\u0422\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0438",
  "deposits": "\u0414\u0435\u043f\u043e\u0437\u0438\u0442\u044b",
  "withdrawals": "\u0412\u044b\u0432\u043e\u0434\u044b",
  "billing": "\u0421\u0447\u0435\u0442\u0430",
  "settings": "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438",
  "auditLogs": "\u0416\u0443\u0440\u043d\u0430\u043b\u044b \u0430\u0443\u0434\u0438\u0442\u0430",
  "roles": "\u0420\u043e\u043b\u0438 \u0438 \u043f\u0440\u0430\u0432\u0430",
  "support": "\u0426\u0435\u043d\u0442\u0440 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438",
  "adminProfile": "\u041f\u0440\u043e\u0444\u0438\u043b\u044c \u0430\u0434\u043c\u0438\u043d\u0430",
  "logout": "\u0412\u044b\u0439\u0442\u0438",
  "analytics": "\u0410\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430",
  "login": "\u0412\u043e\u0439\u0442\u0438",
  "signup": "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f",
  "getStarted": "\u041d\u0430\u0447\u0430\u0442\u044c",
  "hello": "\u041f\u0440\u0438\u0432\u0435\u0442",
  "profile": "\u041f\u0440\u043e\u0444\u0438\u043b\u044c",
  "buy": "\u041a\u0443\u043f\u0438\u0442\u044c",
  "market": "\u0420\u044b\u043d\u043e\u043a",
  "kyc": "KYC",
  "transfer": "\u041f\u0435\u0440\u0435\u0432\u043e\u0434",
  "walletConnect": "\u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u043a\u043e\u0448\u0435\u043b\u0435\u043a",
  "myWallet": "\u041c\u043e\u0439 \u043a\u043e\u0448\u0435\u043b\u0435\u043a",
  "adminPanel": "\u041f\u0430\u043d\u0435\u043b\u044c \u0430\u0434\u043c\u0438\u043d\u0430",
  "security": "\u0411\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c",
  "features": "\u0424\u0443\u043d\u043a\u0446\u0438\u0438",
  "markets": "\u0420\u044b\u043d\u043a\u0438",
  "faq": "\u0412\u043e\u043f\u0440\u043e\u0441\u044b",
  "goodEvening": "\u0414\u043e\u0431\u0440\u044b\u0439 \u0432\u0435\u0447\u0435\u0440,",
  "totalPlatformBalance": "\u041e\u0431\u0449\u0438\u0439 \u0431\u0430\u043b\u0430\u043d\u0441 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b",
  "live": "\u0412 \u0440\u0435\u0430\u043b\u044c\u043d\u043e\u043c \u0432\u0440\u0435\u043c\u0435\u043d\u0438",
  "showBalance": "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0431\u0430\u043b\u0430\u043d\u0441",
  "hideBalance": "\u0421\u043a\u0440\u044b\u0442\u044c \u0431\u0430\u043b\u0430\u043d\u0441",
  "totalUsersLabel": "\u0412\u0441\u0435\u0433\u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439",
  "active": "\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435",
  "suspended": "\u0417\u0430\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435",
  "pendingKyc": "KYC \u0432 \u043e\u0436\u0438\u0434\u0430\u043d\u0438\u0438",
  "recentlyJoined": "\u041d\u0435\u0434\u0430\u0432\u043d\u043e \u043f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u043b\u0438\u0441\u044c",
  "seeAll": "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0432\u0441\u0435",
  "searchUsersPlaceholder": "\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u0438\u043c\u0435\u043d\u0438, email, \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443 \u0438\u043b\u0438 ID",
  "all": "\u0412\u0441\u0435",
  "pending": "\u0412 \u043e\u0436\u0438\u0434\u0430\u043d\u0438\u0438",
  "sortNewest": "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u043d\u043e\u0432\u044b\u0435",
  "sortOldest": "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0441\u0442\u0430\u0440\u044b\u0435",
  "sortBalanceHigh": "\u0411\u0430\u043b\u0430\u043d\u0441: \u0441\u043d\u0430\u0447\u0430\u043b\u0430 \u0431\u043e\u043b\u044c\u0448\u043e\u0439",
  "sortBalanceLow": "\u0411\u0430\u043b\u0430\u043d\u0441: \u0441\u043d\u0430\u0447\u0430\u043b\u0430 \u043c\u0430\u043b\u044b\u0439",
  "sortName": "\u0418\u043c\u044f \u0410-\u042f",
  "page": "\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430",
  "of": "\u0438\u0437",
  "heroTitlePart1": "\u0412\u0430\u0448\u0430 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u0430,",
  "heroTitleHighlight": "\u043f\u043e\u0434 \u0437\u0430\u0449\u0438\u0442\u043e\u0439 \u043a\u0430\u043a",
  "heroTitlePart2": "\u0424\u043e\u0440\u0442-\u041d\u043e\u043a\u0441",
  "heroSubtitle": "\u041c\u044b \u0437\u0430\u0431\u043e\u0442\u0438\u043c\u0441\u044f \u043e \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438, \u0447\u0442\u043e\u0431\u044b \u0432\u0430\u043c \u043d\u0435 \u043f\u0440\u0438\u0448\u043b\u043e\u0441\u044c. \u041a\u0430\u0436\u0434\u044b\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c Vexo \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043d \u0434\u043b\u044f \u0437\u0430\u0449\u0438\u0442\u044b \u0432\u0430\u0448\u0438\u0445 \u0430\u043a\u0442\u0438\u0432\u043e\u0432 \u043f\u043e \u0432\u044b\u0441\u043e\u0447\u0430\u0439\u0448\u0438\u043c \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u0430\u043c \u043e\u0442\u0440\u0430\u0441\u043b\u0438.",
  "trust1Title": "\u0428\u0438\u0444\u0440\u043e\u0432\u0430\u043d\u0438\u0435 AES-256",
  "trust1Desc": "\u0428\u0438\u0444\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0432\u043e\u0435\u043d\u043d\u043e\u0433\u043e \u0443\u0440\u043e\u0432\u043d\u044f \u0434\u043b\u044f \u0432\u0441\u0435\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u043f\u0440\u0438 \u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0438 \u0438 \u043f\u0435\u0440\u0435\u0434\u0430\u0447\u0435.",
  "trust2Title": "\u0411\u0438\u043e\u043c\u0435\u0442\u0440\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u0430\u0443\u0442\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044f",
  "trust2Desc": "\u0412\u0445\u043e\u0434 \u043f\u043e Face ID \u0438 \u043e\u0442\u043f\u0435\u0447\u0430\u0442\u043a\u0443 \u043f\u0430\u043b\u044c\u0446\u0430, \u043c\u0433\u043d\u043e\u0432\u0435\u043d\u043d\u043e \u0438 \u0431\u0435\u0437 \u043f\u0430\u0440\u043e\u043b\u044f.",
  "trust3Title": "\u041c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433 24/7",
  "trust3Desc": "\u041e\u0431\u043d\u0430\u0440\u0443\u0436\u0435\u043d\u0438\u0435 \u0430\u043d\u043e\u043c\u0430\u043b\u0438\u0439 \u0432 \u0440\u0435\u0430\u043b\u044c\u043d\u043e\u043c \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0441 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u043c \u0440\u0435\u0430\u0433\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435\u043c \u043d\u0430 \u0443\u0433\u0440\u043e\u0437\u044b.",
  "trust4Title": "98% \u0432 \u0445\u043e\u043b\u043e\u0434\u043d\u043e\u043c \u0445\u0440\u0430\u043d\u0438\u043b\u0438\u0449\u0435",
  "trust4Desc": "\u0411\u043e\u043b\u044c\u0448\u0438\u043d\u0441\u0442\u0432\u043e \u0430\u043a\u0442\u0438\u0432\u043e\u0432 \u0445\u0440\u0430\u043d\u0438\u0442\u0441\u044f \u0432 \u043e\u0444\u043b\u0430\u0439\u043d \u0445\u043e\u043b\u043e\u0434\u043d\u044b\u0445 \u043a\u043e\u0448\u0435\u043b\u044c\u043a\u0430\u0445.",
  "trust5Title": "\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043a\u0430\u0442 SOC2",
  "trust5Desc": "\u0415\u0436\u0435\u0433\u043e\u0434\u043d\u044b\u0439 \u043d\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043c\u044b\u0439 \u0430\u0443\u0434\u0438\u0442 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f\u043c\u0438 Big-4 \u043f\u043e \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438.",
  "trust6Title": "\u0421\u0442\u0440\u0430\u0445\u043e\u0432\u043a\u0430 \u043d\u0430 $500 \u043c\u043b\u043d",
  "trust6Desc": "\u041f\u043e\u043b\u043d\u043e\u0435 \u043f\u043e\u043a\u0440\u044b\u0442\u0438\u0435 \u0430\u043a\u0442\u0438\u0432\u043e\u0432 \u0432\u0435\u0434\u0443\u0449\u0438\u043c\u0438 \u043c\u0438\u0440\u043e\u0432\u044b\u043c\u0438 \u0441\u0442\u0440\u0430\u0445\u043e\u0432\u044b\u043c\u0438 \u043f\u043e\u043b\u0438\u0441\u0430\u043c\u0438.",
  "goodAfternoon": "\u0414\u043e\u0431\u0440\u044b\u0439 \u0434\u0435\u043d\u044c",
  "totalPortfolioValue": "\u041e\u0431\u0449\u0430\u044f \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u043f\u043e\u0440\u0442\u0444\u0435\u043b\u044f",
  "myAssets": "\u041c\u043e\u0438 \u0430\u043a\u0442\u0438\u0432\u044b",
  "viewAll": "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0432\u0441\u0435",
  "recentActivity": "\u041d\u0435\u0434\u0430\u0432\u043d\u044f\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c",
  "send": "\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c",
  "receive": "\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c",
  "swapAction": "\u041e\u0431\u043c\u0435\u043d\u044f\u0442\u044c",
  "card": "\u041a\u0430\u0440\u0442\u0430",
  "depositReceived": "\u0414\u0435\u043f\u043e\u0437\u0438\u0442 \u043f\u043e\u043b\u0443\u0447\u0435\u043d",
  "withdrawalLabel": "\u0412\u044b\u0432\u043e\u0434"
},
  ja: {
  "overview": "\u6982\u8981",
  "users": "\u30e6\u30fc\u30b6\u30fc",
  "wallets": "\u30a6\u30a9\u30ec\u30c3\u30c8",
  "transactions": "\u53d6\u5f15",
  "deposits": "\u5165\u91d1",
  "withdrawals": "\u51fa\u91d1",
  "billing": "\u8acb\u6c42",
  "settings": "\u8a2d\u5b9a",
  "auditLogs": "\u76e3\u67fb\u30ed\u30b0",
  "roles": "\u5f79\u5272\u3068\u6a29\u9650",
  "support": "\u30b5\u30dd\u30fc\u30c8\u30bb\u30f3\u30bf\u30fc",
  "adminProfile": "\u7ba1\u7406\u8005\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb",
  "logout": "\u30ed\u30b0\u30a2\u30a6\u30c8",
  "analytics": "\u5206\u6790",
  "login": "\u30ed\u30b0\u30a4\u30f3",
  "signup": "\u65b0\u898f\u767b\u9332",
  "getStarted": "\u59cb\u3081\u308b",
  "hello": "\u3053\u3093\u306b\u3061\u306f",
  "profile": "\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb",
  "buy": "\u8cfc\u5165",
  "market": "\u30de\u30fc\u30b1\u30c3\u30c8",
  "kyc": "\u672c\u4eba\u78ba\u8a8d",
  "transfer": "\u9001\u91d1",
  "walletConnect": "\u30a6\u30a9\u30ec\u30c3\u30c8\u63a5\u7d9a",
  "myWallet": "\u30de\u30a4\u30a6\u30a9\u30ec\u30c3\u30c8",
  "adminPanel": "\u7ba1\u7406\u30d1\u30cd\u30eb",
  "security": "\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3",
  "features": "\u6a5f\u80fd",
  "markets": "\u30de\u30fc\u30b1\u30c3\u30c8",
  "faq": "\u3088\u304f\u3042\u308b\u8cea\u554f",
  "goodEvening": "\u3053\u3093\u3070\u3093\u306f\u3001",
  "totalPlatformBalance": "\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u7dcf\u6b8b\u9ad8",
  "live": "\u30e9\u30a4\u30d6",
  "showBalance": "\u6b8b\u9ad8\u3092\u8868\u793a",
  "hideBalance": "\u6b8b\u9ad8\u3092\u96a0\u3059",
  "totalUsersLabel": "\u7dcf\u30e6\u30fc\u30b6\u30fc\u6570",
  "active": "\u30a2\u30af\u30c6\u30a3\u30d6",
  "suspended": "\u505c\u6b62\u4e2d",
  "pendingKyc": "KYC \u4fdd\u7559\u4e2d",
  "recentlyJoined": "\u6700\u8fd1\u53c2\u52a0",
  "seeAll": "\u3059\u3079\u3066\u898b\u308b",
  "searchUsersPlaceholder": "\u540d\u524d\u3001\u30e1\u30fc\u30eb\u3001\u96fb\u8a71\u3001ID\u3067\u691c\u7d22",
  "all": "\u3059\u3079\u3066",
  "pending": "\u4fdd\u7559\u4e2d",
  "sortNewest": "\u65b0\u3057\u3044\u9806",
  "sortOldest": "\u53e4\u3044\u9806",
  "sortBalanceHigh": "\u6b8b\u9ad8\uff1a\u9ad8\u3044\u9806",
  "sortBalanceLow": "\u6b8b\u9ad8\uff1a\u4f4e\u3044\u9806",
  "sortName": "\u540d\u524d A-Z",
  "page": "\u30da\u30fc\u30b8",
  "of": "/",
  "heroTitlePart1": "\u3042\u306a\u305f\u306e\u6697\u53f7\u8cc7\u7523\u3092\u3001",
  "heroTitleHighlight": "\u30d5\u30a9\u30fc\u30c8\u30ce\u30c3\u30af\u30b9\u4e26\u307f\u306b",
  "heroTitlePart2": "\u4fdd\u8b77",
  "heroSubtitle": "\u79c1\u305f\u3061\u304c\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u306b\u3053\u3060\u308f\u308b\u3053\u3068\u3067\u3001\u3042\u306a\u305f\u306f\u305d\u306e\u5fc5\u8981\u304c\u306a\u304f\u306a\u308a\u307e\u3059\u3002Vexo\u306e\u3059\u3079\u3066\u306e\u5c64\u306f\u696d\u754c\u6700\u9ad8\u6c34\u6e96\u3067\u3042\u306a\u305f\u306e\u8cc7\u7523\u3092\u4fdd\u8b77\u3059\u308b\u3088\u3046\u8a2d\u8a08\u3055\u308c\u3066\u3044\u307e\u3059\u3002",
  "trust1Title": "AES-256\u6697\u53f7\u5316",
  "trust1Desc": "\u4fdd\u5b58\u4e2d\u304a\u3088\u3073\u8ee2\u9001\u4e2d\u306e\u3059\u3079\u3066\u306e\u30c7\u30fc\u30bf\u306b\u8ecd\u4e8b\u30ec\u30d9\u30eb\u306e\u6697\u53f7\u5316\u3092\u9069\u7528\u3002",
  "trust2Title": "\u751f\u4f53\u8a8d\u8a3c",
  "trust2Desc": "Face ID\u3068\u6307\u7d0b\u8a8d\u8a3c\u3067\u30d1\u30b9\u30ef\u30fc\u30c9\u4e0d\u8981\u306e\u5373\u6642\u30ed\u30b0\u30a4\u30f3\u3002",
  "trust3Title": "24\u6642\u9593\u76e3\u8996",
  "trust3Desc": "\u30ea\u30a2\u30eb\u30bf\u30a4\u30e0\u306e\u7570\u5e38\u691c\u77e5\u3068\u81ea\u52d5\u8105\u5a01\u5bfe\u5fdc\u3002",
  "trust4Title": "98%\u304c\u30b3\u30fc\u30eb\u30c9\u30b9\u30c8\u30ec\u30fc\u30b8",
  "trust4Desc": "\u8cc7\u7523\u306e\u5927\u90e8\u5206\u306f\u30aa\u30d5\u30e9\u30a4\u30f3\u306e\u30b3\u30fc\u30eb\u30c9\u30a6\u30a9\u30ec\u30c3\u30c8\u3067\u4fdd\u7ba1\u3002",
  "trust5Title": "SOC2\u8a8d\u8a3c\u53d6\u5f97",
  "trust5Desc": "\u6bce\u5e74\u5927\u624b\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u76e3\u67fb\u6cd5\u4eba\u306b\u3088\u308b\u72ec\u7acb\u76e3\u67fb\u3092\u5b9f\u65bd\u3002",
  "trust6Title": "5\u5104\u30c9\u30eb\u306e\u4fdd\u967a",
  "trust6Desc": "\u4e16\u754c\u5927\u624b\u306e\u4fdd\u967a\u5951\u7d04\u306b\u3088\u308b\u5168\u8cc7\u7523\u306e\u5b8c\u5168\u88dc\u511f\u3002",
  "goodAfternoon": "\u3053\u3093\u306b\u3061\u306f",
  "totalPortfolioValue": "\u7dcf\u8cc7\u7523\u4fa1\u5024",
  "myAssets": "\u30de\u30a4\u8cc7\u7523",
  "viewAll": "\u3059\u3079\u3066\u898b\u308b",
  "recentActivity": "\u6700\u8fd1\u306e\u30a2\u30af\u30c6\u30a3\u30d3\u30c6\u30a3",
  "send": "\u9001\u91d1",
  "receive": "\u53d7\u53d6",
  "swapAction": "\u30b9\u30ef\u30c3\u30d7",
  "card": "\u30ab\u30fc\u30c9",
  "depositReceived": "\u5165\u91d1\u5b8c\u4e86",
  "withdrawalLabel": "\u51fa\u91d1"
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
console.log("Updated: app/lib/i18n.js (merged with new Hero/dashboard keys)");

fs.writeFileSync(path.join(__dirname, "app/components/Hero.js"), `"use client";
import Reveal from "./Reveal";
import HeroVisual from "./HeroVisual";
import { useLanguage } from "../lib/i18n";

export default function Hero() {
  const { t } = useLanguage();

  const trustList = [
    { icon: "🔒", title: t("trust1Title"), desc: t("trust1Desc") },
    { icon: "🆔", title: t("trust2Title"), desc: t("trust2Desc") },
    { icon: "👁", title: t("trust3Title"), desc: t("trust3Desc") },
    { icon: "🧊", title: t("trust4Title"), desc: t("trust4Desc") },
    { icon: "🎖", title: t("trust5Title"), desc: t("trust5Desc") },
    { icon: "🛡", title: t("trust6Title"), desc: t("trust6Desc") },
  ];

  return (
    <section id="security" className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-12">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <Reveal y={20} scale={0.97}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            {t("heroTitlePart1")} <span className="text-vexo-orange">{t("heroTitleHighlight")}</span> {t("heroTitlePart2")}
          </h1>
          <p className="text-vexo-muted mt-5 text-base sm:text-lg">
            {t("heroSubtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.15} scale={0.9}>
          <HeroVisual />
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-10 max-w-3xl mx-auto">
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
`, "utf8");
console.log("Updated: app/components/Hero.js (translated)");

fs.writeFileSync(path.join(__dirname, "app/dashboard/page.js"), `"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconBell, IconEye, IconEyeOff, IconSend2, IconArrowDown,
  IconArrowsExchange, IconCreditCard, IconCurrencyBitcoin,
  IconCurrencyEthereum, IconHexagon,
} from "@tabler/icons-react";
import Sparkline from "../components/Sparkline";
import AssetRow from "../components/AssetRow";
import BottomNav from "../components/BottomNav";
import { useLanguage } from "../lib/i18n";

const assets = [
  { name: "Bitcoin", symbol: "BTC", icon: IconCurrencyBitcoin, iconColor: "#F7931A", amount: "0.412", value: "27,642.01", changePercent: "0.97" },
  { name: "Ethereum", symbol: "ETH", icon: IconCurrencyEthereum, iconColor: "#8A92B2", amount: "1.85", value: "6,556.18", changePercent: "1.87" },
  { name: "Polygon", symbol: "MATIC", icon: IconHexagon, iconColor: "#8247E5", amount: "1,240", value: "632.40", changePercent: "0.49" },
];

export default function Dashboard() {
  const [hidden, setHidden] = useState(false);
  const { t } = useLanguage();

  const recentActivity = [
    { label: t("depositReceived"), detail: "Sep 17", amount: "+$5,200.00" },
    { label: "Swap: BTC → ETH", detail: "Sep 16", amount: "" },
    { label: t("withdrawalLabel"), detail: "Sep 15", amount: "-$1,050.00" },
  ];

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center font-bold">N</div>
          <div>
            <p className="text-vexo-muted text-xs">{t("goodAfternoon")} 👋</p>
            <p className="font-semibold text-sm">n.osborn@shakuro.com</p>
          </div>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center">
          <IconBell size={18} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-vexo-orange text-[10px] flex items-center justify-center text-white">2</span>
        </button>
      </div>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">{t("totalPortfolioValue")}</p>
          <button onClick={() => setHidden(!hidden)} className="text-vexo-muted">
            {hidden ? <IconEyeOff size={16} /> : <IconEye size={16} />}
          </button>
        </div>
        <p className="text-3xl font-bold mt-2">{hidden ? "••••••" : "$34,830.59"}</p>
        <p className="text-vexo-green text-sm mt-1">▲ +$2,979.23 (+130.62%) today</p>
        <div className="mt-4">
          <Sparkline data={[20, 24, 22, 28, 30, 29, 34, 38, 36, 42]} color="#F5590E" width={320} height={50} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: IconSend2, label: t("send") },
          { icon: IconArrowDown, label: t("receive") },
          { icon: IconArrowsExchange, label: t("swapAction") },
          { icon: IconCreditCard, label: t("card") },
        ].map((a) => (
          <button key={a.label} className="flex flex-col items-center gap-2 bg-vexo-card border border-vexo-border rounded-2xl py-4">
            <a.icon size={18} />
            <span className="text-xs font-semibold">{a.label}</span>
          </button>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">{t("myAssets")}</p>
          <Link href="/dashboard/assets" className="text-vexo-orange text-xs font-semibold">{t("viewAll")}</Link>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {assets.map((a) => (
            <AssetRow key={a.symbol} {...a} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-vexo-muted text-xs uppercase tracking-wide">{t("recentActivity")}</p>
          <Link href="/dashboard/history" className="text-vexo-orange text-xs font-semibold">{t("viewAll")}</Link>
        </div>
        <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-vexo-border last:border-none">
              <div>
                <p className="font-semibold text-sm">{a.label}</p>
                <p className="text-vexo-muted text-xs">{a.detail}</p>
              </div>
              {a.amount && <p className="font-semibold text-sm">{a.amount}</p>}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
`, "utf8");
console.log("Updated: app/dashboard/page.js (translated)");

console.log("\nDone!");
