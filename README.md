# Legacy XP — captured client runner

**This project serves the captured WinXP.si browser client instead of rebuilding its UI.** The local runtime uses the original HTML entry page, production JavaScript bundles, and captured images, icons, cursors, XP theme resources and sounds.

The captured website did not include a licence file or explicit reuse permission. For that reason, the original captured files are **not committed to this public repository**. The local capture folder is git-ignored. Do not publish or redistribute the captured code or artwork without confirming permission and third-party licences.

## 1. Requirements

- Node.js 20+ (the local server uses only Node's built-in modules).
- The captured runtime ZIP from this conversation: `legacy-xp-original-runtime.zip`.

No React rebuild, npm dependencies or compilation are needed for the captured client.

## 2. Put the captured files in place

From the repository root, create `reference-site` and extract the ZIP directly into it. The result must look like this:

```
legacy-xp/
  reference-site/
    index.html
    manifest.webmanifest
    sw.js
    workbox-66610c77.js
    assets/
    icons/
    cursors/
    luna/
    wallpapers/
    ...
  scripts/
    check-capture.mjs
    serve.mjs
  package.json
```

On Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force .\reference-site
Expand-Archive -Path .\legacy-xp-original-runtime.zip -DestinationPath .\reference-site -Force
```

If the ZIP is somewhere else, replace the archive path with its full path.

## 3. Check and run

```powershell
npm run check
npm run dev
```

Open **http://127.0.0.1:8090**. Click the original website's Start button to enter the XP simulator. Leave the terminal open; press `Ctrl+C` to stop the server.

The server binds to loopback only and serves files from `reference-site`. It does not upload the files or expose the local site to your LAN.

## 4. Open directly into an application

The captured client supports hash-based launch links. Examples:

- `http://127.0.0.1:8090/#open=desktop`
- `http://127.0.0.1:8090/#open=notepad`
- `http://127.0.0.1:8090/#open=paint`
- `http://127.0.0.1:8090/#open=minesweeper`

The exact aliases available are defined by the captured client.

## 5. Capture limitations

This is a browser-resource snapshot, not the original server-side repository. The main homepage and simulator bundles are present, but the HAR did not capture every separate `/apps/` information page. A few resources are also absent, including `wallpapers/bliss.jpg`, several PWA icons and some Winamp skins. The local service-worker precache list was trimmed to resources actually included in the snapshot; that helps the captured service worker install, but it cannot recreate missing files.

Wayback Machine browsing and other external integrations still need internet access. Browser storage is local to `127.0.0.1:8090` and is separate from storage at winxp.si.

## 6. Why the repo does not contain the original bundles

A public website being downloadable in a browser does not itself grant a licence to republish its source or assets. The capture had no licence/permission statement. Keep your local copy private unless the site owner confirms reuse/redistribution rights.
