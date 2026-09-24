const fs = require('fs');
const target = 'app/dashboard/profile/page.js';
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
  '  function copyReferral() {\n    if (!referralCode) return;\n    navigator.clipboard?.writeText(referralCode);\n    setCopied(true);\n    setTimeout(() => setCopied(false), 2000);\n  }',
  '  function copyReferral() {\n    if (!referralCode) return;\n    const link = `${window.location.origin}/signup?ref=${referralCode}`;\n    navigator.clipboard?.writeText(link);\n    setCopied(true);\n    setTimeout(() => setCopied(false), 2000);\n  }',
  'copyReferral builds full link'
);

replaceOnce(
  '          {showReferral && (\n            <div className="pb-4 pt-1">\n              <div className="flex items-center justify-between bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2.5">\n                <span className="font-mono text-sm font-semibold">{referralCode || "—"}</span>\n                <button onClick={copyReferral} className="text-vexo-orange text-xs font-semibold flex items-center gap-1">\n                  {copied ? <><IconCheck size={14} /> Copied</> : <><IconCopy size={14} /> Copy</>}\n                </button>\n              </div>\n              <p className="text-vexo-muted text-xs mt-2">Share this code with friends. Rewards are calculated once they complete their first transaction.</p>\n            </div>\n          )}',
  '          {showReferral && (\n            <div className="pb-4 pt-1">\n              <div className="flex items-center justify-between bg-vexo-bg border border-vexo-border rounded-lg px-3 py-2.5">\n                <span className="font-mono text-sm font-semibold">{referralCode || "-"}</span>\n                <button onClick={copyReferral} className="text-vexo-orange text-xs font-semibold flex items-center gap-1">\n                  {copied ? <><IconCheck size={14} /> Copied</> : <><IconCopy size={14} /> Copy link</>}\n                </button>\n              </div>\n              <p className="text-vexo-muted text-xs mt-2">Share this link with friends - you will get a $5 bonus once they make their first deposit.</p>\n            </div>\n          )}',
  'referral box copies link + updated text'
);

replaceOnce(
  '     <button\n  onClick={() => { logout(); router.push("/login"); }}\n  className="flex items-center justify-center gap-2 text-red-400 font-semibold text-sm py-4 border border-red-400/30 rounded-2xl"\n>\n  <IconLogout size={18} /> {t("signOutLabel")}\n</button>',
  '     <button\n  onClick={async () => { await logout(); router.push("/login"); }}\n  className="flex items-center justify-center gap-2 text-red-400 font-semibold text-sm py-4 border border-red-400/30 rounded-2xl"\n>\n  <IconLogout size={18} /> {t("signOutLabel")}\n</button>',
  'await logout before redirecting'
);

fs.writeFileSync(target, content, 'utf8');
console.log('Patched ' + changed + ' spot(s) in ' + target);
