"use client";

import { AppShell } from "@/components/layout/app-shell";
import { StatusBanner } from "@/components/connections/status-banner";
import { HowItWorks } from "@/components/connections/how-it-works";
import { PlatformCard } from "@/components/connections/platform-card";
import { MorePlatforms } from "@/components/connections/more-platforms";
import { SecurityAndSync } from "@/components/connections/security-sync";
import { FaqSection } from "@/components/connections/faq-section";
import { useConnections } from "@/lib/api";

export default function ConnectionsPage() {
  const { data: connections = [] } = useConnections();
  const connected = connections.filter(
    (c) => c.status !== "disconnected",
  ).length;

  return (
    <AppShell crumbTitle="الحسابات المرتبطة">
      <div className="mb-[22px]">
        <h1 className="text-[24px] font-bold tracking-tightish">
          الحسابات المرتبطة
        </h1>
        <p className="mt-[6px] max-w-[640px] text-[13.5px] text-ink-3">
          اربط حسابات الإعلانات على Snap وTikTok وInstagram لتوحّد البيانات في
          لوحة واحدة. نستخدم OAuth 2.0 — بدون حفظ كلمات مرور.
        </p>
      </div>

      <StatusBanner connected={connected} total={3} />
      <HowItWorks />

      <div className="mb-[20px] flex flex-col gap-[14px]">
        {connections.map((c) => (
          <PlatformCard key={c.platform} connection={c} />
        ))}
      </div>

      <MorePlatforms />
      <SecurityAndSync />
      <FaqSection />
    </AppShell>
  );
}
