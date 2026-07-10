import { notFound } from "next/navigation";
import { TradeForm } from "@/components/app/trade-form";
import { getTradeById } from "@/lib/db/trades";
import { requireUser } from "@/lib/supabase/auth";

export default async function EditTradePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await requireUser();
  const { id } = await params;
  const trade = await getTradeById(user.id, id);

  if (!trade) notFound();

  return (
    <div className="noemo-fade mx-auto max-w-[860px]">
      <div className="mb-7">
        <h1 className="font-display text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em]">
          Edit {trade.pair}
        </h1>
        <p className="mt-2 text-[14.5px] font-light text-[#8a8a8f]">
          Update execution, behavior or chart context.
        </p>
      </div>
      <TradeForm mode="edit" trade={trade} />
    </div>
  );
}
