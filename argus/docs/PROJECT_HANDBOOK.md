# Argus Project Handbook

**Audience:** AI agents (Codex, Claude, etc.) and developers joining this
project cold. Everything needed to understand, run, and extend the system is
in this document. Paths are relative to `argus/`
unless stated otherwise. Last updated: 2026-07-08 (v1.2 exit model adopted).

---

## 1. Project goal & product vision

The owner is a forex trader (trades XAUUSD and GBPAUD, wants GBPUSD/EURUSD
added) building two connected products inside one repo:

1. **Noemo** (repo root) — a private, mobile-responsive forex trade journal.
   Next.js 15 + React 19 + TypeScript + Tailwind + Supabase, with a
   constrained OpenAI post-trade review feature. Already built and green
   (10 tests). Not the subject of this handbook.
2. **Argus** (this folder) — a **signals-only trading bot** implementing the
   owner's personal multi-timeframe trend-following strategy. It analyzes
   the market and publishes trade signals (pair, direction, entry, stop,
   target, reasons). It **never places trades and never touches anyone's
   broker account** — this was an explicit product decision to avoid the
   legal and technical liability of execution.

**Business model:** the signals section will eventually sit behind a
subscription (provider undecided: Stripe vs Paystack/Flutterwave — owner is
likely Nigeria-based). Nothing may be sold until the strategy is validated.

**Validation-first roadmap (agreed with the owner, do not skip steps):**

1. ✅ Codify the strategy as deterministic code.
2. ✅ Backtest on years of 1m historical data.
3. 🔶 Tune signal frequency toward the owner's target of **15–20 signals per
   month**. GBPUSD/EURUSD were tried and cut (negative out-of-sample, §7);
   exits were optimized instead (v1.2). XAUUSD-only runs ~5/mo — remaining
   levers are new instruments (GBPAUD pending) and/or a second session.
4. ⬜ Lock the rule set. Build a live worker that forward-tests silently for
   1–3 months (signals recorded, shown only to the owner).
5. ⬜ Only if the live track record holds: subscription gating, delivery to
   subscribers (Telegram / in-app page / email), payments.

**Regulatory note:** selling trade signals can constitute investment advice
in some jurisdictions. Signals must ship with "educational, not financial
advice" framing, and the owner should confirm local rules before charging.

---

## 2. Repo layout & how to run everything

```
Noemo/                                  # repo root: the Next.js journal app
├── app/, components/, lib/, supabase/  # Noemo app (untouched by Argus work)
├── docs/                               # Noemo docs + TESTING_AND_TRADING_BOT.md (history)
└── argus/                              # ← THIS PACKAGE (self-contained)
    ├── package.json                    # own deps; no coupling to the app
    ├── tsconfig.json / vitest.config.ts
    ├── docs/
    │   ├── PROJECT_HANDBOOK.md         # this file
    │   └── STRATEGY_SPEC.md            # the strategy, versioned (v1.2)
    ├── src/
    │   ├── types.ts        # Candle/Signal/PairSpec/StrategyConfig + DEFAULT_CONFIG
    │   ├── time.ts         # New York wall clock + 5pm-ET broker-day math
    │   ├── aggregate.ts    # 1m → 5m/15m/45m/3h/1d/1w/1M/3M aggregation
    │   ├── indicators.ts   # SMA, ATR (simple mean of true ranges)
    │   ├── candles.ts      # candle classifier + confirmed swing detection
    │   ├── levels.ts       # monthly/quarterly high-low-50% levels
    │   ├── strategy.ts     # THE STRATEGY: pure evaluate(state) → Signal|null
    │   ├── backtest.ts     # replay() + backtestPair() + conservative fill sim
    │   ├── diagnose.ts     # rejection funnel: which rule kills candidates
    │   ├── variants.ts     # rule-variant comparison harness
    │   ├── exit-variants.ts# exit-model grid with in/out-of-sample split (§7)
    │   ├── portfolio.ts    # combined kept-streams view, 5m/15m dedup (§7)
    │   ├── report.ts       # summary stats (realized R) + console table
    │   ├── report-html.ts  # builds report/backtest-report.html (kept pairs only)
    │   └── data/
    │       ├── store.ts    # compact JSON candle storage (data/*.json)
    │       └── dukascopy.ts# historical 1m downloader
    ├── report/
    │   ├── template.html   # dashboard template (data injected at build)
    │   └── backtest-report.html  # generated; open in a browser
    ├── data/               # gitignored: PAIR-1m.json + backtest-*.json + exit-variants-*.json
    └── tests/              # 31 vitest tests (incl. exit-model fill logic)
```

