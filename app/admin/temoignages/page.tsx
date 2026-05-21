import type { Metadata } from "next";
import AdminTestimonialsPanel from "@/components/AdminTestimonialsPanel";

export const metadata: Metadata = {
  title: "Admin · Témoignages",
  robots: { index: false, follow: false },
};

export default function AdminTemoignagesPage() {
  return (
    <section className="min-h-screen bg-bone py-24 sm:py-32">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Administration</p>
        <h1 className="heading-section mt-4">Gérer les commentaires</h1>
        <p className="mt-4 text-sm text-ink-400">
          Les témoignages intégrés au site (Camille &amp; Antoine, etc.) ne
          peuvent pas être supprimés ici. Seuls les commentaires envoyés par les
          visiteurs apparaissent dans cette liste.
        </p>
        <AdminTestimonialsPanel />
      </div>
    </section>
  );
}
