const styles = {
  Active: "bg-vexo-green/10 text-vexo-green",
  Completed: "bg-vexo-green/10 text-vexo-green",
  Suspended: "bg-red-500/10 text-red-400",
  Failed: "bg-red-500/10 text-red-400",
  "Pending KYC": "bg-yellow-500/10 text-yellow-400",
  Pending: "bg-yellow-500/10 text-yellow-400",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || "bg-vexo-card2 text-vexo-muted"}`}>
      {status}
    </span>
  );
}
