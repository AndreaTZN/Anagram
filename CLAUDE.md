# Anagram — Studio website

Design studio website for **Anagram**, a creative branding studio.

## Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity v3 (schemas in `src/sanity/schemas/`, client in `src/sanity/`)
- **Animations**: GSAP — always use GSAP for animations (never CSS transitions or other libraries)

## Project structure

```
src/
  app/          # Next.js App Router pages + layout
  components/   # Shared React components
  sanity/       # Sanity client, schemas, image helpers
  types/        # TypeScript types
```

## GSAP skills

The following GSAP skills are available — invoke them with `/gsap-*` when needed:

| Skill | Purpose |
|---|---|
| `gsap-core` | Tweens, defaults, `gsap.to/from/set` |
| `gsap-timeline` | `gsap.timeline()`, sequencing |
| `gsap-scrolltrigger` | Scroll-driven animations |
| `gsap-plugins` | SplitText, Flip, Draggable, etc. |
| `gsap-react` | `useGSAP` hook, React integration patterns |
| `gsap-frameworks` | Next.js + GSAP setup and patterns |
| `gsap-performance` | Perf best-practices, will-change, GPU layers |
| `gsap-utils` | `gsap.utils` helpers |

## Scroll — Lenis

The page scroll is handled by **Lenis** (custom wrapper element, NOT `window`). This is critical for anything scroll-related:

- The scroll container is `<div id="smooth-scroll-container">` rendered by `SmoothScroll.tsx`
- The global Lenis instance is exposed via `src/lib/lenis.ts` → `globalLenisRef.current`
- To scroll to top: `globalLenisRef.current?.scrollTo(0, { immediate: true })` — never use native `scrollTo` or set `scrollTop` directly, Lenis will override it on the next RAF tick
- **GSAP ScrollTrigger** must use `scroller: document.getElementById("smooth-scroll-container")` — default `window` scroller won't work
- Lenis fires `ScrollTrigger.update()` on every scroll tick via `lenis.on("scroll", () => ScrollTrigger.update())` (set up in `SmoothScroll.tsx`)

## Vimeo videos

Vimeo players are managed via the `useVimeoPlayer` hook (`src/hooks/useVimeoPlayer.ts`):

- The Vimeo SDK is loaded once via a singleton promise (CDN script injection)
- Each `Vimeo169` or `VimeoTwoCards` component manages its own player lifecycle via the hook
- The iframe is injected dynamically into the `.projet-card_embed-vimeo-contain` / `.video-vimeo-two_embed-contain` element
- Play/pause is driven by GSAP ScrollTrigger (using Lenis scroller — see above)
- On tab switch (release ↔ backstage), React unmounts the inactive tab's content → hook cleanup runs → player is paused and ScrollTrigger is killed automatically. No manual kill needed.
- Mobile Safari unlock: a single global `touchstart`/`touchmove` listener pre-warms all active players
- Available frame components in `src/components/cases-frame/`:
  - `Frame01` — static image, 16:9 ratio
  - `Vimeo169` — single Vimeo video, 16:9
  - `VimeoTwoCards` — two Vimeo videos side by side, 16:9 wrapper with 2-col grid

## Conventions

- Font: **Aeonik** (`'Aeonik', sans-serif`)
- Primary dark color: `#0c0c0c`
- No comments unless the WHY is non-obvious
- Prefer editing existing files over creating new ones
- Always use `rem` for sizing and spacing — never `px`

## DOM naming — inspector-first

Every meaningful section or block must have an `id` following the pattern `[page]-[section]` (e.g. `about-hero`, `case-nav-tabs`).

Rules:
- Use the **page name** as prefix: `about-`, `case-`, `works-`, `home-`, etc.
- Separate words with `-`, all lowercase
- Apply to every layout container, section, and interactive block
- Sub-elements follow `[page]-[section]-[element]` (e.g. `case-nav-section-objectives`)
- This is mandatory on every new page and component — never skip it
- **No duplicate `id` across the entire codebase** — before adding an `id`, verify it doesn't already exist elsewhere (SVG-internal ids like `id="icon"` are exempt since they're scoped inside their `<svg>`)
