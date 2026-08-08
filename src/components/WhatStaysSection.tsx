import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion, AnimatePresence } from "framer-motion";
import MovementPath, { type MovementPathType } from "./MovementPath";
import { EASE, reveal, inViewOnce } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-mobile";

const stages: { n: string; title: string; body: string; path: MovementPathType }[] = [
  {
    n: "01",
    title: "More signal",
    body: "Attention before intensity. You learn to read what the body is telling you, and train that.",
    path: "breath",
  },
  {
    n: "02",
    title: "More range",
    body: "Strength that travels through angles, not only through repetitions.",
    path: "mace",
  },
  {
    n: "03",
    title: "More ownership",
    body: "A practice you can carry on your own, in your own body, wherever you train.",
    path: "yoga",
  },
];

export default function WhatStaysSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(stages.length - 1, Math.max(0, Math.floor(v * stages.length)));
    setIndex(next);
  });

  const pinned = !isMobile && !reduce;

  return (
    <section id="what-stays" className="relative bg-[var(--alt)]/50">
      <div className="section-inner pt-32">
        <motion.div initial="hidden" whileInView="show" viewport={inViewOnce} variants={reveal} className="text-center">
          <div className="label-caps mb-4">What stays</div>
          <h2 className="section-title text-4xl md:text-6xl max-w-3xl mx-auto">
            What you keep after the practice.
          </h2>
          <div className="gold-line mt-6 mx-auto" />
        </motion.div>
      </div>

      {pinned ? (
        <div ref={ref} style={{ height: "250vh" }} className="relative">
          <div className="sticky top-0 h-screen flex items-center">
            <div className="section-inner w-full grid md:grid-cols-[1fr_1fr] gap-16 items-center">
              <div className="relative pl-10">
                {/* vertical progress line */}
                <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--cream)]/12">
                  <motion.div className="w-px bg-[var(--teal)]" style={{ height: lineHeight }} />
                </div>

                <div className="relative min-h-[240px]">
                  <span
                    key={`n-${index}`}
                    className="section-title absolute -top-10 left-0 text-[9rem] leading-none text-[var(--cream)]/[0.07] select-none"
                    aria-hidden="true"
                  >
                    {stages[index].n}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={stages[index].title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.7, ease: EASE as unknown as number[] }}
                      className="relative pt-10"
                    >
                      <p className="label-caps mb-3">{stages[index].n}</p>
                      <h3 className="section-title text-4xl md:text-5xl mb-4">{stages[index].title}</h3>
                      <p className="text-[var(--cream)]/75 leading-relaxed max-w-md">{stages[index].body}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stages[index].path}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.8, ease: EASE as unknown as number[] }}
                  >
                    <MovementPath type={stages[index].path} size={340} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="section-inner py-20 space-y-6">
          {stages.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.06, ease: EASE as unknown as number[] } } }}
              className="relative border border-[var(--cream)]/10 rounded-sm p-8 bg-[var(--page)] overflow-hidden"
            >
              <span className="section-title absolute right-4 top-0 text-[6rem] leading-none text-[var(--cream)]/[0.06]" aria-hidden="true">
                {s.n}
              </span>
              <p className="label-caps mb-3">{s.n}</p>
              <h3 className="section-title text-3xl mb-3">{s.title}</h3>
              <p className="text-[var(--cream)]/75 leading-relaxed max-w-md">{s.body}</p>
              <MovementPath type={s.path} size={120} className="mt-6" />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
