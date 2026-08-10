import { Link } from "@tanstack/react-router";

export default function HomeFinalCTA() {
  return (
    <section className="py-40 bg-[var(--night)] px-6 text-center border-t border-[var(--bone)]">
      <div className="section-inner max-w-3xl space-y-12">
        <div className="space-y-6">
          <h2 className="editorial-heading text-6xl md:text-8xl">
            Come for the practice.<br />
            <span className="italic text-[var(--gold)]">Stay for the shift.</span>
          </h2>
          <p className="text-[var(--muted)] text-xl leading-relaxed">
            Join online from wherever you are, or meet us in Naggar when the field calls.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to={"/courses" as any}
            className="px-10 py-5 bg-[var(--teal)] text-[var(--night)] label-caps hover:bg-[var(--gold)] transition-all"
          >
            Explore Courses
          </Link>
          <Link
            to={"/connect" as any}
            className="px-10 py-5 border border-[var(--bone)] text-[var(--cream)] label-caps hover:bg-[var(--bone)] transition-all"
          >
            Write to Us
          </Link>
        </div>
      </div>
    </section>
  );
}
