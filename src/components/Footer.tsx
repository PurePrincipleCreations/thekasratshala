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
          <p className="label-caps text-[var(--gold)]">Reviews</p>
          <div className="space-y-4">
            {[
              { name: "Arjun S.", text: "A life-changing practice. The biomechanics meeting tradition is exactly what I needed." },
              { name: "Sarah K.", text: "Intelligent movement in a beautiful dark Himalayan setting. Highly recommended." }
            ].map((r, i) => (
              <div key={i} className="p-3 border border-[var(--bone)] bg-[var(--alt)]/50 rounded-sm">
                <p className="text-[10px] text-[var(--cream)] italic">"{r.text}"</p>
                <p className="text-[9px] label-caps text-[var(--gold)] mt-2">— {r.name}</p>
              </div>
            ))}
            <div className="flex items-center gap-1 text-[var(--gold)]">
              <span className="text-xs">★★★★★</span>
              <span className="text-[9px] label-caps text-[var(--muted)]">4.9 on Google</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="label-caps text-[var(--gold)]">Contact</p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li><a href="mailto:namaste@kasratshala.in" className="hover:text-[var(--cream)] transition-colors">namaste@kasratshala.in</a></li>
            <li>Naggar, Kullu District</li>
            <li>Himachal Pradesh, India</li>
            <li className="mt-4 pt-4 border-t border-[var(--bone)]">
              <div className="w-full h-48 bg-[var(--alt)] rounded-sm overflow-hidden border border-[var(--bone)] opacity-80 hover:opacity-100 transition-opacity">
                {/* Embedded Map Representation */}
                <iframe 
                  title="Kasratshala Location"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(1.2)' }}
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.867941727764!2d77.1852!3d32.1158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904870f44385a49%3A0xc6c4b2e8c607f2!2sNaggar%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                />
              </div>
            </li>
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
        <p className="text-[10px] label-caps text-[var(--muted)]">© 2026 Kasratshala</p>
        <p className="text-[10px] label-caps italic text-[var(--muted)]">Come for the practice. Stay for the shift.</p>
      </div>
    </footer>
  );
}
