const fs = require('fs');
const target = 'app/signup/page.js';
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
  'const countries = [\n  "United States", "United Kingdom", "Canada", "Nigeria", "Ghana", "Kenya", "South Africa",\n  "India", "Pakistan", "Germany", "France", "Spain", "Italy", "Netherlands", "Sweden",\n  "Australia", "New Zealand", "Brazil", "Mexico", "Argentina", "Japan", "South Korea",\n  "China", "Singapore", "United Arab Emirates", "Saudi Arabia", "Egypt", "Turkey",\n  "Philippines", "Indonesia", "Vietnam", "Poland", "Ireland", "Switzerland",\n];',
  'const countries = [\n  { name: "United States", code: "US", dial: "+1" },\n  { name: "United Kingdom", code: "GB", dial: "+44" },\n  { name: "Canada", code: "CA", dial: "+1" },\n  { name: "Nigeria", code: "NG", dial: "+234" },\n  { name: "Ghana", code: "GH", dial: "+233" },\n  { name: "Kenya", code: "KE", dial: "+254" },\n  { name: "South Africa", code: "ZA", dial: "+27" },\n  { name: "India", code: "IN", dial: "+91" },\n  { name: "Pakistan", code: "PK", dial: "+92" },\n  { name: "Germany", code: "DE", dial: "+49" },\n  { name: "France", code: "FR", dial: "+33" },\n  { name: "Spain", code: "ES", dial: "+34" },\n  { name: "Italy", code: "IT", dial: "+39" },\n  { name: "Netherlands", code: "NL", dial: "+31" },\n  { name: "Sweden", code: "SE", dial: "+46" },\n  { name: "Australia", code: "AU", dial: "+61" },\n  { name: "New Zealand", code: "NZ", dial: "+64" },\n  { name: "Brazil", code: "BR", dial: "+55" },\n  { name: "Mexico", code: "MX", dial: "+52" },\n  { name: "Argentina", code: "AR", dial: "+54" },\n  { name: "Japan", code: "JP", dial: "+81" },\n  { name: "South Korea", code: "KR", dial: "+82" },\n  { name: "China", code: "CN", dial: "+86" },\n  { name: "Singapore", code: "SG", dial: "+65" },\n  { name: "United Arab Emirates", code: "AE", dial: "+971" },\n  { name: "Saudi Arabia", code: "SA", dial: "+966" },\n  { name: "Egypt", code: "EG", dial: "+20" },\n  { name: "Turkey", code: "TR", dial: "+90" },\n  { name: "Philippines", code: "PH", dial: "+63" },\n  { name: "Indonesia", code: "ID", dial: "+62" },\n  { name: "Vietnam", code: "VN", dial: "+84" },\n  { name: "Poland", code: "PL", dial: "+48" },\n  { name: "Ireland", code: "IE", dial: "+353" },\n  { name: "Switzerland", code: "CH", dial: "+41" },\n];\n\nfunction flagEmoji(code) {\n  return code\n    .toUpperCase()\n    .split("")\n    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))\n    .join("");\n}',
  'countries array with codes + dial + flag helper'
);

replaceOnce(
  '                <option value="" disabled>Select your country</option>\n                {countries.map((c) => (\n                  <option key={c} value={c}>{c}</option>\n                ))}',
  '                <option value="" disabled>Select your country</option>\n                {countries.map((c) => (\n                  <option key={c.name} value={c.name}>{flagEmoji(c.code)} {c.name}</option>\n                ))}',
  'country select shows flag'
);

replaceOnce(
  '            <div>\n              <label className="text-sm font-semibold">Phone number</label>\n              <input\n                type="tel"\n                value={form.phone}\n                onChange={(e) => setForm({ ...form, phone: e.target.value })}\n                placeholder="+1 555 123 4567"\n                required\n                className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"\n              />\n            </div>',
  '            <div>\n              <label className="text-sm font-semibold">Phone number</label>\n              <div className="flex gap-2 mt-2">\n                <div className="flex items-center justify-center bg-vexo-card border border-vexo-border rounded-xl px-3 text-sm text-vexo-muted min-w-[64px]">\n                  {countries.find((c) => c.name === form.country)?.dial || "+__"}\n                </div>\n                <input\n                  type="tel"\n                  value={form.phone}\n                  onChange={(e) => setForm({ ...form, phone: e.target.value })}\n                  placeholder="555 123 4567"\n                  required\n                  className="flex-1 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"\n                />\n              </div>\n            </div>',
  'phone field split into dial code + number'
);

replaceOnce(
  '    setLoading(true);\n    const result = await signup({ ...form, referralCode });\n    setLoading(false);',
  '    const dialCode = countries.find((c) => c.name === form.country)?.dial || "";\n    const fullPhone = `${dialCode} ${form.phone}`.trim();\n\n    setLoading(true);\n    const result = await signup({ ...form, phone: fullPhone, referralCode });\n    setLoading(false);',
  'combine dial code + phone before submit'
);

fs.writeFileSync(target, content, 'utf8');
console.log('Patched ' + changed + ' spot(s) in ' + target);
