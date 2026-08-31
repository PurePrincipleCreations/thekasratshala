import { createFileRoute, Link } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { cartAtom, isCartOpenAtom } from "@/lib/store";
import yogaForStrengthNew from "@/assets/yoga-for-strength-new.png.asset.json";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import macePose from "@/assets/mace_pose.png.asset.json";
import outdoorMace1 from "@/assets/outdoor_mace_1.png.asset.json";
import flowRainbow from "@/assets/flow-rainbow.jpg.asset.json";
import BiomechanicalOverlay from "@/components/biomechanical/BiomechanicalOverlay";

const camps = [
  {
    title: "The Kasrat Camp",
    category: "Residential immersion · Naggar",
    copy: "Strength & conditioning with mace, kettlebells, resistance bands, clubs and more.",
    image: outdoorMace1,
    intro:
      "Is our signature camp from THE KASRATSHALA which primarily focuses on strength & conditioning using multiple tools like mace, kettlebells, resistance bands, clubs & more.",
    details: [
      "TKC aims to bring back qualities like the ABCDE's — Agility, Balance, Dexterity, Efficiency, Speed — which is the base of our protocols and movement discipline.",
      "TKC is more about exploring some healthy holidays in the Himalayas along with some challenges to push you beyond your comfort zone to become stronger and better.",
      "Tools: steel mace, kettlebells, resistance bands, Indian clubs and bodyweight conditioning.",
      "Format: residential, small groups, shared meals and a daily rhythm of practice.",
    ],
  },
  {
    title: "One Flow",
    category: "Residential immersion · Naggar",
    copy: "Different arts under one roof — community, flow, joy, experience.",
    image: flowRainbow,
    intro:
      "One Flow brings different arts under our roof inclusive of community, Flow, joy, Experience.",
    details: [
      "Vinyasa yoga flow",
      "SMF — Steel Mace Flow",
      "Kali Yoga",
      "Flow Arts — Dapo, Poi, Fire Toys",
      "Hiking and cold exposure",
      "Creative arts",
    ],
    detailsNote:
      "What we will do is unique multidisciplinary combinations, built for people who like to move across styles rather than inside one.",
  },
  {
    title: "Yoga for Strength Camp",
    category: "Residential immersion · Naggar",
    copy: "Build strong foundations through movement, breath and patient practice.",
    image: yogaPose,
    intro:
      "The in-person version of Yoga for Strength — usable strength inside familiar yoga shapes, practised over consecutive days.",
    details: [
      "Progressive loading inside familiar yoga shapes",
      "Joint capacity, balance and controlled range",
      "Breath as a structural tool, not decoration",
      "Long-form morning practice and evening restoration",
    ],
  },
  {
    title: "Steel Mace Flow Camp",
    category: "Residential immersion · Naggar",
    copy: "Deepening rotational strength and fluid movement in the Himalayan field.",
    image: macePose,
    intro:
      "Rotational strength, shoulder integrity, timing and fluid multi-planar movement through the ancient gada — in the field, over days rather than hours.",
    details: [
      "Grip, stance, swing paths and safety",
      "Rotational loading, transitions and sequencing",
      "Flow practice outdoors on uneven ground",
      "Recovery, mobility and breath between sessions",
    ],
  },
];

export const Route = createFileRoute("/camps")({
  component: CampsPage,
  head: () => ({
    meta: [
      { title: "Camps — Kasratshala" },
      { name: "description", content: "Residential movement immersions in Naggar, Himachal Pradesh." },
      { property: "og:title", content: "Camps — Kasratshala" },
      { property: "og:description", content: "Residential movement immersions in Naggar, Himachal Pradesh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function CampsPage() {
  const [cart, setCart] = useAtom(cartAtom);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);
  const [open, setOpen] = useState<string | null>(null);
  const [yogaOpen, setYogaOpen] = useState(false);

  const addYogaToCart = () => {
    if (!cart.find((item) => item.id === "yoga-for-strength")) {
      setCart([...cart, { id: "yoga-for-strength", name: "Yoga for Strength", price: 40000 }]);
      toast.success("Yoga for Strength added to cart");
    }
    setIsCartOpen(true);
  };

  return (
    <Layout>
      <section className="py-16 md:py-32 px-6 bg-[var(--night)]">
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
        {camps.map((camp) => {
          const isOpen = open === camp.title;
          return (
            <div key={camp.title} className="relative border-t border-[var(--bone)] group overflow-hidden">
              <div className="relative min-h-[70svh] md:min-h-[80vh] flex">
                <img
                  src={camp.image.url}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-all duration-[2000ms]"
                  alt={camp.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/60 to-transparent" />
                <BiomechanicalOverlay className="opacity-10 group-hover:opacity-20" circles={[{ cx: 300, cy: 300, r: 250 }]} />

                <div className="relative p-8 md:p-24 flex flex-col justify-end max-w-4xl space-y-6 w-full">
                  <p className="label-caps text-[var(--gold)]">{camp.category}</p>
                  <h2 className="editorial-heading text-5xl md:text-8xl">{camp.title}</h2>
                  <p className="text-[var(--muted)] text-xl italic max-w-xl">{camp.copy}</p>
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <p className="label-caps text-[10px] text-[var(--gold)]">Dates on enquiry</p>
                    <button
                      onClick={() => setOpen(isOpen ? null : camp.title)}
                      aria-expanded={isOpen}
                      className="px-8 py-3 border border-[var(--gold)]/50 text-[var(--gold)] label-caps text-[10px] hover:bg-[var(--gold)] hover:text-[var(--night)] transition-all"
                    >
                      {isOpen ? "Hide details" : "More details"}
                    </button>
                    <Link
                      to="/connect"
                      className="px-8 py-3 bg-[var(--teal)] text-[var(--night)] label-caps text-[10px] hover:bg-[var(--gold)] transition-colors"
                    >
                      Enquire
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
                        <div className="pt-8 mt-4 border-t border-[var(--bone)] space-y-4 max-w-2xl">
                          <p className="text-[var(--muted)] text-base md:text-lg italic leading-relaxed">{camp.intro}</p>
                          <ul className="space-y-3">
                            {camp.details.map((d) => (
                              <li key={d} className="flex gap-3 text-[var(--muted)] text-base italic">
                                <span className="text-[var(--gold)]">—</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                          {"detailsNote" in camp && camp.detailsNote && (
                            <p className="text-[var(--muted)] text-sm opacity-70 font-hand">{camp.detailsNote}</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </section>


      <section className="py-20 md:py-32 bg-[var(--night)] px-6 text-center border-t border-[var(--bone)]">
        <div className="section-inner max-w-2xl space-y-10">
          <h2 className="editorial-heading text-5xl italic">Come for the practice. Stay long enough for it to change your rhythm.</h2>
          <Link to="/connect" className="inline-block px-10 py-5 bg-[var(--gold)] text-[var(--night)] label-caps">
            Enquire about camps
          </Link>
        </div>
      </section>
    </Layout>
  );
}