Commands (run inside `argus/`):

| Command | What it does |
|---|---|
| `npm install` | once |
| `npm run fetch-data` | download 1m history (Dukascopy) for all pairs in the script; resumes via `.dukascopy-cache/` |
| `npm run backtest` | full backtest, all pairs with data, 15m + 5m; writes `data/backtest-<PAIR>-<TF>.json` + prints summary |
| `npm run diagnose -- --pair XAUUSD --tf 15m --from 2026-01-01 --to 2026-07-31` | rejection funnel over a date range |
| `npm run variants -- --tf 15m` | compares rule variants (see §4) |
| `npm run exits -- --pair XAUUSD --tf 15m [--split 2025-01-01] [--save]` | compares exit models (TP distance, break-even, trailing, partial) with an in/out-of-sample split (see §7) |
| `npm run portfolio -- [--exit trail3] [--dedup-hours 2] [--with-gbpusd]` | combined kept-streams view with 5m/15m dedup; the trades/month number (see §7) |
| `npm run report` | regenerates `report/backtest-report.html` from latest backtest JSONs |
| `npm test` / `npm run typecheck` | vitest / tsc |

The root Noemo app excludes this folder from its tsconfig/eslint; keep it
that way (folder name contains spaces — always quote paths).

---

## 3. The strategy (v1.2 + optional flags) — exact rules

Owner's own discretionary strategy, translated to mechanical rules. Definitive
prose lives in `docs/STRATEGY_SPEC.md`; the executable truth is
`src/strategy.ts` + `DEFAULT_CONFIG` in `src/types.ts`.

- **Pairs (v1.2):** XAUUSD only (gold pip = $0.10, spread $0.30). GBPUSD and
  EURUSD were tested and cut — negative out-of-sample 2025+ under every exit
  model (§7). GBPAUD (pip 0.0001, spread 0.00025) is spec'd but still
  awaiting data.
- **Entry timeframes:** 15m (priority) and 5m — run as separate streams.
- **Time base:** all day/week/month boundaries use the **5:00pm ET broker
  day** (America/New_York, DST-aware). The week opens Sunday 17:00 NY.
