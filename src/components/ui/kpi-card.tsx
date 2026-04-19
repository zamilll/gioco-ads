import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  deltaLabel,
  deltaDirection,
  meta,
  dotColor,
  spark,
}: {
  label: string;
  value: React.ReactNode;
  deltaLabel: string;
  deltaDirection: "up" | "down";
  meta?: React.ReactNode;
  dotColor?: string;
  spark?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-card border border-line bg-panel px-[18px] pb-[44px] pt-[16px] shadow-token-sm">
      <div className="flex items-center gap-[8px] text-[12.5px] font-medium text-ink-3">
        <span
          className="h-[6px] w-[6px] rounded-full"
          style={{ background: dotColor ?? "var(--ink-4)" }}
        />
        {label}
      </div>
      <div className="num mt-[8px] text-[28px] font-semibold tracking-tightish">
        {value}
      </div>
      <div className="mt-[10px] flex items-center justify-between text-[12px] text-ink-3">
        {deltaLabel && deltaLabel !== "—" ? (
          <span
            className={cn(
              "inline-flex items-center gap-[4px] rounded-full px-[7px] py-[2px] text-[12px] font-semibold",
              deltaDirection === "up"
                ? "bg-good-bg text-good"
                : "bg-bad-bg text-bad",
            )}
          >
            {deltaDirection === "up" ? "▲" : "▼"} {deltaLabel}
          </span>
        ) : (
          <span className="text-[11.5px] text-ink-4">—</span>
        )}
        {meta ? <span>{meta}</span> : null}
      </div>
      {spark ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34px] opacity-80">
          {spark}
        </div>
      ) : null}
    </div>
  );
}
