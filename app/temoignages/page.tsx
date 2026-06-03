import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Témoignages",
  description:
    "Découvrez ce que les mariés disent de Rose chaud — témoignages bientôt disponibles.",
};

export default function TemoignagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ils nous ont fait confiance"
        title="Ils ont vu et témoigné."
      />

      <Section className="!py-20 sm:!py-28">
        <p className="font-display text-center text-3xl italic text-ink-900 sm:text-4xl md:text-5xl">
          Témoignages à venir
        </p>
      </Section>
    </>
  );
}
