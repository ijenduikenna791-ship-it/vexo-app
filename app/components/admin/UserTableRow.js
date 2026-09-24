import Link from "next/link";
import UserAvatar from "../UserAvatar";
import StatusBadge from "../StatusBadge";

export default function UserTableRow({ user }) {
  return (
    <Link
      href={`/admin/users/${user.id}`}
      className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none transition-colors duration-150 hover:bg-vexo-card2/40 -mx-2 px-2 rounded-lg"
    >
      <div className="flex items-center gap-3 min-w-0">
        <UserAvatar name={user.name} size={40} />
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{user.name}</p>
          <p className="text-vexo-muted text-xs truncate">{user.email}</p>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-1 shrink-0">
        <p className="font-semibold text-sm">${user.balance.toLocaleString()}</p>
        <StatusBadge status={user.status} />
      </div>
    </Link>
  );
}
