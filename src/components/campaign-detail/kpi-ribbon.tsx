import { cn } from "@/lib/utils";

const METRICS: Array<{
  key: "spend" | "impressions" | "clicks" | "conversions" | "roas";
  label: string;
  highlighted?: boolean;
  delta?: { dir: "up" | "down"; value: string };
}> = [
  {
    key: "spend",
    label: "الإنفاق",
    delta: { dir: "up", value: "٦٫٣٪" },
  },
  {
    key: "impressions",
    label: "الظهور",
    delta: { dir: "up", value: "٤٫١٪" },
  },
  {
    key: "clicks",
    label: "النقرات",
    delta: { dir: "up", value: "٨٫٧٪" },
  },
  {
    key: "conversions",
    label: "التحويلات",
    delta: { dir: "up", value: "٥٫٢٪" },
  },
  {
    key: "roas",
    label: "ROAS",
    highlighted: true,
    delta: { dir: "up", value: "١٢٫٤٪" },
  },
];

export function KpiRibbon({
  values,
}: {
  values: Record<(typeof METRICS)[number]["key"], string>;
}) {
  return (
    <div className="mb-[18px] grid grid-cols-2 gap-[12px] md:grid-cols-5">
      {METRICS.map((m) => (
        <div
          key={m.key}
          className={cn(
            "rounded-card border px-[14px] py-[14px]",
            m.highlighted
              ? "border-accent bg-accent-soft"
              : "border-line bg-panel shadow-token-sm",
          )}
        >
          <div
            className={cn(
              "text-[11.5px] font-medium",
              m.highlighted ? "text-accent" : "text-ink-3",
            )}
          >
            {m.label}
          </div>
          <div
            className={cn(
              "num mt-[6px] text-[22px] font-bold tracking-tightish",
              m.highlighted ? "text-accent" : "text-ink",
            )}
          >
            {values[m.key]}
          </div>
          {m.delta ? (
            <div
              className={cn(
                "mt-[6px] inline-flex items-center gap-[4px] rounded-full px-[7px] py-[1px] text-[11px] font-semibold",
                m.delta.dir === "up"
                  ? "bg-good-bg text-good"
                  : "bg-bad-bg text-bad",
              )}
            >
              {m.delta.dir === "up" ? "▲" : "▼"} {m.delta.value}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
