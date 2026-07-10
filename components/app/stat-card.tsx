import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  helper,
  tone = "neutral"
}: {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
  tone?: "neutral" | "green" | "red" | "blue" | "amber";
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-surface px-6 py-5">
      <div className="text-xs uppercase tracking-[0.06em] text-[#77777b]">
        {label}
      </div>
      <div
        className={cn(
          "mt-3.5 font-mono text-[29px] font-semibold tracking-tight",
          tone === "red" ? "text-[#9a9a9e]" : "text-[#ededed]"
        )}
      >
        {value}
      </div>
      {helper ? (
        <div className="mt-2 text-[13px] leading-5 text-[#6b6b70]">{helper}</div>
      ) : null}
    </div>
  );
}
