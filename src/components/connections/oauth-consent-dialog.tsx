"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import {
  PlatformBadge,
  PLATFORM_NAME,
  type Platform,
} from "@/components/ui/platform-badge";
import { PLATFORM_META } from "@/lib/connections-store";
import { useConnectPlatform } from "@/lib/api";
import { toast } from "@/components/ui/toast";

const SCOPE_LABELS: Record<string, string> = {
  "snapchat-marketing-api": "إدارة حملات Snap الإعلانية",
  "read_user": "قراءة الاسم والبريد للحساب التجاري",
  "user.info.basic": "معلومات الحساب الأساسية",
  "campaign.list": "قراءة الحملات",
  "campaign.create": "إنشاء وتعديل الحملات",
  "ad.list": "قراءة الإعلانات",
  "ad.create": "إنشاء وتعديل الإعلانات",
  "ads_management": "إدارة الحملات الإعلانية",
  "ads_read": "قراءة بيانات الإعلانات والقياسات",
  "business_management": "قراءة معلومات Business Manager",
  "instagram_basic": "قراءة معلومات حساب Instagram",
  "adwords": "إدارة حملات Google Ads",
  "youtube.readonly": "قراءة قنوات YouTube المرتبطة",
  "displayvideo": "إدارة Display & Video 360",
  "analytics.readonly": "قراءة تقارير Google Analytics",
};

type Stage = "consent" | "loading" | "success";

export function OAuthConsentDialog({
  platform,
  open,
  onOpenChange,
}: {
  platform: Platform | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [stage, setStage] = useState<Stage>("consent");
  const { mutateAsync } = useConnectPlatform();

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setStage("consent"), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!platform) return null;
  const meta = PLATFORM_META[platform];
  const name = PLATFORM_NAME[platform];

  const handleApprove = async () => {
    setStage("loading");
    await mutateAsync(platform);
    setStage("success");
    toast({
      tone: "success",
      title: `تم ربط ${name} بنجاح`,
      description: "ستبدأ المزامنة التلقائية خلال دقائق.",
    });
    setTimeout(() => onOpenChange(false), 900);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={stage === "consent" ? () => onOpenChange(false) : undefined}>
        <DialogHeader
          icon={<PlatformBadge platform={platform} size="md" />}
          title={
            stage === "success"
              ? `تم الربط بنجاح`
              : `ربط حساب ${name}`
          }
          subtitle={
            stage === "success"
              ? `${meta.accountName} متّصل الآن`
              : "هذه محاكاة تصميمية لـ OAuth consent screen — بدون خادم حقيقي"
          }
        />

        {stage === "consent" && (
          <>
            <DialogBody className="flex flex-col gap-[14px]">
              <div className="rounded-[10px] border border-line bg-bg/50 p-[12px]">
                <div className="text-[11.5px] text-ink-3">
                  سيُعيد {name} توجيهك إلى:
                </div>
                <div className="mono mt-[4px] flex items-center gap-[6px] text-[12px] text-ink-2">
                  <ExternalLink size={12} strokeWidth={1.8} />
                  app.gioco.ad/oauth/callback/{platform}
                </div>
              </div>

              <div>
                <div className="mb-[8px] flex items-center gap-[8px] text-[12.5px] font-semibold text-ink">
                  <ShieldCheck size={14} strokeWidth={1.8} className="text-accent" />
                  الصلاحيات المطلوبة
                </div>
                <ul className="flex flex-col gap-[8px]">
                  {meta.scopes.map((scope) => (
                    <li
                      key={scope}
                      className="flex items-start gap-[10px] rounded-[8px] bg-chip/40 px-[10px] py-[8px]"
                    >
                      <CheckCircle2
                        size={14}
                        strokeWidth={2}
                        className="mt-[2px] text-good"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[12.5px] font-medium text-ink">
                          {SCOPE_LABELS[scope] ?? scope}
                        </div>
                        <div className="mono mt-[2px] text-[10.5px] text-ink-4">
                          {scope}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />
              <p className="text-[11.5px] leading-[1.7] text-ink-3">
                بالضغط على «موافقة»، تسمح لـ gioco ads باستخدام هذه الصلاحيات.
                يمكنك إلغاء الربط في أي وقت من هذه الصفحة.
              </p>
            </DialogBody>
            <DialogFooter>
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                إلغاء
              </Button>
              <Button variant="accent" size="sm" onClick={handleApprove}>
                موافقة وربط
              </Button>
            </DialogFooter>
          </>
        )}

        {stage === "loading" && (
          <DialogBody className="flex flex-col items-center gap-[14px] py-[40px]">
            <Loader2 size={32} strokeWidth={1.8} className="animate-spin text-accent" />
            <div className="text-center">
              <div className="text-[14px] font-semibold">جاري الربط…</div>
              <div className="mt-[4px] text-[12px] text-ink-3">
                تبادل رموز الوصول وتجهيز المزامنة
              </div>
            </div>
          </DialogBody>
        )}

        {stage === "success" && (
          <DialogBody className="flex flex-col items-center gap-[12px] py-[36px]">
            <div className="grid h-[48px] w-[48px] place-items-center rounded-full bg-good-bg text-good">
              <CheckCircle2 size={22} strokeWidth={2} />
            </div>
            <div className="text-center">
              <div className="text-[14px] font-semibold">تم الربط</div>
              <div className="mt-[4px] text-[12px] text-ink-3">
                {meta.accountName}
              </div>
            </div>
          </DialogBody>
        )}
      </DialogContent>
    </Dialog>
  );
}
