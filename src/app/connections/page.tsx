import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";
import type { Platform } from "@/components/ui/platform-badge";
import {
  INTEGRATION_TYPE_BY_PLATFORM,
  buildConnectUrl,
  listConnections,
  mapConnections,
} from "@/lib/unified";
import { ConnectionsView } from "./connections-view";

async function loadConnections() {
  try {
    const raw = await listConnections();
    return { connections: mapConnections(raw), error: undefined };
  } catch (e) {
    const message = e instanceof Error ? e.message : "خطأ غير متوقع";
    return { connections: [], error: message };
  }
}

function buildConnectUrlSafe(platform: Platform): string {
  try {
    return buildConnectUrl(INTEGRATION_TYPE_BY_PLATFORM[platform]);
  } catch {
    return "#";
  }
}

export default async function ConnectionsPage() {
  const { connections, error } = await loadConnections();
  const connectUrls: Record<Platform, string> = {
    snap: buildConnectUrlSafe("snap"),
    tiktok: buildConnectUrlSafe("tiktok"),
    insta: buildConnectUrlSafe("insta"),
    google: buildConnectUrlSafe("google"),
  };

  return (
    <AppShell crumbTitle="الحسابات المرتبطة">
      <div className="mb-[22px]">
        <h1 className="text-[24px] font-bold tracking-tightish">
          الحسابات المرتبطة
        </h1>
        <p className="mt-[6px] max-w-[640px] text-[13.5px] text-ink-3">
          اربط حسابات الإعلانات على Snap وTikTok وInstagram وGoogle Ads لتوحّد
          البيانات في لوحة واحدة. يتم الربط عبر Unified.to — بدون حفظ كلمات مرور.
        </p>
      </div>

      <Suspense>
        <ConnectionsView
          connections={connections}
          connectUrls={connectUrls}
          errorMessage={error}
        />
      </Suspense>
    </AppShell>
  );
}
