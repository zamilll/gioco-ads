"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Segmented } from "@/components/ui/segmented";
import { PerformanceChart } from "@/components/charts/performance-chart";
import { SpendDonut } from "@/components/charts/spend-donut";
import { PLATFORM_COLORS } from "@/lib/mock-data";

type Metric = "spend" | "impressions" | "clicks";
const metricTabs = [
  { value: "spend" as const, label: "إنفاق" },
  { value: "impressions" as const, label: "ظهور" },
  { value: "clicks" as const, label: "نقر" },
];

export function ChartsRow() {
  const [metric, setMetric] = useState<Metric>("spend");

  return (
    <div className="mb-[16px] grid grid-cols-[1.6fr_1fr] gap-[16px]">
      <Card>
        <CardHeader
          title="الأداء عبر الوقت"
          subtitle="إنفاق، ظهور، نقرات"
          actions={
            <Segmented items={metricTabs} value={metric} onChange={setMetric} />
          }
        />
        <CardBody className="pt-[10px]">
          <PerformanceChart />
          <div className="flex flex-wrap gap-[14px] px-[4px] pt-[10px] text-[12px] text-ink-3">
            {[
              { name: "Snap", color: PLATFORM_COLORS.snap },
              { name: "TikTok", color: "var(--ink)" },
              { name: "Instagram", color: PLATFORM_COLORS.insta },
              { name: "Google", color: PLATFORM_COLORS.google },
            ].map((l) => (
              <span key={l.name}>
                <span
                  className="me-[6px] inline-block h-[10px] w-[10px] rounded-[3px] align-[-1px]"
                  style={{ background: l.color }}
                />
                {l.name}
              </span>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="توزيع الإنفاق" subtitle="آخر ٣٠ يوم" />
        <CardBody>
          <SpendDonut />
        </CardBody>
      </Card>
    </div>
  );
}
