"use client";

import { Pencil, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { StatusChip } from "@/components/ui/status-chip";
import { PlatformBadge } from "@/components/ui/platform-badge";
import { toast } from "@/components/ui/toast";
import { useCampaignDetailUI } from "@/lib/stores";
import { useToggleCampaignActive } from "@/lib/api";
import type { CampaignDetail } from "@/lib/types";

export function CampaignHeader({ campaign }: { campaign: CampaignDetail }) {
  const { active, setActive } = useCampaignDetailUI();
  const { mutate: toggle } = useToggleCampaignActive(campaign.id);

  const handleToggle = (v: boolean) => {
    setActive(v);
    toggle(v);
    toast({
      tone: v ? "success" : "info",
      title: v ? "تم تفعيل الحملة" : "تم إيقاف الحملة",
      description: v
        ? "سيستأنف العرض خلال دقائق."
        : "لن يُعرض الإعلان حتى إعادة التفعيل.",
    });
  };

  return (
    <div className="mb-[18px] flex flex-wrap items-start gap-[14px] rounded-card border border-line bg-panel p-[18px] shadow-token-sm">
      <div
        className="h-[56px] w-[56px] shrink-0 rounded-[12px] ring-1 ring-line"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #EEE5C7 0 6px, #D8CEB2 6px 12px)",
        }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-[10px]">
          <h1 className="text-[22px] font-bold tracking-tightish">
            {campaign.name}
          </h1>
          <StatusChip status={active ? "live" : "paused"} />
        </div>
        <div className="mt-[6px] flex flex-wrap items-center gap-[10px] text-[12.5px] text-ink-3">
          <span>الإنشاء: {campaign.createdAt}</span>
          <span className="text-ink-4">·</span>
          <span>{campaign.createdBy}</span>
          <span className="text-ink-4">·</span>
          <span>{campaign.objective}</span>
          <span className="text-ink-4">·</span>
          <span>ينتهي: {campaign.endsAt}</span>
        </div>
        <div className="mt-[10px] flex items-center gap-[6px]">
          {campaign.platforms.map((p) => (
            <PlatformBadge key={p} platform={p} size="sm" />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-[8px]">
        <div className="inline-flex items-center gap-[8px] rounded-[10px] border border-line bg-panel px-[10px] py-[6px]">
          <span className="text-[12.5px] text-ink-2">نشطة</span>
          <Switch
            checked={active}
            onCheckedChange={handleToggle}
            aria-label="تشغيل/إيقاف الحملة"
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            toast({
              tone: "info",
              title: "تعديل الحملة",
              description: "ستُفتح شاشة تحرير شاملة مع خطوات الـ Wizard.",
            })
          }
        >
          <Pencil size={13} strokeWidth={1.8} />
          تعديل
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            toast({
              tone: "info",
              title: "تقرير الحملة",
              description: "سيُصدَّر التقرير بصيغة PDF.",
            })
          }
        >
          <FileText size={13} strokeWidth={1.8} />
          تقرير
        </Button>
        <Button
          variant="accent"
          size="sm"
          onClick={() =>
            toast({
              tone: "info",
              title: "إبداع جديد",
              description: "ارفع فيديو أو صورة لإضافته للحملة.",
            })
          }
        >
          <Plus size={13} strokeWidth={2} />
          إبداع جديد
        </Button>
      </div>
    </div>
  );
}
