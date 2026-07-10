import { unstable_noStore as noStore } from "next/cache";
import type {
  AiTradeReviewRow,
  AttachmentKind,
  TradeAttachmentRow,
  TradeBehaviorRow,
  TradeInsert,
  TradeOutcome,
  TradeRow,
  TradeUpdate,
  TradeWithRelations,
  TradingSession
} from "@/lib/db/types";
import { calculateRMultiple } from "@/lib/analytics/trades";
import { sampleTrades } from "@/lib/db/sample-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { TradeInput } from "@/lib/validation/trade";
import { mistakeTagList } from "@/lib/validation/trade";

type TradeFilters = {
  pair?: string;
  session?: string;
  strategy?: string;
  outcome?: string;
  emotion?: string;
  mistake?: string;
  from?: string;
  to?: string;
};

type TradeJoinedRow = TradeRow & {
  trade_behaviors: TradeBehaviorRow[] | TradeBehaviorRow | null;
  trade_attachments: TradeAttachmentRow[] | null;
  ai_trade_reviews: AiTradeReviewRow[] | null;
};

const tradeSelect = `
  *,
  trade_behaviors (*),
  trade_attachments (*),
  ai_trade_reviews (*)
`;

export async function listTrades(userId: string, filters: TradeFilters = {}) {
  noStore();

  if (!isSupabaseConfigured()) {
    return filterDemoTrades(sampleTrades, filters);
  }

  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("trades")
    .select(tradeSelect)
    .eq("user_id", userId)
    .order("closed_at", { ascending: false, nullsFirst: false })
    .order("opened_at", { ascending: false });

  if (filters.pair) query = query.ilike("pair", `%${filters.pair}%`);
  if (filters.session) query = query.eq("session", filters.session as TradingSession);
  if (filters.strategy) query = query.ilike("strategy", `%${filters.strategy}%`);
  if (filters.outcome) query = query.eq("outcome", filters.outcome as TradeOutcome);
  if (filters.from) query = query.gte("opened_at", new Date(filters.from).toISOString());
  if (filters.to) query = query.lte("opened_at", new Date(filters.to).toISOString());

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (data as unknown as TradeJoinedRow[]).map(mapTradeRow).filter((trade) => {
    if (filters.emotion && trade.behavior?.emotion !== filters.emotion) return false;
    if (filters.mistake && !trade.behavior?.mistake_tags.includes(filters.mistake)) {
      return false;
    }
    return true;
  });
}

export async function getTradeById(userId: string, tradeId: string) {
  noStore();

  if (!isSupabaseConfigured()) {
    return sampleTrades.find((trade) => trade.id === tradeId && trade.user_id === userId) ?? null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("trades")
    .select(tradeSelect)
    .eq("user_id", userId)
    .eq("id", tradeId)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  const trade = mapTradeRow(data as unknown as TradeJoinedRow);
  trade.attachments = await withSignedAttachmentUrls(trade.attachments);
  return trade;
}

export async function createTradeRecord(
  userId: string,
  input: TradeInput,
  screenshot?: File | null
) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Demo mode is read-only.");
  }

  const supabase = await createSupabaseServerClient();
  const insert = toTradeInsert(userId, input);

  const { data: trade, error: tradeError } = await supabase
    .from("trades")
    .insert(insert)
    .select("id")
    .single();

  if (tradeError) throw new Error(tradeError.message);

  const tradeId = trade.id;
  const behavior = toBehaviorInsert(userId, tradeId, input);
  const { error: behaviorError } = await supabase
    .from("trade_behaviors")
    .insert(behavior);

  if (behaviorError) throw new Error(behaviorError.message);

  await createAttachments(userId, tradeId, input, screenshot);
  return tradeId;
}

export async function updateTradeRecord(
  userId: string,
  tradeId: string,
  input: TradeInput,
  screenshot?: File | null
) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Demo mode is read-only.");
  }

  const supabase = await createSupabaseServerClient();
  const update = toTradeUpdate(input);

  const { error: tradeError } = await supabase
    .from("trades")
    .update(update)
    .eq("user_id", userId)
    .eq("id", tradeId);

  if (tradeError) throw new Error(tradeError.message);

  const behavior = toBehaviorInsert(userId, tradeId, input);
  const { error: behaviorError } = await supabase
    .from("trade_behaviors")
    .upsert(behavior, { onConflict: "trade_id" });

  if (behaviorError) throw new Error(behaviorError.message);

  await createAttachments(userId, tradeId, input, screenshot);
  return tradeId;
}

