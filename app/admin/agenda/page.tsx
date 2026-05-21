import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import AdminAgendaPanel from "@/components/AdminAgendaPanel";

export const metadata: Metadata = {
  title: "Admin — Agenda",
  robots: { index: false, follow: false },
};

export default function AdminAgendaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Agenda des disponibilités"
        description="Page réservée à l'équipe. Connectez-vous, cliquez sur un jour : il devient rouge. Les visiteurs voient le résultat sur Tarifs (pas modifiable depuis là)."
      />
      <Section>
        <AdminAgendaPanel />
      </Section>
    </>
  );
}
