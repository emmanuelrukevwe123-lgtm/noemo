import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/"
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "font-display text-[15px] font-semibold tracking-[0.38em] text-[#f4f4f2]",
        className
      )}
    >
      NOEMO
    </Link>
  );
}
