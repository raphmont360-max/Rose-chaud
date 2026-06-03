import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Photos et vidéos live du groupe Rose chaud — bientôt disponibles.",
};

export default function GaleriePage() {
  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title={
          <>
            Rose Chaud en live.
            <br />
            Nos moments en image.
          </>
        }
      />

      <Section className="!py-20 sm:!py-28">
        <p className="font-display text-center text-3xl italic text-ink-900 sm:text-4xl md:text-5xl">
          Vidéos et photos à venir
        </p>
      </Section>
    </>
  );
}
