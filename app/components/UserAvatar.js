const colors = ["#F5590E", "#22C55E", "#8247E5", "#3B82F6", "#EAB308", "#EC4899"];

function hashName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
}

export default function UserAvatar({ name, size = 40 }) {
  const initial = name?.charAt(0)?.toUpperCase() || "?";
  const color = colors[hashName(name || "") % colors.length];

  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white shrink-0"
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.4 }}
    >
      {initial}
    </div>
  );
}
