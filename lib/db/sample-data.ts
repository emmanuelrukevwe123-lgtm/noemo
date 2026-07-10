import type {
  AiTradeReviewRow,
  RuleAdherence,
  TradeDirection,
  TradeOutcome,
  TradeWithRelations,
  TradingSession
} from "@/lib/db/types";

const userId = "00000000-0000-4000-8000-000000000001";

export const sampleReviews: AiTradeReviewRow[] = [
  {
    id: "demo-review-1",
    user_id: userId,
    trade_id: "demo-gbpusd-1",
    summary:
      "The setup had a reasonable location, but execution quality dropped because the trade was entered before confirmation and the stop was moved.",
    structured_output: {
      summary:
        "The setup had a reasonable location, but execution quality dropped because the trade was entered before confirmation and the stop was moved.",
      ruleAdherence: "broken",
      behaviorPatterns: [
        "High confidence combined with early entry increased downside.",
        "Moving the stop converted a planned loss into a larger loss."
      ],
      reflectionQuestions: [
        "What exact candle close confirms this setup?",
        "What rule prevents stop movement once risk is accepted?"
      ],
      riskNotes: [
        "Risk expanded beyond the original invalidation point.",
        "Similar trades should be tagged early entry until confirmation improves."
      ],
      disclaimer:
        "This is a post-trade educational review, not financial advice or a trading recommendation."
    },
    model: "demo",
    prompt_version: "trade-review-v1",
    disclaimer:
      "This is a post-trade educational review, not financial advice or a trading recommendation.",
    created_at: "2026-06-05T16:20:00.000Z"
  }
];

export const sampleTrades: TradeWithRelations[] = [
  trade({
    id: "demo-eurusd-1",
    pair: "EURUSD",
    direction: "long",
    entry_price: 1.0842,
    exit_price: 1.0904,
    stop_loss: 1.0812,
    take_profit: 1.091,
    lot_size: 1,
    risk_amount: 300,
    profit_loss: 620,
    r_multiple: 2.0667,
    outcome: "win",
    session: "london",
    timeframe: "1H",
    strategy: "London pullback",
    setup: "Retest of prior resistance after CPI flush.",
    notes: "Waited for the retest and did not chase the first impulse.",
    opened_at: "2026-06-03T08:10:00.000Z",
    closed_at: "2026-06-03T13:40:00.000Z",
    behavior: {
      emotion: "patient",
      confidence: 7,
      rule_adherence: "followed",
      mistake_tags: [],
      execution_rating: 8
    }
  }),
  trade({
    id: "demo-gbpusd-1",
    pair: "GBPUSD",
    direction: "short",
    entry_price: 1.2721,
    exit_price: 1.2774,
    stop_loss: 1.2751,
    take_profit: 1.266,
    lot_size: 0.8,
    risk_amount: 280,
    profit_loss: -420,
    r_multiple: -1.5,
    outcome: "loss",
    session: "new_york",
    timeframe: "30M",
    strategy: "NY reversal",
    setup: "Rejected weekly supply but entered before confirmation close.",
    notes: "Moved stop once after the first push against the trade.",
    opened_at: "2026-06-05T14:15:00.000Z",
    closed_at: "2026-06-05T16:05:00.000Z",
    behavior: {
      emotion: "impatient",
      confidence: 9,
      rule_adherence: "broken",
      mistake_tags: ["early entry", "moved stop"],
      execution_rating: 3
    }
  }),
  trade({
    id: "demo-usdjpy-1",
    pair: "USDJPY",
    direction: "long",
    entry_price: 156.22,
    exit_price: 156.71,
    stop_loss: 155.92,
    take_profit: 156.85,
    lot_size: 0.6,
    risk_amount: 240,
    profit_loss: 392,
    r_multiple: 1.6333,
    outcome: "win",
    session: "overlap",
    timeframe: "15M",
    strategy: "Trend continuation",
    setup: "Higher low into London/New York overlap.",
    notes: "Took partials at 1R and let remainder trail.",
    opened_at: "2026-06-10T12:30:00.000Z",
    closed_at: "2026-06-10T15:10:00.000Z",
    behavior: {
      emotion: "focused",
      confidence: 8,
      rule_adherence: "followed",
      mistake_tags: [],
      execution_rating: 9
    }
  }),
  trade({
    id: "demo-eurusd-2",
    pair: "EURUSD",
    direction: "short",
    entry_price: 1.092,
    exit_price: 1.0918,
    stop_loss: 1.0945,
    take_profit: 1.086,
    lot_size: 1,
    risk_amount: 250,
    profit_loss: 0,
    r_multiple: 0,
    outcome: "breakeven",
    session: "london",
    timeframe: "1H",
    strategy: "Break retest",
    setup: "Failed continuation after ECB comments.",
    notes: "Cut at scratch once price returned to entry.",
    opened_at: "2026-06-13T09:20:00.000Z",
    closed_at: "2026-06-13T11:35:00.000Z",
    behavior: {
      emotion: "neutral",
      confidence: 6,
      rule_adherence: "partial",
      mistake_tags: ["late exit"],
      execution_rating: 6
    }
  }),
  trade({
    id: "demo-audusd-1",
    pair: "AUDUSD",
    direction: "long",
    entry_price: 0.6624,
    exit_price: 0.6598,
    stop_loss: 0.6602,
    take_profit: 0.667,
    lot_size: 1.2,
    risk_amount: 220,
    profit_loss: -310,
    r_multiple: -1.4091,
    outcome: "loss",
    session: "asia",
    timeframe: "4H",
    strategy: "Range reclaim",
    setup: "Asia range reclaim failed after weak jobs data.",
    notes: "Trade idea was valid but entered before news volatility settled.",
    opened_at: "2026-06-17T02:40:00.000Z",
    closed_at: "2026-06-17T05:25:00.000Z",
    behavior: {
      emotion: "rushed",
      confidence: 8,
      rule_adherence: "partial",
      mistake_tags: ["news risk", "early entry"],
      execution_rating: 4
    }
  }),
  trade({
    id: "demo-gbpusd-2",
    pair: "GBPUSD",
    direction: "long",
    entry_price: 1.2685,
    exit_price: 1.2742,
    stop_loss: 1.2658,
    take_profit: 1.276,
    lot_size: 0.7,
    risk_amount: 260,
    profit_loss: 532,
    r_multiple: 2.0462,
    outcome: "win",
    session: "new_york",
    timeframe: "1H",
    strategy: "Liquidity sweep",
    setup: "Sweep below prior day low then reclaim.",
    notes: "Best trade of the week. Clear invalidation and strong patience.",
    opened_at: "2026-06-20T13:05:00.000Z",
    closed_at: "2026-06-20T18:10:00.000Z",
    behavior: {
      emotion: "calm",
      confidence: 7,
      rule_adherence: "followed",
      mistake_tags: [],
      execution_rating: 9
    }
  }),
  trade({
    id: "demo-usdcad-1",
    pair: "USDCAD",
    direction: "short",
    entry_price: 1.369,
    exit_price: null,
    stop_loss: 1.372,
    take_profit: 1.363,
    lot_size: 0.5,
    risk_amount: 180,
    profit_loss: null,
    r_multiple: null,
    outcome: "open",
    session: "new_york",
    timeframe: "4H",
    strategy: "Trend continuation",
    setup: "Retest of descending channel.",
    notes: "Open demo position for UI state.",
    opened_at: "2026-06-24T15:15:00.000Z",
    closed_at: null,
    behavior: {
      emotion: "focused",
      confidence: 6,
      rule_adherence: "followed",
      mistake_tags: [],
      execution_rating: null
    }
  })
];

