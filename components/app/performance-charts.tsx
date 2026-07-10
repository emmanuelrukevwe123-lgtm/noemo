"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { TradeAnalytics } from "@/lib/analytics/trades";
import { formatCurrency } from "@/lib/utils";

const axisTick = { fill: "#6b6b70", fontSize: 12, fontFamily: "var(--font-mono)" };
const tooltipStyle = {
  background: "#0f0f10",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 10,
  color: "#e4e4e6",
  fontSize: 13
};

export function PerformanceCharts({ analytics }: { analytics: TradeAnalytics }) {
  const equityData = analytics.equityCurve.map((point, index) => ({
    name: `T${index + 1}`,
    value: point.cumulativeProfitLoss
  }));

  const sessionData = analytics.sessionBreakdown.map((item) => ({
    name: item.label,
    pnl: item.netProfitLoss
  }));

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-white/[0.08] bg-surface px-6 pb-5 pt-[22px]">
        <div className="mb-4 flex items-baseline justify-between">
          <div className="font-display text-[17px] font-medium">Equity curve</div>
          <div className="font-mono text-[12px] text-[#6b6b70]">CUMULATIVE P/L</div>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={equityData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="name" tick={axisTick} tickLine={false} axisLine={false} hide />
              <YAxis
                tick={axisTick}
                tickLine={false}
                axisLine={false}
                width={54}
                tickFormatter={(value) => formatCurrency(Number(value))}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: "#8a8a8f" }}
                cursor={{ stroke: "rgba(255,255,255,0.12)" }}
                formatter={(value) => [formatCurrency(Number(value)), "Cumulative P/L"]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#e8e8e6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#f4f4f2" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-surface px-6 pb-5 pt-[22px]">
        <div className="mb-4 font-display text-[17px] font-medium">By session</div>
        <div className="h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sessionData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="name" tick={{ ...axisTick, fontFamily: "var(--font-sans)" }} tickLine={false} axisLine={false} />
              <YAxis
                tick={axisTick}
                tickLine={false}
                axisLine={false}
                width={54}
                tickFormatter={(value) => formatCurrency(Number(value))}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: "#8a8a8f" }}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                formatter={(value) => [formatCurrency(Number(value)), "Net P/L"]}
              />
              <Bar dataKey="pnl" radius={[3, 3, 0, 0]} fill="#e8e8e6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
