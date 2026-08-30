import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

export const Route = createFileRoute("/kinetic")({
  component: KineticPage,
  head: () => ({
    meta: [
      { title: "Kinetic — Kasratshala Movement Arts" },
      { name: "description", content: "Kinetic is the next chapter of practice at Kasratshala. Details coming soon." },
      { property: "og:title", content: "Kinetic — Kasratshala" },
      { property: "og:description", content: "Kinetic is the next chapter of practice at Kasratshala. Details coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function KineticPage() {
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-inner text-center space-y-8 max-w-2xl"
        >
          <p className="label-caps text-[var(--gold)]">Kinetic</p>
          <h1 className="editorial-heading text-6xl md:text-8xl leading-none">Coming soon.</h1>
          <p className="text-[var(--muted)] text-lg italic">
            We are shaping this chapter of the practice. Write to us to hear when it opens.
          </p>
          <Link
            to={"/connect" as any}
            className="inline-block px-10 py-4 border border-[var(--bone)] text-[var(--cream)] font-hand text-xl hover:bg-[var(--bone)] transition-all"
          >
            Write to Us
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
