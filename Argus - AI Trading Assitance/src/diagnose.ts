import { replay } from "./backtest.js";
import { evaluate, type RejectStage } from "./strategy.js";
import { DEFAULT_CONFIG, type PairId, type Timeframe } from "./types.js";

/**
 * Rejection funnel: for every entry-candle close in the date range, record
 * which rule filtered it out. Shows where the signal flow is being strangled.
 *
 * Usage: npm run diagnose -- [--pair XAUUSD] [--tf 15m] [--from 2026-01-01] [--to 2026-07-31]
 */

const arg = (name: string, fallback: string): string => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
};

const pair = arg("pair", "XAUUSD") as PairId;
const tf = arg("tf", "15m") as Timeframe;
const tfMs = tf === "15m" ? 15 * 60_000 : 5 * 60_000;
const from = Date.parse(arg("from", "2000-01-01"));
const to = Date.parse(arg("to", "2100-01-01"));

const STAGE_LABELS: Record<RejectStage, string> = {
  session: "outside 8:30-12:00 NY session",
  "mwd-bias": "Monthly/Weekly/Daily 20 SMA not aligned",
  "3h-bias": "3h not on correct side of its 20 SMA",
  "45m-bias": "45m not on correct side of its 20 SMA",
  "3h-healthy": "3h lacks healthy candles (momentum w/ dir, none against)",
  "45m-healthy": "45m lacks healthy candles",
  "entry-sma": `price on wrong side of ${tf} 20 SMA`,
  "entry-align": "5m and 15m not both on correct side of their 20 SMAs",
  "daily-open": "price on wrong side of the daily open",
  "trigger-candle": "candle not a momentum/rejection trigger",
  "decision-point": "trigger not at SMA / daily open / HTF level",
  "no-swing": "no confirmed 15m swing for the stop"
};

const counts = new Map<RejectStage, number>();
let signals = 0;
let candlesSeen = 0;

replay(pair, tf, tfMs, (state) => {
  const trigger = state.entry.candles[state.entry.closedCount - 1];
  if (trigger.time < from || trigger.time >= to) return;
  candlesSeen++;
  const signal = evaluate(state, DEFAULT_CONFIG, (stage) => {
    counts.set(stage, (counts.get(stage) ?? 0) + 1);
  });
  if (signal) signals++;
});

console.log(`\n${pair} ${tf} rejection funnel, ${arg("from", "start")} -> ${arg("to", "end")}`);
console.log(`Candles evaluated: ${candlesSeen}\n`);
let remaining = candlesSeen;
for (const stage of Object.keys(STAGE_LABELS) as RejectStage[]) {
  const n = counts.get(stage) ?? 0;
  if (stage === "session") {
    console.log(`${String(n).padStart(7)}  rejected: ${STAGE_LABELS[stage]}`);
    remaining -= n;
    console.log(`${String(remaining).padStart(7)}  -> candles inside the session window`);
    continue;
  }
  if (n === 0) continue;
  remaining -= n;
  console.log(`${String(n).padStart(7)}  rejected: ${STAGE_LABELS[stage]}  (survivors left: ${remaining})`);
}
console.log(`${String(signals).padStart(7)}  SIGNALS EMITTED`);
