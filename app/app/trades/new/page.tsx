import { TradeForm } from "@/components/app/trade-form";

export default function NewTradePage() {
  return (
    <div className="noemo-fade mx-auto max-w-[860px]">
      <div className="mb-7">
        <h1 className="font-display text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em]">
          Log a trade
        </h1>
        <p className="mt-2 text-[14.5px] font-light text-[#8a8a8f]">
          Record it while it&apos;s fresh.
        </p>
      </div>
      <TradeForm mode="create" />
    </div>
  );
}
