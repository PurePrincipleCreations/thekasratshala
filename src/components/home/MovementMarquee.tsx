import { motion } from "framer-motion";

const words = [
  "Force",
  "Breath",
  "Structure",
  "Rhythm",
  "Rotation",
  "Capacity",
  "Alignment",
  "Flow",
  "Kasratshala",
  "Dojo",
];

function Row({ reverse = false, opacity = 1 }: { reverse?: boolean; opacity?: number }) {
  const items = [...words, ...words];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 items-center gap-16 pr-16"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        style={{ opacity }}
      >
        {items.map((w, i) => (
          <span key={`${w}-${i}`} className="flex shrink-0 items-center gap-16">
            <span className="editorial-heading text-[12vw] md:text-[8vw] leading-none italic text-[var(--cream)] whitespace-nowrap uppercase tracking-tighter">
              {w}
            </span>
            <span className="w-3 h-3 rounded-full bg-[var(--gold)] opacity-40" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function MovementMarquee() {
  return (
    <div className="w-full flex flex-col gap-4 md:gap-8">
      <Row opacity={0.3} />
      <Row reverse opacity={0.15} />
      <Row opacity={0.08} />
    </div>
  );
}
