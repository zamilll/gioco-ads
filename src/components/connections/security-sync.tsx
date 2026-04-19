"use client";

import { useState } from "react";
import { Lock, ActivitySquare, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Segmented } from "@/components/ui/segmented";
import { Divider } from "@/components/ui/divider";

export function SecurityAndSync() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activityLog, setActivityLog] = useState(true);
  const [syncFreq, setSyncFreq] = useState<"5" | "15" | "30" | "60">("15");
  const [syncCampaigns, setSyncCampaigns] = useState(true);
  const [syncCreatives, setSyncCreatives] = useState(true);
  const [syncAudiences, setSyncAudiences] = useState(false);

  return (
    <div className="mb-[20px] grid gap-[14px] lg:grid-cols-2">
      <Card>
        <CardHeader
          title={
            <span className="inline-flex items-center gap-[8px]">
              <Lock size={14} strokeWidth={1.8} />
              الأمان
            </span>
          }
          subtitle="OAuth فقط — بدون كلمات مرور"
        />
        <CardBody className="flex flex-col gap-[14px]">
          <ToggleRow
            icon={<RefreshCw size={14} strokeWidth={1.8} />}
            title="تجديد الرموز تلقائيًا"
            desc="عند دعم المنصة لذلك (Snap / TikTok)."
            checked={autoRefresh}
            onChange={setAutoRefresh}
          />
          <Divider />
          <ToggleRow
            icon={<ActivitySquare size={14} strokeWidth={1.8} />}
            title="سجل النشاط"
            desc="تتبّع الاتصالات، المزامنة، والفصل."
            checked={activityLog}
            onChange={setActivityLog}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title={
            <span className="inline-flex items-center gap-[8px]">
              <RefreshCw size={14} strokeWidth={1.8} />
              المزامنة
            </span>
          }
          subtitle="تردد وسحب البيانات"
        />
        <CardBody className="flex flex-col gap-[14px]">
          <div>
            <div className="mb-[8px] text-[12.5px] font-medium text-ink-2">
              تردد المزامنة (دقائق)
            </div>
            <Segmented
              items={[
                { value: "5", label: "٥" },
                { value: "15", label: "١٥" },
                { value: "30", label: "٣٠" },
                { value: "60", label: "٦٠" },
              ]}
              value={syncFreq}
              onChange={setSyncFreq}
            />
          </div>
          <Divider />
          <ToggleRow
            title="الحملات ومجموعات الإعلانات"
            desc="campaigns, ad_sets, ads"
            checked={syncCampaigns}
            onChange={setSyncCampaigns}
          />
          <ToggleRow
            title="الإبداعات والأصول"
            desc="creatives, thumbnails"
            checked={syncCreatives}
            onChange={setSyncCreatives}
          />
          <ToggleRow
            title="الجماهير المخصصة"
            desc="custom audiences, lookalikes"
            checked={syncAudiences}
            onChange={setSyncAudiences}
          />
        </CardBody>
      </Card>
    </div>
  );
}

function ToggleRow({
  icon,
  title,
  desc,
  checked,
  onChange,
}: {
  icon?: React.ReactNode;
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-[12px]">
      {icon ? (
        <span className="mt-[2px] grid h-[28px] w-[28px] place-items-center rounded-[8px] bg-chip text-ink-2">
          {icon}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-ink">{title}</div>
        <div className="mt-[2px] text-[12px] text-ink-3">{desc}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
