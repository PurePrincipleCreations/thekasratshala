import { Link } from "@tanstack/react-router";

export default function CoursesContact() {
  return (
    <section className="py-32 bg-[var(--night)] px-6 border-t border-[var(--bone)] text-center">
      <div className="section-inner max-w-2xl space-y-10">
        <h2 className="editorial-heading text-5xl md:text-6xl">Not sure where to begin?</h2>
        <p className="text-[var(--muted)] text-lg leading-relaxed">
          Write to us about your current practice, your history and what you want to understand better.
        </p>
        <Link 
          to={"/connect" as any}
          className="inline-block px-10 py-5 bg-[var(--gold)] text-[var(--night)] label-caps hover:bg-[var(--cream)] transition-all"
        >
          Speak with Kasratshala
        </Link>
      </div>
    </section>
  );
}
