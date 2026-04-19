import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-[6px] font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        accent:
          "bg-accent text-white hover:brightness-110 font-semibold rounded-[10px]",
        ink: "bg-ink text-bg hover:-translate-y-[0.5px] font-semibold rounded-[10px]",
        ghost:
          "bg-panel border border-line text-ink-2 hover:text-ink hover:border-line-2 rounded-[10px]",
        subtle: "bg-chip text-ink-2 hover:text-ink rounded-[10px]",
      },
      size: {
        md: "px-[14px] py-[8px] text-[13px]",
        sm: "px-[12px] py-[6px] text-[12.5px]",
        xs: "px-[10px] py-[5px] text-[12px]",
        icon: "w-[34px] h-[34px] rounded-[9px] justify-center",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