export async function saveAiTradeReview(
  userId: string,
  tradeId: string,
  review: Pick<
    AiTradeReviewRow,
    "summary" | "structured_output" | "model" | "prompt_version" | "disclaimer"
  >
) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Demo mode is read-only.");
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("ai_trade_reviews")
    .insert({
      user_id: userId,
      trade_id: tradeId,
      ...review
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

function mapTradeRow(row: TradeJoinedRow): TradeWithRelations {
  const behaviorValue = row.trade_behaviors;
  const behavior = Array.isArray(behaviorValue)
    ? behaviorValue[0] ?? null
    : behaviorValue ?? null;

  return {
    id: row.id,
    user_id: row.user_id,
    pair: row.pair,
    direction: row.direction,
    entry_price: row.entry_price,
    exit_price: row.exit_price,
    stop_loss: row.stop_loss,
    take_profit: row.take_profit,
    lot_size: row.lot_size,
    risk_amount: row.risk_amount,
    profit_loss: row.profit_loss,
    r_multiple: row.r_multiple,
    outcome: row.outcome,
    session: row.session,
    timeframe: row.timeframe,
    strategy: row.strategy,
    setup: row.setup,
    notes: row.notes,
    opened_at: row.opened_at,
    closed_at: row.closed_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
    behavior,
    attachments: row.trade_attachments ?? [],
    aiReviews: row.ai_trade_reviews ?? []
  };
}

function toTradeInsert(userId: string, input: TradeInput): TradeInsert {
  return {
    user_id: userId,
    pair: input.pair,
    direction: input.direction,
    entry_price: input.entryPrice,
    exit_price: input.exitPrice,
    stop_loss: input.stopLoss,
    take_profit: input.takeProfit,
    lot_size: input.lotSize,
    risk_amount: input.riskAmount,
    profit_loss: input.profitLoss,
    r_multiple: calculateRMultiple(input.profitLoss, input.riskAmount),
    outcome: input.outcome,
    session: input.session,
    timeframe: input.timeframe,
    strategy: input.strategy,
    setup: emptyToNull(input.setup),
    notes: emptyToNull(input.notes),
    opened_at: new Date(input.openedAt).toISOString(),
    closed_at: input.closedAt ? new Date(input.closedAt).toISOString() : null
  };
}

function toTradeUpdate(input: TradeInput): TradeUpdate {
  const insert = toTradeInsert("unused", input);
  return {
    pair: insert.pair,
    direction: insert.direction,
    entry_price: insert.entry_price,
    exit_price: insert.exit_price,
    stop_loss: insert.stop_loss,
    take_profit: insert.take_profit,
    lot_size: insert.lot_size,
    risk_amount: insert.risk_amount,
    profit_loss: insert.profit_loss,
    r_multiple: insert.r_multiple,
    outcome: insert.outcome,
    session: insert.session,
    timeframe: insert.timeframe,
    strategy: insert.strategy,
    setup: insert.setup,
    notes: insert.notes,
    opened_at: insert.opened_at,
    closed_at: insert.closed_at
  };
}

function toBehaviorInsert(userId: string, tradeId: string, input: TradeInput) {
  return {
    user_id: userId,
    trade_id: tradeId,
    emotion: emptyToNull(input.emotion),
    confidence: input.confidence,
    rule_adherence: input.ruleAdherence,
    mistake_tags: mistakeTagList(input.mistakeTags),
    execution_rating: input.executionRating
  };
}

async function createAttachments(
  userId: string,
  tradeId: string,
  input: TradeInput,
  screenshot?: File | null
) {
  const attachmentInserts: Array<{
    user_id: string;
    trade_id: string;
    kind: AttachmentKind;
    storage_path?: string | null;
    url?: string | null;
    caption?: string | null;
  }> = [];

  const supabase = await createSupabaseServerClient();

  if (input.tradingViewUrl) {
    attachmentInserts.push({
      user_id: userId,
      trade_id: tradeId,
      kind: "tradingview",
      url: input.tradingViewUrl,
      caption: emptyToNull(input.attachmentCaption)
    });
  }

  if (screenshot && screenshot.size > 0) {
    const extension = screenshot.name.split(".").pop()?.toLowerCase() || "png";
    const storagePath = `${userId}/${tradeId}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("trade-attachments")
      .upload(storagePath, screenshot, {
        cacheControl: "3600",
        contentType: screenshot.type || "image/png"
      });

    if (uploadError) throw new Error(uploadError.message);

    attachmentInserts.push({
      user_id: userId,
      trade_id: tradeId,
      kind: "image",
      storage_path: storagePath,
      caption: emptyToNull(input.attachmentCaption)
    });
  }

  if (!attachmentInserts.length) return;

  const { error } = await supabase.from("trade_attachments").insert(attachmentInserts);
  if (error) throw new Error(error.message);
}

async function withSignedAttachmentUrls(attachments: TradeAttachmentRow[]) {
  if (!attachments.length || !isSupabaseConfigured()) return attachments;

  const supabase = await createSupabaseServerClient();
  const signed = await Promise.all(
    attachments.map(async (attachment) => {
      if (!attachment.storage_path) return attachment;
      const { data, error } = await supabase.storage
        .from("trade-attachments")
        .createSignedUrl(attachment.storage_path, 60 * 15);

      if (error || !data?.signedUrl) return attachment;
      return { ...attachment, url: data.signedUrl };
    })
  );

  return signed;
}

function filterDemoTrades(trades: TradeWithRelations[], filters: TradeFilters) {
  return trades.filter((trade) => {
    if (filters.pair && !trade.pair.toLowerCase().includes(filters.pair.toLowerCase())) {
      return false;
    }
    if (filters.session && trade.session !== filters.session) return false;
    if (
      filters.strategy &&
      !trade.strategy.toLowerCase().includes(filters.strategy.toLowerCase())
    ) {
      return false;
    }
    if (filters.outcome && trade.outcome !== filters.outcome) return false;
    if (filters.emotion && trade.behavior?.emotion !== filters.emotion) return false;
    if (filters.mistake && !trade.behavior?.mistake_tags.includes(filters.mistake)) {
      return false;
    }
    if (filters.from && new Date(trade.opened_at) < new Date(filters.from)) return false;
    if (filters.to && new Date(trade.opened_at) > new Date(filters.to)) return false;
    return true;
  });
}

function emptyToNull(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}
