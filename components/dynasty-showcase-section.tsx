import { AnimatedLotus, AnimatedChakra, AnimatedKolam, AnimatedTorana } from "@/components/ui/dynasty-animations";

export function DynastyShowcaseSection() {
  return (
    <section className="relative w-full py-24 bg-warm-black text-white-pure z-10">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="flex flex-col gap-3 mb-16">
          <p className="font-mono text-label uppercase tracking-widest text-amber">
            ◈ DYNASTY DESIGN SYSTEM
          </p>
          <h2 className="font-display font-bold text-h2">
            SACRED <span className="font-light text-text-secondary">GEOMETRY</span>
          </h2>
          <p className="font-sans text-body-lg text-text-secondary max-w-[640px]">
            Stroke animations inspired by the Kolam dot-grid system, Lotus concentric geometry, and traditional South Indian motifs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center gap-6 p-8 bg-bg-surface border border-bg-border rounded shadow-shallow relative overflow-hidden group hover:border-amber transition-colors duration-500">
            <div className="w-32 h-32 text-amber group-hover:scale-110 transition-transform duration-700">
              <AnimatedLotus />
            </div>
            <div className="text-center">
              <h3 className="font-display font-medium text-h3 mb-2">The Padma</h3>
              <p className="font-sans text-body-sm text-text-secondary">
                8-petal geometric form radiating from a centre point.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 p-8 bg-bg-surface border border-bg-border rounded shadow-shallow relative overflow-hidden group hover:border-amber transition-colors duration-500">
            <div className="w-32 h-32 text-amber group-hover:scale-110 transition-transform duration-700">
              <AnimatedChakra />
            </div>
            <div className="text-center">
              <h3 className="font-display font-medium text-h3 mb-2">The Chakra</h3>
              <p className="font-sans text-body-sm text-text-secondary">
                16-spoked wheel representing cosmic order and dharma.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 p-8 bg-bg-surface border border-bg-border rounded shadow-shallow relative overflow-hidden group hover:border-amber transition-colors duration-500">
            <div className="w-32 h-32 text-amber group-hover:scale-110 transition-transform duration-700">
              <AnimatedKolam />
            </div>
            <div className="text-center">
              <h3 className="font-display font-medium text-h3 mb-2">Kolam Grid</h3>
              <p className="font-sans text-body-sm text-text-secondary">
                Mathematical dot-grid system with continuous flowing lines.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 p-8 bg-bg-surface border border-bg-border rounded shadow-shallow relative overflow-hidden group hover:border-amber transition-colors duration-500">
            <div className="w-32 h-32 text-amber group-hover:scale-110 transition-transform duration-700">
              <AnimatedTorana />
            </div>
            <div className="text-center">
              <h3 className="font-display font-medium text-h3 mb-2">Torana Arch</h3>
              <p className="font-sans text-body-sm text-text-secondary">
                Pointed gateway arch above temple entrances and niches.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
