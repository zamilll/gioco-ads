"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  className,
}: {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (next: [number, number]) => void;
  className?: string;
}) {
  const [lo, hi] = value;
  const loPct = ((lo - min) / (max - min)) * 100;
  const hiPct = ((hi - min) / (max - min)) * 100;

  const handle = (which: "lo" | "hi") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (which === "lo") onChange([Math.min(v, hi - step), hi]);
    else onChange([lo, Math.max(v, lo + step)]);
  };

  return (
    <div className={cn("relative h-[32px] w-full", className)}>
      <div className="absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-chip" />
      <div
        className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-accent"
        style={{
          insetInlineStart: `${loPct}%`,
          insetInlineEnd: `${100 - hiPct}%`,
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={lo}
        onChange={handle("lo")}
        className="range-thumb absolute inset-x-0 top-0 h-full w-full appearance-none bg-transparent"
        style={{ pointerEvents: "none" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={hi}
        onChange={handle("hi")}
        className="range-thumb absolute inset-x-0 top-0 h-full w-full appearance-none bg-transparent"
        style={{ pointerEvents: "none" }}
      />
      <style jsx>{`
        .range-thumb::-webkit-slider-thumb {
          pointer-events: auto;
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: var(--panel);
          border: 2px solid var(--accent);
          box-shadow: var(--shadow-sm);
          cursor: pointer;
        }
        .range-thumb::-moz-range-thumb {
          pointer-events: auto;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: var(--panel);
          border: 2px solid var(--accent);
          box-shadow: var(--shadow-sm);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
