export interface Candle {
  /** Open time, epoch ms UTC */
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

/** Aggregated candle carrying its monotonic bucket key for closed-candle bookkeeping. */
export interface TFCandle extends Candle {
  key: number;
}

export type Timeframe = "5m" | "15m" | "45m" | "3h" | "1d" | "1w" | "1M" | "3M";

export type PairId = "XAUUSD" | "GBPAUD" | "GBPUSD" | "EURUSD";

export type Direction = "buy" | "sell";

export type CandleType = "bull-momentum" | "bear-momentum" | "doji" | "rejection-up" | "rejection-down" | "neutral";

export interface PairSpec {
  pair: PairId;
  /** Price value of one pip (XAUUSD: 0.1, GBPAUD: 0.0001) */
  pipSize: number;
  /** Typical spread in price units, charged on entry to keep the backtest honest */
  spread: number;
}

export const PAIRS: Record<PairId, PairSpec> = {
  XAUUSD: { pair: "XAUUSD", pipSize: 0.1, spread: 0.3 },
  GBPAUD: { pair: "GBPAUD", pipSize: 0.0001, spread: 0.00025 },
  GBPUSD: { pair: "GBPUSD", pipSize: 0.0001, spread: 0.00012 },
  EURUSD: { pair: "EURUSD", pipSize: 0.0001, spread: 0.0001 }
};

export interface StrategyConfig {
  /** Body >= this fraction of range => momentum candle */
  momentumBodyRatio: number;
  /** Body <= this fraction of range => doji */
  dojiBodyRatio: number;
  /** "At a HTF level" = within this fraction of daily ATR(14) */
  levelAtrTolerance: number;
  /** Candles on each side that a swing point must dominate */
  swingLookaround: number;
  /** Closed 3h/45m candles inspected for "healthy" directional support */
  healthyLookback: number;
  /** Session window, minutes after midnight America/New_York */
  sessionStartMin: number;
  sessionEndMin: number;
  /** Stop-loss buffer beyond the swing point, in pips */
  slBufferPips: number;
  /** Take profit as a multiple of risk */
  tpR: number;
  smaPeriod: number;
  atrPeriod: number;
  /** If true (v1 default), the Monthly must align with Weekly+Daily; if false, Weekly+Daily agreement is enough */
  requireMonthlyAlignment: boolean;
  /** If true (v1 default), 3h/45m need a momentum candle in the direction; if false, only "no momentum against" */
  healthyRequireSupport: boolean;
  /** If true, both the 5m and 15m must be on the correct side of their 20 SMAs (not just the entry timeframe) */
  requireEntryTfAlignment: boolean;
  /** Move the stop to entry once price reaches this R multiple in favor (null = off) */
  beTriggerR: number | null;
  /** Start trailing the stop once price reaches this R multiple in favor (null = off) */
  trailStartR: number | null;
  /** Trailing distance behind the favorable extreme, in R multiples */
  trailDistanceR: number;
  /** Take a partial profit at this R multiple and move the stop to entry (null = off) */
  partialR: number | null;
  /** Fraction of the position closed at the partial target */
  partialFraction: number;
}

export const DEFAULT_CONFIG: StrategyConfig = {
  momentumBodyRatio: 0.7,
  dojiBodyRatio: 0.1,
  levelAtrTolerance: 0.25,
  swingLookaround: 2,
  healthyLookback: 3,
  sessionStartMin: 8 * 60 + 30,
  sessionEndMin: 12 * 60,
  slBufferPips: 5,
  tpR: 3,
  smaPeriod: 20,
  atrPeriod: 14,
  requireMonthlyAlignment: true,
  // v1.1: "healthy" = no momentum candle against the direction. Requiring a
  // supporting momentum candle too (v1.0) cut signals 4x for the same quality.
  healthyRequireSupport: false,
  requireEntryTfAlignment: false,
  // v1.2 exit model (2026-07-08): 3R TP with a 1.5R trailing stop armed at
  // +1.5R. Only model of 11 that beat fixed 2R in- AND out-of-sample on both
  // XAUUSD streams (see docs/STRATEGY_SPEC.md §8b). v1.1 fixed-2R behavior:
  // tpR: 2, trailStartR: null.
  beTriggerR: null,
  trailStartR: 1.5,
  trailDistanceR: 1.5,
  partialR: null,
  partialFraction: 0.5
};

export interface Signal {
  pair: PairId;
  direction: Direction;
  /** Close time of the trigger candle, epoch ms UTC */
  time: number;
  entryTimeframe: Timeframe;
  entry: number;
  stopLoss: number;
  takeProfit: number;
  /** Risk in price units (entry to stop distance) */
  risk: number;
  /** Human-readable confluences that produced the signal */
  reasons: string[];
}
