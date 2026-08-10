import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import MovementPath, { type MovementPathType } from "./MovementPath";
import { EASE, reveal, inViewOnce } from "@/lib/motion";

type Course = {
  title: string;
  tag: string;
  duration: string;
  price: string;
  body: string;
  path?: MovementPathType;
};

const courses: Course[] = [
  { title: "RECODE", tag: "Foundational", duration: "4 weeks", price: "₹12,000", body: "Rewrite movement patterns from the ground up: breath, alignment, locomotion and flow. The essential starting point." },
  { title: "Steel Mace Flow", tag: "Strength & Movement Arts · Online", duration: "6 weeks", price: "₹18,000", body: "The ancient gada meets modern flow: rotational power, shoulder stability and multi-planar coordination.", path: "mace" },
  { title: "Kettlebell", tag: "Strength", duration: "6 weeks", price: "₹15,000", body: "Build ballistic power through the swing, clean, press and snatch — with timing, force and control." },
  { title: "Movement Mechanics", tag: "Biomechanics", duration: "8 weeks", price: "₹22,000", body: "Understand levers, angles, force and sequencing; then apply that knowledge to the way you move." },
  { title: "Landmines", tag: "Rotational", duration: "4 weeks", price: "₹10,000", body: "Press, pivot, lunge and transfer force through practical rotational training." },
  { title: "Rope Flow", tag: "Fluidity", duration: "4 weeks", price: "₹10,000", body: "Continuous wave-like movement for shoulder integrity, grip strength and meditative rhythm." },
  { title: "Bosu", tag: "Balance", duration: "4 weeks", price: "₹10,000", body: "Develop proprioception, reactive stability and intelligent control under changing conditions." },
  { title: "Pranayama", tag: "Advanced Breathwork · Online", duration: "4 weeks", price: "Price on enquiry", body: "Use breath to train attention, regulation and capacity — then integrate it into movement.", path: "breath" },
  { title: "Yoga for Strength", tag: "Yoga Arts · Online", duration: "6 weeks", price: "Price on enquiry", body: "Yoga shaped around progressive strength, structure, mobility and resilient movement.", path: "yoga" },
  { title: "SSS", tag: "Integrated practice", duration: "8 weeks", price: "Price on enquiry", body: "Strength · Skill · Stability. A complete movement practice connecting capacity, coordination and control." },
];

export default function CoursesSection() {
  const [open, setOpen] = useState<string | null>("Yoga for Strength");
  const goContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="courses" className="relative py-32 bg-[var(--night)]/60">
      <div className="section-inner">
        <motion.div initial="hidden" whileInView="show" viewport={inViewOnce} variants={reveal} className="text-center mb-16">
          <div className="root-badge mb-6">Courses</div>
          <h2 className="section-title text-5xl md:text-6xl">Courses for a body that can adapt.</h2>
          <p className="section-sub mt-3 max-w-2xl mx-auto">
            Every course is designed to be taken online. Practice at your pace, apply the method to your
            own body, and build capacity that transfers beyond training.
          </p>
          <p className="text-xs text-[var(--muted)] mt-3">Online · Provisional details may be refined before launch.</p>
          <div className="gold-line mt-6 mx-auto" />
        </motion.div>

        <div className="border-t border-[var(--cream)]/10">
          {courses.map((c, i) => {
            const isOpen = open === c.title;
            return (
              <motion.div
                key={c.title}
                initial="hidden"
                whileInView="show"
                viewport={inViewOnce}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: Math.min(i, 4) * 0.05, ease: EASE as unknown as number[] } } }}
                className="border-b border-[var(--cream)]/10"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : c.title)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-7 flex items-start md:items-center gap-6 group"
                >
                  <div className="flex-1">
                    <p className="label-caps mb-2 group-hover:text-[var(--teal)] transition-colors">{c.tag}</p>
                    <h3 className="section-title text-2xl md:text-3xl group-hover:text-[var(--gold-bright)] transition-colors">
                      {c.title}
                    </h3>
                  </div>
                  <span className="hidden md:block text-xs text-[var(--muted)]">{c.duration} · {c.price}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.5, ease: EASE as unknown as number[] }}
                    className="shrink-0 w-9 h-9 rounded-full border border-[var(--cream)]/15 flex items-center justify-center text-[var(--teal)]"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE as unknown as number[] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
                        <div>
                          <p className="text-[var(--cream)]/75 leading-relaxed max-w-xl">{c.body}</p>
                          <div className="flex flex-wrap gap-2 mt-6">
                            {[c.duration, c.price, "Online"].map((t) => (
                              <span key={t} className="text-[11px] tracking-[0.2em] uppercase text-[var(--muted)] border border-[var(--cream)]/12 rounded-full px-3 py-1">
                                {t}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={goContact}
                            className="mt-7 px-6 py-3 bg-[var(--teal)] text-[var(--page)] text-[11px] tracking-[0.25em] uppercase hover:bg-[var(--gold)] transition-colors duration-500"
                          >
                            Join online
                          </button>
                        </div>
                        {c.path && (
                          <div className="flex md:justify-end">
                            <MovementPath type={c.path} size={220} tone={c.path === "mace" ? "clay" : "moss"} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial="hidden" whileInView="show" viewport={inViewOnce} variants={reveal}
          className="mt-14 border border-[var(--gold)]/25 rounded-sm p-10 text-center bg-[var(--alt)]/60"
        >
          <h3 className="section-title text-3xl">Want to train at the dojo?</h3>
          <p className="section-sub mt-3">In-person and residential participation is arranged separately.</p>
          <button
            onClick={goContact}
            className="mt-6 px-7 py-3 bg-[var(--gold)] text-[var(--page)] text-xs tracking-[0.25em] uppercase hover:bg-[var(--gold-bright)] transition-colors duration-500"
          >
            Write to us
          </button>
        </motion.div>
      </div>
    </section>
  );
}
