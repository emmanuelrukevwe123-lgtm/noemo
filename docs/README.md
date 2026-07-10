# Noemo Documentation

Noemo is a **private, mobile-responsive Forex trade journal** built with Next.js,
TypeScript, Tailwind CSS and Supabase, with a constrained OpenAI service that
produces **post-trade reflection notes** (never trade signals or financial
advice).

This `docs/` folder is the full reference for the project. Start with whichever
document matches your goal.

## Table of contents

| Document | What it covers |
|----------|----------------|
| [SETUP.md](./SETUP.md) | Local development, environment variables, Supabase provisioning, verification commands |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | High-level system design, routing, rendering model, data flow, demo mode |
| [DATA_MODEL.md](./DATA_MODEL.md) | Database schema, tables, constraints, Row Level Security, Storage bucket, generated TypeScript types |
| [FEATURES.md](./FEATURES.md) | User-facing features and end-to-end flows (auth, logging trades, dashboard, AI review) |
| [ANALYTICS.md](./ANALYTICS.md) | Metric definitions and formulas (R-multiple, expectancy, win rate, drawdown, breakdowns) |
| [AI_REVIEW.md](./AI_REVIEW.md) | The post-trade AI review service: prompt, schema, guardrails, cost considerations |
| [API_REFERENCE.md](./API_REFERENCE.md) | Server actions and the `lib/` function surface |
| [THEMING.md](./THEMING.md) | Design tokens, the monochrome dark theme, and how to restyle |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Conventions, testing, and the known-improvements backlog |
| [TESTING_AND_TRADING_BOT.md](./TESTING_AND_TRADING_BOT.md) | How to test the app (unit tests, demo mode, end-to-end) and the assessment/plan for a subscription-gated trading bot |

## At a glance

- **Framework:** Next.js 15 (App Router, Turbopack), React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 3 (monochrome dark theme)
- **Backend:** Supabase (Postgres + Auth + Storage) via `@supabase/ssr`
- **AI:** OpenAI Responses API (default model `gpt-4.1-mini`), strict JSON-schema output
- **Validation:** Zod
- **Forms:** react-hook-form
- **Charts:** Recharts
- **Icons:** lucide-react
- **Tests:** Vitest + Testing Library + jsdom

## Demo mode

If Supabase environment variables are **not** set, the app boots into a
read-only **demo mode** backed by `lib/db/sample-data.ts`. Every screen renders
with sample trades, but writes (create/edit trade, AI review) are blocked. This
makes the UI fully inspectable without any backend setup. See
[ARCHITECTURE.md](./ARCHITECTURE.md#demo-mode) for details.
