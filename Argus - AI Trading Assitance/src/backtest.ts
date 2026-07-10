import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { aggregate, bucketKey } from "./aggregate.js";
import { dataPath, loadPair } from "./data/store.js";
import { brokerDayKey } from "./time.js";
import { evaluate, type MarketState, type TimeframeState } from "./strategy.js";
import { printReport, summarize, type CompletedTrade } from "./report.js";
import { DEFAULT_CONFIG, PAIRS, type Candle, type PairId, type Signal, type TFCandle, type Timeframe } from "./types.js";

const MINUTE = 60_000;
const ENTRY_TIMEFRAMES: { tf: Timeframe; ms: number }[] = [
  { tf: "15m", ms: 15 * MINUTE },
  { tf: "5m", ms: 5 * MINUTE }
];
const HIGHER_TFS: Timeframe[] = ["5m", "15m", "45m", "3h", "1d", "1w", "1M", "3M"];
const RESULTS_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "data");

export interface SimulationResult {
  outcome: "win" | "loss" | "be" | "open";
  exitTime: number;
  exitIndex: number;
  /** Realized profit in R multiples across all (partial) exits */
  realizedR: number;
}

/**
 * Walk 1m candles from the signal time until the stop or target is hit,
 * applying the exit model from config (break-even move, trailing stop,
 * partial take-profit). Conservative fill rules: within a candle the stop is
 * checked before any target, and stop adjustments (BE/trail) only take effect
 * from the next candle onward.
 */
export function simulate(
  signal: Signal,
  candles1m: Candle[],
  startIndex: number,
  config = DEFAULT_CONFIG
): SimulationResult {
  const isBuy = signal.direction === "buy";
  const dir = isBuy ? 1 : -1;
  const { entry, risk } = signal;
  const rOf = (price: number): number => (dir * (price - entry)) / risk;

  let stop = signal.stopLoss;
  let remaining = 1;
  let realizedR = 0;
  let partialPending = config.partialR !== null;
  const partialPrice = entry + dir * (config.partialR ?? 0) * risk;
  const bePrice = config.beTriggerR !== null ? entry + dir * config.beTriggerR * risk : null;
  const trailPrice = config.trailStartR !== null ? entry + dir * config.trailStartR * risk : null;

  const done = (exitR: number, i: number): SimulationResult => {
    realizedR += remaining * exitR;
    const outcome = realizedR > 1e-9 ? "win" : realizedR < -1e-9 ? "loss" : "be";
    return { outcome, exitTime: candles1m[i].time, exitIndex: i, realizedR };
  };

  for (let i = startIndex; i < candles1m.length; i++) {
    const c = candles1m[i];
    const favorable = isBuy ? c.high : c.low; // best price reached this candle
    const adverse = isBuy ? c.low : c.high;

    // Stop first (conservative: a candle touching both boundaries exits at the stop).
    if (dir * (adverse - stop) <= 0) return done(rOf(stop), i);
    // Partial target before the full target: it sits closer to entry, so a
    // candle spanning both fills the partial first in reality.
    if (partialPending && dir * (favorable - partialPrice) >= 0) {
      partialPending = false;
      realizedR += config.partialFraction * rOf(partialPrice);
      remaining -= config.partialFraction;
      if (dir * (entry - stop) > 0) stop = entry; // partial always moves stop to break-even
    }
    if (dir * (favorable - signal.takeProfit) >= 0) return done(rOf(signal.takeProfit), i);

    // Stop adjustments apply from the next candle (no intra-candle lookahead).
    if (bePrice !== null && dir * (favorable - bePrice) >= 0 && dir * (entry - stop) > 0) {
      stop = entry;
    }
    if (trailPrice !== null && dir * (favorable - trailPrice) >= 0) {
      const trailed = favorable - dir * config.trailDistanceR * risk;
      if (dir * (trailed - stop) > 0) stop = trailed;
    }
  }
  return { outcome: "open", exitTime: Infinity, exitIndex: candles1m.length, realizedR };
}

