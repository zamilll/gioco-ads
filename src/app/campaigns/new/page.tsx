"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Sparkles, Check } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { CAMPAIGN_STEPS, Stepper } from "@/components/wizard/stepper";
import { StepObjective } from "@/components/wizard/step-objective";
import { StepPlatforms } from "@/components/wizard/step-platforms";
import { StepAudience } from "@/components/wizard/step-audience";
import { StepBudget } from "@/components/wizard/step-budget";
import { StepCreatives } from "@/components/wizard/step-creatives";
import { StepReview } from "@/components/wizard/step-review";
import { ReachEstimator } from "@/components/wizard/reach-estimator";
import { useWizardStore } from "@/lib/stores";
import {
  campaignSchema,
  defaultCampaignDraft,
  type CampaignDraft,
} from "@/lib/campaign-schema";
import { useCreateCampaign } from "@/lib/api";

type FieldPaths = (keyof CampaignDraft | `audience.${string}` | `budget.${string}`)[];

const STEP_FIELDS: Record<number, FieldPaths> = {
  1: ["objective"],
  2: ["platforms"],
  3: [
    "audience.name",
    "audience.countries",
    "audience.language",
    "audience.ageRange",
    "audience.gender",
  ],
  4: ["budget.type", "budget.amount", "budget.startDate"],
  5: ["creatives"],
  6: [],
};

export default function CreateCampaignPage() {
  const { currentStep, setStep, nextStep, prevStep } = useWizardStore();
  const [published, setPublished] = useState(false);
  const methods = useForm<CampaignDraft>({
    resolver: zodResolver(campaignSchema),
    defaultValues: defaultCampaignDraft as CampaignDraft,
    mode: "onChange",
  });
  const { mutateAsync: createCampaign, isPending } = useCreateCampaign();

  const handleNext = async () => {
    const fields = STEP_FIELDS[currentStep] as never[];
    const valid = fields.length
      ? await methods.trigger(fields)
      : true;
    if (valid) nextStep();
  };

  const handlePublish = methods.handleSubmit(async (data) => {
    await createCampaign(data);
    setPublished(true);
  });

  return (
    <AppShell crumbTitle="إنشاء حملة جديدة">
      <div className="mb-[22px] flex items-end justify-between gap-[14px]">
        <div>
          <h1 className="text-[24px] font-bold tracking-tightish">
            إنشاء حملة جديدة
          </h1>
          <p className="mt-[4px] text-[13px] text-ink-3">
            معالج من ٦ خطوات — ينشر على المنصات المختارة بالتوازي.
          </p>
        </div>
        <div className="hidden items-center gap-[8px] rounded-full bg-accent-soft px-[12px] py-[6px] text-[12px] font-semibold text-accent md:inline-flex">
          <Sparkles size={13} strokeWidth={2} />
          يُحفظ كمسودة تلقائيًا
        </div>
      </div>

      <FormProvider {...methods}>
        <div className="grid gap-[18px] lg:grid-cols-[260px_1fr_340px]">
          <Stepper
            current={currentStep}
            steps={CAMPAIGN_STEPS}
            onSelect={(id) => setStep(id)}
          />

          <div className="min-w-0">
            {published ? (
              <SuccessCard onReset={() => { methods.reset(); setStep(1); setPublished(false); }} />
            ) : (
              <>
                {currentStep === 1 && <StepObjective />}
                {currentStep === 2 && <StepPlatforms />}
                {currentStep === 3 && <StepAudience />}
                {currentStep === 4 && <StepBudget />}
                {currentStep === 5 && <StepCreatives />}
                {currentStep === 6 && <StepReview />}

                <div className="mt-[18px] flex items-center justify-between gap-[10px] rounded-card border border-line bg-panel px-[18px] py-[12px] shadow-token-sm">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowRight size={14} strokeWidth={1.8} />
                    رجوع
                  </Button>
                  <span className="num text-[12px] text-ink-3">
                    الخطوة {currentStep}/{CAMPAIGN_STEPS.length}
                  </span>
                  {currentStep < CAMPAIGN_STEPS.length ? (
                    <Button type="button" variant="accent" onClick={handleNext}>
                      متابعة
                      <ArrowLeft size={14} strokeWidth={1.8} />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="accent"
                      onClick={handlePublish}
                      disabled={isPending}
                    >
                      {isPending ? "جاري النشر…" : "نشر الحملة"}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="min-w-0">
            <ReachEstimator />
          </div>
        </div>
      </FormProvider>
    </AppShell>
  );
}

function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-card border border-good-bg bg-panel p-[28px] text-center shadow-token-md">
      <div className="mx-auto grid h-[56px] w-[56px] place-items-center rounded-full bg-good-bg text-good">
        <Check size={24} strokeWidth={2.4} />
      </div>
      <h2 className="mt-[14px] text-[18px] font-bold">
        تم نشر الحملة بنجاح
      </h2>
      <p className="mx-auto mt-[6px] max-w-[400px] text-[13px] text-ink-3">
        بدأت المنصات المختارة في معالجة الحملة. ستبدأ البيانات بالظهور في لوحة
        التحكم خلال ١٥-٣٠ دقيقة.
      </p>
      <div className="mt-[18px] flex items-center justify-center gap-[8px]">
        <Button variant="ghost" onClick={onReset}>
          إنشاء حملة جديدة
        </Button>
        <Button variant="accent">
          عرض تفاصيل الحملة
        </Button>
      </div>
    </div>
  );
}
