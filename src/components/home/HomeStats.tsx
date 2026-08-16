import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10, suffix: "", label: "Courses & modules", note: "online and offline" },
  { value: 5, suffix: "", label: "Pillars", note: "self care · strength · skill · safety · spirituality" },
  { value: 20, suffix: "+", label: "Years of practice", note: "in the Himalayas" },
  { value: 1, suffix: "", label: "One Flow Gathering", note: "multi-disciplinary artists" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 40, stiffness: 90 });
  const [display, setDisplay] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);
    if (mobile) setDisplay(value);
  }, [value]);

  useEffect(() => {
    if (inView && !isMobile) motionValue.set(value);
  }, [inView, isMobile, motionValue, value]);

  useEffect(() => {
    if (isMobile) return;
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsubscribe;
  }, [spring, isMobile]);

  return (
    <span ref={ref} className="editorial-heading text-6xl md:text-8xl leading-none text-[var(--cream)]">
      {display}
      <span className="text-[var(--gold)]">{suffix}</span>
    </span>
  );
}

export default function HomeStats() {
  return (
    <section className="py-20 md:py-24 px-6 bg-[var(--alt)] border-y border-[var(--bone)]">
      <div className="section-inner">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 relative"
            >
              <div className="w-full h-px bg-[var(--bone)] mb-8">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                  className="h-px bg-[var(--gold)] origin-left"
                />
              </div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="label-caps text-[10px] text-[var(--cream)]">{stat.label}</p>
              <p className="font-hand text-lg text-[var(--muted)] opacity-70">{stat.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
