import { z } from "zod";
import type { TradeWithRelations } from "@/lib/db/types";
import { normalizedR } from "@/lib/analytics/trades";

export const TRADE_REVIEW_PROMPT_VERSION = "trade-review-v1";

export const tradeReviewSchema = z.object({
  summary: z.string().min(1),
  ruleAdherence: z.string().min(1),
  behaviorPatterns: z.array(z.string().min(1)).min(1).max(5),
  reflectionQuestions: z.array(z.string().min(1)).min(1).max(5),
  riskNotes: z.array(z.string().min(1)).min(1).max(5),
  disclaimer: z.string().min(1)
});

export type TradeReviewOutput = z.infer<typeof tradeReviewSchema>;

type GenerateTradeReviewOptions = {
  apiKey?: string;
  model?: string;
  fetcher?: typeof fetch;
};

const outputJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "summary",
    "ruleAdherence",
    "behaviorPatterns",
    "reflectionQuestions",
    "riskNotes",
    "disclaimer"
  ],
  properties: {
    summary: { type: "string" },
    ruleAdherence: { type: "string" },
    behaviorPatterns: {
      type: "array",
      minItems: 1,
      maxItems: 5,
      items: { type: "string" }
    },
    reflectionQuestions: {
      type: "array",
      minItems: 1,
      maxItems: 5,
      items: { type: "string" }
    },
    riskNotes: {
      type: "array",
      minItems: 1,
      maxItems: 5,
      items: { type: "string" }
    },
    disclaimer: { type: "string" }
  }
};

export function normalizeTradeForAi(trade: TradeWithRelations) {
  return {
    pair: trade.pair,
    direction: trade.direction,
    entryPrice: trade.entry_price,
    exitPrice: trade.exit_price,
    stopLoss: trade.stop_loss,
    takeProfit: trade.take_profit,
    lotSize: trade.lot_size,
    riskAmount: trade.risk_amount,
    profitLoss: trade.profit_loss,
    rMultiple: normalizedR(trade),
    outcome: trade.outcome,
    session: trade.session,
    timeframe: trade.timeframe,
    strategy: trade.strategy,
    setup: trade.setup,
    notes: trade.notes,
    openedAt: trade.opened_at,
    closedAt: trade.closed_at,
    behavior: trade.behavior
      ? {
          emotion: trade.behavior.emotion,
          confidence: trade.behavior.confidence,
          ruleAdherence: trade.behavior.rule_adherence,
          mistakeTags: trade.behavior.mistake_tags,
          executionRating: trade.behavior.execution_rating
        }
      : null,
    attachments: trade.attachments.map((attachment) => ({
      kind: attachment.kind,
      hasImage: attachment.kind === "image",
      hasTradingViewUrl: attachment.kind === "tradingview" && Boolean(attachment.url),
      caption: attachment.caption
    }))
  };
}

export async function generateTradeReview(
  trade: TradeWithRelations,
  options: GenerateTradeReviewOptions = {}
) {
  const apiKey = options.apiKey ?? process.env.OPENAI_API_KEY;
  const model = options.model ?? process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
  const fetcher = options.fetcher ?? fetch;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  if (trade.outcome === "open") {
    throw new Error("AI review is only available after a trade is closed.");
  }

  const response = await fetcher("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "You are Noemo's post-trade review assistant. Review only closed historical trades. Do not provide buy/sell signals, future market predictions, position recommendations, or financial advice. Be concise, behavior-aware, and process-focused."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify(normalizeTradeForAi(trade))
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "noemo_trade_review",
          strict: true,
          schema: outputJsonSchema
        }
      }
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI review failed: ${text || response.statusText}`);
  }

  const payload = (await response.json()) as unknown;
  const content = extractText(payload);
  if (!content) {
    throw new Error("OpenAI review response did not include JSON text.");
  }

  const parsed = tradeReviewSchema.parse(JSON.parse(content));
  return {
    output: parsed,
    model,
    promptVersion: TRADE_REVIEW_PROMPT_VERSION
  };
}

function extractText(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const root = payload as Record<string, unknown>;

  if (typeof root.output_text === "string") return root.output_text;

  const output = root.output;
  if (Array.isArray(output)) {
    for (const item of output) {
      if (!item || typeof item !== "object") continue;
      const content = (item as Record<string, unknown>).content;
      if (!Array.isArray(content)) continue;
      for (const part of content) {
        if (!part || typeof part !== "object") continue;
        const record = part as Record<string, unknown>;
        if (typeof record.text === "string") return record.text;
      }
    }
  }

  const choices = root.choices;
  if (Array.isArray(choices)) {
    const first = choices[0] as Record<string, unknown> | undefined;
    const message = first?.message as Record<string, unknown> | undefined;
    if (typeof message?.content === "string") return message.content;
  }

  return null;
}
