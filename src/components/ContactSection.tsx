import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [sent, setSent] = useState<string | null>(null);

  return (
    <section id="contact" className="relative py-20 md:py-24 bg-[var(--night)]/60">
      <div className="section-inner">
        <div className="text-center mb-16">
          <div className="root-badge mb-6">Connect</div>
          <h2 className="section-title text-5xl md:text-6xl">Start a practice.</h2>
          <p className="section-sub mt-3">
            Join a course online, ask about residential practice, or receive an invitation to the next gathering.
          </p>
          <div className="gold-line mt-6 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
            <div className="flex gap-4">
              <MapPin size={20} className="text-[var(--gold)] shrink-0 mt-1" />
              <div>
                <p className="section-sub">Kasratshala</p>
                <p className="text-[var(--cream)]/70 text-sm mt-1">Naggar, Kullu District<br/>Himachal Pradesh, India</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail size={20} className="text-[var(--gold)] shrink-0 mt-1" />
              <div>
                <p className="section-sub">Email</p>
                <a href="mailto:namaste@kasratshala.in" className="text-[var(--cream)]/70 text-sm mt-1 block hover:text-[var(--gold-bright)]">namaste@kasratshala.in</a>
              </div>
            </div>
            <div className="border border-[var(--gold)]/20 rounded-sm p-6 bg-[var(--alt)]/40">
              <p className="text-[var(--cream)]/70 text-sm leading-relaxed">
                Online students are welcome from India and beyond. For camps, residential courses and
                gatherings, write to us directly so we can share availability and details.
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); setSent(name.trim().split(" ")[0] || "friend"); }}
            className="space-y-4"
          >
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" className="w-full bg-[var(--page)] border border-[var(--cream)]/10 rounded-sm px-4 py-3 text-sm text-[var(--cream)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--gold)]" />
            <input type="email" placeholder="Email address" className="w-full bg-[var(--page)] border border-[var(--cream)]/10 rounded-sm px-4 py-3 text-sm text-[var(--cream)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--gold)]" />
            <select className="w-full bg-[var(--page)] border border-[var(--cream)]/10 rounded-sm px-4 py-3 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]">
              <option>I'm interested in…</option>
              <option>Online course</option>
              <option>Residential course</option>
              <option>Camp</option>
              <option>One Flow Gathering</option>
              <option>General enquiry</option>
            </select>
            <textarea rows={6} placeholder="Tell us about your practice or what you want to explore." className="w-full bg-[var(--page)] border border-[var(--cream)]/10 rounded-sm px-4 py-3 text-sm text-[var(--cream)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--gold)] resize-none" />
            <button type="submit" className="w-full py-3 bg-[var(--gold)] text-[var(--night)] text-sm tracking-[0.25em] uppercase hover:bg-[var(--gold-bright)] transition">
              Send enquiry
            </button>
            {sent && (
              <p className="text-sm text-[var(--gold-bright)]">Thank you, {sent}. We'll respond shortly.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
