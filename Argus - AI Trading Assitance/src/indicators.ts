import type { Candle } from "./types.js";

/** Simple moving average of the closes of the last `period` candles ending at `endExclusive`. */
export function smaAt(candles: Candle[], endExclusive: number, period: number): number | null {
  if (endExclusive < period) return null;
  let sum = 0;
  for (let i = endExclusive - period; i < endExclusive; i++) sum += candles[i].close;
  return sum / period;
}

/** Average True Range (simple mean of true ranges) over the last `period` candles ending at `endExclusive`. */
export function atrAt(candles: Candle[], endExclusive: number, period: number): number | null {
  if (endExclusive < period + 1) return null;
  let sum = 0;
  for (let i = endExclusive - period; i < endExclusive; i++) {
    const c = candles[i];
    const prevClose = candles[i - 1].close;
    const tr = Math.max(c.high - c.low, Math.abs(c.high - prevClose), Math.abs(c.low - prevClose));
    sum += tr;
  }
  return sum / period;
}
