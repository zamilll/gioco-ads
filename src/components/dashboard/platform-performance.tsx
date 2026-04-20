"use client";

import { Layers } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlatformBadge } from "@/components/ui/platform-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "@/components/ui/toast";
import {
  platformPerformance as fallbackPerformance,
  type PlatformPerformance,
} from "@/lib/mock-data";

export function PlatformPerformanceCard({
  platformPerformance = fallbackPerformance,
}: { platformPerformance?: PlatformPerformance[] } = {}) {
  return (
    <Card>
      <CardHeader
        title="أداء المنصات"
        subtitle="مقارنة مباشرة"
        actions={
          <Link href="/reports">
            <Button variant="ghost">مقارنة تفصيلية ←</Button>
          </Link>
        }
      />
      {platformPerformance.length === 0 ? (
        <EmptyState
          size="md"
          icon={<Layers size={22} strokeWidth={1.6} />}
          title="لا توجد منصات نشطة"
          description="اربط حسابات Snap وTikTok وInstagram لعرض مقارنة أدائها هنا."
          action={
            <Link href="/connections">
              <Button variant="accent" size="sm">
                ربط حساب
              </Button>
            </Link>
          }
        />
      ) : (
        <div>
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-[12px] border-b border-line bg-bg/40 px-[18px] py-[10px] text-[11.5px] uppercase tracking-[0.06em] text-ink-3">
            <span>المنصة</span>
            <span>الإنفاق</span>
            <span>الظهور</span>
            <span>CTR</span>
            <span>CPA</span>
            <span />
          </div>
          {platformPerformance.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] items-center gap-[12px] border-b border-line px-[18px] py-[14px] text-[13px] last:border-b-0"
            >
              <div className="flex items-center gap-[10px]">
                <PlatformBadge platform={p.id} />
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-[12px] text-ink-3">{p.activeCount}</div>
                </div>
              </div>
              <div className="num">{p.spend}</div>
              <div className="num">{p.impressions}</div>
              <div className="num flex items-center gap-[6px]">
                {p.ctr}
                <span
                  className={
                    p.ctrTrend === "up"
                      ? "rounded-full bg-good-bg px-[6px] py-[1px] text-[10px] font-semibold text-good"
                      : "rounded-full bg-bad-bg px-[6px] py-[1px] text-[10px] font-semibold text-bad"
                  }
                >
                  {p.ctrTrend === "up" ? "▲" : "▼"}
                </span>
              </div>
              <div className="num">{p.cpa}</div>
              <div>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() =>
                    toast({
                      tone: "info",
                      title: `تفاصيل ${p.name}`,
                      description: "ستُفتح صفحة تفصيلية للمنصة.",
                    })
                  }
                >
                  تفاصيل
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
