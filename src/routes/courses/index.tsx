import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import Layout from "@/components/Layout";
import CoursesHero from "@/components/courses/CoursesHero";
import CourseJourney from "@/components/courses/CourseJourney";
import CoursesContact from "@/components/courses/CoursesContact";

export const Route = createFileRoute("/courses/")({
  component: CoursesIndex,
  head: () => ({
    meta: [
      { title: "Courses — Kasratshala" },
      { name: "description", content: "Explore foundational movement, yoga for strength, and steel mace flow." },
    ],
  }),
});

function CoursesIndex() {
  return (
    <Layout>
      
      {/* Hero Header */}
      <section className="pt-48 pb-20 px-6 border-b border-[var(--bone)]">
        <div className="section-inner text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="label-caps text-[var(--gold)]">The Path of the Gada</p>
            <h1 className="editorial-heading text-8xl md:text-[12rem] leading-none">Journey.</h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto text-[var(--muted)] text-lg italic"
          >
            A high-level overview of our core programs. Click any path to go deeper into the practice, structure, and details.
          </motion.p>
        </div>
      </section>

      {/* Courses Journey - Horizontal Scroll Inspiration from Solar */}
      <CourseJourney />

      <CoursesContact />
    </Layout>
  );
}
