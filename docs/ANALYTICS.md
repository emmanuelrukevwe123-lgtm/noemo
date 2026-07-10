# Analytics

All performance math lives in `lib/analytics/trades.ts` as **pure functions**
(no I/O), which makes them straightforward to unit test (`tests/analytics.test.ts`).
Metrics are computed from **closed** trades only (`outcome !== "open"`).

## Core helpers

### `calculateRMultiple(profitLoss, riskAmount)`
R-multiple = realized P/L divided by risk taken.

```
R = profit_loss / risk_amount      (rounded to 4 dp)
```

Returns `null` if P/L is missing or `risk_amount <= 0`.

### `normalizedR(trade)`
Prefers the stored `r_multiple`; otherwise computes it from
`profit_loss / risk_amount`. This is the value used throughout the summaries and
when normalizing a trade for the AI service.

### `inferOutcome(profitLoss)`
Maps a realized P/L to an outcome: `> 0 → win`, `< 0 → loss`, `0 → breakeven`,
`null → open`.

## `summarizeTrades(trades): TradeAnalytics`

Filters to closed trades (sorted by close time) and returns:

| Field | Meaning |
|-------|---------|
| `totalTrades` | count of all trades (open + closed) |
| `closedTrades` | count of closed trades |
| `wins` / `losses` / `breakeven` | counts by outcome |
| `netProfitLoss` | sum of `profit_loss` over closed trades |
| `grossProfit` | sum of positive P/L |
| `grossLoss` | sum of negative P/L (negative number) |
| `winRate` | `wins / closedTrades * 100` |
| `expectancyR` | mean R across closed trades |
| `averageR` | mean R across closed trades (same basis as expectancy) |
| `averageWinR` | mean R across winning trades |
| `averageLossR` | mean R across losing trades |
| `maxDrawdown` | largest peak-to-trough drop on the equity curve |
| `bestPair` / `worstPair` | best/worst pair by net P/L |
| `pairBreakdown` | per-pair `BreakdownItem[]` |
| `sessionBreakdown` | per-session `BreakdownItem[]` |
| `emotionBreakdown` | per-emotion `BreakdownItem[]` (unlogged → "Unlogged") |
| `mistakeBreakdown` | per mistake-tag `MistakeBreakdownItem[]` |
| `equityCurve` | cumulative P/L points (`EquityPoint[]`) |

### `BreakdownItem`
Per-group rollup: `{ key, label, trades, wins, losses, netProfitLoss, averageR, winRate }`.

### `MistakeBreakdownItem`
`{ tag, trades, netProfitLoss, averageR }` — surfaces which recurring mistakes
cost the most.

### Equity curve & drawdown
`buildEquityCurve` accumulates closed-trade P/L in close-time order;
`calculateMaxDrawdown` walks that curve tracking the running peak and the largest
decline from it.

## Behavior helpers

- `behaviorInsight(...)` — derives behavioral insight from behavior rows.
- `behaviorFromRow(row)` — normalizes a partial/empty behavior row into a
  consistent `TradeBehaviorRow | null`.

## Notes & caveats

- All money/R figures are rounded for display (`round(value, dp)`).
- Because metrics ignore open trades, an in-progress position never affects win
  rate, expectancy, or drawdown.
- `expectancyR` and `averageR` are computed identically in the current code; if
  you want classic expectancy (`winRate*avgWin − lossRate*avgLoss`) you would
  derive it from `averageWinR` / `averageLossR` and the rates.
