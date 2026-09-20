"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLayoutDashboard, IconUsers, IconReceipt2, IconSettings } from "@tabler/icons-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: IconLayoutDashboard },
  { href: "/admin/users", label: "Users", icon: IconUsers },
  { href: "/admin/transactions", label: "Transactions", icon: IconReceipt2 },
  { href: "/admin/settings", label: "Settings", icon: IconSettings },
];

export default function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-vexo-card border-t border-vexo-border">
      <div className="max-w-md mx-auto flex items-center justify-between px-6 py-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs ${active ? "text-white" : "text-vexo-muted"}`}
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
