import { motion } from "framer-motion";

const roster = [
  { day: "Mondays", time: "8:00 AM", classes: "Grounding", note: "Foot-to-core and ankle resilience." },
  { day: "Tuesdays", time: "8:00 AM · 9:00 AM · 5:15 PM", classes: "Kinetic Conditioning | Steel Mace Flow | Landmine University", note: "Conditioning, rotational flow and power mechanics." },
  { day: "Wednesdays", time: "9:00 AM · Evening", classes: "Vinyasa Waves | Rotational Club & Mace", note: "Morning flow, evening rotational coiling." },
  { day: "Thursdays", time: "8:00–10:00 AM · 5:15 PM", classes: "Deep Practice | Kali-PTK", note: "Long-form practice and stick work." },
  { day: "Fridays", time: "9:00 AM", classes: "Friday Flyday", note: "Vinyasa Armplay and inversion mechanics." },
  { day: "Saturdays", time: "5:15 PM", classes: "Breakthrough", note: "Strength & Conditioning." },
];

export default function ScrollGallery() {
  return (
    <section className="relative py-12 md:py-24 px-6 bg-[var(--night)] overflow-hidden">
      <div className="section-inner">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-16">
          <div className="space-y-4 max-w-xl">
            <p className="label-caps text-[var(--gold)]">Live Broadcast</p>
            <h2 className="editorial-heading text-4xl md:text-7xl leading-[0.9]">
              Practice Happens<br />
              <span className="italic text-[var(--gold)]">Wherever You Stand.</span>
            </h2>
          </div>
          <p className="text-[var(--muted)] text-lg italic max-w-md leading-relaxed">
            The Dojo is not just a physical location; it is a standard of work. Our core sessions are broadcast live to our distributed community. You clear the floor, you bring the discipline, and we will tell you exactly which tools to source along the way. No studio lights, no staging—just honest mechanics and deep practice in your own space.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="editorial-heading text-3xl md:text-4xl">The Live Roster</h3>
          <ul className="border-t border-[var(--bone)]">
            {roster.map((r, i) => (
              <motion.li
                key={r.day}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-[180px_220px_1fr] gap-1 md:gap-6 py-5 border-b border-[var(--bone)]"
              >
                <span className="label-caps text-[var(--gold)] text-xs tracking-[0.25em]">{r.day}</span>
                <span className="text-[var(--cream)]/70 text-sm">{r.time}</span>
                <div>
                  <p className="text-[var(--cream)] text-base md:text-lg">{r.classes}</p>
                  <p className="text-[var(--muted)] text-sm">{r.note}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
