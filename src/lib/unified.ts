import type { Platform } from "@/components/ui/platform-badge";
import type { Connection, ConnectionStatus } from "./types";
import type {
  CampaignRow,
  Kpi,
  PlatformPerformance,
} from "./mock-data";
import type { StatusKind } from "@/components/ui/status-chip";

const BASE_URL = "https://api.unified.to";

export interface UnifiedCampaign {
  id?: string;
  name?: string;
  status?: string;
  objective?: string;
  spend?: number;
  budget?: number;
  budget_total?: number;
  budget_daily?: number;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  ctr?: number;
  roas?: number;
  created_at?: string;
  connection_id?: string;
  platform?: string;
  raw?: Record<string, unknown>;
}

export interface UnifiedMetrics {
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpa: number;
  roas: number;
  byPlatform: Record<
    string,
    {
      spend: number;
      impressions: number;
      clicks: number;
      conversions: number;
      ctr: number;
      cpa: number;
    }
  >;
}

export interface UnifiedConnection {
  id: string;
  integration_type: string;
  workspace_id?: string;
  auth?: {
    expires_at?: string;
    other?: Record<string, unknown>;
  };
  is_active?: boolean;
  categories?: string[];
  created_at?: string;
  updated_at?: string;
}

function requireToken(): string {
  const token = process.env.UNIFIED_API_TOKEN;
  if (!token) {
    throw new Error(
      "UNIFIED_API_TOKEN is not set. Add it to .env.local and Vercel env.",
    );
  }
  return token;
}

function requireWorkspace(): string {
  const id = process.env.UNIFIED_WORKSPACE_ID;
  if (!id) {
    throw new Error(
      "UNIFIED_WORKSPACE_ID is not set. Add it to .env.local and Vercel env.",
    );
  }
  return id;
}

