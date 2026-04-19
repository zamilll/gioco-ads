import { Play } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { PlatformBadge } from "@/components/ui/platform-badge";
import type { CreativeCard } from "@/lib/mock-campaign-detail";

export function CreativesGrid({ creatives }: { creatives: CreativeCard[] }) {
  return (
    <Card className="mb-[18px]">
      <CardHeader
        title="الإبداعات"
        subtitle={`${creatives.length} إبداع نشط`}
        actions={
          <button
            type="button"
            className="text-[12px] font-semibold text-accent hover:underline"
          >
            عرض الكل
          </button>
        }
      />
      <div className="grid gap-[12px] p-[14px] sm:grid-cols-2 lg:grid-cols-3">
        {creatives.map((cr) => (
          <div
            key={cr.id}
            className="flex flex-col overflow-hidden rounded-[12px] border border-line bg-panel transition-shadow hover:shadow-token-md"
          >
            <div
              className="relative aspect-[9/11] w-full"
              style={{ backgroundImage: cr.thumb, backgroundSize: "cover" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30" />
              <div className="absolute inset-x-[10px] top-[10px] flex items-center justify-between">
                <PlatformBadge platform={cr.platform} size="xs" />
                {cr.duration !== "—" ? (
                  <span className="mono inline-flex items-center gap-[4px] rounded-full bg-black/50 px-[7px] py-[2px] text-[10.5px] text-white backdrop-blur">
                    <Play size={9} strokeWidth={2.5} fill="white" />
                    {cr.duration}
                  </span>
                ) : (
                  <span className="rounded-full bg-black/50 px-[7px] py-[2px] text-[10.5px] text-white backdrop-blur">
                    صورة
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[6px] p-[12px]">
              <h4 className="line-clamp-1 text-[13px] font-semibold">
                {cr.title}
              </h4>
              <p className="line-clamp-1 text-[11.5px] text-ink-3">
                {cr.subtitle}
              </p>
              <div className="mt-[4px] flex items-center justify-between border-t border-line pt-[8px]">
                <div>
                  <div className="text-[10.5px] text-ink-3">CTR</div>
                  <div className="mono text-[12.5px] font-semibold">
                    {cr.ctr}
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-[10.5px] text-ink-3">ROAS</div>
                  <div className="mono text-[12.5px] font-semibold text-good">
                    {cr.roas}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
