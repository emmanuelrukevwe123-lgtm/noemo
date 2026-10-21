import { describe, expect, it } from "vitest";
import { evaluate, type MarketState, type TimeframeState } from "../src/strategy.js";
import { DEFAULT_CONFIG, PAIRS, type Candle } from "../src/types.js";

const MINUTE = 60_000;
const TF15_MS = 15 * MINUTE;

/** Ascending bull-momentum candles: body ~90% of range, closes rising. */
function uptrend(count: number, start: number, step: number): Candle[] {
  const candles: Candle[] = [];
  for (let i = 0; i < count; i++) {
    const open = start + i * step;
    const close = open + step * 0.9;
    candles.push({ time: i, open, high: close + step * 0.02, low: open - step * 0.02, close });
  }
  return candles;
}

function state(candles: Candle[]): TimeframeState {
  return { candles, closedCount: candles.length };
}

/**
 * A textbook bullish setup for XAUUSD:
 * - Monthly/Weekly/Daily all in uptrends above their 20 SMAs
 * - 3h and 45m aligned with healthy bullish candles
 * - 15m trigger candle: bull momentum, above its 20 SMA, above and touching
 *   the daily open, with a confirmed swing low behind it for the stop.
 * Trigger time: 2026-01-15 15:00 UTC = 10:00 New York (inside 8:30-12:00).
 */
function bullishState(): MarketState {
  const entryCandles = uptrend(30, 97, 0.1);
  // Confirmed swing low: dip 6 candles back, deeper than its neighbours.
  entryCandles[24].low = 95;
  const trigger = entryCandles[entryCandles.length - 1];
  trigger.time = Date.UTC(2026, 0, 15, 15, 0);

  return {
    pair: PAIRS.XAUUSD,
    entryTimeframe: "15m",
    entry: state(entryCandles),
    tf15m: state(entryCandles),
    tf5m: state(entryCandles),
    tf45m: state(uptrend(25, 90, 0.4)),
    tf3h: state(uptrend(25, 80, 0.8)),
    daily: state(uptrend(25, 60, 1.5)),
    weekly: state(uptrend(25, 40, 2.5)),
    monthly: state(uptrend(25, 20, 3)),
    quarterly: state(uptrend(4, 10, 20)),
    dailyOpen: trigger.open, // touched by the trigger candle, close above it
    entryTfMs: TF15_MS
  };
}

describe("evaluate", () => {
  it("emits a buy signal with correct SL/TP math on a textbook setup", () => {
    const s = bullishState();
    const signal = evaluate(s, DEFAULT_CONFIG);
    expect(signal).not.toBeNull();
    expect(signal!.direction).toBe("buy");

    const trigger = s.entry.candles[s.entry.candles.length - 1];
    const expectedEntry = trigger.close + PAIRS.XAUUSD.spread;
    expect(signal!.entry).toBeCloseTo(expectedEntry, 10);

    // SL = swing low (95) minus 5 gold pips ($0.50)
    expect(signal!.stopLoss).toBeCloseTo(95 - 0.5, 10);

    // TP = entry + tpR × risk (3R since v1.2)
    const risk = expectedEntry - signal!.stopLoss;
    expect(signal!.risk).toBeCloseTo(risk, 10);
    expect(signal!.takeProfit).toBeCloseTo(expectedEntry + DEFAULT_CONFIG.tpR * risk, 10);
  });

  it("returns null outside the New York session window", () => {
    const s = bullishState();
    // 20:00 UTC = 15:00 New York — after the 12:00 cutoff.
    s.entry.candles[s.entry.candles.length - 1].time = Date.UTC(2026, 0, 15, 20, 0);
    expect(evaluate(s, DEFAULT_CONFIG)).toBeNull();
  });

  it("returns null when the daily bias disagrees with monthly/weekly", () => {
    const s = bullishState();
    // Downtrend daily: closes falling, price below its 20 SMA.
    const down = uptrend(25, 60, 1.5)
      .reverse()
      .map((c, i) => ({ ...c, time: i }));
    s.daily = state(down);
    expect(evaluate(s, DEFAULT_CONFIG)).toBeNull();
  });

  it("returns null when price is below the daily open", () => {
    const s = bullishState();
    s.dailyOpen = 10_000; // far above price
    expect(evaluate(s, DEFAULT_CONFIG)).toBeNull();
  });

  it("returns null when there is no confirmed swing low for the stop", () => {
    const s = bullishState();
    const clean = uptrend(30, 97, 0.1); // monotonic rise: no swing low exists
    clean[clean.length - 1].time = Date.UTC(2026, 0, 15, 15, 0);
    s.entry = state(clean);
    s.tf15m = s.entry;
    s.dailyOpen = clean[clean.length - 1].open;
    expect(evaluate(s, DEFAULT_CONFIG)).toBeNull();
  });
});
