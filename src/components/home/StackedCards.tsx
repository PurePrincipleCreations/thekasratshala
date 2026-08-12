import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import outdoorMace1 from "@/assets/outdoor_mace_1.png.asset.json";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import prayerBreath from "@/assets/prayer_breath.png.asset.json";
import stickDrill from "@/assets/stick_drill.png.asset.json";

const cards = [
  {
    n: "01",
    title: "Tools before tricks",
    body: "Mace, club, stick and stone. The tool teaches the body what a cue never can — leverage, arc, and the honest weight of a mistake.",
    image: outdoorMace1.url,
  },
  {
    n: "02",
    title: "Breath as the metronome",
    body: "Every drill is timed to the exhale. When breath leads, effort stops being panic and becomes rhythm you can repeat tomorrow.",
    image: prayerBreath.url,
  },
  {
    n: "03",
    title: "Structure you can trust",
    body: "Joints stacked, ribs over pelvis, feet reading the ground. Strength that survives outside the mat is strength built on shape.",
    image: yogaPose.url,
  },
  {
    n: "04",
    title: "Practice, not programme",
    body: "You leave with a way of working — a daily grammar of force, breath, structure and rhythm you keep for years.",
    image: stickDrill.url,
  },
];

function Card({ i, total, card }: { i: number; total: number; card: (typeof cards)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.35]);

  return (
    <div ref={ref} className="h-[90vh] md:h-screen sticky top-0 flex items-center justify-center px-4 md:px-6">
      <motion.article
        style={{ scale, opacity, zIndex: i }}
        className="relative w-full max-w-5xl overflow-hidden rounded-sm border border-[var(--bone)] bg-[var(--forest)] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)]/80 via-[var(--night)]/20 to-transparent" />
            <span className="absolute top-5 left-5 label-caps text-[9px] text-[var(--cream)]">
              {card.n} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center gap-5">
            <span className="label-caps text-[9px] text-[var(--gold)]">Principle {card.n}</span>
            <h3 className="editorial-heading text-3xl md:text-5xl leading-[1.05] text-[var(--cream)]">
              {card.title}
            </h3>
            <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">{card.body}</p>
            <span className="font-hand text-xl text-[var(--gold)]">keep scrolling</span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function StackedCards() {
  return (
    <section className="relative bg-[var(--night)] border-y border-[var(--bone)]">
      <div className="section-inner pt-32 pb-10">
        <p className="label-caps text-[var(--gold)] mb-4">How we work</p>
        <h2 className="editorial-heading text-4xl md:text-7xl leading-[0.95] text-[var(--cream)] max-w-3xl">
          Four ideas that hold<br />
          <span className="italic text-[var(--gold)]">every session together.</span>
        </h2>
      </div>

      <div className="relative pb-32">
        {cards.map((c, i) => (
          <Card key={c.n} i={i} total={cards.length} card={c} />
        ))}
      </div>
    </section>
  );
}
