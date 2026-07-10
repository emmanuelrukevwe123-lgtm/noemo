import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Monochrome chips — all variants share one quiet outline look; the palette
// carries no hue, so emphasis comes from value and weight instead.
const variants = {
  neutral: "border-white/12 bg-transparent text-[#9a9a9e]",
  green: "border-white/16 bg-white/[0.04] text-[#e4e4e6]",
  red: "border-white/12 bg-transparent text-[#8a8a8f]",
  amber: "border-white/16 bg-transparent text-[#c4c4c8]",
  blue: "border-white/12 bg-transparent text-[#b4b4b8]"
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants;
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
