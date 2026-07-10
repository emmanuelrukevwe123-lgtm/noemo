"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Upload } from "lucide-react";
import { useForm, type Resolver } from "react-hook-form";
import {
  createTradeAction,
  updateTradeAction,
  type TradeActionState
} from "@/lib/actions/trades";
import type { TradeInput } from "@/lib/validation/trade";
import { tradeInputSchema } from "@/lib/validation/trade";
import type { TradeWithRelations } from "@/lib/db/types";
import { Button, LinkButton } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/field";

type FormMode = "create" | "edit";

export function TradeForm({
  mode,
  trade
}: {
  mode: FormMode;
  trade?: TradeWithRelations;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<TradeActionState>({ ok: false });
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TradeInput>({
    resolver: zodResolver(tradeInputSchema) as Resolver<TradeInput>,
    defaultValues: tradeToDefaults(trade)
  });

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(() => {
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        startTransition(async () => {
          const result =
            mode === "create"
              ? await createTradeAction(formData)
              : await updateTradeAction(trade?.id ?? "", formData);
          setState(result);

          if (result.ok && result.tradeId) {
            router.push(`/app/trades/${result.tradeId}`);
            router.refresh();
          }
        });
      })}
      className="noemo-fade mx-auto grid max-w-[860px] gap-4"
    >
      {state.error ? (
        <div className="rounded-xl border border-white/12 bg-white/[0.03] p-4 text-sm font-medium text-[#c4c4c8]">
          {state.error}
        </div>
      ) : null}

      <Section index="01" title="Execution">
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
          <Field label="Pair" error={errors.pair?.message}>
            <Input placeholder="EURUSD" {...register("pair")} />
          </Field>
          <Field label="Direction" error={errors.direction?.message}>
            <Select {...register("direction")}>
              <option value="long">Long</option>
              <option value="short">Short</option>
            </Select>
          </Field>
          <Field label="Session" error={errors.session?.message}>
            <Select {...register("session")}>
              <option value="london">London</option>
              <option value="new_york">New York</option>
              <option value="overlap">Overlap</option>
              <option value="asia">Asia</option>
              <option value="other">Other</option>
            </Select>
          </Field>
          <Field label="Outcome" error={errors.outcome?.message}>
            <Select {...register("outcome")}>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
              <option value="breakeven">Breakeven</option>
              <option value="open">Open</option>
            </Select>
          </Field>
          <Field label="Entry price" error={errors.entryPrice?.message}>
            <Input type="number" step="0.00001" {...register("entryPrice")} />
          </Field>
          <Field label="Exit price" error={errors.exitPrice?.message}>
            <Input type="number" step="0.00001" {...register("exitPrice")} />
          </Field>
          <Field label="Stop loss" error={errors.stopLoss?.message}>
            <Input type="number" step="0.00001" {...register("stopLoss")} />
          </Field>
          <Field label="Take profit" error={errors.takeProfit?.message}>
            <Input type="number" step="0.00001" {...register("takeProfit")} />
          </Field>
          <Field label="Lot size" error={errors.lotSize?.message}>
            <Input type="number" step="0.01" {...register("lotSize")} />
          </Field>
          <Field label="Risk amount" error={errors.riskAmount?.message}>
            <Input type="number" step="0.01" {...register("riskAmount")} />
          </Field>
          <Field label="Profit / loss" error={errors.profitLoss?.message}>
            <Input type="number" step="0.01" {...register("profitLoss")} />
          </Field>
          <Field label="Timeframe" error={errors.timeframe?.message}>
            <Input placeholder="1H" {...register("timeframe")} />
          </Field>
          <Field label="Opened at" error={errors.openedAt?.message}>
            <Input type="datetime-local" {...register("openedAt")} />
          </Field>
          <Field label="Closed at" error={errors.closedAt?.message}>
            <Input type="datetime-local" {...register("closedAt")} />
          </Field>
          <Field label="Strategy" error={errors.strategy?.message} className="xl:col-span-2">
            <Input placeholder="London pullback" {...register("strategy")} />
          </Field>
          <Field label="Setup" error={errors.setup?.message} className="md:col-span-2">
            <Textarea placeholder="What was the setup?" {...register("setup")} />
          </Field>
          <Field label="Notes" error={errors.notes?.message} className="sm:col-span-full">
            <Textarea placeholder="Trade management, context, observations..." {...register("notes")} />
          </Field>
        </div>
      </Section>

      <Section index="02" title="Behavior">
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
          <Field label="Emotion" error={errors.emotion?.message}>
            <Input placeholder="patient" {...register("emotion")} />
          </Field>
          <Field label="Confidence 1-10" error={errors.confidence?.message}>
            <Input type="number" min="1" max="10" step="1" {...register("confidence")} />
          </Field>
          <Field label="Rule adherence" error={errors.ruleAdherence?.message}>
            <Select {...register("ruleAdherence")}>
              <option value="followed">Followed</option>
              <option value="partial">Partial</option>
              <option value="broken">Broken</option>
              <option value="not_applicable">Not applicable</option>
            </Select>
          </Field>
          <Field label="Execution 1-10" error={errors.executionRating?.message}>
            <Input
              type="number"
              min="1"
              max="10"
              step="1"
              {...register("executionRating")}
            />
          </Field>
          <Field
            label="Mistake tags"
            error={errors.mistakeTags?.message}
            className="sm:col-span-full"
          >
            <Input
              placeholder="early entry, moved stop, news risk"
              {...register("mistakeTags")}
            />
          </Field>
        </div>
      </Section>

      <Section index="03" title="Chart context">
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <Field label="TradingView URL" error={errors.tradingViewUrl?.message}>
            <Input placeholder="https://www.tradingview.com/..." {...register("tradingViewUrl")} />
          </Field>
          <Field label="Attachment caption" error={errors.attachmentCaption?.message}>
            <Input placeholder="Entry chart" {...register("attachmentCaption")} />
          </Field>
          <div className="sm:col-span-full">
            <Label htmlFor="screenshot">Screenshot</Label>
            <label className="mt-1.5 flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/16 bg-[#0f0f10] px-4 py-6 text-sm text-[#77777b] hover:border-white/30">
              <Upload size={20} className="text-[#55555a]" />
              <span>Drop or click to upload</span>
              <input
                id="screenshot"
                name="screenshot"
                type="file"
                accept="image/*"
                className="sr-only"
              />
            </label>
          </div>
        </div>
      </Section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <LinkButton href={trade ? `/app/trades/${trade.id}` : "/app/trades"} variant="outline">
          Cancel
        </LinkButton>
        <Button type="submit" disabled={isPending}>
          <Save size={16} />
          {isPending ? "Saving..." : mode === "create" ? "Save trade" : "Update trade"}
        </Button>
      </div>
    </form>
  );
}

