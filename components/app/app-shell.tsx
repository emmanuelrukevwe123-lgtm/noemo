"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { signOutAction } from "@/lib/actions/auth";
import { LinkButton } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/trades", label: "Trades" },
  { href: "/app/trades/new", label: "Log trade" },
  { href: "/app/argus", label: "Argus" }
];

function isActive(pathname: string, href: string) {
  if (href === "/app") return pathname === "/app";
  if (href === "/app/trades/new") return pathname === "/app/trades/new";
  if (href === "/app/trades") {
    return pathname.startsWith("/app/trades") && pathname !== "/app/trades/new";
  }
  return pathname.startsWith(href);
}

export function AppShell({
  children,
  demoMode
}: {
  children: React.ReactNode;
  user: User;
  demoMode: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-paper/[0.86] backdrop-blur-md">
        <div className="mx-auto flex h-[62px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-4 sm:gap-8">
            <Logo href="/app" className="tracking-[0.34em] text-sm" />
            <nav className="flex items-center gap-1 overflow-x-auto noemo-scrollbar">
              {tabs.map((tab) => {
                const active = isActive(pathname, tab.href);
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={cn(
                      "whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition",
                      active
                        ? "bg-white/[0.07] text-[#f4f4f2]"
                        : "text-[#8a8a8f] hover:text-ink"
                    )}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <LinkButton href="/app/trades/new" size="sm" className="hidden sm:inline-flex">
              + New trade
            </LinkButton>
            <form action={signOutAction}>
              <button
                type="submit"
                aria-label="Sign out"
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/14 text-[#9a9a9e] transition hover:text-ink"
              >
                ↩
              </button>
            </form>
          </div>
        </div>
      </header>

      {demoMode ? (
        <div className="border-b border-white/[0.07] bg-white/[0.02]">
          <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-2.5 text-[13px] text-[#8a8a8f] sm:px-6 lg:px-10">
            <span>
              Read-only demo mode is active — Supabase environment variables are not
              configured.
            </span>
          </div>
        </div>
      ) : null}

      <main className="mx-auto max-w-[1200px] px-4 pb-24 pt-8 sm:px-6 lg:px-10">
        {children}
      </main>
    </div>
  );
}
