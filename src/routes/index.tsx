import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Hero from "@/components/home/Hero";
import Principles from "@/components/home/Principles";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import HomeEvents from "@/components/home/HomeEvents";
import HomeFinalCTA from "@/components/home/HomeFinalCTA";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Kasratshala — Movement Arts Dojo · Naggar, Himachal" },
      { name: "description", content: "Ancient tools, yoga and modern movement science in one living practice. Realign your movement in the Himalayas." },
      { property: "og:title", content: "Kasratshala — Movement Arts Dojo" },
      { property: "og:description", content: "Ancient tools. Modern movement science. One body. Residential movement immersions in Naggar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <Layout>
      <Hero />
      <Principles />
      <FeaturedCourses />
      <HomeEvents />
      <HomeFinalCTA />
    </Layout>
  );
}
