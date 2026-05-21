"use client";

import { useState } from "react";
import type { DisplayTestimonial } from "@/types/testimonial";
import Section from "@/components/Section";
import TestimonialsSection from "@/components/TestimonialsSection";
import TestimonialGlobalStats from "@/components/TestimonialGlobalStats";

type TemoignagesPageContentProps = {
  initialTestimonials: DisplayTestimonial[];
};

export default function TemoignagesPageContent({
  initialTestimonials,
}: TemoignagesPageContentProps) {
  const [testimonials, setTestimonials] =
    useState<DisplayTestimonial[]>(initialTestimonials);

  return (
    <>
      <Section>
        <TestimonialsSection
          testimonials={testimonials}
          onTestimonialsChange={setTestimonials}
        />
      </Section>

      <TestimonialGlobalStats testimonials={testimonials} />
    </>
  );
}
