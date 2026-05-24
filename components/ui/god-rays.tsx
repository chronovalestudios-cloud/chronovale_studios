"use client";

import { cn } from "@/lib/utils";

export function GodRays({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen opacity-50 z-10", className)}>
      {/* Soft blur wrapper to give the shafts a natural hazy look without turning into a blob */}
      <div className="absolute inset-0 blur-[40px]">
        {/* Ray 1: Main wide beam */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[80%] h-[120%] origin-top-left animate-god-ray-slow"
          style={{
            background: "linear-gradient(110deg, rgba(255, 240, 200, 0.12) 0%, rgba(232, 148, 58, 0.04) 40%, transparent 70%)",
          }}
        />
        
        {/* Ray 2: Brighter, narrower inner beam */}
        <div 
          className="absolute top-[0%] left-[-5%] w-[40%] h-[100%] origin-top-left animate-god-ray-medium"
          style={{
            background: "linear-gradient(105deg, rgba(255, 248, 230, 0.15) 0%, rgba(201, 168, 76, 0.05) 30%, transparent 80%)",
          }}
        />
        
        {/* Ray 3: Angled accent ray */}
        <div 
          className="absolute top-[-20%] left-[5%] w-[60%] h-[130%] origin-top-left animate-god-ray-fast"
          style={{
            background: "linear-gradient(115deg, rgba(255, 240, 200, 0.1) 0%, rgba(232, 148, 58, 0.03) 50%, transparent 80%)",
          }}
        />
      </div>
    </div>
  );
}
