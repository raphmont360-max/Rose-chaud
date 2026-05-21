import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TemoignagesPageContent from "@/components/TemoignagesPageContent";
import { getAllTestimonials } from "@/lib/testimonials-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Témoignages",
  description:
    "Découvrez ce que les mariés disent de Rose chaud — avis et témoignages authentiques.",
};

export default async function TemoignagesPage() {
  const testimonials = await getAllTestimonials();

  return (
    <>
      <PageHeader
        eyebrow="Ils nous ont fait confiance"
        title="Ils ont vu et témoigné."
        description="Après chaque prestation, ceux qui nous ont fait confiance ont pu s'exprimer et nous donner leur retour. Lisez par vous-mêmes."
      />

      <TemoignagesPageContent initialTestimonials={testimonials} />
    </>
  );
}
