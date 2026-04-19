"use client";

import { useState } from "react";
import Link from "next/link";
import { Filter as FilterIcon, Megaphone, Plus, Search } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Segmented } from "@/components/ui/segmented";
import { StatusChip } from "@/components/ui/status-chip";
import { PlatformStack } from "@/components/ui/platform-badge";
import { Progress } from "@/components/ui/progress";
import { DataTable, type Column } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "@/components/ui/toast";
import { useCampaigns } from "@/lib/api";
import type { CampaignRow } from "@/lib/mock-data";

type CampaignFilter = "all" | "live" | "paused" | "draft" | "ended";

const tabs = [
  { value: "all" as const, label: "الكل" },
  { value: "live" as const, label: "نشطة" },
  { value: "paused" as const, label: "متوقفة" },
  { value: "draft" as const, label: "مسودات" },
  { value: "ended" as const, label: "منتهية" },
];

const columns: Column<CampaignRow>[] = [
  {
    key: "name",
    header: "الحملة",
    render: (row) => (
      <Link
        href={`/campaigns/${row.id}`}
        className="flex items-center gap-[10px] hover:underline"
      >
        <div
          className="h-[36px] w-[36px] shrink-0 rounded-[8px] border border-line"
          style={{ background: row.thumb }}
        />
        <div>
          <b className="font-semibold">{row.name}</b>
          <div className="text-[11.5px] text-ink-3">{row.subtitle}</div>
        </div>
      </Link>
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

export default function CampaignsListPage() {
  const [filter, setFilter] = useState<CampaignFilter>("all");
  const [query, setQuery] = useState("");
  const { data: campaigns = [] } = useCampaigns();

  const filtered = campaigns.filter((c) => {
    const statusOk =
      filter === "all" ? true : c.status === filter;
    const textOk =
      query.length === 0
        ? true
        : c.name.includes(query) || c.subtitle.includes(query);
    return statusOk && textOk;
  });

  return (
    <AppShell crumbTitle="الحملات">
      <div className="mb-[22px] flex items-end justify-between gap-[14px]">
        <div>
          <h1 className="text-[24px] font-bold tracking-tightish">الحملات</h1>
          <p className="mt-[4px] text-[13px] text-ink-3">
            إدارة الحملات عبر Snap وTikTok وInstagram من مكان واحد.
          </p>
        </div>
        <Link href="/campaigns/new">
          <Button variant="accent" size="md">
            <Plus size={14} strokeWidth={2.2} />
            إنشاء حملة جديدة
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader
          title={`كل الحملات ${campaigns.length ? `(${campaigns.length})` : ""}`}
          subtitle={campaigns.length ? undefined : "لا توجد حملات بعد"}
          actions={
            <div className="flex items-center gap-[8px]">
              <div className="relative">
                <Search
                  size={13}
                  strokeWidth={1.8}
                  className="absolute top-1/2 end-[10px] -translate-y-1/2 text-ink-3"
                />
                <Input
                  placeholder="بحث"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-[32px] w-[200px] py-[6px] pe-[30px] text-[12.5px]"
                />
              </div>
              <Segmented items={tabs} value={filter} onChange={setFilter} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  toast({
                    tone: "info",
                    title: "تصفية متقدمة",
                    description: "ستُتاح فلاتر المنصة والميزانية والنطاق قريبًا.",
                  })
                }
              >
                <FilterIcon size={13} strokeWidth={1.8} />
                تصفية
              </Button>
            </div>
          }
        />
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Megaphone size={22} strokeWidth={1.6} />}
            title={campaigns.length === 0 ? "لم تُنشأ حملات بعد" : "لا توجد نتائج"}
            description={
              campaigns.length === 0
                ? "ابدأ بإنشاء حملتك الأولى — معالج ٦ خطوات يربط الهدف والجمهور والإبداع ثم ينشر على المنصات المختارة."
                : "جرّب تعديل عبارة البحث أو تغيير فلتر الحالة."
            }
            action={
              campaigns.length === 0 ? (
                <Link href="/campaigns/new">
                  <Button variant="accent" size="sm">
                    <Plus size={13} strokeWidth={2} />
                    إنشاء حملة جديدة
                  </Button>
                </Link>
              ) : null
            }
            secondary={
              campaigns.length === 0 ? (
                <Link href="/connections">
                  <Button variant="ghost" size="sm">
                    ربط منصة
                  </Button>
                </Link>
              ) : null
            }
          />
        ) : (
          <DataTable columns={columns} data={filtered} />
        )}
      </Card>
    </AppShell>
  );
}
