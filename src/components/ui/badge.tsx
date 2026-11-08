import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold transition-colors focus:outline-none select-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#5938F5] text-white shadow-2xs hover:bg-[#4726DB]",
        secondary:
          "border-[#E5E7EB] bg-slate-50 text-[#17172A] hover:bg-slate-100",
        destructive:
          "border-rose-200 bg-rose-50 text-[#DC2626]",
        success:
          "border-emerald-200 bg-emerald-50 text-[#16A34A]",
        warning:
          "border-amber-200 bg-amber-50 text-[#F59E0B]",
        outline:
          "border-[#E5E7EB] text-[#17172A]",
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
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
