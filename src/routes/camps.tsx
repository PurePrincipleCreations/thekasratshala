import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import macePose from "@/assets/mace_pose.png.asset.json";
import outdoorMace1 from "@/assets/outdoor_mace_1.png.asset.json";
import BiomechanicalOverlay from "@/components/biomechanical/BiomechanicalOverlay";

const camps = [
  {
    title: "Yoga for Strength Camp",
    category: "Residential immersion · Naggar",
    copy: "Build strong foundations through movement, breath and patient practice.",
    image: yogaPose
  },
  {
    title: "Kasrat Camp",
    category: "Residential immersion · Naggar",
    copy: "A full-spectrum immersion in tools, yoga, breathwork and movement science.",
    image: outdoorMace1
  },
  {
    title: "Steel Mace Flow Camp",
    category: "Residential immersion · Naggar",
    copy: "Deepening rotational strength and fluid movement in the Himalayan field.",
    image: macePose
  }
];

export const Route = createFileRoute("/camps" as any)({
  component: CampsPage,
  head: () => ({
    meta: [
      { title: "Camps — Kasratshala" },
      { name: "description", content: "Residential movement immersions in Naggar, Himachal Pradesh." },
    ],
  }),
});

function CampsPage() {
  return (
    <Layout>
      <section className="py-32 px-6 bg-[var(--night)]">
        <div className="section-inner max-w-4xl space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="label-caps text-[var(--gold)]">In person immersions</p>
            <h1 className="editorial-heading text-6xl md:text-8xl">Come practise in the field.</h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            <p className="text-[var(--muted)] text-xl italic leading-relaxed max-w-2xl">
              Kasratshala camps are intimate in-person immersions for people who want more time, more attention and a shared rhythm of practice.
            </p>
            <p className="text-[var(--muted)] text-sm opacity-60 max-w-xl">
              Important note: Camps are for previous students who have spent time training with Kasratshala. Accommodation, format and dates are shared directly by email.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[var(--night)]">
        {camps.map((camp, i) => (
          <div key={camp.title} className="relative h-screen overflow-hidden border-t border-[var(--bone)] group">
            <img src={camp.image.url} className="w-full h-full object-cover grayscale opacity-30 group-hover:scale-105 group-hover:opacity-40 transition-all duration-[2000ms]" alt={camp.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/50 to-transparent" />
            <BiomechanicalOverlay className="opacity-10 group-hover:opacity-20" circles={[{ cx: 300, cy: 300, r: 250 }]} />
            
            <div className="absolute inset-0 p-12 md:p-24 flex flex-col justify-end max-w-4xl space-y-6">
              <p className="label-caps text-[var(--gold)]">{camp.category}</p>
              <h2 className="editorial-heading text-6xl md:text-8xl">{camp.title}</h2>
              <p className="text-[var(--muted)] text-xl italic max-w-xl">{camp.copy}</p>
              <div className="flex items-center gap-8 pt-6">
                 <p className="label-caps text-[10px] text-[var(--gold)]">Dates on enquiry</p>
                 <button className="px-8 py-4 border border-[var(--gold)] text-[var(--gold)] label-caps hover:bg-[var(--gold)] hover:text-[var(--night)] transition-all">
                    Enquire
                 </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="py-40 bg-[var(--night)] px-6 text-center border-t border-[var(--bone)]">
        <div className="section-inner max-w-2xl space-y-10">
          <h2 className="editorial-heading text-5xl italic">Come for the practice. Stay long enough for it to change your rhythm.</h2>
          <button className="px-10 py-5 bg-[var(--gold)] text-[var(--night)] label-caps">
            Enquire about camps
          </button>
        </div>
      </section>
    </Layout>
  );
}
