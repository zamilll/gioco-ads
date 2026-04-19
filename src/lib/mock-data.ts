import type { Platform } from "@/components/ui/platform-badge";
import type { StatusKind } from "@/components/ui/status-chip";

export const PLATFORM_COLORS: Record<Platform, string> = {
  snap: "#EBB200",
  tiktok: "#141414",
  insta: "#D64B7E",
};

export const performanceSeries: Array<{
  date: string;
  snap: number;
  tiktok: number;
  insta: number;
}> = [];

export const spendDistribution: Array<{
  name: string;
  value: number;
  pct: number;
  color: string;
}> = [];

export interface PlatformPerformance {
  id: Platform;
  name: string;
  activeCount: string;
  spend: string;
  impressions: string;
  ctr: string;
  ctrTrend: "up" | "down";
  cpa: string;
}

export const platformPerformance: PlatformPerformance[] = [];

export interface CampaignRow {
  id: string;
  name: string;
  subtitle: string;
  thumb: string;
  platforms: Platform[];
  status: StatusKind;
  budget: {
    spent: string;
    total: string;
    pct: number;
    tone?: "accent" | "warn" | "paused";
  };
  spend: string;
  ctr: string;
  conversions: string;
  roas: string;
  roasTone: "good" | "bad" | "muted";
}

export const campaigns: CampaignRow[] = [];

export interface Kpi {
  label: string;
  value: string;
  deltaLabel: string;
  deltaDirection: "up" | "down";
  meta: string;
  dotColor?: string;
  spark: { color: string; values: number[] };
}

export const kpis: Kpi[] = [
  {
    label: "الإنفاق الكلي",
    value: "—",
    deltaLabel: "—",
    deltaDirection: "up",
    meta: "لا توجد بيانات",
    dotColor: "var(--accent)",
    spark: { color: "var(--accent)", values: [] },
  },
  {
    label: "الظهور (Impressions)",
    value: "—",
    deltaLabel: "—",
    deltaDirection: "up",
    meta: "لا توجد بيانات",
    spark: { color: "var(--ink-2)", values: [] },
  },
  {
    label: "النقرات (Clicks)",
    value: "—",
    deltaLabel: "—",
    deltaDirection: "up",
    meta: "لا توجد بيانات",
    spark: { color: "var(--ink-2)", values: [] },
  },
  {
    label: "التحويلات",
    value: "—",
    deltaLabel: "—",
    deltaDirection: "up",
    meta: "لا توجد بيانات",
    spark: { color: "var(--ink-2)", values: [] },
  },
];
