const fs = require('fs');
const target = 'app/dashboard/page.js';

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
  '            return (\n              <div key={symbol} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">',
  '            return (\n              <Link key={symbol} href={`/dashboard/coin/${symbol}`} className="flex items-center justify-between py-4 border-b border-vexo-border last:border-none">',
  'asset row open tag'
);

replaceOnce(
  '                </div>\n              </div>\n            );\n          })}',
  '                </div>\n              </Link>\n            );\n          })}',
  'asset row close tag'
);

fs.writeFileSync(target, content, 'utf8');
console.log('Patched ' + changed + ' spot(s) in ' + target);
