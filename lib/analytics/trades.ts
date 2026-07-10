import type {
  TradeBehaviorRow,
  TradeOutcome,
  TradeRow,
  TradeWithRelations,
  TradingSession
} from "@/lib/db/types";

export type TradeAnalytics = {
  totalTrades: number;
  closedTrades: number;
  wins: number;
  losses: number;
  breakeven: number;
  netProfitLoss: number;
  grossProfit: number;
  grossLoss: number;
  winRate: number;
  expectancyR: number;
  averageR: number;
  averageWinR: number;
  averageLossR: number;
  maxDrawdown: number;
  bestPair: BreakdownItem | null;
  worstPair: BreakdownItem | null;
  pairBreakdown: BreakdownItem[];
  sessionBreakdown: BreakdownItem[];
  emotionBreakdown: BreakdownItem[];
  mistakeBreakdown: MistakeBreakdownItem[];
  equityCurve: EquityPoint[];
};

export type BreakdownItem = {
  key: string;
  label: string;
  trades: number;
  wins: number;
  losses: number;
  netProfitLoss: number;
  averageR: number;
  winRate: number;
};

export type MistakeBreakdownItem = {
  tag: string;
  trades: number;
  netProfitLoss: number;
  averageR: number;
};

export type EquityPoint = {
  date: string;
  netProfitLoss: number;
  cumulativeProfitLoss: number;
  rMultiple: number;
  cumulativeR: number;
};

export function calculateRMultiple(
  profitLoss: number | null | undefined,
  riskAmount: number | null | undefined
) {
  if (profitLoss === null || typeof profitLoss === "undefined") return null;
  if (!riskAmount || riskAmount <= 0) return null;
  return round(profitLoss / riskAmount, 4);
}

export function inferOutcome(profitLoss: number | null | undefined): TradeOutcome {
  if (profitLoss === null || typeof profitLoss === "undefined") return "open";
  if (profitLoss > 0) return "win";
  if (profitLoss < 0) return "loss";
  return "breakeven";
}

export function summarizeTrades(trades: TradeWithRelations[]): TradeAnalytics {
  const closed = trades
    .filter((trade) => trade.outcome !== "open")
    .sort((a, b) => {
      const aTime = new Date(a.closed_at ?? a.opened_at).getTime();
      const bTime = new Date(b.closed_at ?? b.opened_at).getTime();
      return aTime - bTime;
    });

  const wins = closed.filter((trade) => trade.outcome === "win").length;
  const losses = closed.filter((trade) => trade.outcome === "loss").length;
  const breakeven = closed.filter((trade) => trade.outcome === "breakeven").length;
  const netProfitLoss = sum(closed.map((trade) => trade.profit_loss ?? 0));
  const grossProfit = sum(
    closed.filter((trade) => (trade.profit_loss ?? 0) > 0).map((trade) => trade.profit_loss ?? 0)
  );
  const grossLoss = sum(
    closed.filter((trade) => (trade.profit_loss ?? 0) < 0).map((trade) => trade.profit_loss ?? 0)
  );
  const rMultiples = closed
    .map((trade) => normalizedR(trade))
    .filter((value): value is number => value !== null);
  const winningR = closed
    .filter((trade) => trade.outcome === "win")
    .map((trade) => normalizedR(trade))
    .filter((value): value is number => value !== null);
  const losingR = closed
    .filter((trade) => trade.outcome === "loss")
    .map((trade) => normalizedR(trade))
    .filter((value): value is number => value !== null);

  const pairBreakdown = buildBreakdown(closed, (trade) => trade.pair);
  const sessionBreakdown = buildBreakdown(closed, (trade) => trade.session);
  const emotionBreakdown = buildBreakdown(closed, (trade) => trade.behavior?.emotion ?? "Unlogged");
  const mistakeBreakdown = buildMistakeBreakdown(closed);
  const equityCurve = buildEquityCurve(closed);

  return {
    totalTrades: trades.length,
    closedTrades: closed.length,
    wins,
    losses,
    breakeven,
    netProfitLoss: round(netProfitLoss, 2),
    grossProfit: round(grossProfit, 2),
    grossLoss: round(grossLoss, 2),
    winRate: closed.length ? round((wins / closed.length) * 100, 2) : 0,
    expectancyR: round(average(rMultiples), 4),
    averageR: round(average(rMultiples), 4),
    averageWinR: round(average(winningR), 4),
    averageLossR: round(average(losingR), 4),
    maxDrawdown: round(calculateMaxDrawdown(equityCurve), 2),
    bestPair: pairBreakdown[0] ?? null,
    worstPair: [...pairBreakdown].sort((a, b) => a.netProfitLoss - b.netProfitLoss)[0] ?? null,
    pairBreakdown,
    sessionBreakdown,
    emotionBreakdown,
    mistakeBreakdown,
    equityCurve
  };
}

export function normalizedR(trade: Pick<TradeRow, "r_multiple" | "profit_loss" | "risk_amount">) {
  if (typeof trade.r_multiple === "number") return trade.r_multiple;
  return calculateRMultiple(trade.profit_loss, trade.risk_amount);
}

