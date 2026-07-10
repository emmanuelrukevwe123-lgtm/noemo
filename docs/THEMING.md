# Theming

Noemo ships a **monochrome (black & white) dark theme**. Colors are defined as
Tailwind tokens in `tailwind.config.ts` and as base styles in `app/globals.css`.
Components reference the semantic tokens (and a few inline grayscale hexes), so
restyling is mostly a matter of changing the tokens.

## Design tokens (`tailwind.config.ts`)

| Token | Value | Role |
|-------|-------|------|
| `paper` | `#0b0b0c` | Page background |
| `surface` | `#161618` | Card / panel background |
| `ink` | `#f4f4f5` | Primary text (and strong surfaces like primary buttons) |
| `muted` | `#a1a1a6` | Secondary text |
| `line` | `#26262a` | Borders & dividers |
| `moss` | `#fafafa` | Primary accent (was green) |
| `pine` | `#e4e4e7` | Positive emphasis text |
| `ember` | `#8e8e93` | Negative emphasis text |
| `amber` | `#c7c7cc` | Tertiary accent |
| `sky` | `#d4d4d8` | Tertiary accent |

Fonts: `--font-sans` (Hanken Grotesk), `--font-display` (Space Grotesk),
`--font-mono` (JetBrains Mono). Shadow: `shadow-soft` tuned for dark backgrounds.

## Global base (`app/globals.css`)

- `color-scheme: dark` and a black `body` background with light text.
- Grayscale `::selection`.
- Dark custom scrollbar (`.noemo-scrollbar`).

## Conventions

- **Backgrounds:** `bg-paper` (page) and `bg-surface` (cards/panels). The
  previous `bg-white` usages were migrated to `bg-surface`.
- **Text:** `text-ink` (primary), `text-muted` (secondary).
- **Borders:** `border-line`.
- **Positive vs negative:** `text-pine` (brighter) for wins/positive,
  `text-ember` (dimmer) for losses/negative. Because the palette is grayscale,
  the distinction is by **value (lightness)**, reinforced by `+`/`−` formatting.
- **Primary buttons / accent chips:** white surface (`bg-ink` / `bg-moss`) with
  dark foreground (`text-paper` / `text-[#0b0b0c]`).

## Charts

`components/app/performance-charts.tsx` uses explicit grayscale values for
Recharts: grid `#26262a`, line stroke `#e4e4e7`, bar fill `#8e8e93`.

## Accessibility note

In pure black & white, win/loss can no longer rely on hue. Keep the
value-difference between `pine` and `ember`, and lean on signs/icons/weight so
the distinction stays legible (including for colorblind users). The Recharts
default tick/tooltip colors are dim on dark — set explicit light colors if you
extend the charts.

## Restyling / adding a light mode

1. To re-tint the whole app, edit the tokens in `tailwind.config.ts` (and the
   matching base values in `app/globals.css`).
2. To add a light/dark toggle: introduce a `data-theme` / `class="dark"`
   strategy, move the token values to CSS variables, and provide a toggle. Note
   `components/landing/landing-page.tsx` still contains a now-inert `dark`/light
   conditional that could be repurposed or removed.
