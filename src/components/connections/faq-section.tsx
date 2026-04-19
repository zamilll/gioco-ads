"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { faqItems } from "@/lib/mock-connections";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <Card>
      <CardHeader title="أسئلة شائعة" subtitle="الأسئلة الأكثر تكرارًا" />
      <div className="divide-y divide-line">
        {faqItems.map((item, i) => {
          const open = openIndex === i;
          return (
            <button
              key={item.q}
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="block w-full px-[18px] py-[14px] text-start"
            >
              <div className="flex items-center gap-[12px]">
                <span className="flex-1 text-[13.5px] font-semibold text-ink">
                  {item.q}
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.8}
                  className={cn(
                    "text-ink-3 transition-transform",
                    open && "rotate-180 text-ink",
                  )}
                />
              </div>
              {open ? (
                <p className="mt-[8px] text-[12.5px] leading-[1.7] text-ink-3">
                  {item.a}
                </p>
              ) : null}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
