const fs = require("fs");
const path = require("path");

const targets = [
  "app/admin/page.js",
  "app/admin/users/page.js",
  "app/admin/users/[id]/page.js",
  "app/admin/transactions/page.js",
  "app/admin/settings/page.js",
];

for (const relPath of targets) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log("Skipped (not found):", relPath);
    continue;
  }
  let content = fs.readFileSync(fullPath, "utf8");
  const before = content;

  // Remove any import of AdminBottomNav, regardless of line endings/spacing.
  content = content
    .split(/\r?\n/)
    .filter((line) => !/import\s+AdminBottomNav\s+from/.test(line))
    .join("\n");

  // Remove any line that just renders <AdminBottomNav />
  content = content
    .split(/\r?\n/)
    .filter((line) => !/^\s*<AdminBottomNav\s*\/>\s*$/.test(line))
    .join("\n");

  if (content !== before) {
    fs.writeFileSync(fullPath, content, "utf8");
    console.log("Fixed:", relPath);
  } else {
    console.log("Already clean:", relPath);
  }
}

console.log("\nDone! Re-run npm run dev (or it should hot-reload) and check the user profile page again.");
