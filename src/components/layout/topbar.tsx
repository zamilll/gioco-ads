"use client";

import { Bell, Search } from "lucide-react";
import { toast } from "@/components/ui/toast";

export function Topbar({ crumbTitle }: { crumbTitle: string }) {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-[14px] border-b border-line bg-bg/80 px-[28px] py-[14px] backdrop-blur">
      <div className="flex items-center gap-[8px] text-[13px] text-ink-3">
        <span>الفضاءات</span>
        <span className="text-ink-4">›</span>
        <span>واعد للتسويق</span>
        <span className="text-ink-4">›</span>
        <b className="font-semibold text-ink">{crumbTitle}</b>
      </div>

      <div className="ms-auto flex w-[280px] items-center gap-[8px] rounded-[10px] border border-line bg-panel px-[12px] py-[7px] text-ink-3">
        <Search size={14} strokeWidth={1.8} />
        <input
          type="text"
          placeholder="بحث عن حملة، مجموعة، أو إبداع…"
          className="w-full border-0 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
        />
        <kbd className="mono rounded-[5px] bg-chip px-[6px] py-[2px] text-[10px] text-ink-3">
          ⌘K
        </kbd>
      </div>

      <button
        type="button"
        aria-label="الإشعارات"
        onClick={() =>
          toast({
            tone: "info",
            title: "لا توجد إشعارات",
            description: "ستصلك هنا تنبيهات الأداء وانتهاء الصلاحيات.",
          })
        }
        className="grid h-[34px] w-[34px] place-items-center rounded-[9px] border border-line bg-panel text-ink-2 hover:border-line-2 hover:text-ink"
      >
        <Bell size={15} strokeWidth={1.7} />
      </button>

      <div
        className="grid h-[30px] w-[30px] place-items-center rounded-full text-[12px] font-semibold text-white"
        style={{ background: "linear-gradient(135deg, #D6AE7B, #8A6D43)" }}
      >
        و
      </div>
    </div>
  );
}
