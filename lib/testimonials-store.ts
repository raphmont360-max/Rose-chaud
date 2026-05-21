import { promises as fs } from "fs";
import path from "path";
import type { Testimonial } from "@/data/testimonials";
import { initialTestimonials } from "@/data/testimonials";
import {
  averageRating,
  normalizeRatings,
} from "@/lib/testimonial-ratings";
import type {
  DisplayTestimonial,
  SubmittedTestimonial,
} from "@/types/testimonial";

export type { DisplayTestimonial, SubmittedTestimonial };

const STORE_PATH = path.join(
  process.cwd(),
  "data",
  "submitted-testimonials.json"
);

function normalizeTestimonial(
  raw: SubmittedTestimonial & { ratings?: Testimonial["ratings"] }
): SubmittedTestimonial {
  const ratings = normalizeRatings(raw.ratings, raw.rating ?? 5);
  const rating = averageRating(ratings);
  return { ...raw, ratings, rating };
}

async function readSubmitted(): Promise<SubmittedTestimonial[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as SubmittedTestimonial[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeTestimonial);
  } catch {
    return [];
  }
}

async function writeSubmitted(items: SubmittedTestimonial[]) {
  await fs.writeFile(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export async function getAllTestimonials(): Promise<DisplayTestimonial[]> {
  const submitted = await readSubmitted();
  return [
    ...initialTestimonials.map((t) => ({ ...t })),
    ...submitted.map(({ id, createdAt: _c, ...t }) => ({ ...t, id })),
  ];
}

export async function addTestimonial(
  data: Omit<Testimonial, "rating"> & { rating?: number }
): Promise<SubmittedTestimonial> {
  const submitted = await readSubmitted();
  const ratings = normalizeRatings(data.ratings, data.rating ?? 5);
  const entry: SubmittedTestimonial = {
    ...data,
    ratings,
    rating: averageRating(ratings),
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  submitted.push(entry);
  await writeSubmitted(submitted);
  return entry;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const submitted = await readSubmitted();
  const next = submitted.filter((t) => t.id !== id);
  if (next.length === submitted.length) return false;
  await writeSubmitted(next);
  return true;
}

export async function listSubmitted(): Promise<SubmittedTestimonial[]> {
  return readSubmitted();
}

export function checkAdminSecret(provided: string | null): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !provided) return false;
  return provided === secret;
}
