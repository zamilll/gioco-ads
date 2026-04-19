import { Plus } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { morePlatforms } from "@/lib/mock-connections";

const SECONDARY_IDS = new Set(["facebook", "x", "youtube", "linkedin"]);

export function MorePlatforms() {
  const items = morePlatforms.filter((p) => SECONDARY_IDS.has(p.id));
  return (
    <Card className="mb-[20px]">
      <CardHeader
        title="المزيد من المنصات للربط"
        subtitle="قريبًا أو متاحة حسب خطتك"
      />
      <div className="grid gap-[12px] p-[18px] md:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <button
            key={p.id}
            type="button"
            className="group flex items-start gap-[10px] rounded-[12px] border border-dashed border-line-2 bg-panel p-[14px] text-start transition-colors hover:border-ink-3 hover:bg-chip/40"
          >
            <span
              className="grid h-[34px] w-[34px] place-items-center rounded-[10px] text-[13px] font-bold"
              style={{ background: p.bg, color: p.color }}
            >
              {p.name[0]}
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="text-[13.5px] font-semibold">{p.name}</h4>
              <p className="mt-[2px] text-[12px] text-ink-3">{p.desc}</p>
            </div>
            <span className="grid h-[24px] w-[24px] place-items-center rounded-full bg-chip text-ink-3 group-hover:bg-accent-soft group-hover:text-accent">
              <Plus size={14} strokeWidth={2} />
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
