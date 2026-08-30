import { Link } from "@tanstack/react-router";

export default function HomeFinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-[var(--night)] px-6 text-center border-t border-[var(--bone)]">
      <div className="section-inner max-w-3xl space-y-12">
        <div className="space-y-6">
          <h2 className="editorial-heading text-6xl md:text-8xl">
            Come for the practice.<br />
            <span className="italic text-[var(--gold)]">Stay for the shift.</span>
          </h2>
          <p className="text-[var(--muted)] text-xl leading-relaxed">
            Join online from wherever you are, &amp; write to us to do the same certifications in person.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to={"/certifications" as any}
            className="px-10 py-5 bg-[var(--teal)] text-[var(--night)] font-hand text-xl hover:bg-[var(--gold)] transition-all"
          >
            Explore Certifications
          </Link>
          <Link
            to={"/connect" as any}
            className="px-10 py-5 border border-[var(--bone)] text-[var(--cream)] font-hand text-xl hover:bg-[var(--bone)] transition-all"
          >
            Write to Us
          </Link>
        </div>
      </div>
    </section>
  );
}
