const fs = require('fs');
const target = 'app/dashboard/profile/page.js';

if (!fs.existsSync(target)) {
  console.error('Could not find ' + target + ' - run this from your vexo project root.');
  process.exit(1);
}

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
  '<div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconShieldCheck size={16} /></div>\n              <div className="text-left">\n                <p className="text-sm font-semibold">{t("kycVerificationLabel")}</p>',
  '<div className="w-8 h-8 rounded-lg bg-vexo-green/15 flex items-center justify-center"><IconShieldCheck size={16} className="text-vexo-green" /></div>\n              <div className="text-left">\n                <p className="text-sm font-semibold">{t("kycVerificationLabel")}</p>',
  'KYC Verification icon'
);

replaceOnce(
  '<div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconPencil size={16} /></div>',
  '<div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center"><IconPencil size={16} className="text-indigo-400" /></div>',
  'Edit Profile icon'
);

replaceOnce(
  '<div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconLock size={16} /></div>',
  '<div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center"><IconLock size={16} className="text-amber-400" /></div>',
  'Change Password icon'
);

replaceOnce(
  '<div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconFingerprint size={16} /></div>',
  '<div className="w-8 h-8 rounded-lg bg-vexo-green/15 flex items-center justify-center"><IconFingerprint size={16} className="text-vexo-green" /></div>',
  'Biometric Auth icon'
);

replaceOnce(
  '<div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconShieldLock size={16} /></div>',
  '<div className="w-8 h-8 rounded-lg bg-vexo-green/15 flex items-center justify-center"><IconShieldLock size={16} className="text-vexo-green" /></div>',
  '2-Factor Auth icon'
);

replaceOnce(
  '<div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconBell size={16} /></div>',
  '<div className="w-8 h-8 rounded-lg bg-vexo-orange/15 flex items-center justify-center"><IconBell size={16} className="text-vexo-orange" /></div>',
  'Notifications icon'
);

replaceOnce(
  '<div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconGift size={16} /></div>',
  '<div className="w-8 h-8 rounded-lg bg-pink-500/15 flex items-center justify-center"><IconGift size={16} className="text-pink-400" /></div>',
  'Referral Program icon'
);

replaceOnce(
  '<div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconHelpCircle size={16} /></div>',
  '<div className="w-8 h-8 rounded-lg bg-vexo-card2 flex items-center justify-center"><IconHelpCircle size={16} className="text-vexo-muted" /></div>',
  'Help & Support icon'
);

fs.writeFileSync(target, content, 'utf8');
console.log('Patched ' + changed + ' icon(s) in ' + target);
