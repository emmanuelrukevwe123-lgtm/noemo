import { describe, expect, it } from "vitest";
import { tradeInputSchema } from "@/lib/validation/trade";

const validTrade = {
  pair: "eurusd",
  direction: "long",
  entryPrice: "1.0842",
  exitPrice: "1.09",
  stopLoss: "1.0812",
  takeProfit: "1.091",
  lotSize: "1",
  riskAmount: "300",
  profitLoss: "620",
  outcome: "win",
  session: "london",
  timeframe: "1H",
  strategy: "London pullback",
  setup: "Retest after sweep",
  notes: "Good patience",
  openedAt: "2026-06-03T08:10",
  closedAt: "2026-06-03T13:40",
  emotion: "patient",
  confidence: "7",
  ruleAdherence: "followed",
  mistakeTags: "",
  executionRating: "8",
  tradingViewUrl: "",
  attachmentCaption: ""
};

describe("trade validation", () => {
  it("normalizes valid Forex trade input", () => {
    const parsed = tradeInputSchema.parse(validTrade);

    expect(parsed.pair).toBe("EURUSD");
    expect(parsed.entryPrice).toBe(1.0842);
    expect(parsed.riskAmount).toBe(300);
    expect(parsed.confidence).toBe(7);
  });

  it("requires closed timestamp for closed trades", () => {
    const result = tradeInputSchema.safeParse({ ...validTrade, closedAt: "" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes("closedAt"))).toBe(true);
    }
  });

  it("rejects realized P/L on open trades", () => {
    const result = tradeInputSchema.safeParse({
      ...validTrade,
      outcome: "open",
      closedAt: "",
      profitLoss: "100"
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes("profitLoss"))).toBe(true);
    }
  });

  it("bounds confidence and execution ratings", () => {
    const result = tradeInputSchema.safeParse({
      ...validTrade,
      confidence: "11",
      executionRating: "0"
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path[0])).toEqual(
        expect.arrayContaining(["confidence", "executionRating"])
      );
    }
  });
});