- **Bias (strict):** close vs 20-SMA on Monthly, Weekly, Daily must all
  agree → that's the only trade direction. Disagreement = possible reversal
  = **no signal** (owner's rule; confirmed protective by backtest).
  Config: `requireMonthlyAlignment` (default true) relaxes to W+D-only when
  false.
- **Intermediate (3h & 45m):** both on the correct side of their 20 SMAs,
  and "healthy candles": none of the last 3 closed candles is a momentum
  candle against the direction (`healthyRequireSupport: false`, the v1.1
  default; true = v1.0 strict variant that also demanded a supporting
  momentum candle).
- **Optional execution alignment:** `requireEntryTfAlignment` (default
  false) — both the 5m and 15m must be on the correct side of their own 20
  SMAs. Tested very well (see §4).
- **Candle taxonomy** (body B, range R): momentum = B ≥ 70% R (direction of
  close); doji = B ≤ 10% R (never a trigger); rejection = wicks > B, named
  by dominant wick (long lower wick = `rejection-down` = bullish rejection).
- **HTF levels:** previous completed 1-month and 3-month high, low, and 50%
  midpoint (fixed once the period closes; no repainting). "At a level" =
  trigger candle touches it or closes within 0.25 × ATR(14, daily).
- **Session:** trigger candle must sit fully inside **8:30–12:00 New York**
  (NY-open killzone → London close). Owner trades US session only.
- **Entry conditions (bullish; bearish mirrored):** all of —
  1. M/W/D bias bullish (per flags above);
  2. 3h + 45m confirm;
  3. close above entry-TF 20 SMA;
  4. close above the daily open (5pm-ET open; retest-and-close-above OK);
  5. trigger candle is bull-momentum or bullish-rejection **at a decision
     point** (touches entry 20 SMA, daily open, or an HTF level).
- **Stop loss:** 5 pips beyond the most recent **confirmed 15m swing**
  (extreme vs 2 candles each side, only confirmed 2 candles later). Always
  the 15m swing even for 5m entries. Gold: 5 pips = $0.50.
- **Take profit (v1.2, 2026-07-08):** 3R target with a **1.5R trailing
  stop** that arms at +1.5R and follows the favorable extreme; trade ends at
  stop, trail-out, or 3R — no time exit. (v1.1 fixed 2R available via
  `tpR: 2, trailStartR: null`; breakeven at fixed 2R was 33.3% win rate.)

---

## 4. Rule evolution & thought process (why the rules are what they are)

This section is the project memory. Every change was driven by measurement,
not taste. All numbers are XAUUSD, Sep 2022 – Jul 2026 window (data from
2021, but monthly SMA-20 needs 20 closed months of warmup).

**v1.0 (initial codification, 2026-07-06).** Direct translation of the
owner's words. Result: 15m — 34 signals, 44.1% win rate, +11R, PF 1.58,
max DD 4R. Profitable but only ~9 signals/year.

**Diagnosis of low frequency.** Built `diagnose.ts` — an every-candle
rejection funnel. Jan–Jul 2026, 15m: of 1,834 in-session candles → 1,078
died on M/W/D alignment, 250 + 167 on 3h/45m SMA, 239 + 52 on
healthy-candles, leaving 8 raw signals. Two dominant chokepoints: full
M/W/D alignment and the healthy-candle rule.

**v1.1 change (healthy-candles loosened).** The v1.0 reading required ≥1
momentum candle *in favor* and none against in the last 3 closed 3h/45m
candles. That "in favor" half was my (the agent's) strict interpretation of
the owner's word "healthy," not something the owner explicitly demanded.
Loosening to "none against" only:
34 → **146 signals, win rate 43.2% (vs 44.1%), PF 1.52 (vs 1.58)** — 4×
frequency for ~1pp of win rate. Adopted as default
(`healthyRequireSupport: false`). Spec bumped to v1.1 with changelog.

**Monthly alignment: tested, kept.** Dropping the monthly veto alone
(W+D-only): 15m PF fell 1.52 → 1.33 and — decisive — **5m went negative**
(31.1% win rate, −6R). The owner's "misalignment = possible reversal, stay
out" instinct is empirically protective. Lesson recorded: *looser ≠ better;
each filter must pay for itself.*

**5m/15m execution alignment (owner's idea, 2026-07-07).** Owner proposed:
make W+D the strict HTF rule and add a strict 5m+15m alignment at entry.
Implemented as `requireEntryTfAlignment`. Full-history results, 15m:

| Variant | Signals | Win rate | Net R | PF | Max DD |
|---|---|---|---|---|---|
| v1.1 baseline (M+W+D) | 146 | 43.2% | +43 | 1.52 | 7R |
| v1.0 strict-healthy | 34 | 44.1% | +11 | 1.58 | 4R |
| W+D only | 236 | 41.1% | +55 | 1.40 | 8R |
| **W+D + 5m/15m aligned** (owner's proposal) | 163 | 44.2% | +53 | 1.58 | 6R |
| **M+W+D + 5m/15m aligned** | 96 | **49.0%** | +45 | **1.92** | **5R** |

5m entries show the same ordering (owner's variant: 291 signals +51R;
double-strict: 175 signals, 41.7%, PF 1.43). Conclusions: the 5m/15m
alignment filter improves quality in every combination; the open product
decision is **more signals (owner's W+D variant) vs better signals
(double-strict)**. Not yet locked — awaiting the multi-pair results.

**2026 year-to-date reality check (v1.1, Jan 1 – Jul 6):** 15m — 16
signals, 37.5%, +2R; 5m — 23 signals, 39.1%, +4R. A below-average but
profitable stretch, including a zero-signal window from Apr 20 onward
(gold's M/W/D went out of alignment — the strategy stood aside by design).
Communicated to the owner as normal edge-unevenness and a preview of what
subscribers would experience.

**Overfitting discipline.** Seven-plus variants have now been scored against
one history. Selection risk is real, mitigated only partially by the fact
that variants were principled readings of the owner's own rules rather than
parameter mining. **Rules must be locked before the forward test, and the
forward test is the arbiter.** Resist adding more variants without new
out-of-sample data (the new pairs help here).

---

## 5. Backtest methodology & honesty rules

Deliberately pessimistic so reported numbers understate rather than flatter:

- **Data:** Dukascopy free historical **bid** 1m candles, 2021-01-01 →
  present, stored compactly (`data/<PAIR>-1m.json`, rows `[t,o,h,l,c]`).
- **Only closed candles count.** A forming higher-TF candle never
  contributes to bias/levels/confirmations (`closedCount` bookkeeping;
  TF-candle closed iff its bucket key < the current entry candle's key).
- **Spread charged on entry**, both directions (buy: entry = close +
  spread; sell: entry = close − spread).
- **Conservative fills:** simulation walks subsequent 1m candles; a candle
  touching **both** SL and TP counts as a **loss**. SL checked before TP.
- **One open trade at a time per pair/timeframe** (signals during an open
  trade are absorbed — matches a real signal service).
- **Win = +2R, loss = −1R** for all aggregate stats; max drawdown measured
  in R on that sequence.
- **Known unmodeled factors:** slippage, commissions, news events (no
  economic-calendar filter), weekend gaps mid-trade, and the difference
  between bid-only data and real bid/ask execution. The 34-trade v1.0
  sample was flagged to the owner as statistically weak; larger samples
  (146+) are better but still not proof. Forward test is the arbiter.

---

## 6. Engineering decisions (and the bugs already fought)

- **Pure strategy function.** `evaluate(MarketState, config, onReject?) →
  Signal | null` does no I/O. The backtest and the future live worker feed
  it the same `MarketState`, so backtested rules and live rules cannot
  drift. `onReject` powers the diagnose funnel without changing behavior.
- **`replay()` (src/backtest.ts)** is the single history-walker: aggregates
  1m → all TFs once, then advances per-TF pointers monotonically (no
  re-scanning). `backtestPair()` and `diagnose.ts` both build on it.
- **Broker-time trick (src/time.ts):** shift NY wall time +7h so 5pm-ET
  boundaries land on UTC midnights of the shifted clock; then day/week/
  month/quarter keys are plain calendar math. NY offset is computed via
  `Intl.DateTimeFormat` once per UTC hour and cached (DST switches on hour
  boundaries, so the cache is exact). Intraday buckets (5m/15m/45m/3h)
  align to the broker-day start, matching MT-style charts.
- **Timezone tests matter:** session window and day boundary are tested for
  both EST and EDT (`tests/time.test.ts`).
- **Dukascopy on this network (WSL2) — hard-won facts:**
  - Concurrent requests fail (`Unknown error` from BufferFetcher).
    **`batchSize: 1`** sequential downloading works and is fast enough.
  - TLS handshakes to `datafeed.dukascopy.com` can take ~20s; Node's fetch
    succeeds where the library's default concurrency dies.
  - **Silent-hang failure mode:** a connection can hang forever without
    erroring — the process looks alive but `.dukascopy-cache/` stops
    growing. Detection: no new cache files for ~5 minutes. Fix: kill the
    process and rerun `npm run fetch-data`; the cache resumes instantly.
  - Chunked quarterly fetches with 5 whole-chunk retries + backoff;
    `useCache: true` with `.dukascopy-cache/` (gitignored).
- **Dashboard** (`report/`): dependency-free single HTML file; data is
  injected into `template.html` at the `/*__DATA__*/` marker by
  `npm run report`. Light/dark via CSS tokens; toggles for timeframe and
  period. Also published as a Claude artifact for sharing.
- **GBPAUD status:** its Dukascopy download repeatedly hit the silent-hang;
  owner chose to proceed with XAUUSD. `backtest.ts` skips pairs whose data
  file is missing. Retry any time with `npm run fetch-data`.

---

## 7. Results archive (XAUUSD, conservative sim)

Full history (signals Sep 2022 – Jul 2026), current default config (v1.2:
M+W+D strict, loose healthy, no entry-TF alignment, 3R TP + 1.5R trail):

| TF | Signals | Win rate | Net R | Avg R | PF | Max DD |
|---|---|---|---|---|---|---|
| 15m | 141 | 48.9% | +45.9 | 0.33 | 1.64 | 8.0R |
| 5m | 213 | 46.0% | +54.0 | 0.25 | 1.47 | 11.2R |

Same window under the previous v1.1 fixed-2R exits, for reference:
15m — 146 signals, 43.2%, +43.0R, PF 1.52, 7R DD; 5m — 216, 39.8%, +42.0R,
PF 1.32, 12R DD.

Variant tables: see §4. 2026 YTD: see §4. Per-trade detail:
`data/backtest-XAUUSD-15m.json` / `-5m.json` (each entry: signal with
timestamp/direction/entry/SL/TP/reasons + outcome + exitTime).

Signal frequency today: ~2–7/month depending on variant/TF — **short of the
owner's 15–20/month target**, hence the GBPUSD + EURUSD expansion. Rough
math: 3 pairs × 2 TFs at owner's-variant rates ≈ 15–25/month, but pairs
correlate (EURUSD/GBPUSD especially), so real numbers land below naive
addition and signals cluster in trending regimes.

### Exit-model study (2026-07-08)

The simulator now supports break-even, trailing-stop, and partial-TP exit
models (`npm run exits`, `npm run portfolio`; per-stream grids with a
pre-2025 / 2025+ in/out-of-sample split saved as
`data/exit-variants-<PAIR>-<TF>.json`). Key results:

- **The pair-expansion route failed.** EURUSD loses under the strategy
  outright (29% win rate, negative both TFs). GBPUSD looked marginally
  positive on full history, but every one of the 11 exit models is negative
  on the 2025+ out-of-sample window on both TFs (best OOS PF 0.70) — the
  edge decayed. Both pairs are dropped; the portfolio is XAUUSD-only.
- **Best exit model: 3R TP with a 1.5R trailing stop armed at 1.5R**
  ("trail3"). The only model beating fixed-2R in-sample AND out-of-sample on
  both XAUUSD streams. Portfolio (XAUUSD 15m + 5m, 2h dedup): 4.9 trades/mo,
  48.6% win, PF 1.58, max DD 9.6R, +63.5R vs baseline 5.1/mo, 43.4%, PF
  1.54, DD 11R, +67R. Similar net R with a smoother curve — better for
  subscriber retention. **Adopted as the v1.2 default on 2026-07-08 with
  owner confirmation** (fixed 2R still available via `--exit fixed2r`).
- **Frequency verdict:** exit engineering cannot add signals. The XAUUSD-only
  deduped portfolio runs ~5/mo lifetime (~6–8/mo over the last 12 months).
  Reaching 15–20/mo requires new levers — additional trending instruments
  (GBPAUD still untested — data download pending; GBPJPY/USDJPY candidates)
  and/or a second session window — each of which must clear the same
  out-of-sample bar that eliminated GBPUSD/EURUSD.

---

## 8. Open decisions & next steps

1. **Default variant:** owner's W+D + 5m/15m aligned (~45 sig/yr/pair on
   15m) vs double-strict M+W+D + 5m/15m (49% win rate, PF 1.92). Decide
   after multi-pair results; agent recommendation on record: double-strict
   for subscriber retention (drawdowns churn subscribers).
2. **Frequency target:** owner wants 15–20/month. The 2026-07 study (§7)
   settled part of this: GBPUSD/EURUSD are out, XAUUSD-only runs ~5/mo
   deduped. Remaining levers: new trending instruments (GBPAUD data pending;
   GBPJPY/USDJPY candidates) and/or a second session window — each must pass
   the same out-of-sample bar. Do NOT chase frequency by weakening filters
   that pay for themselves (§4 lesson).
2b. **Exit model — DECIDED (2026-07-08):** the owner confirmed "3R TP, trail
   1.5R after 1.5R" as the v1.2 default; `DEFAULT_CONFIG` updated, spec
   bumped to v1.2, backtest JSONs + dashboard regenerated. Fixed 2R remains
   available (`--exit fixed2r`).
3. **Live worker (next major build):** long-running process; feed 1m
   candles (OANDA practice API was considered and the owner initially chose
   it, then reverted to Dukascopy for historical data; live feed source
   still open), aggregate exactly as `replay()` does, call `evaluate()` at
   entry-TF closes in-session, record outcomes, deliver via Telegram first.
   Must reuse `src/` modules unchanged.
4. **Forward test:** 1–3 months silent, rules locked, owner-only.
5. **Product:** subscription provider (Stripe vs Paystack), signals page in
   Noemo, one-click "journal this signal" integration, public track record.
6. **Data hygiene:** GBPAUD download retry; refresh data periodically
   (`fetch-data` appends-by-redownload, cache makes it cheap).

## 9. Working agreements with the owner

- The owner is the strategy authority; agents translate words → rules and
  must surface interpretation choices explicitly (the v1.0 "healthy" bug
  was exactly such a hidden interpretation).
- Test rule ideas as variants first; never silently change defaults.
  Adoption happens with the owner's confirmation, a spec version bump, and
  a changelog entry with evidence.
- Report results honestly, including bad stretches and caveats (sample
  size, overfitting risk, unmodeled costs). No cherry-picking.
- Signals-only. Never build order execution against user accounts.
