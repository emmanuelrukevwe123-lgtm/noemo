import type { Candle, Direction, PairSpec, Signal, StrategyConfig, Timeframe } from "./types.js";
import { classifyCandle, lastSwing } from "./candles.js";
import { smaAt, atrAt } from "./indicators.js";
import { htfLevels, nearestLevelWithin } from "./levels.js";
import { nyMinuteOfDay } from "./time.js";

/** Candle history for one timeframe; only candles[0..closedCount) are closed. */
export interface TimeframeState {
  candles: Candle[];
  closedCount: number;
}

export interface MarketState {
  pair: PairSpec;
  entryTimeframe: Timeframe;
  /** Entry timeframe; the just-closed trigger candle is at closedCount - 1 */
  entry: TimeframeState;
  /** 15m history for the stop-loss swing rule (same as entry when trading 15m) */
  tf15m: TimeframeState;
  /** 5m history (same as entry when trading 5m), for the 5m/15m alignment rule */
  tf5m: TimeframeState;
  tf45m: TimeframeState;
  tf3h: TimeframeState;
  daily: TimeframeState;
  weekly: TimeframeState;
  monthly: TimeframeState;
  quarterly: TimeframeState;
  /** Open of the current 5pm-ET broker day; null if unknown */
  dailyOpen: number | null;
  /** Milliseconds per entry-timeframe candle (to derive the close time) */
  entryTfMs: number;
}

function biasOf(tf: TimeframeState, config: StrategyConfig): Direction | null {
  const n = tf.closedCount;
  const sma = smaAt(tf.candles, n, config.smaPeriod);
  if (sma === null || n === 0) return null;
  const close = tf.candles[n - 1].close;
  if (close > sma) return "buy";
  if (close < sma) return "sell";
  return null;
}

/**
 * "Healthy candles": among the last `healthyLookback` closed candles there is
 * at least one momentum candle in the trade direction and none against it.
 */
function healthySupport(tf: TimeframeState, direction: Direction, config: StrategyConfig): boolean {
  const n = tf.closedCount;
  if (n < config.healthyLookback) return false;
  const withDir = direction === "buy" ? "bull-momentum" : "bear-momentum";
  const against = direction === "buy" ? "bear-momentum" : "bull-momentum";
  let supporting = 0;
  for (let i = n - config.healthyLookback; i < n; i++) {
    const type = classifyCandle(tf.candles[i], config);
    if (type === withDir) supporting++;
    if (type === against) return false;
  }
  return config.healthyRequireSupport ? supporting >= 1 : true;
}

export type RejectStage =
  | "session"
  | "mwd-bias"
  | "3h-bias"
  | "45m-bias"
  | "3h-healthy"
  | "45m-healthy"
  | "entry-sma"
  | "entry-align"
  | "daily-open"
  | "trigger-candle"
  | "decision-point"
  | "no-swing";

/**
 * The strategy, as a pure function: given the market state at an entry-candle
 * close, return a Signal or null. Same code path for backtests and live use.
 * `onReject` (optional) reports which rule filtered the candle out, for
 * diagnostics — it never changes behavior.
 */
