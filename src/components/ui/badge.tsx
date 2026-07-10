import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-white/8 bg-white/[0.03] text-zinc-500",
        section:
          "border-white/12 bg-white/[0.04] text-zinc-400 shadow-none",
        neon:
          "border-amber-600/35 bg-amber-950/30 text-amber-400 shadow-none",
        glass:
          "border-white/10 bg-white/[0.04] text-zinc-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
