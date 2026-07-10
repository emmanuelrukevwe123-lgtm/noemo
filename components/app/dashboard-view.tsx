import Link from "next/link";
import type { TradeWithRelations } from "@/lib/db/types";
import {
  normalizedR,
  summarizeTrades,
  type BreakdownItem
} from "@/lib/analytics/trades";
import { cn, formatCurrency, formatDate, formatR, pnlToneClass } from "@/lib/utils";
import { StatCard } from "@/components/app/stat-card";
import { PerformanceCharts } from "@/components/app/performance-charts";

const sessionLabels: Record<string, string> = {
  asia: "Asia",
  london: "London",
  new_york: "New York",
  overlap: "Overlap",
  other: "Other"
};

export function DashboardView({ trades }: { trades: TradeWithRelations[] }) {
  const analytics = summarizeTrades(trades);
  const dates = trades
    .map((trade) => trade.closed_at ?? trade.opened_at)
    .filter(Boolean)
    .sort();
  const dateRange = dates.length
    ? `${formatDate(dates[0])}  —  ${formatDate(dates[dates.length - 1])}`
    : "No trades logged yet";
  const recent = trades.slice(0, 6);

  return (
    <div className="noemo-fade grid gap-4">
      <div className="mb-2">
        <h1 className="font-display text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em]">
          Dashboard
        </h1>
        <div className="mt-2 font-mono text-[12.5px] text-[#6b6b70]">{dateRange}</div>
      </div>

      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
        <StatCard label="Net P/L" value={formatCurrency(analytics.netProfitLoss)} />
        <StatCard label="Win rate" value={`${Math.round(analytics.winRate)}%`} />
        <StatCard label="Expectancy" value={formatR(analytics.expectancyR)} />
        <StatCard label="Avg R" value={formatR(analytics.averageR)} />
        <StatCard
          label="Max drawdown"
          value={formatCurrency(analytics.maxDrawdown)}
          tone="red"
        />
      </div>

      <PerformanceCharts analytics={analytics} />

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
        <BreakdownCard
          title="By pair"
          rows={toValueRows(analytics.pairBreakdown)}
        />
        <BreakdownCard
          title="By emotion"
          rows={toValueRows(analytics.emotionBreakdown)}
        />
      </div>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
        <BreakdownCard
          title="By mistake tag"
          mono
          rows={toMistakeRows(analytics.mistakeBreakdown)}
          empty="No mistakes tagged. Clean record."
        />
        <div className="rounded-2xl border border-white/[0.08] bg-surface">
          <div className="flex items-center justify-between px-6 pb-4 pt-5">
            <div className="font-display text-[17px] font-medium">Recent trades</div>
            <Link
              href="/app/trades"
              className="font-mono text-[13px] text-[#9a9a9e] hover:text-ink"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto noemo-scrollbar">
            <table className="w-full min-w-[420px] border-collapse">
              <thead>
                <tr className="border-y border-white/[0.07]">
                  <th className={thClass}>Date</th>
                  <th className={thClass}>Pair</th>
                  <th className={cn(thClass, "text-right")}>R</th>
                  <th className={cn(thClass, "text-right")}>P/L</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((trade) => (
                  <tr
                    key={trade.id}
                    className="border-b border-white/[0.05] last:border-0"
                  >
                    <td className={tdClass}>
                      <span className="font-mono text-[#9a9a9e]">
                        {formatDate(trade.closed_at ?? trade.opened_at)}
                      </span>
                    </td>
                    <td className={tdClass}>
                      <Link
                        href={`/app/trades/${trade.id}`}
                        className="font-medium hover:underline"
                      >
                        {trade.pair}
                      </Link>{" "}
                      <span className="font-mono text-[11px] text-[#6b6b70]">
                        {trade.direction === "long" ? "▲" : "▼"}
                      </span>
                    </td>
                    <td className={cn(tdClass, "text-right font-mono", pnlToneClass(trade.outcome))}>
                      {trade.outcome === "open" ? "—" : formatR(normalizedR(trade))}
                    </td>
                    <td className={cn(tdClass, "text-right font-mono", pnlToneClass(trade.outcome))}>
                      {trade.outcome === "open"
                        ? "—"
                        : formatCurrency(trade.profit_loss)}
                    </td>
                  </tr>
                ))}
                {recent.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-[13px] font-light text-[#6b6b70]"
                    >
                      No trades logged yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const thClass =
  "px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-[#6b6b70]";
const tdClass = "px-4 py-3.5 text-[13.5px]";

type ValueRow = {
  label: string;
  valueStr: string;
  widthPct: string;
  positive: boolean;
};

function toValueRows(items: BreakdownItem[]): ValueRow[] {
  const top = items.slice(0, 6);
  const max = Math.max(1, ...top.map((item) => Math.abs(item.netProfitLoss)));
  return top.map((item) => ({
    label: item.label,
    valueStr: formatCurrency(item.netProfitLoss),
    widthPct: `${Math.round((Math.abs(item.netProfitLoss) / max) * 100)}%`,
    positive: item.netProfitLoss >= 0
  }));
}

function toMistakeRows(
  items: { tag: string; trades: number }[]
): ValueRow[] {
  const top = items.filter((item) => item.tag !== "none").slice(0, 6);
  const max = Math.max(1, ...top.map((item) => item.trades));
  return top.map((item) => ({
    label: sessionLabels[item.tag] ?? item.tag,
    valueStr: `${item.trades} ${item.trades === 1 ? "trade" : "trades"}`,
    widthPct: `${Math.round((item.trades / max) * 100)}%`,
    positive: false
  }));
}

function BreakdownCard({
  title,
  rows,
  mono,
  empty
}: {
  title: string;
  rows: ValueRow[];
  mono?: boolean;
  empty?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-surface px-6 pb-6 pt-[22px]">
      <div className="mb-5 font-display text-[17px] font-medium">{title}</div>
      {rows.length === 0 ? (
        <div className="text-[13.5px] font-light text-[#6b6b70]">
          {empty ?? "Nothing to show yet."}
        </div>
      ) : (
        rows.map((row) => (
          <div key={row.label} className="mb-4 last:mb-0">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span
                className={cn(
                  "text-[13.5px] text-[#d4d4d6]",
                  mono && "font-mono text-[13px]"
                )}
              >
                {sessionLabels[row.label] ?? row.label}
              </span>
              <span
                className={cn(
                  "font-mono text-[12.5px]",
                  row.positive ? "text-[#e4e4e6]" : "text-[#8a8a8f]"
                )}
              >
                {row.valueStr}
              </span>
            </div>
            <div className="h-[5px] overflow-hidden rounded-[3px] bg-white/[0.05]">
              <div
                className="h-full rounded-[3px]"
                style={{
                  width: row.widthPct,
                  background: row.positive ? "#e8e8e6" : "#4e4e52"
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
