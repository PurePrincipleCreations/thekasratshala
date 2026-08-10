import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import HeroOverlay from "@/components/HeroOverlay";
import SmoothScroll from "@/components/SmoothScroll";
import WhatStaysSection from "@/components/WhatStaysSection";
import VideoTransition from "@/components/VideoTransition";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import WorkshopsSection from "@/components/WorkshopsSection";
import OnlineSection from "@/components/OnlineSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { initScrollManager, destroyScrollManager } from "@/utils/ScrollManager";

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
  useEffect(() => {
    initScrollManager();
    return () => destroyScrollManager();
  }, []);

  return (
    <div className="relative mobile-bg min-h-screen text-[var(--cream)]">
      <LoadingScreen />
      <SmoothScroll />
      <div className="grain-overlay" />
      <Navigation />
      <ScrollProgress />

      <main className="relative" style={{ zIndex: 2 }}>
        <HeroOverlay />
        <VideoTransition />
        <div className="bg-[var(--page)]">
          <AboutSection />
          <WhatStaysSection />
          <CoursesSection />
          <WorkshopsSection />
          <OnlineSection />
          <GallerySection />
          <ContactSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}
