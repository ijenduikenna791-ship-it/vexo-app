import { Nunito_Sans } from "next/font/google";
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

const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem("vexo_theme") || "dark";
    document.documentElement.setAttribute("data-theme", theme);
    var lang = localStorage.getItem("vexo_lang") || "en";
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${nunitoSans.variable} font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
