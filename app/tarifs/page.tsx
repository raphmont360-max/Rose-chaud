import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import FormulesPricing from "@/components/FormulesPricing";
import TarifsAvailability from "@/components/TarifsAvailability";
import { getBookedDates } from "@/lib/availability-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Tarifs Rose chaud — formules Concert, Signature et Grand Bal pour vos mariages et événements.",
};

const liveColumns = ["2 h de live", "3 h de live", "4 h de live"] as const;
const livePrices = ["1 000 €", "1 350 €", "1 700 €"];

const songColumns = ["1 musique", "2 musiques", "3 musiques"] as const;
const songPrices = ["100 €", "125 €", "150 €"];

const includedServices = [
  "Sono + lumières",
  "Installation",
  "Set liste de base",
  "Déplacement jusqu'à 150 km",
];

function PriceCell({
  value,
  highlight,
}: {
  value: string;
  highlight?: boolean;
}) {
  return (
    <td className="px-4 py-5 text-center sm:px-6">
      <span
        className={`font-display text-xl sm:text-2xl ${
          highlight ? "text-rose-400" : "text-ink-900"
        }`}
      >
        {value}
      </span>
    </td>
  );
}

export default async function TarifsPage() {
  const bookedDates = await getBookedDates();

  return (
    <>
      <PageHeader
        eyebrow="Tarifs"
        title="Trois manières de tomber amoureux."
        description="Saxophone, piano, guitare, batterie et chanteuse(s) — tout est joué 100 % en live."
      />

      <Section
        variant="dark"
        eyebrow="Formules"
        title="Choisissez votre formule."
        description={
          <>
            Ces tarifs pour un groupe en live ? Nos concurrents pensent
            qu&apos;on est fous. Vos invités pensent qu&apos;on est géniaux.
            <br />
            <span className="mt-3 inline-block font-display text-xl italic text-rose-400 sm:text-2xl">
              #RoseChaud
            </span>
          </>
        }
      >
        <Suspense
          fallback={
            <div className="grid gap-6 md:grid-cols-3">
              {["Concert", "Signature", "Grand Bal"].map((name, i) => (
                <div
                  key={name}
                  className={`h-[480px] animate-pulse rounded-3xl ${
                    i === 1 ? "bg-white/20" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          }
        >
          <FormulesPricing onDark />
        </Suspense>
      </Section>

      <Section>
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow">Liste tarifaire</p>
          <h2 className="heading-section mt-4">Détail des options</h2>

          <div className="mt-12 overflow-x-auto rounded-3xl border border-ink-900/10">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink-900/10 bg-bone">
                  <th className="px-4 py-5 sm:px-6" />
                  {liveColumns.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-5 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-ink-400 sm:px-6"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-900/10">
                  <th className="px-4 py-5 text-left font-display text-xl text-ink-900 sm:px-6 sm:text-2xl">
                    Heures
                  </th>
                  {livePrices.map((price) => (
                    <PriceCell key={price} value={price} highlight />
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-14 overflow-x-auto rounded-3xl border border-ink-900/10">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink-900/10 bg-bone">
                  <th className="px-4 py-5 font-display text-lg italic text-ink-900 sm:px-6 sm:text-xl">
                    Chansons personnalisées
                  </th>
                  {songColumns.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-5 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-ink-400 sm:px-6"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="px-4 py-5 text-left text-sm text-ink-400 sm:px-6">
                    Tarif
                  </th>
                  {songPrices.map((price) => (
                    <PriceCell key={price} value={price} />
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-400">
            <span className="text-ink-900">Signature</span>&nbsp;: 1 chanson sur
            mesure incluse. <span className="text-ink-900">Grand Bal</span>
            &nbsp;: 2. En <span className="text-ink-900">Concert</span>, ou pour
            un titre en plus, c&apos;est le tableau ci-dessus qui s&apos;applique
            (à partir de{" "}
            <span className="font-medium text-rose-500">100 €</span> pour la
            première chanson personnalisée).
          </p>

          <div className="mt-14 overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-900 text-white">
            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <p className="font-display text-xl italic text-rose-400 sm:text-2xl">
                Services inclus de base
              </p>
              <p className="mt-2 text-sm text-white/60">
                Inclus dans chaque formule live
              </p>
            </div>
            <ul className="divide-y divide-white/10">
              {includedServices.map((service) => (
                <li
                  key={service}
                  className="flex items-center justify-between gap-6 px-6 py-4 sm:px-8"
                >
                  <span className="font-display text-lg text-white sm:text-xl">
                    {service}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-rose-400">
                    Inclus
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink-400">
            Tarifs indicatifs pour la Belgique et le nord de la France.
            Devis personnalisé sur demande selon le lieu et vos options.{" "}
            <span className="font-medium text-ink-900">
              Attention : les tarifs peuvent changer en fonction de demandes
              spécifiques.
            </span>
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Disponibilités"
        title="Notre agenda"
        description="Utilisez les flèches pour parcourir les mois. Les dates en rouge sont déjà réservées."
      >
        <TarifsAvailability initialBookedDates={bookedDates} />
      </Section>
    </>
  );
}
