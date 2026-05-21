"use client";

import { useMemo } from "react";
import type { DisplayTestimonial } from "@/types/testimonial";
import {
  computeGlobalStats,
  formatRatingFr,
} from "@/lib/testimonial-ratings";

type TestimonialGlobalStatsProps = {
  testimonials: DisplayTestimonial[];
};

export default function TestimonialGlobalStats({
  testimonials,
}: TestimonialGlobalStatsProps) {
  const stats = useMemo(
    () => computeGlobalStats(testimonials),
    [testimonials]
  );

  return (
    <section className="bg-ink-900 py-24 text-white sm:py-32">
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Note globale</p>
            <p className="mt-6 font-display text-[12rem] leading-none text-rose-400 transition-all duration-500 sm:text-[14rem]">
              {formatRatingFr(stats.overall)}
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <h3 className="heading-section text-white">
              Chaque détail compte.
            </h3>
            <div className="mt-10 space-y-6">
              {stats.criteria.map((r) => (
                <div key={r.key}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-display text-xl text-white">
                      {r.label}
                    </span>
                    <span className="text-rose-400 transition-all duration-500">
                      {r.value.toFixed(1)}
                    </span>
                  </div>
                  <div className="mt-2 h-0.5 w-full overflow-hidden bg-white/10">
                    <div
                      className="h-full bg-rose-400 transition-all duration-500"
                      style={{ width: `${(r.value / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
