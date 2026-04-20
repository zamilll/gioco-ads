import Link from "next/link";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { getCampaigns, mapCampaignsToRows } from "@/lib/unified";
import { CampaignsListView } from "./campaigns-list-view";

async function loadCampaigns() {
  try {
    const campaigns = await getCampaigns();
    return { rows: mapCampaignsToRows(campaigns), error: undefined };
  } catch (e) {
    const message = e instanceof Error ? e.message : "خطأ غير متوقع";
    return { rows: [], error: message };
  }
}

export default async function CampaignsListPage() {
  const { rows, error } = await loadCampaigns();

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

      <CampaignsListView campaigns={rows} errorMessage={error} />
    </AppShell>
  );
}
