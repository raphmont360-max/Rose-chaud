import { promises as fs } from "fs";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "data", "booked-dates.json");

const DATE_KEY_RE = /^\d{4}-\d{2}-\d{2}$/;

function normalizeDates(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return [...new Set(raw.filter((d): d is string => typeof d === "string" && DATE_KEY_RE.test(d)))].sort();
}

export async function getBookedDates(): Promise<string[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    return normalizeDates(JSON.parse(raw));
  } catch {
    return [];
  }
}

export async function setBookedDates(dates: string[]): Promise<void> {
  const normalized = normalizeDates(dates);
  await fs.writeFile(STORE_PATH, JSON.stringify(normalized, null, 2), "utf-8");
}

export async function toggleBookedDate(date: string): Promise<string[]> {
  if (!DATE_KEY_RE.test(date)) {
    throw new Error("Date invalide.");
  }
  const dates = await getBookedDates();
  const next = dates.includes(date)
    ? dates.filter((d) => d !== date)
    : [...dates, date];
  await setBookedDates(next);
  return next;
}
