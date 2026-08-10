import { Link } from "@tanstack/react-router";
import ksLogo from "@/assets/ks-logo.png.asset.json";

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-12 bg-[var(--night)] border-t border-[var(--bone)]">
      <div className="section-inner grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/">
            <img src={ksLogo.url} alt="Kasratshala" className="h-12 w-auto" />
          </Link>
          <p className="label-caps text-[10px] text-[var(--muted)] leading-relaxed">
            Ancient tools. Modern movement science. One body.
          </p>
        </div>
        
        <div className="space-y-4">
          <p className="label-caps text-[var(--gold)]">Explore</p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li><Link to="/" className="hover:text-[var(--cream)] transition-colors">Home</Link></li>
            <li><Link to={"/courses" as any} className="hover:text-[var(--cream)] transition-colors">Courses</Link></li>
            <li><Link to={"/camps" as any} className="hover:text-[var(--cream)] transition-colors">Camps</Link></li>
            <li><Link to={"/one-flow" as any} className="hover:text-[var(--cream)] transition-colors">One Flow</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="label-caps text-[var(--gold)]">Contact</p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li><a href="mailto:namaste@kasratshala.in" className="hover:text-[var(--cream)] transition-colors">namaste@kasratshala.in</a></li>
            <li>Naggar, Kullu District</li>
            <li>Himachal Pradesh, India</li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="label-caps text-[var(--gold)]">Legal</p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      
      <div className="section-inner mt-24 pt-8 border-t border-[var(--bone)] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] label-caps text-[var(--muted)]">© 2026 Kasratshala · Naggar, Himachal Pradesh</p>
        <p className="text-[10px] label-caps italic text-[var(--muted)]">Come for the practice. Stay for the shift.</p>
      </div>
    </footer>
  );
}
