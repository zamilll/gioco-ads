import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-panel shadow-token-sm",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  title,
  subtitle,
  actions,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-line px-[18px] py-[14px]",
        className,
      )}
      {...props}
    >
      {title ? (
        <h3 className="text-[14px] font-semibold m-0">{title}</h3>
      ) : null}
      {subtitle ? (
        <span className="text-[12.5px] text-ink-3">{subtitle}</span>
      ) : null}
      {actions ? <div className="ms-auto">{actions}</div> : null}
    </div>
  );
}

export function CardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-[18px]", className)} {...props} />;
}
