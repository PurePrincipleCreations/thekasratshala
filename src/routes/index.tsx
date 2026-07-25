import { createFileRoute } from "@tanstack/react-router";
import { useEffect, lazy, Suspense, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import HeroOverlay from "@/components/HeroOverlay";
import VideoTransition from "@/components/VideoTransition";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import WorkshopsSection from "@/components/WorkshopsSection";
import OnlineSection from "@/components/OnlineSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { initScrollManager, destroyScrollManager } from "@/utils/ScrollManager";

const ThreeScene = lazy(() => import("@/components/three/ThreeScene"));

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Kasratshala — Movement Arts Dojo · Bir, Himachal" },
      { name: "description", content: "A movement arts dojo rooted in the Gurukul tradition. Courses, workshops, and online practice from under the sacred tree in Bir, Himachal Pradesh." },
      { property: "og:title", content: "Kasratshala — Movement Arts Dojo" },
      { property: "og:description", content: "Rooted in the Gurukul tradition. Under the sacred tree, in the Dhauladhar range." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    initScrollManager();
    setMounted(true);
    return () => destroyScrollManager();
  }, []);

  return (
    <div className="relative mobile-bg min-h-screen text-[var(--cream)]">
      <LoadingScreen />
      {mounted && (
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>
      )}
      <div className="grain-overlay" />
      <Navigation />
      <ScrollProgress />

      <main className="relative">
        <HeroOverlay />
        <VideoTransition />
        <div style={{ background: "linear-gradient(180deg, var(--night) 0%, var(--page) 30%, var(--page) 70%, var(--night) 100%)" }}>
          <AboutSection />
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
