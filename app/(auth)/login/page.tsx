import Link from "next/link";
import { redirect } from "next/navigation";
import { signInAction, signUpAction } from "@/lib/actions/auth";
import { getCurrentUser } from "@/lib/supabase/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button, LinkButton } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { Logo } from "@/components/ui/logo";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<{ error?: string; mode?: string }>;
}) {
  const { user, demoMode } = await getCurrentUser();
  const params = await searchParams;
  const configured = isSupabaseConfigured();
  const signUp = params?.mode === "signup";

  if (user && !demoMode) redirect("/app");

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <header className="flex items-center justify-between px-[clamp(20px,5vw,60px)] py-[26px]">
        <Logo href="/" />
        <Link href="/" className="font-mono text-[13.5px] text-[#77777b] hover:text-ink">
          ← Home
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-[clamp(20px,5vw,60px)] pb-16 pt-5">
        <div className="noemo-fade w-full max-w-[420px] text-center">
          <div className="mb-4 font-mono text-xs tracking-[0.24em] text-[#6b6b70]">
            {signUp ? "GET STARTED" : "WELCOME BACK"}
          </div>
          <h1 className="mb-2 font-display text-[clamp(32px,6vw,44px)] font-semibold tracking-[-0.02em]">
            {signUp ? "Create account" : "Sign in"}
          </h1>
          <p className="mb-8 text-[15px] font-light text-[#8a8a8f]">
            Your ledger is private. Only you see it.
          </p>

          {params?.error ? (
            <div className="mb-6 rounded-xl border border-white/12 bg-white/[0.03] p-3 text-left text-sm font-medium text-[#c4c4c8]">
              {params.error}
            </div>
          ) : null}

          {signUp ? (
            <form action={signUpAction} className="grid gap-4 text-left">
              <div>
                <Label htmlFor="fullName">Name</Label>
                <Input id="fullName" name="fullName" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  minLength={6}
                  required
                  placeholder="••••••••"
                  className="mt-1.5"
                />
              </div>
              <Button type="submit" size="lg" className="mt-2 w-full">
                Create account
              </Button>
            </form>
          ) : (
            <form action={signInAction} className="grid gap-4 text-left">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  minLength={6}
                  required
                  placeholder="••••••••"
                  className="mt-1.5"
                />
              </div>
              <Button type="submit" size="lg" className="mt-2 w-full">
                Sign in
              </Button>
            </form>
          )}

          <div className="mt-8 text-[13.5px] text-[#8a8a8f]">
            {signUp ? (
              <>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="border-b border-white/25 pb-px text-[#e4e4e6]"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                New to Noemo?{" "}
                <Link
                  href="/login?mode=signup"
                  className="border-b border-white/25 pb-px text-[#e4e4e6]"
                >
                  Create an account
                </Link>
              </>
            )}
          </div>

          {!configured ? (
            <div className="mt-5">
              <LinkButton href="/app" variant="ghost" size="sm" className="font-mono text-[12.5px]">
                Explore the demo →
              </LinkButton>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
