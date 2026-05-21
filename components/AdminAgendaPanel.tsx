"use client";

import { useCallback, useEffect, useState } from "react";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";

const STORAGE_KEY = "rosechaud_admin_token";

async function verifyPassword(password: string): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch("/api/admin/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok) return { ok: true };
  return { ok: false, error: data.error ?? "Mot de passe incorrect." };
}

async function fetchBookedDates(
  password: string
): Promise<{ ok: boolean; dates: string[]; error?: string }> {
  const res = await fetch("/api/admin/availability", {
    headers: { Authorization: `Bearer ${password}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return {
      ok: false,
      dates: [],
      error: data.error ?? "Impossible de charger l'agenda.",
    };
  }
  return { ok: true, dates: data.bookedDates ?? [] };
}

export default function AdminAgendaPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [fetchError, setFetchError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [togglingDate, setTogglingDate] = useState<string | null>(null);

  const establishSession = useCallback(async (pwd: string) => {
    const verify = await verifyPassword(pwd);
    if (!verify.ok) {
      sessionStorage.removeItem(STORAGE_KEY);
      return { ok: false as const, error: verify.error };
    }
    const agenda = await fetchBookedDates(pwd);
    if (!agenda.ok) {
      sessionStorage.removeItem(STORAGE_KEY);
      return { ok: false as const, error: agenda.error };
    }
    sessionStorage.setItem(STORAGE_KEY, pwd);
    setBookedDates(agenda.dates);
    setToken(pwd);
    setFetchError("");
    return { ok: true as const };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function restore() {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) {
        if (!cancelled) setCheckingSession(false);
        return;
      }
      const result = await establishSession(saved);
      if (!cancelled && !result.ok) {
        setAuthError(result.error ?? "Session expirée. Reconnectez-vous.");
      }
      if (!cancelled) setCheckingSession(false);
    }
    restore();
    return () => {
      cancelled = true;
    };
  }, [establishSession]);

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setBookedDates([]);
    setFetchError("");
    setSaveMessage("");
    setPassword("");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const pwd = password.trim();
    if (!pwd) {
      setAuthError("Entrez le mot de passe admin.");
      return;
    }

    setAuthError("");
    setLoading(true);
    try {
      const result = await establishSession(pwd);
      if (!result.ok) {
        setAuthError(
          result.error ??
            "Connexion refusée. Vérifiez le mot de passe dans .env.local (ADMIN_SECRET)."
        );
        return;
      }
      setPassword("");
    } catch {
      setAuthError(
        "Impossible de joindre le serveur. Ouvrez l'URL affichée dans le terminal (npm run dev) — souvent http://localhost:3000 ou :3001."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(date: string) {
    if (!token) return;
    setTogglingDate(date);
    setFetchError("");
    setSaveMessage("");
    try {
      const res = await fetch("/api/admin/availability", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        logout();
        setAuthError(
          "Session expirée. Reconnectez-vous avec le mot de passe du fichier .env.local."
        );
        return;
      }
      if (!res.ok) {
        setFetchError(data.error ?? "Erreur lors de la mise à jour.");
        return;
      }
      setBookedDates(data.bookedDates ?? []);
      setSaveMessage(
        "Date enregistrée. Vérifiez la page Tarifs (rafraîchir si besoin)."
      );
    } catch {
      setFetchError(
        "Impossible d'enregistrer. Vérifiez que npm run dev tourne."
      );
    } finally {
      setTogglingDate(null);
    }
  }

  if (checkingSession) {
    return (
      <p className="text-center text-sm text-ink-400">Vérification de la session…</p>
    );
  }

  if (!token) {
    return (
      <form
        onSubmit={handleLogin}
        className="mx-auto max-w-md rounded-3xl border border-ink-900/10 bg-bone p-8"
      >
        <p className="font-display text-xl text-ink-900">Agenda — admin</p>
        <p className="mt-2 text-sm text-ink-400">
          Cliquez sur une date pour la marquer en rouge (réservée) ou la libérer.
        </p>
        <label htmlFor="admin-password" className="mt-6 block text-sm text-ink-400">
          Mot de passe admin
          <input
            id="admin-password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-ink-900"
            autoComplete="current-password"
            disabled={loading}
          />
        </label>
        {authError && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-rose-500/30 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            {authError}
          </p>
        )}
        <button
          type="submit"
          disabled={loading || !password.trim()}
          className="btn-rose mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-400">
          Cliquez sur un jour pour le passer en{" "}
          <span className="font-medium text-rose-500">réservé</span> (rouge).
        </p>
        <button
          type="button"
          className="text-sm text-ink-400 underline hover:text-ink-900"
          onClick={logout}
        >
          Déconnexion
        </button>
      </div>
      {authError && (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-rose-500/30 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {authError}
        </p>
      )}
      {fetchError && (
        <p className="mb-4 rounded-xl border border-rose-500/30 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {fetchError}
        </p>
      )}
      {saveMessage && (
        <p className="mb-4 rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm text-ink-900">
          {saveMessage}
        </p>
      )}
      {bookedDates.length > 0 && (
        <p className="mb-4 text-sm text-ink-400">
          {bookedDates.length} date{bookedDates.length > 1 ? "s" : ""}{" "}
          marquée{bookedDates.length > 1 ? "s" : ""} en rouge.
        </p>
      )}
      <AvailabilityCalendar
        bookedDates={bookedDates}
        interactive
        onToggleDate={handleToggle}
        togglingDate={togglingDate}
      />
    </div>
  );
}
