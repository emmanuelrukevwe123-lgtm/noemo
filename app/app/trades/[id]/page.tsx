import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiReviewButton } from "@/components/app/ai-review-button";
import { tradeReviewSchema } from "@/lib/ai/trade-review";
import { normalizedR } from "@/lib/analytics/trades";
import type { AiTradeReviewRow, TradeWithRelations } from "@/lib/db/types";
import { getTradeById } from "@/lib/db/trades";
import { requireUser } from "@/lib/supabase/auth";
import {
  cn,
  formatCurrency,
  formatDateTime,
  formatR,
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

export default async function TradeDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await requireUser();
  const { id } = await params;
  const trade = await getTradeById(user.id, id);

  if (!trade) notFound();

  const open = trade.outcome === "open";

  return (
    <div className="noemo-fade grid gap-4">
      <Link
        href="/app/trades"
        className="font-mono text-[13.5px] text-[#9a9a9e] hover:text-ink"
      >
        ← All trades
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3.5">
            <h1 className="font-display text-[clamp(30px,5vw,46px)] font-semibold tracking-[-0.02em]">
              {trade.pair}
            </h1>
            <span className={outcomeBadgeClass(trade.outcome)}>
              {outcomeLabel(trade.outcome)}
            </span>
          </div>
          <div className="mt-2.5 font-mono text-[13px] text-[#6b6b70]">
            {trade.direction === "long" ? "Long" : "Short"} ·{" "}
            {sessionLabels[trade.session] ?? trade.session} ·{" "}
            {formatDateTime(trade.opened_at)}
          </div>
        </div>
        <div className="text-right">
          <div
            className={cn(
              "font-mono text-[34px] font-semibold tracking-[-0.02em]",
              pnlToneClass(trade.outcome)
            )}
          >
            {open ? "Open" : formatCurrency(trade.profit_loss)}
          </div>
          <div className="mt-1 font-mono text-sm text-[#8a8a8f]">
            {open ? "In progress" : formatR(normalizedR(trade))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
        <Panel title="Execution">
          <dl className="grid grid-cols-2 gap-x-6 [row-gap:18px]">
            <Stat label="Entry" value={trade.entry_price} />
            <Stat label="Exit" value={trade.exit_price ?? "—"} />
            <Stat label="Stop loss" value={trade.stop_loss ?? "—"} />
            <Stat label="Take profit" value={trade.take_profit ?? "—"} />
            <Stat label="Lot size" value={trade.lot_size} />
            <Stat label="Risk" value={formatCurrency(trade.risk_amount)} />
            <Stat label="Timeframe" value={trade.timeframe} small />
            <Stat label="Strategy" value={trade.strategy} small />
          </dl>
          {trade.setup || trade.notes ? (
            <div className="mt-5 border-t border-white/[0.07] pt-5">
              <div className={kClass}>Notes</div>
              <p className="mt-1.5 text-[14.5px] font-light leading-relaxed text-[#c4c4c8]">
                {trade.notes || trade.setup}
              </p>
            </div>
          ) : null}
        </Panel>

        <Panel title="Behavior">
          <dl className="grid grid-cols-2 gap-x-6 [row-gap:18px]">
            <Stat label="Emotion" value={trade.behavior?.emotion ?? "—"} small />
            <Stat
              label="Rule adherence"
              value={trade.behavior?.rule_adherence.replace("_", " ") ?? "—"}
              small
            />
            <Stat
              label="Confidence"
              value={
                trade.behavior?.confidence != null
                  ? `${trade.behavior.confidence}/10`
                  : "—"
              }
            />
            <Stat
              label="Execution"
              value={
                trade.behavior?.execution_rating != null
                  ? `${trade.behavior.execution_rating}/10`
                  : "—"
              }
            />
          </dl>
          <div className="mt-5 border-t border-white/[0.07] pt-5">
            <div className={kClass}>Mistake tags</div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {trade.behavior?.mistake_tags.length ? (
                trade.behavior.mistake_tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/16 px-3 py-1 text-[12.5px] text-[#c4c4c8]"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-[13.5px] font-light text-[#6b6b70]">
                  None — clean.
                </span>
              )}
            </div>
          </div>
        </Panel>
      </div>

      <ChartPanel trade={trade} />

      <AiReviewPanel trade={trade} />
    </div>
  );
}

const kClass =
  "text-[11px] uppercase tracking-[0.05em] text-[#6b6b70]";

function Panel({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-surface p-6">
      <div className="mb-5 font-display text-base font-medium">{title}</div>
      {children}
    </div>
  );
}

function Stat({
  label,
  value,
  small
}: {
  label: string;
  value: string | number;
  small?: boolean;
}) {
  return (
    <div>
      <dt className={kClass}>{label}</dt>
      <dd
        className={cn(
          "mt-1.5",
          small
            ? "text-[15px] capitalize text-[#e4e4e6]"
            : "font-mono text-[18px] font-medium text-[#ededed]"
        )}
      >
        {String(value)}
      </dd>
    </div>
  );
}

function ChartPanel({ trade }: { trade: TradeWithRelations }) {
  const image = trade.attachments.find(
    (attachment) => attachment.kind === "image" && attachment.url
  );
  const tvLink = trade.attachments.find(
    (attachment) => attachment.kind === "tradingview" && attachment.url
  );

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-display text-base font-medium">Chart</div>
        {tvLink?.url ? (
          <Link
            href={tvLink.url}
            target="_blank"
            className="rounded-full border border-white/14 px-3.5 py-1.5 font-mono text-[12.5px] text-[#9a9a9e] hover:text-ink"
          >
            TradingView ↗
          </Link>
        ) : null}
      </div>
      {image?.url ? (
        <div className="relative aspect-video overflow-hidden rounded-[10px] border border-white/[0.08]">
          <Image
            src={image.url}
            alt={image.caption ?? "Trade chart screenshot"}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ) : (
        <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-[10px] border border-dashed border-white/12 bg-[#0f0f10]">
          <span className="text-[13.5px] font-light text-[#6b6b70]">
            No screenshot attached
          </span>
        </div>
      )}
    </div>
  );
}

function AiReviewPanel({ trade }: { trade: TradeWithRelations }) {
  const open = trade.outcome === "open";
  const latest = [...trade.aiReviews].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )[0];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#131315] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-white/16 px-2 py-0.5 font-mono text-[11px] tracking-[0.2em] text-[#77777b]">
            ARGUS
          </span>
          <div className="font-display text-[17px] font-medium">Post-trade review</div>
        </div>
        {!open && !latest ? (
          <AiReviewButton tradeId={trade.id} disabled={open} />
        ) : null}
      </div>

      {open ? (
        <p className="mt-2.5 max-w-[60ch] text-[14.5px] font-light leading-relaxed text-[#8a8a8f]">
          Close the trade before generating post-trade review notes.
        </p>
      ) : latest ? (
        <ReviewContent review={latest} />
      ) : (
        <p className="mt-2.5 max-w-[60ch] text-[14.5px] font-light leading-relaxed text-[#8a8a8f]">
          A structured reflection on how you executed this trade — what held up, and
          what to tighten next time.
        </p>
      )}
    </div>
  );
}

