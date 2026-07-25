import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Youtube } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 bg-[var(--night)]/60">
      <div className="section-inner">
        <div className="text-center mb-16">
          <div className="root-badge mb-6">संपर्क — Connect</div>
          <h2 className="section-title text-5xl md:text-6xl">Write to the dojo.</h2>
          <p className="section-sub mt-3">We reply slowly. We reply personally.</p>
          <div className="gold-line mt-6 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
            <div className="flex gap-4">
              <MapPin size={20} className="text-[var(--gold)] shrink-0 mt-1" />
              <div>
                <p className="section-sub">The Kasratshala</p>
                <p className="text-[var(--cream)]/70 text-sm mt-1">Chougan, Bir · Kangra<br/>Himachal Pradesh 176077 · India</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail size={20} className="text-[var(--gold)] shrink-0 mt-1" />
              <div>
                <p className="section-sub">Correspondence</p>
                <p className="text-[var(--cream)]/70 text-sm mt-1">hello@kasratshala.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Instagram size={20} className="text-[var(--gold)] shrink-0 mt-1" />
              <div>
                <p className="section-sub">Field notes</p>
                <div className="flex gap-4 mt-1 text-sm text-[var(--cream)]/70">
                  <a href="#" className="hover:text-[var(--gold-bright)]">@kasratshala</a>
                  <a href="#" className="hover:text-[var(--gold-bright)] inline-flex items-center gap-1"><Youtube size={14} /> YouTube</a>
                </div>
              </div>
            </div>
            <div className="border border-[var(--gold)]/20 rounded-sm p-6 bg-[var(--alt)]/40">
              <p className="section-sub mb-2">Visiting</p>
              <p className="text-[var(--cream)]/70 text-sm leading-relaxed">
                Nearest airport: Gaggal (DHM), 65 km. Nearest station: Pathankot, 145 km. Most students take the overnight bus from Delhi to Bir Bazaar. Write us before you come.
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            <input type="text" placeholder="Your name" className="w-full bg-[var(--page)] border border-[var(--cream)]/10 rounded-sm px-4 py-3 text-sm text-[var(--cream)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--gold)]" />
            <input type="email" placeholder="Email" className="w-full bg-[var(--page)] border border-[var(--cream)]/10 rounded-sm px-4 py-3 text-sm text-[var(--cream)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--gold)]" />
            <select className="w-full bg-[var(--page)] border border-[var(--cream)]/10 rounded-sm px-4 py-3 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]">
              <option>I'm interested in…</option>
              <option>A course</option>
              <option>A workshop or retreat</option>
              <option>Online mentorship</option>
              <option>Visiting the dojo</option>
              <option>Something else</option>
            </select>
            <textarea rows={6} placeholder="Tell us where you are in your practice." className="w-full bg-[var(--page)] border border-[var(--cream)]/10 rounded-sm px-4 py-3 text-sm text-[var(--cream)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--gold)] resize-none" />
            <button type="submit" className="w-full py-3 bg-[var(--gold)] text-[var(--night)] text-sm tracking-[0.25em] uppercase hover:bg-[var(--gold-bright)] transition">
              Send letter
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
