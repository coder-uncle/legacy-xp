# Legacy XP

An independent Windows XP-inspired desktop simulator built with React, TypeScript and Vite. It does not contain or execute the Windows XP operating system.

## Requirements
- Node.js 20.19+ (or 22.12+)
- npm 10+

## Run locally
```bash
git clone https://github.com/coder-uncle/legacy-xp.git
cd legacy-xp
npm install
npm run dev
```
Open the local URL printed by Vite (normally http://localhost:5173).

## Production build
```bash
npm run check
npm run build
npm run preview
```
The production site is written to `dist/`.

## Current status
This repository is the starting point for a full reference-inspired recreation. The first implementation slice includes the desktop shell, Start menu, taskbar, window management, Notepad, Calculator, Paint, virtual Explorer, Run and About. It is not yet feature-complete against WinXP.si; see [docs/ROADMAP.md](docs/ROADMAP.md).

File operations stay in a browser-local simulated filesystem. The app does not access real folders or execute Windows programs. Use third-party assets only when their licence permits redistribution.
