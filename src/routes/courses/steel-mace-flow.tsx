import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import macePose from "@/assets/mace_pose.png.asset.json";
import BiomechanicalOverlay from "@/components/biomechanical/BiomechanicalOverlay";
import MovementGeometry from "@/components/biomechanical/MovementGeometry";

export const Route = createFileRoute("/courses/steel-mace-flow")({
  component: MaceDetail,
  head: () => ({
    meta: [
      { title: "Steel Mace Flow — Kasratshala" },
      { name: "description", content: "Learn to move through rotation. Rotational strength and shoulder integrity through the ancient gada." },
    ],
  }),
});

function MaceDetail() {
  return (
    <Layout>
      <section className="py-32 px-6 bg-[var(--night)]">
        <div className="section-inner max-w-4xl space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="label-caps text-[var(--gold)]">Steel Mace Flow</p>
            <h1 className="editorial-heading text-6xl md:text-8xl">Learn to move through rotation.</h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[var(--muted)] text-xl italic leading-relaxed max-w-2xl">
            Steel Mace Flow is a structured study of rotational strength, shoulder integrity, timing and fluid multi-planar movement through the ancient gada.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--night)]">
        <div className="section-inner grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="editorial-heading text-4xl">Syllabus</h2>
              <ul className="space-y-4 text-[var(--muted)] italic">
                <li className="border-l border-[var(--bone)] pl-4">Foundational Gada Mechanics</li>
                <li className="border-l border-[var(--bone)] pl-4">The Art of the Swing</li>
                <li className="border-l border-[var(--bone)] pl-4">Rotational Torque & Core Integration</li>
                <li className="border-l border-[var(--bone)] pl-4">Transition and Flow Theory</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h2 className="editorial-heading text-4xl">Trainers</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="editorial-heading text-2xl">Veer</p>
                  <p className="label-caps text-[var(--gold)] text-[10px]">Master Trainer</p>
                </div>
                <div className="space-y-1">
                  <p className="editorial-heading text-2xl">Karam</p>
                  <p className="label-caps text-[var(--gold)] text-[10px]">Level 2 Trainer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="relative aspect-square border border-[var(--bone)] rounded-sm overflow-hidden">
               <img src={macePose.url} className="w-full h-full object-cover grayscale opacity-40" alt="Steel Mace Flow" />
               <BiomechanicalOverlay circles={[{ cx: 200, cy: 300, r: 120 }]} paths={["M50 300 Q200 500 350 300"]} points={[{ x: 200, y: 300, label: "ROTATION" }]} />
            </div>
            
            <div className="bg-[var(--alt)] p-8 border border-[var(--bone)] space-y-6">
              <h2 className="editorial-heading text-3xl">Certification</h2>
              <p className="text-[var(--muted)] text-sm italic">Leo Savage / Steel Mace Flow Certification Pathway</p>
              <div className="h-20 border border-[var(--bone)] border-dashed flex items-center justify-center text-[var(--muted)] label-caps text-[8px]">
                Certification Mark Space
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 border-t border-[var(--bone)] bg-[var(--night)]">
        <div className="section-inner max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
           <button className="px-10 py-5 bg-[var(--teal)] text-[var(--night)] label-caps hover:bg-[var(--gold)] transition-all">
              Request syllabus
           </button>
           <button className="px-10 py-5 border border-[var(--bone)] text-[var(--cream)] label-caps hover:bg-[var(--bone)] transition-all">
              Ask about certification
           </button>
        </div>
      </section>
    </Layout>
  );
}
