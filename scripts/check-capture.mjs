import fs from "node:fs";
import path from "node:path";

const root = path.resolve("reference-site");
const required = [
  "index.html",
  "manifest.webmanifest",
  "assets/index-Cbq4yA_y.js",
  "assets/boot-BEH6dX4M.js",
  "assets/windows-oHh2Nawk.js",
  "sw.js",
  "workbox-66610c77.js"
];

if (!fs.existsSync(root)) {
  console.error("Missing reference-site/. Extract legacy-xp-original-runtime.zip into reference-site first.");
  process.exit(1);
}

const missing = required.filter(file => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error("Captured client is incomplete. Missing:");
  for (const file of missing) console.error("  - " + file);
  process.exit(1);
}

function walk(dir) {
  const result = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    result.push(...(item.isDirectory() ? walk(full) : [full]));
  }
  return result;
}

const files = walk(root);
const js = files.filter(file => file.endsWith(".js")).length;
const images = files.filter(file => /\.(png|jpe?g|gif|webp|svg)$/i.test(file)).length;
console.log("Captured WinXP.si entry point and key bundles found.");
console.log(`Files: ${files.length} | JavaScript: ${js} | image assets: ${images}`);
if (!fs.existsSync(path.join(root, "wallpapers", "bliss.jpg"))) {
  console.warn("Warning: wallpapers/bliss.jpg was not included in the capture; the default Bliss background will be missing.");
}
console.log("Ready. Run: npm run dev");
