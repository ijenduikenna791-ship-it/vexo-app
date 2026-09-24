const fs = require("fs");
const path = require("path");

const layoutPath = path.join(__dirname, "app/layout.js");
let content = fs.readFileSync(layoutPath, "utf8");

const before = content;
content = content.replace(
  '<html lang="en">',
  '<html lang="en" suppressHydrationWarning>'
);

if (content !== before) {
  fs.writeFileSync(layoutPath, content, "utf8");
  console.log("Fixed: app/layout.js (added suppressHydrationWarning to <html>)");
} else {
  console.log("Could not find the exact <html lang=\"en\"> line — no changes made. Paste me the current app/layout.js and I'll fix it directly.");
}
