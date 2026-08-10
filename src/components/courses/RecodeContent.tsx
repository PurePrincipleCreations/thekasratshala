import { motion } from "framer-motion";
import handsContact from "@/assets/hands_contact.png.asset.json";
import BiomechanicalOverlay from "../biomechanical/BiomechanicalOverlay";

const sections = [
  { id: "01", title: "Upper Body", role: "Primary structure and load distribution", desc: "Realigning shoulder girdle mechanics, thoracic mobility and cervical stability." },
  { id: "02", title: "Lower Body", role: "Foundational base and force transmission", desc: "Optimizing hip function, knee alignment and ankle-foot dynamics." },
  { id: "03", title: "Core", role: "Central regulation and spinal integrity", desc: "Developing deep stability that supports multi-planar movement." },
  { id: "04", title: "Gait", role: "Integrated rhythm and locomotion", desc: "Bringing it all together into how you move through the world." }
];

export default function RecodeContent() {
  return (
    <div className="bg-[var(--night)]">
      <section className="py-32 px-6">
        <div className="section-inner max-w-4xl space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="label-caps text-[var(--gold)]">RECODE</p>
            <h1 className="editorial-heading text-6xl md:text-8xl">Realign how you move.</h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[var(--muted)] text-xl italic leading-relaxed max-w-2xl">
            Modern bodies often become efficient at compensation. RECODE is a structured way to notice those patterns and build more useful options through movement.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="section-inner space-y-24">
          {sections.map((s, i) => (
            <div key={s.id} className={`flex flex-col md:flex-row gap-16 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2 relative aspect-square border border-[var(--bone)] rounded-sm overflow-hidden">
                <img src={handsContact.url} className="w-full h-full object-cover grayscale opacity-40" alt={s.title} />
                <BiomechanicalOverlay circles={[{ cx: 200, cy: 300, r: 100 }]} points={[{ x: 200, y: 300, label: s.title.toUpperCase() }]} />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <p className="editorial-heading text-6xl text-[var(--bone)]">{s.id}</p>
                <div className="space-y-2">
                  <h2 className="editorial-heading text-4xl">{s.title}</h2>
                  <p className="label-caps text-[var(--gold)] text-[10px]">{s.role}</p>
                </div>
                <p className="text-[var(--muted)] text-lg leading-relaxed italic">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 border-t border-[var(--bone)]">
        <div className="section-inner max-w-4xl space-y-12 bg-[var(--alt)] p-12 rounded-sm border border-[var(--bone)]">
          <div className="space-y-4">
            <h2 className="editorial-heading text-4xl">Investment</h2>
            <div className="space-y-2 text-[var(--muted)]">
              <div className="flex justify-between items-center border-b border-[var(--bone)] py-4">
                <p className="label-caps text-[var(--cream)]">Individual RECODE module</p>
                <p className="editorial-heading text-2xl text-[var(--gold)]">₹5,000</p>
              </div>
              <div className="flex justify-between items-center py-4">
                <p className="label-caps text-[var(--cream)]">Complete four-part RECODE</p>
                <p className="editorial-heading text-2xl text-[var(--gold)]">₹15,000</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-[var(--muted)] text-sm italic opacity-60">
              Important note: Level 1 is intentionally limited. Workshops go further, with more context, practice and movement exploration.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
               <button className="px-8 py-4 bg-[var(--teal)] text-[var(--night)] label-caps hover:bg-[var(--gold)] transition-all">
                  Request RECODE details
               </button>
               <button className="px-8 py-4 border border-[var(--bone)] text-[var(--cream)] label-caps hover:bg-[var(--bone)] transition-all">
                  Ask about upcoming workshop
               </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
