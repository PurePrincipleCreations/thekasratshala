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
      { title: "Kasratshala — Movement Arts Dojo in Naggar, Himachal" },
      { name: "description", content: "Ancient tools, yoga and modern movement science in one living practice. Certification tracks online and residential camps in Naggar, Himachal." },
      { property: "og:title", content: "Kasratshala — Movement Arts Dojo in Naggar, Himachal" },
      { property: "og:description", content: "Ancient tools, yoga and modern movement science in one living practice. Certification tracks online and residential camps in Naggar, Himachal." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://thekasratshala.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://thekasratshala.lovable.app/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "SportsActivityLocation"],
        name: "Kasratshala",
        description: "Movement arts dojo in Naggar, Himachal Pradesh teaching steel mace flow, yoga for strength, pranayama and functional movement.",
        url: "https://thekasratshala.lovable.app",
        telephone: "+918307929691",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Naggar",
          addressRegion: "Himachal Pradesh",
          addressCountry: "IN",
        },
        sameAs: [
          "https://www.instagram.com/thekasratshala/",
          "https://www.youtube.com/@thekasratshala",
        ],
      }
    ) }],
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

