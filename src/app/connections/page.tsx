"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { SmallCapsLabel } from "@/components/ui/field";
import {
  PlatformBadge,
  PLATFORM_NAME,
  type Platform,
} from "@/components/ui/platform-badge";
import { StatusBanner } from "@/components/connections/status-banner";
import { HowItWorks } from "@/components/connections/how-it-works";
import { PlatformCard } from "@/components/connections/platform-card";
import { ConnectableList } from "@/components/connections/connectable-card";
import { OAuthConsentDialog } from "@/components/connections/oauth-consent-dialog";
import { MorePlatforms } from "@/components/connections/more-platforms";
import { SecurityAndSync } from "@/components/connections/security-sync";
import { FaqSection } from "@/components/connections/faq-section";
import { useConnections } from "@/lib/api";

const PRIMARY_PLATFORMS: Platform[] = ["snap", "tiktok", "insta", "google"];

export default function ConnectionsPage() {
  const { data: connections = [] } = useConnections();
  const connected = connections.filter(
    (c) => c.status !== "disconnected",
  ).length;

  const connectedPlatforms = new Set(connections.map((c) => c.platform));
  const notYetConnected = PRIMARY_PLATFORMS.filter(
    (p) => !connectedPlatforms.has(p),
  );

  const [dialogPlatform, setDialogPlatform] = useState<Platform | null>(null);

  return (
    <AppShell crumbTitle="الحسابات المرتبطة">
      <div className="mb-[22px]">
        <h1 className="text-[24px] font-bold tracking-tightish">
          الحسابات المرتبطة
        </h1>
        <p className="mt-[6px] max-w-[640px] text-[13.5px] text-ink-3">
          اربط حسابات الإعلانات على Snap وTikTok وInstagram وGoogle Ads لتوحّد
          البيانات في لوحة واحدة. نستخدم OAuth 2.0 — بدون حفظ كلمات مرور.
        </p>
      </div>

      <StatusBanner connected={connected} total={PRIMARY_PLATFORMS.length} />
      <HowItWorks />

      {connections.length === 0 ? (
        <ConnectableList />
      ) : (
        <>
          <div className="mb-[10px]">
            <SmallCapsLabel>المنصات المتصلة</SmallCapsLabel>
          </div>
          <div className="mb-[20px] flex flex-col gap-[14px]">
            {connections.map((c) => (
              <PlatformCard key={c.platform} connection={c} />
            ))}
          </div>

          {notYetConnected.length > 0 && (
            <div className="mb-[20px] rounded-card border border-dashed border-line-2 bg-panel/40 p-[14px]">
              <div className="mb-[10px] flex items-center justify-between">
                <SmallCapsLabel>متاحة للربط</SmallCapsLabel>
                <span className="text-[11.5px] text-ink-3">
                  أكمل ربط بقية المنصات لتوحيد البيانات
                </span>
              </div>
              <div className="grid gap-[10px] sm:grid-cols-2">
                {notYetConnected.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDialogPlatform(p)}
                    className="flex items-center gap-[10px] rounded-[10px] border border-line bg-panel p-[12px] text-start transition-colors hover:border-accent hover:bg-accent-soft/20"
                  >
                    <PlatformBadge platform={p} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold">
                        {PLATFORM_NAME[p]}
                      </div>
                      <div className="text-[11.5px] text-ink-3">غير متصل</div>
                    </div>
                    <Button variant="accent" size="xs">
                      <Plus size={12} strokeWidth={2} />
                      ربط
                    </Button>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <OAuthConsentDialog
        platform={dialogPlatform}
        open={dialogPlatform !== null}
        onOpenChange={(o) => {
          if (!o) setDialogPlatform(null);
        }}
      />

      <MorePlatforms />
      <SecurityAndSync />
      <FaqSection />
    </AppShell>
  );
}
