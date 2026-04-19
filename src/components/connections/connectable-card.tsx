"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PlatformBadge,
  PLATFORM_NAME,
  type Platform,
} from "@/components/ui/platform-badge";
import { useConnectPlatform } from "@/lib/api";

const PLATFORMS: Array<{
  id: Platform;
  desc: string;
  highlights: string[];
}> = [
  {
    id: "snap",
    desc: "Snap Marketing API — فيديو عمودي للفئة ١٣-٣٤",
    highlights: ["OAuth 2.0", "تجديد تلقائي ٣٠ دقيقة", "Pixel + CAPI"],
  },
  {
    id: "tiktok",
    desc: "TikTok Business API — Campaign & Ad create API",
    highlights: ["Sandbox متاح", "رمز طويل العمر", "Events API"],
  },
  {
    id: "insta",
    desc: "Meta Marketing API — Instagram و Facebook",
    highlights: ["ads_management", "رمز ٦٠ يوم", "تنبيه قبل الانتهاء"],
  },
];

export function ConnectableList() {
  return (
    <div className="mb-[20px] grid gap-[14px]">
      {PLATFORMS.map((p) => (
        <ConnectableCard key={p.id} {...p} />
      ))}
    </div>
  );
}

function ConnectableCard({
  id,
  desc,
  highlights,
}: {
  id: Platform;
  desc: string;
  highlights: string[];
}) {
  const { mutate, isPending } = useConnectPlatform();
  return (
    <div className="flex flex-wrap items-start gap-[14px] rounded-card border border-line bg-panel p-[18px] shadow-token-sm">
      <PlatformBadge platform={id} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-[10px]">
          <h3 className="text-[15px] font-semibold">{PLATFORM_NAME[id]}</h3>
          <span className="rounded-full bg-chip px-[8px] py-[2px] text-[11px] font-semibold text-ink-3">
            غير متصل
          </span>
        </div>
        <p className="mt-[4px] text-[12.5px] text-ink-3">{desc}</p>
        <div className="mt-[8px] flex flex-wrap gap-[6px]">
          {highlights.map((h) => (
            <span
              key={h}
              className="mono rounded-full border border-line px-[8px] py-[2px] text-[11px] text-ink-2"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
      <Button
        variant="accent"
        size="sm"
        onClick={() => mutate(id)}
        disabled={isPending}
      >
        <Plus size={13} strokeWidth={2} />
        {isPending ? "جاري الربط…" : "ربط الحساب"}
      </Button>
    </div>
  );
}
