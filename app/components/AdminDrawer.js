"use client";
import { useRouter } from "next/navigation";
import {
  IconLayoutDashboard, IconUsers, IconWallet, IconArrowsExchange, IconArrowDownLeft,
  IconArrowUpRight, IconReceipt2, IconChartBar, IconSettings, IconHistory, IconLock,
  IconHeadset, IconUserCog, IconLink, IconShieldLock, IconLogout, IconX, IconIdBadge2,
} from "@tabler/icons-react";
import { adminLogout } from "../lib/auth";
import { useLanguage } from "../lib/i18n";

export default function AdminDrawer({ open, onClose }) {
  const router = useRouter();
  const { t } = useLanguage();

  const sections = [
    {
      label: "Dashboard",
      items: [
        { label: t("overview"), href: "/admin", icon: IconLayoutDashboard },
        { label: t("analytics"), href: "/admin/analytics", icon: IconChartBar },
      ],
    },
    {
      label: "Users",
      items: [
        { label: t("users"), href: "/admin/users", icon: IconUsers },
        { label: "KYC Review", href: "/admin/kyc", icon: IconIdBadge2 },
      ],
    },
    {
      label: "Financial",
      items: [
        { label: t("wallets"), href: "/admin/wallets", icon: IconWallet },
        { label: t("transactions"), href: "/admin/transactions", icon: IconArrowsExchange },
        { label: t("deposits"), href: "/admin/deposits", icon: IconArrowDownLeft },
        { label: t("withdrawals"), href: "/admin/withdrawals", icon: IconArrowUpRight },
        { label: t("billing"), href: "/admin/billing", icon: IconReceipt2 },
        { label: t("walletConnect"), href: "#", icon: IconLink, placeholder: true },
      ],
    },
    {
      label: "Administration",
      items: [
        { label: t("settings"), href: "/admin/settings", icon: IconSettings },
        { label: t("auditLogs"), href: "/admin/audit-logs", icon: IconHistory },
        { label: t("roles"), href: "/admin/roles", icon: IconLock },
        { label: t("support"), href: "/admin/support", icon: IconHeadset },
      ],
    },
    {
      label: "Account",
      items: [
        { label: t("adminProfile"), href: "/admin/profile", icon: IconUserCog },
      ],
    },
  ];

  const handleNavigate = (item) => {
    onClose();
    if (item.placeholder) return;
    router.push(item.href);
  };

  const handleLogout = () => {
    adminLogout();
    onClose();
    router.push("/admin/login");
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
        className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-vexo-card border-l border-vexo-border z-50 transition-transform duration-300 flex flex-col ${
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
          <div className="w-16 h-16 rounded-full bg-vexo-orange/15 flex items-center justify-center">
            <IconShieldLock size={26} className="text-vexo-orange" />
          </div>
          <p className="text-vexo-muted text-xs">{t("hello")}</p>
          <p className="font-bold">Admin</p>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-4">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="text-vexo-muted text-[10px] uppercase tracking-wide px-3 mb-1">{section.label}</p>
              <div className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavigate(item)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left hover:bg-vexo-card2 transition-colors"
                  >
                    <item.icon size={17} className="text-vexo-orange" />
                    {item.label}
                    {item.placeholder && (
                      <span className="ml-auto text-[10px] text-vexo-muted font-normal">Soon</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pb-6 pt-2">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-full bg-gradient-to-r from-vexo-orange to-vexo-green text-white font-semibold text-sm flex items-center justify-center gap-2"
          >
            <IconLogout size={16} /> {t("logout")}
          </button>
        </div>
      </div>
    </>
  );
}
