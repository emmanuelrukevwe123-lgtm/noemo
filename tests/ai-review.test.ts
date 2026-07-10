import { describe, expect, it } from "vitest";
import { generateTradeReview } from "@/lib/ai/trade-review";
import { sampleTrades } from "@/lib/db/sample-data";

const validOutput = {
  summary: "Execution followed the setup and risk was contained.",
  ruleAdherence: "followed",
  behaviorPatterns: ["Patient entry improved trade quality."],
  reflectionQuestions: ["What made the confirmation clear?"],
  riskNotes: ["Risk stayed within the planned amount."],
  disclaimer:
    "This is a post-trade educational review, not financial advice or a trading recommendation."
};

describe("AI trade review service", () => {
  it("parses structured JSON from a mocked OpenAI response", async () => {
    const fetcher = async () =>
      new Response(
        JSON.stringify({
          output_text: JSON.stringify(validOutput)
        }),
        { status: 200 }
      );

    const review = await generateTradeReview(sampleTrades[0], {
      apiKey: "test-key",
      model: "test-model",
      fetcher: fetcher as typeof fetch
    });

    expect(review.output.summary).toBe(validOutput.summary);
    expect(review.output.behaviorPatterns).toHaveLength(1);
    expect(review.model).toBe("test-model");
  });

  it("rejects missing or invalid JSON", async () => {
    const fetcher = async () =>
      new Response(JSON.stringify({ output_text: "not json" }), { status: 200 });

    await expect(
      generateTradeReview(sampleTrades[0], {
        apiKey: "test-key",
        fetcher: fetcher as typeof fetch
      })
    ).rejects.toThrow();
  });

  it("does not review open trades", async () => {
    await expect(
      generateTradeReview(sampleTrades.find((trade) => trade.outcome === "open")!, {
        apiKey: "test-key"
      })
    ).rejects.toThrow("closed");
  });
});
