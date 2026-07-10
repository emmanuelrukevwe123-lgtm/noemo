# AI Post-Trade Review

The AI service produces **post-trade reflection notes** for closed trades. It is
deliberately constrained: it does **not** give buy/sell signals, market
predictions, position sizing recommendations, or financial advice.

Implementation: `lib/ai/trade-review.ts`. Invoked by the
`generateAiReviewAction` server action (`lib/actions/trades.ts`).

## Provider & model

- **API:** OpenAI **Responses API** (`POST https://api.openai.com/v1/responses`).
- **Model:** `OPENAI_MODEL` env var, falling back to `gpt-4.1-mini`.
- **Auth:** `OPENAI_API_KEY` (server-only).
- **Sampling:** `temperature: 0.2` for stable, conservative output.

> The codebase uses the OpenAI Responses API. If you switch providers/models,
> keep the strict JSON-schema contract below intact so the parser and DB shape
> stay valid.

## Guardrails

1. **Closed trades only.** `generateTradeReview` throws if `trade.outcome === "open"`.
2. **System prompt** pins the assistant to post-trade reflection and explicitly
   forbids signals, predictions, and advice.
3. **Structured output.** The request uses
   `text.format = { type: "json_schema", strict: true, schema: ... }`, so the
   model must return JSON matching `outputJsonSchema`.
4. **Runtime validation.** The returned text is parsed and validated again with
   Zod (`tradeReviewSchema`) before anything is saved.
5. **Demo mode** blocks the action entirely (read-only).

## Input: what the model sees

`normalizeTradeForAi(trade)` builds a compact JSON object — execution fields
(pair, direction, prices, lot size, risk, P/L, R-multiple, outcome, session,
timeframe, strategy, setup, notes, timestamps), the behavior block (emotion,
confidence, rule adherence, mistake tags, execution rating), and **metadata
only** about attachments (kind, whether an image/TradingView URL exists,
caption — not the image bytes).

## Output schema (`TradeReviewOutput`)

```ts
{
  summary: string;                 // concise overview
  ruleAdherence: string;           // assessment of process discipline
  behaviorPatterns: string[];      // 1–5 items
  reflectionQuestions: string[];   // 1–5 items
  riskNotes: string[];             // 1–5 items
  disclaimer: string;              // required
}
```

Validated by `tradeReviewSchema`. The same shape is enforced server-side by
`outputJsonSchema` in the API request.

## Persistence

On success, `saveAiTradeReview` writes a row to `ai_trade_reviews`:

| Column | Source |
|--------|--------|
| `summary` | `output.summary` |
| `structured_output` | the full `TradeReviewOutput` (jsonb) |
| `model` | model id actually used |
| `prompt_version` | `TRADE_REVIEW_PROMPT_VERSION` (`trade-review-v1`) |
| `disclaimer` | `output.disclaimer` |

Reviews are kept as history (1:many per trade), so prompt/model changes are
traceable via `prompt_version` / `model`.

## Response parsing

`extractText(payload)` is defensive and handles several OpenAI response shapes:
top-level `output_text`, the `output[].content[].text` structure, and
chat-style `choices[0].message.content`. It returns the JSON string, which is
then `JSON.parse`d and Zod-validated.

## Testing

`tests/ai-review.test.ts` exercises the service with a mocked `fetcher`
(`generateTradeReview` accepts `{ apiKey, model, fetcher }` options for exactly
this purpose) — no real API calls in tests.

## Operational considerations

- **Cost:** every click is a paid call; there is currently no caching/cooldown.
- **Timeouts:** the `fetch` has no abort timeout — consider adding one.
- See [CONTRIBUTING.md](./CONTRIBUTING.md#known-improvements) for the backlog.