function buildBreakdown(
  trades: TradeWithRelations[],
  getKey: (trade: TradeWithRelations) => string
): BreakdownItem[] {
  const groups = new Map<string, TradeWithRelations[]>();

  for (const trade of trades) {
    const key = getKey(trade) || "Unlogged";
    groups.set(key, [...(groups.get(key) ?? []), trade]);
  }

  return Array.from(groups.entries())
    .map(([key, grouped]) => {
      const wins = grouped.filter((trade) => trade.outcome === "win").length;
      const losses = grouped.filter((trade) => trade.outcome === "loss").length;
      const rMultiples = grouped
        .map((trade) => normalizedR(trade))
        .filter((value): value is number => value !== null);
      return {
        key,
        label: labelForKey(key),
        trades: grouped.length,
        wins,
        losses,
        netProfitLoss: round(sum(grouped.map((trade) => trade.profit_loss ?? 0)), 2),
        averageR: round(average(rMultiples), 4),
        winRate: grouped.length ? round((wins / grouped.length) * 100, 2) : 0
      };
    })
    .sort((a, b) => b.netProfitLoss - a.netProfitLoss);
}

function buildMistakeBreakdown(trades: TradeWithRelations[]) {
  const rows = new Map<string, TradeWithRelations[]>();

  for (const trade of trades) {
    const tags = trade.behavior?.mistake_tags.length
      ? trade.behavior.mistake_tags
      : ["none"];

    for (const tag of tags) {
      rows.set(tag, [...(rows.get(tag) ?? []), trade]);
    }
  }

  return Array.from(rows.entries())
    .map(([tag, grouped]) => {
      const rMultiples = grouped
        .map((trade) => normalizedR(trade))
        .filter((value): value is number => value !== null);
      return {
        tag,
        trades: grouped.length,
        netProfitLoss: round(sum(grouped.map((trade) => trade.profit_loss ?? 0)), 2),
        averageR: round(average(rMultiples), 4)
      };
    })
    .sort((a, b) => a.averageR - b.averageR);
}

function buildEquityCurve(trades: TradeWithRelations[]): EquityPoint[] {
  let cumulativeProfitLoss = 0;
  let cumulativeR = 0;

  return trades.map((trade) => {
    const profitLoss = trade.profit_loss ?? 0;
    const rMultiple = normalizedR(trade) ?? 0;
    cumulativeProfitLoss += profitLoss;
    cumulativeR += rMultiple;

    return {
      date: trade.closed_at ?? trade.opened_at,
      netProfitLoss: round(profitLoss, 2),
      cumulativeProfitLoss: round(cumulativeProfitLoss, 2),
      rMultiple: round(rMultiple, 4),
      cumulativeR: round(cumulativeR, 4)
    };
  });
}

function calculateMaxDrawdown(equityCurve: EquityPoint[]) {
  let peak = 0;
  let maxDrawdown = 0;

  for (const point of equityCurve) {
    peak = Math.max(peak, point.cumulativeProfitLoss);
    maxDrawdown = Math.min(maxDrawdown, point.cumulativeProfitLoss - peak);
  }

  return maxDrawdown;
}

function average(values: number[]) {
  if (!values.length) return 0;
  return sum(values) / values.length;
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function round(value: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function labelForKey(key: string) {
  const sessionLabels: Record<TradingSession, string> = {
    asia: "Asia",
    london: "London",
    new_york: "New York",
    overlap: "Overlap",
    other: "Other"
  };

  return sessionLabels[key as TradingSession] ?? key;
}

export function behaviorInsight(
  analytics: Pick<TradeAnalytics, "emotionBreakdown" | "mistakeBreakdown" | "sessionBreakdown">
) {
  const weakEmotion = analytics.emotionBreakdown
    .filter((item) => item.trades >= 2)
    .sort((a, b) => a.averageR - b.averageR)[0];
  const weakMistake = analytics.mistakeBreakdown
    .filter((item) => item.tag !== "none" && item.trades >= 1)
    .sort((a, b) => a.averageR - b.averageR)[0];
  const weakSession = analytics.sessionBreakdown
    .filter((item) => item.trades >= 2)
    .sort((a, b) => a.averageR - b.averageR)[0];

  if (weakMistake) {
    return `Mistake tag "${weakMistake.tag}" has the weakest average R at ${weakMistake.averageR.toFixed(2)}R.`;
  }

  if (weakEmotion) {
    return `${weakEmotion.label} trades are underperforming at ${weakEmotion.averageR.toFixed(2)}R average.`;
  }

  if (weakSession) {
    return `${weakSession.label} session trades are the weakest segment at ${weakSession.averageR.toFixed(2)}R average.`;
  }

  return "Log more closed trades with behavior fields to unlock stronger pattern reads.";
}

export function behaviorFromRow(row: Partial<TradeBehaviorRow> | null): TradeBehaviorRow | null {
  if (!row?.trade_id || !row.user_id) return null;
  return {
    id: row.id ?? "demo-behavior",
    user_id: row.user_id,
    trade_id: row.trade_id,
    emotion: row.emotion ?? null,
    confidence: row.confidence ?? null,
    rule_adherence: row.rule_adherence ?? "not_applicable",
    mistake_tags: row.mistake_tags ?? [],
    execution_rating: row.execution_rating ?? null,
    created_at: row.created_at ?? new Date().toISOString(),
    updated_at: row.updated_at ?? new Date().toISOString()
  };
}
