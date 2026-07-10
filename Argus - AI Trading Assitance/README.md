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
