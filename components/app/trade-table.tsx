import Link from "next/link";
import type { TradeWithRelations } from "@/lib/db/types";
import { normalizedR } from "@/lib/analytics/trades";
import { Input, Label, Select } from "@/components/ui/field";
import {
  cn,
  formatCurrency,
  formatDate,
  formatR,
  markColor,
  outcomeBadgeClass,
  outcomeLabel,
  pnlToneClass
} from "@/lib/utils";

const sessionLabels: Record<string, string> = {
  asia: "Asia",
  london: "London",
  new_york: "New York",
  overlap: "Overlap",
  other: "Other"
};

export function TradeFilters({
  searchParams
}: {
  searchParams: Record<string, string | undefined>;
}) {
  return (
    <form className="grid items-end gap-3 rounded-2xl border border-white/[0.08] bg-surface p-5 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
      <div>
        <Label htmlFor="pair">Pair</Label>
        <Input
          id="pair"
          name="pair"
          placeholder="All"
          defaultValue={searchParams.pair ?? ""}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="strategy">Strategy</Label>
        <Input
          id="strategy"
          name="strategy"
          placeholder="All"
          defaultValue={searchParams.strategy ?? ""}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="session">Session</Label>
        <Select
          id="session"
          name="session"
          defaultValue={searchParams.session ?? ""}
          className="mt-1.5"
        >
          <option value="">All</option>
          <option value="london">London</option>
          <option value="new_york">New York</option>
          <option value="asia">Asia</option>
          <option value="overlap">Overlap</option>
          <option value="other">Other</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="outcome">Outcome</Label>
        <Select
          id="outcome"
          name="outcome"
          defaultValue={searchParams.outcome ?? ""}
          className="mt-1.5"
        >
          <option value="">All</option>
          <option value="win">Win</option>
          <option value="loss">Loss</option>
          <option value="breakeven">Breakeven</option>
          <option value="open">Open</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="emotion">Emotion</Label>
        <Input
          id="emotion"
          name="emotion"
          placeholder="All"
          defaultValue={searchParams.emotion ?? ""}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="mistake">Mistake tag</Label>
        <Input
          id="mistake"
          name="mistake"
          placeholder="All"
          defaultValue={searchParams.mistake ?? ""}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="from">From</Label>
        <Input
          id="from"
          name="from"
          type="date"
          defaultValue={searchParams.from ?? ""}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="to">To</Label>
        <Input
          id="to"
          name="to"
          type="date"
          defaultValue={searchParams.to ?? ""}
          className="mt-1.5"
        />
      </div>
      <div className="flex items-end gap-2">
        <button className="h-11 flex-1 rounded-[9px] bg-[#f4f4f2] px-4 text-[13px] font-semibold text-[#0b0b0c]">
          Filter
        </button>
        <Link
          href="/app/trades"
          className="flex h-11 flex-1 items-center justify-center rounded-[9px] border border-white/14 px-4 text-[13px] text-[#9a9a9e] hover:text-ink"
        >
          Reset
        </Link>
      </div>
    </form>
  );
}

const thClass =
  "px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-[#6b6b70]";
const tdClass = "px-4 py-3.5 text-[13.5px]";

export function TradeTable({ trades }: { trades: TradeWithRelations[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-surface">
      <div className="overflow-x-auto noemo-scrollbar">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-white/[0.07]">
              <th className={thClass} />
              <th className={thClass}>Date</th>
              <th className={thClass}>Pair</th>
              <th className={thClass}>Dir</th>
              <th className={thClass}>Session</th>
              <th className={thClass}>Strategy</th>
              <th className={thClass}>Emotion</th>
              <th className={cn(thClass, "text-right")}>R</th>
              <th className={cn(thClass, "text-right")}>P/L</th>
              <th className={cn(thClass, "text-right")}>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-b border-white/[0.05] transition last:border-0 hover:bg-white/[0.02]"
              >
                <td className="w-1.5 py-3.5 pl-4">
                  <span
                    className="inline-block h-[22px] w-[3px] rounded-[2px] align-middle"
                    style={{ background: markColor(trade.outcome) }}
                  />
                </td>
                <td className={tdClass}>
                  <Link href={`/app/trades/${trade.id}`} className="font-mono text-[#9a9a9e] hover:text-ink">
                    {formatDate(trade.closed_at ?? trade.opened_at)}
                  </Link>
                </td>
                <td className={tdClass}>
                  <Link href={`/app/trades/${trade.id}`} className="font-medium hover:underline">
                    {trade.pair}
                  </Link>
                </td>
                <td className={cn(tdClass, "font-mono text-[11.5px] text-[#8a8a8f]")}>
                  {trade.direction === "long" ? "Long" : "Short"}
                </td>
                <td className={cn(tdClass, "text-[#b4b4b8]")}>
                  {sessionLabels[trade.session] ?? trade.session}
                </td>
                <td className={cn(tdClass, "text-[#b4b4b8]")}>{trade.strategy}</td>
                <td className={cn(tdClass, "text-[#b4b4b8]")}>
                  {trade.behavior?.emotion ?? "—"}
                </td>
                <td className={cn(tdClass, "text-right font-mono", pnlToneClass(trade.outcome))}>
                  {trade.outcome === "open" ? "—" : formatR(normalizedR(trade))}
                </td>
                <td className={cn(tdClass, "text-right font-mono", pnlToneClass(trade.outcome))}>
                  {trade.outcome === "open" ? "—" : formatCurrency(trade.profit_loss)}
                </td>
                <td className={cn(tdClass, "text-right")}>
                  <span className={outcomeBadgeClass(trade.outcome)}>
                    {outcomeLabel(trade.outcome)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
