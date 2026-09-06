import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import BiomechanicalOverlay from "@/components/biomechanical/BiomechanicalOverlay";
import MovementGeometry from "@/components/biomechanical/MovementGeometry";
import { useAtom } from "jotai";
import { cartAtom, isCartOpenAtom } from "@/lib/store";
import { toast } from "sonner";


const sections = [
  { title: "Structure", desc: "Foundational alignment for joint integrity and efficient force transmission." },
  { title: "Capacity", desc: "Building the volume and resilience required for sustained movement practice." },
  { title: "Balance", desc: "Static and dynamic equilibrium across multiple planes of motion." },
  { title: "Breath", desc: "Regulation techniques to maintain composure under physical load." },
  { title: "Progressive control", desc: "Systematic advancement through increasing complexity and demand." }
];

export const Route = createFileRoute("/courses/yoga-for-strength")({
  component: YogaDetail,
  head: () => ({
    meta: [
      { title: "Yoga for Strength Course — Kasratshala" },
      { name: "description", content: "Yoga as a practical system for resilient movement: progressive loading, joint capacity and breath as structure." },
      { property: "og:title", content: "Yoga for Strength Course — Kasratshala" },
      { property: "og:description", content: "Yoga as a practical system for resilient movement: progressive loading, joint capacity and breath as structure." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://thekasratshala.lovable.app/courses/yoga-for-strength" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://thekasratshala.lovable.app/courses/yoga-for-strength" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: 'Yoga for Strength',
        description: 'Yoga as a practical system for resilient movement: progressive loading, joint capacity and breath as structure.',
        provider: { "@type": "Organization", name: "Kasratshala", url: "https://thekasratshala.lovable.app" },
      }
    ) }],
  }),
});

function YogaDetail() {
  const [cart, setCart] = useAtom(cartAtom);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);

  const addToCart = (id: string, name: string, price: number) => {
    if (cart.find(item => item.id === id)) {
      setIsCartOpen(true);
      return;
    }
    setCart([...cart, { id, name, price }]);
    toast.success(`${name} added to cart`);
    setIsCartOpen(true);
  };

  return (
    <Layout>
      <section className="py-32 px-6 bg-[var(--night)]">
        <div className="section-inner max-w-4xl space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="label-caps text-[var(--gold)]">Yoga for Strength</p>
            <h1 className="editorial-heading text-6xl md:text-8xl">Strength that remains connected.</h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            <p className="text-[var(--muted)] text-xl italic leading-relaxed max-w-2xl">
              Yoga for Strength treats yoga as a practical system for strength, joint capacity, balance and resilient movement.
            </p>
            <p className="label-caps text-[10px] text-[var(--gold)]">
              This programme is part of the Kasratshala Teacher Training Course approach.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--night)]">
        <div className="section-inner grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] border border-[var(--bone)] rounded-sm overflow-hidden">
             <img src={yogaPose.url} className="w-full h-full object-cover grayscale opacity-40" alt="Yoga for Strength" />
             <BiomechanicalOverlay circles={[{ cx: 200, cy: 300, r: 180 }]} paths={["M50 400 Q200 100 350 400"]} />
          </div>
          <div className="space-y-12">
            {sections.map((s, i) => (
              <motion.div 
                key={s.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2 border-l border-[var(--bone)] pl-6"
              >
                <div className="flex items-center gap-4">
                  <MovementGeometry type="strength" className="w-6 h-6 opacity-40" />
                  <h3 className="editorial-heading text-3xl">{s.title}</h3>
                </div>
                <p className="text-[var(--muted)] italic leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 border-t border-[var(--bone)] text-center bg-[var(--night)]">
        <div className="section-inner max-w-2xl space-y-12 bg-[var(--alt)] p-12 border border-[var(--bone)] text-left">
          <h2 className="editorial-heading text-4xl">Program Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[var(--bone)] py-6">
              <div>
                <p className="label-caps text-[var(--cream)]">Online Course</p>
                <p className="text-[8px] text-[var(--muted)] italic">Live joined from Naggar Dojo if preferred</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="editorial-heading text-2xl text-[var(--gold)]">₹40,000</p>
                <button 
                  onClick={() => addToCart('yoga-strength', 'Yoga for Strength Online', 40000)}
                  className="px-6 py-2 bg-[var(--teal)] text-[var(--night)] label-caps text-[10px] hover:bg-[var(--gold)] transition-all"
                >
                  Add to Shop
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>
    </Layout>
  );
}