function Section({
  index,
  title,
  children
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/[0.08] bg-surface p-6 sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs text-[#5c5c61]">{index}</span>
        <h2 className="font-display text-[18px] font-medium">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  error,
  children,
  className
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="mt-2">{children}</div>
      <FieldError message={error} />
    </div>
  );
}

function tradeToDefaults(trade?: TradeWithRelations): Partial<TradeInput> {
  return {
    pair: trade?.pair ?? "EURUSD",
    direction: trade?.direction ?? "long",
    entryPrice: trade?.entry_price ?? 1,
    exitPrice: trade?.exit_price ?? null,
    stopLoss: trade?.stop_loss ?? null,
    takeProfit: trade?.take_profit ?? null,
    lotSize: trade?.lot_size ?? 1,
    riskAmount: trade?.risk_amount ?? 0,
    profitLoss: trade?.profit_loss ?? null,
    outcome: trade?.outcome ?? "win",
    session: trade?.session ?? "london",
    timeframe: trade?.timeframe ?? "1H",
    strategy: trade?.strategy ?? "",
    setup: trade?.setup ?? "",
    notes: trade?.notes ?? "",
    openedAt: toDatetimeLocal(trade?.opened_at) ?? toDatetimeLocal(new Date().toISOString()),
    closedAt: toDatetimeLocal(trade?.closed_at) ?? "",
    emotion: trade?.behavior?.emotion ?? "",
    confidence: trade?.behavior?.confidence ?? null,
    ruleAdherence: trade?.behavior?.rule_adherence ?? "not_applicable",
    mistakeTags: trade?.behavior?.mistake_tags.join(", ") ?? "",
    executionRating: trade?.behavior?.execution_rating ?? null,
    tradingViewUrl:
      trade?.attachments.find((attachment) => attachment.kind === "tradingview")?.url ?? "",
    attachmentCaption: trade?.attachments[0]?.caption ?? ""
  };
}

function toDatetimeLocal(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
}
