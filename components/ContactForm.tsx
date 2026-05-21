"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const FORMULA_OPTIONS = [
  "Je ne sais pas encore",
  "Concert",
  "Signature",
  "Grand Bal",
  "Autre / sur-mesure",
] as const;

type ContactFormProps = {
  defaultFormula?: string;
};

export default function ContactForm({ defaultFormula }: ContactFormProps) {
  const initialFormula =
    defaultFormula &&
    FORMULA_OPTIONS.includes(
      defaultFormula as (typeof FORMULA_OPTIONS)[number]
    )
      ? defaultFormula
      : "";
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const nextErrors: Record<string, string> = {};
    if (!data.get("name")?.toString().trim()) {
      nextErrors.name = "Merci de renseigner votre nom.";
    }
    const email = data.get("email")?.toString().trim() ?? "";
    if (!email) {
      nextErrors.email = "Merci de renseigner votre email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Format d'email invalide.";
    }
    if (!data.get("date")?.toString().trim()) {
      nextErrors.date = "Indiquez la date envisagée.";
    }
    if (!data.get("message")?.toString().trim()) {
      nextErrors.message = "Dites-nous-en un peu plus !";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");

    // Simulation d'envoi — à brancher sur une API route ou un service tiers.
    await new Promise((r) => setTimeout(r, 900));

    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-ink-900 p-12 text-center text-white sm:p-16">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-400 text-ink-900">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mt-8 font-display text-4xl italic text-white sm:text-5xl">
          Message reçu.
        </h3>
        <p className="mx-auto mt-5 max-w-md text-white/70">
          Merci pour votre message. On revient vers vous sous 48 h avec une
          proposition personnalisée — préparez vos meilleurs morceaux !
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-white transition hover:border-rose-400 hover:bg-rose-400 hover:text-ink-900"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8 rounded-3xl border border-ink-900/10 bg-white p-8 sm:p-10"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Nom complet" name="name" error={errors.name} required />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="vous@exemple.fr"
          error={errors.email}
          required
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field
          label="Téléphone"
          name="phone"
          type="tel"
          placeholder="+33 6 ..."
        />
        <Field
          label="Date du mariage"
          name="date"
          type="date"
          error={errors.date}
          required
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Lieu / région" name="place" placeholder="Provence, Paris..." />
        <SelectField
          label="Formule envisagée"
          name="formula"
          options={[...FORMULA_OPTIONS]}
          defaultValue={initialFormula}
        />
      </div>

      <TextareaField
        label="Votre projet en quelques mots"
        name="message"
        placeholder="Parlez-nous de votre mariage : ambiance, nombre d'invités, titre coup de cœur..."
        error={errors.message}
        required
      />

      <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-ink-900/10 pt-8 sm:flex-row sm:items-center">
        <p className="text-xs text-ink-400">
          Vos informations restent strictement confidentielles.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-rose disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? "Envoi…" : "Envoyer ma demande"}
          {status !== "submitting" && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
};

function Field({ label, name, type = "text", placeholder, required, error }: FieldProps) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      <input
        type={type}
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

function SelectField({
  label,
  name,
  options,
  defaultValue = "",
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-3 block w-full cursor-pointer border-0 border-b-2 border-ink-900/15 bg-transparent px-0 py-3 text-base text-ink-900 transition focus:border-ink-900 focus:outline-none focus:ring-0"
      >
        <option value="" disabled>
          Sélectionner…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  required,
  error,
}: Omit<FieldProps, "type">) {
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
