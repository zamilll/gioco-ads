"use client";

import Link from "next/link";
import { BarChart3, FileText, Download } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "@/components/ui/toast";

export default function ReportsPage() {
  const createReport = () =>
    toast({
      tone: "info",
      title: "إنشاء تقرير",
      description:
        "يتطلب ربط منصة واحدة على الأقل لتوليد تقارير الأداء.",
    });

  return (
    <AppShell crumbTitle="التقارير">
      <div className="mb-[22px] flex items-end justify-between gap-[14px]">
        <div>
          <h1 className="text-[24px] font-bold tracking-tightish">التقارير</h1>
          <p className="mt-[4px] text-[13px] text-ink-3">
            ملخّصات الأداء، مقارنات المنصات، وتقارير مُجدولة تُرسل بالبريد.
          </p>
        </div>
        <Button variant="accent" size="md" onClick={createReport}>
          <FileText size={14} strokeWidth={2.2} />
          تقرير جديد
        </Button>
      </div>

      <Card>
        <EmptyState
          size="lg"
          icon={<BarChart3 size={22} strokeWidth={1.6} />}
          title="لا توجد تقارير بعد"
          description="أنشئ تقريرك الأول لتصدير أداء الحملات بصيغة PDF أو CSV، أو جدوله ليُرسل أسبوعيًا."
          action={
            <Button variant="accent" size="sm" onClick={createReport}>
              <FileText size={13} strokeWidth={2} />
              إنشاء تقرير
            </Button>
          }
          secondary={
            <Link href="/connections">
              <Button variant="ghost" size="sm">
                <Download size={13} strokeWidth={1.8} />
                ربط منصة
              </Button>
            </Link>
          }
        />
      </Card>
    </AppShell>
  );
}
