"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Chip({
  children,
  active,
  onClick,
  onRemove,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
  tone?: "default" | "accent" | "good" | "warn" | "bad";
}) {
  const tones: Record<string, string> = {
    default: active
      ? "bg-ink text-bg border-ink"
      : "bg-panel text-ink-2 border-line hover:border-line-2 hover:text-ink",
    accent: active
      ? "bg-accent text-white border-accent"
      : "bg-accent-soft text-accent border-transparent hover:brightness-95",
    good: "bg-good-bg text-good border-transparent",
    warn: "bg-warn-bg text-warn border-transparent",
    bad: "bg-bad-bg text-bad border-transparent",
  };

  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-[6px] rounded-full border px-[10px] py-[4px] text-[12px] font-medium transition-colors",
        tones[tone],
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ms-[2px] text-current/60 hover:text-current"
          aria-label="إزالة"
        >
          <X size={12} strokeWidth={2} />
        </button>
      ) : null}
    </Tag>
  );
}
