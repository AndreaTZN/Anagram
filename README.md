# Anagram

Studio website for **Anagram**, a creative branding studio.

## Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity v3
- **Animations**: GSAP
- **Smooth scroll**: Lenis

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## CMS

The Sanity Studio is embedded at `/studio`. Schemas live in `src/sanity/schemas/`.

```bash
# Open the studio
open http://localhost:3000/studio
```

## Project structure

```
src/
  app/          # Next.js App Router pages + layout
  components/   # Shared React components
  sanity/       # Sanity client, schemas, image helpers
  types/        # TypeScript types
public/
  home/         # Static assets (hero images, etc.)
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
