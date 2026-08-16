import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import outdoorMace1 from "@/assets/outdoor_mace_1.png.asset.json";
import outdoorMace2 from "@/assets/outdoor_mace_2.png.asset.json";
import outdoorTraining from "@/assets/outdoor_training.png.asset.json";
import stickDrill from "@/assets/stick_drill.png.asset.json";
import feetDetail from "@/assets/feet_detail.png.asset.json";
import handMudra from "@/assets/hand_mudra.png.asset.json";
import prayerBreath from "@/assets/prayer_breath.png.asset.json";

type Frame = { src: string; alt: string; caption: string };

const columns: Frame[][] = [
  [
    { src: outdoorMace1.url, alt: "Mace training outdoors", caption: "Gada · open ground" },
    { src: feetDetail.url, alt: "Feet and ground contact", caption: "Contact · base" },
    { src: prayerBreath.url, alt: "Breath practice", caption: "Breath · stillness" },
  ],
  [
    { src: outdoorTraining.url, alt: "Outdoor training session", caption: "Session · Naggar" },
    { src: handMudra.url, alt: "Hand mudra detail", caption: "Detail · intention" },
  ],
  [
    { src: stickDrill.url, alt: "Stick drill practice", caption: "Drill · timing" },
    { src: outdoorMace2.url, alt: "Mace swing in the hills", caption: "Swing · rotation" },
  ],
];

function Column({ frames, speed }: { frames: Frame[]; speed: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className="space-y-8 md:space-y-12">
      {frames.map((frame, i) => (
        <motion.figure
          key={frame.src}
          initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-sm border border-[var(--bone)]"
        >
          <img
            src={frame.src}
            alt={frame.alt}
            loading="lazy"
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-[1400ms] ease-out"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-t from-[var(--night)] to-transparent">
            <span className="label-caps text-[8px] text-[var(--cream)]/70">{frame.caption}</span>
            <span className="font-hand text-sm text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              in practice
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </motion.div>
  );
}

export default function ScrollGallery() {
  return (
    <section className="relative py-20 md:py-24 px-6 bg-[var(--night)] overflow-hidden">
      <div className="section-inner">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4 max-w-xl">
            <p className="label-caps text-[var(--gold)]">The Dojo, in frames</p>
            <h2 className="editorial-heading text-4xl md:text-7xl leading-[0.9]">
              Practice happens<br />
              <span className="italic text-[var(--gold)]">outdoors.</span>
            </h2>
          </div>
          <p className="text-[var(--muted)] text-lg italic max-w-sm leading-relaxed">
            Stone, soil, breath and steel. Every frame here is a real session — no staging, no studio light.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 items-start">
          <Column frames={columns[0]} speed={40} />
          <div className="hidden md:block">
            <Column frames={columns[1]} speed={-40} />
          </div>
          <Column frames={columns[2]} speed={60} />
        </div>
      </div>
    </section>
  );
}
