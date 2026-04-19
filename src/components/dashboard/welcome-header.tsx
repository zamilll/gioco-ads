"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";

type Range = "today" | "7d" | "30d" | "90d";

const ranges = [
  { value: "today" as const, label: "اليوم" },
  { value: "7d" as const, label: "٧ أيام" },
  { value: "30d" as const, label: "٣٠ يوم" },
  { value: "90d" as const, label: "٩٠ يوم" },
];

export function WelcomeHeader() {
  const [range, setRange] = useState<Range>("30d");
  return (
    <div className="mb-[20px] flex items-end justify-between gap-[20px]">
      <div>
        <h1 className="m-0 mb-[4px] text-[24px] font-bold tracking-tightish text-pretty">
          مرحبًا مها ✦ أداء اليوم لافت
        </h1>
        <p className="m-0 text-[13.5px] text-ink-3">
          الإنفاق الكلي عبر المنصات الثلاث لآخر ٧ أيام — المعدلات تتفوق على خط
          الأساس.
        </p>
      </div>
      <div className="flex items-center gap-[8px]">
        <Segmented items={ranges} value={range} onChange={setRange} />
        <Button variant="ghost">
          <Download size={13} strokeWidth={1.8} />
          تصدير
        </Button>
      </div>
    </div>
  );
}
