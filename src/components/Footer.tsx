export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 bg-[var(--night)]">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--teal-bright), transparent)" }} />
      <div className="section-inner grid md:grid-cols-4 gap-10">
        <div>
          <p className="hand-title text-4xl text-[var(--heading)]">Kasratshala</p>
          <p className="section-sub text-sm mt-1">Movement Arts Dojo</p>
          <p className="text-xs text-[var(--muted)] mt-4 leading-relaxed">Under the sacred tree, in the shadow of the Dhauladhar range.</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-[var(--cream)]/70">
            <li><a href="#about" className="hover:text-[var(--cream)]">The Dojo</a></li>
            <li><a href="#courses" className="hover:text-[var(--cream)]">Courses</a></li>
            <li><a href="#workshops" className="hover:text-[var(--cream)]">Workshops</a></li>
            <li><a href="#online" className="hover:text-[var(--cream)]">Online</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4">Practice</p>
          <ul className="space-y-2 text-sm text-[var(--cream)]/70">
            <li><a href="#" className="hover:text-[var(--cream)]">Daily Practice</a></li>
            <li><a href="#" className="hover:text-[var(--cream)]">Foundations</a></li>
            <li><a href="#" className="hover:text-[var(--cream)]">Mentorship</a></li>
            <li><a href="#contact" className="hover:text-[var(--cream)]">Visit us</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4">Follow</p>
          <ul className="space-y-2 text-sm text-[var(--cream)]/70">
            <li><a href="#" className="hover:text-[var(--cream)]">Instagram</a></li>
            <li><a href="#" className="hover:text-[var(--cream)]">YouTube</a></li>
            <li><a href="#" className="hover:text-[var(--cream)]">Substack</a></li>
          </ul>
        </div>
      </div>
      <div className="section-inner mt-14 pt-6 border-t border-[var(--cream)]/5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[var(--muted)]">© {new Date().getFullYear()} Kasratshala · Bir, Himachal Pradesh</p>
        <p className="text-xs text-[var(--muted)] italic">Under the tree, above the clouds.</p>
      </div>
    </footer>
  );
}
