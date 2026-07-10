import { backtestPair } from "./backtest.js";
import { summarize, type CompletedTrade, type Summary } from "./report.js";
import { DEFAULT_CONFIG, PAIRS, type PairId, type StrategyConfig, type Timeframe } from "./types.js";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Compare exit models (TP distance, break-even move, trailing stop, partial
 * take-profit) against the fixed-2R baseline, per stream, split into an
 * in-sample tuning window and an out-of-sample validation window so a grid
 * winner has to survive data it was not tuned on.
 *
 * Usage: npm run exits -- [--pair XAUUSD] [--tf 15m] [--split 2025-01-01] [--save]
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const arg = (name: string, fallback: string): string => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
};

/** Fixed-exit base with every exit model disabled — the v1.1 comparison anchor. */
const FIXED: StrategyConfig = { ...DEFAULT_CONFIG, tpR: 2, beTriggerR: null, trailStartR: null, partialR: null };

export const EXIT_VARIANTS: { name: string; config: StrategyConfig }[] = [
  { name: "fixed 2R (v1.1 baseline)", config: FIXED },
  { name: "fixed 1.5R", config: { ...FIXED, tpR: 1.5 } },
  { name: "fixed 2.5R", config: { ...FIXED, tpR: 2.5 } },
  { name: "fixed 3R", config: { ...FIXED, tpR: 3 } },
  { name: "2R, BE @ 1R", config: { ...FIXED, beTriggerR: 1 } },
  { name: "3R, BE @ 1R", config: { ...FIXED, tpR: 3, beTriggerR: 1 } },
  { name: "2R, BE @ 1.5R", config: { ...FIXED, beTriggerR: 1.5 } },
  {
    name: "trail 1R after 1R (runner)",
    config: { ...FIXED, tpR: 100, trailStartR: 1, trailDistanceR: 1 }
  },
  {
    name: "3R, trail 1.5R after 1.5R",
    config: DEFAULT_CONFIG // adopted as the v1.2 default
  },
  {
    name: "50% @ 1R + BE, rest 2R",
    config: { ...FIXED, partialR: 1, partialFraction: 0.5 }
  },
  {
    name: "50% @ 1R + BE, rest 3R",
    config: { ...FIXED, tpR: 3, partialR: 1, partialFraction: 0.5 }
  }
];

export interface ExitVariantResult {
  name: string;
  inSample: Summary;
  outOfSample: Summary;
}

export function runExitVariants(pair: PairId, tf: Timeframe, splitMs: number, log = false): ExitVariantResult[] {
  const tfMs = tf === "15m" ? 15 * 60_000 : 5 * 60_000;
  const rows: ExitVariantResult[] = [];
  for (const { name, config } of EXIT_VARIANTS) {
    if (log) console.log(`Running: ${name} ...`);
    const trades = backtestPair(pair, tf, tfMs, config);
    const inSample = trades.filter((t: CompletedTrade) => t.signal.time < splitMs);
    const outOfSample = trades.filter((t: CompletedTrade) => t.signal.time >= splitMs);
    rows.push({
      name,
      inSample: summarize(pair, tf, inSample, config.tpR),
      outOfSample: summarize(pair, tf, outOfSample, config.tpR)
    });
  }
  return rows;
}

function printTable(title: string, rows: { name: string; s: Summary }[]): void {
  console.log(`\n${title}\n`);
  const header = ["exit model", "signals", "win rate", "BE", "net R", "avg R", "PF", "max DD", "R/mo"];
  const cells = rows.map(({ name, s }) => [
    name,
    String(s.trades),
    `${(s.winRate * 100).toFixed(1)}%`,
    String(s.breakevens),
    (s.netR > 0 ? "+" : "") + s.netR.toFixed(1),
    s.avgR.toFixed(2),
    Number.isFinite(s.profitFactor) ? s.profitFactor.toFixed(2) : "inf",
    s.maxDrawdownR.toFixed(1),
    s.rPerMonth.toFixed(1)
  ]);
  const widths = header.map((h, i) => Math.max(h.length, ...cells.map((c) => c[i].length)));
  const line = (c: string[]) => c.map((v, i) => v.padEnd(widths[i])).join("  ");
  console.log(line(header));
  console.log(widths.map((w) => "-".repeat(w)).join("  "));
  for (const c of cells) console.log(line(c));
}

function main(): void {
  const tf = arg("tf", "15m") as Timeframe;
  const pair = arg("pair", "XAUUSD") as PairId;
  const split = arg("split", "2025-01-01");
  if (!PAIRS[pair]) throw new Error(`Unknown pair ${pair}`);
  const splitMs = Date.parse(`${split}T00:00:00Z`);
  if (!Number.isFinite(splitMs)) throw new Error(`Bad --split date ${split}`);

  const rows = runExitVariants(pair, tf, splitMs, true);
  printTable(`${pair} ${tf} — IN-SAMPLE (before ${split})`, rows.map((r) => ({ name: r.name, s: r.inSample })));
  printTable(`${pair} ${tf} — OUT-OF-SAMPLE (from ${split})`, rows.map((r) => ({ name: r.name, s: r.outOfSample })));

  if (process.argv.includes("--save")) {
    const out = join(ROOT, "data", `exit-variants-${pair}-${tf}.json`);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, JSON.stringify(rows, null, 2));
    console.log(`\nExit-variant results written: ${out}`);
  }
}

const isDirectRun = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isDirectRun) main();
