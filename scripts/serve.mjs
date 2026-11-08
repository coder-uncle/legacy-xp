import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(projectRoot, "reference-site");
const host = "127.0.0.1";
const port = Number(process.env.PORT || 8090);

if (!fs.existsSync(path.join(siteRoot, "index.html"))) {
  console.error("Captured site not found. Extract legacy-xp-original-runtime.zip into ./reference-site first.");
  process.exit(1);
}

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8"
};

const server = http.createServer((req, res) => {
  if (!["GET", "HEAD"].includes(req.method || "GET")) {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end("Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url || "/", `http://${host}:${port}`).pathname);
  } catch {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }

  const requested = path.resolve(siteRoot, "." + pathname);
  if (requested !== siteRoot && !requested.startsWith(siteRoot + path.sep)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  let target = requested;
  try {
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html");
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found in the captured snapshot");
      return;
    }
    const stat = fs.statSync(target);
    res.writeHead(200, {
      "Content-Type": mime[path.extname(target).toLowerCase()] || "application/octet-stream",
      "Content-Length": stat.size,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache"
    });
    if (req.method === "HEAD") res.end();
    else fs.createReadStream(target).pipe(res);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) res.writeHead(500);
    res.end("Server error");
  }
});

server.listen(port, host, () => {
  console.log("Serving the captured WinXP.si client:");
  console.log(`  http://${host}:${port}`);
  console.log("Press Ctrl+C to stop.");
});
