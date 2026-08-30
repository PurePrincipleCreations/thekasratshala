import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import Layout from "@/components/Layout";
import CourseJourney from "@/components/courses/CourseJourney";
import CoursesContact from "@/components/courses/CoursesContact";

export const Route = createFileRoute("/certifications")({
  component: CertificationsPage,
  head: () => ({
    meta: [
      { title: "Certifications — Kasratshala Movement Arts" },
      { name: "description", content: "Certification tracks in steel mace flow, yoga for strength, pranayama and foundational movement recoding — online and in person." },
      { property: "og:title", content: "Certifications — Kasratshala" },
      { property: "og:description", content: "Certification tracks in steel mace flow, yoga for strength, pranayama and foundational movement recoding." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function CertificationsPage() {
  return (
    <Layout>
      <section className="pt-48 pb-20 px-6 border-b border-[var(--bone)]">
        <div className="section-inner text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="label-caps text-[var(--gold)]">Start where your body is</p>
            <h1 className="editorial-heading text-7xl md:text-[10rem] leading-none">Coach confidently</h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto text-[var(--muted)] text-lg italic"
          >
            Certifications give you the ability to share your knowledge with people, honoring its creators.
          </motion.p>
        </div>
      </section>

      <CourseJourney />
      <CoursesContact />
    </Layout>
  );
}
