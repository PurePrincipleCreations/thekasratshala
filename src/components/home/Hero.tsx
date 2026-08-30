export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--night)]">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Oversized wrapper pushes YouTube's title bar and bottom-right chrome outside the visible frame */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(177.78vh*1.6)] h-[calc(56.25vw*1.6)] min-w-[160vw] min-h-[160vh]">
          <iframe
            src="https://www.youtube-nocookie.com/embed/H46Oo99i898?autoplay=1&mute=1&loop=1&playlist=H46Oo99i898&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&cc_load_policy=0&vq=hd1080"
            className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="Hero Video"
          />
        </div>
        {/* Transparent shield so no YouTube UI can ever be hovered or clicked */}
        <div className="absolute inset-0 z-10" aria-hidden="true" />
      </div>
    </section>
  );
}
