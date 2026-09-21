# Anagram — Design reference

Read this file before creating or changing visual UI. This is a starting reference based on the existing site; check the relevant component before reusing a value. Follow [AGENTS.md](AGENTS.md) for implementation and testing rules.

## Visual direction

- Keep the interface focused on project imagery and typography, with generous space between sections and compact groups of labels.
- Reuse the surrounding page's alignment, spacing, and component styles when extending it.
- The default page background is white. Case pages use a dark background for the Backstage tab; preserve that theme behavior.

## Typography

- Use `"Aeonik", sans-serif`. Font files and weights are declared in [globals.css](src/app/globals.css).
- Regular (`400`) and medium (`500`) are used for interface text and labels.
- Compact labels commonly use `text-sm` with a line height of `0.9` or `1.1`; descriptions use more open line heights such as `1.3` or `1.4`. Match the relevant component.
- The root font size scales with viewport width. Use `rem` for sizing and spacing; do not assume `1rem` is always the same number of screen pixels.

## Colors

| Role | Existing value | Reference |
| --- | --- | --- |
| Primary text / dark surface | `#0c0c0c` | Footer, PageTheme |
| Default page surface | `#ffffff` | PageTheme |
| Footer secondary / unavailable text | `#7c7c7c` | Footer |
| Project descriptions / metadata | `#7e7e7e` | HomeContain, CaseHighlightCard |
| Light badge surface | `#f5f5f5` | CaseHighlightCard |
| Footer divider | `#0c0c0c` at 15% opacity | Footer |
| Footer upcoming badge surface | `#0c0c0c` at 5% opacity | Footer |

These are existing usages, not global CSS tokens. Keep context-specific colors consistent with their source component.

## Layout and responsive behavior

- Use Tailwind spacing utilities that resolve to `rem`, or explicit `rem` values.
- Reuse the existing flex and grid layouts. Keep desktop and mobile content and states consistent.
- Desktop navigation width is `15.625rem`, also recorded as `--nav-w` in `globals.css`.
- Responsive breakpoints vary by component. Preserve the target component's existing breakpoints when making a local change.
- Preserve media aspect ratios and cropping. [Frame01](src/components/cases-frame/Frame01.tsx) uses a 16:9 wrapper with `object-cover`; other project cards can have different ratios.

## Components and states

- Follow [Footer](src/components/Footer.tsx) for compact navigation groups, muted labels, and subtle separators.
- Upcoming footer brands use muted gray text with a small rounded `Soon` badge beside the name. They remain plain text until a destination is available.
- Follow [CaseHighlightCard](src/components/agency-page/CaseHighlightCard.tsx) for rounded metric badges and project summaries.
- Follow [HomeContain](src/components/HomeContain.tsx) for project cards and their hover behavior. Cards without a destination do not get a clickable hover treatment.
- Preserve visible keyboard focus and the distinction between links, buttons, and static labels when styling controls.

## Motion

- Use GSAP for animations, as required by `AGENTS.md`; existing CSS transitions are not a pattern for new animation work.
- Respect reduced-motion preferences. [NavWrapper](src/components/NavWrapper.tsx) provides an existing example.
- Scroll behavior uses Lenis and `#smooth-scroll-container`. Follow the scroller and cleanup rules in `AGENTS.md`.
- Preserve the Release / Backstage background change implemented in [PageTheme](src/components/PageTheme.tsx).

## Validation

- Review both desktop and mobile variants when changing a shared visual state.
- Do not start a server; the user manages it.
- Ask for permission and wait for explicit approval before testing in Chrome, including an already open tab.
