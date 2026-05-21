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

const faqs = [
  {
    q: "Combien de temps à l'avance faut-il réserver ?",
    a: "Nous conseillons de réserver 8 à 12 mois à l'avance, surtout pour les samedis de mai à septembre. Mais n'hésitez jamais à nous écrire — il arrive qu'on ait une date libre de dernière minute.",
  },
  {
    q: "Vos déplacements sont-ils inclus ?",
    a: "Nous intervenons en Belgique, en France et partout en Europe. Les frais de déplacement et d'hébergement éventuels sont chiffrés en transparence dans le devis selon le lieu.",
  },
  {
    q: "Peut-on vous voir en live avant de réserver ?",
    a: "Avec plaisir ! Nous organisons régulièrement des showcases ouverts aux futurs mariés. Demandez-nous les dates par mail.",
  },
  {
    q: "Que se passe-t-il en cas de pluie ?",
    a: "Notre matériel est adapté aux extérieurs. En cas d'intempéries, on s'adapte avec vous : repli sous chapiteau, décalage horaire... la souplesse fait partie de notre ADN.",
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

      <section className="bg-bone py-24 sm:py-32">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">FAQ</p>
            <h2 className="heading-display mt-5 text-balance">
              Ce qu&apos;on nous demande{" "}
              <span className="italic font-normal text-rose-500">souvent</span>.
            </h2>
          </div>

          <div className="mt-16 divide-y divide-ink-900/10 border-y border-ink-900/10">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group py-6 transition-colors"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <span className="font-display text-2xl text-ink-200 transition-colors group-open:text-rose-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl text-ink-900 transition-colors sm:text-3xl">
                      {item.q}
                    </span>
                  </div>
                  <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-ink-900/15 text-ink-900 transition-all group-open:rotate-45 group-open:border-rose-400 group-open:bg-rose-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-5 max-w-3xl pl-16 text-base leading-relaxed text-ink-400">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
