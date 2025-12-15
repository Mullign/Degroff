# DeGroff Aviation Technologies™ – PitotShield V2™ SmartCover™ Site

Modern one-page marketing site for the PitotShield V2™ SmartCover™ (PSV2), built with Next.js 16, Tailwind CSS, and Framer Motion.

## Prerequisites

- Node.js 20+
- npm 10+
- EmailJS account (for the newsletter form). Configure the following environment variables before deploying:
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
```

## Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to preview the site. Most content lives in `src/app/page.tsx`, and styles are handled via Tailwind utilities in the same file and `src/app/globals.css`.

## Building for Production

This project is configured for static export (ideal for GitHub Pages):

```bash
npm run build
```

Compilation artifacts are emitted to the `.next` directory. The static HTML for each route is inside `.next/server/app`, and supporting assets are in `.next/static`.

## Deploying to GitHub Pages

1. Run `npm run build`.
2. Copy the contents of `.next/static` to `Degroff/static` in your GitHub Pages branch.
3. Copy the prerendered HTML from `.next/server/app` to the root of the GitHub Pages branch, preserving the directory structure (for example, copy `page.html` to `index.html`).
4. Commit and push the generated files.

Because `basePath` and `assetPrefix` are set automatically for production builds (`/Degroff`), the exported files will resolve assets correctly at `https://mullign.github.io/Degroff/`.

## Useful Commands

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `npm run dev`    | Start the development server     |
| `npm run build`  | Generate the static production build |
| `npm run start`  | Preview the production build locally |

## Project Structure

```
src/
  app/
    layout.tsx   – global metadata and layout shell
    page.tsx     – all page sections & data
    globals.css  – Tailwind base styles and design tokens
  components/
    SiteHeader.tsx
    NewsletterForm.tsx
public/
  assets/        – imagery used throughout the site
```

## License

© DeGroff Aviation Technologies™. Content may not be reused without permission.
