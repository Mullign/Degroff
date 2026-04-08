# DeGroff Aviation — PitotShield V2™ Marketing Site

**A static, one-page product site for the PitotShield V2™ SmartCover™ (PSV2), built for clear storytelling, lead capture, and GitHub Pages deployment.**

This repository ships a Next.js app (`degroff-next/`) that exports to static HTML/CSS/JS—no Node server required in production.

**Live site:** [pitotshields.com](https://pitotshields.com/)  
**Repository:** [github.com/Mullign/Degroff](https://github.com/Mullign/Degroff)

---

## Overview

**Problem:** Aviation teams need a single place to understand PSV2™—what it does, how it fits common fleets, where to watch training video, and how to reach sales—without juggling PDFs and scattered links.

**Who it’s for:** Operators, maintenance teams, procurement, and partners evaluating pitot protection and COPE-prevention tooling.

**Why it’s useful:** The page consolidates hero messaging, fleet marquee, embedded demos, spec grids, downloadable manuals, Proponent distribution context, and contact paths. Light/dark theme and responsive layout keep it usable on the ramp (mobile) and in the office (desktop).

---

## Features

- **Single long-form landing page** with anchored navigation (`SiteHeader`), stats, and section-based storytelling (hero → about → training videos → technology → operations → compatibility → gallery → specs → Proponent → contact).
- **Motion and polish** via Framer Motion (scroll-triggered sections, staggered cards) without a heavy SPA framework.
- **Media-rich content:** optimized stills through `next/image` (unoptimized static export mode), inline `<video>` for demos and training clips, PDFs for manuals and spec sheets in `/public/docs`.
- **Lead capture:** newsletter / interest form through **EmailJS** (`@emailjs/browser`), with client-side rate limiting and optional dismiss state in `localStorage`.
- **Theme switching** via a React context provider (light/dark) for long reading sessions.
- **SEO & sharing:** metadata, Open Graph, and Twitter cards in `layout.tsx`, driven by `NEXT_PUBLIC_SITE_URL` for absolute image URLs.
- **Analytics:** Google Analytics (gtag) loaded with `next/script` after interactive paint.
- **Multi-host ready:** `basePath` / `assetPrefix` support for GitHub Pages under a project path, plus production domain alignment (`CNAME` for custom host).

---

## Tech Stack

| Area | Choice |
|------|--------|
| **App** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS 3, PostCSS, Autoprefixer |
| **Motion** | Framer Motion |
| **Forms** | EmailJS (browser SDK) |
| **Fonts** | Geist / Geist Mono via `next/font/google` |
| **Deploy artifact** | `next build` → **`output: "export"`** → static files in `out/` |
| **CI/CD** | GitHub Actions → GitHub Pages (upload `degroff-next/out`) |

There is **no custom backend** in this repo: forms post to EmailJS; PDFs and videos are static assets.

---

## Architecture

```
Degroff/
├── .github/workflows/nextjs.yml   # Build degroff-next, deploy out/ to Pages
├── CNAME                         # Custom domain (e.g. pitotshields.com)
├── degroff-next/
│   ├── next.config.ts            # output: 'export', basePath, images.unoptimized
│   ├── src/app/
│   │   ├── layout.tsx            # Metadata, GA, ThemeProvider, SiteBackground
│   │   └── page.tsx              # All sections + content data (single page)
│   ├── src/components/           # Header, NewsletterForm, motion helpers, UI
│   └── public/                   # assets, docs, favicon
├── assets/                       # Supplementary assets (as in upstream)
├── robots.txt, sitemap.xml       # Legacy/static SEO files at repo root (if used by host)
```

**How it works:** `page.tsx` is a client component that holds structured content arrays (stats, features, videos, PDFs) and renders sections. Paths to images and docs go through a small `asset()` helper that prefixes `NEXT_PUBLIC_BASE_PATH` so the same build serves both a custom domain and `https://mullign.github.io/Degroff/`. The GitHub Action runs `npm ci` and `next build` inside `degroff-next`, then publishes the `out` directory.

---

## Local Setup

**Requirements:** Node.js **20** and npm (matches [`.github/workflows/nextjs.yml`](.github/workflows/nextjs.yml)).

```bash
git clone https://github.com/Mullign/Degroff.git
cd Degroff/degroff-next
npm install
```

Create **`degroff-next/.env.local`** (see Environment below), then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Content and section order are primarily edited in `src/app/page.tsx`; global styles live in `src/app/globals.css`.

**Production build (static export):**

```bash
npm run build
```

Output: `degroff-next/out/`. Preview locally with any static server pointed at `out`, or `npx serve out` after build.

---

## Environment Variables

Set these in **`degroff-next/.env.local`** (or in GitHub Actions secrets for CI as needed).

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for Open Graph / metadata (default in code: `https://pitotshields.com`) |
| `NEXT_PUBLIC_BASE_PATH` | Subpath when hosting on GitHub Pages (e.g. `/Degroff`); leave empty for apex domain |
| `NEXT_PUBLIC_ASSET_PREFIX` | Optional; defaults to same as base path for assets |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key (required for live form submissions) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |

The newsletter component falls back to placeholder service/template IDs in code but still needs a valid **public key** for submissions; without it, users see a graceful error pointing to `info@degroffaviation.com`.

---

## Deployment

**GitHub Pages (automated):** Pushes to `main` run the workflow that builds `degroff-next` and deploys the `out` folder. Configure the Pages **source** to GitHub Actions in the repo settings if needed.

**Custom domain:** `CNAME` at the repo root targets the live hostname; ensure DNS and Pages custom domain settings match.

**Live site (production):** [https://pitotshields.com/](https://pitotshields.com/) — primary deployment behind the repo root `CNAME`.  
**GitHub Pages:** [mullign.github.io/Degroff](https://mullign.github.io/Degroff/) (also linked from the site footer for preview/alternate access).

---

## Screenshots

| | |
|:--|:--|
| Hero & stats | _Add `docs/screenshots/hero.png`_ |
| Training video grid | _Add `docs/screenshots/videos.png`_ |
| Specs & PDF downloads | _Add `docs/screenshots/specs.png`_ |

Replace placeholders when you have captures; short screen recordings also work well for aviation stakeholders.

---

## Challenges & Learnings

- **Static export + images:** `output: "export"` and `images.unoptimized: true` keep the build portable to any static host; tradeoff is manual image discipline rather than on-the-fly optimization.
- **Base path correctness:** Asset URLs and Open Graph images must respect `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` or social previews and deep links break on GitHub Pages vs custom domain.
- **Email without a backend:** EmailJS keeps the form serverless while still delivering leads; rate limiting and headless blocking reduce obvious abuse.
- **Content density:** One large `page.tsx` keeps the marketing story easy to scan in code reviews; splitting into MDX or a CMS would be the next step if non-developers edit copy weekly.

---

## Future Improvements

- **Content CMS or MDX** for manuals, specs, and news so marketing can update copy without touching TSX.
- **Automated Lighthouse / Core Web Vitals** in CI for the static `out` bundle.
- **Structured data** (JSON-LD) for product and organization to improve discovery.
- **Video hosting** on a dedicated stream (e.g. YouTube unlisted or enterprise CDN) if repo size or bandwidth becomes a constraint.

---

## Credits

**DeGroff Aviation Technologies™** — product, branding, and domain.  
**Site:** Footer credits “Website designed by Russell and DeGroff.”

© DeGroff Aviation Technologies™. Trademarks (e.g. PitotShield V2™, SmartCover™) belong to their respective owners. Do not reuse proprietary assets or copy without permission.
