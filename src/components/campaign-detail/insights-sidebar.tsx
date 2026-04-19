"use client";

import { Sparkles, ArrowLeft } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { cn, toArabicDigits } from "@/lib/utils";

export function GeoCard({
  items,
}: {
  items: Array<{ city: string; pct: number; value: string }>;
}) {
  return (
    <Card>
      <CardHeader title="التوزيع الجغرافي" subtitle="أعلى المدن" />
      <CardBody className="flex flex-col gap-[10px]">
        {items.map((item) => (
          <div key={item.city}>
            <div className="mb-[4px] flex items-center justify-between text-[12px]">
              <span className="text-ink-2">{item.city}</span>
              <span className="mono text-ink-3">{item.value}</span>
            </div>
            <div className="relative h-[6px] overflow-hidden rounded-full bg-chip">
              <div
                className="absolute inset-y-0 start-0 rounded-full bg-accent"
                style={{ width: `${item.pct}%` }}
              />
            </div>
            <div className="mono mt-[2px] text-end text-[10.5px] text-ink-4">
              {toArabicDigits(item.pct)}٪
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

export function PeakHoursCard({ hours }: { hours: number[] }) {
  const max = Math.max(...hours);
  const peakThreshold = max * 0.75;
  return (
    <Card>
      <CardHeader title="ساعات الذروة" subtitle="٢٤ ساعة" />
      <CardBody>
        <div className="flex h-[80px] items-end gap-[2px]" dir="ltr">
          {hours.map((v, h) => {
            const pct = (v / max) * 100;
            const peak = v >= peakThreshold;
            return (
              <div
                key={h}
                className="group relative flex-1"
                title={`${toArabicDigits(h)}:٠٠`}
              >
                <div
                  className={cn(
                    "w-full rounded-[3px] transition-colors",
                    peak ? "bg-accent" : "bg-chip",
                  )}
                  style={{ height: `${pct}%`, minHeight: 4 }}
                />
              </div>
            );
          })}
        </div>
        <div className="mono mt-[8px] flex justify-between text-[10px] text-ink-4" dir="ltr">
          <span>٠٠</span>
          <span>٠٦</span>
          <span>١٢</span>
          <span>١٨</span>
          <span>٢٣</span>
        </div>
        <p className="mt-[10px] rounded-[8px] bg-chip/50 px-[10px] py-[6px] text-[11.5px] text-ink-2">
          الذروة بين <b className="mono">١٩:٠٠</b> و<b className="mono">٢٣:٠٠</b>
        </p>
      </CardBody>
    </Card>
  );
}

export function AgeBucketsCard({
  buckets,
}: {
  buckets: Array<{ label: string; pct: number }>;
}) {
  const max = Math.max(...buckets.map((b) => b.pct));
  return (
    <Card>
      <CardHeader title="الفئات العمرية" subtitle="نسبة الإنفاق" />
      <CardBody>
        <div className="flex h-[120px] items-end gap-[8px]">
          {buckets.map((b) => {
            const h = (b.pct / max) * 100;
            return (
              <div
                key={b.label}
                className="flex flex-1 flex-col items-center gap-[6px]"
              >
                <div className="mono text-[11px] text-ink-3">
                  {toArabicDigits(b.pct)}٪
                </div>
                <div
                  className="w-full rounded-t-[4px] bg-accent"
                  style={{ height: `${h}%`, minHeight: 6 }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-[6px] flex gap-[8px]">
          {buckets.map((b) => (
            <div
              key={b.label}
              className="mono flex-1 text-center text-[10.5px] text-ink-3"
            >
              {b.label}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

export function RecommendationCard() {
  return (
    <div className="rounded-card p-[18px]" style={{ background: "var(--ink)", color: "var(--bg)" }}>
      <div className="flex items-center gap-[8px]">
        <span
          className="grid h-[28px] w-[28px] place-items-center rounded-[8px]"
          style={{
            background: "color-mix(in oklab, var(--accent) 35%, transparent)",
          }}
        >
          <Sparkles size={14} strokeWidth={2} />
        </span>
        <div className="text-[11px] font-semibold uppercase tracking-widelabel opacity-70">
          توصية gioco
        </div>
      </div>
      <h3 className="mt-[12px] text-[14px] font-semibold leading-[1.5]">
        زِد ميزانية TikTok بـ ١٨٪
      </h3>
      <p className="mt-[6px] text-[12.5px] leading-[1.7] opacity-80">
        TikTok يحقق أعلى ROAS (٥٫٨x) والمخزون لم يُستنفد بعد. نقل ١٨٪ من ميزانية
        Snap إلى TikTok قد يرفع التحويلات بـ ٢٤٪ دون زيادة CPA.
      </p>
      <button
        type="button"
        onClick={() =>
          toast({
            tone: "success",
            title: "تم تطبيق التوصية",
            description: "سيُعاد توزيع الميزانية تلقائيًا خلال ساعة.",
          })
        }
        className="mt-[14px] inline-flex items-center gap-[6px] rounded-[9px] bg-bg/10 px-[12px] py-[7px] text-[12.5px] font-semibold transition-colors hover:bg-bg/20"
      >
        تطبيق التوصية
        <ArrowLeft size={13} strokeWidth={2} />
      </button>
    </div>
  );
}
