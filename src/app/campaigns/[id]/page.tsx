"use client";

import Link from "next/link";
import { FileSearch, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { CampaignHeader } from "@/components/campaign-detail/header";
import { KpiRibbon } from "@/components/campaign-detail/kpi-ribbon";
import { DailyPerformanceCard } from "@/components/campaign-detail/daily-chart";
import { CreativesGrid } from "@/components/campaign-detail/creatives-grid";
import {
  GeoCard,
  PeakHoursCard,
  AgeBucketsCard,
  RecommendationCard,
} from "@/components/campaign-detail/insights-sidebar";
import { useCampaign, useCampaignMetrics } from "@/lib/api";

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: campaign, isLoading } = useCampaign(params.id);
  const { data: metrics } = useCampaignMetrics(params.id);

  if (isLoading) {
    return (
      <AppShell crumbTitle="تفاصيل الحملة">
        <div className="grid h-[60vh] place-items-center text-ink-3">
          جاري التحميل…
        </div>
      </AppShell>
    );
  }

  if (!campaign || !metrics) {
    return (
      <AppShell crumbTitle="تفاصيل الحملة">
        <div className="mb-[22px]">
          <h1 className="text-[24px] font-bold tracking-tightish">
            تفاصيل الحملة
          </h1>
          <p className="mt-[4px] text-[13px] text-ink-3">
            عرض تحليلات تفصيلية للحملة — الأداء، الإبداعات، والتوزيع.
          </p>
        </div>
        <Card>
          <EmptyState
            size="lg"
            icon={<FileSearch size={22} strokeWidth={1.6} />}
            title="الحملة غير موجودة"
            description="لم نعثر على حملة بهذا المعرّف. قد تكون حُذفت، أو لم تُنشأ بعد."
            action={
              <Link href="/campaigns/new">
                <Button variant="accent" size="sm">
                  <Plus size={13} strokeWidth={2} />
                  إنشاء حملة جديدة
                </Button>
              </Link>
            }
            secondary={
              <Link href="/campaigns">
                <Button variant="ghost" size="sm">
                  عرض كل الحملات
                </Button>
              </Link>
            }
          />
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell crumbTitle={campaign.name}>
      <CampaignHeader campaign={campaign} />
      <KpiRibbon values={campaign.kpis} />

      <div className="grid gap-[18px] lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <DailyPerformanceCard data={metrics.daily} />
          <CreativesGrid creatives={metrics.creatives} />
        </div>

        <div className="flex flex-col gap-[14px]">
          <GeoCard items={metrics.geoBreakdown} />
          <PeakHoursCard hours={metrics.peakHours} />
          <AgeBucketsCard buckets={metrics.ageBuckets} />
          <RecommendationCard />
        </div>
      </div>
    </AppShell>
  );
}
