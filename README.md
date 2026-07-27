# WattPayback

Neutral, transparent home-energy and solar calculators.

**Live:** https://wattpayback.com

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Client-side calculator math only (no API / database)
- MDX blog in `content/blog/` (12 articles)
- Inline SVG charts (no chart library)
- Ad slots ready for AdSense or sponsor links
- `next-sitemap` for sitemap + robots.txt

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Site map

- `/` — home
- `/tools` — all 9 calculators
- `/tools/*` — individual tools
- `/blog`, `/blog/[slug]`
- `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`

## Ads

Configured in `src/lib/ads.ts`. Placeholders are linked until AdSense IDs are set
in Vercel env vars (see `.env.example`).
