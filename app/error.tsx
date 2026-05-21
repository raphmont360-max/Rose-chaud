"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Erreur</p>
      <h1 className="heading-section mt-4">Un problème est survenu</h1>
      <p className="lead mt-4 max-w-md text-ink-400">
        Rechargez la page ou revenez à l&apos;accueil.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button type="button" onClick={reset} className="btn-rose">
          Réessayer
        </button>
        <Link href="/" className="btn-secondary">
          Accueil
        </Link>
      </div>
    </div>
  );
}
