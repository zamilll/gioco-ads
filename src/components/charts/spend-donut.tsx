"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { spendDistribution } from "@/lib/mock-data";
import { toArabicDigits } from "@/lib/utils";

export function SpendDonut() {
  return (
    <div className="flex items-center gap-[18px]">
      <div className="relative h-[150px] w-[150px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={spendDistribution}
              dataKey="value"
              innerRadius={48}
              outerRadius={64}
              paddingAngle={2}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {spendDistribution.map((s) => (
                <Cell key={s.name} fill={s.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] text-ink-3">الإجمالي</span>
          <span className="num text-[14px] font-bold">
            {toArabicDigits("74.8K")}
          </span>
        </div>
      </div>
      <div className="flex-1 space-y-[6px]">
        {spendDistribution.map((s) => (
          <div
            key={s.name}
            className="grid grid-cols-[110px_1fr_64px] items-center gap-[10px] py-[6px] text-[12.5px]"
          >
            <span>
              {s.name}{" "}
              <b className="num float-start text-ink-3">
                {toArabicDigits(s.pct.toFixed(1))}٪
              </b>
            </span>
            <div className="relative h-[8px] overflow-hidden rounded-full bg-chip">
              <span
                className="absolute inset-y-0 end-0 rounded-full"
                style={{ width: `${s.pct}%`, background: s.color }}
              />
            </div>
            <span className="num text-end text-ink-3">
              {toArabicDigits((s.value / 1000).toFixed(1))}K
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
