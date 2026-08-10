import ksLogo from "@/assets/ks-logo.png.asset.json";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="relative pt-32 pb-12 bg-[var(--night)] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--bone)] to-transparent" />
      
      <div className="section-inner">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <img src={ksLogo.url} alt="Kasratshala" className="h-12 w-auto invert opacity-80" />
            <p className="editorial-heading text-3xl max-w-md italic text-[var(--muted)]">
              "Ancient tools. Modern movement science. One body."
            </p>
            <div className="flex gap-4">
              <a href="#" className="label-caps text-[8px] border border-[var(--bone)] px-4 py-2 hover:bg-[var(--bone)] transition-colors">Instagram</a>
              <a href="#" className="label-caps text-[8px] border border-[var(--bone)] px-4 py-2 hover:bg-[var(--bone)] transition-colors">YouTube</a>
            </div>
          </div>

          <div className="space-y-6">
            <p className="label-caps text-[var(--gold)]">Navigation</p>
            <ul className="space-y-4">
              {["Practice", "Camps", "One Flow", "Connect"].map(item => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(" ", "-")}` as any} className="text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors italic font-serif text-lg">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <p className="label-caps text-[var(--gold)]">Connect</p>
            <div className="space-y-4">
              <a href="mailto:namaste@kasratshala.in" className="block text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors italic font-serif text-lg">
                namaste@kasratshala.in
              </a>
              <div className="text-[var(--muted)] text-sm leading-relaxed">
                Naggar, Kullu District<br />
                Himachal Pradesh, India
              </div>
              <div className="pt-4 grayscale opacity-50 contrast-125 border border-[var(--bone)] rounded-sm overflow-hidden h-32 w-full relative">
                 {/* Placeholder for map view - would typically be an iframe or static map image */}
                 <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center text-[8px] label-caps text-[var(--bone)]">
                   Naggar Dojo View
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-[var(--bone)]">
          <p className="label-caps text-[8px] text-[var(--muted)]">© 2026 Kasratshala · Movement Arts Dojo</p>
          <div className="flex gap-8">
             <span className="label-caps text-[8px] text-[var(--muted)]">Privacy</span>
             <span className="label-caps text-[8px] text-[var(--muted)]">Terms</span>
          </div>
          <p className="label-caps text-[8px] text-[var(--gold)] shimmer-text">Rooted in the Himalayas</p>
        </div>
      </div>
      
      {/* Background large decorative text */}
      <div className="absolute -bottom-20 -left-20 text-[20vw] font-serif italic text-[var(--bone)] opacity-10 pointer-events-none whitespace-nowrap select-none">
        KASRATSHALA
      </div>
    </footer>
  );
}
