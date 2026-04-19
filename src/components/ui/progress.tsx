import { cn } from "@/lib/utils";

export function Progress({
  value,
  tone = "accent",
  className,
}: {
  value: number;
  tone?: "accent" | "warn" | "paused";
  className?: string;
}) {
  const fill =
    tone === "warn"
      ? "bg-warn"
      : tone === "paused"
        ? "bg-ink-4"
        : "bg-accent";
  return (
    <div
      className={cn(
        "h-[6px] w-full overflow-hidden rounded-full bg-chip",
        className,
      )}
    >
      <div
        className={cn("h-full rounded-full", fill)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
