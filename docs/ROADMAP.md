# Noemo + Argus: 1–2 Month "Product Ready" Roadmap

## Context

The owner wants the whole product ready in 1–2 months. Decisions made (2026-07-08):

- **End state:** Noemo journal launched publicly (open sign-ups); Argus live worker running silently, building an owner-only track record (per the validation-first roadmap in the Argus handbook — do not skip steps).
- **Monetization:** journal free now; signals become the paid tier later, **Paystack** chosen as provider (records the open decision in `docs/TESTING_AND_TRADING_BOT.md` and handbook §8.5). No payment integration built in this window.
- Current health: tsc/lint/tests/build all green. Noemo is a working MVP in demo mode; Argus is a backtester (v1.2 exits decided) with no live worker yet.

Two parallel tracks. Track A (Noemo launch) is the critical path; Track B (Argus live) can start once A's Week 1 is done since it's mostly independent code.

---

## Track A — Noemo public launch (Weeks 1–5)

### Week 1: Go live against real services

1. Create Supabase project; apply `supabase/migrations/0001_noemo_mvp.sql`; fill `.env.local` from `.env.example`.
2. End-to-end smoke test: sign-up, log/close/edit a trade, screenshot upload, AI review, and **verify RLS isolation with a second account**.
3. Deploy to Vercel (free tier) + custom domain. First real deployment.

### Week 2: Public-launch hardening (correctness/security backlog, all confirmed open)

Files: `lib/actions/trades.ts`, `lib/actions/auth.ts`, `lib/ai/trade-review.ts`, `lib/db/trades.ts`, new `lib/env.ts`.

1. **Sanitize `messageForError`** (`lib/actions/trades.ts:98`) — generic client messages, log real error server-side.
2. **Email-confirmation flow** in `signUpAction` — don't redirect to `/app` when Supabase requires verification; show "check your email".
3. **OpenAI call timeout** — `AbortController` in `generateTradeReview`.
4. **AI review rate-limit/dedupe** — cooldown or cache by trade + `prompt_version` (each call is billable; open sign-ups make this abuse surface real).
5. **Delete-trade action** — the missing CRUD leg; must also clean up attachments/reviews (FK cascade already in migration — verify).
6. **Env validation at startup** — small Zod schema.
7. **Server-action tests** — cover auth/demo gating and error mapping (the known coverage gap in `docs/CONTRIBUTING.md`).

### Week 3: UX polish for strangers

1. Paginate `listTrades` (currently fetches all rows).
2. Demo mode: disable inputs + read-only banner instead of failing submits.
3. Win/loss reinforced beyond color (signs/icons); explicit Recharts tick/tooltip colors.
4. Light/dark toggle; remove inert `dark` conditional in `landing-page.tsx`.
5. Batch signed-URL generation (N+1); escape `ilike` wildcards.
6. Landing page pass: real copy, screenshots of the actual app, "not financial advice" disclaimer, basic Terms/Privacy pages (needed for public sign-ups).

### Week 4–5: Launch + feedback loop

1. Soft-launch to trading communities (Twitter/X forex circles, r/Forex, Nigerian trading Telegram/Discord groups).
2. Add basic product analytics (e.g. Vercel Analytics or Plausible — free, no cookie banner).
3. Error monitoring (Sentry free tier) so production breakage is visible.
4. Fix what real users break; iterate on onboarding friction.

---

## Track B — Argus silent forward-test (Weeks 2–8)

Per handbook §8: rules locked at v1.2 (3R TP, trail 1.5R after 1.5R), XAUUSD only (~5 sig/mo), GBPUSD/EURUSD cut. The 15–20/mo frequency target stays open — **do not weaken filters to chase it**; GBPAUD data retry and second-session study can run in parallel but must pass the same out-of-sample bar.

### Weeks 2–3: Live worker (the "next major build" in handbook §8.3)

1. Pick live 1m feed (open decision — evaluate OANDA practice API vs Twelve Data free tier; Dukascopy has no live stream).
2. Long-running worker (small Node service reusing `src/` modules **unchanged**: aggregate exactly as `replay()` does, call `evaluate()` at entry-TF closes in-session).
3. Write signals to a new `signals` table in the existing Supabase project (new migration): pair, direction, entry, SL, TP, rationale, timestamp, outcome.
4. Outcome tracker: mark hit-TP / hit-SL / expired honestly, including the trail logic.
5. Host the worker: Railway/Fly.io/Render free-ish tier, or a cheap VPS. Needs to survive restarts and log gaps in the feed.
6. Telegram delivery to owner only (handbook says Telegram first).

### Weeks 4–8: Accumulate track record

1. Worker runs unattended; owner reviews signals vs. what the strategy should have done (catches live/backtest divergence — the classic failure mode).
2. Owner-only signals page in Noemo under `/app` (reuse existing UI components; extend `/app/argus`), showing live signals + running win rate/avg R.
3. GBPAUD data download retry + out-of-sample study for the frequency target.
4. **Explicitly out of scope this window:** payments (Paystack integration), subscriber gating, public signals — those come only after 1–3 months of live track record holds, per the agreed roadmap.

---

## End-of-window definition of done

- Noemo: deployed, public sign-ups working, hardening backlog closed, monitored, first real users.
- Argus: live worker producing signals into Supabase 24/5, Telegram alerts to owner, owner-only track-record page, zero unexplained live/backtest divergence.
- Documented: Paystack decision recorded in the docs; handbook updated as decisions land (per working agreements §9).

## Verification

- Track A: full chain (`tsc --noEmit`, lint, test, build) stays green after each week; manual E2E against production Supabase incl. two-account RLS check; Sentry shows no unhandled errors after soft launch.
- Track B: replay a recorded live week through the backtester and confirm identical signals (live/backtest parity test); Telegram message received for each signal; outcomes in `signals` table match chart reality for a hand-checked sample.

## Suggested first session

Start with Track A Week 1–2: wire Supabase, then knock out the 7 hardening items in one pass with tests. That's the highest-leverage single block of work.
