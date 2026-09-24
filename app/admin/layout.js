"use client";
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
