import { motion } from "framer-motion";

const pillars = [
  { sk: "Force", en: "Steel & load", body: "Mace, kettlebells and rope from the akhara lineage." },
  { sk: "Breath", en: "Pranayama", body: "Regulation, capacity and attention, trained deliberately." },
  { sk: "Structure", en: "Mechanics", body: "Levers, angles and sequencing you can actually apply." },
  { sk: "Rhythm", en: "Flow", body: "Yoga, locomotion and play woven into one practice." },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.08 } }),
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-24">
      <div className="section-inner">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={reveal} className="flex flex-col items-center text-center mb-16">
          <div className="root-badge mb-6">The Dojo</div>
          <h2 className="section-title text-5xl md:text-6xl max-w-3xl">A different relationship with strength.</h2>
          <div className="gold-line mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}>
            <p className="section-sub text-lg mb-6">
              Not fitness as repetition. Practice as intelligence.
            </p>
            <p className="text-[var(--cream)]/80 leading-relaxed mb-6">
              Understanding force, breath, structure, rhythm — and where to apply them.
            </p>
            <p className="text-[var(--cream)]/80 leading-relaxed mb-6">
              We blend the akhara lineage of steel mace, kettlebells and rope with yoga, pranayama and
              movement mechanics. The result is a precise, adaptable practice for real bodies — whether
              you train from home or join us in Naggar.
            </p>
            <p className="text-[var(--cream)]/80 leading-relaxed">
              Our online courses make this work accessible across India and beyond. Residential practice
              is available through direct enquiry.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {["Rooted, online"].map((t) => (
                <span key={t} className="text-xs tracking-widest uppercase text-[var(--muted)] border border-[var(--cream)]/10 rounded-full px-3 py-1">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="relative">
            <div className="rounded-sm border border-[var(--gold)]/20 p-10 bg-[var(--alt)]/50 mb-8">
              <p className="section-title text-3xl leading-snug text-[var(--heading)]">
                Ancient tools. Modern movement science. One body.
              </p>
              <p className="section-sub mt-3">Movement, made fun</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.sk}
                  custom={i}
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
                  className="border border-[var(--cream)]/10 rounded-sm p-5 bg-[var(--page)] hover:border-[var(--gold)]/40 transition"
                >
                  <p className="section-title text-2xl">{p.sk}</p>
                  <p className="section-sub text-sm mb-2">{p.en}</p>
                  <p className="text-xs text-[var(--cream)]/60 leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
