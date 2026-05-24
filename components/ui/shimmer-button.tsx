import React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#E8943A", // Default to the new golden amber ember
      shimmerSize = "0.08em",
      shimmerDuration = "3s",
      borderRadius = "30px",
      background = "var(--warm-black)", // Dark background inside the button
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-target items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-8 py-4 [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-105 active:scale-95 font-display text-[15px] tracking-[0.15em] uppercase",
          className,
        )}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div className={cn("absolute inset-0 overflow-visible [container-type:size]")}>
          {/* spark */}
          <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="animate-spin-around absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        
        {/* Backdrop */}
        <div
          className={cn(
            "absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]",
          )}
        />
        
        {/* Content */}
        <div className="pointer-events-none relative z-10 flex items-center gap-2">
          {children}
        </div>
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";
