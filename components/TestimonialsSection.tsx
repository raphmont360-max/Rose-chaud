"use client";

import { useRef, useState, type FormEvent } from "react";
import type { DisplayTestimonial } from "@/types/testimonial";
import {
  DEFAULT_RATINGS,
  RATING_CRITERIA,
  type TestimonialRatings,
} from "@/lib/testimonial-ratings";
import { starsFromRating } from "@/lib/testimonial-ratings";
import TestimonialDetailModal from "@/components/TestimonialDetailModal";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-rose-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
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

function CriteriaStarPicker({
  ratings,
  onChange,
  error,
}: {
  ratings: TestimonialRatings;
  onChange: (next: TestimonialRatings) => void;
  error?: string;
}) {
  return (
    <div className="space-y-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
        Vos notes <span className="text-rose-500">*</span>
      </p>
      {RATING_CRITERIA.map((c) => (
        <div key={c.key}>
          <span className="font-display text-lg text-ink-900">{c.label}</span>
          <div className="mt-2 flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() =>
                    onChange({ ...ratings, [c.key]: n })
                  }
                  aria-label={`${c.label} : ${n} sur 5`}
                  className="text-rose-400 transition hover:scale-110"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={n <= ratings[c.key] ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {error && (
        <span className="block text-xs text-rose-500">{error}</span>
      )}
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
};

function Field({ label, name, placeholder, required, error }: FieldProps) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`mt-3 block w-full border-0 border-b-2 bg-transparent px-0 py-3 text-base text-ink-900 placeholder:text-ink-200 transition focus:outline-none focus:ring-0 ${
          error
            ? "border-rose-500"
            : "border-ink-900/15 focus:border-ink-900"
        }`}
      />
      {error && (
        <span className="mt-2 block text-xs text-rose-500">{error}</span>
      )}
    </label>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  required,
  error,
}: FieldProps) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={5}
        aria-invalid={!!error}
        className={`mt-3 block w-full resize-none border-0 border-b-2 bg-transparent px-0 py-3 text-base text-ink-900 placeholder:text-ink-200 transition focus:outline-none focus:ring-0 ${
          error
            ? "border-rose-500"
            : "border-ink-900/15 focus:border-ink-900"
        }`}
      />
      {error && (
        <span className="mt-2 block text-xs text-rose-500">{error}</span>
      )}
    </label>
  );
}

type TestimonialsSectionProps = {
  testimonials: DisplayTestimonial[];
  onTestimonialsChange: (testimonials: DisplayTestimonial[]) => void;
};

