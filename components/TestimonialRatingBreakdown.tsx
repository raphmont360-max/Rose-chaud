import type { TestimonialRatings } from "@/lib/testimonial-ratings";
import { RATING_CRITERIA } from "@/lib/testimonial-ratings";

type TestimonialRatingBreakdownProps = {
  ratings: TestimonialRatings;
  variant?: "light" | "dark";
};

export default function TestimonialRatingBreakdown({
  ratings,
  variant = "dark",
}: TestimonialRatingBreakdownProps) {
  const dark = variant === "dark";

  return (
    <div className="space-y-6">
      {RATING_CRITERIA.map((c) => {
        const value = ratings[c.key];
        return (
          <div key={c.key}>
            <div className="flex items-center justify-between text-sm">
              <span
                className={`font-display text-xl ${
                  dark ? "text-white" : "text-ink-900"
                }`}
              >
                {c.label}
              </span>
              <span className="text-rose-400">{value.toFixed(1)}</span>
            </div>
            <div
              className={`mt-2 h-0.5 w-full overflow-hidden ${
                dark ? "bg-white/10" : "bg-ink-900/10"
              }`}
            >
              <div
                className="h-full bg-rose-400 transition-all"
                style={{ width: `${(value / 5) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
