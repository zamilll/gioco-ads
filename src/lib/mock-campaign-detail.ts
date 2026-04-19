import type { Platform } from "@/components/ui/platform-badge";

export const campaignDetailMock = null;

export const dailyPerformance: Array<{
  date: string;
  snap: number;
  tiktok: number;
  insta: number;
}> = [];

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

export const creatives: CreativeCard[] = [];

export const geoBreakdown: Array<{
  city: string;
  pct: number;
  value: string;
}> = [];

export const peakHours: number[] = [];

export const ageBuckets: Array<{ label: string; pct: number }> = [];
