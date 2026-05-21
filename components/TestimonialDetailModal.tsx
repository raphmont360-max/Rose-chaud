"use client";

import { useEffect } from "react";
import type { DisplayTestimonial } from "@/types/testimonial";
import { starsFromRating } from "@/lib/testimonial-ratings";
import TestimonialRatingBreakdown from "@/components/TestimonialRatingBreakdown";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-rose-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

type TestimonialDetailModalProps = {
  testimonial: DisplayTestimonial;
  index: number;
  onClose: () => void;
};

export default function TestimonialDetailModal({
  testimonial,
  index,
  onClose,
}: TestimonialDetailModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-modal-title"
    >
      <button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-ink-900 p-8 text-white shadow-2xl sm:p-12">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-rose-400 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <span className="font-display text-6xl text-rose-400/80">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h2
          id="testimonial-modal-title"
          className="mt-6 font-display text-3xl italic leading-snug sm:text-4xl"
        >
          « {testimonial.short} »
        </h2>

        <p className="mt-6 text-base leading-relaxed text-white/85">
          {testimonial.quote}
        </p>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-8">
          <div>
            <p className="font-display text-2xl">{testimonial.couple}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/60">
              {testimonial.date} · {testimonial.place}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">
              Note globale
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="font-display text-3xl text-rose-400">
                {testimonial.rating.toFixed(1)}
              </span>
              <Stars count={starsFromRating(testimonial.rating)} />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="eyebrow !text-rose-400">Détail des notes</p>
          <div className="mt-8">
            <TestimonialRatingBreakdown
              ratings={testimonial.ratings}
              variant="dark"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
