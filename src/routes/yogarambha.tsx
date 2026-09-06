import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import YogaNav from "@/components/yogarambha/YogaNav";
import YogaHero from "@/components/yogarambha/YogaHero";

export const Route = createFileRoute("/yogarambha")({
  ssr: false,
  component: Yogarambha,
  head: () => ({
    meta: [
      { title: "Yogarambha Academy — Yoga, Pranayama & Movement Studies" },
      { name: "description", content: "Immersive yoga, pranayama and movement arts programs, retreats and teacher studies at Yogarambha Academy." },
      { property: "og:title", content: "Yogarambha Academy — Yoga, Pranayama & Movement Studies" },
      { property: "og:description", content: "Immersive yoga, pranayama and movement arts programs, retreats and teacher studies at Yogarambha Academy." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://thekasratshala.lovable.app/yogarambha" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://thekasratshala.lovable.app/yogarambha" }],
  }),
});

function Yogarambha() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] text-slate-800 [cursor:auto]"
      style={{ fontFamily: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif' }}
    >
      <YogaNav isLoggedIn={isLoggedIn} onToggleLogin={() => setIsLoggedIn((v) => !v)} />
      <YogaHero />
    </div>
  );
}
