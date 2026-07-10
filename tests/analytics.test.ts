import { describe, expect, it } from "vitest";
import {
  calculateRMultiple,
  inferOutcome,
  summarizeTrades
} from "@/lib/analytics/trades";
import { sampleTrades } from "@/lib/db/sample-data";

describe("trade analytics", () => {
  it("calculates R multiple from realized P/L and risk", () => {
    expect(calculateRMultiple(300, 150)).toBe(2);
    expect(calculateRMultiple(-75, 150)).toBe(-0.5);
    expect(calculateRMultiple(100, 0)).toBeNull();
    expect(calculateRMultiple(null, 100)).toBeNull();
  });

  it("infers trade outcome from realized P/L", () => {
    expect(inferOutcome(10)).toBe("win");
    expect(inferOutcome(-10)).toBe("loss");
    expect(inferOutcome(0)).toBe("breakeven");
    expect(inferOutcome(null)).toBe("open");
  });

  it("summarizes deterministic dashboard metrics", () => {
    const analytics = summarizeTrades(sampleTrades);

    expect(analytics.totalTrades).toBe(7);
    expect(analytics.closedTrades).toBe(6);
    expect(analytics.wins).toBe(3);
    expect(analytics.losses).toBe(2);
    expect(analytics.breakeven).toBe(1);
    expect(analytics.netProfitLoss).toBe(814);
    expect(analytics.winRate).toBe(50);
    expect(analytics.maxDrawdown).toBeLessThanOrEqual(0);
    expect(analytics.pairBreakdown[0]?.key).toBe("EURUSD");
  });
});
