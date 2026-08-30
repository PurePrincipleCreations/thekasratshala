import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/home/Hero";
import MovementMarquee from "@/components/home/MovementMarquee";
import Principles from "@/components/home/Principles";
import ScrollGallery from "@/components/home/ScrollGallery";
import StackedCards from "@/components/home/StackedCards";
import BeforeAfterScrub from "@/components/home/BeforeAfterScrub";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import HomeEvents from "@/components/home/HomeEvents";
import HomeFinalCTA from "@/components/home/HomeFinalCTA";


import Layout from "@/components/Layout";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Kasratshala — Movement Arts Dojo · Naggar, Himachal" },
      { name: "description", content: "Ancient tools, yoga and modern movement science in one living practice. 10 online courses, residential camps in Naggar, and the One Flow Gathering." },
      { property: "og:title", content: "Kasratshala — Movement Arts Dojo" },
      { property: "og:description", content: "Ancient tools. Modern movement science. One body. Online courses and residential camps in Naggar, Himachal Pradesh." },
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
      <ScrollGallery />
      <StackedCards />
      <BeforeAfterScrub />
      <HomeEvents />
      <HomeFinalCTA />
    </Layout>
  );
}

