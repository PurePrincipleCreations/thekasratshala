import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { cartAtom, isCartOpenAtom } from "@/lib/store";
import { toast } from "sonner";
import macePose from "@/assets/mace_pose.png.asset.json";
import pranayamaHero from "@/assets/pranayama-hero.png.asset.json";
import recodeNewV2 from "@/assets/recode-new-v2.png.asset.json";
import MovementGeometry from "../biomechanical/MovementGeometry";

const journey = [
  {
    n: "01",
    title: "RECODE",
    category: "Foundational movement recoding · Level 1",
    copy: "RECODE is Kasratshala’s foundational movement recoding process for modern bodies. It helps people realign how they move through four focused areas: Upper Body · Lower Body · Core · Gait",
    metadata: "Four-part workshop and course format. Level 1 is intentionally limited.",
    details: [
      "Upper Body — shoulder girdle mechanics, thoracic mobility, cervical stability",
      "Lower Body — hip function, knee alignment, ankle-foot dynamics",
      "Core — deep stability that supports multi-planar movement",
      "Gait — integrating everything into how you walk and move",
    ],
    format: "Online · self-paced modules with guided practice",
    image: recodeNewV2,
    price: 15000,
    type: "recode" as const,
    to: "/courses/recode" as const,
  },
  {
    n: "02",
    title: "Pranayama",
    category: "Advanced Breathwork · TTC module · Online",
    copy: "A deeper study of breath as capacity, regulation and attention. This is not breathwork as a quick fix. It is a deliberate practice for people ready to understand how breath changes movement.",
    details: [
      "Breath capacity and mechanics of the ribcage",
      "Regulation — states, recovery and attention",
      "Sequencing breath with movement practice",
      "Long-form practice, observed over weeks",
    ],
    format: "Online immersion · includes GST",
    image: pranayamaHero,
    price: 25000,
    type: "breath" as const,
    to: "/courses/pranayama" as const,
  },
  {
    n: "03",
    title: "Steel Mace Flow",
    category: "Strength Arts + Movement Arts · Certification",
    copy: "Steel Mace Flow develops rotational strength, shoulder integrity, timing and fluid multi-planar movement through the ancient gada.",
    metadata: "Veer — Master Trainer. Karam — Level 2 Trainer.",
    details: [
      "Foundational gada mechanics and safe swing paths",
      "Rotational strength and shoulder integrity",
      "Timing, rhythm and flow construction",
      "Certification pathway for coaches",
    ],
    format: "Certification · online with assessment",
    image: macePose,
    price: 35000,
    type: "mace" as const,
    to: "/courses/steel-mace-flow" as const,
  },
];

export default function CourseJourney() {
  const [cart, setCart] = useAtom(cartAtom);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);
  const [open, setOpen] = useState<string | null>("01");

  const addToCart = (id: string, name: string, price: number) => {
    if (cart.find((item) => item.id === id)) {
      setIsCartOpen(true);
      return;
    }
    setCart([...cart, { id, name, price }]);
    toast.success(`${name} added to cart`);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-[var(--night)] py-20 md:py-28 px-6">
      <div className="section-inner space-y-16 md:space-y-24">
        {journey.map((item, i) => {
          const isOpen = open === item.n;
          return (
            <motion.article
              key={item.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="border-b border-[var(--bone)] pb-16 md:pb-24"
            >
              <div
                className={`grid md:grid-cols-2 gap-10 md:gap-20 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative h-[360px] md:h-[520px] border border-[var(--bone)] rounded-sm overflow-hidden group/img bg-[var(--alt)]">
                  <img
                    src={item.image.url}
                    className="w-full h-full object-contain transition-transform duration-[1200ms] group-hover/img:scale-105"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <MovementGeometry type={item.type} className="w-1/3 h-1/3 opacity-20" />
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="editorial-heading text-6xl md:text-8xl text-[var(--bone)] opacity-20">{item.n}</p>
                  <p className="label-caps text-[var(--gold)] text-[10px]">{item.category}</p>
                  <h2 className="editorial-heading text-5xl md:text-7xl">{item.title}</h2>
                  <p className="text-[var(--muted)] text-lg leading-relaxed italic max-w-lg">{item.copy}</p>
                  <p className="label-caps text-[var(--gold)]">₹{item.price.toLocaleString()}</p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => addToCart(item.n, item.title, item.price)}
                      className="px-8 py-3 bg-[var(--teal)] text-[var(--night)] label-caps text-[10px] hover:bg-[var(--gold)] transition-colors"
                    >
                      Add to cart
                    </button>
                    <button
                      onClick={() => setOpen(isOpen ? null : item.n)}
                      aria-expanded={isOpen}
                      className="px-8 py-3 border border-[var(--gold)]/50 text-[var(--gold)] label-caps text-[10px] hover:bg-[var(--gold)] hover:text-[var(--night)] transition-colors"
                    >
                      {isOpen ? "Hide details" : "More details"}
                    </button>
                    <Link
                      to={item.to}
                      className="label-caps text-[10px] text-[var(--gold)] border-b border-[var(--gold)]/30 hover:border-[var(--gold)] transition-colors"
                    >
                      Dive deep into {item.title}
                    </Link>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-8 space-y-4 border-t border-[var(--bone)] mt-6">
                          <p className="label-caps text-[10px] text-[var(--muted)]">{item.format}</p>
                          <ul className="space-y-3">
                            {item.details.map((d) => (
                              <li key={d} className="flex gap-3 text-[var(--muted)] text-base italic">
                                <span className="text-[var(--gold)]">—</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                          {item.metadata && (
                            <p className="text-[var(--muted)] text-sm opacity-60 font-hand">{item.metadata}</p>
                          )}
                          <button
                            onClick={() => addToCart(item.n, item.title, item.price)}
                            className="mt-2 px-8 py-3 bg-[var(--gold)] text-[var(--night)] label-caps text-[10px] hover:bg-[var(--teal)] transition-colors"
                          >
                            Purchase — ₹{item.price.toLocaleString()}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
