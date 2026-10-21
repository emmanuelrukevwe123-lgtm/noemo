import type { PairId, Signal, Timeframe } from "./types.js";

export interface CompletedTrade {
  signal: Signal;
  outcome: "win" | "loss" | "be" | "open";
  exitTime: number;
  /** Realized profit in R multiples (absent in pre-exit-model result files) */
  realizedR?: number;
}

export interface Summary {
  pair: PairId;
  tf: Timeframe;
  trades: number;
  wins: number;
  losses: number;
  breakevens: number;
  open: number;
  winRate: number;
  netR: number;
  avgR: number;
  profitFactor: number;
  maxDrawdownR: number;
  tradesPerMonth: number;
  rPerMonth: number;
  first: string;
  last: string;
}

const MONTH_MS = 30.44 * 86_400_000;

function dateOf(ms: number): string {
  return Number.isFinite(ms) ? new Date(ms).toISOString().slice(0, 10) : "-";
}

/** Realized R of a trade; older result files without realizedR fall back to win/loss at fixed tpR. */
export function realizedR(trade: CompletedTrade, tpR: number): number {
  return trade.realizedR ?? (trade.outcome === "win" ? tpR : trade.outcome === "loss" ? -1 : 0);
}

export function summarize(pair: PairId, tf: Timeframe, trades: CompletedTrade[], tpR: number): Summary {
  const closed = trades.filter((t) => t.outcome !== "open");
  let wins = 0;
  let losses = 0;
  let breakevens = 0;
  let grossWin = 0;
  let grossLoss = 0;
  let cumulative = 0;
  let peak = 0;
  let maxDrawdown = 0;
  for (const trade of closed) {
    const r = realizedR(trade, tpR);
    if (r > 1e-9) {
      wins++;
      grossWin += r;
    } else if (r < -1e-9) {
      losses++;
      grossLoss -= r;
    } else breakevens++;
    cumulative += r;
    if (cumulative > peak) peak = cumulative;
    if (peak - cumulative > maxDrawdown) maxDrawdown = peak - cumulative;
  }
  const netR = grossWin - grossLoss;
  const spanMs = trades.length > 1 ? trades[trades.length - 1].signal.time - trades[0].signal.time : 0;
  const months = spanMs > 0 ? spanMs / MONTH_MS : 1;
  return {
    pair,
    tf,
    trades: trades.length,
    wins,
    losses,
    breakevens,
    open: trades.length - closed.length,
    winRate: wins + losses > 0 ? wins / (wins + losses) : 0,
    netR,
    avgR: closed.length > 0 ? netR / closed.length : 0,
    profitFactor: grossLoss > 0 ? grossWin / grossLoss : Infinity,
    maxDrawdownR: maxDrawdown,
    tradesPerMonth: trades.length / months,
    rPerMonth: netR / months,
    first: dateOf(trades[0]?.signal.time ?? NaN),
    last: dateOf(trades[trades.length - 1]?.signal.time ?? NaN)
  };
}

export function printReport(summaries: Summary[]): void {
  const header = [
    "pair",
    "tf",
    "signals",
    "wins",
    "losses",
    "BE",
    "win rate",
    "net R",
    "avg R",
    "PF",
    "max DD (R)",
    "trades/mo",
    "R/mo",
    "first",
    "last"
  ];
  const rows = summaries.map((s) => [
    s.pair,
    s.tf,
    String(s.trades),
    String(s.wins),
    String(s.losses),
    String(s.breakevens),
    `${(s.winRate * 100).toFixed(1)}%`,
    s.netR.toFixed(1),
    s.avgR.toFixed(2),
    Number.isFinite(s.profitFactor) ? s.profitFactor.toFixed(2) : "inf",
    s.maxDrawdownR.toFixed(1),
    s.tradesPerMonth.toFixed(1),
    s.rPerMonth.toFixed(1),
    s.first,
    s.last
  ]);
  const widths = header.map((h, i) => Math.max(h.length, ...rows.map((r) => r[i].length)));
  const line = (cells: string[]) => cells.map((c, i) => c.padEnd(widths[i])).join("  ");
  console.log(line(header));
  console.log(widths.map((w) => "-".repeat(w)).join("  "));
  for (const row of rows) console.log(line(row));
  console.log(
    "\nNotes: R figures are realized R per trade (partial exits included); spread charged on entry; a candle touching both the stop and a target exits at the stop (conservative)."
  );
}
