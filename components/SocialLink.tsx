"use client";

import type { MouseEvent } from "react";

type SocialLinkProps = {
  label: string;
  webUrl: string;
  /**
   * URL "deep link" qui ouvre directement l'app si elle est installée
   * (uniquement utilisée sur mobile). Ex: instagram://user?username=xxx
   */
  appUrl?: string;
  className?: string;
};

const isMobile = () => {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export default function SocialLink({
  label,
  webUrl,
  appUrl,
  className = "",
}: SocialLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!appUrl || !isMobile()) return; // bureau → comportement normal du <a>

    e.preventDefault();

    // On tente d'ouvrir l'app via le deep link.
    // Si l'app n'est pas installée, le navigateur reste sur la page,
    // et le setTimeout nous renvoie automatiquement vers le site web.
    const start = Date.now();
    window.location.href = appUrl;

    setTimeout(() => {
      // Si on est toujours là après 1.2s, l'app n'a pas pris le relais.
      if (Date.now() - start < 1500) {
        window.location.href = webUrl;
      }
    }, 1200);
  }

  return (
    <a
      href={webUrl}
      target="_blank"
      rel="noreferrer noopener"
      onClick={handleClick}
      className={className}
    >
      {label}
    </a>
  );
}
