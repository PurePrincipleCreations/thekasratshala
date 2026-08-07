import { motion } from "framer-motion";

const tiles = [
  { label: "Steel Mace", note: "Rotational strength" },
  { label: "Kettlebell", note: "Ballistic power" },
  { label: "Rope Flow", note: "Fluidity" },
  { label: "Yoga", note: "Structure & mobility" },
  { label: "Pranayama", note: "Breath capacity" },
  { label: "Naggar", note: "In the mountains" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-32">
      <div className="section-inner">
        <div className="text-center mb-16">
          <div className="root-badge mb-6">The Practice</div>
          <h2 className="section-title text-5xl md:text-6xl">One living practice.</h2>
          <p className="section-sub mt-3">Tools, breath and mechanics — never separated into disciplines.</p>
          <div className="gold-line mt-6 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tiles.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group aspect-square relative overflow-hidden rounded-sm border border-[var(--cream)]/10 flex flex-col items-center justify-center text-center px-4"
              style={{ background: "linear-gradient(135deg, var(--alt), var(--night))" }}
            >
              <p className="section-title text-2xl md:text-3xl group-hover:text-[var(--gold-bright)] transition">{t.label}</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] mt-2">{t.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
