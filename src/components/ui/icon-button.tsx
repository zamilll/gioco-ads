import * as React from "react";
import { cn } from "@/lib/utils";

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: "default" | "bad" | "accent";
  }
>(({ className, tone = "default", ...props }, ref) => {
  const tones = {
    default: "border-line text-ink-2 hover:text-ink hover:border-line-2",
    bad: "border-line text-bad hover:border-bad-bg hover:bg-bad-bg",
    accent: "border-line text-accent hover:bg-accent-soft hover:border-accent-soft",
  };
  return (
    <button
      ref={ref}
      className={cn(
        "grid h-[32px] w-[32px] place-items-center rounded-[9px] border bg-panel transition-colors",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
});
IconButton.displayName = "IconButton";
