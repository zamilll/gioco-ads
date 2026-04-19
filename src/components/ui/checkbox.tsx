"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  checked,
  onCheckedChange,
  disabled,
  className,
  ...rest
}: {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "grid h-[16px] w-[16px] shrink-0 place-items-center rounded-[4px] border transition-colors",
        checked
          ? "border-accent bg-accent text-white"
          : "border-line-2 bg-panel hover:border-ink-3",
        disabled && "opacity-50",
        className,
      )}
      {...rest}
    >
      {checked ? <Check size={12} strokeWidth={3} /> : null}
    </button>
  );
}

export function Radio({
  checked,
  onCheckedChange,
  disabled,
  className,
}: {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(true)}
      className={cn(
        "grid h-[16px] w-[16px] shrink-0 place-items-center rounded-full border transition-colors",
        checked ? "border-accent bg-panel" : "border-line-2 bg-panel hover:border-ink-3",
        disabled && "opacity-50",
        className,
      )}
    >
      {checked ? (
        <span className="h-[8px] w-[8px] rounded-full bg-accent" />
      ) : null}
    </button>
  );
}
