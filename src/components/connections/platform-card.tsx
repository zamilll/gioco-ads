"use client";

import { useState } from "react";
import {
  AlertTriangle,
  RefreshCw,
  Settings,
  Unlink,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import {
  PlatformBadge,
  PLATFORM_NAME,
} from "@/components/ui/platform-badge";
import { StatusChip } from "@/components/ui/status-chip";
import { SmallCapsLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { cn, toArabicDigits } from "@/lib/utils";
import {
  useDisconnectPlatform,
  useRefreshToken,
  useResync,
} from "@/lib/api";
import type { Connection } from "@/lib/types";

export function PlatformCard({ connection }: { connection: Connection }) {
  const [disconnectOpen, setDisconnectOpen] = useState(false);
  const { mutateAsync: disconnect, isPending: isDisconnecting } =
    useDisconnectPlatform();
  const { mutateAsync: refresh, isPending: isRefreshing } = useRefreshToken();
  const { mutateAsync: resync, isPending: isResyncing } = useResync();

  const isExpiring = connection.status === "expiring";
  const name = PLATFORM_NAME[connection.platform];

  const handleDisconnect = async () => {
    await disconnect(connection.platform);
    toast({
      tone: "info",
      title: `تم فصل ${name}`,
      description: "توقفت المزامنة. يمكنك إعادة الربط في أي وقت.",
    });
    setDisconnectOpen(false);
  };

  const handleRefresh = async () => {
    await refresh(connection.platform);
    toast({
      tone: "success",
      title: `تم تجديد صلاحية ${name}`,
      description: "الرمز صالح الآن لفترة جديدة.",
    });
  };

  const handleResync = async () => {
    await resync(connection.platform);
    toast({
      tone: "success",
      title: `جاري مزامنة ${name}`,
      description: "ستكتمل خلال دقائق قليلة.",
    });
  };

  return (
    <>
      <div
        className={cn(
          "rounded-card border bg-panel shadow-token-sm",
          isExpiring
            ? "border-warn-bg shadow-[0_2px_8px_color-mix(in_oklab,var(--warn)_16%,transparent)]"
            : "border-line",
        )}
      >
        {isExpiring && (
          <div className="flex items-center gap-[10px] rounded-t-card border-b border-warn-bg bg-warn-bg px-[18px] py-[10px] text-warn">
            <AlertTriangle size={16} strokeWidth={2} />
            <span className="text-[12.5px] font-semibold">
              رمز الوصول ينتهي خلال ٣ أيام
            </span>
            <Button
              variant="accent"
              size="xs"
              className="ms-auto"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? "جاري التجديد…" : "تجديد الصلاحية"}
            </Button>
          </div>
        )}

        <div className="flex flex-wrap items-start gap-[14px] px-[18px] py-[16px]">
          <PlatformBadge platform={connection.platform} size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-[10px]">
              <h3 className="text-[15px] font-semibold">{name}</h3>
              <StatusChip status={isExpiring ? "draft" : "live"} />
              <span className="text-[12px] text-ink-3">
                متصل منذ {connection.connectedAt}
              </span>
            </div>
            <div className="mt-[6px] flex flex-wrap items-center gap-[10px] text-[12.5px] text-ink-3">
              <span>{connection.accountName}</span>
              <span className="text-ink-4">·</span>
              <span className="mono text-ink-4">{connection.accountId}</span>
            </div>
          </div>

          <div className="flex items-center gap-[6px]">
            <IconButton
              aria-label="إعادة المزامنة"
              onClick={handleResync}
              disabled={isResyncing}
            >
              <RefreshCw
                size={14}
                strokeWidth={1.8}
                className={isResyncing ? "animate-spin" : ""}
              />
            </IconButton>
            <IconButton
              aria-label="الإعدادات"
              onClick={() =>
                toast({
                  tone: "info",
                  title: "إعدادات الاتصال",
                  description: "ستتوفر صفحة إعدادات تفصيلية قريبًا.",
                })
              }
            >
              <Settings size={14} strokeWidth={1.8} />
            </IconButton>
            <IconButton
              aria-label="فصل الحساب"
              tone="bad"
              onClick={() => setDisconnectOpen(true)}
            >
              <Unlink size={14} strokeWidth={1.8} />
            </IconButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[1px] border-y border-line bg-line md:grid-cols-5">
          <Stat
            label="الحسابات"
            value={toArabicDigits(connection.adAccounts)}
          />
          <Stat label="آخر مزامنة" value={connection.lastSyncAt} />
          <Stat
            label="Pixel"
            value={connection.pixelActive ? "مفعّل" : "غير مفعّل"}
            tone={connection.pixelActive ? "good" : "muted"}
          />
          <Stat
            label="Events API"
            value={connection.eventsApi ? "مفعّل" : "غير متاح"}
            tone={connection.eventsApi ? "good" : "muted"}
          />
          <Stat
            label="انتهاء الصلاحية"
            value={connection.tokenExpiresAt}
            tone={isExpiring ? "warn" : "muted"}
          />
        </div>

        <div className="flex flex-wrap items-start gap-[12px] px-[18px] py-[14px]">
          <div className="min-w-0 flex-1">
            <SmallCapsLabel>الصلاحيات الممنوحة</SmallCapsLabel>
            <div className="mt-[8px] flex flex-wrap gap-[6px]">
              {connection.scopes.map((s) => (
                <span
                  key={s}
                  className="mono rounded-full bg-chip px-[8px] py-[3px] text-[11px] text-ink-2"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="self-end"
            onClick={() =>
              toast({
                tone: "info",
                title: "تعديل الصلاحيات",
                description: "ستفتح صفحة Re-consent مع المنصة قريبًا.",
              })
            }
          >
            <Pencil size={13} strokeWidth={1.8} />
            تعديل
          </Button>
        </div>
      </div>

      <Dialog open={disconnectOpen} onOpenChange={setDisconnectOpen}>
        <DialogContent
          onClose={
            isDisconnecting ? undefined : () => setDisconnectOpen(false)
          }
        >
          <DialogHeader
            icon={
              <span className="grid h-[32px] w-[32px] place-items-center rounded-[9px] bg-bad-bg text-bad">
                <Unlink size={15} strokeWidth={1.8} />
              </span>
            }
            title={`فصل ${name}؟`}
            subtitle="ستتوقف المزامنة، ولن تُحذف الحملات في المنصة الأصلية."
          />
          <DialogBody>
            <ul className="flex flex-col gap-[6px] text-[12.5px] text-ink-2">
              <li>• ستتوقف مزامنة البيانات فورًا.</li>
              <li>• ستُعطّل الحملات المرتبطة داخل gioco.</li>
              <li>• يمكنك إعادة الربط لاحقًا بنفس أو حساب آخر.</li>
            </ul>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDisconnectOpen(false)}
              disabled={isDisconnecting}
            >
              إلغاء
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={handleDisconnect}
              disabled={isDisconnecting}
              className="!bg-bad"
            >
              {isDisconnecting ? "جاري الفصل…" : "نعم، افصل"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Stat({
  label,
  value,
  tone = "muted",
}: {
  label: string;
  value: string;
  tone?: "good" | "warn" | "muted";
}) {
  const color =
    tone === "good" ? "text-good" : tone === "warn" ? "text-warn" : "text-ink";
  return (
    <div className="bg-panel px-[14px] py-[10px]">
      <div className="text-[11px] text-ink-3">{label}</div>
      <div className={cn("mt-[2px] text-[12.5px] font-semibold", color)}>
        {value}
      </div>
    </div>
  );
}
