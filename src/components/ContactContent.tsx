import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactContent() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <div className="bg-[var(--night)] min-h-[80vh]">
      <section className="py-32 px-6">
        <div className="section-inner max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="label-caps text-[var(--gold)]">Connect</p>
              <h1 className="editorial-heading text-6xl md:text-8xl">Start a practice.</h1>
              <p className="text-[var(--muted)] text-xl italic leading-relaxed">
                Join a course online, ask about residential practice, or receive an invitation to the next gathering.
              </p>
            </div>

            <div className="space-y-8 pt-8">
              <div className="space-y-2">
                <p className="label-caps text-[10px] text-[var(--gold)]">Location</p>
                <p className="text-[var(--cream)]">Kasratshala<br />Naggar, Kullu District<br />Himachal Pradesh, India</p>
              </div>
              <div className="space-y-2">
                <p className="label-caps text-[10px] text-[var(--gold)]">Direct</p>
                <a href="mailto:namaste@kasratshala.in" className="text-[var(--cream)] hover:text-[var(--gold)] transition-colors">namaste@kasratshala.in</a>
              </div>
            </div>
          </div>

          <div className="bg-[var(--alt)] p-10 rounded-sm border border-[var(--bone)] relative overflow-hidden">
            {formState === "success" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center space-y-6">
                 <div className="w-16 h-16 rounded-full border border-[var(--gold)] flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--gold)] rounded-full" />
                 </div>
                 <h2 className="editorial-heading text-3xl">Enquiry Received</h2>
                 <p className="text-[var(--muted)] text-sm italic">We will write to you shortly.</p>
                 <button onClick={() => setFormState("idle")} className="label-caps text-[10px] text-[var(--gold)]">Send another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="label-caps text-[10px]">Name</label>
                  <input required className="w-full bg-transparent border-b border-[var(--bone)] py-2 focus:border-[var(--gold)] outline-none transition-colors" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="label-caps text-[10px]">Email</label>
                  <input required className="w-full bg-transparent border-b border-[var(--bone)] py-2 focus:border-[var(--gold)] outline-none transition-colors" type="email" />
                </div>
                <div className="space-y-2">
                  <label className="label-caps text-[10px]">Interest</label>
                  <select required className="w-full bg-transparent border-b border-[var(--bone)] py-2 focus:border-[var(--gold)] outline-none transition-colors text-[var(--cream)]">
                    <option value="recode">RECODE</option>
                    <option value="yoga">Yoga for Strength</option>
                    <option value="pranayama">Pranayama</option>
                    <option value="mace">Steel Mace Flow</option>
                    <option value="camps">Camps</option>
                    <option value="one-flow">One Flow Gathering</option>
                    <option value="general">General enquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="label-caps text-[10px]">Message</label>
                  <textarea required className="w-full bg-transparent border-b border-[var(--bone)] py-2 focus:border-[var(--gold)] outline-none transition-colors min-h-[100px]" />
                </div>
                <button 
                  disabled={formState === "submitting"}
                  className="w-full py-4 bg-[var(--teal)] text-[var(--night)] label-caps hover:bg-[var(--gold)] transition-all disabled:opacity-50"
                >
                  {formState === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
