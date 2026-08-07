import { motion } from "framer-motion";

const panels = [
  {
    title: "Movement Has Geometry",
    kind: "A study of rotation",
    body: "We use form, mechanics and attention to find a movement practice that is strong, skilled and alive.",
    meta: "One Flow · In person",
  },
  {
    title: "Come As You Are",
    kind: "Who it is for",
    body: "For movers, coaches, yogis, artists and curious beginners. You do not need prior mace or kettlebell experience to take part.",
    meta: "Practice over performance",
  },
  {
    title: "In a Shared Field",
    kind: "Where",
    body: "Gatherings are hosted in person, with the next location and practical details shared via email.",
    meta: "India · Dates on enquiry",
  },
];

export default function OnlineSection() {
  return (
    <section id="gathering" className="relative py-32 bg-[var(--night)]/50">
      <div className="section-inner">
        <div className="text-center mb-16">
          <div className="root-badge mb-6">Gathering · One day, one field</div>
          <h2 className="section-title text-5xl md:text-6xl">One Flow Gathering.</h2>
          <p className="section-sub mt-3 max-w-2xl mx-auto">
            A shared field for movement. One Flow gathers practitioners around breath, strength, tools,
            yoga and play — without separating the body into disciplines.
          </p>
          <div className="gold-line mt-6 mx-auto" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <p className="section-title text-2xl md:text-3xl text-[var(--heading)] italic">
            Not a performance. Not a competition. A day to move together, learn through the body and
            meet other people who practise.
          </p>
          <p className="text-[var(--cream)]/75 leading-relaxed mt-6">
            The format can move between guided sessions, open practice, tool exploration and
            conversations about movement. It is intentionally in-person: a gathering only exists when we
            share space.
          </p>
          <p className="text-[var(--cream)]/75 leading-relaxed mt-4">
            Dates and locations are announced through the Kasratshala community. Write to us to receive
            the next invitation.
          </p>
          <a
            href="mailto:namaste@kasratshala.in"
            className="inline-block mt-8 px-7 py-3 bg-[var(--gold)] text-[var(--night)] text-xs tracking-[0.25em] uppercase hover:bg-[var(--gold-bright)] transition"
          >
            Ask about the next gathering
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {panels.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative border border-[var(--teal)]/30 rounded-sm p-8 bg-[var(--page)] hover:border-[var(--teal-glow)] transition"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--teal-glow)] mb-4">{p.kind}</p>
              <h3 className="section-title text-2xl mb-4">{p.title}</h3>
              <p className="text-[var(--cream)]/70 text-sm leading-relaxed mb-6">{p.body}</p>
              <p className="text-xs text-[var(--muted)]">{p.meta}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
