import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | null | undefined) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatPercent(value: number | null | undefined) {
  return `${Number(value ?? 0).toFixed(1)}%`;
}

export function formatR(value: number | null | undefined) {
  const number = Number(value ?? 0);
  const sign = number > 0 ? "+" : "";
  return `${sign}${number.toFixed(2)}R`;
}

export function formatDateTime(value: string | Date | null | undefined) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export type Outcome = "win" | "loss" | "breakeven" | "open";

export function outcomeLabel(outcome: string) {
  if (outcome === "breakeven") return "B/E";
  return outcome.charAt(0).toUpperCase() + outcome.slice(1);
}

// In the monochrome palette wins/losses are told apart by value (lightness)
// and weight, never hue — brighter is positive, dimmer is negative.
export function pnlToneClass(outcome: string) {
  if (outcome === "win") return "text-[#f4f4f2] font-semibold";
  if (outcome === "loss") return "text-[#76767a]";
  if (outcome === "breakeven") return "text-[#a2a2a6]";
  return "text-[#6b6b70]";
}

export function outcomeBadgeClass(outcome: string) {
  const base =
    "inline-flex items-center rounded-[5px] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] whitespace-nowrap";
  if (outcome === "win") return `${base} bg-[#f4f4f2] text-[#0b0b0c] font-semibold`;
  if (outcome === "loss")
    return `${base} bg-transparent text-[#8a8a8f] border border-white/20`;
  if (outcome === "breakeven") return `${base} bg-white/[0.08] text-[#c4c4c8]`;
  return `${base} bg-transparent text-[#e4e4e6] border border-dashed border-white/30`;
}

export function markColor(outcome: string) {
  if (outcome === "win") return "#f4f4f2";
  if (outcome === "loss") return "#5a5a5e";
  if (outcome === "breakeven") return "#8a8a8f";
  return "#33333a";
}
