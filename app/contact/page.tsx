import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & devis",
  description:
    "Contactez Rose chaud pour votre mariage — devis personnalisé sous 48 h.",
};

const infos = [
  {
    label: "Email",
    value: "contact.rosechaud@gmail.com",
    href: "mailto:contact.rosechaud@gmail.com",
  },
  {
    label: "Téléphone (BE)",
    value: "+32 493 99 98 00",
    href: "tel:+32493999800",
  },
  {
    label: "Téléphone (FR)",
    value: "+33 6 58 21 03 71",
    href: "tel:+33658210371",
  },
  {
    label: "Zone",
    value: "Belgique · France · Europe",
  },
  {
    label: "Réponse",
    value: "Sous 48 h ouvrées",
  },
];

const FORMULES = ["Concert", "Signature", "Grand Bal"] as const;

function formuleFromSearch(
  value: string | string[] | undefined
): (typeof FORMULES)[number] | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  return FORMULES.includes(raw as (typeof FORMULES)[number])
    ? (raw as (typeof FORMULES)[number])
    : undefined;
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: { formule?: string | string[] };
}) {
  const defaultFormula = formuleFromSearch(searchParams.formule);

  return (
    <>
      <PageHeader
        eyebrow="Parlons de votre mariage · évènements"
        title="Demandez votre devis personnalisé."
        description="Dites-nous tout : la date, le lieu, l'ambiance rêvée. Réponse sur-mesure sous 48 h."
      />

      <section className="py-24 sm:py-32">
        <div className="container-page grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm defaultFormula={defaultFormula} />
          </div>

          <aside className="lg:col-span-5">
            <p className="eyebrow">Coordonnées directes</p>
            <h2 className="heading-section mt-5 !text-3xl sm:!text-4xl">
              À votre écoute.
            </h2>

            <ul className="mt-12 divide-y divide-ink-900/10 border-y border-ink-900/10">
              {infos.map((info) => (
                <li
                  key={info.label}
                  className="flex items-center justify-between gap-4 py-5"
                >
                  <span className="text-[11px] uppercase tracking-[0.22em] text-ink-400">
                    {info.label}
                  </span>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="font-display text-lg text-ink-900 transition hover:text-rose-500 sm:text-xl"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="font-display text-lg text-ink-900 sm:text-xl">
                      {info.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-3xl bg-rose-400 p-8">
              <p className="font-display text-2xl italic text-ink-900">
                « Hâte de se voir et de rendre ensemble cette cérémonie
                inoubliable. »
              </p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-ink-900/70">
                - rose chaud
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
