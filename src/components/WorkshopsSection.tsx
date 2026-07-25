import { motion } from "framer-motion";

const items = [
  { title: "Spring Awakening", date: "Mar 21 — Mar 27", spots: 8, body: "Rebirth practice. Long sun salutations, mobility, and the first breath of the mountain thaw." },
  { title: "Monsoon Intensive", date: "Jul 14 — Jul 24", spots: 6, body: "Ten days indoors with mace and rope. The rain teaches patience; the body learns to wait." },
  { title: "Harvest Flow", date: "Oct 8 — Oct 14", spots: 10, body: "Golden light, thin air, apple orchards. A softer immersion — movement, cooking, and long walks." },
  { title: "Silent Retreat", date: "Dec 20 — Dec 30", spots: 5, body: "Vow of silence. Practice at dawn, meditation at dusk. Only the body speaks for ten days." },
];

export default function WorkshopsSection() {
  return (
    <section id="workshops" className="relative py-32">
      <div className="section-inner">
        <div className="text-center mb-16">
          <div className="root-badge mb-6">ऋतु — The Season</div>
          <h2 className="section-title text-5xl md:text-6xl">Workshops & Retreats</h2>
          <p className="section-sub mt-3">Come for a week. Leave slower.</p>
          <div className="gold-line mt-6 mx-auto" />
        </div>

        <div className="space-y-4">
          {items.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
              className="grid md:grid-cols-[1fr_2fr_auto] gap-6 md:items-center border border-[var(--cream)]/10 rounded-sm p-6 bg-[var(--alt)]/40 hover:border-[var(--gold)]/40 transition"
            >
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[var(--teal-glow)] mb-1">{w.date}</p>
                <h3 className="section-title text-2xl">{w.title}</h3>
              </div>
              <p className="text-[var(--cream)]/70 text-sm leading-relaxed">{w.body}</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--teal-glow)] shadow-[0_0_6px_var(--teal-glow)]" />
                <span className="text-xs text-[var(--muted)]">{w.spots} spots</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-16 rounded-sm p-10 text-center"
          style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--teal) 35%, var(--night)), color-mix(in oklab, var(--bark) 60%, var(--night)))" }}
        >
          <p className="section-title text-2xl md:text-3xl italic text-[var(--heading)]">
            "Ten days is not a workshop. It is a small life."
          </p>
          <p className="section-sub mt-3">— from the field notebook</p>
        </motion.div>
      </div>
    </section>
  );
}
