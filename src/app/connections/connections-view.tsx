"use client";

import { useSearchParams } from "next/navigation";
import { Plus, CheckCircle2 } from "lucide-react";
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
import { MorePlatforms } from "@/components/connections/more-platforms";
import { SecurityAndSync } from "@/components/connections/security-sync";
import { FaqSection } from "@/components/connections/faq-section";
import type { Connection } from "@/lib/types";

const PRIMARY_PLATFORMS: Platform[] = ["snap", "tiktok", "insta", "google"];

export function ConnectionsView({
  connections,
  connectUrls,
  errorMessage,
}: {
  connections: Connection[];
  connectUrls: Record<Platform, string>;
  errorMessage?: string;
}) {
  const searchParams = useSearchParams();
  const newConnectionId = searchParams.get("connection_id");

  const connected = connections.filter((c) => c.status !== "disconnected")
    .length;
  const connectedPlatforms = new Set(connections.map((c) => c.platform));
  const notYetConnected = PRIMARY_PLATFORMS.filter(
    (p) => !connectedPlatforms.has(p),
  );

  return (
    <>
      {newConnectionId && (
        <div className="mb-[16px] flex items-start gap-[10px] rounded-card border border-good/40 bg-good-bg p-[14px]">
          <CheckCircle2
            size={18}
            strokeWidth={2}
            className="mt-[1px] text-good"
          />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-good">
              تم إنشاء الربط بنجاح
            </div>
            <div className="mt-[4px] text-[12px] text-ink-2">
              احفظ المعرّف التالي في{" "}
              <span className="mono">UNIFIED_CONNECTION_ID</span> لبدء جلب
              البيانات.
            </div>
            <div className="mono mt-[6px] select-all rounded-[6px] border border-line bg-panel px-[8px] py-[4px] text-[12px]">
              {newConnectionId}
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-[16px] rounded-card border border-bad/40 bg-bad-bg p-[14px] text-[12.5px] text-bad">
          تعذّر جلب قائمة الحسابات من Unified.to: {errorMessage}
        </div>
      )}

      <StatusBanner connected={connected} total={PRIMARY_PLATFORMS.length} />
      <HowItWorks />

      {connections.length === 0 ? (
        <ConnectableList connectUrls={connectUrls} />
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
                  <a
                    key={p}
                    href={connectUrls[p]}
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
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <MorePlatforms />
      <SecurityAndSync />
      <FaqSection />
    </>
  );
}
