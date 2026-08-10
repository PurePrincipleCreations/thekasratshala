import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import handMudra from "@/assets/hand_mudra.png.asset.json";
import BiomechanicalOverlay from "@/components/biomechanical/BiomechanicalOverlay";
import MovementGeometry from "@/components/biomechanical/MovementGeometry";
import { useAtom } from "jotai";
import { cartAtom, isCartOpenAtom } from "@/lib/store";
import { toast } from "sonner";


export const Route = createFileRoute("/courses/pranayama")({
  component: PranayamaDetail,
  head: () => ({
    meta: [
      { title: "Pranayama — Kasratshala" },
      { name: "description", content: "Breath, understood through practice. A deeper study of capacity, regulation and attention." },
    ],
  }),
});

function PranayamaDetail() {
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
      <section className="py-40 px-6 bg-[var(--night)]">
        <div className="section-inner max-w-4xl space-y-8 text-center mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="label-caps text-[var(--gold)]">Pranayama</p>
            <h1 className="editorial-heading text-6xl md:text-8xl">Breath, understood through practice.</h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[var(--muted)] text-xl italic leading-relaxed mx-auto max-w-2xl">
            Pranayama is a deeper study of capacity, regulation, attention and breath. It is not breathwork as a quick fix. It is a deliberate practice for people ready to understand how breath changes movement, recovery and presence.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--night)] overflow-hidden">
        <div className="section-inner flex flex-col items-center gap-20">
          <div className="relative w-full max-w-2xl aspect-square border border-[var(--bone)] rounded-full flex items-center justify-center p-20">
            <motion.div 
              className="absolute inset-0 border border-[var(--gold)]/20 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1.1, opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 4 }}
            />
            <div className="relative w-full h-full rounded-full overflow-hidden grayscale opacity-40">
               <img src={handMudra.url} className="w-full h-full object-cover" alt="Pranayama Practice" />
               <BiomechanicalOverlay circles={[{ cx: 200, cy: 300, r: 150 }, { cx: 200, cy: 300, r: 100 }]} className="opacity-30" />
            </div>
          </div>
          
          <div className="max-w-xl text-center space-y-12">
            <MovementGeometry type="breath" className="w-20 h-20 mx-auto opacity-40" />
            <p className="text-[var(--muted)] text-lg leading-relaxed italic">
              This page is intentionally quiet. Practice begins with the observation of the current state, without the urge to immediately intervene.
            </p>
          </div>
        </div>
      </section>

      <section className="py-40 px-6 border-t border-[var(--bone)] text-center bg-[var(--night)]">
        <div className="section-inner max-w-2xl space-y-12 bg-[var(--alt)] p-12 border border-[var(--bone)] text-left">
          <h2 className="editorial-heading text-4xl">Program Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[var(--bone)] py-6">
              <div>
                <p className="label-caps text-[var(--cream)]">Pranayama Immersion</p>
                <p className="text-[8px] text-[var(--muted)] italic">Includes GST</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="editorial-heading text-2xl text-[var(--gold)]">₹25,000</p>
                <button 
                  onClick={() => addToCart('pranayama', 'Pranayama Immersion', 25000)}
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
