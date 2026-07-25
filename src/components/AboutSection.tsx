import { motion } from "framer-motion";

const pillars = [
  { sk: "Sthira", en: "Steadiness", body: "The stillness the body finds in effort." },
  { sk: "Sukha", en: "Ease", body: "Grace threaded through every rep, every breath." },
  { sk: "Sadhana", en: "Practice", body: "The daily returning. The unglamorous devotion." },
  { sk: "Seva", en: "Service", body: "Movement offered — to self, teacher, and lineage." },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.08 } }),
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32">
      <div className="section-inner">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={reveal} className="flex flex-col items-center text-center mb-16">
          <div className="root-badge mb-6">मूल — The Root</div>
          <h2 className="section-title text-5xl md:text-6xl max-w-3xl">A dojo built the old way — under a tree.</h2>
          <div className="gold-line mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}>
            <p className="section-sub text-lg mb-6">The ancient akhara, remembered.</p>
            <p className="text-[var(--cream)]/80 leading-relaxed mb-6">
              Long before glass-fronted gyms and mirrored studios, movement was taught in open earth — beneath a wide-crowned tree, on a mandala of stone, under the eye of a teacher who ate, slept, and trained with his students. Kasratshala is our attempt to remember that room.
            </p>
            <p className="text-[var(--cream)]/80 leading-relaxed mb-6">
              A stone mandala platform. Modern equipment carefully chosen — parallettes, rings, mace, gada, clubs. A canopy of leaves overhead. The Himalayas as the fourth wall. Everything the body needs, nothing the mind must decode.
            </p>
            <p className="text-[var(--cream)]/80 leading-relaxed">
              This is Gurukul: living, cooking, and training in the same rhythm as the mountains that hold us.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {["Bir · Kangra Valley", "Himachal Pradesh", "1400m elevation"].map((t) => (
                <span key={t} className="text-xs tracking-widest uppercase text-[var(--muted)] border border-[var(--cream)]/10 rounded-full px-3 py-1">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="relative">
            <div className="rounded-sm border border-[var(--gold)]/20 p-10 bg-[var(--alt)]/50 mb-8">
              <p className="text-2xl leading-relaxed text-[var(--heading)]" style={{ fontFamily: "var(--font-deva)" }}>
                स्थिरसुखमासनम्
              </p>
              <p className="section-sub mt-3">Sthira-sukham āsanam</p>
              <p className="text-sm text-[var(--muted)] mt-2 italic">"The posture is steady and easeful." — Yoga Sūtra 2.46</p>
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
