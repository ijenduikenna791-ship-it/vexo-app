"use client";
import { useRouter } from "next/navigation";
import {
  IconUser, IconShoppingCart, IconChartLine, IconIdBadge2, IconArrowsExchange2,
  IconLink, IconWallet, IconLogout, IconX,
} from "@tabler/icons-react";
import { getSession, logout } from "../lib/auth";
import { useLanguage } from "../lib/i18n";

export default function UserDrawer({ open, onClose }) {
  const router = useRouter();
  const session = getSession();
  const { t } = useLanguage();

  const menuItems = [
    { label: t("profile"), href: "/dashboard/profile", icon: IconUser },
    { label: t("buy"), href: "/dashboard/market", icon: IconShoppingCart },
    { label: t("market"), href: "/dashboard/market", icon: IconChartLine },
    { label: t("kyc"), href: "/dashboard/kyc", icon: IconIdBadge2 },
    { label: t("transfer"), href: "/dashboard/send", icon: IconArrowsExchange2 },
    { label: t("walletConnect"), href: "#", icon: IconLink, placeholder: true },
    { label: t("myWallet"), href: "/dashboard", icon: IconWallet },
  ];

  const handleNavigate = (item) => {
    onClose();
    if (item.placeholder) return;
    router.push(item.href);
  };

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/login");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[78%] max-w-xs bg-vexo-card border-l border-vexo-border z-50 transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <span />
          <button onClick={onClose} className="text-vexo-muted">
            <IconX size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 py-4 border-b border-vexo-border">
          <div className="w-16 h-16 rounded-full bg-vexo-card2 flex items-center justify-center">
            <IconUser size={28} className="text-vexo-muted" />
          </div>
          <p className="text-vexo-muted text-xs">{t("hello")}</p>
          <p className="font-bold">{session?.username || "Guest"}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigate(item)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-left hover:bg-vexo-card2 transition-colors"
            >
              <item.icon size={18} className="text-vexo-orange" />
              {item.label}
              {item.placeholder && (
                <span className="ml-auto text-[10px] text-vexo-muted font-normal">Soon</span>
              )}
            </button>
          ))}
        </div>

        <div className="px-4 pb-6 pt-2">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-full bg-gradient-to-r from-vexo-orange to-vexo-green text-white font-semibold text-sm"
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </>
  );
}
