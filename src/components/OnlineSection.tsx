import { motion } from "framer-motion";

const plans = [
  { title: "Daily Practice", cadence: "Subscription", price: "₹899", per: "/ month", body: "A new 30-minute practice every morning. Follow along or freestyle. Cancel anytime.", cta: "Begin daily" },
  { title: "Foundations Course", cadence: "8 weeks · self-paced", price: "₹6,499", per: "one-time", body: "The on-land curriculum, filmed and structured. Weekly live check-ins with a coach.", cta: "Enroll" },
  { title: "Mentorship Track", cadence: "12 weeks · 1-on-1", price: "₹22,000", per: "one-time", body: "Private guidance. Custom programming, weekly video review, and a WhatsApp thread with your teacher.", cta: "Apply" },
];

export default function OnlineSection() {
  return (
    <section id="online" className="relative py-32 bg-[var(--night)]/50">
      <div className="section-inner">
        <div className="text-center mb-16">
          <div className="root-badge mb-6">दूर — From Afar</div>
          <h2 className="section-title text-5xl md:text-6xl">Practice from anywhere.</h2>
          <p className="section-sub mt-3">The dojo, delivered.</p>
          <div className="gold-line mt-6 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative border border-[var(--teal)]/30 rounded-sm p-8 bg-[var(--page)] hover:border-[var(--teal-glow)] transition"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--teal-glow)] mb-4">{p.cadence}</p>
              <h3 className="section-title text-2xl mb-4">{p.title}</h3>
              <div className="flex items-baseline gap-2 mb-5">
                <span className="section-title text-4xl text-[var(--gold-bright)]">{p.price}</span>
                <span className="text-xs text-[var(--muted)]">{p.per}</span>
              </div>
              <p className="text-[var(--cream)]/70 text-sm leading-relaxed mb-6">{p.body}</p>
              <button className="w-full py-3 border border-[var(--gold)]/50 text-[var(--gold)] text-sm tracking-widest uppercase hover:bg-[var(--gold)] hover:text-[var(--night)] transition">
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
