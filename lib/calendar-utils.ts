const MONTH_LABELS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
] as const;

const WEEKDAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] as const;

export { MONTH_LABELS, WEEKDAY_LABELS };

export function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseDateKey(key: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]) - 1;
  const d = Number(match[3]);
  const date = new Date(y, m, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m ||
    date.getDate() !== d
  ) {
    return null;
  }
  return date;
}

/** Lundi = 0 … dimanche = 6 */
export function mondayBasedWeekday(date: Date): number {
  return (date.getDay() + 6) % 7;
}

export type CalendarDay = {
  key: string;
  day: number;
  inMonth: boolean;
};

export function buildMonthGrid(year: number, month: number): CalendarDay[] {
  const first = new Date(year, month, 1);
  const startOffset = mondayBasedWeekday(first);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: CalendarDay[] = [];

  for (let i = 0; i < startOffset; i++) {
    const prev = new Date(year, month, -startOffset + i + 1);
    cells.push({
      key: toDateKey(prev.getFullYear(), prev.getMonth(), prev.getDate()),
      day: prev.getDate(),
      inMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      key: toDateKey(year, month, d),
      day: d,
      inMonth: true,
    });
  }

  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1];
    const lastDate = parseDateKey(last.key);
    if (!lastDate) break;
    const next = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth(),
      lastDate.getDate() + 1
    );
    cells.push({
      key: toDateKey(next.getFullYear(), next.getMonth(), next.getDate()),
      day: next.getDate(),
      inMonth: false,
    });
  }

  return cells;
}

export function monthRangeFrom(
  start: Date,
  count: number
): { year: number; month: number; label: string }[] {
  const out: { year: number; month: number; label: string }[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    out.push({
      year: d.getFullYear(),
      month: d.getMonth(),
      label: `${MONTH_LABELS[d.getMonth()]} ${d.getFullYear()}`,
    });
  }
  return out;
}

export function todayKey(): string {
  const now = new Date();
  return toDateKey(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isPastDateKey(key: string, today: string): boolean {
  return key < today;
}
