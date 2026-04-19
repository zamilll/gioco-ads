"use client";

import { useFormContext } from "react-hook-form";
import { Upload, Film, Image as ImageIcon, LayoutGrid, Trash2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input, Textarea, Select } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CTA_OPTIONS,
  type CampaignDraft,
} from "@/lib/campaign-schema";
import type { CreativeType } from "@/lib/types";

const TYPE_META: Record<
  CreativeType,
  { label: string; icon: typeof Film; desc: string }
> = {
  video: {
    label: "فيديو",
    icon: Film,
    desc: "٩:١٦ مُوصى به · MP4 · ٥-٦٠ ثانية",
  },
  image: {
    label: "صورة",
    icon: ImageIcon,
    desc: "١:١ أو ٩:١٦ · JPG/PNG · ≤ ٥MB",
  },
  carousel: {
    label: "Carousel",
    icon: LayoutGrid,
    desc: "٢-١٠ بطاقات · صور أو فيديوهات",
  },
};

export function StepCreatives() {
  const { watch, setValue } = useFormContext<CampaignDraft>();
  const creatives = watch("creatives") ?? [];

  const addCreative = (type: CreativeType) => {
    setValue("creatives", [
      ...creatives,
      {
        id: `cr_${Date.now()}`,
        type,
        title: "",
        copy: "",
        cta: CTA_OPTIONS[0],
      },
    ]);
  };

  const removeCreative = (id: string) => {
    setValue(
      "creatives",
      creatives.filter((c) => c.id !== id),
    );
  };

  const updateCreative = (
    id: string,
    patch: Partial<(typeof creatives)[number]>,
  ) => {
    setValue(
      "creatives",
      creatives.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  };

  return (
    <Card>
      <CardHeader
        title="الإبداعات"
        subtitle="فيديوهات، صور، وكاتالوج — مع النسخة والـ CTA"
      />
      <CardBody className="flex flex-col gap-[16px]">
        <div className="grid gap-[10px] md:grid-cols-3">
          {(Object.keys(TYPE_META) as CreativeType[]).map((t) => {
            const meta = TYPE_META[t];
            const Icon = meta.icon;
            return (
              <button
                key={t}
                type="button"
                onClick={() => addCreative(t)}
                className="flex items-start gap-[10px] rounded-[12px] border border-dashed border-line-2 bg-panel p-[14px] text-start transition-colors hover:border-accent hover:bg-accent-soft/20"
              >
                <span className="grid h-[36px] w-[36px] place-items-center rounded-[10px] bg-chip text-ink-2">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-[6px]">
                    <h4 className="text-[13px] font-semibold">{meta.label}</h4>
                    <Upload size={12} strokeWidth={1.8} className="text-ink-3" />
                  </div>
                  <p className="mt-[2px] text-[11.5px] text-ink-3">
                    {meta.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {creatives.length === 0 ? (
          <div className="rounded-[10px] border border-dashed border-line-2 bg-chip/30 p-[20px] text-center text-[12.5px] text-ink-3">
            لم تُضَف أي إبداعات بعد. اختر نوع الإبداع من الأعلى للبدء.
          </div>
        ) : (
          creatives.map((cr) => {
            const meta = TYPE_META[cr.type];
            const Icon = meta.icon;
            return (
              <div
                key={cr.id}
                className="rounded-[12px] border border-line bg-panel p-[14px]"
              >
                <div className="mb-[12px] flex items-center gap-[10px]">
                  <span className="grid h-[28px] w-[28px] place-items-center rounded-[8px] bg-chip text-ink-2">
                    <Icon size={14} strokeWidth={1.8} />
                  </span>
                  <span className="text-[12.5px] font-semibold">
                    {meta.label}
                  </span>
                  <span className="mono text-[11px] text-ink-4">{cr.id}</span>
                  <IconButton
                    tone="bad"
                    aria-label="حذف"
                    className="ms-auto"
                    onClick={() => removeCreative(cr.id)}
                  >
                    <Trash2 size={14} strokeWidth={1.8} />
                  </IconButton>
                </div>

                <div
                  className={cn(
                    "mb-[12px] grid aspect-[9/11] w-full max-w-[140px] place-items-center rounded-[10px] border border-dashed border-line-2 bg-chip/40 text-ink-3",
                  )}
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent 0 6px, rgba(20,20,20,0.03) 6px 12px)",
                  }}
                >
                  <div className="flex flex-col items-center gap-[6px] text-[11.5px]">
                    <Upload size={18} strokeWidth={1.6} />
                    <span>ارفع الملف</span>
                  </div>
                </div>

                <div className="grid gap-[10px] md:grid-cols-2">
                  <Field label="عنوان الإبداع">
                    <Input
                      placeholder="مثال: إطلاق مجموعة الصيف"
                      value={cr.title}
                      onChange={(e) =>
                        updateCreative(cr.id, { title: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="CTA">
                    <Select
                      value={cr.cta}
                      onChange={(e) =>
                        updateCreative(cr.id, { cta: e.target.value })
                      }
                    >
                      {CTA_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>

                <Field label="النسخة" className="mt-[10px]">
                  <Textarea
                    rows={3}
                    placeholder="اكتب نسخة الإعلان — حتى ٢٠٠ حرف"
                    value={cr.copy}
                    onChange={(e) =>
                      updateCreative(cr.id, { copy: e.target.value })
                    }
                  />
                </Field>
              </div>
            );
          })
        )}

        {creatives.length > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="self-start"
            onClick={() => addCreative("video")}
          >
            + إضافة إبداع آخر
          </Button>
        ) : null}
      </CardBody>
    </Card>
  );
}
