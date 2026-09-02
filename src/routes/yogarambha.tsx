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
      {
        name: "description",
        content:
          "Yogarambha Academy trains movers and teachers in yoga, pranayama and movement arts — immersive programs, retreats and a philosophy-led curriculum.",
      },
      { property: "og:title", content: "Yogarambha Academy — Movement & Yoga Studies" },
      {
        property: "og:description",
        content:
          "Immersive yoga, pranayama and movement arts programs, retreats and teacher studies at Yogarambha Academy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Yogarambha() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-800 [cursor:auto]">
      <YogaNav isLoggedIn={isLoggedIn} onToggleLogin={() => setIsLoggedIn((v) => !v)} />
      <YogaHero />
    </div>
  );
}
