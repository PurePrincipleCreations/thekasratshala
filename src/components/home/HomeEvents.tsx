import { Link } from "@tanstack/react-router";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import macePose from "@/assets/mace_pose.png.asset.json";
import BiomechanicalOverlay from "../biomechanical/BiomechanicalOverlay";

const events = [
  {
    title: "The Kasrat Camp",
    category: "Residential immersion",
    description:
      "Our signature camp from THE KASRATSHALA — strength & conditioning with mace, kettlebells, resistance bands, clubs and more. It brings back the ABCDE's: Agility, Balance, Dexterity, Efficiency, Speed.",
    image: macePose,
    cta: "See what happens at TKC",
    to: "/camps" as any,
  },
  {
    title: "One Flow",
    category: "Residential immersion",
    description:
      "One Flow brings different arts under our roof — community, flow, joy, experience. Unique multidisciplinary combinations, in one field, over a few days.",
    image: yogaPose,
    cta: "See the full line-up",
    to: "/camps" as any,
  },
];

export default function HomeEvents() {
  return (
    <section className="py-20 md:py-24 bg-[var(--night)] px-6">
      <div className="section-inner space-y-20">
        <div className="space-y-4">
          <p className="label-caps text-[var(--gold)]">Explore our camps</p>
          <h2 className="editorial-heading text-6xl">Come join us in the Field</h2>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {events.map((event) => (
            <Link
              key={event.title}
              to={event.to}
              className="group relative block overflow-hidden rounded-sm border border-[var(--bone)] min-h-[28rem] md:aspect-[16/8]"
            >
              <img
                src={event.image.url}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000"
                alt={event.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/60 to-transparent" />
              <BiomechanicalOverlay className="opacity-20 group-hover:opacity-40" circles={[{ cx: 300, cy: 300, r: 200 }]} />

              <div className="relative p-8 md:p-12 flex flex-col justify-end h-full max-w-3xl space-y-4">
                <p className="label-caps text-[var(--gold)]">{event.category}</p>
                <h3 className="editorial-heading text-4xl md:text-5xl">{event.title}</h3>
                <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">{event.description}</p>
                <span className="inline-block pt-2 label-caps text-[10px] text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
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
