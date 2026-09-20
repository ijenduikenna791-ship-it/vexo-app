import { IconUser, IconShieldLock, IconBell, IconCreditCard, IconLanguage, IconLogout, IconChevronRight } from "@tabler/icons-react";
import BottomNav from "../../components/BottomNav";

const settingsGroups = [
  {
    title: "Account",
    items: [
      { label: "Profile", icon: IconUser },
      { label: "Security", icon: IconShieldLock },
      { label: "Notifications", icon: IconBell },
    ],
  },
  {
    title: "Preferences",
    items: [
      { label: "Payment Methods", icon: IconCreditCard },
      { label: "Language & Currency", icon: IconLanguage },
    ],
  },
];

export default function Settings() {
  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-vexo-card2 border border-vexo-border" />
        <div>
          <p className="font-semibold">Norman Osborn</p>
          <p className="text-vexo-muted text-xs">n.osborn@shakuro.com</p>
        </div>
      </div>

      {settingsGroups.map((group) => (
        <div key={group.title}>
          <p className="text-vexo-muted text-xs uppercase tracking-wide mb-2">{group.title}</p>
          <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
            {group.items.map((item) => (
              <button key={item.label} className="w-full flex items-center justify-between py-4 border-b border-vexo-border last:border-none">
                <div className="flex items-center gap-3">
                  <item.icon size={18} className="text-vexo-muted" />
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                <IconChevronRight size={16} className="text-vexo-muted" />
              </button>
            ))}
          </div>
        </div>
      ))}

      <button className="flex items-center justify-center gap-2 text-red-400 font-semibold text-sm py-4">
        <IconLogout size={18} /> Log Out
      </button>

      <BottomNav />
    </main>
  );
}
