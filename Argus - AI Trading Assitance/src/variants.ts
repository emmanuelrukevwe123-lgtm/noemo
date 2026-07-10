import { backtestPair } from "./backtest.js";
import { summarize, type Summary } from "./report.js";
import { DEFAULT_CONFIG, PAIRS, type PairId, type StrategyConfig, type Timeframe } from "./types.js";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Compare rule relaxations against the v1 baseline on the full history.
 * Usage: npm run variants -- [--pair XAUUSD] [--tf 15m] [--save]
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export interface VariantResult extends Summary {
  name: string;
}

const arg = (name: string, fallback: string): string => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
};

export const VARIANTS: { name: string; config: StrategyConfig }[] = [
  { name: "baseline (v1.1: M+W+D strict)", config: DEFAULT_CONFIG },
  { name: "strict healthy-candles (v1.0)", config: { ...DEFAULT_CONFIG, healthyRequireSupport: true } },
  { name: "W+D strict only", config: { ...DEFAULT_CONFIG, requireMonthlyAlignment: false } },
  {
    name: "W+D strict, 5m/15m aligned",
    config: { ...DEFAULT_CONFIG, requireMonthlyAlignment: false, requireEntryTfAlignment: true }
  },
  {
    name: "M+W+D strict, 5m/15m aligned",
    config: { ...DEFAULT_CONFIG, requireEntryTfAlignment: true }
  }
];

export function runVariants(pair: PairId, tf: Timeframe, log = false): VariantResult[] {
  const tfMs = tf === "15m" ? 15 * 60_000 : 5 * 60_000;
  const rows: VariantResult[] = [];
  for (const { name, config } of VARIANTS) {
    if (log) console.log(`Running: ${name} ...`);
    const trades = backtestPair(pair, tf, tfMs, config);
    rows.push({ name, ...summarize(pair, tf, trades, config.tpR) });
  }
  return rows;
}

function printVariantTable(pair: PairId, tf: Timeframe, rows: VariantResult[]): void {
  console.log(`\n${pair} ${tf} — full history, one open trade at a time\n`);
  const header = ["variant", "signals", "win rate", "net R", "avg R", "PF", "max DD"];
  const cells = rows.map((r) => [
    r.name,
    String(r.trades),
    `${(r.winRate * 100).toFixed(1)}%`,
    (r.netR > 0 ? "+" : "") + r.netR.toFixed(1),
    r.avgR.toFixed(2),
    Number.isFinite(r.profitFactor) ? r.profitFactor.toFixed(2) : "inf",
    r.maxDrawdownR.toFixed(1)
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
  if (!PAIRS[pair]) throw new Error(`Unknown pair ${pair}`);

  const rows = runVariants(pair, tf, true);
  printVariantTable(pair, tf, rows);

  if (process.argv.includes("--save")) {
    const out = join(ROOT, "data", `variants-${pair}-${tf}.json`);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, JSON.stringify(rows, null, 2));
    console.log(`\nVariant results written: ${out}`);
  }
}

const isDirectRun = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isDirectRun) main();
