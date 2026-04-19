"use client";

import Link from "next/link";
import { Images, Plus, Upload } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "@/components/ui/toast";

export default function CreativesPage() {
  const handleUpload = () =>
    toast({
      tone: "info",
      title: "رفع الإبداعات",
      description: "سيفتح مدير الرفع بعد اكتمال ربط أول منصة.",
    });

  return (
    <AppShell crumbTitle="الإبداعات">
      <div className="mb-[22px] flex items-end justify-between gap-[14px]">
        <div>
          <h1 className="text-[24px] font-bold tracking-tightish">الإبداعات</h1>
          <p className="mt-[4px] text-[13px] text-ink-3">
            فيديوهات، صور، وكاتالوج — مكتبة الإبداعات عبر كل الحملات.
          </p>
        </div>
        <Button variant="accent" size="md" onClick={handleUpload}>
          <Upload size={14} strokeWidth={2.2} />
          رفع إبداع
        </Button>
      </div>

      <Card>
        <EmptyState
          size="lg"
          icon={<Images size={22} strokeWidth={1.6} />}
          title="لا توجد إبداعات بعد"
          description="ارفع أول فيديو أو صورة أو Carousel لإعادة استخدامها في الحملات. الأبعاد الموصى بها: ٩:١٦ للفيديو العمودي."
          action={
            <Button variant="accent" size="sm" onClick={handleUpload}>
              <Upload size={13} strokeWidth={2} />
              رفع إبداع
            </Button>
          }
          secondary={
            <Link href="/campaigns/new">
              <Button variant="ghost" size="sm">
                <Plus size={13} strokeWidth={2} />
                إنشاء حملة
              </Button>
            </Link>
          }
        />
      </Card>
    </AppShell>
  );
}
