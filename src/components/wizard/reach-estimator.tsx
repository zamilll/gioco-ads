"use client";

import { useFormContext } from "react-hook-form";
import { PlatformBadge, PLATFORM_NAME } from "@/components/ui/platform-badge";
import { SmallCapsLabel } from "@/components/ui/field";
import { Divider } from "@/components/ui/divider";
import { toArabicDigits } from "@/lib/utils";
import { PLATFORM_COLORS } from "@/lib/mock-data";
import type { CampaignDraft } from "@/lib/campaign-schema";

function estimateReach(draft: Partial<CampaignDraft>) {
  const basePerCountry = 380_000;
  const countryMult = (draft.audience?.countries?.length ?? 0) || 1;
  const ageSpan = draft.audience
    ? draft.audience.ageRange[1] - draft.audience.ageRange[0]
    : 15;
  const interestMult = 1 + Math.min(0.5, (draft.audience?.interests?.length ?? 0) * 0.04);
  const genderMult = draft.audience?.gender === "all" ? 1 : 0.55;
  const platformMult = (draft.platforms?.length ?? 0) || 0.7;

  const base =
    basePerCountry *
    countryMult *
    (ageSpan / 30) *
    interestMult *
    genderMult *
    platformMult;

  const lo = Math.max(50_000, Math.round(base * 0.75));
  const hi = Math.round(base * 1.18);
  return { lo, hi };
}

function formatKm(n: number) {
  if (n >= 1_000_000)
    return `${toArabicDigits((n / 1_000_000).toFixed(1))}M`;
  if (n >= 1_000) return `${toArabicDigits(Math.round(n / 1_000))}K`;
  return toArabicDigits(n);
}

export function ReachEstimator() {
  const { watch } = useFormContext<CampaignDraft>();
  const draft = watch();
  const { lo, hi } = estimateReach(draft);
  const amount = draft.budget?.amount ?? 0;
  const estClicks = Math.round((amount / 1.8) * (draft.platforms?.length || 1));
  const estConversions = Math.round(estClicks * 0.045);
  const pct = Math.min(100, Math.round(((lo + hi) / 2 / 5_000_000) * 100));

  const platforms = draft.platforms ?? [];

  return (
    <div className="sticky top-[66px] flex flex-col gap-[14px]">
      <div className="rounded-card border border-line bg-panel p-[16px] shadow-token-sm">
        <div className="flex items-center justify-between">
          <SmallCapsLabel>الوصول المتوقع / يوم</SmallCapsLabel>
          <span className="rounded-full bg-good-bg px-[8px] py-[2px] text-[11px] font-semibold text-good">
            تقدير مُحدث
          </span>
        </div>
        <div className="num mt-[10px] text-[22px] font-bold tracking-tightish">
          {formatKm(lo)} — {formatKm(hi)}
        </div>
        <p className="mt-[4px] text-[12px] text-ink-3">شخصًا مؤهلاً يوميًا</p>

        <div className="mt-[14px]">
          <svg viewBox="0 0 200 110" className="w-full">
            <path
              d="M 10 100 A 90 90 0 0 1 190 100"
              fill="none"
              stroke="var(--line)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 10 100 A 90 90 0 0 1 190 100"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 283} 283`}
            />
            <text
              x="100"
              y="92"
              textAnchor="middle"
              fill="var(--ink)"
              fontSize="18"
              fontWeight="600"
              fontFamily="var(--font-jetbrains-mono)"
            >
              {toArabicDigits(pct)}٪
            </text>
            <text
              x="100"
              y="106"
              textAnchor="middle"
              fill="var(--ink-3)"
              fontSize="10"
            >
              تغطية سوقية
            </text>
          </svg>
        </div>
      </div>

      <div className="rounded-card border border-line bg-panel p-[16px] shadow-token-sm">
        <SmallCapsLabel>التوقعات</SmallCapsLabel>
        <div className="mt-[10px] flex flex-col gap-[10px]">
          <SummaryRow
            label="حجم الجمهور"
            value={`${formatKm(lo)} — ${formatKm(hi)}`}
          />
          <Divider />
          <SummaryRow
            label="نقرات متوقعة / يوم"
            value={toArabicDigits(estClicks.toLocaleString("en-US"))}
            mono
          />
          <Divider />
          <SummaryRow
            label="تحويلات متوقعة / يوم"
            value={toArabicDigits(estConversions.toLocaleString("en-US"))}
            mono
          />
        </div>
      </div>

      {platforms.length > 0 ? (
        <div className="rounded-card border border-line bg-panel p-[16px] shadow-token-sm">
          <div className="flex items-center justify-between">
            <SmallCapsLabel>توزيع المنصات</SmallCapsLabel>
            <span className="rounded-full bg-chip px-[7px] py-[1px] text-[10.5px] text-ink-3">
              تلقائي
            </span>
          </div>
          <div className="mt-[12px] flex flex-col gap-[10px]">
            {platforms.map((p, i) => {
              const pct =
                platforms.length === 1
                  ? 100
                  : Math.round(100 / platforms.length) + (i === 0 ? 5 : -2);
              return (
                <div
                  key={p}
                  className="flex items-center gap-[10px] text-[12px]"
                >
                  <PlatformBadge platform={p} size="xs" />
                  <span className="w-[64px] text-ink-2">
                    {PLATFORM_NAME[p].replace(" Ads", "")}
                  </span>
                  <div className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-chip">
                    <div
                      className="absolute inset-y-0 start-0 rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: PLATFORM_COLORS[p],
                      }}
                    />
                  </div>
                  <span className="mono w-[38px] text-end text-ink-3">
                    {toArabicDigits(pct)}٪
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SummaryRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-[10px] text-[12.5px]">
      <span className="text-ink-3">{label}</span>
      <span
        className={`font-semibold text-ink ${mono ? "mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
