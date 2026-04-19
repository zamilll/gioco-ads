import { cn } from "@/lib/utils";

export type StatusKind = "live" | "paused" | "draft" | "ended";

const LABEL: Record<StatusKind, string> = {
  live: "نشطة",
  paused: "متوقفة",
  draft: "مسودة",
  ended: "منتهية",
};

const STYLES: Record<StatusKind, string> = {
  live: "bg-good-bg text-good",
  paused: "bg-chip text-ink-3",
  draft: "bg-warn-bg text-warn",
  ended: "bg-bad-bg text-bad",
};

export function StatusChip({
  status,
  className,
}: {
  status: StatusKind;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[6px] rounded-full px-[9px] py-[3px] text-[11.5px] font-semibold",
        STYLES[status],
        className,
      )}
    >
      {status === "live" && (
        <span className="h-[5px] w-[5px] rounded-full bg-good dot-pulse" />
      )}
      {status === "paused" && <span>●</span>}
      {status === "draft" && <span>◐</span>}
      {LABEL[status]}
    </span>
  );
}
