import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ksLogo from "@/assets/ks-logo.png.asset.json";

const markers = [
  { n: "01", label: "body first" },
  { n: "360°", label: "movement practice" },
  { n: "India", label: "rooted, online" },
];

export default function HeroOverlay() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 700px at 50% 40%, color-mix(in oklab, var(--teal) 22%, transparent), transparent 60%), radial-gradient(800px 600px at 50% 90%, color-mix(in oklab, var(--bark) 60%, transparent), transparent 70%), #080A0C",
        }}
      />
      <div className="absolute inset-0 opacity-40" style={{
        background: "radial-gradient(circle at 50% 55%, transparent 30%, #080A0C 75%)"
      }} />

      <div className="relative z-10 text-center px-6 py-28">
        <motion.img
          src={ksLogo.url}
          alt="The Kasrat Shala logo — a tree with a monkey"
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mx-auto mb-6 w-[min(420px,80vw)]"
        />

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-sm tracking-[0.3em] uppercase text-[var(--muted)]"
        >
          Movement Arts Dojo · Naggar, Himachal Pradesh
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hand-title text-6xl md:text-8xl text-[var(--heading)] leading-none mt-4"
        >
          Movement nourishment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="section-sub text-base md:text-lg mt-6 max-w-2xl mx-auto"
        >
          Kasratshala is a movement arts dojo bringing ancient tools, yoga, martial arts and modern
          movement science into one living practice — built for how bodies actually move
          bio-mechanically.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mt-6"
        >
          Ancient tools. Modern movement science. One body.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <button
            onClick={() => scrollTo("courses")}
            className="px-7 py-3 bg-[var(--gold)] text-[var(--night)] text-xs tracking-[0.25em] uppercase hover:bg-[var(--gold-bright)] transition"
          >
            Explore online courses
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-7 py-3 border border-[var(--gold)]/50 text-[var(--gold)] text-xs tracking-[0.25em] uppercase hover:bg-[var(--gold)] hover:text-[var(--night)] transition"
          >
            Speak with us
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12"
        >
          {markers.map((m) => (
            <div key={m.n} className="text-center">
              <p className="section-title text-2xl text-[var(--gold-bright)]">{m.n}</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] mt-1">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5, duration: 1 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">Movement, made fun</span>
        <ChevronDown size={18} className="text-[var(--gold)]" />
      </motion.div>
    </section>
  );
}
