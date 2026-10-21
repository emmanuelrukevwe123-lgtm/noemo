import type { Candle } from "./types.js";

export interface Level {
  price: number;
  label: string;
}

/**
 * Higher-timeframe levels: high, low and 50% midpoint of the previous
 * completed month and previous completed quarter.
 */
export function htfLevels(prevMonth: Candle | null, prevQuarter: Candle | null): Level[] {
  const levels: Level[] = [];
  const add = (candle: Candle | null, prefix: string) => {
    if (!candle) return;
    levels.push({ price: candle.high, label: `${prefix} high` });
    levels.push({ price: candle.low, label: `${prefix} low` });
    levels.push({ price: (candle.high + candle.low) / 2, label: `${prefix} 50%` });
  };
  add(prevMonth, "monthly");
  add(prevQuarter, "quarterly");
  return levels;
}

/** The level nearest to `price` within `tolerance`, or null. */
export function nearestLevelWithin(levels: Level[], price: number, tolerance: number): Level | null {
  let best: Level | null = null;
  let bestDist = Infinity;
  for (const level of levels) {
    const dist = Math.abs(level.price - price);
    if (dist <= tolerance && dist < bestDist) {
      best = level;
      bestDist = dist;
    }
  }
  return best;
}
