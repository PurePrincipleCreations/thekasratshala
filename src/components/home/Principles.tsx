import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import macePose from "@/assets/mace_pose.png.asset.json";
import handsContact from "@/assets/hands_contact.png.asset.json";
import workshopDiagram from "@/assets/mace-workshop.png.asset.json";
import BiomechanicalOverlay from "../biomechanical/BiomechanicalOverlay";

const principles = [
  {
    n: "01",
    title: "Force",
    subtitle: "Steel and load",
    image: workshopDiagram,
    overlay: { circles: [{ cx: 200, cy: 300, r: 80 }], points: [{ x: 200, y: 300, label: "LOAD" }] }
  },
  {
    n: "02",
    title: "Breath",
    subtitle: "Regulation and capacity",
    image: handsContact,
    overlay: { circles: [{ cx: 200, cy: 300, r: 120 }, { cx: 200, cy: 300, r: 150 }], points: [{ x: 200, y: 300, label: "BREATH" }] }
  },
  {
    n: "03",
    title: "Structure",
    subtitle: "Mechanics and alignment",
    image: macePose,
    overlay: { paths: ["M100 100 L300 500"], points: [{ x: 200, y: 300, label: "ALIGNMENT" }] }
  },
  {
    n: "04",
    title: "Rhythm",
    subtitle: "Flow, play and coordination",
    image: handsContact,
    overlay: { circles: [{ cx: 200, cy: 300, r: 100 }], paths: ["M50 300 Q200 500 350 300"], points: [{ x: 200, y: 300, label: "FLOW" }] }
  }
];

export default function Principles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { damping: 30, stiffness: 200 });
  const springY = useSpring(0, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      springX.set((e.clientX - rect.left - rect.width / 2) * 0.05);
      springY.set((e.clientY - rect.top - rect.height / 2) * 0.05);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [springX, springY]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[var(--night)]">
      {/* Desktop View */}
      <div className="hidden md:block sticky top-0 h-screen overflow-hidden">
        <div className="section-inner h-full flex items-center gap-12 py-20">
          <div className="w-1/2 space-y-12">
            <div className="space-y-4">
              <p className="label-caps text-[var(--gold)]">The Kasratshala Way</p>
              <h2 className="editorial-heading text-6xl">A different relationship with strength.</h2>
              <p className="text-[var(--muted)] text-xl italic font-serif">Not fitness as repetition. Practice as intelligence.</p>
            </div>
            
            <div className="relative h-64">
              {principles.map((p, i) => {
                const opacity = useTransform(scrollYProgress, 
                  [i * 0.25, i * 0.25 + 0.1, (i + 1) * 0.25 - 0.1, (i + 1) * 0.25], 
                  [0, 1, 1, 0]
                );
                return (
                  <motion.div key={p.n} style={{ opacity }} className="absolute inset-0 space-y-4">
                    <p className="editorial-heading text-8xl text-[var(--bone)]">{p.n}</p>
                    <h3 className="editorial-heading text-5xl">{p.title}</h3>
                    <p className="label-caps text-[var(--muted)] font-serif italic text-sm normal-case tracking-normal">{p.subtitle}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="w-1/2 relative h-[70vh]">
            <div className="w-full h-full border border-[var(--bone)] rounded-sm overflow-hidden relative">
              {principles.map((p, i) => {
                const opacity = useTransform(scrollYProgress, 
                  [i * 0.25, i * 0.25 + 0.1, (i + 1) * 0.25 - 0.1, (i + 1) * 0.25], 
                  [0, 1, 1, 0]
                );
                return (
                  <motion.div 
                    key={p.n} 
                    style={{ opacity, x: springX, y: springY }} 
                    className="absolute inset-0"
                  >
                    <img src={p.image.url} className="w-full h-full object-cover grayscale opacity-50 mix-blend-screen" alt={p.title} />
                    <BiomechanicalOverlay {...p.overlay} />
                  </motion.div>
                );
              })}
            </div>
            {/* Progress line */}
            <div className="absolute -right-8 top-0 bottom-0 w-px bg-[var(--bone)]">
              <motion.div 
                style={{ scaleY: scrollYProgress }} 
                className="absolute top-0 w-full bg-[var(--gold)] origin-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden pt-20 pb-20 space-y-20 px-6">
        <div className="space-y-4">
          <p className="label-caps text-[var(--gold)]">The Kasratshala Way</p>
          <h2 className="editorial-heading text-4xl">A different relationship with strength.</h2>
        </div>
        {principles.map((p) => (
          <div key={p.n} className="space-y-6">
            <div className="relative aspect-square border border-[var(--bone)] rounded-sm overflow-hidden">
              <img src={p.image.url} className="w-full h-full object-cover grayscale opacity-50 mix-blend-screen" alt={p.title} />
              <BiomechanicalOverlay {...p.overlay} opacity={0.6} />
            </div>
            <div className="space-y-2">
              <p className="editorial-heading text-4xl text-[var(--bone)]">{p.n}</p>
              <h3 className="editorial-heading text-3xl">{p.title}</h3>
              <p className="label-caps text-[var(--muted)] font-serif italic text-xs normal-case tracking-normal">{p.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
