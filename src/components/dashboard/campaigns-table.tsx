"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { StatusChip } from "@/components/ui/status-chip";
import { PlatformStack } from "@/components/ui/platform-badge";
import { Progress } from "@/components/ui/progress";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Filter as FilterIcon } from "lucide-react";
import { campaigns, type CampaignRow } from "@/lib/mock-data";

type CampaignFilter = "all" | "live" | "paused" | "draft";

const tabs = [
  { value: "all" as const, label: "الكل" },
  { value: "live" as const, label: "نشطة" },
  { value: "paused" as const, label: "متوقفة" },
  { value: "draft" as const, label: "مسودات" },
];

const columns: Column<CampaignRow>[] = [
  {
    key: "name",
    header: "الحملة",
    render: (row) => (
      <div className="flex items-center gap-[10px]">
        <div
          className="h-[36px] w-[36px] shrink-0 rounded-[8px] border border-line"
          style={{ background: row.thumb }}
        />
        <div>
          <b className="font-semibold">{row.name}</b>
          <div className="text-[11.5px] text-ink-3">{row.subtitle}</div>
        </div>
      </div>
    ),
  },
  {
    key: "platforms",
    header: "المنصات",
    render: (row) => <PlatformStack platforms={row.platforms} />,
  },
  {
    key: "status",
    header: "الحالة",
    render: (row) => <StatusChip status={row.status} />,
  },
  {
    key: "budget",
    header: "الميزانية",
    render: (row) => (
      <div className="min-w-[120px]">
        <div className="num text-[12px] text-ink-3">
          {row.budget.spent} / {row.budget.total}
        </div>
        <Progress
          value={row.budget.pct}
          tone={row.budget.tone}
          className="mt-[4px]"
        />
      </div>
    ),
  },
  {
    key: "spend",
    header: "الإنفاق",
    render: (row) => <span className="num">{row.spend}</span>,
  },
  {
    key: "ctr",
    header: "CTR",
    render: (row) => <span className="num">{row.ctr}</span>,
  },
  {
    key: "conversions",
    header: "التحويلات",
    render: (row) => <span className="num">{row.conversions}</span>,
  },
  {
    key: "roas",
    header: "ROAS",
    render: (row) => (
      <b
        className={
          "num " +
          (row.roasTone === "good"
            ? "text-good"
            : row.roasTone === "bad"
              ? "text-bad"
              : "text-ink-4")
        }
      >
        {row.roas}
      </b>
    ),
  },
];

export function CampaignsTable() {
  const [filter, setFilter] = useState<CampaignFilter>("all");
  const filtered = campaigns.filter((c) => {
    if (filter === "all") return true;
    if (filter === "draft") return c.status === "draft";
    return c.status === filter;
  });

  return (
    <Card>
      <CardHeader
        title="آخر الحملات"
        subtitle="أعلى ٦ أداءً هذا الأسبوع"
        actions={
          <div className="flex items-center gap-[8px]">
            <Segmented items={tabs} value={filter} onChange={setFilter} />
            <Button variant="ghost">
              <FilterIcon size={13} strokeWidth={1.8} />
              تصفية
            </Button>
          </div>
        }
      />
      <DataTable columns={columns} data={filtered} />
    </Card>
  );
}
