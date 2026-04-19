import type { Platform } from "@/components/ui/platform-badge";
import type { StatusKind } from "@/components/ui/status-chip";

export const PLATFORM_COLORS: Record<Platform, string> = {
  snap: "#EBB200",
  tiktok: "#141414",
  insta: "#D64B7E",
};

export const performanceSeries = [
  { date: "١ أبريل", snap: 1800, tiktok: 2400, insta: 1200 },
  { date: "٥ أبريل", snap: 2100, tiktok: 2600, insta: 1400 },
  { date: "٨ أبريل", snap: 2400, tiktok: 2800, insta: 1500 },
  { date: "١٢ أبريل", snap: 2700, tiktok: 3000, insta: 1700 },
  { date: "١٥ أبريل", snap: 3100, tiktok: 3400, insta: 1900 },
  { date: "١٨ أبريل", snap: 3500, tiktok: 3700, insta: 2000 },
  { date: "٢٢ أبريل", snap: 4280, tiktok: 4000, insta: 2200 },
  { date: "٢٦ أبريل", snap: 4600, tiktok: 4300, insta: 2400 },
  { date: "٣٠ أبريل", snap: 5000, tiktok: 4700, insta: 2600 },
];

export const spendDistribution = [
  { name: "Snap", value: 24340, pct: 32.5, color: PLATFORM_COLORS.snap },
  { name: "TikTok", value: 31780, pct: 42.5, color: PLATFORM_COLORS.tiktok },
  { name: "Instagram", value: 18692, pct: 25.0, color: PLATFORM_COLORS.insta },
];

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

export const platformPerformance: PlatformPerformance[] = [
  {
    id: "snap",
    name: "Snap Ads",
    activeCount: "١٢ حملة نشطة",
    spend: "٢٤٬٣٤٠ ر.س",
    impressions: "٨٩٢K",
    ctr: "٦٫١٪",
    ctrTrend: "up",
    cpa: "١٨٫٢٠ ر.س",
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    activeCount: "١٨ حملة نشطة",
    spend: "٣١٬٧٨٠ ر.س",
    impressions: "١٫٠٢M",
    ctr: "٧٫٤٪",
    ctrTrend: "up",
    cpa: "١٥٫٨٠ ر.س",
  },
  {
    id: "insta",
    name: "Instagram Ads",
    activeCount: "٩ حملات نشطة",
    spend: "١٨٬٦٩٢ ر.س",
    impressions: "٥٦٨K",
    ctr: "٤٫٢٪",
    ctrTrend: "down",
    cpa: "٢٨٫٩٠ ر.س",
  },
];

export interface CampaignRow {
  id: string;
  name: string;
  subtitle: string;
  thumb: string;
  platforms: Platform[];
  status: StatusKind;
  budget: { spent: string; total: string; pct: number; tone?: "accent" | "warn" | "paused" };
  spend: string;
  ctr: string;
  conversions: string;
  roas: string;
  roasTone: "good" | "bad" | "muted";
}

