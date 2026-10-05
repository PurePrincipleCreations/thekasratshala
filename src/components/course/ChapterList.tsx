import type { Chapter } from "@/data/coursesData";
import { fmtTime } from "@/data/coursesData";

export default function ChapterList({
  chapters = [],
  current,
  resumeAt,
  onSeek,
}: {
  chapters?: Chapter[];
  current: number;
  resumeAt: number;
  onSeek: (t: number) => void;
}) {
  const list = chapters ?? [];
  const resumeIdx = list.reduce((acc, c, i) => (c.t <= resumeAt ? i : acc), -1);
  const activeIdx = list.reduce((acc, c, i) => (c.t <= current ? i : acc), 0);
  return (
    <div className="rounded-[20px] border border-[var(--bone)] bg-[var(--alt)] p-5">
      <p className="label-caps text-[var(--gold)] mb-4">Chapters • {list.length} chapters</p>
      <ul className="space-y-1">
        {list.map((c, i) => (
          <li key={c.t}>
            <button
              onClick={() => onSeek(c.t)}
              className={`w-full flex gap-4 text-left rounded-lg px-3 py-2 transition-colors ${
                i === activeIdx ? "bg-[var(--night)] text-[var(--cream)]" : "text-[var(--muted)] hover:text-[var(--cream)]"
              }`}
            >
              <span className="text-[var(--gold)] tabular-nums w-14 shrink-0">{fmtTime(c.t)}</span>
              <span className="text-sm">{c.label}</span>
            </button>
            {i === resumeIdx && resumeAt > 0 && (
              <button
                onClick={() => onSeek(resumeAt)}
                className="ml-3 my-1 w-[calc(100%-0.75rem)] text-left rounded-md bg-[var(--gold)]/15 border border-[var(--gold)]/40 px-3 py-1.5 label-caps text-[var(--gold)]"
              >
                ■ You stopped here · {fmtTime(resumeAt)}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
