import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-xs font-semibold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5938F5] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#5938F5] text-white shadow-sm hover:bg-[#4726DB] active:scale-[0.98]",
        destructive:
          "bg-[#DC2626] text-white shadow-sm hover:bg-red-700 active:scale-[0.98]",
        outline:
          "border border-[#E5E7EB] bg-white text-[#17172A] shadow-2xs hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]",
        secondary:
          "bg-slate-100 text-[#17172A] hover:bg-slate-200/80 active:scale-[0.98]",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-[#17172A]",
        link:
          "text-[#5938F5] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-[8px] px-3 text-xs",
        lg: "h-11 rounded-[8px] px-6 text-sm font-semibold",
        icon: "h-9 w-9",
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
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
