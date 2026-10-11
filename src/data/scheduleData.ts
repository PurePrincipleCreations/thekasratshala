export type ClassStatus = "Open" | "Waitlist" | "Full";
export type ScheduleClass = {
  id: number;
  type: string;
  timeSlot: "Morning" | "Evening";
  days: string;
  time: string;
  status: ClassStatus;
};

// Mock schema — swap for a database query later; the UI consumes this exact shape.
export const mockSchedule: ScheduleClass[] = [
  { id: 1, type: "Kinetic Conditioning", timeSlot: "Morning", days: "Mon/Wed/Fri", time: "06:30 AM", status: "Open" },
  { id: 2, type: "Steel Mace Flow", timeSlot: "Evening", days: "Tue/Thu/Sat", time: "06:00 PM", status: "Waitlist" },
  { id: 3, type: "Yoga Kali", timeSlot: "Morning", days: "Mon/Wed/Fri", time: "08:00 AM", status: "Open" },
  { id: 4, type: "Sunday Workshop", timeSlot: "Morning", days: "Sun", time: "09:00 AM", status: "Open" },
];

export type Filters = { time: string; days: string; cls: string };

export function filterSchedule(list: ScheduleClass[], f: Filters) {
  return (list ?? []).filter(
    (c) =>
      (f.time === "All" || c.timeSlot === f.time) &&
      (f.days === "All" || c.days === (f.days === "Sunday" ? "Sun" : f.days)) &&
      (f.cls === "All" || c.type === f.cls),
  );
}
