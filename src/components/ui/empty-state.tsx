import * as React from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondary,
  className,
  size = "md",
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  secondary?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const pad = size === "sm" ? "py-[40px]" : size === "lg" ? "py-[80px]" : "py-[60px]";
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        pad,
        className,
      )}
    >
      {icon ? (
        <div className="mb-[14px] grid h-[56px] w-[56px] place-items-center rounded-[16px] bg-chip text-ink-3">
          {icon}
        </div>
      ) : (
        <EmptyDecor />
      )}
      <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
      {description ? (
        <p className="mt-[6px] max-w-[440px] text-[13px] leading-[1.7] text-ink-3">
          {description}
        </p>
      ) : null}
      {action || secondary ? (
        <div className="mt-[16px] flex items-center gap-[8px]">
          {action}
          {secondary}
        </div>
      ) : null}
    </div>
  );
}

function EmptyDecor() {
  return (
    <svg
      width="72"
      height="56"
      viewBox="0 0 72 56"
      fill="none"
      className="mb-[14px] text-ink-4"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="10"
        width="60"
        height="36"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="3 4"
        opacity="0.55"
      />
      <circle cx="20" cy="28" r="3.2" fill="currentColor" opacity="0.45" />
      <rect x="30" y="22" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.35" />
      <rect x="30" y="30" width="18" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

export function EmptyCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-dashed border-line-2 bg-panel/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
