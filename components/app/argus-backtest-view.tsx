"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { cn } from "@/lib/utils";
import {
  ARGUS_BACKTEST_DATA,
  ARGUS_PAIRS,
  ARGUS_TIMEFRAMES,
  type ArgusBacktestTrade,
  type ArgusPair,
  type ArgusPeriod,
  type ArgusTimeframe
} from "@/lib/argus/backtest-data";

type EnrichedTrade = ArgusBacktestTrade & {
  index: number;
  resultR: number;
  cumR: number;
};

type BacktestStats = {
  signals: number;
  wins: number;
  losses: number;
  open: number;
  winRate: number;
  netR: number;
  avgR: number;
  profitFactor: number;
  maxDrawdownR: number;
  first: number | null;
  last: number | null;
};

const TP_R = 2;
const YTD_FROM = ARGUS_BACKTEST_DATA.periods.ytdFrom;
const YTD_TO = ARGUS_BACKTEST_DATA.periods.ytdTo;

const axisTick = {
  fill: "#6b6b70",
  fontSize: 12,
  fontFamily: "var(--font-mono)"
};

const tooltipStyle = {
  background: "#0f0f10",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 10,
  color: "#e4e4e6",
  fontSize: 13
};

const nyDateTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric"
});

export function ArgusBacktestView() {
  const [pair, setPair] = useState<ArgusPair>("XAUUSD");
  const [timeframe, setTimeframe] = useState<ArgusTimeframe>("15m");
  const [period, setPeriod] = useState<ArgusPeriod>("full");

  const trades = useMemo(() => {
    const raw = ARGUS_BACKTEST_DATA.pairs[pair][timeframe];
    const scoped =
      period === "ytd"
        ? raw.filter(
            (trade) =>
              trade.signal.time >= YTD_FROM && trade.signal.time < YTD_TO
          )
        : raw;
    return enrichTrades(scoped);
  }, [pair, period, timeframe]);

  const stats = useMemo(() => summarize(trades), [trades]);
  const runRows = useMemo(
    () =>
      ARGUS_PAIRS.flatMap((rowPair) =>
        ARGUS_TIMEFRAMES.map((rowTimeframe) => {
          const raw = ARGUS_BACKTEST_DATA.pairs[rowPair][rowTimeframe];
          const scoped =
            period === "ytd"
              ? raw.filter(
                  (trade) =>
                    trade.signal.time >= YTD_FROM && trade.signal.time < YTD_TO
                )
              : raw;
          return {
            pair: rowPair,
            timeframe: rowTimeframe,
            stats: summarize(enrichTrades(scoped))
          };
        })
      ),
    [period]
  );

  const equityData = useMemo(
    () => [
      { name: "0", signal: 0, cumR: 0, outcome: "start" },
      ...trades.map((trade) => ({
        name: String(trade.index),
        signal: trade.index,
        cumR: trade.cumR,
        outcome: trade.outcome
      }))
    ],
    [trades]
  );

  const range = formatRange(stats, period);

  return (
    <div className="noemo-fade grid gap-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="mb-4 font-mono text-xs tracking-[0.28em] text-[#6b6b70]">
            ARGUS BACKTEST
          </div>
          <h1 className="font-display text-[clamp(34px,5vw,56px)] font-semibold leading-none tracking-[-0.02em]">
            Strategy Replay
          </h1>
          <p className="mt-4 max-w-[72ch] text-[15px] font-light leading-relaxed text-[#9a9a9e]">
            {pair} {timeframe} entries over {range}. Conservative fills, 2R
            target, one open signal at a time.
          </p>
        </div>

        <div className="grid gap-2 sm:flex sm:flex-wrap sm:justify-end">
          <SegmentedControl
            label="Pair"
            items={ARGUS_PAIRS}
            value={pair}
            onChange={setPair}
          />
          <SegmentedControl
            label="Entry timeframe"
            items={ARGUS_TIMEFRAMES}
            value={timeframe}
            onChange={setTimeframe}
            formatter={(item) => `${item} entries`}
          />
          <SegmentedControl
            label="Period"
            items={["full", "ytd"] as const}
            value={period}
            onChange={setPeriod}
            formatter={(item) => (item === "full" ? "Full history" : "2026 YTD")}
          />
        </div>
      </div>

      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
        <MetricCard
          label="Signals"
          value={String(stats.signals)}
          helper={`${stats.wins} wins / ${stats.losses} losses`}
        />
        <MetricCard
          label="Win rate"
          value={`${(stats.winRate * 100).toFixed(1)}%`}
          helper="Breakeven 33.3%"
          tone={stats.winRate >= 1 / 3 ? "positive" : "negative"}
        />
        <MetricCard
          label="Net result"
          value={formatR(stats.netR)}
          helper="Risk-normalized"
          tone={stats.netR >= 0 ? "positive" : "negative"}
        />
        <MetricCard
          label="Profit factor"
          value={
            Number.isFinite(stats.profitFactor)
              ? stats.profitFactor.toFixed(2)
              : "inf"
          }
          helper="Gross win / loss"
        />
        <MetricCard
          label="Max drawdown"
          value={`${stats.maxDrawdownR.toFixed(1)}R`}
          helper="Peak-to-trough"
        />
        <MetricCard
          label="Avg signal"
          value={formatR(stats.avgR)}
          helper={`${stats.open} open signals`}
          tone={stats.avgR >= 0 ? "positive" : "negative"}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
        <section className="rounded-2xl border border-white/[0.08] bg-surface px-5 pb-5 pt-[22px] sm:px-6">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div className="font-display text-[18px] font-medium">Equity Curve</div>
            <div className="font-mono text-[12px] text-[#6b6b70]">
              CUMULATIVE R
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={equityData} margin={{ top: 8, right: 14, left: 4, bottom: 8 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="signal"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={26}
                />
                <YAxis
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={46}
                  tickFormatter={(value) => formatR(Number(value))}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: "#8a8a8f" }}
                  cursor={{ stroke: "rgba(255,255,255,0.12)" }}
                  formatter={(value) => [formatR(Number(value)), "Cumulative"]}
                  labelFormatter={(label) =>
                    Number(label) === 0 ? "Start" : `Signal #${label}`
                  }
                />
                <Line
                  type="monotone"
                  dataKey="cumR"
                  stroke="#e8e8e6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#f4f4f2" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-surface px-5 pb-5 pt-[22px] sm:px-6">
          <div className="mb-5 flex items-baseline justify-between">
            <div className="font-display text-[18px] font-medium">Runs</div>
            <div className="font-mono text-[12px] text-[#6b6b70]">
              {period === "full" ? "FULL" : "2026 YTD"}
            </div>
          </div>
          <div className="overflow-x-auto noemo-scrollbar">
            <table className="w-full min-w-[420px] border-collapse">
              <thead>
                <tr className="border-y border-white/[0.07]">
                  <th className={thClass}>Run</th>
                  <th className={cn(thClass, "text-right")}>Signals</th>
                  <th className={cn(thClass, "text-right")}>Win</th>
                  <th className={cn(thClass, "text-right")}>Net</th>
                </tr>
              </thead>
              <tbody>
                {runRows.map((row) => {
                  const active = row.pair === pair && row.timeframe === timeframe;
                  return (
                    <tr
                      key={`${row.pair}-${row.timeframe}`}
                      className={cn(
                        "border-b border-white/[0.05] last:border-0",
                        active && "bg-white/[0.035]"
                      )}
                    >
                      <td className={tdClass}>
                        <button
                          type="button"
                          onClick={() => {
                            setPair(row.pair);
                            setTimeframe(row.timeframe);
                          }}
                          className="text-left font-mono text-[12.5px] text-[#d8d8da] hover:text-white"
                        >
                          {row.pair} {row.timeframe}
                        </button>
                      </td>
                      <td className={cn(tdClass, "text-right font-mono")}>
                        {row.stats.signals}
                      </td>
                      <td className={cn(tdClass, "text-right font-mono")}>
                        {(row.stats.winRate * 100).toFixed(1)}%
                      </td>
                      <td
                        className={cn(
                          tdClass,
                          "text-right font-mono",
                          resultTone(row.stats.netR)
                        )}
                      >
                        {formatR(row.stats.netR)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-white/[0.08] bg-surface">
        <div className="flex flex-col gap-2 px-5 pb-4 pt-5 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
          <div>
            <div className="font-display text-[18px] font-medium">Trade Ledger</div>
            <div className="mt-1 text-[13px] font-light text-[#77777b]">
              {trades.length} signals, oldest first.
            </div>
          </div>
          <div className="font-mono text-[12px] text-[#6b6b70]">
            {pair} / {timeframe} / {period === "full" ? "FULL" : "2026 YTD"}
          </div>
        </div>
        <div className="overflow-x-auto noemo-scrollbar">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-y border-white/[0.07]">
                <th className={cn(thClass, "text-right")}>#</th>
                <th className={thClass}>Signal time (NY)</th>
                <th className={thClass}>Dir</th>
                <th className={cn(thClass, "text-right")}>Entry</th>
                <th className={cn(thClass, "text-right")}>Stop</th>
                <th className={cn(thClass, "text-right")}>Target</th>
                <th className={thClass}>Outcome</th>
                <th className={cn(thClass, "text-right")}>Cum R</th>
                <th className={thClass}>Confluences</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr
                  key={`${trade.signal.time}-${trade.index}`}
                  className="border-b border-white/[0.05] last:border-0"
                >
                  <td className={cn(tdClass, "text-right font-mono text-[#77777b]")}>
                    {trade.index}
                  </td>
                  <td className={cn(tdClass, "font-mono text-[#a9a9ae]")}>
                    {nyDateTime.format(new Date(trade.signal.time))}
                  </td>
                  <td className={tdClass}>
                    <span
                      className={cn(
                        "inline-flex min-w-[48px] justify-center rounded-md border px-2 py-1 font-mono text-[11px]",
                        trade.signal.direction === "buy"
                          ? "border-white/14 bg-white/[0.06] text-[#ededed]"
                          : "border-white/10 bg-[#151518] text-[#a9a9ae]"
                      )}
                    >
                      {trade.signal.direction.toUpperCase()}
                    </span>
                  </td>
                  <td className={cn(tdClass, "text-right font-mono")}>
                    {formatPrice(pair, trade.signal.entry)}
                  </td>
                  <td className={cn(tdClass, "text-right font-mono")}>
                    {formatPrice(pair, trade.signal.stopLoss)}
                  </td>
                  <td className={cn(tdClass, "text-right font-mono")}>
                    {formatPrice(pair, trade.signal.takeProfit)}
                  </td>
                  <td className={tdClass}>
                    <OutcomePill outcome={trade.outcome} />
                  </td>
                  <td
                    className={cn(
                      tdClass,
                      "text-right font-mono",
                      resultTone(trade.cumR)
                    )}
                  >
                    {formatR(trade.cumR)}
                  </td>
                  <td className={cn(tdClass, "max-w-[420px] text-[#9a9a9e]")}>
                    {trade.signal.reasons.join(" | ")}
                  </td>
                </tr>
              ))}
              {trades.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-10 text-center text-[13px] font-light text-[#6b6b70]"
                  >
                    No signals in this period.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <p className="max-w-[86ch] text-[12.5px] font-light leading-relaxed text-[#55555a]">
        Simulation rules: spread charged on entry; a 1-minute candle touching both
        stop and target counts as a loss; session window 08:30-12:00 New York.
        Data source: Dukascopy 1-minute bid candles. Past performance does not
        guarantee future results.
      </p>
    </div>
  );
}

function SegmentedControl<T extends string>({
  label,
  items,
  value,
  onChange,
  formatter = (item) => item
}: {
  label: string;
  items: readonly T[];
  value: T;
  onChange: (value: T) => void;
  formatter?: (value: T) => string;
}) {
  return (
    <div>
      <div className="sr-only">{label}</div>
      <div className="inline-flex w-full overflow-hidden rounded-xl border border-white/[0.1] bg-[#0f0f10] p-1 sm:w-auto">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={item === value}
            onClick={() => onChange(item)}
            className={cn(
              "min-h-9 flex-1 whitespace-nowrap rounded-lg px-3.5 py-2 text-center text-[13px] font-medium transition sm:flex-none",
              item === value
                ? "bg-white/[0.1] text-[#f4f4f2]"
                : "text-[#77777b] hover:text-[#e4e4e6]"
            )}
          >
            {formatter(item)}
          </button>
        ))}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  helper,
  tone = "neutral"
}: {
  label: string;
  value: string;
  helper: string;
  tone?: "neutral" | "positive" | "negative";
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-surface px-5 py-4">
      <div className="text-[11px] uppercase tracking-[0.08em] text-[#77777b]">
        {label}
      </div>
      <div
        className={cn(
          "mt-3 font-mono text-[26px] font-semibold tracking-tight",
          tone === "positive" && "text-[#f4f4f2]",
          tone === "negative" && "text-[#9a9a9e]"
        )}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[12.5px] leading-5 text-[#6b6b70]">
        {helper}
      </div>
    </div>
  );
}

function OutcomePill({ outcome }: { outcome: ArgusBacktestTrade["outcome"] }) {
  const label =
    outcome === "win" ? "win +2R" : outcome === "loss" ? "loss -1R" : "open";

  return (
    <span
      className={cn(
        "inline-flex min-w-[72px] justify-center rounded-md border px-2 py-1 font-mono text-[11px]",
        outcome === "win" && "border-white/14 bg-white/[0.07] text-[#f4f4f2]",
        outcome === "loss" && "border-white/10 bg-[#151518] text-[#8a8a8f]",
        outcome === "open" && "border-white/10 text-[#77777b]"
      )}
    >
      {label}
    </span>
  );
}

function enrichTrades(trades: readonly ArgusBacktestTrade[]): EnrichedTrade[] {
  let cumulative = 0;
  return trades.map((trade, index) => {
    const resultR = trade.outcome === "win" ? TP_R : trade.outcome === "loss" ? -1 : 0;
    cumulative += resultR;
    return {
      ...trade,
      index: index + 1,
      resultR,
      cumR: cumulative
    };
  });
}

function summarize(trades: readonly EnrichedTrade[]): BacktestStats {
  const closed = trades.filter((trade) => trade.outcome !== "open");
  const wins = closed.filter((trade) => trade.outcome === "win").length;
  const losses = closed.filter((trade) => trade.outcome === "loss").length;
  let cumulative = 0;
  let peak = 0;
  let maxDrawdownR = 0;

  for (const trade of closed) {
    cumulative += trade.resultR;
    peak = Math.max(peak, cumulative);
    maxDrawdownR = Math.max(maxDrawdownR, peak - cumulative);
  }

  const netR = wins * TP_R - losses;

  return {
    signals: trades.length,
    wins,
    losses,
    open: trades.length - closed.length,
    winRate: closed.length > 0 ? wins / closed.length : 0,
    netR,
    avgR: closed.length > 0 ? netR / closed.length : 0,
    profitFactor: losses > 0 ? (wins * TP_R) / losses : Infinity,
    maxDrawdownR,
    first: trades[0]?.signal.time ?? null,
    last: trades[trades.length - 1]?.signal.time ?? null
  };
}

function formatRange(stats: BacktestStats, period: ArgusPeriod) {
  if (period === "ytd") return "Jan 1-Jul 6, 2026";
  if (!stats.first || !stats.last) return "no signal history";
  return `${monthYear.format(new Date(stats.first))}-${monthYear.format(
    new Date(stats.last)
  )}`;
}

function formatR(value: number) {
  if (!Number.isFinite(value)) return "inf";
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}R`;
}

function formatPrice(pair: ArgusPair, value: number) {
  return value.toFixed(ARGUS_BACKTEST_DATA.decimals[pair]);
}

function resultTone(value: number) {
  if (value > 0) return "text-[#f4f4f2]";
  if (value < 0) return "text-[#8a8a8f]";
  return "text-[#c4c4c8]";
}

const thClass =
  "px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-[#6b6b70]";
const tdClass = "px-4 py-3.5 text-[13px]";
