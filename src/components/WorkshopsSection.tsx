import { motion } from "framer-motion";

const camps = [
  {
    title: "Yoga for Strength Camp",
    kind: "Residential immersion · Naggar",
    body: "A focused exploration of yoga as a system for usable strength: intelligent load, breath, mobility, balance and recovery.",
  },
  {
    title: "Kasrat Camp",
    kind: "Residential immersion · Naggar",
    body: "Our broadest immersion: steel mace, kettlebells, rope, yoga, breathwork and movement science woven into a full daily practice.",
  },
  {
    title: "Steel Mace Flow Camp",
    kind: "Residential immersion · Naggar",
    body: "Spend dedicated time with the mace: fundamental patterns, progressive flows, rotational mechanics and coaching feedback.",
  },
];

export default function WorkshopsSection() {
  return (
    <section id="camps" className="relative py-32">
      <div className="section-inner">
        <div className="text-center mb-16">
          <div className="root-badge mb-6">Camps</div>
          <h2 className="section-title text-5xl md:text-6xl">Come practise in the field.</h2>
          <p className="section-sub mt-3 max-w-2xl mx-auto">
            Kasratshala camps are in-person immersions for people who want more time, more attention and
            a shared rhythm of practice. Accommodation and formats are confirmed directly by email.
          </p>
          <div className="gold-line mt-6 mx-auto" />
        </div>

        <div className="space-y-4">
          {camps.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
              className="grid md:grid-cols-[1fr_2fr_auto] gap-6 md:items-center border border-[var(--cream)]/10 rounded-sm p-6 bg-[var(--alt)]/40 hover:border-[var(--gold)]/40 transition"
            >
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[var(--teal-glow)] mb-1">{w.kind}</p>
                <h3 className="section-title text-2xl">{w.title}</h3>
              </div>
              <p className="text-[var(--cream)]/70 text-sm leading-relaxed">{w.body}</p>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--muted)]">Naggar · Dates on enquiry</span>
                <a href="#contact" className="text-sm text-[var(--gold)] tracking-widest uppercase hover:text-[var(--gold-bright)]">Write to us →</a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-16 rounded-sm p-10 text-center"
          style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--teal) 35%, var(--night)), color-mix(in oklab, var(--bark) 60%, var(--night)))" }}
        >
          <p className="section-title text-2xl md:text-3xl text-[var(--heading)]">What to expect</p>
          <p className="text-[var(--cream)]/80 mt-3 max-w-2xl mx-auto leading-relaxed">
            Small groups, a practice-led schedule, movement education and time to be in the mountains.
            Camp places are not booked through checkout — email us first.
          </p>
          <a
            href="mailto:namaste@kasratshala.in"
            className="inline-block mt-6 px-7 py-3 border border-[var(--gold)]/60 text-[var(--gold)] text-xs tracking-[0.25em] uppercase hover:bg-[var(--gold)] hover:text-[var(--night)] transition"
          >
            Enquire by email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
