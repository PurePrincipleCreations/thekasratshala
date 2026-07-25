import { motion } from "framer-motion";

const courses = [
  { title: "Foundations of Movement", duration: "4 weeks", level: "All levels", tag: "Beginner-friendly", body: "Squat, hinge, hang, crawl, breathe. Rebuild the body's original vocabulary from the ground up." },
  { title: "Himalayan Body Flow", duration: "6 weeks", level: "Intermediate", tag: "Signature", body: "A moving practice woven from yoga, animal locomotion, and traditional Indian conditioning." },
  { title: "Warrior Intensive", duration: "10 days", level: "Advanced", tag: "Immersion", body: "Mace, gada, clubs, and calisthenic strength — trained in the akhara style, dawn to dusk." },
  { title: "Motion & Meditation", duration: "3 weeks", level: "Open", tag: "Reflective", body: "Movement as sitting practice. Slow, breath-led, and unhurried. Each session ends in silence." },
];

export default function CoursesSection() {
  return (
    <section id="courses" className="relative py-32 bg-[var(--night)]/50">
      <div className="section-inner">
        <div className="text-center mb-16">
          <div className="root-badge mb-6">अभ्यास — The Practice</div>
          <h2 className="section-title text-5xl md:text-6xl">Courses</h2>
          <p className="section-sub mt-3">On-land, in the dojo, with a teacher.</p>
          <div className="gold-line mt-6 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative border border-[var(--cream)]/10 rounded-sm p-8 bg-[var(--page)] hover:border-[var(--gold)]/40 transition-all"
            >
              <div className="absolute left-0 top-8 bottom-8 w-px bg-[var(--teal-bright)] group-hover:bg-[var(--gold-bright)] transition" />
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--teal-glow)]">{c.tag}</span>
                <span className="text-xs text-[var(--muted)]">{c.duration} · {c.level}</span>
              </div>
              <h3 className="section-title text-3xl mb-3 group-hover:text-[var(--gold-bright)] transition">{c.title}</h3>
              <p className="text-[var(--cream)]/70 leading-relaxed">{c.body}</p>
              <button className="mt-6 text-sm text-[var(--gold)] tracking-widest uppercase hover:text-[var(--gold-bright)]">Enquire →</button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