export function evaluate(
  state: MarketState,
  config: StrategyConfig,
  onReject?: (stage: RejectStage) => void
): Signal | null {
  const reject = (stage: RejectStage): null => {
    onReject?.(stage);
    return null;
  };
  const { entry, pair } = state;
  const n = entry.closedCount;
  if (n === 0) return null;
  const trigger = entry.candles[n - 1];
  const closeTime = trigger.time + state.entryTfMs;

  // 1. Session filter: the trigger candle must sit inside the NY window.
  const openMin = nyMinuteOfDay(trigger.time);
  const closeMin = nyMinuteOfDay(closeTime - 1) + 1;
  if (openMin < config.sessionStartMin || closeMin > config.sessionEndMin || closeMin <= openMin) {
    return reject("session");
  }

  // 2. Long-term bias: Weekly and Daily 20 SMA must agree; the Monthly must
  //    also align when requireMonthlyAlignment is set (the v1 default).
  const monthlyBias = biasOf(state.monthly, config);
  const weeklyBias = biasOf(state.weekly, config);
  const dailyBias = biasOf(state.daily, config);
  if (!weeklyBias || weeklyBias !== dailyBias) return reject("mwd-bias");
  if (config.requireMonthlyAlignment && monthlyBias !== weeklyBias) return reject("mwd-bias");
  const direction = weeklyBias;
  const isBuy = direction === "buy";

  // 3. Intermediate confirmation: 3h and 45m follow the same 20 SMA rule
  //    and show healthy candles supporting the direction.
  if (biasOf(state.tf3h, config) !== direction) return reject("3h-bias");
  if (biasOf(state.tf45m, config) !== direction) return reject("45m-bias");
  if (!healthySupport(state.tf3h, direction, config)) return reject("3h-healthy");
  if (!healthySupport(state.tf45m, direction, config)) return reject("45m-healthy");

  // 4. Entry-timeframe 20 SMA: price on the correct side.
  const entrySma = smaAt(entry.candles, n, config.smaPeriod);
  if (entrySma === null) return reject("entry-sma");
  if (isBuy ? trigger.close <= entrySma : trigger.close >= entrySma) return reject("entry-sma");

  // 4b. Optional strict execution alignment: both the 5m and 15m must sit on
  //     the correct side of their own 20 SMAs, whichever one is the entry chart.
  if (config.requireEntryTfAlignment) {
    if (biasOf(state.tf15m, config) !== direction) return reject("entry-align");
    if (biasOf(state.tf5m, config) !== direction) return reject("entry-align");
  }

  // 5. Daily open (5pm ET broker day): above for buys, below for sells.
  //    A retest that closes back on the right side still qualifies.
  if (state.dailyOpen === null) return reject("daily-open");
  if (isBuy ? trigger.close <= state.dailyOpen : trigger.close >= state.dailyOpen) return reject("daily-open");

  // 6. Trigger candle: momentum in the direction, or a rejection whose
  //    dominant wick points away from the trade direction.
  const type = classifyCandle(trigger, config);
  const isTriggerType = isBuy
    ? type === "bull-momentum" || type === "rejection-down"
    : type === "bear-momentum" || type === "rejection-up";
  if (!isTriggerType) return reject("trigger-candle");

  // 7. The trigger must form at a decision point: the entry 20 SMA, the daily
  //    open, or a HTF level (within 0.25 x daily ATR14 of the close, or touched).
  const reasons: string[] = [
    `${direction === "buy" ? "bullish" : "bearish"} M/W/D bias`,
    `3h & 45m aligned with healthy candles`,
    type
  ];
  const touches = (price: number) => trigger.low <= price && price <= trigger.high;
  let atDecisionPoint = false;
  if (touches(entrySma)) {
    atDecisionPoint = true;
    reasons.push(`at ${state.entryTimeframe} 20 SMA`);
  }
  if (touches(state.dailyOpen)) {
    atDecisionPoint = true;
    reasons.push("at daily open");
  }
  const prevMonth = state.monthly.closedCount > 0 ? state.monthly.candles[state.monthly.closedCount - 1] : null;
  const prevQuarter =
    state.quarterly.closedCount > 0 ? state.quarterly.candles[state.quarterly.closedCount - 1] : null;
  const dailyAtr = atrAt(state.daily.candles, state.daily.closedCount, config.atrPeriod);
  if (dailyAtr !== null) {
    const levels = htfLevels(prevMonth, prevQuarter);
    const tolerance = config.levelAtrTolerance * dailyAtr;
    const level =
      nearestLevelWithin(levels, trigger.close, tolerance) ??
      levels.find((l) => touches(l.price)) ??
      null;
    if (level) {
      atDecisionPoint = true;
      reasons.push(`at ${level.label} (${level.price})`);
    }
  }
  if (!atDecisionPoint) return reject("decision-point");

  // 8. Stop loss: 5 pips beyond the most recent confirmed 15m swing point.
  const swing = lastSwing(
    state.tf15m.candles,
    state.tf15m.closedCount,
    isBuy ? "low" : "high",
    config.swingLookaround
  );
  if (swing === null) return reject("no-swing");
  const buffer = config.slBufferPips * pair.pipSize;
  // Charge the spread against the trade in both directions (conservative).
  const entryPrice = isBuy ? trigger.close + pair.spread : trigger.close - pair.spread;
  const stopLoss = isBuy ? swing - buffer : swing + buffer;
  const risk = isBuy ? entryPrice - stopLoss : stopLoss - entryPrice;
  if (risk <= 0) return reject("no-swing");
  const takeProfit = isBuy ? entryPrice + config.tpR * risk : entryPrice - config.tpR * risk;

  return {
    pair: pair.pair,
    direction,
    time: closeTime,
    entryTimeframe: state.entryTimeframe,
    entry: entryPrice,
    stopLoss,
    takeProfit,
    risk,
    reasons
  };
}
