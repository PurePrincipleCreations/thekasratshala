import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import movingIntent1 from "@/assets/moving-intent-1.jpg.asset.json";
import movingIntent2 from "@/assets/moving-intent-2.jpg.asset.json";

export default function BeforeAfterScrub() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { damping: 40, stiffness: 120, mass: 0.4 });

  const clip = useTransform(smooth, [0.1, 0.9], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const linePos = useTransform(smooth, [0.1, 0.9], ["0%", "100%"]);
  const beforeOpacity = useTransform(smooth, [0.1, 0.5], [1, 0.25]);
  const afterOpacity = useTransform(smooth, [0.4, 0.85], [0.25, 1]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-[var(--night)]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="section-inner w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-3">
              <p className="label-caps text-[var(--gold)]">Then / Now</p>
              <h2 className="editorial-heading text-4xl md:text-6xl leading-[0.95] text-[var(--cream)]">
                From standing still<br />
                <span className="italic text-[var(--gold)]">to moving with intent.</span>
              </h2>
            </div>
            <p className="font-hand text-xl text-[var(--muted)] max-w-xs">
              scroll to wipe — same body, rebuilt mechanics
            </p>
          </div>

          <div className="relative aspect-[4/5] md:aspect-[16/9] max-h-[60vh] md:max-h-[52vh] w-full overflow-hidden rounded-sm border border-[var(--bone)]">
            {/* Before */}
            <img
              src={movingIntent1.url}
              alt="Before — grounding and base work"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-70"
            />
            {/* After, revealed by scroll */}
            <motion.img
              style={{ clipPath: clip }}
              src={movingIntent2.url}
              alt="After — movement mechanics"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)]/70 to-transparent pointer-events-none" />

            {/* Wipe line */}
            <motion.div
              style={{ left: linePos }}
              className="absolute top-0 bottom-0 w-px bg-[var(--gold)] pointer-events-none"
            >
              <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--gold)]" />
            </motion.div>

            {/* Labels */}
            <motion.span
              style={{ opacity: beforeOpacity }}
              className="absolute bottom-5 left-5 label-caps text-[9px] px-3 py-1.5 bg-[var(--night)]/80 text-[var(--cream)] border border-[var(--bone)]"
            >
              Before · base &amp; contact
            </motion.span>
            <motion.span
              style={{ opacity: afterOpacity }}
              className="absolute bottom-5 right-5 label-caps text-[9px] px-3 py-1.5 bg-[var(--night)]/80 text-[var(--gold)] border border-[var(--gold)]/40"
            >
              After · load &amp; rotation
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
