"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PlatformBadge,
  PLATFORM_NAME,
  type Platform,
} from "@/components/ui/platform-badge";
import { cn } from "@/lib/utils";
import type { CampaignDraft } from "@/lib/campaign-schema";

const PLATFORMS: Array<{
  id: Platform;
  desc: string;
  spec: string;
  reach: string;
}> = [
  {
    id: "snap",
    desc: "الوصول اليومي ٨٩٢K · الفئة ١٣-٣٤ · فيديو عمودي",
    spec: "٩:١٦ · حد أقصى ١٨٠ ثانية · MP4",
    reach: "٣٢٪ من الشباب الخليجي",
  },
  {
    id: "tiktok",
    desc: "الوصول اليومي ١٫٠٢M · CTR ٧٫٤٪ · فيديو",
    spec: "٩:١٦ · حد أقصى ٦٠ ثانية · MP4",
    reach: "أعلى تفاعل في المنطقة",
  },
  {
    id: "insta",
    desc: "الوصول اليومي ٥٦٨K · Reels/Stories",
    spec: "١:١ أو ٤:٥ أو ٩:١٦ · Carousel مدعوم",
    reach: "الفئة ٢٥-٤٤ الأعلى قيمة",
  },
  {
    id: "google",
    desc: "Search + YouTube + Display — نطاق واسع عالي النية",
    spec: "Search text · YouTube skippable ≤٣٠s · Display 300×250 وغيرها",
    reach: "أعلى نية شرائية (بحث)",
  },
];

export function StepPlatforms() {
  const { watch, setValue, formState } = useFormContext<CampaignDraft>();
  const selected = watch("platforms") ?? [];
  const err = formState.errors.platforms;

  const toggle = (p: Platform) => {
    const next = selected.includes(p)
      ? selected.filter((x) => x !== p)
      : [...selected, p];
    setValue("platforms", next, { shouldValidate: true });
  };

  return (
    <Card>
      <CardHeader
        title="المنصات المستهدفة"
        subtitle="يمكن اختيار منصة واحدة أو أكثر — تُنشر بالتوازي"
      />
      <CardBody className="flex flex-col gap-[10px]">
        {PLATFORMS.map((p) => {
          const active = selected.includes(p.id);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => toggle(p.id)}
              className={cn(
                "flex items-start gap-[14px] rounded-[12px] border bg-panel p-[14px] text-start transition-colors",
                active
                  ? "border-accent bg-accent-soft/30"
                  : "border-line hover:border-line-2",
              )}
            >
              <PlatformBadge platform={p.id} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-[8px]">
                  <h4 className="text-[13.5px] font-semibold">
                    {PLATFORM_NAME[p.id]}
                  </h4>
                  <span className="rounded-full bg-good-bg px-[8px] py-[2px] text-[10.5px] font-semibold text-good">
                    {p.reach}
                  </span>
                </div>
                <p className="mt-[4px] text-[12px] text-ink-3">{p.desc}</p>
                <p className="mono mt-[4px] text-[11.5px] text-ink-4">
                  {p.spec}
                </p>
              </div>
              <Checkbox checked={active} onCheckedChange={() => toggle(p.id)} />
            </button>
          );
        })}
        {err ? (
          <p className="text-[12px] text-bad">{err.message as string}</p>
        ) : null}
      </CardBody>
    </Card>
  );
}
