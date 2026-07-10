import type { Candle, CandleType, StrategyConfig } from "./types.js";

/**
 * Classify a candle per the strategy's definitions:
 * - momentum: body >= 70% of the range (bull if close > open, bear if below)
 * - doji: body <= 10% of the range — indecision, never a trigger
 * - rejection: combined wicks longer than the body; the dominant wick names it
 *   (rejection-down = long lower wick, price rejected lower levels — bullish)
 */
export function classifyCandle(c: Candle, config: StrategyConfig): CandleType {
  const range = c.high - c.low;
  if (range <= 0) return "doji";
  const body = Math.abs(c.close - c.open);
  const ratio = body / range;
  if (ratio <= config.dojiBodyRatio) return "doji";
  if (ratio >= config.momentumBodyRatio) return c.close > c.open ? "bull-momentum" : "bear-momentum";
  const upperWick = c.high - Math.max(c.open, c.close);
  const lowerWick = Math.min(c.open, c.close) - c.low;
  if (upperWick + lowerWick > body) {
    return lowerWick > upperWick ? "rejection-down" : "rejection-up";
  }
  return "neutral";
}

/**
 * Most recent confirmed swing low/high. A swing at index i must be more
 * extreme than the `lookaround` candles on each side, so it is only known
 * once i + lookaround candles have closed.
 */
export function lastSwing(
  candles: Candle[],
  endExclusive: number,
  kind: "low" | "high",
  lookaround: number
): number | null {
  for (let i = endExclusive - 1 - lookaround; i >= lookaround; i--) {
    let isSwing = true;
    for (let j = 1; j <= lookaround && isSwing; j++) {
      if (kind === "low") {
        if (candles[i].low >= candles[i - j].low || candles[i].low >= candles[i + j].low) isSwing = false;
      } else {
        if (candles[i].high <= candles[i - j].high || candles[i].high <= candles[i + j].high) isSwing = false;
      }
    }
    if (isSwing) return kind === "low" ? candles[i].low : candles[i].high;
  }
  return null;
}
