"use client";

import { Users, Plus, UploadCloud } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function AudiencesPage() {
  return (
    <AppShell crumbTitle="الجمهور المستهدف">
      <div className="mb-[22px] flex items-end justify-between gap-[14px]">
        <div>
          <h1 className="text-[24px] font-bold tracking-tightish">
            الجمهور المستهدف
          </h1>
          <p className="mt-[4px] text-[13px] text-ink-3">
            جماهير مخصصة، Lookalikes، وقوائم إعادة الاستهداف عبر المنصات.
          </p>
        </div>
        <Button variant="accent" size="md">
          <Plus size={14} strokeWidth={2.2} />
          جمهور جديد
        </Button>
      </div>

      <Card>
        <EmptyState
          size="lg"
          icon={<Users size={22} strokeWidth={1.6} />}
          title="لا توجد جماهير بعد"
          description="أنشئ جمهورًا مخصصًا من زوار الموقع أو ارفع قائمة عملاء (CSV) أو بنِ Lookalike بناءً على المشترين."
          action={
            <Button variant="accent" size="sm">
              <Plus size={13} strokeWidth={2} />
              جمهور جديد
            </Button>
          }
          secondary={
            <Button variant="ghost" size="sm">
              <UploadCloud size={13} strokeWidth={1.8} />
              رفع CSV
            </Button>
          }
        />
      </Card>
    </AppShell>
  );
}
