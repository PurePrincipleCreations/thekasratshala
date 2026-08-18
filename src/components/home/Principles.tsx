import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import staffSkill from "@/assets/staff-skill.jpg.asset.json";
import macePose from "@/assets/mace_pose.png.asset.json";
import handsOnGrass from "@/assets/hands-on-grass.jpg.asset.json";
import handsContact from "@/assets/hands_contact.png.asset.json";
import suspensionStrength from "@/assets/suspension-strength.jpg.asset.json";
import workshopDiagram from "@/assets/mace-workshop.png.asset.json";
import squatSafety from "@/assets/squat-safety.jpg.asset.json";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import prayerBreath from "@/assets/prayer_breath.png.asset.json";
import BiomechanicalOverlay from "../biomechanical/BiomechanicalOverlay";

const principles = [
  {
    n: "01",
    title: "Self Care",
    subtitle: "Recovery, breath and daily maintenance",
    image: handsOnGrass,
    overlay: { circles: [{ cx: 200, cy: 300, r: 120 }], points: [{ x: 200, y: 300, label: "BREATH" }] }
  },
  {
    n: "02",
    title: "Strength",
    subtitle: "Steel, load and honest effort",
    image: suspensionStrength,
    overlay: { circles: [{ cx: 200, cy: 300, r: 80 }], points: [{ x: 200, y: 300, label: "LOAD" }] }
  },
  {
    n: "03",
    title: "Skill",
    subtitle: "Coordination, flow and play",
    image: staffSkill,
    overlay: { circles: [{ cx: 200, cy: 300, r: 100 }], paths: ["M50 300 Q200 500 350 300"], points: [{ x: 200, y: 300, label: "FLOW" }] }
  },
  {
    n: "04",
    title: "Safety",
    subtitle: "Mechanics, alignment and longevity",
    image: squatSafety,
    overlay: { paths: ["M100 100 L300 500"], points: [{ x: 200, y: 300, label: "ALIGNMENT" }] }
  },
  {
    n: "05",
    title: "Spirituality",
    subtitle: "Attention, stillness and the inner witness",
    image: handsContact,
    overlay: { circles: [{ cx: 200, cy: 300, r: 140 }, { cx: 200, cy: 300, r: 180 }], points: [{ x: 200, y: 300, label: "STILLNESS" }] }
  }
];

const STEP = 1 / principles.length;

export default function Principles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

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
    <section ref={containerRef} className="relative md:h-[500vh] bg-[var(--night)]">
      {/* Desktop View */}
      <div className="hidden md:block sticky top-0 h-screen overflow-hidden">
        <div className="section-inner h-full flex flex-col justify-center py-20">
          <div className="flex items-center gap-12">
            <div className="w-1/2 space-y-12">
              <div className="space-y-4">
                <p className="label-caps text-[var(--gold)] tracking-widest text-xs">THE KASRATSHALA WAY</p>
                <h2 className="editorial-heading text-6xl">A different relationship with your body.</h2>
              </div>

              <div className="relative h-64">
                {principles.map((p, i) => {
                  const opacity = useTransform(scrollYProgress,
                    [i * STEP, i * STEP + STEP * 0.4, (i + 1) * STEP - STEP * 0.4, (i + 1) * STEP],
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
                    [i * STEP, i * STEP + STEP * 0.4, (i + 1) * STEP - STEP * 0.4, (i + 1) * STEP],
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
      </div>

      {/* Mobile View - Now with smooth scroll reveal and longer presence */}
      <div className="md:hidden py-32 space-y-32 px-6">
        <div className="space-y-6">
          <p className="label-caps text-[var(--gold)] tracking-widest text-[12px]">THE KASRATSHALA WAY</p>
          <h2 className="editorial-heading text-5xl leading-tight">A different relationship with your body.</h2>
        </div>
        {principles.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ 
              once: false, // Allow re-animating for scroll effect
              margin: "-10% 0px -20% 0px" // Trigger slightly earlier and stay longer
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="relative aspect-square border border-[var(--bone)] rounded-sm overflow-hidden bg-[var(--night)]">
              <motion.img 
                src={p.image.url} 
                className="w-full h-full object-cover grayscale opacity-60 mix-blend-screen" 
                alt={p.title}
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 2 }}
              />
              <div className="absolute inset-0">
                <BiomechanicalOverlay {...p.overlay} opacity={0.7} />
              </div>
            </div>
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="editorial-heading text-7xl text-[var(--gold)] opacity-50"
              >
                {p.n}
              </motion.p>
              <h3 className="editorial-heading text-4xl">{p.title}</h3>
              <p className="label-caps text-[var(--muted)] font-serif italic text-sm normal-case tracking-normal leading-relaxed">{p.subtitle}</p>
            </div>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px w-full bg-gradient-to-r from-[var(--gold)]/50 to-transparent origin-left" 
              aria-hidden="true" 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