export const campaigns: CampaignRow[] = [
  {
    id: "c1",
    name: "إطلاق مجموعة الصيف ٢٠٢٦",
    subtitle: "تحويلات • جمهور: نساء ١٨-٣٤",
    thumb: "repeating-linear-gradient(45deg, #F1EDE4 0 5px, #E8E3D6 5px 10px)",
    platforms: ["snap", "tiktok", "insta"],
    status: "live",
    budget: { spent: "١٥٬٠٠٠", total: "٢٠٬٠٠٠", pct: 75 },
    spend: "١٥٬٢٤٨ ر.س",
    ctr: "٧٫٢٪",
    conversions: "١٬٢٤٠",
    roas: "٤٫٢x",
    roasTone: "good",
  },
  {
    id: "c2",
    name: "خصومات العيد — كود EID15",
    subtitle: "وصول • جمهور: المملكة ١٨+",
    thumb: "repeating-linear-gradient(45deg, #EEE6D8 0 5px, #DDD2BD 5px 10px)",
    platforms: ["snap", "insta"],
    status: "live",
    budget: { spent: "٨٬٢٠٠", total: "١٠٬٠٠٠", pct: 82, tone: "warn" },
    spend: "٨٬١٨٢ ر.س",
    ctr: "٥٫٩٪",
    conversions: "٦٨٢",
    roas: "٣٫١x",
    roasTone: "good",
  },
  {
    id: "c3",
    name: "تجربة إبداع فيديو عمودي",
    subtitle: "وعي بالعلامة • أ/ب تست",
    thumb: "repeating-linear-gradient(45deg, #E9E5DC 0 5px, #D4CEBF 5px 10px)",
    platforms: ["tiktok"],
    status: "live",
    budget: { spent: "٣٬١٠٠", total: "٥٬٠٠٠", pct: 62 },
    spend: "٣٬١٠٠ ر.س",
    ctr: "٩٫١٪",
    conversions: "٢٤٦",
    roas: "٥٫٨x",
    roasTone: "good",
  },
  {
    id: "c4",
    name: "حملة إعادة الاستهداف — سلة مهجورة",
    subtitle: "تحويلات • Lookalike 3٪",
    thumb: "repeating-linear-gradient(45deg, #F3ECE0 0 5px, #E5D8C4 5px 10px)",
    platforms: ["insta", "tiktok"],
    status: "paused",
    budget: { spent: "٢٬٤٠٠", total: "٦٬٠٠٠", pct: 40, tone: "paused" },
    spend: "٢٬٣٩٨ ر.س",
    ctr: "٣٫٢٪",
    conversions: "٩٨",
    roas: "١٫١x",
    roasTone: "bad",
  },
  {
    id: "c5",
    name: "فعالية المعرض — بث مباشر",
    subtitle: "تفاعل • الرياض وجدة",
    thumb: "repeating-linear-gradient(45deg, #EFE9DC 0 5px, #DFD5BF 5px 10px)",
    platforms: ["snap", "insta"],
    status: "draft",
    budget: { spent: "٠", total: "٤٬٠٠٠", pct: 0 },
    spend: "—",
    ctr: "—",
    conversions: "—",
    roas: "—",
    roasTone: "muted",
  },
  {
    id: "c6",
    name: "منتجات جديدة — كاتالوج ديناميكي",
    subtitle: "بيع • ٣٢ منتج",
    thumb: "repeating-linear-gradient(45deg, #F0EADD 0 5px, #E2D8C3 5px 10px)",
    platforms: ["insta", "tiktok"],
    status: "live",
    budget: { spent: "٦٬٢٥٠", total: "٨٬٠٠٠", pct: 78 },
    spend: "٦٬٢٥٠ ر.س",
    ctr: "٦٫٤٪",
    conversions: "٤٩٢",
    roas: "٣٫٦x",
    roasTone: "good",
  },
];

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
    value: "٧٤٬٨١٢ ر.س",
    deltaLabel: "١٢٫٤٪",
    deltaDirection: "up",
    meta: "مقابل الفترة السابقة",
    dotColor: "var(--accent)",
    spark: {
      color: "var(--accent)",
      values: [28, 24, 26, 20, 22, 16, 18, 12, 14, 10, 12, 8, 10, 6, 8, 4],
    },
  },
  {
    label: "الظهور (Impressions)",
    value: "٢٫٤٨ مليون",
    deltaLabel: "٨٫١٪",
    deltaDirection: "up",
    meta: "CPM ١١٫٢٠ ر.س",
    spark: {
      color: "var(--ink-2)",
      values: [22, 24, 18, 20, 14, 18, 10, 14, 8, 10, 4],
    },
  },
  {
    label: "النقرات (Clicks)",
    value: "١٤٢٬٩٠٥",
    deltaLabel: "١٥٫٣٪",
    deltaDirection: "up",
    meta: "CTR ٥٫٧٦٪",
    spark: {
      color: "var(--ink-2)",
      values: [26, 22, 24, 18, 20, 14, 12, 16, 10, 8, 6],
    },
  },
  {
    label: "التحويلات",
    value: "٣٬٦٤٢",
    deltaLabel: "٢٫٣٪",
    deltaDirection: "down",
    meta: "CPA ٢٠٫٥٤ ر.س",
    spark: {
      color: "var(--bad)",
      values: [10, 14, 12, 18, 14, 20, 16, 22, 18, 24, 20],
    },
  },
];
