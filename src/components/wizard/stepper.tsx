"use client";

import { Check } from "lucide-react";
import { cn, toArabicDigits } from "@/lib/utils";

export interface StepDef {
  id: number;
  title: string;
  subtitle: string;
}

export const CAMPAIGN_STEPS: StepDef[] = [
  { id: 1, title: "الهدف", subtitle: "ماذا تريد أن تحقق؟" },
  { id: 2, title: "المنصات", subtitle: "أين تُنشر الحملة؟" },
  { id: 3, title: "الجمهور المستهدف", subtitle: "من تريد أن يشاهدها؟" },
  { id: 4, title: "الميزانية والجدولة", subtitle: "كم وإلى متى؟" },
  { id: 5, title: "الإبداع", subtitle: "الفيديو أو الصورة والنسخة" },
  { id: 6, title: "مراجعة ونشر", subtitle: "تأكيد قبل النشر" },
];

export function Stepper({
  current,
  steps,
  onSelect,
}: {
  current: number;
  steps: StepDef[];
  onSelect?: (id: number) => void;
}) {
  return (
    <div className="sticky top-[66px] rounded-card border border-line bg-panel p-[14px] shadow-token-sm">
      <div className="mb-[12px] text-[11px] font-semibold uppercase tracking-widelabel text-ink-4">
        خطوات الإنشاء
      </div>
      <ol className="relative">
        {steps.map((step, idx) => {
          const isDone = step.id < current;
          const isCurrent = step.id === current;
          const isLast = idx === steps.length - 1;
          return (
            <li
              key={step.id}
              className={cn(
                "relative flex gap-[12px] pb-[14px]",
                !isLast && "before:absolute before:start-[9px] before:top-[22px] before:h-[calc(100%-22px)] before:w-[1.5px] before:bg-line",
                isDone && !isLast && "before:bg-accent",
              )}
            >
              <button
                type="button"
                onClick={() => onSelect?.(step.id)}
                disabled={!onSelect || step.id > current}
                className={cn(
                  "relative z-10 grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full border text-[11px] font-bold transition-colors",
                  isDone && "border-accent bg-accent text-white",
                  isCurrent && "border-accent bg-panel text-accent",
                  !isDone && !isCurrent && "border-line-2 bg-panel text-ink-4",
                  onSelect && step.id <= current && "cursor-pointer",
                )}
                aria-label={step.title}
              >
                {isDone ? (
                  <Check size={11} strokeWidth={3} />
                ) : (
                  <span>{toArabicDigits(step.id)}</span>
                )}
              </button>
              <div
                className={cn(
                  "flex-1 rounded-[8px] px-[10px] py-[2px]",
                  isCurrent && "bg-accent-soft",
                )}
              >
                <div
                  className={cn(
                    "text-[13px]",
                    isCurrent
                      ? "font-semibold text-accent"
                      : isDone
                        ? "font-medium text-ink"
                        : "text-ink-3",
                  )}
                >
                  {step.title}
                </div>
                <div className="mt-[1px] text-[11.5px] text-ink-3">
                  {step.subtitle}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
