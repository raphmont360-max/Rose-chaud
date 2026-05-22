import type { ReactNode } from "react";
import RoseGlowBackdrop from "@/components/RoseGlowBackdrop";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pt-24 pb-28 text-white sm:pt-32 sm:pb-36">
      <RoseGlowBackdrop />

      <div className="container-page relative z-10">
        <div className="flex items-center gap-4 animate-fade-in">
          <span className="rule-rose !w-16" />
          <p className="eyebrow">{eyebrow}</p>
        </div>
        <h1 className="heading-display mt-6 max-w-5xl text-white animate-fade-in-up">
          {title}
        </h1>
        {description && (
          <p
            className="lead mt-8 max-w-2xl !text-white/70 animate-fade-in-up"
            style={{ animationDelay: "120ms", opacity: 0 }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
