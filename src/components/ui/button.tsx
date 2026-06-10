import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060608] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "btn-shimmer neon-gold-soft relative overflow-hidden bg-amber-600 text-white shadow-[0_0_28px_rgba(217,119,6,0.48)] hover:bg-amber-500 hover:shadow-[0_0_48px_rgba(217,119,6,0.72)] active:scale-[0.98]",
        outline:
          "border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-sm hover:border-amber-600/35 hover:bg-amber-950/20 hover:text-white hover:shadow-[0_0_20px_rgba(217,119,6,0.2)] active:scale-[0.98]",
        ghost:
          "text-zinc-400 hover:bg-white/5 hover:text-white",
      },
      size: {
        default: "h-12 px-7 py-4",
        sm: "h-10 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-9 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
