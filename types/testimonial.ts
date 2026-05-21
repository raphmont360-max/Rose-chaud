import type { Testimonial } from "@/data/testimonials";

export type DisplayTestimonial = Testimonial & {
  id?: string;
};

export type SubmittedTestimonial = Testimonial & {
  id: string;
  createdAt: string;
};
