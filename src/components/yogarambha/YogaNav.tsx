import { useEffect, useRef } from "react";
import gsap from "gsap";
import { User } from "lucide-react";

const links = ["Programs", "Retreats", "Philosophy"];

export default function YogaNav({
  isLoggedIn,
  onToggleLogin,
}: {
  isLoggedIn: boolean;
  onToggleLogin: () => void;
}) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -32,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from(".yg-nav-item", {
        y: -12,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.45,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed left-1/2 top-4 z-50 w-[min(1180px,calc(100%-1.5rem))] -translate-x-1/2 rounded-full border border-white/60 bg-white/60 px-4 py-3 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)] backdrop-blur-md md:px-6"
    >
      <div className="flex items-center justify-between gap-4">
        <a href="/yogarambha" className="yg-nav-item flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f97316] text-[13px] font-semibold tracking-tight text-white shadow-[0_10px_24px_-8px_rgba(249,115,22,0.7)]">
            Y
          </span>
          <span className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-slate-800">
            Yogarambha
          </span>
        </a>

        <div className="yg-nav-item hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="rounded-full px-4 py-2 text-[14px] font-medium text-slate-800/90 transition-colors hover:bg-white/70 hover:text-slate-900"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="yg-nav-item flex items-center gap-2">
          {isLoggedIn ? (
            <button
              onClick={onToggleLogin}
              aria-label="Your profile"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-white/80 text-slate-800 shadow-[0_10px_24px_-16px_rgba(15,23,42,0.6)] transition-transform hover:scale-105"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>
          ) : (
            <button
              onClick={onToggleLogin}
              className="rounded-full px-4 py-2 text-[14px] font-medium text-slate-800 transition-colors hover:bg-white/70"
            >
              Log In
            </button>
          )}
          <button className="rounded-full bg-[#f97316] px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_16px_34px_-16px_rgba(249,115,22,0.85)] transition-transform hover:scale-[1.03]">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