type TradeSeed = {
  id: string;
  pair: string;
  direction: TradeDirection;
  entry_price: number;
  exit_price: number | null;
  stop_loss: number | null;
  take_profit: number | null;
  lot_size: number;
  risk_amount: number;
  profit_loss: number | null;
  r_multiple: number | null;
  outcome: TradeOutcome;
  session: TradingSession;
  timeframe: string;
  strategy: string;
  setup: string | null;
  notes: string | null;
  opened_at: string;
  closed_at: string | null;
  behavior: {
    emotion: string | null;
    confidence: number | null;
    rule_adherence: RuleAdherence;
    mistake_tags: string[];
    execution_rating: number | null;
  };
};

function trade(seed: TradeSeed): TradeWithRelations {
  return {
    ...seed,
    user_id: userId,
    created_at: seed.opened_at,
    updated_at: seed.closed_at ?? seed.opened_at,
    behavior: {
      id: `behavior-${seed.id}`,
      user_id: userId,
      trade_id: seed.id,
      created_at: seed.opened_at,
      updated_at: seed.closed_at ?? seed.opened_at,
      ...seed.behavior
    },
    attachments:
      seed.id === "demo-eurusd-1"
        ? [
            {
              id: "attachment-demo-eurusd-1",
              user_id: userId,
              trade_id: seed.id,
              kind: "tradingview",
              storage_path: null,
              url: "https://www.tradingview.com/chart/demo-eurusd/",
              caption: "London pullback chart idea",
              created_at: seed.closed_at ?? seed.opened_at
            }
          ]
        : [],
    aiReviews: sampleReviews.filter((review) => review.trade_id === seed.id)
  };
}
