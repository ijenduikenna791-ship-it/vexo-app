import Reveal from "./Reveal";

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
