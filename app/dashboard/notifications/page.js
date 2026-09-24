"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconBell, IconCircleCheck, IconAlertCircle, IconInfoCircle } from "@tabler/icons-react";
import { getSession } from "../../lib/auth";
import { supabase } from "../../lib/supabaseClient";

function iconFor(type) {
  if (type === "success") return { Icon: IconCircleCheck, color: "text-vexo-green" };
  if (type === "error") return { Icon: IconAlertCircle, color: "text-red-400" };
  return { Icon: IconInfoCircle, color: "text-vexo-orange" };
}

export default function Notifications() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/login");
      return;
    }
    setSession(s);
    loadAndMarkRead(s.id);
  }, []);

  async function loadAndMarkRead(userId) {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(100);
    setNotifications(data || []);
    setLoading(false);

    const unreadIds = (data || []).filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length > 0) {
      await supabase.from("notifications").update({ read: true }).in("id", unreadIds);
    }
  }

  return (
    <main className="max-w-md mx-auto min-h-screen pb-28 px-4 pt-6 flex flex-col gap-5">
      <button onClick={() => router.push("/dashboard")} className="flex items-center gap-1 text-sm text-vexo-muted">
        <IconArrowLeft size={16} /> Back
      </button>

      <p className="text-2xl font-bold">Notifications</p>

      <div className="bg-vexo-card border border-vexo-border rounded-2xl px-4">
        {loading && <p className="text-vexo-muted text-sm text-center py-10">Loading...</p>}
        {!loading && notifications.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-12">
            <IconBell size={28} className="text-vexo-muted" />
            <p className="text-vexo-muted text-sm text-center">No notifications yet.</p>
          </div>
        )}
        {notifications.map((n) => {
          const { Icon, color } = iconFor(n.type);
          return (
            <div key={n.id} className="flex items-start gap-3 py-4 border-b border-vexo-border last:border-none">
              <Icon size={18} className={`mt-0.5 shrink-0 ${color}`} />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{n.message}</p>
                <p className="text-vexo-muted text-xs mt-1">
                  {n.created_at ? new Date(n.created_at).toLocaleString() : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
