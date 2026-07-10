import { BookOpen } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { TradeFilters, TradeTable } from "@/components/app/trade-table";
import { listTrades } from "@/lib/db/trades";
import { requireUser } from "@/lib/supabase/auth";

export default async function TradesPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | undefined>>;
}) {
  const { user } = await requireUser();
  const params = (await searchParams) ?? {};
  const trades = await listTrades(user.id, params);

  return (
    <div className="noemo-fade grid gap-4">
      <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-display text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em]">
          Trades
        </h1>
        <div className="font-mono text-[12.5px] text-[#6b6b70]">
          {trades.length} SHOWN
        </div>
      </div>

      <TradeFilters searchParams={params} />

      {trades.length ? (
        <TradeTable trades={trades} />
      ) : (
        <div className="rounded-2xl border border-white/[0.08] bg-surface px-6 py-12 text-center">
          <div className="mb-4 flex justify-center text-[#55555a]">
            <BookOpen size={30} />
          </div>
          <p className="text-[15px] font-light text-[#6b6b70]">
            No trades match these filters.
          </p>
          <div className="mt-5 flex justify-center">
            <LinkButton href="/app/trades/new">Log a trade</LinkButton>
          </div>
        </div>
      )}
    </div>
  );
}
