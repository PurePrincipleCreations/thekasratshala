import { useEffect, useState } from "react";

const VIDEO_ID = "H46Oo99i898";

const params = [
  "autoplay=1",
  "mute=1",
  "loop=1",
  `playlist=${VIDEO_ID}`,
  "controls=0",
  "showinfo=0",
  "rel=0",
  "modestbranding=1",
  "iv_load_policy=3",
  "disablekb=1",
  "fs=0",
  "playsinline=1",
  "cc_load_policy=0",
  // request highest quality by default
  "hd=1",
  "vq=hd1080",
].join("&");

export default function Hero() {
  // On phones the video must be scaled up more to cover a tall, narrow frame
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scale = isMobile ? 2.4 : 1.6;

  return (
    <section className="relative h-[100svh] min-h-[520px] flex flex-col items-center justify-center overflow-hidden bg-[var(--night)]">
      {/* Poster fallback so the hero is never blank if the video is blocked */}
      <img
        src={dojoBuilding.url}
        alt="The Kasratshala dojo in Naggar, Himachal Pradesh"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Oversized wrapper pushes YouTube's title bar and bottom-right chrome outside the visible frame */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `calc(177.78svh * ${scale})`,
            height: `calc(56.25vw * ${scale})`,
            minWidth: `${scale * 100}vw`,
            minHeight: `${scale * 100}svh`,
          }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?${params}`}
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
