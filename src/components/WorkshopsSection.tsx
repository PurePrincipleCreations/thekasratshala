import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE, reveal, inViewOnce } from "@/lib/motion";

const camps = [
  {
    title: "Yoga for Strength Camp",
    kind: "Residential immersion · Naggar",
    body: "A focused exploration of yoga as a system for usable strength: intelligent load, breath, mobility, balance and recovery.",
    meta: "Naggar · Dates on enquiry",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
  },
  {
    title: "Kasrat Camp",
    kind: "Residential immersion · Naggar",
    body: "Our broadest immersion: steel mace, kettlebells, rope, yoga, breathwork and movement science woven into a full daily practice.",
    meta: "Naggar · Dates on enquiry",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
  },
  {
    title: "Steel Mace Flow Camp",
    kind: "Residential immersion · Naggar",
    body: "Spend dedicated time with the mace: fundamental patterns, progressive flows, rotational mechanics and coaching feedback.",
    meta: "Naggar · Dates on enquiry",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
  },
];

export default function WorkshopsSection() {
  const reduce = useReducedMotion();

  return (
    <section id="camps" className="relative py-32">
      <div className="section-inner">
        <motion.div initial="hidden" whileInView="show" viewport={inViewOnce} variants={reveal} className="text-center mb-16">
          <div className="root-badge mb-6">Camps</div>
          <h2 className="section-title text-5xl md:text-6xl">Come practise in the field.</h2>
          <p className="section-sub mt-3 max-w-2xl mx-auto">
            Kasratshala camps are in-person immersions for people who want more time, more attention and
            a shared rhythm of practice. Accommodation and formats are confirmed directly by email.
          </p>
          <div className="gold-line mt-6 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {camps.map((w, i) => (
            <motion.article
              key={w.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE as unknown as number[] }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group relative overflow-hidden rounded-sm border border-[var(--cream)]/10 bg-[var(--alt)]/50"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <motion.img
                  src={w.image}
                  alt={`${w.title} — residential movement practice in Naggar`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: reduce ? 1 : 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.6, ease: EASE as unknown as number[] }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(27,27,22,0.05), rgba(27,27,22,0.45))" }} />

                {/* Information layer — always visible on touch, slides up on hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-[#f3f0e8] translate-y-0 md:translate-y-[calc(100%-8.5rem)] md:group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] bg-[rgba(27,27,22,0.72)] backdrop-blur-[2px]">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-[#d8ef64]">{w.kind}</p>
                  <h3 className="section-title text-2xl mt-2 text-[#f3f0e8]">{w.title}</h3>
                  <motion.div
                    className="h-px bg-[#b48357] mt-3 origin-left"
                    initial={{ scaleX: 0.15 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: EASE as unknown as number[] }}
                  />
                  <p className="text-sm leading-relaxed mt-4 text-[#f3f0e8]/85">{w.body}</p>
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#f3f0e8]/70">{w.meta}</span>
                    <a href="#contact" aria-label={`Enquire about ${w.title}`} className="text-[#d8ef64]">
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial="hidden" whileInView="show" viewport={inViewOnce} variants={reveal}
          className="mt-16 rounded-sm p-10 text-center border border-[var(--teal)]/20"
          style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--teal) 10%, var(--page)), color-mix(in oklab, var(--gold) 12%, var(--page)))" }}
        >
          <p className="section-title text-2xl md:text-3xl text-[var(--heading)]">What to expect</p>
          <p className="text-[var(--cream)]/80 mt-3 max-w-2xl mx-auto leading-relaxed">
            Small groups, a practice-led schedule, movement education and time to be in the mountains.
            Camp places are not booked through checkout — email us first.
          </p>
          <a
            href="mailto:namaste@kasratshala.in"
            className="inline-block mt-6 px-7 py-3 border border-[var(--teal)]/50 text-[var(--teal)] text-xs tracking-[0.25em] uppercase hover:bg-[var(--teal)] hover:text-[var(--page)] transition-colors duration-500"
          >
            Enquire by email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
