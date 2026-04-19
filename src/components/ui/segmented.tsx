"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SegmentedItem<T extends string> {
  value: T;
  label: React.ReactNode;
}

export function Segmented<T extends string>({
  items,
  value,
  onChange,
  className,
}: {
  items: SegmentedItem<T>[];
  value: T;
  onChange: (next: T) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex gap-[2px] rounded-[10px] bg-chip p-[3px]",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              "rounded-[8px] px-[12px] py-[6px] text-[12.5px] font-medium transition-colors",
              active
                ? "bg-panel text-ink font-semibold shadow-token-sm"
                : "text-ink-3 hover:text-ink-2",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
