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

## Conventions

- Font: **Aeonik** (`'Aeonik', sans-serif`)
- Primary dark color: `#0c0c0c`
- No comments unless the WHY is non-obvious
- Prefer editing existing files over creating new ones
- Always use `rem` for sizing and spacing — never `px`
