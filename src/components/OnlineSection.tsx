import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { EASE, reveal, inViewOnce } from "@/lib/motion";

const panels = [
  {
    title: "Movement Has Geometry",
    kind: "A study of rotation",
    body: "We use form, mechanics and attention to find a movement practice that is strong, skilled and alive.",
    meta: "One Flow · In person",
  },
  {
    title: "Come As You Are",
    kind: "Who it is for",
    body: "For movers, coaches, yogis, artists and curious beginners. You do not need prior mace or kettlebell experience to take part.",
    meta: "Practice over performance",
  },
  {
    title: "In a Shared Field",
    kind: "Where",
    body: "Gatherings are hosted in person, with the next location and practical details shared via email.",
    meta: "India · Dates on enquiry",
  },
];

const circles = [
  { label: "Tools", x: -120, y: -80 },
  { label: "Yoga", x: 120, y: -80 },
  { label: "Breath", x: -120, y: 80 },
  { label: "Play", x: 120, y: 80 },
];

function ConvergingCircle({
  label, cx, cy, index, converge,
}: { label: string; cx: number; cy: number; index: number; converge: MotionValue<number> }) {
  const x = useTransform(converge, (v) => cx * v - 125);
  const y = useTransform(converge, (v) => cy * v - 125);
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full border border-[var(--teal)]/35"
      style={{ width: "min(58vw, 250px)", height: "min(58vw, 250px)", x, y }}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={inViewOnce}
      transition={{ duration: 1.1, delay: index * 0.12, ease: EASE as unknown as number[] }}
    >
      <span className="label-caps text-[10px] text-[var(--teal)] -translate-y-[40%]">{label}</span>
    </motion.div>
  );
}

export default function OnlineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const converge = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.28]);
  const centreOpacity = useTransform(scrollYProgress, [0.55, 0.95], [0, 1]);

  return (
    <section id="gathering" className="relative py-32 bg-[var(--night)]/60">
      <div className="section-inner">
        <motion.div initial="hidden" whileInView="show" viewport={inViewOnce} variants={reveal} className="text-center mb-16">
          <div className="root-badge mb-6">Gathering · One day, one field</div>
          <h2 className="section-title text-5xl md:text-6xl">One Flow Gathering.</h2>
          <p className="section-sub mt-3 max-w-2xl mx-auto">
            A shared field for movement. One Flow gathers practitioners around breath, strength, tools,
            yoga and play — without separating the body into disciplines.
          </p>
          <div className="gold-line mt-6 mx-auto" />
        </motion.div>

        {/* Converging circles centrepiece */}
        <div ref={ref} className="relative mx-auto mb-16 h-[380px] md:h-[460px] max-w-2xl">
          {circles.map((c, i) => (
            <ConvergingCircle key={c.label} label={c.label} cx={c.x} cy={c.y} index={i} converge={converge} />
          ))}

          <motion.div
            style={{ opacity: centreOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
          >
            <p className="label-caps text-[var(--gold-bright)]">One Flow</p>
            <p className="section-sub mt-2 text-base">One day. One field. A shared practice.</p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden" whileInView="show" viewport={inViewOnce} variants={reveal}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <p className="section-title text-2xl md:text-3xl text-[var(--heading)] italic">
            Not a performance. Not a competition. A day to move together, learn through the body and
            meet other people who practise.
          </p>
          <p className="text-[var(--cream)]/75 leading-relaxed mt-6">
            The format can move between guided sessions, open practice, tool exploration and
            conversations about movement. It is intentionally in-person: a gathering only exists when we
            share space.
          </p>
          <p className="text-[var(--cream)]/75 leading-relaxed mt-4">
            Dates and locations are announced through the Kasratshala community. Write to us to receive
            the next invitation.
          </p>
          <a
            href="mailto:namaste@kasratshala.in"
            className="inline-block mt-8 px-7 py-3 border border-[var(--gold)]/50 text-[var(--gold-bright)] text-xs tracking-[0.25em] uppercase hover:bg-[var(--gold)] hover:text-[var(--page)] transition-colors duration-500"
          >
            Ask about the next gathering
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {panels.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce} transition={{ duration: 0.9, delay: i * 0.08, ease: EASE as unknown as number[] }}
              className="relative border border-[var(--teal)]/25 rounded-sm p-8 bg-[var(--page)] hover:border-[var(--teal)]/60 transition-colors duration-500"
            >
              <p className="label-caps mb-4 text-[var(--teal)]">{p.kind}</p>
              <h3 className="section-title text-2xl mb-4">{p.title}</h3>
              <p className="text-[var(--cream)]/70 text-sm leading-relaxed mb-6">{p.body}</p>
              <p className="text-xs text-[var(--muted)]">{p.meta}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
