"use client";

import { useFormContext } from "react-hook-form";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { PlatformBadge, PLATFORM_NAME } from "@/components/ui/platform-badge";
import { SmallCapsLabel } from "@/components/ui/field";
import { Divider } from "@/components/ui/divider";
import { Chip } from "@/components/ui/chip";
import { toArabicDigits } from "@/lib/utils";
import {
  COUNTRY_OPTIONS,
  LANGUAGE_OPTIONS,
  OBJECTIVE_OPTIONS,
  type CampaignDraft,
} from "@/lib/campaign-schema";

export function StepReview() {
  const { watch } = useFormContext<CampaignDraft>();
  const draft = watch();
  const objective = OBJECTIVE_OPTIONS.find(
    (o) => o.value === draft.objective,
  );
  const lang = LANGUAGE_OPTIONS.find((l) => l.code === draft.audience.language);
  const countries = draft.audience.countries
    .map((c) => COUNTRY_OPTIONS.find((x) => x.code === c)?.name ?? c)
    .join("، ");

  const missing: string[] = [];
  if (!draft.objective) missing.push("الهدف");
  if (!draft.platforms?.length) missing.push("المنصات");
  if (!draft.audience?.name) missing.push("اسم المجموعة");
  if (!draft.audience?.countries?.length) missing.push("الدول");
  if (!draft.budget?.amount) missing.push("الميزانية");
  if (!draft.creatives?.length) missing.push("إبداع واحد على الأقل");

  return (
    <div className="flex flex-col gap-[14px]">
      {missing.length ? (
        <div className="flex items-start gap-[10px] rounded-card border border-warn-bg bg-warn-bg/60 p-[14px] text-warn">
          <AlertCircle size={16} strokeWidth={2} className="mt-[2px]" />
          <div>
            <div className="text-[13px] font-semibold">
              بعض الحقول الأساسية غير مكتملة
            </div>
            <div className="mt-[4px] text-[12.5px]">
              {missing.join(" · ")}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-[10px] rounded-card border border-good-bg bg-good-bg/60 p-[14px] text-good">
          <CheckCircle2 size={16} strokeWidth={2} className="mt-[2px]" />
          <div>
            <div className="text-[13px] font-semibold">
              جاهزة للنشر
            </div>
            <div className="mt-[4px] text-[12.5px]">
              ستُنشر على{" "}
              <b className="mono">
                {toArabicDigits(draft.platforms?.length ?? 0)}
              </b>{" "}
              منصة بالتوازي.
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader title="الهدف" />
        <CardBody className="flex items-center gap-[12px]">
          {objective ? (
            <>
              <span className="grid h-[40px] w-[40px] place-items-center rounded-[10px] bg-accent-soft text-[18px]">
                {objective.icon}
              </span>
              <div>
                <div className="text-[14px] font-semibold">
                  {objective.title}
                </div>
                <div className="text-[12px] text-ink-3">{objective.desc}</div>
              </div>
            </>
          ) : (
            <span className="text-[12.5px] text-ink-3">لم يُختر</span>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="المنصات" />
        <CardBody className="flex flex-wrap gap-[10px]">
          {(draft.platforms ?? []).map((p) => (
            <div
              key={p}
              className="flex items-center gap-[8px] rounded-[10px] border border-line bg-panel px-[10px] py-[6px]"
            >
              <PlatformBadge platform={p} size="sm" />
              <span className="text-[12.5px] font-semibold">
                {PLATFORM_NAME[p]}
              </span>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="الجمهور" />
        <CardBody className="grid gap-[14px] md:grid-cols-2">
          <ReviewRow label="الاسم" value={draft.audience.name || "—"} />
          <ReviewRow label="الدول" value={countries || "—"} />
          <ReviewRow label="اللغة" value={lang?.name ?? "—"} />
          <ReviewRow
            label="النطاق العمري"
            value={
              <span className="num">
                {toArabicDigits(draft.audience.ageRange[0])}–
                {toArabicDigits(draft.audience.ageRange[1])}
              </span>
            }
          />
          <ReviewRow
            label="الجنس"
            value={
              draft.audience.gender === "all"
                ? "الكل"
                : draft.audience.gender === "female"
                  ? "نساء"
                  : "رجال"
            }
          />
          <ReviewRow
            label="الاهتمامات"
            value={
              draft.audience.interests.length
                ? `${toArabicDigits(draft.audience.interests.length)} اهتمام`
                : "—"
            }
          />
        </CardBody>
        {draft.audience.interests.length ? (
          <>
            <Divider />
            <div className="flex flex-wrap gap-[6px] p-[14px]">
              {draft.audience.interests.map((i) => (
                <Chip key={i} tone="accent" active>
                  {i}
                </Chip>
              ))}
            </div>
          </>
        ) : null}
      </Card>

      <Card>
        <CardHeader title="الميزانية" />
        <CardBody className="grid gap-[14px] md:grid-cols-3">
          <ReviewRow
            label="النوع"
            value={draft.budget.type === "daily" ? "يومية" : "إجمالية"}
          />
          <ReviewRow
            label="المبلغ"
            value={
              <span className="mono text-[15px] font-semibold">
                {toArabicDigits(
                  (draft.budget.amount || 0).toLocaleString("en-US"),
                )}{" "}
                ر.س
              </span>
            }
          />
          <ReviewRow
            label="الفترة"
            value={
              <span className="mono">
                {draft.budget.startDate}
                {draft.budget.endDate ? ` ← ${draft.budget.endDate}` : ""}
              </span>
            }
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="الإبداعات"
          subtitle={`${toArabicDigits(draft.creatives?.length ?? 0)} إبداع`}
        />
        <CardBody className="flex flex-col gap-[10px]">
          {(draft.creatives ?? []).map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-[10px] rounded-[10px] border border-line bg-panel p-[10px]"
            >
              <span className="grid h-[36px] w-[36px] place-items-center rounded-[9px] bg-chip text-[11px] font-bold text-ink-2">
                {c.type === "video"
                  ? "▶︎"
                  : c.type === "image"
                    ? "🖼"
                    : "◫"}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold">
                  {c.title || "(بلا عنوان)"}
                </div>
                <div className="truncate text-[11.5px] text-ink-3">
                  {c.copy || "—"}
                </div>
              </div>
              <span className="rounded-full bg-chip px-[8px] py-[3px] text-[11px] text-ink-2">
                {c.cta}
              </span>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <SmallCapsLabel>{label}</SmallCapsLabel>
      <div className="mt-[4px] text-[13px] font-medium text-ink">{value}</div>
    </div>
  );
}
