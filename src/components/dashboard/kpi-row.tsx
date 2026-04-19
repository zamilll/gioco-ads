import { KpiCard } from "@/components/ui/kpi-card";
import { Sparkline } from "@/components/charts/sparkline";
import { kpis } from "@/lib/mock-data";

export function KpiRow() {
  return (
    <div className="mb-[16px] grid grid-cols-4 gap-[14px]">
      {kpis.map((k, idx) => (
        <KpiCard
          key={k.label}
          label={k.label}
          value={k.value}
          deltaLabel={k.deltaLabel}
          deltaDirection={k.deltaDirection}
          meta={k.meta}
          dotColor={k.dotColor}
          spark={
            <Sparkline
              values={k.spark.values}
              color={k.spark.color}
              filled={idx === 0}
            />
          }
        />
      ))}
    </div>
  );
}
