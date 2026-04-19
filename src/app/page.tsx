import { AppShell } from "@/components/layout/app-shell";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import { KpiRow } from "@/components/dashboard/kpi-row";
import { ChartsRow } from "@/components/dashboard/charts-row";
import { PlatformPerformanceCard } from "@/components/dashboard/platform-performance";
import { CampaignsTable } from "@/components/dashboard/campaigns-table";

export default function DashboardPage() {
  return (
    <AppShell crumbTitle="نظرة عامة">
      <WelcomeHeader />
      <KpiRow />
      <ChartsRow />
      <div className="mb-[16px]">
        <PlatformPerformanceCard />
      </div>
      <CampaignsTable />
    </AppShell>
  );
}
