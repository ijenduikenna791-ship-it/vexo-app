"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconMenu2 } from "@tabler/icons-react";
import { getSession } from "../lib/auth";
import UserDrawer from "../components/UserDrawer";
import ThemeToggle from "../components/ThemeToggle";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/login");
      return;
    }
    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-vexo-bg text-white relative">
      <div className="fixed top-4 right-4 z-30 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-10 h-10 rounded-full bg-vexo-card border border-vexo-border flex items-center justify-center"
        >
          <IconMenu2 size={18} />
        </button>
      </div>

      {children}

      <UserDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
