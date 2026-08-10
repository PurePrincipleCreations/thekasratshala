import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import BiomechanicalOverlay from "./biomechanical/BiomechanicalOverlay";

const spirals = [
  { id: "Tools", label: "Tools" },
  { id: "Yoga", label: "Yoga" },
  { id: "Breath", label: "Breath" },
  { id: "Strength", label: "Strength" },
  { id: "Play", label: "Play" },
  { id: "Community", label: "Community" }
];

export default function OneFlowContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="bg-[var(--night)]">
      <section className="py-32 px-6">
        <div className="section-inner max-w-4xl space-y-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="label-caps text-[var(--gold)]">One Flow Gathering</p>
            <h1 className="editorial-heading text-6xl md:text-8xl">One day. One field.<br />A shared practice.</h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[var(--muted)] text-xl italic leading-relaxed mx-auto max-w-2xl">
            One Flow is an in-person gathering for movers, coaches, yogis, artists and curious beginners. Tools, yoga, breath and play are not separate disciplines here.
          </motion.p>
        </div>
      </section>

      {/* The Spiral Animation */}
      <section ref={containerRef} className="relative h-[300vh] bg-[var(--night)] overflow-hidden">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-[600px] h-[600px] flex items-center justify-center">
            {spirals.map((s, i) => {
              const angle = (i * 360) / spirals.length;
              const radius = 220;
              const tx = useTransform(scrollYProgress, [0, 0.7, 0.9, 1], [
                Math.cos((angle * Math.PI) / 180) * radius,
                Math.cos((angle * Math.PI) / 180) * 10,
                0,
                0
              ]);
              const ty = useTransform(scrollYProgress, [0, 0.7, 0.9, 1], [
                Math.sin((angle * Math.PI) / 180) * radius,
                Math.sin((angle * Math.PI) / 180) * 10,
                0,
                0
              ]);
              const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

              return (
                <motion.div
                  key={s.id}
                  style={{ x: tx, y: ty, opacity }}
                  className="absolute"
                >
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="w-32 h-32"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1.05 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, delay: i * 0.5 }}
                  >
                    <motion.circle
                      cx="50" cy="50" r="40"
                      fill="none" stroke="var(--gold)" strokeWidth="0.5"
                      strokeDasharray="10 5"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <text x="50" y="55" textAnchor="middle" fill="var(--cream)" fontSize="8" className="label-caps">{s.label}</text>
                  </motion.svg>
                </motion.div>
              );
            })}

            {/* The Central Circle that appears at the end */}
            <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]) }}
              className="absolute text-center space-y-6"
            >
               <motion.svg viewBox="0 0 100 100" className="w-64 h-64 mx-auto">
                 <motion.circle 
                  cx="50" cy="50" r="45" 
                  fill="none" stroke="var(--gold)" strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                 />
               </motion.svg>
               <div className="space-y-2">
                 <h2 className="editorial-heading text-5xl">ONE FLOW</h2>
                 <p className="label-caps text-[var(--muted)] text-[10px]">One day. One field. A shared practice.</p>
                 <button className="mt-8 px-8 py-4 bg-[var(--gold)] text-[var(--night)] label-caps">
                    Ask about the next gathering
                 </button>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional sections */}
      <section className="py-32 px-6 border-t border-[var(--bone)]">
        <div className="section-inner grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <p className="label-caps text-[var(--gold)]">01</p>
            <h3 className="editorial-heading text-3xl">Movement Has Geometry</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed italic">Understanding the underlying patterns of how we move through space and load.</p>
          </div>
          <div className="space-y-4">
            <p className="label-caps text-[var(--gold)]">02</p>
            <h3 className="editorial-heading text-3xl">Come As You Are</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed italic">Open to all movers, artists and curious beginners ready to explore.</p>
          </div>
          <div className="space-y-4">
            <p className="label-caps text-[var(--gold)]">03</p>
            <h3 className="editorial-heading text-3xl">In a Shared Field</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed italic">A collective exploration where disciplines dissolve into practice.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
