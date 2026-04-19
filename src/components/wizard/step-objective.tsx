"use client";

import { useFormContext } from "react-hook-form";
import { Check } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  OBJECTIVE_OPTIONS,
  type CampaignDraft,
} from "@/lib/campaign-schema";

export function StepObjective() {
  const { watch, setValue, formState } = useFormContext<CampaignDraft>();
  const value = watch("objective");
  const err = formState.errors.objective;

  return (
    <Card>
      <CardHeader
        title="اختر هدف الحملة"
        subtitle="كل هدف يُحسّن خوارزميات المنصات بشكل مختلف"
      />
      <CardBody>
        <div className="grid gap-[12px] md:grid-cols-2">
          {OBJECTIVE_OPTIONS.map((opt) => {
            const active = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setValue("objective", opt.value, { shouldValidate: true })
                }
                className={cn(
                  "group relative flex items-start gap-[12px] rounded-[12px] border bg-panel p-[14px] text-start transition-colors",
                  active
                    ? "border-accent bg-accent-soft/40"
                    : "border-line hover:border-line-2",
                )}
              >
                <span
                  className={cn(
                    "grid h-[40px] w-[40px] place-items-center rounded-[10px] text-[18px]",
                    active ? "bg-accent text-white" : "bg-chip",
                  )}
                >
                  {opt.icon}
                </span>
                <div className="flex-1">
                  <h4
                    className={cn(
                      "text-[13.5px] font-semibold",
                      active && "text-accent",
                    )}
                  >
                    {opt.title}
                  </h4>
                  <p className="mt-[4px] text-[12px] leading-[1.55] text-ink-3">
                    {opt.desc}
                  </p>
                </div>
                {active ? (
                  <span className="grid h-[20px] w-[20px] place-items-center rounded-full bg-accent text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        {err ? (
          <p className="mt-[10px] text-[12px] text-bad">
            يرجى اختيار هدف للحملة
          </p>
        ) : null}
      </CardBody>
    </Card>
  );
}
