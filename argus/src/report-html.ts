import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { realizedR, summarize, type CompletedTrade, type Summary } from "./report.js";
import { dedupe } from "./portfolio.js";
import { DEFAULT_CONFIG, PAIRS, type PairId, type Timeframe } from "./types.js";
import type { ExitVariantResult } from "./exit-variants.js";

/**
 * Builds the self-contained HTML dashboard from the latest backtest results.
 * Output: report/backtest-report.html — open it in any browser.
 *
 * Only the kept streams are published: GBPUSD and EURUSD were removed after
 * the 2026-07 exit-model study showed both negative out-of-sample (2025+).
 *
 * Usage: npm run report (after `npm run backtest` and `npm run exits --save`)
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const KEPT_PAIRS: PairId[] = ["XAUUSD"];
const DEDUP_MS = 2 * 3_600_000;

function slim(trades: CompletedTrade[]) {
  return trades.map((t) => ({
    outcome: t.outcome,
    r: realizedR(t, DEFAULT_CONFIG.tpR),
    signal: {
      time: t.signal.time,
      direction: t.signal.direction,
      entry: t.signal.entry,
      stopLoss: t.signal.stopLoss,
      takeProfit: t.signal.takeProfit,
      reasons: t.signal.reasons
    }
  }));
}

const pairs: Partial<Record<PairId, { "15m": unknown; "5m": unknown }>> = {};
const decimals: Partial<Record<PairId, number>> = {};
const summaries: Summary[] = [];
const exitVariants: { pair: PairId; tf: Timeframe; rows: ExitVariantResult[] }[] = [];
let portfolio: { streams: string[]; dedupHours: number; dropped: number; trades: ReturnType<typeof slim> } | null =
  null;

for (const pair of KEPT_PAIRS) {
  const f15 = join(ROOT, "data", `backtest-${pair}-15m.json`);
  const f5 = join(ROOT, "data", `backtest-${pair}-5m.json`);
  if (!existsSync(f15) || !existsSync(f5)) continue;
  const t15 = JSON.parse(readFileSync(f15, "utf8")) as CompletedTrade[];
  const t5 = JSON.parse(readFileSync(f5, "utf8")) as CompletedTrade[];
  pairs[pair] = { "15m": slim(t15), "5m": slim(t5) };
  decimals[pair] = PAIRS[pair].pipSize >= 0.01 ? 2 : 5;
  summaries.push(summarize(pair, "15m", t15, DEFAULT_CONFIG.tpR));
  summaries.push(summarize(pair, "5m", t5, DEFAULT_CONFIG.tpR));

  for (const tf of ["15m", "5m"] as Timeframe[]) {
    const variantFile = join(ROOT, "data", `exit-variants-${pair}-${tf}.json`);
    if (!existsSync(variantFile)) continue;
    exitVariants.push({ pair, tf, rows: JSON.parse(readFileSync(variantFile, "utf8")) as ExitVariantResult[] });
  }

  if (pair === "XAUUSD") {
    const kept5m = dedupe(t15, t5, DEDUP_MS);
    const merged = [...t15, ...kept5m].sort((a, b) => a.signal.time - b.signal.time);
    portfolio = {
      streams: ["XAUUSD 15m", "XAUUSD 5m"],
      dedupHours: DEDUP_MS / 3_600_000,
      dropped: t5.length - kept5m.length,
      trades: slim(merged)
    };
  }
}
const data = { pairs, decimals, summaries, exitVariants, portfolio };

const template = readFileSync(join(ROOT, "report", "template.html"), "utf8");
const body = template.replace("/*__DATA__*/", JSON.stringify(data));
const standalone = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n${body}\n</body>\n</html>\n`;
const out = join(ROOT, "report", "backtest-report.html");
writeFileSync(out, standalone);
console.log(`Report written: ${out}`);
