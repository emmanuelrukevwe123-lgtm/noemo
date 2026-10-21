# Argus — AI Trading Assistance

Signals-only trading bot implementing the owner's multi-timeframe
trend-following strategy. It analyzes XAUUSD (and, in progress, GBPUSD /
EURUSD) and produces trade signals — it never places trades.

**Start here:**

- [`docs/PROJECT_HANDBOOK.md`](./docs/PROJECT_HANDBOOK.md) — everything:
  vision, architecture, strategy rules, rule evolution with evidence,
  backtest methodology, results, engineering notes, open decisions.
  Written for AI agents and developers joining cold.
- [`docs/STRATEGY_SPEC.md`](./docs/STRATEGY_SPEC.md) — the strategy rules,
  versioned.
- [`report/backtest-report.html`](./report/backtest-report.html) — open in a
  browser: interactive backtest dashboard.

Quick start:

```bash
npm install
npm run fetch-data   # download 1m history (long; resumes from cache)
npm run backtest     # run the strategy over all downloaded pairs
npm run report       # rebuild the HTML dashboard
npm test             # 22 unit tests
```

## Data

Two kinds of data live here, handled differently.

**Backtest results** (`data/backtest-*.json`, `data/exit-variants-*.json`)
are committed — they're small, and they're what `npm run report` reads.
You can inspect the numbers without running anything.

**Raw 1m candle history** (`data/*-1m.json`) is *not* in git — roughly 90MB
per pair, and JSON doesn't delta-compress, so committing it would bloat the
clone permanently. It ships as assets on the
[`data-v1` release](https://github.com/emmanuelrukevwe123-lgtm/noemo/releases/tag/data-v1)
instead. To run a backtest yourself, grab it:

```bash
gh release download data-v1 --repo emmanuelrukevwe123-lgtm/noemo --dir data
```

Or re-download from the source with `npm run fetch-data`, which pulls the
same candles from Dukascopy's free archive (slow, but resumes from cache).
