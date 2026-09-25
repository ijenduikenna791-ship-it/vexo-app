const stats = [
  { label: "Assets under management", value: "$2.4B+" },
  { label: "Active users", value: "500K+" },
  { label: "Supported coins", value: "120+" },
  { label: "Countries", value: "40+" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-vexo-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl md:text-3xl font-extrabold">{stat.value}</p>
            <p className="text-vexo-muted text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
