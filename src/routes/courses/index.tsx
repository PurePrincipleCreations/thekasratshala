import { createFileRoute } from "@tanstack/react-router";
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
      <CoursesHero />
      <CourseJourney />
      <CoursesContact />
    </Layout>
  );
}
