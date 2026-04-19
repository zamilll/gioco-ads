"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Connection } from "./types";
import type { Platform } from "@/components/ui/platform-badge";

export interface PlatformMeta {
  id: Platform;
  label: string;
  accountName: string;
  accountId: string;
  adAccounts: number;
  scopes: string[];
  tokenExpiresAt: string;
  pixelActive: boolean;
  eventsApi: boolean;
}

const formatToday = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
};

export const PLATFORM_META: Record<Platform, PlatformMeta> = {
  snap: {
    id: "snap",
    label: "Snap Ads",
    accountName: "واعد للتسويق — Snap Business",
    accountId: "snap_9481267354",
    adAccounts: 1,
    scopes: ["snapchat-marketing-api", "read_user"],
    tokenExpiresAt: "بعد ٣٠ دقيقة (تجديد تلقائي)",
    pixelActive: true,
    eventsApi: true,
  },
  tiktok: {
    id: "tiktok",
    label: "TikTok Ads",
    accountName: "واعد للتسويق — TikTok Business Center",
    accountId: "tiktok_7318428902",
    adAccounts: 2,
    scopes: [
      "user.info.basic",
      "campaign.list",
      "campaign.create",
      "ad.list",
      "ad.create",
    ],
    tokenExpiresAt: "٢٠٢٨/٠٤/١٩",
    pixelActive: true,
    eventsApi: true,
  },
  insta: {
    id: "insta",
    label: "Instagram Ads",
    accountName: "واعد للتسويق — Meta Business Suite",
    accountId: "act_382014928102938",
    adAccounts: 1,
    scopes: [
      "ads_management",
      "ads_read",
      "business_management",
      "instagram_basic",
    ],
    tokenExpiresAt: "بعد ٦٠ يوم — تذكير قبل ٧ أيام",
    pixelActive: true,
    eventsApi: false,
  },
  google: {
    id: "google",
    label: "Google Ads",
    accountName: "واعد للتسويق — Google Ads Manager",
    accountId: "482-716-3905",
    adAccounts: 1,
    scopes: [
      "adwords",
      "youtube.readonly",
      "displayvideo",
      "analytics.readonly",
    ],
    tokenExpiresAt: "رمز تحديث دائم + وصول ١ ساعة",
    pixelActive: true,
    eventsApi: true,
  },
};

interface ConnectionsState {
  connections: Connection[];
  connect: (platform: Platform) => void;
  disconnect: (platform: Platform) => void;
  reset: () => void;
}

export const useConnectionsStore = create<ConnectionsState>()(
  persist(
    (set) => ({
      connections: [],
      connect: (platform) => {
        const meta = PLATFORM_META[platform];
        set((s) => {
          if (s.connections.some((c) => c.platform === platform)) return s;
          const next: Connection = {
            platform,
            status: "connected",
            connectedAt: formatToday(),
            accountName: meta.accountName,
            accountId: meta.accountId,
            adAccounts: meta.adAccounts,
            lastSyncAt: "الآن",
            pixelActive: meta.pixelActive,
            eventsApi: meta.eventsApi,
            tokenExpiresAt: meta.tokenExpiresAt,
            scopes: meta.scopes,
          };
          return { connections: [...s.connections, next] };
        });
      },
      disconnect: (platform) =>
        set((s) => ({
          connections: s.connections.filter((c) => c.platform !== platform),
        })),
      reset: () => set({ connections: [] }),
    }),
    { name: "gioco-connections" },
  ),
);

export function useConnectionByPlatform(platform: Platform) {
  return useConnectionsStore((s) =>
    s.connections.find((c) => c.platform === platform),
  );
}