export default function TestimonialsSection({
  testimonials,
  onTestimonialsChange,
}: TestimonialsSectionProps) {
  const [selected, setSelected] = useState<{
    t: DisplayTestimonial;
    index: number;
  } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formRatings, setFormRatings] =
    useState<TestimonialRatings>(DEFAULT_RATINGS);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  function openForm() {
    setShowForm(true);
    setFormSuccess(false);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const nextErrors: Record<string, string> = {};
    const couple = data.get("couple")?.toString().trim() ?? "";
    const date = data.get("date")?.toString().trim() ?? "";
    const place = data.get("place")?.toString().trim() ?? "";
    const short = data.get("short")?.toString().trim() ?? "";
    const quote = data.get("quote")?.toString().trim() ?? "";

    if (!couple) nextErrors.couple = "Indiquez vos prénoms.";
    if (!date) nextErrors.date = "Indiquez la date de l'événement.";
    if (!place) nextErrors.place = "Indiquez le lieu.";
    if (!short) nextErrors.short = "Ajoutez une phrase courte.";
    if (!quote) nextErrors.quote = "Racontez votre expérience.";
    if (RATING_CRITERIA.some((c) => formRatings[c.key] < 1)) {
      nextErrors.ratings = "Notez les 4 critères.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couple,
          date,
          place,
          short,
          quote,
          ratings: formRatings,
        }),
      });
      const payload = await res.json();
      if (!res.ok) {
        setErrors({ quote: payload.error ?? "Envoi impossible. Réessayez." });
        return;
      }
      const saved = payload.testimonial;
      onTestimonialsChange([...testimonials, saved]);
      setFormSuccess(true);
      form.reset();
      setFormRatings(DEFAULT_RATINGS);
    } catch {
      setErrors({ quote: "Erreur réseau. Vérifiez votre connexion." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <article
            key={t.id ?? `${t.couple}-${i}`}
            role="button"
            tabIndex={0}
            onClick={() => setSelected({ t, index: i })}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelected({ t, index: i });
              }
            }}
            className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-ink-900/10 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-ink-900 hover:bg-ink-900 hover:text-white sm:p-10 ${
              i % 5 === 0 ? "md:row-span-1" : ""
            }`}
          >
            <span className="font-display text-5xl text-ink-100 transition-colors group-hover:text-rose-400">
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-6 font-display text-2xl italic leading-snug sm:text-3xl">
              « {t.short} »
            </h3>

            <p className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed text-ink-400 transition-colors group-hover:text-white/70">
              {t.quote}
            </p>

            <div className="mt-8 flex items-end justify-between border-t border-current/10 pt-5 transition-colors">
              <div>
                <p className="font-display text-lg leading-tight">{t.couple}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink-400 transition-colors group-hover:text-white/60">
                  {t.date} · {t.place}
                </p>
              </div>
              <Stars count={starsFromRating(t.rating)} />
            </div>

            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-ink-300 opacity-0 transition-opacity group-hover:text-white/50 group-hover:opacity-100">
              Cliquer pour voir le détail
            </p>
          </article>
        ))}
      </div>

      {selected && (
        <TestimonialDetailModal
          testimonial={selected.t}
          index={selected.index}
          onClose={() => setSelected(null)}
        />
      )}

      <div className="mt-14 flex justify-center">
        <button
          type="button"
          onClick={() => (showForm ? setShowForm(false) : openForm())}
          className="btn-secondary"
        >
          {showForm ? "Fermer le formulaire" : "Ajouter un commentaire"}
          <span aria-hidden>{showForm ? "↑" : "+"}</span>
        </button>
      </div>

      {showForm && (
        <div ref={formRef} className="mt-12 scroll-mt-28">
          {formSuccess ? (
            <div className="rounded-3xl border border-ink-900/10 bg-bone p-10 text-center sm:p-14">
              <p className="font-display text-3xl italic text-ink-900 sm:text-4xl">
                Merci pour votre témoignage.
              </p>
              <p className="mx-auto mt-4 max-w-md text-sm text-ink-400">
                Votre commentaire est en ligne. Cliquez dessus pour voir vos
                notes en détail.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSuccess(false);
                  setShowForm(false);
                }}
                className="btn-rose mt-8"
              >
                Fermer <span aria-hidden>→</span>
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-8 rounded-3xl border border-ink-900/10 bg-white p-8 sm:p-10"
            >
              <div>
                <p className="eyebrow">Votre avis</p>
                <h3 className="heading-section mt-3 text-balance">
                  Partagez votre expérience
                </h3>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <Field
                  label="Prénoms"
                  name="couple"
                  placeholder="Camille & Antoine"
                  required
                  error={errors.couple}
                />
                <Field
                  label="Date de l'événement"
                  name="date"
                  placeholder="Juin 2024"
                  required
                  error={errors.date}
                />
              </div>

              <Field
                label="Lieu"
                name="place"
                placeholder="Domaine de Roussas"
                required
                error={errors.place}
              />

              <Field
                label="Phrase courte"
                name="short"
                placeholder="Magique, simplement magique."
                required
                error={errors.short}
              />

              <TextareaField
                label="Témoignage complet"
                name="quote"
                placeholder="Racontez ce que vous avez vécu avec Rose chaud…"
                required
                error={errors.quote}
              />

              <CriteriaStarPicker
                ratings={formRatings}
                onChange={setFormRatings}
                error={errors.ratings}
              />

              <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-ink-900/10 pt-8 sm:flex-row sm:items-center">
                <p className="text-xs text-ink-400">
                  En publiant, vous acceptez que votre avis soit affiché sur
                  cette page.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-rose disabled:cursor-wait disabled:opacity-70"
                >
                  {submitting ? "Envoi…" : "Publier mon commentaire"}
                  {!submitting && <span aria-hidden>→</span>}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

    </>
  );
}