function lowerBound(candles: Candle[], time: number): number {
  let lo = 0;
  let hi = candles.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (candles[mid].time < time) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function countClosed(candles: TFCandle[], pointer: number, currentKey: number): number {
  let p = pointer;
  while (p < candles.length && candles[p].key < currentKey) p++;
  return p;
}

/**
 * Replay every entry-timeframe candle close, building the exact MarketState
 * the live worker would see at that moment. Shared by the backtest and the
 * diagnostics script. The callback may return false to skip evaluation
 * bookkeeping (e.g. while a trade is open).
 */
export function replay(
  pair: PairId,
  entryTf: Timeframe,
  entryTfMs: number,
  onCandleClose: (state: MarketState, candles1m: Candle[]) => void
): void {
  const candles1m = loadPair(pair);
  const byTf = new Map<Timeframe, TFCandle[]>();
  for (const tf of new Set<Timeframe>([entryTf, ...HIGHER_TFS])) {
    byTf.set(tf, aggregate(candles1m, tf));
  }
  const entryCandles = byTf.get(entryTf)!;
  const pointers = new Map<Timeframe, number>();
  for (const tf of HIGHER_TFS) pointers.set(tf, 0);
  let dailyPointer = 0;

  const stateFor = (tf: Timeframe, time: number): TimeframeState => {
    const candles = byTf.get(tf)!;
    const closed = countClosed(candles, pointers.get(tf)!, bucketKey(time, tf));
    pointers.set(tf, closed);
    return { candles, closedCount: closed };
  };

  for (let i = 0; i < entryCandles.length; i++) {
    const candle = entryCandles[i];
    const daily = byTf.get("1d")!;
    const dayKey = brokerDayKey(candle.time);
    dailyPointer = countClosed(daily, dailyPointer, dayKey);
    const currentDay = daily[dailyPointer];
    const dailyOpen = currentDay && currentDay.key === dayKey ? currentDay.open : null;

    const entryState: TimeframeState = { candles: entryCandles, closedCount: i + 1 };
    const state: MarketState = {
      pair: PAIRS[pair],
      entryTimeframe: entryTf,
      entry: entryState,
      tf15m: entryTf === "15m" ? entryState : stateFor("15m", candle.time),
      tf5m: entryTf === "5m" ? entryState : stateFor("5m", candle.time),
      tf45m: stateFor("45m", candle.time),
      tf3h: stateFor("3h", candle.time),
      daily: { candles: daily, closedCount: dailyPointer },
      weekly: stateFor("1w", candle.time),
      monthly: stateFor("1M", candle.time),
      quarterly: stateFor("3M", candle.time),
      dailyOpen,
      entryTfMs
    };
    onCandleClose(state, candles1m);
  }
}

export function backtestPair(
  pair: PairId,
  entryTf: Timeframe,
  entryTfMs: number,
  config = DEFAULT_CONFIG
): CompletedTrade[] {
  const trades: CompletedTrade[] = [];
  let busyUntil = -Infinity; // one open trade at a time per pair/timeframe

  replay(pair, entryTf, entryTfMs, (state, candles1m) => {
    const trigger = state.entry.candles[state.entry.closedCount - 1];
    if (trigger.time < busyUntil) return;

    const signal = evaluate(state, config);
    if (!signal) return;

    const start = lowerBound(candles1m, signal.time);
    const result = simulate(signal, candles1m, start, config);
    busyUntil = result.exitTime;
    trades.push({ signal, outcome: result.outcome, exitTime: result.exitTime, realizedR: result.realizedR });
  });
  return trades;
}

function main(): void {
  mkdirSync(RESULTS_DIR, { recursive: true });
  const all: { pair: PairId; tf: Timeframe; trades: CompletedTrade[] }[] = [];
  for (const pair of Object.keys(PAIRS) as PairId[]) {
    if (!existsSync(dataPath(pair))) {
      console.log(`Skipping ${pair}: no data file (run \`npm run fetch-data\`)`);
      continue;
    }
    for (const { tf, ms } of ENTRY_TIMEFRAMES) {
      console.log(`Backtesting ${pair} on ${tf} ...`);
      const trades = backtestPair(pair, tf, ms);
      all.push({ pair, tf, trades });
      writeFileSync(
        join(RESULTS_DIR, `backtest-${pair}-${tf}.json`),
        JSON.stringify(trades, null, 2)
      );
    }
  }
  console.log();
  printReport(all.map(({ pair, tf, trades }) => summarize(pair, tf, trades, DEFAULT_CONFIG.tpR)));
}

const isDirectRun = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isDirectRun) main();
