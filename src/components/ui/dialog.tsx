"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onOpenChange]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center p-[16px]"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 w-full max-w-[480px] animate-in fade-in-0 zoom-in-95 duration-150">
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function DialogContent({
  className,
  children,
  onClose,
}: {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[16px] border border-line bg-panel shadow-token-md",
        className,
      )}
    >
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute start-[12px] top-[12px] grid h-[28px] w-[28px] place-items-center rounded-[8px] text-ink-3 hover:bg-chip hover:text-ink"
        >
          <X size={15} strokeWidth={1.8} />
        </button>
      ) : null}
      {children}
    </div>
  );
}

export function DialogHeader({
  title,
  subtitle,
  icon,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-[12px] border-b border-line px-[18px] py-[16px]">
      {icon}
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-semibold leading-tight">{title}</h3>
        {subtitle ? (
          <p className="mt-[4px] text-[12.5px] text-ink-3">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

export function DialogBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("px-[18px] py-[16px]", className)}>{children}</div>;
}

export function DialogFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-[8px] border-t border-line bg-bg/40 px-[18px] py-[12px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
