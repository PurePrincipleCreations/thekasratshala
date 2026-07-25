import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroOverlay() {
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

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mx-auto mb-8 w-24 h-24 rounded-full border border-[var(--gold)]/50 flex items-center justify-center"
          style={{ boxShadow: "0 0 40px color-mix(in oklab, var(--gold) 35%, transparent), inset 0 0 20px color-mix(in oklab, var(--gold) 15%, transparent)" }}
        >
          <span className="text-4xl text-[var(--gold-bright)]" style={{ fontFamily: "var(--font-deva)" }}>क</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hand-title text-7xl md:text-9xl text-[var(--heading)] leading-none"
        >
          Kasratshala
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="section-sub text-xl md:text-2xl mt-2"
        >
          Movement Arts Dojo
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-sm tracking-[0.3em] uppercase text-[var(--muted)] mt-6"
        >
          Bir · Himachal Pradesh · India
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="section-sub text-base md:text-lg mt-8 max-w-xl mx-auto"
        >
          Rooted in the Gurukul tradition · Under the sacred tree
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5, duration: 1 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">Descend</span>
        <ChevronDown size={18} className="text-[var(--gold)]" />
      </motion.div>
    </section>
  );
}
