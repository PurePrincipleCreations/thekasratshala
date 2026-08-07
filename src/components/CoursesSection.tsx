import { motion } from "framer-motion";

const courses = [
  { title: "RECODE", tag: "Foundational", duration: "4 weeks", price: "₹12,000", body: "Rewrite movement patterns from the ground up: breath, alignment, locomotion and flow. The essential starting point." },
  { title: "Steel Mace Flow", tag: "Signature", duration: "6 weeks", price: "₹18,000", body: "The ancient gada meets modern flow: rotational power, shoulder stability and multi-planar coordination." },
  { title: "Kettlebell", tag: "Strength", duration: "6 weeks", price: "₹15,000", body: "Build ballistic power through the swing, clean, press and snatch — with timing, force and control." },
  { title: "Movement Mechanics", tag: "Biomechanics", duration: "8 weeks", price: "₹22,000", body: "Understand levers, angles, force and sequencing; then apply that knowledge to the way you move." },
  { title: "Landmines", tag: "Rotational", duration: "4 weeks", price: "₹10,000", body: "Press, pivot, lunge and transfer force through practical rotational training." },
  { title: "Rope Flow", tag: "Fluidity", duration: "4 weeks", price: "₹10,000", body: "Continuous wave-like movement for shoulder integrity, grip strength and meditative rhythm." },
  { title: "Bosu", tag: "Balance", duration: "4 weeks", price: "₹10,000", body: "Develop proprioception, reactive stability and intelligent control under changing conditions." },
  { title: "Pranayama", tag: "Breath", duration: "4 weeks", price: "Price on enquiry", body: "Use breath to train attention, regulation and capacity — then integrate it into movement." },
  { title: "Yoga for Strength", tag: "Yoga", duration: "6 weeks", price: "Price on enquiry", body: "Yoga shaped around progressive strength, structure, mobility and resilient movement." },
  { title: "SSS", tag: "Integrated practice", duration: "8 weeks", price: "Price on enquiry", body: "Strength · Skill · Stability. A complete movement practice connecting capacity, coordination and control." },
];

export default function CoursesSection() {
  return (
    <section id="courses" className="relative py-32 bg-[var(--night)]/50">
      <div className="section-inner">
        <div className="text-center mb-16">
          <div className="root-badge mb-6">Courses</div>
          <h2 className="section-title text-5xl md:text-6xl">Courses for a body that can adapt.</h2>
          <p className="section-sub mt-3 max-w-2xl mx-auto">
            Every course is designed to be taken online. Practice at your pace, apply the method to your
            own body, and build capacity that transfers beyond training.
          </p>
          <p className="text-xs text-[var(--muted)] mt-3">Online · Provisional details may be refined before launch.</p>
          <div className="gold-line mt-6 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: (i % 2) * 0.08 }}
              className="group relative border border-[var(--cream)]/10 rounded-sm p-8 bg-[var(--page)] hover:border-[var(--gold)]/40 transition-all"
            >
              <div className="absolute left-0 top-8 bottom-8 w-px bg-[var(--teal-bright)] group-hover:bg-[var(--gold-bright)] transition" />
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--teal-glow)]">{c.tag}</span>
                <span className="text-xs text-[var(--muted)]">{c.duration} · {c.price}</span>
              </div>
              <h3 className="section-title text-3xl mb-3 group-hover:text-[var(--gold-bright)] transition">{c.title}</h3>
              <p className="text-[var(--cream)]/70 leading-relaxed">{c.body}</p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-6 text-sm text-[var(--gold)] tracking-widest uppercase hover:text-[var(--gold-bright)]"
              >
                Join online →
              </button>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 border border-[var(--gold)]/20 rounded-sm p-10 text-center bg-[var(--alt)]/40">
          <h3 className="section-title text-3xl">Want to train at the dojo?</h3>
          <p className="section-sub mt-3">In-person and residential participation is arranged separately.</p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-6 px-7 py-3 bg-[var(--gold)] text-[var(--night)] text-xs tracking-[0.25em] uppercase hover:bg-[var(--gold-bright)] transition"
          >
            Write to us
          </button>
        </div>
      </div>
    </section>
  );
}
