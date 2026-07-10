# Argus Signal Strategy Specification (v1.2)

Codified from the trader's own multi-timeframe trend-following strategy.
All rules below are confirmed and implemented in `src/strategy.ts`
as a pure function; every threshold lives in `DEFAULT_CONFIG` (`src/types.ts`).

**v1.2 (2026-07-08, owner-confirmed):** exits changed from fixed 2R to
**3R take-profit with a 1.5R trailing stop armed at +1.5R**, and the traded
universe reduced to **XAUUSD only** (GBPUSD/EURUSD negative out-of-sample
2025+ under every exit model tested). Evidence: §8b. Portfolio effect
(XAUUSD 15m + deduped 5m): win rate 43.4% → 48.6%, PF 1.54 → 1.58, max DD
11R → 9.6R, at slightly lower total net R (+67R → +63.5R).

**v1.1 (2026-07-06):** the "healthy candles" rule was loosened after backtest
comparison: it now requires only that none of the last 3 closed 3h/45m candles
is a momentum candle *against* the trade direction (v1.0 additionally demanded
one momentum candle in favor). On 3.6 years of XAUUSD 15m this took signals
from 34 to 146 while the win rate held (44.1% → 43.2%, profit factor 1.58 →
1.52). Monthly alignment stays mandatory — removing it degraded every metric.

## 1. Instruments & timeframes

- **Pairs:** XAUUSD (gold), GBPAUD
- **Entry timeframes:** 15m (priority), 5m (secondary)
- **Analysis timeframes (top-down):** 3-month → Monthly → Weekly → Daily →
  3h → 45m → entry timeframe
- All day/week/month boundaries use the **5:00pm ET broker day**
  (America/New_York, daylight-saving aware).

## 2. Long-term direction (bias)

Computed on candle close, using the 20-period Simple Moving Average (SMA) of
closes on each timeframe:

| Timeframe | Rule |
|---|---|
| Monthly | Close above 20 SMA → bullish; below → bearish |
| Weekly | Same rule |
| Daily | Same rule |

- **Aligned:** Monthly, Weekly, Daily all agree → trade only that direction.
- **Not aligned:** possible reversal — **no signal** (v1 skips reversals).

## 3. Intermediate confirmation (3h & 45m)

Both the 3h and 45m must:

- follow the same 20 SMA rule in the trade direction, and
- show **healthy candles**: none of the last 3 closed candles is a momentum
  candle against the trade direction (v1.1; the stricter v1.0 variant that
  also required a supporting momentum candle remains available via
  `healthyRequireSupport: true`).

## 4. Higher-timeframe levels

From the **previous completed** 1-month and 3-month periods (fixed once the
period closes — no repainting):

- the **high**, the **low**, and the **50% midpoint** of each.
- "Price is at a level" = the trigger candle touches it, or its close is
  within **0.25 × ATR(14, daily)** of it.

## 5. Candle classification (thresholds in config)

For a candle with range R (high − low) and body B (|close − open|):

| Type | Definition | Meaning |
|---|---|---|
| **Momentum** | B ≥ 70% of R | Conviction in the close direction |
| **Doji** | B ≤ 10% of R | Indecision — never a trigger |
| **Rejection** | Combined wicks > B; dominant wick names it | Long lower wick = bullish rejection; long upper wick = bearish |

## 6. Session filter

- Signals only when the trigger candle sits fully inside
  **8:30am – 12:00pm America/New_York** (NY open killzone → London close).

## 7. Entry conditions (bullish; bearish is the exact mirror)

All must be true at an entry-timeframe candle close inside the session:

1. **Bias:** Monthly, Weekly, Daily all bullish (§2).
2. **Intermediate:** 3h and 45m confirm (§3).
3. **Entry 20 SMA:** close above the 20 SMA of the entry timeframe
   (15m priority; 5m allowed as the secondary entry chart).
4. **Daily open:** close above the 5:00pm ET broker-day open
   (a retest that closes back above still qualifies).
5. **Trigger candle:** a bullish momentum candle or bullish rejection candle
   forming **at a decision point** — the candle touches the entry 20 SMA,
   the daily open, or a HTF level (§4).

## 8. Exits

- **Stop loss:** 5 pips beyond the most recent **confirmed 15m swing point**
  (swing = a candle more extreme than the 2 candles on each side; confirmed
  only once those 2 later candles have closed). Always the 15m swing, even
  for 5m entries.
  - Gold pip = $0.10 → buffer $0.50. GBPAUD pip = 0.0001 → buffer 0.0005.
- **Take profit (v1.2 default):** **3R**, with a **trailing stop** that arms
  once price is +1.5R in favor and then follows the favorable extreme at a
  1.5R distance. Whichever of trail-out or 3R target is hit first ends the
  trade. (v1.1 behavior — fixed 2R, no trail — via `tpR: 2, trailStartR: null`.)
- No time-based exit: the position runs until stop, trail-out, or target.

### 8b. Exit-model study (2026-07-08; basis for the v1.2 default)

The simulator (`simulate()` in `src/backtest.ts`) supports configurable exit
models, all thresholds in `StrategyConfig`:

- `beTriggerR` — move the stop to entry once price reaches this R multiple.
- `trailStartR` / `trailDistanceR` — trail the stop behind the favorable
  extreme once armed. Stop adjustments only take effect from the next 1m
  candle (no intra-candle lookahead).
- `partialR` / `partialFraction` — take a partial at that R multiple and move
  the stop to break-even; results become fractional realized R.

An 11-model grid was tested per stream with an in-sample (pre-2025) /
out-of-sample (2025+) split (`npm run exits`, results in
`data/exit-variants-*.json`). Findings:

- **XAUUSD (both TFs): "3R TP, trail 1.5R after 1.5R" beat the fixed-2R
  baseline in every window** — 15m PF 1.64/1.63 vs 1.62/1.41, 5m PF
  1.26/1.75 vs 1.07/1.61. XAUUSD-only portfolio (15m + deduped 5m):
  PF 1.58, max DD 9.6R, 48.6% win rate vs baseline PF 1.54, DD 11R, 43.4%.
- **GBPUSD: negative out-of-sample under every exit model on both TFs**
  (best OOS PF 0.70). Its historical +11R (15m) was entirely pre-2025.
  **GBPUSD and EURUSD are excluded from the portfolio.**

The owner confirmed adoption on 2026-07-08; the trailing exit is now the
default (`DEFAULT_CONFIG`), and the fixed-2R model remains available as the
`fixed2r` option in `npm run portfolio` / the `FIXED` base in `npm run exits`.

## 9. Backtest realism rules

- Spread charged against the trade on entry (XAUUSD $0.30, GBPAUD 0.00025).
- A 1m candle touching both SL and TP counts as a **loss** (conservative).
- One open signal at a time per pair/timeframe.
- Only closed candles are used — a higher-timeframe candle still forming
  never contributes to bias, levels, or confirmations.

## 10. Validation status

1. ✅ Rules implemented as a pure, deterministic function
   (`evaluate(marketState) → Signal | null`).
2. Backtest on historical XAUUSD & GBPAUD 1m data (`npm run fetch-data`,
   `npm run backtest`) — measure win rate, average R, profit factor,
   max drawdown, signal frequency.
3. Forward-test silently (paper signals only) for 1–3 months.
4. Only then expose signals to subscribers.