async function unifiedFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${requireToken()}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Unified.to ${res.status} ${res.statusText} on ${path}: ${body.slice(0, 200)}`,
    );
  }
  return (await res.json()) as T;
}

function toQuery(params: Record<string, string | number | undefined>): string {
  const pairs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    );
  return pairs.length ? `?${pairs.join("&")}` : "";
}

const PLATFORM_FROM_INTEGRATION: Record<string, Platform> = {
  snapchat: "snap",
  snap: "snap",
  tiktok: "tiktok",
  instagram: "insta",
  insta: "insta",
  facebook: "insta",
  meta: "insta",
  google: "google",
  googleads: "google",
  "google-ads": "google",
};

export function platformFromIntegration(type?: string): Platform | null {
  if (!type) return null;
  const key = type.toLowerCase();
  return PLATFORM_FROM_INTEGRATION[key] ?? null;
}

export async function listConnections(): Promise<UnifiedConnection[]> {
  const qs = toQuery({ workspace_id: requireWorkspace(), limit: 100 });
  return unifiedFetch<UnifiedConnection[]>(`/unified/connection${qs}`);
}

export async function getCampaigns(
  connectionId = process.env.UNIFIED_CONNECTION_ID,
): Promise<UnifiedCampaign[]> {
  if (!connectionId) return [];
  const qs = toQuery({ connection_id: connectionId, limit: 100 });
  return unifiedFetch<UnifiedCampaign[]>(`/crm/campaign${qs}`);
}

export async function getMetrics(
  connectionId = process.env.UNIFIED_CONNECTION_ID,
): Promise<UnifiedMetrics> {
  const empty: UnifiedMetrics = {
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpa: 0,
    roas: 0,
    byPlatform: {},
  };
  if (!connectionId) return empty;
  const campaigns = await getCampaigns(connectionId);
  return aggregateMetrics(campaigns);
}

function aggregateMetrics(campaigns: UnifiedCampaign[]): UnifiedMetrics {
  const totals = {
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
  };
  const byPlatform: UnifiedMetrics["byPlatform"] = {};

  for (const c of campaigns) {
    const spend = c.spend ?? 0;
    const impressions = c.impressions ?? 0;
    const clicks = c.clicks ?? 0;
    const conversions = c.conversions ?? 0;
    totals.spend += spend;
    totals.impressions += impressions;
    totals.clicks += clicks;
    totals.conversions += conversions;

    const key = c.platform ?? "unknown";
    const slot =
      byPlatform[key] ??
      (byPlatform[key] = {
        spend: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        cpa: 0,
      });
    slot.spend += spend;
    slot.impressions += impressions;
    slot.clicks += clicks;
    slot.conversions += conversions;
  }

  for (const slot of Object.values(byPlatform)) {
    slot.ctr = slot.impressions ? slot.clicks / slot.impressions : 0;
    slot.cpa = slot.conversions ? slot.spend / slot.conversions : 0;
  }

  const ctr = totals.impressions ? totals.clicks / totals.impressions : 0;
  const cpa = totals.conversions ? totals.spend / totals.conversions : 0;
  const roas = totals.spend ? totals.conversions / totals.spend : 0;

  return { ...totals, ctr, cpa, roas, byPlatform };
}

export function buildConnectUrl(
  integrationType: string,
  redirectPath = "/connections",
): string {
  const workspaceId = requireWorkspace();
  const origin =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  const redirect = `${origin}${redirectPath}`;
  return `${BASE_URL}/unified/integration/auth/${workspaceId}/${integrationType}?redirect_uri=${encodeURIComponent(
    redirect,
  )}`;
}

export const INTEGRATION_TYPE_BY_PLATFORM: Record<Platform, string> = {
  snap: "snapchat",
  tiktok: "tiktok",
  insta: "instagram",
  google: "googleads",
};

function nf(n: number): string {
  return new Intl.NumberFormat("ar-SA", { maximumFractionDigits: 1 }).format(n);
}

function currency(n: number): string {
  return `${nf(Math.round(n))} ر.س`;
}

function pct(n: number, digits = 2): string {
  return `${(n * 100).toFixed(digits)}%`;
}

function toStatusKind(raw?: string): StatusKind {
  const s = (raw ?? "").toLowerCase();
  if (s === "active" || s === "enabled" || s === "live") return "live";
  if (s === "paused" || s === "pause") return "paused";
  if (s === "draft") return "draft";
  if (s === "ended" || s === "completed" || s === "archived") return "ended";
  return "live";
}

export function mapCampaignsToRows(
  campaigns: UnifiedCampaign[],
  platformHint?: Platform,
): CampaignRow[] {
  return campaigns.map((c, idx) => {
    const spend = c.spend ?? 0;
    const total = c.budget_total ?? c.budget ?? 0;
    const pctSpent = total > 0 ? Math.min(1, spend / total) : 0;
    const platform: Platform =
      platformFromIntegration(c.platform) ?? platformHint ?? "snap";
    const ctrValue = c.ctr ?? (c.impressions ? (c.clicks ?? 0) / c.impressions : 0);
    const roasValue = c.roas ?? 0;

    return {
      id: c.id ?? `campaign-${idx}`,
      name: c.name ?? "(بدون اسم)",
      subtitle: c.objective ?? "",
      thumb: "linear-gradient(135deg,#f6a64b,#d64b7e 45%,#8a3fb0)",
      platforms: [platform],
      status: toStatusKind(c.status),
      budget: {
        spent: currency(spend),
        total: total > 0 ? currency(total) : "—",
        pct: pctSpent,
        tone: pctSpent > 0.9 ? "warn" : "accent",
      },
      spend: currency(spend),
      ctr: pct(ctrValue),
      conversions: nf(c.conversions ?? 0),
      roas: roasValue ? `${roasValue.toFixed(2)}x` : "—",
      roasTone: roasValue >= 2 ? "good" : roasValue > 0 ? "muted" : "bad",
    };
  });
}

export function buildKpisFromMetrics(m: UnifiedMetrics): Kpi[] {
  const make = (
    label: string,
    value: string,
    color: string,
    meta: string,
  ): Kpi => ({
    label,
    value,
    deltaLabel: "—",
    deltaDirection: "up",
    meta,
    dotColor: color,
    spark: { color, values: [] },
  });
  return [
    make(
      "الإنفاق الكلي",
      m.spend ? currency(m.spend) : "—",
      "var(--accent)",
      m.spend ? "من البيانات الحيّة" : "لا توجد بيانات",
    ),
    make(
      "الظهور (Impressions)",
      m.impressions ? nf(m.impressions) : "—",
      "var(--ink-2)",
      m.impressions ? "من البيانات الحيّة" : "لا توجد بيانات",
    ),
    make(
      "النقرات (Clicks)",
      m.clicks ? nf(m.clicks) : "—",
      "var(--ink-2)",
      m.clicks ? `CTR ${pct(m.ctr)}` : "لا توجد بيانات",
    ),
    make(
      "التحويلات",
      m.conversions ? nf(m.conversions) : "—",
      "var(--ink-2)",
      m.cpa ? `CPA ${currency(m.cpa)}` : "لا توجد بيانات",
    ),
  ];
}

const PLATFORM_LABEL: Record<Platform, string> = {
  snap: "Snap Ads",
  tiktok: "TikTok Ads",
  insta: "Instagram Ads",
  google: "Google Ads",
};

export function buildPlatformPerformance(
  m: UnifiedMetrics,
): PlatformPerformance[] {
  const rows: PlatformPerformance[] = [];
  for (const [key, v] of Object.entries(m.byPlatform)) {
    const platform = platformFromIntegration(key);
    if (!platform) continue;
    rows.push({
      id: platform,
      name: PLATFORM_LABEL[platform],
      activeCount: "—",
      spend: currency(v.spend),
      impressions: nf(v.impressions),
      ctr: pct(v.ctr),
      ctrTrend: "up",
      cpa: v.cpa ? currency(v.cpa) : "—",
    });
  }
  return rows;
}

function toConnectionStatus(c: UnifiedConnection): ConnectionStatus {
  if (c.is_active === false) return "disconnected";
  const expires = c.auth?.expires_at ? Date.parse(c.auth.expires_at) : NaN;
  if (!Number.isNaN(expires)) {
    const days = (expires - Date.now()) / (1000 * 60 * 60 * 24);
    if (days < 0) return "disconnected";
    if (days < 7) return "expiring";
  }
  return "connected";
}

function formatDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

export function mapConnections(raw: UnifiedConnection[]): Connection[] {
  const out: Connection[] = [];
  for (const c of raw) {
    const platform = platformFromIntegration(c.integration_type);
    if (!platform) continue;
    out.push({
      platform,
      status: toConnectionStatus(c),
      connectedAt: formatDate(c.created_at),
      accountId: c.id,
      accountName: PLATFORM_LABEL[platform],
      adAccounts: 1,
      lastSyncAt: formatDate(c.updated_at),
      pixelActive: false,
      eventsApi: false,
      tokenExpiresAt: formatDate(c.auth?.expires_at),
      scopes: c.categories ?? [],
    });
  }
  return out;
}
