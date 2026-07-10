import type { Candle, TFCandle, Timeframe } from "./types.js";
import { brokerDayKey, brokerMonthKey, brokerQuarterKey, brokerWeekKey, intradayKey } from "./time.js";

const INTRADAY_MINUTES: Partial<Record<Timeframe, number>> = {
  "5m": 5,
  "15m": 15,
  "45m": 45,
  "3h": 180
};

/** Monotonic bucket key for the candle-open timestamp on the given timeframe. */
export function bucketKey(ts: number, tf: Timeframe): number {
  const minutes = INTRADAY_MINUTES[tf];
  if (minutes !== undefined) return intradayKey(ts, minutes);
  switch (tf) {
    case "1d":
      return brokerDayKey(ts);
    case "1w":
      return brokerWeekKey(ts);
    case "1M":
      return brokerMonthKey(ts);
    case "3M":
      return brokerQuarterKey(ts);
    default:
      throw new Error(`Unknown timeframe ${tf}`);
  }
}

/**
 * Aggregate 1m candles (sorted by time) into the given timeframe.
 * Candle.time is the open time of the first 1m candle in the bucket.
 */
export function aggregate(candles1m: Candle[], tf: Timeframe): TFCandle[] {
  const out: TFCandle[] = [];
  let current: TFCandle | null = null;
  for (const c of candles1m) {
    const key = bucketKey(c.time, tf);
    if (current && current.key === key) {
      if (c.high > current.high) current.high = c.high;
      if (c.low < current.low) current.low = c.low;
      current.close = c.close;
    } else {
      current = { key, time: c.time, open: c.open, high: c.high, low: c.low, close: c.close };
      out.push(current);
    }
  }
  return out;
}
