"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input, Select } from "@/components/ui/input";
import { Segmented } from "@/components/ui/segmented";
import { RangeSlider } from "@/components/ui/range-slider";
import { Chip } from "@/components/ui/chip";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, toArabicDigits } from "@/lib/utils";
import {
  COUNTRY_OPTIONS,
  LANGUAGE_OPTIONS,
  INTEREST_OPTIONS,
  CUSTOM_AUDIENCE_OPTIONS,
  type CampaignDraft,
} from "@/lib/campaign-schema";

export function StepAudience() {
  const { register, watch, setValue, formState } =
    useFormContext<CampaignDraft>();
  const audience = watch("audience");
  const errors = formState.errors.audience;

  const toggleCountry = (code: string) => {
    const cur = audience.countries;
    const next = cur.includes(code)
      ? cur.filter((x) => x !== code)
      : [...cur, code];
    setValue("audience.countries", next, { shouldValidate: true });
  };

  const toggleInterest = (i: string) => {
    const cur = audience.interests;
    const next = cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i];
    setValue("audience.interests", next);
  };

  const toggleCustom = (id: string) => {
    const cur = audience.customAudiences;
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    setValue("audience.customAudiences", next);
  };

  return (
    <Card>
      <CardHeader
        title="الجمهور المستهدف"
        subtitle="حدّد البلدان، الفئة العمرية، الاهتمامات"
      />
      <CardBody className="flex flex-col gap-[18px]">
        <Field
          label="اسم المجموعة الإعلانية"
          required
          error={errors?.name?.message as string}
        >
          <Input
            placeholder="مثال: نساء الخليج ١٨-٣٤ — مهتمات بالموضة"
            {...register("audience.name")}
          />
        </Field>

        <Field
          label="الدول المستهدفة"
          hint={`${toArabicDigits(audience.countries.length)} محددة`}
          required
          error={errors?.countries?.message as string}
        >
          <div className="flex flex-wrap gap-[6px]">
            {COUNTRY_OPTIONS.map((c) => (
              <Chip
                key={c.code}
                tone="accent"
                active={audience.countries.includes(c.code)}
                onClick={() => toggleCountry(c.code)}
              >
                {c.name}
              </Chip>
            ))}
          </div>
        </Field>

        <div className="grid gap-[14px] md:grid-cols-2">
          <Field label="اللغة" required>
            <Select {...register("audience.language")}>
              {LANGUAGE_OPTIONS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="الجنس">
            <Segmented
              items={[
                { value: "all", label: "الكل" },
                { value: "female", label: "نساء" },
                { value: "male", label: "رجال" },
              ]}
              value={audience.gender}
              onChange={(v) =>
                setValue("audience.gender", v as typeof audience.gender)
              }
              className="w-full justify-stretch [&>button]:flex-1"
            />
          </Field>
        </div>

        <Field
          label="النطاق العمري"
          hint={
            <span className="num">
              {toArabicDigits(audience.ageRange[0])} —{" "}
              {toArabicDigits(audience.ageRange[1])} سنة
            </span>
          }
        >
          <div className="pt-[6px]">
            <RangeSlider
              min={13}
              max={65}
              value={audience.ageRange}
              onChange={(v) => setValue("audience.ageRange", v)}
            />
            <div className="mono mt-[4px] flex justify-between text-[11px] text-ink-4">
              <span>{toArabicDigits(13)}</span>
              <span>{toArabicDigits(25)}</span>
              <span>{toArabicDigits(40)}</span>
              <span>{toArabicDigits(65)}+</span>
            </div>
          </div>
        </Field>

        <Field
          label="الاهتمامات"
          hint={`${toArabicDigits(audience.interests.length)} محدد`}
        >
          <div className="flex flex-wrap gap-[6px]">
            {INTEREST_OPTIONS.map((i) => (
              <Chip
                key={i}
                tone="accent"
                active={audience.interests.includes(i)}
                onClick={() => toggleInterest(i)}
              >
                {i}
              </Chip>
            ))}
          </div>
        </Field>

        <Field label="الجمهور المخصص" hint="Custom audiences & Lookalikes">
          <div className="grid gap-[8px] md:grid-cols-2">
            {CUSTOM_AUDIENCE_OPTIONS.map((ca) => {
              const active = audience.customAudiences.includes(ca.id);
              return (
                <button
                  key={ca.id}
                  type="button"
                  onClick={() => toggleCustom(ca.id)}
                  className={cn(
                    "flex items-start gap-[10px] rounded-[10px] border bg-panel p-[12px] text-start transition-colors",
                    active
                      ? "border-accent bg-accent-soft/30"
                      : "border-line hover:border-line-2",
                  )}
                >
                  <Checkbox
                    checked={active}
                    onCheckedChange={() => toggleCustom(ca.id)}
                  />
                  <div>
                    <div className="text-[12.5px] font-semibold">
                      {ca.title}
                    </div>
                    <div className="mono mt-[2px] text-[11px] text-ink-3">
                      {ca.size} شخص
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Field>
      </CardBody>
    </Card>
  );
}
