import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import outdoorMace1 from "@/assets/outdoor_mace_1.png.asset.json";
import flowRainbow from "@/assets/flow-rainbow.jpg.asset.json";

const URL = "https://thekasratshala.lovable.app/immersions";
const TITLE = "Immersions & Certifications — Kasratshala";
const DESC =
  "Go deeper with Kasratshala: residential mountain camps in Naggar and certifications in Steel Mace Flow, Mace Vinyasa & Yoga Kali, and Yoga for Strength.";

export const Route = createFileRoute("/immersions")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: outdoorMace1.url },
      { name: "twitter:image", content: outdoorMace1.url },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ImmersionsPage,
});

const certs = [
  { title: "Steel Mace Flow", by: "Certified by Leo Savage" },
  { title: "Mace Vinyasa & Yoga Kali", by: "Accredited by Yoga Alliance" },
  { title: "Yoga for Strength", by: "Accredited by Yoga Alliance" },
];

const camps = [
  { title: "The Kasrat Camp", copy: "7 to 8 immersions a year.", image: outdoorMace1 },
  { title: "One Flow", copy: "Multidisciplinary combinations.", image: flowRainbow },
];

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

function ImmersionsPage() {
  return (
    <Layout>
      <section className="px-5 md:px-12 pt-12 md:pt-20 pb-14 max-w-6xl mx-auto">
        <motion.p {...fade} className="label-caps text-[var(--gold)] mb-4">Immersion</motion.p>
        <motion.h1 {...fade} className="editorial-heading text-4xl md:text-7xl text-[var(--cream)] mb-6 max-w-4xl">
          Go Deeper. Immersion &amp; Certification.
        </motion.h1>
        <motion.p {...fade} className="text-[var(--muted)] text-lg max-w-2xl">
          Step out of the city. Join our residential camps in the mountains or get certified to teach the Kasratshala way.
        </motion.p>
      </section>

      <section className="px-5 md:px-12 pb-16 max-w-6xl mx-auto">
        <h2 className="label-caps text-[var(--gold)] mb-6">Certifications</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {certs.map((c) => (
            <motion.div
              {...fade}
              key={c.title}
              className="rounded-[24px] border border-[var(--bone)] bg-[var(--cream)]/5 backdrop-blur-md p-7"
            >
              <h3 className="editorial-heading text-2xl text-[var(--cream)] mb-3">{c.title}</h3>
              <p className="text-sm text-[var(--muted)]">{c.by}</p>
            </motion.div>
          ))}
        </div>
        <Link
          to="/certifications"
          className="inline-block mt-6 text-[11px] tracking-[0.24em] uppercase text-[var(--cream)] hover:text-[var(--gold)]"
        >
          Explore certifications →
        </Link>
      </section>

      <section className="px-5 md:px-12 pb-24 max-w-6xl mx-auto">
        <h2 className="label-caps text-[var(--gold)] mb-6">Residential camps</h2>
        <div className="flex flex-col gap-6">
          {camps.map((c) => (
            <motion.article
              {...fade}
              key={c.title}
              className="rounded-[28px] overflow-hidden border border-[var(--bone)] bg-[var(--cream)]/5 backdrop-blur-md grid md:grid-cols-2"
            >
              <img src={c.image.url} alt={c.title} loading="lazy" className="w-full h-64 md:h-full object-cover" />
              <div className="p-7 md:p-10 flex flex-col justify-center gap-4">
                <p className="label-caps text-[var(--muted)]">Naggar · Himalayas</p>
                <h3 className="editorial-heading text-3xl md:text-4xl text-[var(--cream)]">{c.title}</h3>
                <p className="text-[var(--muted)]">{c.copy}</p>
                <Link
                  to="/camps"
                  className="self-start rounded-full bg-[var(--gold)] px-6 py-3 text-[11px] tracking-[0.24em] uppercase font-semibold text-[var(--night)] hover:brightness-110"
                >
                  View Upcoming Dates
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
