import { describe, expect, it } from "vitest";
import { simulate } from "../src/backtest.js";
import { DEFAULT_CONFIG, type Candle, type Signal } from "../src/types.js";

// Fixed-exit base config: every exit model disabled (v1.2's DEFAULT_CONFIG
// ships with the trailing stop on, so tests opt in to each model explicitly).
const FIXED = { ...DEFAULT_CONFIG, tpR: 2, beTriggerR: null, trailStartR: null, partialR: null };

// Buy signal: entry 100, SL 99 (risk 1), TP 102 (2R).
const signal: Signal = {
  pair: "XAUUSD",
  direction: "buy",
  time: 0,
  entryTimeframe: "15m",
  entry: 100,
  stopLoss: 99,
  takeProfit: 102,
  risk: 1,
  reasons: []
};

const candle = (time: number, low: number, high: number): Candle => ({
  time,
  open: (low + high) / 2,
  high,
  low,
  close: (low + high) / 2
});

describe("simulate exit models", () => {
  it("baseline: fixed TP win is +tpR", () => {
    const res = simulate(signal, [candle(1, 99.5, 100.5), candle(2, 100.5, 102.1)], 0, FIXED);
    expect(res.outcome).toBe("win");
    expect(res.realizedR).toBeCloseTo(2);
  });

  it("baseline: stop hit is -1R, and a candle touching both exits at the stop", () => {
    const res = simulate(signal, [candle(1, 98.9, 102.5)], 0, FIXED);
    expect(res.outcome).toBe("loss");
    expect(res.realizedR).toBeCloseTo(-1);
  });

  it("break-even: stop moves to entry after +1R, later retrace exits at 0R", () => {
    const config = { ...FIXED, beTriggerR: 1 };
    const candles = [candle(1, 99.8, 101.0), candle(2, 100.3, 101.2), candle(3, 99.5, 100.6)];
    const res = simulate(signal, candles, 0, config);
    expect(res.outcome).toBe("be");
    expect(res.realizedR).toBeCloseTo(0);
    expect(res.exitTime).toBe(3);
  });

  it("break-even move does not apply within the trigger candle itself", () => {
    const config = { ...FIXED, beTriggerR: 1 };
    // Same candle reaches +1R then falls to 99.2: BE only arms for the NEXT
    // candle, and 99.2 > SL 99, so the trade should still be open... next
    // candle hits the (now break-even) stop.
    const candles = [candle(1, 99.2, 101.0), candle(2, 99.9, 100.4)];
    const res = simulate(signal, candles, 0, config);
    expect(res.outcome).toBe("be");
    expect(res.exitTime).toBe(2);
  });

  it("trailing: stop follows the high at the trail distance", () => {
    const config = { ...FIXED, tpR: 100, trailStartR: 1, trailDistanceR: 1 };
    // High reaches 101.8 → trail to 100.8; next candle drops through 100.8.
    const candles = [candle(1, 100.0, 101.8), candle(2, 100.5, 101.0)];
    const res = simulate(signal, candles, 0, config);
    expect(res.outcome).toBe("win");
    expect(res.realizedR).toBeCloseTo(0.8);
  });

  it("partial: 50% at 1R + BE, rest to TP", () => {
    const config = { ...FIXED, partialR: 1, partialFraction: 0.5 };
    const candles = [candle(1, 99.8, 101.1), candle(2, 100.8, 102.2)];
    const res = simulate(signal, candles, 0, config);
    // 0.5 × 1R + 0.5 × 2R = 1.5R
    expect(res.realizedR).toBeCloseTo(1.5);
    expect(res.outcome).toBe("win");
  });

  it("partial: 50% at 1R then stopped at break-even nets +0.5R", () => {
    const config = { ...FIXED, partialR: 1, partialFraction: 0.5 };
    const candles = [candle(1, 99.8, 101.1), candle(2, 99.9, 100.7)];
    const res = simulate(signal, candles, 0, config);
    expect(res.realizedR).toBeCloseTo(0.5);
    expect(res.outcome).toBe("win");
  });

  it("partial and TP in the same candle fills the partial first", () => {
    const config = { ...FIXED, partialR: 1, partialFraction: 0.5 };
    const res = simulate(signal, [candle(1, 99.9, 102.5)], 0, config);
    expect(res.realizedR).toBeCloseTo(0.5 * 1 + 0.5 * 2);
  });

  it("sell direction mirrors correctly", () => {
    const sell: Signal = { ...signal, direction: "sell", stopLoss: 101, takeProfit: 98 };
    const config = { ...FIXED, beTriggerR: 1 };
    const candles = [candle(1, 98.9, 100.2), candle(2, 99.5, 100.3)];
    const res = simulate(sell, candles, 0, config);
    expect(res.outcome).toBe("be");
    expect(res.realizedR).toBeCloseTo(0);
  });
});
