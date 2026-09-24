const fs = require('fs');
const target = 'app/admin/page.js';
let content = fs.readFileSync(target, 'utf8');
let changed = 0;

function replaceOnce(oldStr, newStr, label) {
  if (content.indexOf(oldStr) === -1) {
    console.warn('Skipped (not found): ' + label);
    return;
  }
  content = content.replace(oldStr, newStr);
  changed++;
}

replaceOnce(
  '  const stats = [\n    { icon: IconUsers, label: "Total Users", value: loading ? "..." : totalUsers.toLocaleString() },\n    { icon: IconChartBar, label: "24h Volume", value: loading ? "..." : `$${volume24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },\n    { icon: IconWallet, label: "Active Wallets", value: loading ? "..." : activeWallets.toLocaleString() },\n    { icon: IconClockHour4, label: "Pending KYC", value: loading ? "..." : pendingKyc.toLocaleString() },\n  ];',
  '  const stats = [\n    { icon: IconUsers, label: "Total Users", value: loading ? "..." : totalUsers.toLocaleString(), bg: "bg-blue-500/15", color: "text-blue-400" },\n    { icon: IconChartBar, label: "24h Volume", value: loading ? "..." : `$${volume24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, bg: "bg-vexo-orange/15", color: "text-vexo-orange" },\n    { icon: IconWallet, label: "Active Wallets", value: loading ? "..." : activeWallets.toLocaleString(), bg: "bg-vexo-green/15", color: "text-vexo-green" },\n    { icon: IconClockHour4, label: "Pending KYC", value: loading ? "..." : pendingKyc.toLocaleString(), bg: "bg-amber-500/15", color: "text-amber-400" },\n  ];',
  'add colors to stats'
);

replaceOnce(
  '            <div className="w-9 h-9 rounded-lg bg-vexo-card2 flex items-center justify-center mb-3">\n              <s.icon size={18} />\n            </div>',
  '            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.bg} ${s.color}`}>\n              <s.icon size={18} />\n            </div>',
  'colored icon wrapper'
);

fs.writeFileSync(target, content, 'utf8');
console.log('Patched ' + changed + ' spot(s) in ' + target);
