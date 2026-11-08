import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // Only apply default horizontal padding if caller didn't provide custom pl/pr/px
    const hasCustomPl = className?.includes("pl-");
    const hasCustomPr = className?.includes("pr-");
    const hasCustomPx = className?.includes("px-");
    const defaultPadding = hasCustomPl || hasCustomPr || hasCustomPx ? "" : "px-3.5";

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-[8px] border border-[#E5E7EB] bg-white py-2 text-xs text-[#17172A] shadow-2xs transition-colors file:border-0 file:bg-transparent file:text-xs file:font-semibold placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-[#5938F5] focus-visible:ring-2 focus-visible:ring-[#5938F5]/10 disabled:cursor-not-allowed disabled:opacity-50",
          defaultPadding,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
