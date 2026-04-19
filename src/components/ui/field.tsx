import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-[12.5px] font-medium text-ink-2", className)}
      {...props}
    />
  );
}

export function SmallCapsLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-[11px] font-semibold uppercase tracking-widelabel text-ink-4",
        className,
      )}
      {...props}
    />
  );
}

export function Field({
  label,
  hint,
  error,
  required,
  className,
  children,
}: {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      {label ? (
        <div className="flex items-center justify-between">
          <Label>
            {label}
            {required ? <span className="text-bad ms-[2px]">*</span> : null}
          </Label>
          {hint ? (
            <span className="text-[11.5px] text-ink-3">{hint}</span>
          ) : null}
        </div>
      ) : null}
      {children}
      {error ? (
        <span className="text-[11.5px] text-bad">{error}</span>
      ) : null}
    </div>
  );
}
