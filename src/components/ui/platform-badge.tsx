import { cn } from "@/lib/utils";

export type Platform = "snap" | "tiktok" | "insta";

const STYLES: Record<Platform, string> = {
  snap: "bg-snap-bg text-[#8A6D00]",
  tiktok: "bg-tiktok text-white",
  insta:
    "text-white [background:linear-gradient(135deg,#F6A64B,#D64B7E_45%,#8A3FB0)]",
};

const GLYPH: Record<Platform, string> = {
  snap: "S",
  tiktok: "T",
  insta: "I",
};

export const PLATFORM_NAME: Record<Platform, string> = {
  snap: "Snap Ads",
  tiktok: "TikTok Ads",
  insta: "Instagram Ads",
};

export function PlatformBadge({
  platform,
  size = "md",
  className,
}: {
  platform: Platform;
  size?: "sm" | "md" | "xs";
  className?: string;
}) {
  const dim =
    size === "md"
      ? "w-[32px] h-[32px] rounded-[9px] text-[12px]"
      : size === "sm"
        ? "w-[24px] h-[24px] rounded-[7px] text-[10px]"
        : "w-[22px] h-[22px] rounded-[7px] text-[9px]";
  return (
    <span
      className={cn(
        "grid place-items-center font-bold mono",
        dim,
        STYLES[platform],
        className,
      )}
    >
      {GLYPH[platform]}
    </span>
  );
}

export function PlatformStack({ platforms }: { platforms: Platform[] }) {
  return (
    <div className="flex">
      {platforms.map((p, idx) => (
        <PlatformBadge
          key={p}
          platform={p}
          size="xs"
          className={cn(
            "ring-2 ring-panel",
            idx > 0 && "-ms-[6px]",
          )}
        />
      ))}
    </div>
  );
}
