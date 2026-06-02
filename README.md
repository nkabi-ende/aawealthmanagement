# AA Wealth Management — Website

Marketing and lead-capture website for **Amathintane Amahle Wealth Management t/a AA Wealth Management**, a licensed long-term insurance brokerage based in Durban, KwaZulu-Natal (FSP No. 50739).

🌐 **Live site:** [aawealthmanagement.co.za](https://aawealthmanagement.co.za)

## About

AA Wealth helps working families and young professionals across KZN move from "covered for the funeral" to "secured for life" — with complete protection across income, illness, life, disability, savings and funeral cover, delivered with the personal trust of a local broker and the speed of a modern, digital service.

This repository contains the source for the public marketing site: a single high-converting landing page with lead capture and click-to-WhatsApp.

## Tech stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React)
- **Build tool:** Vite 7
- **Styling:** Tailwind CSS
- **UI components:** Radix UI primitives
- **Build config:** `@lovable.dev/vite-tanstack-config`
- **Rendering:** Static prerendering (SSG)
- **Hosting:** Vercel
- **Package manager:** Bun

## Local development

```bash
# install dependencies
bun install

# start the dev server
bun run dev

# build for production
bun run build
```

The production build outputs prerendered static files to `dist/client`.

## Deployment

The site auto-deploys to Vercel on every push to `main`.

**Vercel build settings:**
- Framework Preset: `Vite`
- Build Command: `bun run build`
- Output Directory: `dist/client`

Prerendering is enabled in `vite.config.ts` so all routes build to static HTML.

## Project structure
src/
├── routes/        # File-based routes (pages)
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utilities & helpers
├── router.tsx     # Router setup
├── server.ts      # Server entry (SSR wrapper)
└── styles.css      # Global styles

## Compliance

Amathintane Amahle Wealth Management t/a AA Wealth Management is an authorised Financial Services Provider, **FSP No. 50739** (Long-Term Insurance Subcategories A, B1, C and Friendly Society Benefits). Content on this site is general in nature and does not constitute financial advice.

---

© AA Wealth Management. All rights reserved.
