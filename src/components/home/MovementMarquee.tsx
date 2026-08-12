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
];

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...words, ...words];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 items-center gap-16 pr-16"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {items.map((w, i) => (
          <span key={`${w}-${i}`} className="flex shrink-0 items-center gap-16">
            <span className="editorial-heading text-[12vw] md:text-[5vw] leading-none italic text-[var(--cream)]/80 whitespace-nowrap">
              {w}
            </span>
            <span className="w-2 h-2 rounded-full bg-[var(--gold)] opacity-60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function MovementMarquee() {
  return (
    <section className="relative py-24 bg-[var(--night)] border-y border-[var(--bone)] overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[var(--night)] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[var(--night)] to-transparent pointer-events-none" />

      <div className="space-y-6">
        <Row />
        <Row reverse />
      </div>

      <p className="mt-16 text-center font-hand text-2xl text-[var(--gold)] opacity-70">
        one body, many languages
      </p>
    </section>
  );
}
