"use client";

import {
  AlertTriangle,
  RefreshCw,
  Settings,
  Unlink,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";
import {
  PlatformBadge,
  PLATFORM_NAME,
} from "@/components/ui/platform-badge";
import { StatusChip } from "@/components/ui/status-chip";
import { SmallCapsLabel } from "@/components/ui/field";
import { cn, toArabicDigits } from "@/lib/utils";
import { useDisconnectPlatform, useRefreshToken, useResync } from "@/lib/api";
import type { Connection } from "@/lib/types";

export function PlatformCard({ connection }: { connection: Connection }) {
  const { mutate: disconnect, isPending: isDisconnecting } =
    useDisconnectPlatform();
  const { mutate: refresh, isPending: isRefreshing } = useRefreshToken();
  const { mutate: resync, isPending: isResyncing } = useResync();

  const isExpiring = connection.status === "expiring";

  return (
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
            onClick={() => refresh(connection.platform)}
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
            <h3 className="text-[15px] font-semibold">
              {PLATFORM_NAME[connection.platform]}
            </h3>
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
            onClick={() => resync(connection.platform)}
            disabled={isResyncing}
          >
            <RefreshCw
              size={14}
              strokeWidth={1.8}
              className={isResyncing ? "animate-spin" : ""}
            />
          </IconButton>
          <IconButton aria-label="الإعدادات">
            <Settings size={14} strokeWidth={1.8} />
          </IconButton>
          <IconButton
            aria-label="فصل الحساب"
            tone="bad"
            onClick={() => disconnect(connection.platform)}
            disabled={isDisconnecting}
          >
            <Unlink size={14} strokeWidth={1.8} />
          </IconButton>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[1px] border-y border-line bg-line md:grid-cols-5">
        <Stat label="الحسابات" value={toArabicDigits(connection.adAccounts)} />
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
        <Button variant="ghost" size="sm" className="self-end">
          <Pencil size={13} strokeWidth={1.8} />
          تعديل
        </Button>
      </div>
    </div>
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
