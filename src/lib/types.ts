import type { Platform } from "@/components/ui/platform-badge";

export type Objective =
  | "awareness"
  | "traffic"
  | "conversions"
  | "engagement"
  | "video_views"
  | "catalog";

export type Gender = "all" | "female" | "male";

export type BudgetType = "daily" | "lifetime";

export type CreativeType = "video" | "image" | "carousel";

export interface Audience {
  name: string;
  countries: string[];
  language: string;
  ageRange: [number, number];
  gender: Gender;
  interests: string[];
  customAudiences: string[];
}

export interface BudgetSchedule {
  type: BudgetType;
  amount: number;
  startDate: string;
  endDate?: string;
}

export interface CreativeAsset {
  id: string;
  type: CreativeType;
  title: string;
  url?: string;
  copy: string;
  cta: string;
  duration?: number;
}

export interface DraftCampaign {
  objective: Objective | null;
  platforms: Platform[];
  audience: Audience;
  budget: BudgetSchedule;
  creatives: CreativeAsset[];
}

export type ConnectionStatus = "connected" | "expiring" | "disconnected";

export interface Connection {
  platform: Platform;
  status: ConnectionStatus;
  connectedAt: string;
  accountId: string;
  accountName: string;
  adAccounts: number;
  lastSyncAt: string;
  pixelActive: boolean;
  eventsApi: boolean;
  tokenExpiresAt: string;
  scopes: string[];
}
