export type TestimonialRatings = {
  musicalQuality: number;
  reliability: number;
  ambiance: number;
  valueForMoney: number;
};

export const RATING_CRITERIA: {
  key: keyof TestimonialRatings;
  label: string;
}[] = [
  { key: "musicalQuality", label: "Qualité musicale" },
  { key: "reliability", label: "Fiabilité" },
  { key: "ambiance", label: "Ambiance" },
  { key: "valueForMoney", label: "Rapport qualité-prix" },
];

export const DEFAULT_RATINGS: TestimonialRatings = {
  musicalQuality: 5,
  reliability: 5,
  ambiance: 5,
  valueForMoney: 5,
};

export type GlobalRatingStats = {
  overall: number;
  criteria: { key: keyof TestimonialRatings; label: string; value: number }[];
  count: number;
};

/** Moyennes calculées à partir de tous les témoignages */
export function computeGlobalStats(
  testimonials: { ratings: TestimonialRatings }[]
): GlobalRatingStats {
  if (testimonials.length === 0) {
    return {
      overall: 5,
      count: 0,
      criteria: RATING_CRITERIA.map((c) => ({ ...c, value: 5 })),
    };
  }

  const criteria = RATING_CRITERIA.map((c) => {
    const sum = testimonials.reduce((acc, t) => acc + t.ratings[c.key], 0);
    const value = Math.round((sum / testimonials.length) * 10) / 10;
    return { key: c.key, label: c.label, value };
  });

  const overall =
    Math.round(
      (criteria.reduce((acc, c) => acc + c.value, 0) / criteria.length) * 10
    ) / 10;

  return { overall, criteria, count: testimonials.length };
}

export function formatRatingFr(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

export function averageRating(ratings: TestimonialRatings): number {
  const values = RATING_CRITERIA.map((c) => ratings[c.key]);
  const sum = values.reduce((a, b) => a + b, 0);
  return Math.round((sum / values.length) * 10) / 10;
}

export function starsFromRating(rating: number): number {
  return Math.min(5, Math.max(0, Math.round(rating)));
}

function clampRating(n: number): number {
  if (!Number.isFinite(n)) return 5;
  return Math.min(5, Math.max(1, Math.round(n)));
}

export function normalizeRatings(
  input?: Partial<TestimonialRatings> | null,
  fallbackOverall = 5
): TestimonialRatings {
  if (input && typeof input === "object") {
    return {
      musicalQuality: clampRating(
        input.musicalQuality ?? fallbackOverall
      ),
      reliability: clampRating(input.reliability ?? fallbackOverall),
      ambiance: clampRating(input.ambiance ?? fallbackOverall),
      valueForMoney: clampRating(input.valueForMoney ?? fallbackOverall),
    };
  }
  const r = clampRating(fallbackOverall);
  return {
    musicalQuality: r,
    reliability: r,
    ambiance: r,
    valueForMoney: r,
  };
}

export function parseRatingsFromBody(body: unknown): TestimonialRatings | null {
  if (!body || typeof body !== "object") return null;
  const r = body as Record<string, unknown>;
  const hasAll = RATING_CRITERIA.every((c) => c.key in r);
  if (!hasAll) return null;

  const ratings = {
    musicalQuality: Number(r.musicalQuality),
    reliability: Number(r.reliability),
    ambiance: Number(r.ambiance),
    valueForMoney: Number(r.valueForMoney),
  };

  const valid = RATING_CRITERIA.every(
    (c) =>
      Number.isFinite(ratings[c.key]) &&
      ratings[c.key] >= 1 &&
      ratings[c.key] <= 5
  );
  return valid ? normalizeRatings(ratings) : null;
}
