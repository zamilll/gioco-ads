"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { Connection } from "./types";
import type { Platform } from "@/components/ui/platform-badge";
import { connectionsMock } from "./mock-connections";
import {
  dailyPerformance,
  creatives,
  geoBreakdown,
  peakHours,
  ageBuckets,
} from "./mock-campaign-detail";
import { campaigns, type CampaignRow } from "./mock-data";
import type { CampaignDetail } from "./types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useConnections() {
  return useQuery<Connection[]>({
    queryKey: ["connections"],
    queryFn: async () => {
      await delay(100);
      return connectionsMock;
    },
  });
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
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (platform: Platform) => {
      await delay(400);
      return platform;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["connections"] }),
  });
}

export function useDisconnectPlatform() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (platform: Platform) => {
      await delay(400);
      return platform;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["connections"] }),
  });
}

export function useRefreshToken() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (platform: Platform) => {
      await delay(500);
      return platform;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["connections"] }),
  });
}

export function useResync() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (platform: Platform) => {
      await delay(600);
      return platform;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["connections"] }),
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
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (active: boolean) => {
      await delay(200);
      return active;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["campaign", id] }),
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
