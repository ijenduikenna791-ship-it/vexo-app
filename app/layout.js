import { Nunito_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "./lib/i18n";
import ChatButton from "./components/ChatButton";

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
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            Tawk_API.onLoad = function(){ Tawk_API.hideWidget(); };
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6ab64ed6e5015e344450a0af/default';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
        <ChatButton />
      </body>
    </html>
  );
}
