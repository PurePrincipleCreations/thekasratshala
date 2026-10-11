import { Link } from "@tanstack/react-router";

export default function HomeFinalCTA() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-[var(--night)] px-6 text-center border-t border-[var(--bone)]">
      <div className="section-inner max-w-3xl space-y-12">
        <div className="space-y-6">
          <h2 className="editorial-heading text-6xl md:text-8xl">
            Join the <span className="italic text-[var(--gold)]">Daily Practice.</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/schedule"
            className="px-10 py-5 bg-[var(--teal)] text-[var(--night)] font-hand text-xl hover:bg-[var(--gold)] transition-all"
          >
            Select Your Batch &amp; Schedule
          </Link>
          <Link
            to={"/connect" as any}
            className="px-10 py-5 border border-[var(--bone)] text-[var(--cream)] font-hand text-xl hover:bg-[var(--bone)] transition-all"
          >
            Write to Us
          </Link>
        </div>

        <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed border-t border-[var(--bone)] pt-10">
          Looking for Certifications (Steel Mace Flow, Yoga Alliance) or Residential Camps?{" "}
          <Link to="/immersions" className="text-[var(--gold)] border-b border-[var(--gold)]/40 hover:border-[var(--gold)]">
            Explore our Immersions.
          </Link>
        </p>
      </div>
    </section>
  );
}
