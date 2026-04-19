"use client";

import Link from "next/link";
import { Wallet, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function BudgetsPage() {
  return (
    <AppShell crumbTitle="الميزانيات">
      <div className="mb-[22px] flex items-end justify-between gap-[14px]">
        <div>
          <h1 className="text-[24px] font-bold tracking-tightish">
            الميزانيات
          </h1>
          <p className="mt-[4px] text-[13px] text-ink-3">
            تتبع الإنفاق اليومي والإجمالي عبر الحملات والمنصات.
          </p>
        </div>
        <Link href="/campaigns/new">
          <Button variant="accent" size="md">
            <Plus size={14} strokeWidth={2.2} />
            حملة بميزانية
          </Button>
        </Link>
      </div>

      <Card>
        <EmptyState
          size="lg"
          icon={<Wallet size={22} strokeWidth={1.6} />}
          title="لا توجد ميزانيات نشطة"
          description="ستظهر ميزانيات حملاتك هنا — تتبع ما أُنفق، المتبقي، والتنبيهات عند اقتراب الحد."
          action={
            <Link href="/campaigns/new">
              <Button variant="accent" size="sm">
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
