import { describe, expect, it } from "vitest";
import { brokerDayKey, brokerWeekKey, nyMinuteOfDay } from "../src/time.js";
import { aggregate } from "../src/aggregate.js";
import type { Candle } from "../src/types.js";

const T = (iso: string) => new Date(iso).getTime();

describe("New York wall clock", () => {
  it("converts winter (EST, UTC-5) timestamps", () => {
    expect(nyMinuteOfDay(T("2026-01-15T15:00:00Z"))).toBe(10 * 60);
  });

  it("converts summer (EDT, UTC-4) timestamps", () => {
    expect(nyMinuteOfDay(T("2026-07-15T15:00:00Z"))).toBe(11 * 60);
  });
});

describe("broker day (5pm ET boundary)", () => {
  it("rolls to a new day exactly at 17:00 New York", () => {
    const before = brokerDayKey(T("2026-01-15T21:59:00Z")); // 16:59 NY
    const after = brokerDayKey(T("2026-01-15T22:00:00Z")); // 17:00 NY
    expect(after).toBe(before + 1);
  });

  it("keeps the whole session in one day", () => {
    expect(brokerDayKey(T("2026-01-15T13:30:00Z"))).toBe(brokerDayKey(T("2026-01-15T17:00:00Z")));
  });

  it("respects DST for the boundary (17:00 NY = 21:00 UTC in summer)", () => {
    const before = brokerDayKey(T("2026-07-15T20:59:00Z"));
    const after = brokerDayKey(T("2026-07-15T21:00:00Z"));
    expect(after).toBe(before + 1);
  });
});

describe("broker week", () => {
  it("starts a new week at the Sunday 17:00 NY open", () => {
    const friday = brokerWeekKey(T("2026-01-16T15:00:00Z"));
    const sundayOpen = brokerWeekKey(T("2026-01-18T22:05:00Z")); // Sunday 17:05 NY
    expect(sundayOpen).toBeGreaterThan(friday);
    expect(brokerWeekKey(T("2026-01-20T15:00:00Z"))).toBe(sundayOpen); // Tuesday, same week
  });
});

describe("aggregate", () => {
  const m1 = (iso: string, price: number): Candle => ({
    time: T(iso),
    open: price,
    high: price + 1,
    low: price - 1,
    close: price + 0.5
  });

  it("splits daily candles at the 5pm ET boundary", () => {
    const candles = [
      m1("2026-01-15T21:58:00Z", 100),
      m1("2026-01-15T21:59:00Z", 101),
      m1("2026-01-15T22:00:00Z", 102),
      m1("2026-01-15T22:01:00Z", 103)
    ];
    const daily = aggregate(candles, "1d");
    expect(daily).toHaveLength(2);
    expect(daily[0].open).toBe(100);
    expect(daily[0].close).toBe(101.5);
    expect(daily[1].open).toBe(102);
    expect(daily[1].high).toBe(104);
  });

  it("merges 1m candles into 15m buckets with correct OHLC", () => {
    const candles = [
      m1("2026-01-15T15:00:00Z", 100),
      m1("2026-01-15T15:07:00Z", 90),
      m1("2026-01-15T15:14:00Z", 110),
      m1("2026-01-15T15:15:00Z", 120)
    ];
    const tf15 = aggregate(candles, "15m");
    expect(tf15).toHaveLength(2);
    expect(tf15[0].open).toBe(100);
    expect(tf15[0].low).toBe(89);
    expect(tf15[0].high).toBe(111);
    expect(tf15[0].close).toBe(110.5);
    expect(tf15[1].open).toBe(120);
  });
});
