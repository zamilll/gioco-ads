"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LineChart as LineIcon } from "lucide-react";
import { performanceSeries, PLATFORM_COLORS } from "@/lib/mock-data";
import { toArabicDigits } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export function PerformanceChart() {
  if (performanceSeries.length === 0) {
    return (
      <div className="h-[240px] w-full">
        <EmptyState
          size="sm"
          icon={<LineIcon size={22} strokeWidth={1.6} />}
          title="لا توجد بيانات أداء بعد"
          description="ستظهر منحنيات الأداء هنا بعد اتصال أول منصة وبدء المزامنة."
        />
      </div>
    );
  }
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={performanceSeries}
          margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
        >
          <CartesianGrid
            stroke="var(--line)"
            strokeDasharray="0"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{
              fill: "var(--ink-4)",
              fontSize: 10,
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
            tickLine={false}
            axisLine={false}
            reversed
          />
          <YAxis
            tick={{
              fill: "var(--ink-4)",
              fontSize: 10,
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
            tickLine={false}
            axisLine={false}
            orientation="right"
            tickFormatter={(v) => toArabicDigits(v)}
          />
          <Tooltip
            contentStyle={{
              background: "var(--ink)",
              color: "var(--bg)",
              border: 0,
              borderRadius: 10,
              fontSize: 12,
            }}
            labelStyle={{ color: "var(--bg)", opacity: 0.7 }}
            formatter={(value) => [
              `${toArabicDigits(Number(value))} ر.س`,
              "",
            ]}
          />
          <Line
            type="monotone"
            dataKey="snap"
            name="Snap"
            stroke={PLATFORM_COLORS.snap}
            strokeWidth={2.2}
            dot={false}
            activeDot={{ r: 5, stroke: "var(--panel)", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="tiktok"
            name="TikTok"
            stroke="var(--ink)"
            strokeWidth={2.2}
            dot={false}
            activeDot={{ r: 5, stroke: "var(--panel)", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="insta"
            name="Instagram"
            stroke={PLATFORM_COLORS.insta}
            strokeWidth={2.2}
            dot={false}
            activeDot={{ r: 5, stroke: "var(--panel)", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
