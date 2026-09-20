"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconChartBar, IconArrowsExchange, IconHistory, IconUser } from "@tabler/icons-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: IconHome },
  { href: "/dashboard/market", label: "Market", icon: IconChartBar },
  { href: "/dashboard/swap", label: "Swap", icon: IconArrowsExchange },
  { href: "/dashboard/history", label: "History", icon: IconHistory },
  { href: "/dashboard/profile", label: "Profile", icon: IconUser },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-vexo-card border-t border-vexo-border">
      <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs ${active ? "text-vexo-orange" : "text-vexo-muted"}`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
