import { describe, expect, it } from "vitest";
import { classifyCandle, lastSwing } from "../src/candles.js";
import { DEFAULT_CONFIG } from "../src/types.js";
import type { Candle } from "../src/types.js";

function c(open: number, high: number, low: number, close: number, time = 0): Candle {
  return { time, open, high, low, close };
}

describe("classifyCandle", () => {
  it("detects bullish momentum (body >= 70% of range)", () => {
    expect(classifyCandle(c(100, 100.95, 99.98, 100.9), DEFAULT_CONFIG)).toBe("bull-momentum");
  });

  it("detects bearish momentum", () => {
    expect(classifyCandle(c(100.9, 100.95, 99.98, 100), DEFAULT_CONFIG)).toBe("bear-momentum");
  });

  it("detects a doji (body <= 10% of range)", () => {
    expect(classifyCandle(c(100, 101, 100, 100.05), DEFAULT_CONFIG)).toBe("doji");
  });

  it("detects a bullish rejection (dominant lower wick)", () => {
    expect(classifyCandle(c(100, 100.15, 99.5, 100.1), DEFAULT_CONFIG)).toBe("rejection-down");
  });

  it("detects a bearish rejection (dominant upper wick)", () => {
    expect(classifyCandle(c(100.1, 100.7, 99.95, 100), DEFAULT_CONFIG)).toBe("rejection-up");
  });

  it("classifies medium-body, small-wick candles as neutral", () => {
    expect(classifyCandle(c(100, 100.8, 99.8, 100.6), DEFAULT_CONFIG)).toBe("neutral");
  });
});

describe("lastSwing", () => {
  const lows = [5, 4, 3, 2, 3, 4, 5, 6, 7];
  const candles = lows.map((low, i) => c(low + 1, low + 2, low, low + 1.5, i));

  it("finds the most recent confirmed swing low", () => {
    expect(lastSwing(candles, candles.length, "low", 2)).toBe(2);
  });

  it("does not use a swing that is not yet confirmed", () => {
    // Cut history right after the dip: only 1 candle after it, needs 2.
    expect(lastSwing(candles, 5, "low", 2)).toBeNull();
  });

  it("finds swing highs symmetrically", () => {
    const highs = [1, 2, 3, 4, 3, 2, 1, 0.5, 0.2];
    const hc = highs.map((high, i) => c(high - 1, high, high - 2, high - 1.5, i));
    expect(lastSwing(hc, hc.length, "high", 2)).toBe(4);
  });
});
