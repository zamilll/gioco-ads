"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardHeader } from "@/components/ui/card";
import { Segmented } from "@/components/ui/segmented";
import { PLATFORM_COLORS } from "@/lib/mock-data";
import { useCampaignDetailUI } from "@/lib/stores";
import { toArabicDigits } from "@/lib/utils";
import { PLATFORM_NAME } from "@/components/ui/platform-badge";

export function DailyPerformanceCard({
  data,
}: {
  data: Array<{ date: string; snap: number; tiktok: number; insta: number }>;
}) {
  const { chartView, setChartView } = useCampaignDetailUI();

  return (
    <Card className="mb-[18px]">
      <CardHeader
        title="الأداء اليومي"
        subtitle="الإنفاق عبر المنصات / يوم"
        actions={
          <Segmented
            items={[
              { value: "combined", label: "مُجمّع" },
              { value: "by_platform", label: "حسب المنصة" },
            ]}
            value={chartView}
            onChange={(v) => setChartView(v)}
          />
        }
      />
      <div className="h-[280px] w-full p-[14px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
              cursor={{ fill: "var(--chip)", opacity: 0.4 }}
              contentStyle={{
                background: "var(--ink)",
                color: "var(--bg)",
                border: 0,
                borderRadius: 10,
                fontSize: 12,
              }}
              labelStyle={{ color: "var(--bg)", opacity: 0.7 }}
              formatter={(value, name) => [
                `${toArabicDigits(Number(value))} ر.س`,
                PLATFORM_NAME[name as keyof typeof PLATFORM_NAME] ?? name,
              ]}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: 11, color: "var(--ink-3)" }}
              formatter={(value) =>
                PLATFORM_NAME[value as keyof typeof PLATFORM_NAME] ?? value
              }
            />
            <Bar
              dataKey="snap"
              stackId={chartView === "combined" ? "all" : undefined}
              fill={PLATFORM_COLORS.snap}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="tiktok"
              stackId={chartView === "combined" ? "all" : undefined}
              fill={PLATFORM_COLORS.tiktok}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="insta"
              stackId={chartView === "combined" ? "all" : undefined}
              fill={PLATFORM_COLORS.insta}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
