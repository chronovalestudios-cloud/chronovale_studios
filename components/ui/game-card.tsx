import { cn } from "@/lib/utils"

interface GameCardProps {
  title: string
  status: string
  genre: string
  image: string
  className?: string
}

export function GameCard({ title, status, genre, image, className }: GameCardProps) {
  return (
    <div className={cn("cursor-target group relative w-[420px] h-[560px] bg-bg-surface border border-bg-border rounded-[4px] overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] shrink-0", className)}>
      <div className="absolute inset-0 transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]">
        <img src={image} alt={title} className="w-full h-full object-cover z-0" />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_40%,rgba(10,10,15,0.95)_100%)] pointer-events-none" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end">
        <span className="self-start px-3 py-1 bg-marigold text-warm-black text-[10px] font-mono rounded-full uppercase tracking-wider mb-3 font-bold">{genre}</span>
        <h3 className="font-heading font-bold text-[22px] text-warm-white leading-tight">{title}</h3>
        <p className="font-sans text-sm text-text-secondary mt-1">{status}</p>
      </div>
      
      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-[4px] shadow-[0_0_40px_var(--saffron-glow)] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-400" />
    </div>
  )
}
