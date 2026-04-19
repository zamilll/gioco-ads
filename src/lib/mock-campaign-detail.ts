import type { Platform } from "@/components/ui/platform-badge";

export const campaignDetailMock = {
  id: "c1",
  name: "إطلاق مجموعة الصيف ٢٠٢٦",
  objective: "تحويلات (Conversions)",
  createdAt: "٢٠٢٦/٠٤/٠١",
  createdBy: "مها الحربي",
  endsAt: "٢٠٢٦/٠٥/١٥",
  platforms: ["snap", "tiktok", "insta"] as Platform[],
  status: "live" as const,
  active: true,
  budget: { total: 20000, spent: 15248 },
  kpis: {
    spend: "١٥٬٢٤٨ ر.س",
    impressions: "٤٨٢K",
    clicks: "٣٤٬٧١٢",
    conversions: "١٬٢٤٠",
    roas: "٤٫٢x",
  },
};

export const dailyPerformance = [
  { date: "١", snap: 1200, tiktok: 1600, insta: 800 },
  { date: "٣", snap: 1400, tiktok: 1800, insta: 900 },
  { date: "٥", snap: 1500, tiktok: 1950, insta: 1000 },
  { date: "٧", snap: 1800, tiktok: 2200, insta: 1100 },
  { date: "٩", snap: 2100, tiktok: 2400, insta: 1250 },
  { date: "١١", snap: 2300, tiktok: 2600, insta: 1350 },
  { date: "١٣", snap: 2500, tiktok: 2800, insta: 1400 },
  { date: "١٥", snap: 2700, tiktok: 3000, insta: 1550 },
  { date: "١٧", snap: 2900, tiktok: 3100, insta: 1650 },
  { date: "١٩", snap: 3100, tiktok: 3250, insta: 1700 },
];

export interface CreativeCard {
  id: string;
  title: string;
  subtitle: string;
  platform: Platform;
  duration: string;
  ctr: string;
  roas: string;
  thumb: string;
}

export const creatives: CreativeCard[] = [
  {
    id: "cr1",
    title: "إطلاق المجموعة — إعلان رئيسي",
    subtitle: "فيديو عمودي ٩:١٦ · ١٥ ثانية",
    platform: "tiktok",
    duration: "٠:١٥",
    ctr: "٩٫٢٪",
    roas: "٥٫٨x",
    thumb:
      "repeating-linear-gradient(135deg, #E9E4D6 0 6px, #D8D0BD 6px 12px)",
  },
  {
    id: "cr2",
    title: "اختبار الإبداع — اللون الأخضر",
    subtitle: "صورة مربعة ١:١",
    platform: "insta",
    duration: "—",
    ctr: "٦٫٤٪",
    roas: "٣٫٤x",
    thumb:
      "repeating-linear-gradient(45deg, #EEE5C7 0 6px, #DDD1A9 6px 12px)",
  },
  {
    id: "cr3",
    title: "Story — كواليس الجلسة",
    subtitle: "فيديو عمودي · ٩ ثوانٍ",
    platform: "snap",
    duration: "٠:٠٩",
    ctr: "٧٫٨٪",
    roas: "٤٫١x",
    thumb:
      "repeating-linear-gradient(90deg, #F1E8D3 0 6px, #E0D3B3 6px 12px)",
  },
  {
    id: "cr4",
    title: "كاتالوج ديناميكي — ٨ منتجات",
    subtitle: "Carousel · ٨ بطاقات",
    platform: "insta",
    duration: "—",
    ctr: "٥٫٢٪",
    roas: "٢٫٨x",
    thumb:
      "repeating-linear-gradient(0deg, #F0EADD 0 6px, #E3D7BF 6px 12px)",
  },
  {
    id: "cr5",
    title: "شهادة عميلة — فيديو",
    subtitle: "فيديو أفقي · ٣٠ ثانية",
    platform: "tiktok",
    duration: "٠:٣٠",
    ctr: "٨٫٦٪",
    roas: "٤٫٩x",
    thumb:
      "repeating-linear-gradient(60deg, #EDE2C3 0 6px, #DBCCA5 6px 12px)",
  },
  {
    id: "cr6",
    title: "عرض محدود — حتى نفاد الكمية",
    subtitle: "فيديو عمودي ٩:١٦ · ١٠ ثوانٍ",
    platform: "snap",
    duration: "٠:١٠",
    ctr: "٧٫١٪",
    roas: "٣٫٩x",
    thumb:
      "repeating-linear-gradient(30deg, #ECE3CE 0 6px, #DCCBAE 6px 12px)",
  },
];

export const geoBreakdown = [
  { city: "الرياض", pct: 38, value: "٥٬٧٩٠ ر.س" },
  { city: "جدة", pct: 24, value: "٣٬٦٦٠ ر.س" },
  { city: "الدمام", pct: 14, value: "٢٬١٣٥ ر.س" },
  { city: "مكة", pct: 10, value: "١٬٥٢٥ ر.س" },
  { city: "المدينة", pct: 8, value: "١٬٢٢٠ ر.س" },
  { city: "أخرى", pct: 6, value: "٩١٥ ر.س" },
];

export const peakHours = Array.from({ length: 24 }, (_, h) => {
  const base = 10 + Math.sin((h - 6) / 24 * Math.PI * 2) * 25;
  const boost = h >= 19 && h <= 23 ? 35 : 0;
  return Math.max(6, Math.round(base + boost));
});

export const ageBuckets = [
  { label: "١٣-١٧", pct: 8 },
  { label: "١٨-٢٤", pct: 32 },
  { label: "٢٥-٣٤", pct: 41 },
  { label: "٣٥-٤٤", pct: 14 },
  { label: "٤٥+", pct: 5 },
];
