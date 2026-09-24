"use client";
import { useState } from "react";
import { IconShieldLock, IconMenu2 } from "@tabler/icons-react";
import AdminDrawer from "./AdminDrawer";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default function AdminNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-vexo-bg/95 backdrop-blur border-b border-vexo-border">
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
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-9 h-9 rounded-full bg-vexo-card2 border border-vexo-border flex items-center justify-center"
            >
              <IconMenu2 size={18} />
            </button>
          </div>
        </div>
      </header>

      <AdminDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
