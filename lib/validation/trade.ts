import { z } from "zod";
import type {
  RuleAdherence,
  TradeDirection,
  TradeOutcome,
  TradingSession
} from "@/lib/db/types";

export const directionValues = ["long", "short"] as const satisfies readonly TradeDirection[];
export const sessionValues = [
  "asia",
  "london",
  "new_york",
  "overlap",
  "other"
] as const satisfies readonly TradingSession[];
export const outcomeValues = [
  "win",
  "loss",
  "breakeven",
  "open"
] as const satisfies readonly TradeOutcome[];
export const ruleAdherenceValues = [
  "followed",
  "partial",
  "broken",
  "not_applicable"
] as const satisfies readonly RuleAdherence[];

const optionalNumber = z.preprocess((value) => {
  if (value === "" || value === null || typeof value === "undefined") return null;
  return value;
}, z.coerce.number().finite().nullable());

const requiredPositiveNumber = z.coerce
  .number({ invalid_type_error: "Enter a valid number." })
  .finite()
  .positive("Must be greater than zero.");

const nonNegativeNumber = z.coerce
  .number({ invalid_type_error: "Enter a valid number." })
  .finite()
  .nonnegative("Must be zero or greater.");

export const tradeInputSchema = z
  .object({
    pair: z
      .string()
      .trim()
      .min(3, "Pair is required.")
      .max(12, "Pair is too long.")
      .transform((value) => value.toUpperCase()),
    direction: z.enum(directionValues),
    entryPrice: requiredPositiveNumber,
    exitPrice: optionalNumber,
    stopLoss: optionalNumber,
    takeProfit: optionalNumber,
    lotSize: requiredPositiveNumber,
    riskAmount: nonNegativeNumber,
    profitLoss: optionalNumber,
    outcome: z.enum(outcomeValues),
    session: z.enum(sessionValues),
    timeframe: z.string().trim().min(1, "Timeframe is required.").max(20),
    strategy: z.string().trim().min(1, "Strategy is required.").max(80),
    setup: z.string().trim().max(120).optional().or(z.literal("")),
    notes: z.string().trim().max(3000).optional().or(z.literal("")),
    openedAt: z.string().min(1, "Opened time is required."),
    closedAt: z.string().optional().or(z.literal("")),
    emotion: z.string().trim().max(40).optional().or(z.literal("")),
    confidence: optionalNumber,
    ruleAdherence: z.enum(ruleAdherenceValues),
    mistakeTags: z.string().trim().max(300).optional().or(z.literal("")),
    executionRating: optionalNumber,
    tradingViewUrl: z
      .string()
      .trim()
      .url("Enter a valid URL.")
      .optional()
      .or(z.literal("")),
    attachmentCaption: z.string().trim().max(160).optional().or(z.literal(""))
  })
  .superRefine((value, ctx) => {
    if (value.outcome !== "open" && !value.closedAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["closedAt"],
        message: "Closed time is required for closed trades."
      });
    }

    if (value.outcome === "open" && value.profitLoss !== null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["profitLoss"],
        message: "Open trades should not have realized P/L."
      });
    }

    if (value.confidence !== null && (value.confidence < 1 || value.confidence > 10)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confidence"],
        message: "Confidence must be between 1 and 10."
      });
    }

    if (
      value.executionRating !== null &&
      (value.executionRating < 1 || value.executionRating > 10)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["executionRating"],
        message: "Execution rating must be between 1 and 10."
      });
    }
  });

export type TradeInput = z.infer<typeof tradeInputSchema>;

export function mistakeTagList(value: string | null | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function formDataToTradeInput(formData: FormData) {
  return tradeInputSchema.parse({
    pair: formData.get("pair"),
    direction: formData.get("direction"),
    entryPrice: formData.get("entryPrice"),
    exitPrice: formData.get("exitPrice"),
    stopLoss: formData.get("stopLoss"),
    takeProfit: formData.get("takeProfit"),
    lotSize: formData.get("lotSize"),
    riskAmount: formData.get("riskAmount"),
    profitLoss: formData.get("profitLoss"),
    outcome: formData.get("outcome"),
    session: formData.get("session"),
    timeframe: formData.get("timeframe"),
    strategy: formData.get("strategy"),
    setup: formData.get("setup"),
    notes: formData.get("notes"),
    openedAt: formData.get("openedAt"),
    closedAt: formData.get("closedAt"),
    emotion: formData.get("emotion"),
    confidence: formData.get("confidence"),
    ruleAdherence: formData.get("ruleAdherence"),
    mistakeTags: formData.get("mistakeTags"),
    executionRating: formData.get("executionRating"),
    tradingViewUrl: formData.get("tradingViewUrl"),
    attachmentCaption: formData.get("attachmentCaption")
  });
}
