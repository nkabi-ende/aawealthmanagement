# AA Wealth Management — Website

Marketing and lead-capture website for **Amathintane Amahle Wealth Management t/a AA Wealth Management**, a licensed long-term insurance brokerage based in Durban, KwaZulu-Natal (FSP No. 50739).

🌐 **Live site:** [aawealthmanagement.co.za](https://aawealthmanagement.co.za)

## About

AA Wealth helps working families and young professionals across KZN move from "covered for the funeral" to "secured for life" — with complete protection across income, illness, life, disability, savings and funeral cover, delivered with the personal trust of a local broker and the speed of a modern, digital service.

This repository contains the source for the public marketing site with lead capture and click-to-WhatsApp.

## Tech stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React)
- **Build tool:** Vite 7
- **Styling:** Tailwind CSS
- **UI components:** Radix UI primitives
- **Build config:** `@lovable.dev/vite-tanstack-config`
- **Rendering:** Static prerendering (SSG)
- **Hosting:** Cloudflare (not Vercel)
- **Package manager:** Bun

## Local development

```bash
bun install
bun run dev
bun run build
```

The build outputs prerendered static files to `dist/client` and ensures `sitemap.xml` and `robots.txt` are included.

## Production deployment: Cloudflare

The production site uses Cloudflare. Configure the existing Cloudflare deployment to build the `main` branch with:

- Build command: `bun run build`
- Output directory: `dist/client`
- Site domain: `aawealthmanagement.co.za`

Static assets are configured in `wrangler.jsonc`.

**Vercel is retired for this repository.** The root `vercel.json` sets `git.deploymentEnabled` to `false` to disable Vercel automatic Git deployments while its former project connection is being removed. To fully disconnect it and stop the GitHub integration reporting Vercel checks, open the old Vercel project's **Settings → Git → Connected Git Repository → Disconnect**. This action is managed at Vercel, not by repository files.

## Project structure

```
src/
├── routes/        # File-based routes (pages)
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utilities & helpers
├── router.tsx     # Router setup
├── server.ts      # Server entry (SSR wrapper)
└── styles.css     # Global styles
```

## Compliance

Amathintane Amahle Wealth Management t/a AA Wealth Management is an authorised Financial Services Provider, **FSP No. 50739** (Long-Term Insurance Subcategories A, B1, C and Friendly Society Benefits). Content on this site is general in nature and does not constitute financial advice.

---

© AA Wealth Management. All rights reserved.
