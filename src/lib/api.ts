"use client";

import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import type { Platform } from "@/components/ui/platform-badge";
import { campaigns, type CampaignRow } from "./mock-data";
import type { CampaignDetail } from "./types";
import { useConnectionsStore } from "./connections-store";
import {
  dailyPerformance,
  creatives,
  geoBreakdown,
  peakHours,
  ageBuckets,
} from "./mock-campaign-detail";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useConnections() {
  const connections = useConnectionsStore((s) => s.connections);
  return { data: connections, isLoading: false };
}

export function useCampaigns() {
  return useQuery<CampaignRow[]>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      await delay(100);
      return campaigns;
    },
  });
}

export function useConnectPlatform() {
  const connect = useConnectionsStore((s) => s.connect);
  return useMutation({
    mutationFn: async (platform: Platform) => {
      await delay(400);
      connect(platform);
      return platform;
    },
  });
}

export function useDisconnectPlatform() {
  const disconnect = useConnectionsStore((s) => s.disconnect);
  return useMutation({
    mutationFn: async (platform: Platform) => {
      await delay(300);
      disconnect(platform);
      return platform;
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: async (platform: Platform) => {
      await delay(500);
      return platform;
    },
  });
}

export function useResync() {
  return useMutation({
    mutationFn: async (platform: Platform) => {
      await delay(600);
      return platform;
    },
  });
}

export function useCampaign(id: string) {
  return useQuery<CampaignDetail | null>({
    queryKey: ["campaign", id],
    queryFn: async () => {
      await delay(100);
      return null;
    },
  });
}

export function useCampaignMetrics(id: string) {
  return useQuery({
    queryKey: ["campaign", id, "metrics"],
    queryFn: async () => {
      await delay(100);
      return {
        daily: dailyPerformance,
        creatives,
        geoBreakdown,
        peakHours,
        ageBuckets,
      };
    },
  });
}

export function useToggleCampaignActive(id: string) {
  return useMutation({
    mutationKey: ["campaign", id, "toggle"],
    mutationFn: async (active: boolean) => {
      await delay(200);
      return active;
    },
  });
}

export function useCreateCampaign() {
  return useMutation({
    mutationFn: async (draft: unknown) => {
      await delay(800);
      return { id: "c-new", draft };
    },
  });
}
