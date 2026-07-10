import { LinkButton } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const steps = [
  {
    index: "01",
    title: "Log",
    body: "Every execution, captured — entry, exit, risk, and the emotion behind it."
  },
  {
    index: "02",
    title: "Reflect",
    body: "Rate your discipline. Tag the mistakes. See the patterns you keep repeating."
  },
  {
    index: "03",
    title: "Review",
    body: "Expectancy, win rate, drawdown. The numbers that tell you the truth."
  }
];

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <header className="flex items-center justify-between border-b border-white/[0.06] px-[clamp(20px,5vw,60px)] py-[26px]">
        <Logo href="/" />
        <LinkButton href="/login" size="sm">
          Sign in
        </LinkButton>
      </header>

      <main className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col justify-center px-[clamp(20px,5vw,60px)] py-[clamp(40px,8vh,110px)]">
        <div className="mb-7 font-mono text-xs tracking-[0.28em] text-[#6b6b70]">
          A FOREX TRADE JOURNAL
        </div>
        <h1 className="mb-7 max-w-[14ch] font-display text-[clamp(44px,8vw,92px)] font-semibold leading-[0.98] tracking-[-0.03em]">
          Face every trade.
        </h1>
        <p className="mb-11 max-w-[46ch] text-[clamp(17px,2.4vw,22px)] font-light leading-relaxed text-[#a9a9ae]">
          A private ledger for the disciplined trader. Log the execution, sit with the
          behavior, review the numbers. No prices, no signals — just you and the
          record.
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          <LinkButton href="/login" size="lg">
            Open the journal →
          </LinkButton>
          <LinkButton href="/login" variant="outline" size="lg">
            Log a trade
          </LinkButton>
        </div>

        <div className="mt-[clamp(56px,10vh,110px)] grid gap-9 border-t border-white/[0.06] pt-11 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {steps.map((step) => (
            <div key={step.index}>
              <div className="mb-3 font-mono text-xs text-[#5c5c61]">{step.index}</div>
              <div className="mb-2 font-display text-[19px] font-medium">{step.title}</div>
              <div className="text-[14.5px] font-light leading-relaxed text-[#8a8a8f]">
                {step.body}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/[0.06] px-[clamp(20px,5vw,60px)] py-[26px] font-mono text-[11.5px] tracking-[0.18em] text-[#55555a]">
        NOEMO — A QUIET LEDGER
      </footer>
    </div>
  );
}
