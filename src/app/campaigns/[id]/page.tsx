"use client";

import { AppShell } from "@/components/layout/app-shell";
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
  const { data: campaign } = useCampaign(params.id);
  const { data: metrics } = useCampaignMetrics(params.id);

  if (!campaign || !metrics) {
    return (
      <AppShell crumbTitle="تفاصيل الحملة">
        <div className="grid h-[60vh] place-items-center text-ink-3">
          جاري التحميل…
        </div>
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
