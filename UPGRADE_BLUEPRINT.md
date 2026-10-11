# Game Library Upgrade Blueprint

## Objective

Evolve the existing **Game Library Management System** into a polished public product demonstration while preserving the project’s original character: a deep indigo field, violet glass panels, luminous particle motion, floating geometry, and Three.js card interaction. The upgrade should make the existing visual language useful to the product instead of replacing it with an unrelated theme.

## Product Positioning

The site remains **Game Library**. It becomes a curated interactive index where visitors can browse a fixed catalog, filter by genre and platform, inspect a game’s profile, and build a persistent personal collection. The application will present itself clearly as a public **portfolio demo**, so visitors understand that collection data is stored in their own browser rather than in a shared production account.

## Public Deployment Strategy

The original Express/MongoDB/JWT backend will remain in the repository as evidence of the full-stack implementation. The public GitHub Pages build will use a self-contained demonstration data adapter so that browsing, filtering, collection state, sorting, detail overlays, and collection statistics work without a local server, credentials, or database. Browser storage will persist a visitor’s collection locally.

This gives the site two legitimate modes:

| Mode | Purpose | Data behavior |
| --- | --- | --- |
| Public demo | GitHub Pages portfolio experience | Catalog embedded in the client; collection and preferences stored in browser storage. |
| Original full-stack source | Engineering reference and local development | Existing Express, MongoDB, JWT, and REST routes remain available in the repository. |

## Visual Rule

Do not replace the existing visual language. Retain the indigo-to-violet environment, semitransparent glass planes, electric accent color, stars/points, and slow spatial drift. Improve it through clearer hierarchy, less arbitrary inline styling, responsive spacing, a readable type scale, and purposeful depth:

- The particle field becomes a calm spatial index behind content, with reduced density on small screens and reduced-motion support.
- Floating shapes become compositional signals around the landing stage rather than constant ornament.
- The 3D card system becomes a highlighted `Featured signal` area linked to actual catalog data.
- Cover placeholders use generated color fields, genre glyphs, and metadata rather than unlicensed copied promotional artwork.

## Information Architecture

| Route | Role | Key interaction |
| --- | --- | --- |
| `#/` | Discovery dashboard | Featured game selection, catalog statistics, spatial 3D preview, route entry points. |
| `#/catalog` | Full catalog | Text search, genre and platform filters, sort control, detail overlay, save/remove action. |
| `#/collection` | Browser-persistent personal shelf | Live counts, rating summary, remove action, empty state, reset action. |
| `#/about` | Case context | Explains the original MERN + Three.js foundation and the public demo data behavior. |

## Data and Interaction Rule

The original twelve-game seed catalog remains the source of truth. It will be extended only with presentational metadata: a controlled color pair, abstract geometric cover treatment, genre icon, and featured status. Core fields—title, genre, platform, release year, developer, rating, and description—remain recognizably tied to the original system.

Search must match title, genre, developer, and platform. Filters and sort choices must update the live result count. Visitors can save a title from a catalog card or detail overlay; that action updates the collection immediately and persists after refresh. The collection must support removal, summary statistics, and a deliberate `Reset demo data` action.

## Motion Rule

Motion should provide orientation and feedback, not obscure reading. Use a slow particle orbit, pointer-responsive 3D card rotation, card depth on hover, section reveals, collection-save feedback, and reduced-motion fallbacks. All normal document scrolling must remain unblocked.

## Publication Rule

The upgraded client will build to `docs/` with the Vite base set to `/Group9_COMP308Lab1_Ex2/`. Hash routes prevent refresh failures on GitHub Pages. The repository will enable Pages from `main` branch `/docs`, and all commits and published content will be authored only by `yehonghu`.
