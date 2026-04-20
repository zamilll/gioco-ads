import { AppShell } from "@/components/layout/app-shell";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import { KpiRow } from "@/components/dashboard/kpi-row";
import { ChartsRow } from "@/components/dashboard/charts-row";
import { PlatformPerformanceCard } from "@/components/dashboard/platform-performance";
import { CampaignsTable } from "@/components/dashboard/campaigns-table";
import {
  buildKpisFromMetrics,
  buildPlatformPerformance,
  getCampaigns,
  getMetrics,
  mapCampaignsToRows,
} from "@/lib/unified";

async function loadDashboard() {
  try {
    const [campaigns, metrics] = await Promise.all([
      getCampaigns(),
      getMetrics(),
    ]);
    return {
      rows: mapCampaignsToRows(campaigns),
      kpis: buildKpisFromMetrics(metrics),
      performance: buildPlatformPerformance(metrics),
    };
  } catch {
    return { rows: [], kpis: undefined, performance: [] };
  }
}

export default async function DashboardPage() {
  const { rows, kpis, performance } = await loadDashboard();

  return (
    <AppShell crumbTitle="نظرة عامة">
      <WelcomeHeader />
      <KpiRow kpis={kpis} />
      <ChartsRow />
      <div className="mb-[16px]">
        <PlatformPerformanceCard platformPerformance={performance} />
      </div>
      <CampaignsTable campaigns={rows} />
    </AppShell>
  );
}
