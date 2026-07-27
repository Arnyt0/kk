# WattPayback

Neutral, transparent home-energy and solar calculators.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Client-side calculator math only (no API routes / database)
- MDX blog posts in `content/blog/`
- Inline SVG charts (no chart library)
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

## Tools

Nine calculators under `/tools/*` — see the home page. Region defaults (yield + currency) live in React context and localStorage.

Personal/operator details are marked with `TODO` on About, Contact, Privacy and Terms.
