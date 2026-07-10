# Testing Noemo & Trading Bot Plan

This document covers two topics:

1. How to test the Noemo application (three levels, from quickest to most complete)
2. The plan for a subscription-gated **signals bot** (it publishes trade
   signals; it never places trades on anyone's account)

---

## Part 1 — How to Test the Application

### Level 1: Automated tests (no setup required)

```bash
npm run test        # Vitest suite
```

The suite currently has **3 test files, 10 tests, all passing**:

- `tests/analytics.test.ts` — analytics calculations
- `tests/trade-schema.test.ts` — trade form schema validation
- `tests/ai-review.test.ts` — AI review service

The full verification chain from the README:

```bash
npx tsc --noEmit    # type check
npm run lint        # ESLint (zero warnings allowed)
npm run test        # unit tests
npm run build       # production build
```

### Level 2: Demo mode (no accounts needed)

```bash
npm run dev
```

Open http://localhost:3000. With no `.env.local` (no Supabase keys), the app
runs in **read-only demo mode** with sample data, so you can click through the
dashboard, trade table, and charts immediately. You just can't log in or save
trades.

### Level 3: Full end-to-end with real services

To test signup, saving trades, attachments, and AI reviews:

1. Create a free project at [supabase.com](https://supabase.com) and run
   `supabase/migrations/0001_noemo_mvp.sql` in its SQL editor.
2. Copy `.env.example` to `.env.local` and fill in the Supabase URL/keys,
   plus an `OPENAI_API_KEY` if you want AI reviews to work.
3. Restart `npm run dev`, sign up, and exercise the real flows:
   - Create a trade, close it, request an AI review.
   - Check that a second account **cannot** see the first account's trades —
     this verifies the Row Level Security policies.

---

## Part 2 — Signals Bot + Subscription: Plan

> **Decision (2026-07-06):** the bot will be **signals-only**. It analyzes the
> market and publishes trade signals to subscribers, but it never connects to
> anyone's broker account and never places trades. This removes the biggest
> technical and legal risks of the original auto-trading idea: no broker
> credentials to hold, no execution bugs that lose users' money.

### Architecture: four pieces

#### 1. Market data feed

The bot needs live (or near-live) forex prices to analyze. Options:

| Source | Notes |
|---|---|
| **OANDA practice API** | Free, no real account needed, clean REST + streaming prices for all major pairs. Good default. |
| **Twelve Data / Polygon.io** | Dedicated market-data APIs with free tiers; no broker relationship at all. |
| **MetaTrader 5** | Only if the strategy is already written as an MT5 indicator/EA; otherwise avoid — it's Windows/Python-centric. |

#### 2. The signal engine

Signal generation cannot live inside Next.js request handlers — it needs to
run continuously and watch prices even when nobody has the site open. This
means a separate long-running worker (small Node or Python service, or a
scheduled job if the strategy works on candle closes, e.g. every 15m/1h):

- Runs the strategy against incoming price data.
- When conditions trigger, writes a row to a `signals` table in Supabase:
  pair, direction (buy/sell), entry zone, stop loss, take profit, rationale,
  timestamp, and later the outcome (hit TP / hit SL / expired).
- **Track every signal's outcome honestly** — a public, verifiable track
  record (win rate, average R) is the product's main selling point and the
  thing that builds subscriber trust.

#### 3. Signal delivery

- A subscriber-only **Signals** section in the app (new route under `/app`,
  reusing the existing UI components).
- Optional push channels later: email, Telegram, or web push when a new
  signal is published.
- Natural synergy with the journal: a subscriber can log a trade they took
  from a signal with one click, pre-filling the trade form — and the journal
  analytics then show how *they* performed following the signals.

#### 4. Subscription gating

- **Stripe** (or **Paystack/Flutterwave** if users are primarily in
  Nigeria/Africa) for recurring billing.
- A `subscriptions` table in Supabase.
- A webhook that updates subscription status.
- Gate the signals routes and the `signals` table (via Row Level Security or
  a server-side check) so only active subscribers can read them.

### Remaining cautions (lighter, but not zero)

- Selling trade signals can still count as **investment advice** in some
  jurisdictions. Mitigate with clear framing: signals are educational /
  informational, "not financial advice," users trade at their own risk —
  and confirm what your local regulator requires before charging money.
- **Don't sell an unproven strategy.** Run the engine silently for at least
  1–3 months first, recording every signal and its outcome. Launch the paid
  tier only when the track record is real — and show that record publicly.

### Recommended build order

1. Signal engine as a standalone worker against free market data, writing to
   a `signals` table. No UI, no payments — just accumulate a track record.
2. Signals page in the app (visible to you only) to review them.
3. Signal-performance stats (win rate, average R, equity curve of signals).
4. Payment integration + subscription gating, then open it to subscribers.

**Progress:** the strategy has been defined and codified — see
[`../Argus - AI Trading Assitance/docs/STRATEGY_SPEC.md`](../Argus%20-%20AI%20Trading%20Assitance/docs/STRATEGY_SPEC.md)
and the engine + backtester in `Argus - AI Trading Assitance/src/`.
Historical data source: Dukascopy (free 1m history).

**Remaining open decision:**

- Which payment provider? (Stripe vs Paystack/Flutterwave)
