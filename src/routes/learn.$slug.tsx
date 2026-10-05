import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Circle, CircleDashed, Pause, Play } from "lucide-react";
import Layout from "@/components/Layout";
import ChapterList from "@/components/course/ChapterList";
import { fmtTime, getBundle } from "@/data/coursesData";

const TOTAL = 4020; // 1:07:00
const RESUME = 1407; // 23:27

export const Route = createFileRoute("/learn/$slug")({
  loader: ({ params }) => {
    const b = getBundle(params.slug);
    if (!b) throw notFound();
    return { title: b.title, slug: b.slug };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — Lesson | Kasratshala` : "Not found" },
      { name: "description", content: "Watch the lesson with chapters, key ideas, a weekly drill and your own notes." },
      { property: "og:title", content: loaderData ? `${loaderData.title} — Kasratshala` : "Not found" },
      { property: "og:description", content: "Recorded Kasratshala lesson with chapters and practice notes." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
    ],
  }),
  notFoundComponent: () => (
    <Layout><div className="py-40 text-center text-[var(--cream)]">Course not found. <Link to="/programs" className="text-[var(--gold)]">See programs</Link></div></Layout>
  ),
  component: CourseDetail,
});

const ideas = [
  "A bandha is two opposing forces held in balance, not a muscle squeezed as hard as you can.",
  "Pressure inside the trunk behaves hydraulically. Close one end and it moves somewhere else, so the locks work as a system.",
  "Learn them in order: mula bandha first, then uddiyana, then jalandhara.",
  "Jalandhara bandha stops pressure rising to the head while you hold the breath.",
  "Beginners tend to over-grip and feel mula bandha in the thighs. With high blood pressure, check with your teacher before any breath retention.",
];

function CourseDetail() {
  const { slug } = Route.useParams();
  const course = getBundle(slug);
  const [t, setT] = useState(RESUME);
  const [playing, setPlaying] = useState(false);
  const [notes, setNotes] = useState("");
  const key = `ks-notes-${slug}`;

  useEffect(() => { setNotes(localStorage.getItem(key) ?? ""); }, [key]);
  useEffect(() => { localStorage.setItem(key, notes); }, [key, notes]);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((v) => Math.min(TOTAL, v + 1)), 1000);
    return () => clearInterval(id);
  }, [playing]);

  const pct = Math.round((t / TOTAL) * 100);
  const lessons = course?.lessons ?? [];
  const done = lessons.filter((l) => l.status === "done").length;
  const words = notes.trim() ? notes.trim().split(/\s+/).length : 0;

  return (
    <Layout>
      <section className="px-4 md:px-6 pt-24 md:pt-32 pb-20">
        <div className="section-inner grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-8 min-w-0">
            <div>
              <p className="label-caps text-[var(--gold)]">{course?.title}</p>
              <h1 className="editorial-heading text-3xl md:text-5xl text-[var(--cream)]">The bandhas: locks as a system</h1>
            </div>

            <div onContextMenu={(e) => e.preventDefault()} className="relative aspect-video rounded-[20px] overflow-hidden bg-black border border-[var(--bone)] select-none">
              <button onClick={() => setPlaying((p) => !p)} className="absolute inset-0 flex items-center justify-center" aria-label={playing ? "Pause" : "Play"}>
                <span className="h-16 w-16 rounded-full bg-[var(--gold)]/90 flex items-center justify-center text-[var(--night)]">
                  {playing ? <Pause /> : <Play />}
                </span>
              </button>
              <span className="absolute top-3 right-3 rounded-full bg-[var(--night)]/80 px-3 py-1 text-[11px] text-[var(--gold)]">{pct}% watched</span>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent space-y-2">
                <div className="flex gap-[2px] h-1.5">
                  {(course?.chapters ?? []).map((c, i, arr) => {
                    const end = arr[i + 1]?.t ?? TOTAL;
                    const fill = Math.max(0, Math.min(1, (t - c.t) / (end - c.t)));
                    return (
                      <button key={c.t} onClick={() => setT(c.t)} style={{ flex: end - c.t }} className="relative bg-white/20 rounded-full overflow-hidden" aria-label={c.label}>
                        <span className="absolute inset-y-0 left-0 bg-[var(--gold)]" style={{ width: `${fill * 100}%` }} />
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-[var(--cream)] tabular-nums">{fmtTime(t)} / {fmtTime(TOTAL)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="label-caps text-[var(--gold)]">Key ideas</p>
              <ol className="space-y-4">
                {ideas.map((x, i) => (
                  <li key={i} className="flex gap-5 border-b border-[var(--bone)] pb-4">
                    <span className="editorial-heading text-2xl text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[var(--cream)] leading-relaxed">{x}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <figure className="rounded-[20px] border border-[var(--bone)] bg-[var(--alt)] p-6 space-y-4">
                <p className="label-caps text-[var(--gold)]">The canister</p>
                <svg viewBox="0 0 300 220" className="w-full text-[var(--cream)]" fill="none" stroke="currentColor">
                  <rect x="90" y="40" width="120" height="140" rx="14" strokeOpacity=".5" />
                  <path d="M90 50 Q150 25 210 50" stroke="var(--gold)" strokeWidth="2" />
                  <path d="M90 172 Q150 195 210 172" stroke="var(--gold)" strokeWidth="2" />
                  {[[150, 110, 150, 70], [150, 110, 150, 150], [150, 110, 110, 110], [150, 110, 190, 110]].map(([a, b, c, d], i) => (
                    <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="var(--gold)" markerEnd="url(#arr)" />
                  ))}
                  <defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="var(--gold)" /></marker></defs>
                  <text x="150" y="114" textAnchor="middle" fontSize="11" fill="currentColor" stroke="none">IAP</text>
                  <g fontSize="9" fill="currentColor" stroke="none" opacity=".75">
                    <text x="150" y="18" textAnchor="middle">DIAPHRAGM — the lid</text>
                    <text x="215" y="112">DEEP CORE —</text><text x="215" y="124">the walls</text>
                    <text x="150" y="212" textAnchor="middle">PELVIC FLOOR — the base</text>
                  </g>
                </svg>
                <figcaption className="text-sm italic text-[var(--muted)]">Diaphragm on top, deep core as the walls, pelvic floor at the base. Pressure inside it lets load pass from the ground to the hands.</figcaption>
              </figure>
              <div className="rounded-[20px] border border-[var(--gold)]/40 bg-[var(--alt)] p-6 space-y-4">
                <p className="label-caps text-[var(--gold)]">Practice this week • Between classes</p>
                <h3 className="editorial-heading text-3xl text-[var(--cream)]">Mula bandha, gently</h3>
                <p className="text-sm text-[var(--gold)]">5 min, mornings, empty stomach</p>
                <p className="text-[var(--muted)] leading-relaxed">Seated, find the lightest lift at the base of the trunk. If the thighs or buttocks tighten, you are gripping too hard.</p>
              </div>
            </div>

            <div className="rounded-[20px] border border-[var(--bone)] bg-[var(--alt)] p-6 space-y-3">
              <div className="flex justify-between items-center">
                <p className="label-caps text-[var(--gold)]">My notes • {words} words</p>
                <button onClick={() => setNotes((n) => `[${fmtTime(t)}] ${n ? "\n" + n : ""}`.replace(/\n$/, ""))} className="rounded-full border border-[var(--gold)] px-4 py-1.5 label-caps text-[var(--gold)]">
                  Add {fmtTime(t)}
                </button>
              </div>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} maxLength={5000} placeholder="What did you notice? Where did you feel the work?"
                className="w-full rounded-xl bg-[var(--night)] border border-[var(--bone)] p-4 text-[var(--cream)] outline-none focus:border-[var(--gold)]" />
              <p className="text-xs text-[var(--muted)] italic">Notes save to your local browser storage for quick review.</p>
            </div>
          </div>

          <aside className="space-y-6">
            <ChapterList chapters={course?.chapters} current={t} resumeAt={RESUME} onSeek={(s) => setT(s)} />
            <div className="rounded-[20px] border border-[var(--bone)] bg-[var(--alt)] p-5">
              <div className="flex justify-between mb-4">
                <p className="label-caps text-[var(--gold)]">In this track</p>
                <p className="text-xs text-[var(--muted)]">{done}/{lessons.length} watched</p>
              </div>
              <ul className="space-y-3">
                {lessons.map((l) => (
                  <li key={l.title} className="flex items-center gap-3 text-sm">
                    {l.status === "done" ? <Check size={16} className="text-[var(--gold)]" /> : l.status === "progress" ? <CircleDashed size={16} className="text-[var(--gold)]" /> : <Circle size={16} className="text-[var(--muted)]" />}
                    <span className={`flex-1 ${l.status === "progress" ? "text-[var(--cream)]" : "text-[var(--muted)]"}`}>{l.title}</span>
                    <span className="text-xs text-[var(--muted)] tabular-nums">{l.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
