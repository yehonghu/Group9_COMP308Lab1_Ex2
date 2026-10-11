# Game Library

**Game Library** is an interactive catalog and personal collection study. It preserves the original application’s dark indigo atmosphere, React Three Fiber particle field, floating geometry, and 3D game-card foundation while expanding the visitor experience into a public, self-contained product demo.

> **Live demo:** `https://yehonghu.github.io/Group9_COMP308Lab1_Ex2/`

[![CI](https://github.com/yehonghu/Group9_COMP308Lab1_Ex2/actions/workflows/ci.yml/badge.svg)](https://github.com/yehonghu/Group9_COMP308Lab1_Ex2/actions/workflows/ci.yml)
[![Last commit](https://img.shields.io/github/last-commit/yehonghu/Group9_COMP308Lab1_Ex2)](https://github.com/yehonghu/Group9_COMP308Lab1_Ex2/commits/main)

## Public Experience

The published site works without installation, login, a local database, or an API server. It retains the original twelve-game seed catalog and adds a browser-persistent personal shelf.

| Area | Public behavior |
| --- | --- |
| Object Index | A spatial hero stage, feature signals, catalog statistics, and a pointer-responsive 3D game card. |
| Catalog | Full-text search, genre and platform filters, live result count, sorting, detail overlays, and save/remove controls. |
| My Collection | A browser-persistent personal shelf with saved-game count, average rating, genre count, removal, and reset actions. |
| Case Notes | A transparent account of the original application foundation and the public demonstration layer. |

## Design System

The visual system is intentionally continuous with the project’s original design language: deep indigo, violet accents, translucent glass planes, slow spatial motion, and Three.js depth. The upgrade moves those elements from a decorative background into a clear information hierarchy.

Game covers use abstract catalog treatments generated from each record’s controlled color fields and metadata. No copied game-art files are stored in the repository.

## Original Engineering Foundation

The repository still includes the original full-stack source structure:

| Layer | Original implementation |
| --- | --- |
| Client | React, Vite, React Router, React Three Fiber, Three.js, and the original game-library components. |
| Server | Express, MongoDB/Mongoose, JWT authentication, REST routes, game CRUD, and collection endpoints. |
| Seed data | Twelve original game records with title, genre, platform, release year, developer, rating, and description. |

The GitHub Pages build uses a public demo adapter so that the portfolio experience remains fully available without a local Express/MongoDB runtime. The original server is retained for local full-stack exploration.

## Local Development

### Public client

```bash
cd client
npm install
npm run dev
```

### Original full-stack source

```bash
cd server
npm install
npm run dev
```

The original server requires a configured MongoDB connection. The public demo does not.

## Build and Publish

The Vite configuration builds the client into the repository’s `docs/` directory and uses the GitHub Pages project base path.

```bash
cd client
npm run build
```

GitHub Pages is configured from `main` → `/docs`.

## Authorship

**Yehong Hu** is the sole author of the current portfolio upgrade, public build, documentation, commits, and deployment configuration.
