# Features & User Flows

## Feature summary

| Area | Description |
|------|-------------|
| Landing page | Public marketing page (`/`) explaining the journal. |
| Auth | Email/password sign-in and sign-up (`/login`) via Supabase. |
| Dashboard | Headline stats, equity curve, session breakdown, recent trades (`/app`). |
| Trade log | Create, view, edit individual trades with execution + behavior + chart context. |
| Filtering | Filter trades by pair, strategy, session, outcome, emotion, mistake tag, date range. |
| Analytics | Win rate, expectancy, average R, drawdown, and pair/session/emotion/mistake breakdowns. |
| AI review | Post-trade reflection notes for **closed** trades, generated on demand. |
| Demo mode | Read-only exploration of every screen without a backend. |

## Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `LandingPage` | Marketing |
| `/login` | login page | Sign in / sign up |
| `/app` | `DashboardView` | Dashboard |
| `/app/trades` | `TradeTable` + `TradeFilters` | List & filter |
| `/app/trades/new` | `TradeForm` (create) | Log a trade |
| `/app/trades/[id]` | trade detail | View + AI review |
| `/app/trades/[id]/edit` | `TradeForm` (edit) | Edit a trade |

## Flow: sign up / sign in

1. Visit `/login`.
2. Submit email + password (sign-up also takes a full name).
3. `signInAction` / `signUpAction` call Supabase Auth and redirect to `/app`.
4. On error, redirect back to `/login?error=...`.
5. The `app/app/layout.tsx` gate (`requireUser`) protects everything under
   `/app`.

> In demo mode the auth actions simply redirect to `/app`.

## Flow: log a trade

1. From the dashboard or trades list, go to **Log a trade** (`/app/trades/new`).
2. `TradeForm` collects:
   - **Execution:** pair, direction, entry/exit, stop loss, take profit, lot
     size, risk amount, realized P/L, outcome, session, timeframe, strategy,
     setup, opened/closed times, notes.
   - **Behavior:** emotion, confidence (1–10), rule adherence, mistake tags
     (comma-separated), execution rating (1–10).
   - **Chart context:** a screenshot upload, a TradingView URL, and a caption.
3. Submit → `createTradeAction`. Input is validated with Zod
   (`tradeInputSchema`), the trade + behavior + attachments are persisted, and a
   screenshot (if any) is uploaded to the private Storage bucket.
4. Affected routes are revalidated; the new trade appears in the list and
   dashboard.

### Validation rules of note (`lib/validation/trade.ts`)

- `pair` is uppercased; 3–12 chars.
- Numeric fields are coerced; entry price and lot size must be `> 0`; risk
  amount `>= 0`.
- Closed trades (`outcome != open`) **must** have a `closedAt`.
- Open trades **must not** have realized P/L.
- `confidence` and `executionRating`, when present, must be 1–10.
- `tradingViewUrl`, when present, must be a valid URL.

## Flow: view a trade & generate an AI review

1. Open a trade at `/app/trades/[id]`.
2. The page shows execution stats, behavior, attachments (screenshots via signed
   URLs, TradingView links), and any prior AI reviews.
3. Click the AI review button (`AiReviewButton`) → `generateAiReviewAction`.
   - Only allowed for **closed** trades (open trades are rejected upstream in
     `generateTradeReview`).
   - The trade is normalized, sent to OpenAI, and the structured result is saved
     to `ai_trade_reviews` and shown.
4. See [AI_REVIEW.md](./AI_REVIEW.md) for the output shape and guardrails.

## Flow: review performance (dashboard)

`/app` renders `DashboardView`, which calls `summarizeTrades()` over all trades
and shows:

- **Stat cards:** net P/L, win rate, expectancy (R), average R, max drawdown,
  etc.
- **Equity curve** (cumulative closed-trade P/L) and **session breakdown** bar
  chart (`performance-charts.tsx`).
- **Breakdowns** by pair, session, emotion, and mistake tag.
- **Recent trades** table.

All metrics are computed from **closed** trades only. See
[ANALYTICS.md](./ANALYTICS.md).

## Filtering trades

`/app/trades` accepts query params consumed by `listTrades`:

| Param | Effect |
|-------|--------|
| `pair` | case-insensitive contains match |
| `strategy` | case-insensitive contains match |
| `session` | exact session |
| `outcome` | exact outcome |
| `from` / `to` | `opened_at` range |
| `emotion` | exact behavior emotion (filtered in app code) |
| `mistake` | trade includes the mistake tag (filtered in app code) |
