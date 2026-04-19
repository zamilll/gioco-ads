"use client";

import { useFormContext } from "react-hook-form";
import { Calendar, Wallet } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Segmented } from "@/components/ui/segmented";
import { cn, toArabicDigits } from "@/lib/utils";
import type { CampaignDraft } from "@/lib/campaign-schema";

const BUDGET_PRESETS = [100, 200, 500, 1000, 2500];

export function StepBudget() {
  const { register, watch, setValue, formState } =
    useFormContext<CampaignDraft>();
  const budget = watch("budget");
  const errors = formState.errors.budget;

  const daily =
    budget.type === "daily" ? budget.amount : Math.round(budget.amount / 30);
  const monthly = daily * 30;

  return (
    <Card>
      <CardHeader
        title="الميزانية والجدولة"
        subtitle="حدد الإنفاق وتاريخ البداية/النهاية"
      />
      <CardBody className="flex flex-col gap-[18px]">
        <Field label="نوع الميزانية" required>
          <Segmented
            items={[
              { value: "daily", label: "يومية" },
              { value: "lifetime", label: "إجمالية" },
            ]}
            value={budget.type}
            onChange={(v) =>
              setValue("budget.type", v as typeof budget.type, {
                shouldValidate: true,
              })
            }
            className="w-full justify-stretch [&>button]:flex-1"
          />
        </Field>

        <Field
          label="المبلغ (ر.س)"
          required
          error={errors?.amount?.message as string}
          hint={
            <span className="num">
              تقديريًا {toArabicDigits(monthly.toLocaleString("en-US"))} ر.س /
              شهر
            </span>
          }
        >
          <div className="relative">
            <Wallet
              size={14}
              strokeWidth={1.8}
              className="absolute top-1/2 end-[12px] -translate-y-1/2 text-ink-3"
            />
            <Input
              type="number"
              min={20}
              step={10}
              className="mono pe-[36px] text-[15px] font-semibold"
              {...register("budget.amount", { valueAsNumber: true })}
            />
          </div>
          <div className="mt-[10px] flex flex-wrap gap-[6px]">
            {BUDGET_PRESETS.map((p) => {
              const active = budget.amount === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() =>
                    setValue("budget.amount", p, { shouldValidate: true })
                  }
                  className={cn(
                    "mono rounded-full border px-[10px] py-[4px] text-[12px] transition-colors",
                    active
                      ? "border-accent bg-accent text-white"
                      : "border-line bg-panel text-ink-2 hover:border-line-2",
                  )}
                >
                  {toArabicDigits(p.toLocaleString("en-US"))} ر.س
                </button>
              );
            })}
          </div>
        </Field>

        <div className="grid gap-[14px] md:grid-cols-2">
          <Field
            label="تاريخ البداية"
            required
            error={errors?.startDate?.message as string}
          >
            <div className="relative">
              <Calendar
                size={14}
                strokeWidth={1.8}
                className="absolute top-1/2 end-[12px] -translate-y-1/2 text-ink-3"
              />
              <Input
                type="date"
                className="mono pe-[36px]"
                {...register("budget.startDate")}
              />
            </div>
          </Field>
          <Field
            label="تاريخ النهاية"
            hint={<span className="text-ink-4">اختياري</span>}
          >
            <div className="relative">
              <Calendar
                size={14}
                strokeWidth={1.8}
                className="absolute top-1/2 end-[12px] -translate-y-1/2 text-ink-3"
              />
              <Input
                type="date"
                className="mono pe-[36px]"
                {...register("budget.endDate")}
              />
            </div>
          </Field>
        </div>

        <div className="rounded-[10px] border border-dashed border-line-2 bg-chip/40 p-[14px] text-[12.5px] leading-[1.7] text-ink-2">
          <b className="text-ink">توصية gioco:</b> للحملات متعددة المنصات،
          الميزانية اليومية أفضل للاختبار السريع (٣-٥ أيام)، والإجمالية أفضل
          للمواسم المحدّدة زمنيًا.
        </div>
      </CardBody>
    </Card>
  );
}
