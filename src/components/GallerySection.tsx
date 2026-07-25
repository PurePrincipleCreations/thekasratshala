import { motion } from "framer-motion";

const tiles = [
  { emoji: "🌳", label: "The Tree" },
  { emoji: "🏔️", label: "Dhauladhar" },
  { emoji: "🪨", label: "Stone Mandala" },
  { emoji: "🔥", label: "Kitchen Fire" },
  { emoji: "🌾", label: "Terraced Fields" },
  { emoji: "🕉️", label: "Morning Rite" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-32">
      <div className="section-inner">
        <div className="text-center mb-16">
          <div className="root-badge mb-6">दृश्य — Glimpses</div>
          <h2 className="section-title text-5xl md:text-6xl">The Room</h2>
          <div className="gold-line mt-6 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tiles.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group aspect-square relative overflow-hidden rounded-sm border border-[var(--cream)]/10"
              style={{ background: "linear-gradient(135deg, var(--alt), var(--night))" }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500">
                {t.emoji}
              </div>
              <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,10,12,0.9))" }}>
                <p className="section-sub">{t.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
