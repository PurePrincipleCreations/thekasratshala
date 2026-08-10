import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import macePose from "@/assets/mace_pose.png.asset.json";
import handsContact from "@/assets/hands_contact.png.asset.json";
import BiomechanicalOverlay from "../biomechanical/BiomechanicalOverlay";

const events = [
  {
    title: "Yoga for Strength Camp",
    category: "Residential immersion",
    description: "Build strong foundations through movement, breath and patient practice.",
    image: yogaPose,
    cta: "Explore the camp",
    to: "/camps" as any
  },
  {
    title: "Kasrat Camp",
    category: "Residential immersion",
    description: "A full-spectrum immersion in tools, yoga, breathwork and movement science.",
    image: macePose,
    cta: "Explore the camp",
    to: "/camps" as any
  },
  {
    title: "One Flow Gathering",
    category: "In person · India",
    description: "One day. One field. A shared movement practice.",
    image: handsContact,
    cta: "Discover One Flow",
    to: "/one-flow" as any
  }
];

export default function HomeEvents() {
  return (
    <section className="py-32 bg-[var(--night)] px-6">
      <div className="section-inner space-y-20">
        <div className="space-y-4">
          <p className="label-caps text-[var(--gold)]">Practice in company</p>
          <h2 className="editorial-heading text-6xl">Some practices need more time.</h2>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {events.map((event, i) => (
            <Link key={event.title} to={event.to} className="group relative block aspect-[16/7] overflow-hidden rounded-sm border border-[var(--bone)]">
              <img 
                src={event.image.url} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000"
                alt={event.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-transparent to-transparent opacity-80" />
              <BiomechanicalOverlay className="opacity-20 group-hover:opacity-40" circles={[{ cx: 300, cy: 300, r: 200 }]} />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end max-w-2xl space-y-4">
                <p className="label-caps text-[var(--gold)]">{event.category}</p>
                <h3 className="editorial-heading text-4xl md:text-5xl">{event.title}</h3>
                <p className="text-[var(--muted)] text-lg italic">{event.description}</p>
                <span className="inline-block pt-4 label-caps text-[10px] text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
                  {event.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
