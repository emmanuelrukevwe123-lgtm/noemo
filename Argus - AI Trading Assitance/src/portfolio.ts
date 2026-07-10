import { backtestPair } from "./backtest.js";
import { realizedR, summarize, type CompletedTrade } from "./report.js";
import { DEFAULT_CONFIG, type PairId, type StrategyConfig, type Timeframe } from "./types.js";

/**
 * Combined portfolio view of the kept streams, with 5m/15m deduplication:
 * a 5m signal is dropped when a 15m trade on the same pair is still open at
 * signal time, or fired in the same direction within the dedup window.
 * Answers "how many trades per month does the whole system actually take,
 * and what do they earn" — the number the 15–20/month target is judged on.
 *
 * Usage: npm run portfolio -- [--dedup-hours 2] [--exit trail3|fixed2r] [--with-gbpusd]
 *
 * GBPUSD is excluded by default: the 2025+ out-of-sample window is negative
 * under every exit model tested (see data/exit-variants-GBPUSD-*.json).
 */

const KEPT_STREAMS: { pair: PairId; tf: Timeframe }[] = [
  { pair: "XAUUSD", tf: "15m" },
  { pair: "XAUUSD", tf: "5m" }
];

/** Named exit models; "trail3" (the v1.2 default) won both XAUUSD streams in both windows. */
const EXIT_CONFIGS: Record<string, StrategyConfig> = {
  trail3: DEFAULT_CONFIG,
  fixed2r: { ...DEFAULT_CONFIG, tpR: 2, beTriggerR: null, trailStartR: null, partialR: null }
};

const arg = (name: string, fallback: string): string => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
};

export function dedupe(
  trades15m: CompletedTrade[],
  trades5m: CompletedTrade[],
  dedupMs: number
): CompletedTrade[] {
  return trades5m.filter((t5) => {
    return !trades15m.some(
      (t15) =>
        t15.signal.direction === t5.signal.direction &&
        t5.signal.time >= t15.signal.time - dedupMs &&
        t5.signal.time <= Math.max(t15.exitTime, t15.signal.time + dedupMs)
    );
  });
}

export function runPortfolio(
  config: StrategyConfig = DEFAULT_CONFIG,
  dedupMs = 2 * 3_600_000,
  streams: { pair: PairId; tf: Timeframe }[] = KEPT_STREAMS
): void {
  const byStream = new Map<string, CompletedTrade[]>();
  for (const { pair, tf } of streams) {
    console.log(`Backtesting ${pair} ${tf} ...`);
    const tfMs = tf === "15m" ? 15 * 60_000 : 5 * 60_000;
    byStream.set(`${pair}-${tf}`, backtestPair(pair, tf, tfMs, config));
  }

  const merged: CompletedTrade[] = [];
  const pairs = new Set(streams.map((s) => s.pair));
  for (const pair of pairs) {
    const t15 = byStream.get(`${pair}-15m`) ?? [];
    const t5 = byStream.get(`${pair}-5m`) ?? [];
    merged.push(...t15, ...dedupe(t15, t5, dedupMs));
  }
  merged.sort((a, b) => a.signal.time - b.signal.time);

  const dropped =
    [...byStream.values()].reduce((n, t) => n + t.length, 0) - merged.length;
  const summary = summarize("XAUUSD", "15m", merged, config.tpR); // pair/tf labels unused below

  console.log(`\nPortfolio (${streams.map((s) => `${s.pair} ${s.tf}`).join(", ")})`);
  console.log(`Dedup window: ${dedupMs / 3_600_000}h — ${dropped} duplicate 5m signals dropped\n`);
  console.log(`trades:      ${summary.trades} (${summary.first} → ${summary.last})`);
  console.log(`trades/mo:   ${summary.tradesPerMonth.toFixed(1)}`);
  console.log(`win rate:    ${(summary.winRate * 100).toFixed(1)}% (${summary.wins}W / ${summary.losses}L / ${summary.breakevens}BE)`);
  console.log(`net R:       ${summary.netR > 0 ? "+" : ""}${summary.netR.toFixed(1)}  (R/mo: ${summary.rPerMonth.toFixed(1)})`);
  console.log(`avg R:       ${summary.avgR.toFixed(2)}`);
  console.log(`PF:          ${Number.isFinite(summary.profitFactor) ? summary.profitFactor.toFixed(2) : "inf"}`);
  console.log(`max DD:      ${summary.maxDrawdownR.toFixed(1)}R`);

  // Monthly trade counts, to show clustering rather than just the average.
  const monthly = new Map<string, { n: number; r: number }>();
  for (const t of merged) {
    const key = new Date(t.signal.time).toISOString().slice(0, 7);
    const m = monthly.get(key) ?? { n: 0, r: 0 };
    m.n++;
    m.r += realizedR(t, config.tpR);
    monthly.set(key, m);
  }
  console.log(`\nmonth     trades  net R`);
  for (const [key, m] of [...monthly.entries()].sort()) {
    console.log(`${key}   ${String(m.n).padStart(5)}  ${(m.r > 0 ? "+" : "") + m.r.toFixed(1)}`);
  }
}

const isDirectRun = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isDirectRun) {
  const dedupHours = Number(arg("dedup-hours", "2"));
  const exit = arg("exit", "trail3");
  const config = EXIT_CONFIGS[exit];
  if (!config) throw new Error(`Unknown --exit ${exit} (options: ${Object.keys(EXIT_CONFIGS).join(", ")})`);
  const streams = process.argv.includes("--with-gbpusd")
    ? [...KEPT_STREAMS, { pair: "GBPUSD" as PairId, tf: "15m" as Timeframe }]
    : KEPT_STREAMS;
  runPortfolio(config, dedupHours * 3_600_000, streams);
}
