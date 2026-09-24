const fs = require("fs");
const path = require("path");

// 1. New AdminNavbar component (top bar, shown on every admin page via layout.js)
const navbarPath = path.join(__dirname, "app/components/AdminNavbar.js");
fs.mkdirSync(path.dirname(navbarPath), { recursive: true });
fs.writeFileSync(navbarPath, `"use client";
import { useRouter } from "next/navigation";
import { IconShieldLock, IconLogout } from "@tabler/icons-react";
import { adminLogout } from "../lib/auth";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    adminLogout();
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-vexo-bg/95 backdrop-blur border-b border-vexo-border">
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
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs font-semibold text-vexo-muted hover:text-white transition-colors"
        >
          <IconLogout size={16} /> Logout
        </button>
      </div>
    </header>
  );
}
`, "utf8");
console.log("Created: app/components/AdminNavbar.js");

// 2. Rewrite app/admin/layout.js so it wraps EVERY admin page with the top navbar
//    and the bottom nav, and keeps the existing admin-session redirect check.
const layoutPath = path.join(__dirname, "app/admin/layout.js");
fs.mkdirSync(path.dirname(layoutPath), { recursive: true });
fs.writeFileSync(layoutPath, `"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAdminSession } from "../lib/auth";
import AdminNavbar from "../components/AdminNavbar";
import AdminBottomNav from "../components/AdminBottomNav";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecked(true);
      return;
    }
    const session = getAdminSession();
    if (!session) {
      router.push("/admin/login");
      return;
    }
    setChecked(true);
  }, [pathname, router]);

  if (!checked) return null;

  // Login page gets no navbar/bottom nav — it's not part of the dashboard shell.
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-vexo-bg text-white">
      <AdminNavbar />
      {children}
      <AdminBottomNav />
    </div>
  );
}
`, "utf8");
console.log("Created: app/admin/layout.js");

// 3. Strip the duplicate <AdminBottomNav /> + its import out of every admin page,
//    since the layout above now renders it once for the whole section.
//    This ONLY removes those two things — everything else in each file is untouched.
const pagesToClean = [
  "app/admin/page.js",
  "app/admin/users/page.js",
  "app/admin/users/[id]/page.js",
  "app/admin/transactions/page.js",
  "app/admin/settings/page.js",
];

for (const relPath of pagesToClean) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log("Skipped (not found):", relPath);
    continue;
  }
  let content = fs.readFileSync(fullPath, "utf8");
  const before = content;

  // Remove the import line, whatever relative depth it uses.
  content = content.replace(/^\s*import\s+AdminBottomNav\s+from\s+["'][^"']*AdminBottomNav["'];?\s*\n/m, "");
  // Remove the JSX usage line, e.g. "      <AdminBottomNav />\n"
  content = content.replace(/^\s*<AdminBottomNav\s*\/>\s*\n/m, "");

  if (content !== before) {
    fs.writeFileSync(fullPath, content, "utf8");
    console.log("Cleaned duplicate nav from:", relPath);
  } else {
    console.log("No duplicate nav found in (already clean or different pattern):", relPath);
  }
}

console.log("\nDone! All /admin pages now share ONE navbar (top) and ONE bottom nav, both rendered from app/admin/layout.js. Individual pages no longer need to import or render AdminBottomNav themselves.");
