import { useEffect, useMemo, useState } from "react";
import { Circle, Play } from "lucide-react";
import { liveBatches, toMin } from "@/data/coursesData";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function useNowMinutes() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function LiveTimetable() {
  const now = useNowMinutes();
  const week = useMemo(() => {
    const base = now ?? new Date(2026, 9, 5);
    const monday = new Date(base);
    monday.setDate(base.getDate() - ((base.getDay() + 6) % 7));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, [now?.toDateString()]);
  const [sel, setSel] = useState<number | null>(null);
  const todayIdx = now ? (now.getDay() + 6) % 7 : 0;
  const active = sel ?? todayIdx;
  const isToday = active === todayIdx;
  const isPastDay = active < todayIdx;
  const nowMin = now ? now.getHours() * 60 + now.getMinutes() : 0;

  const sessions = (liveBatches ?? [])
    .flatMap((b) => (b?.times ?? []).map((t) => ({ ...b, start: t.start })))
    .sort((a, b) => toMin(a.start) - toMin(b.start));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {week.map((d, i) => (
          <button
            key={i}
            onClick={() => setSel(i)}
            className={`shrink-0 rounded-full px-5 py-2.5 label-caps border transition-all ${
              i === active
                ? "bg-[var(--gold)] text-[var(--night)] border-[var(--gold)]"
                : "border-[var(--bone)] text-[var(--muted)] hover:text-[var(--cream)]"
            }`}
          >
            {DAYS[d.getDay()]} {d.getDate()}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sessions.map((s) => {
          const st = toMin(s.start);
          const end = st + (s.durationMin || 60);
          const past = isPastDay || (isToday && nowMin >= end);
          const live = isToday && nowMin >= st && nowMin < end;
          const elapsed = Math.max(0, nowMin - st);
          return (
            <div
              key={s.id + s.start}
              className={`rounded-[20px] border p-5 md:p-6 transition-colors ${
                live ? "border-[var(--gold)] bg-[var(--gold)]/5" : "border-[var(--bone)] bg-[var(--alt)]"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <span className="editorial-heading text-2xl text-[var(--cream)] w-16">{s.start}</span>
                  <div>
                    <p className="text-[var(--cream)]">{s.title}</p>
                    <p className="text-xs text-[var(--muted)] italic">{s.instructor}</p>
                  </div>
                </div>
                {live ? (
                  <span className="label-caps text-[var(--gold)] flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse" /> Live now
                  </span>
                ) : past ? (
                  <span className="label-caps text-[var(--muted)] flex items-center gap-2"><Play size={12} /> Recording</span>
                ) : (
                  <span className="label-caps text-[var(--muted)] flex items-center gap-2"><Circle size={12} /> Upcoming</span>
                )}
              </div>
              {live && (
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-xs text-[var(--muted)] mb-2">Started {s.start} • {elapsed} of {s.durationMin} min</p>
                    <div className="h-1 rounded-full bg-[var(--bone)] overflow-hidden">
                      <div className="h-full bg-[var(--gold)]" style={{ width: `${(elapsed / s.durationMin) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <p className="label-caps text-[var(--gold)] mb-2">Bring</p>
                    <p className="text-sm text-[var(--cream)]">/ A stick or a long umbrella</p>
                    <p className="text-sm text-[var(--cream)]">/ A rice-filled bottle as a weight</p>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <button className="rounded-full bg-[var(--gold)] px-5 py-2.5 label-caps text-[var(--night)]">Join class</button>
                    <button className="rounded-full border border-[var(--bone)] px-5 py-2.5 label-caps text-[var(--cream)]">Class details</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
