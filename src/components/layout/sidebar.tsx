"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Megaphone,
  Images,
  Users,
  BarChart3,
  Wallet,
  Link2,
  Settings,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { cn, toArabicDigits } from "@/lib/utils";
import { PlatformBadge, PLATFORM_NAME } from "@/components/ui/platform-badge";
import { useCampaigns, useConnections } from "@/lib/api";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  count?: number;
};

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  const showCount = item.count !== undefined && item.count > 0;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-[10px] rounded-[9px] px-[10px] py-[8px] text-[13.5px]",
        active
          ? "bg-accent-soft font-semibold text-accent"
          : "text-ink-2 hover:bg-chip hover:text-ink",
      )}
    >
      <Icon className="shrink-0" size={16} />
      <span className="flex-1">{item.label}</span>
      {showCount ? (
        <span
          className={cn(
            "rounded-full px-[7px] py-[2px] text-[11px]",
            active ? "bg-accent/15 text-accent" : "bg-chip text-ink-3",
          )}
        >
          {toArabicDigits(item.count!)}
        </span>
      ) : null}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const { data: campaigns = [] } = useCampaigns();
  const { data: connections = [] } = useConnections();

  const generalNav: NavItem[] = [
    { href: "/", label: "نظرة عامة", icon: LayoutGrid },
    {
      href: "/campaigns",
      label: "الحملات",
      icon: Megaphone,
      count: campaigns.length,
    },
    { href: "/creatives", label: "الإبداعات", icon: Images },
    { href: "/audiences", label: "الجمهور المستهدف", icon: Users },
    { href: "/reports", label: "التقارير", icon: BarChart3 },
    { href: "/budgets", label: "الميزانيات", icon: Wallet },
  ];

  const settingsNav: NavItem[] = [
    { href: "/connections", label: "الحسابات المرتبطة", icon: Link2 },
    { href: "/settings", label: "الإعدادات", icon: Settings },
  ];

  return (
    <aside className="sticky top-0 flex h-screen flex-col overflow-y-auto border-s border-line bg-panel px-[14px] py-[18px]">
      <div className="flex items-center gap-[10px] px-[8px] pb-[18px] pt-[6px]">
        <div
          className="grid h-[30px] w-[30px] place-items-center rounded-[9px] text-[14px] font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--accent) 0%, color-mix(in oklab, var(--accent) 60%, #000) 100%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
          }}
        >
          g
        </div>
        <div className="flex flex-col leading-[1.1]">
          <b className="text-[15px] font-bold tracking-[-0.01em]">gioco ads</b>
          <span className="text-[11px] text-ink-3">الإعلانات الموحّدة</span>
        </div>
      </div>

      <Link
        href="/campaigns/new"
        className="my-[4px] mb-[14px] inline-flex w-full items-center justify-center gap-[6px] rounded-[10px] bg-accent px-[14px] py-[8px] text-[13px] font-semibold text-white transition hover:brightness-110"
      >
        <Plus size={14} strokeWidth={2.2} />
        إنشاء حملة جديدة
      </Link>

      <div className="px-[8px] pb-[6px] pt-[14px] text-[11px] uppercase tracking-widelabel text-ink-4">
        عام
      </div>
      <nav className="flex flex-col gap-[2px]">
        {generalNav.map((item) => (
          <NavLink key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </nav>

      <div className="px-[8px] pb-[6px] pt-[14px] text-[11px] uppercase tracking-widelabel text-ink-4">
        الإعدادات
      </div>
      <nav className="flex flex-col gap-[2px]">
        {settingsNav.map((item) => (
          <NavLink key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </nav>

      <div className="mt-[14px] rounded-[12px] border border-line bg-bg/40 p-[10px]">
        <h5 className="mb-[10px] text-[11px] font-semibold uppercase tracking-widelabel text-ink-4">
          الحسابات المتصلة
        </h5>
        {connections.length === 0 ? (
          <Link
            href="/connections"
            className="block rounded-[8px] border border-dashed border-line-2 px-[10px] py-[10px] text-center text-[11.5px] text-ink-3 hover:border-ink-3 hover:text-ink"
          >
            لا توجد اتصالات — ابدأ بربط أول حساب
          </Link>
        ) : (
          connections.map((c) => (
            <div
              key={c.platform}
              className="flex items-center gap-[8px] py-[6px] text-[12.5px] text-ink-2"
            >
              <PlatformBadge platform={c.platform} size="xs" />
              <span className="flex-1">{PLATFORM_NAME[c.platform]}</span>
              <span
                className={cn(
                  "h-[7px] w-[7px] rounded-full",
                  c.status === "expiring" ? "bg-warn" : "bg-good",
                )}
                style={{
                  boxShadow:
                    c.status === "expiring"
                      ? "0 0 0 3px color-mix(in oklab, var(--warn) 20%, transparent)"
                      : "0 0 0 3px color-mix(in oklab, var(--good) 20%, transparent)",
                }}
              />
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