function ReviewContent({ review }: { review: AiTradeReviewRow }) {
  const parsed = tradeReviewSchema.safeParse(review.structured_output);

  if (!parsed.success) {
    return (
      <p className="mt-4 text-[14.5px] font-light leading-relaxed text-[#c4c4c8]">
        {review.summary}
      </p>
    );
  }

  const output = parsed.data;

  return (
    <div className="noemo-fade mt-5 grid gap-6">
      <p className="text-[14.5px] font-light leading-relaxed text-[#c4c4c8]">
        {output.summary}
      </p>
      <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
        <ReviewList
          heading="What to reflect on"
          values={output.reflectionQuestions}
          sign="+"
          bright
        />
        <ReviewList heading="Risk notes" values={output.riskNotes} sign="−" />
      </div>
      {output.behaviorPatterns.length ? (
        <ReviewList heading="Behavior patterns" values={output.behaviorPatterns} sign="·" />
      ) : null}
      <div className="border-t border-white/[0.07] pt-4 font-mono text-[11.5px] text-[#55555a]">
        {review.model} · {review.prompt_version} · {formatDateTime(review.created_at)}
      </div>
    </div>
  );
}

function ReviewList({
  heading,
  values,
  sign,
  bright
}: {
  heading: string;
  values: string[];
  sign: string;
  bright?: boolean;
}) {
  if (!values.length) return null;
  return (
    <div>
      <div
        className={cn(
          "mb-3.5 font-mono text-[11.5px] uppercase tracking-[0.14em]",
          bright ? "text-[#c4c4c8]" : "text-[#77777b]"
        )}
      >
        {heading}
      </div>
      {values.map((value) => (
        <div key={value} className="mb-3.5 flex gap-3">
          <span
            className={cn(
              "font-semibold",
              bright ? "text-[#f4f4f2]" : "text-[#77777b]"
            )}
          >
            {sign}
          </span>
          <span className="text-[14.5px] font-light leading-snug text-[#9a9a9e]">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
