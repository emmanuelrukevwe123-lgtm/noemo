import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[#f4f4f2] text-[#0b0b0c] hover:bg-white focus-visible:ring-white/40 disabled:opacity-50",
  moss:
    "bg-[#f4f4f2] text-[#0b0b0c] hover:bg-white focus-visible:ring-white/40 disabled:opacity-50",
  ghost:
    "bg-transparent text-[#9a9a9e] hover:bg-white/[0.06] hover:text-ink focus-visible:ring-white/20 disabled:text-muted/50",
  outline:
    "border border-white/15 bg-transparent text-[#d4d4d6] hover:bg-white/[0.06] focus-visible:ring-white/20 disabled:text-muted/50"
};

const sizes = {
  sm: "h-9 gap-2 px-4 text-[13px]",
  md: "h-10 gap-2.5 px-5 text-sm",
  lg: "h-12 gap-3 px-7 text-base"
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold outline-none transition focus-visible:ring-2 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function LinkButton({
  className,
  variant = "primary",
  size = "md",
  href,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold outline-none transition focus-visible:ring-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
