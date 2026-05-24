import { cn } from "@/lib/utils"

export function SectionLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("text-label text-saffron flex items-center mb-6", className)}>
      <span className="mr-2">◈</span>
      {children}
    </div>
  )
}
