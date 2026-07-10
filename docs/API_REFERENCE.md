# API Reference (Server Actions & `lib/`)

Noemo has no REST/HTTP API; mutations are **Server Actions** and reads are
plain server-side functions. This is the function-level reference.

## Server Actions

### `lib/actions/trades.ts`

All return `TradeActionState = { ok: boolean; error?: string; tradeId?: string }`
and enforce auth + demo mode.

#### `createTradeAction(formData: FormData)`
Validates `formData` (`formDataToTradeInput`), creates the trade + behavior +
attachments (with optional screenshot upload), revalidates `/app` and
`/app/trades`. Rejected in demo mode.

#### `updateTradeAction(tradeId: string, formData: FormData)`
Validates and updates an existing trade; revalidates `/app`, `/app/trades`, and
`/app/trades/{tradeId}`. Rejected in demo mode.

#### `generateAiReviewAction(tradeId: string)`
Loads the trade, calls `generateTradeReview`, saves the result via
`saveAiTradeReview`, revalidates the detail route. Rejected in demo mode and for
open trades.

> Error handling: `messageForError` returns the first Zod issue message for
> validation errors, otherwise `error.message`. (See known-improvements —
> consider sanitizing these.)

### `lib/actions/auth.ts`

- `signInAction(formData)` — Supabase `signInWithPassword`; redirects to `/app`
  or back to `/login?error=...`. Redirects straight to `/app` in demo mode.
- `signUpAction(formData)` — Supabase `signUp` with `full_name` metadata; same
  redirect behavior.
- `signOutAction()` — signs out (if configured) and redirects to `/`.

## Data layer — `lib/db/trades.ts`

| Function | Description |
|----------|-------------|
| `listTrades(userId, filters?)` | Returns `TradeWithRelations[]`. Uses sample data in demo mode; otherwise queries Supabase with the joined select and applies filters (`pair`, `session`, `strategy`, `outcome`, `from`, `to` in SQL; `emotion`, `mistake` in app code). Calls `noStore()`. |
| `getTradeById(userId, tradeId)` | Returns one `TradeWithRelations` (with signed attachment URLs) or `null`. Sample lookup in demo mode. |
| `createTradeRecord(userId, input, screenshot?)` | Inserts trade + behavior + attachments; uploads screenshot to Storage. Throws in demo mode. |
| `updateTradeRecord(userId, tradeId, input, screenshot?)` | Updates an existing trade and related rows. Throws in demo mode. |
| `saveAiTradeReview(userId, tradeId, payload)` | Persists an AI review row. |

Internal helpers include `mapTradeRow` (normalizes the joined Supabase shape into
`TradeWithRelations`), `toTradeInsert` / `toTradeUpdate` / `toBehaviorInsert`,
`createAttachments`, and `withSignedAttachmentUrls`.

## Analytics — `lib/analytics/trades.ts`

| Function | Description |
|----------|-------------|
| `summarizeTrades(trades)` | Full `TradeAnalytics` rollup. |
| `calculateRMultiple(pnl, risk)` | `pnl / risk`, or `null`. |
| `normalizedR(trade)` | Stored R, else computed. |
| `inferOutcome(pnl)` | win/loss/breakeven/open. |
| `behaviorInsight(...)` / `behaviorFromRow(row)` | Behavior helpers. |

See [ANALYTICS.md](./ANALYTICS.md) for formulas.

## AI — `lib/ai/trade-review.ts`

| Export | Description |
|--------|-------------|
| `generateTradeReview(trade, options?)` | Calls OpenAI, returns `{ output, model, promptVersion }`. `options`: `{ apiKey?, model?, fetcher? }`. |
| `normalizeTradeForAi(trade)` | Builds the model input payload. |
| `tradeReviewSchema` / `TradeReviewOutput` | Zod schema + type for the output. |
| `TRADE_REVIEW_PROMPT_VERSION` | `"trade-review-v1"`. |

See [AI_REVIEW.md](./AI_REVIEW.md).

## Validation — `lib/validation/trade.ts`

| Export | Description |
|--------|-------------|
| `tradeInputSchema` / `TradeInput` | Zod schema + type for trade form input. |
| `formDataToTradeInput(formData)` | Parses `FormData` into a validated `TradeInput`. |
| `mistakeTagList(value)` | Splits a comma string into normalized lowercase tags. |
| `directionValues` / `sessionValues` / `outcomeValues` / `ruleAdherenceValues` | Enum value arrays (kept in sync with DB types). |

## Auth & config — `lib/supabase/*`

| Export | Description |
|--------|-------------|
| `getCurrentUser()` | `{ user, demoMode }`. |
| `requireUser()` | Same, but redirects to `/login` if unauthenticated. |
| `isSupabaseConfigured()` | Whether both public Supabase env vars are set. |
| `getSupabaseConfig()` | URL/anon key (or placeholders). |
| `createSupabaseServerClient()` | Cookie-aware server client. |
| browser client (`lib/supabase/client.ts`) | For Client Components. |

## Utilities — `lib/utils.ts`

`cn(...)` (clsx + tailwind-merge) and formatters: `formatCurrency`,
`formatDateTime`, `formatR`.
