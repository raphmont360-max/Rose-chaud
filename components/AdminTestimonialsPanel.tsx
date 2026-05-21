"use client";

import { useCallback, useEffect, useState } from "react";
import type { SubmittedTestimonial } from "@/types/testimonial";
import TestimonialRatingBreakdown from "@/components/TestimonialRatingBreakdown";

const STORAGE_KEY = "rosechaud_admin_token";

export default function AdminTestimonialsPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<SubmittedTestimonial[]>([]);
  const [fetchError, setFetchError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? sessionStorage.getItem(STORAGE_KEY)
        : null;
    if (saved) setToken(saved);
  }, []);

  const loadItems = useCallback(async (authToken: string) => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/admin/testimonials", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) {
        if (res.status === 401) {
          sessionStorage.removeItem(STORAGE_KEY);
          setToken(null);
        }
        throw new Error("Impossible de charger les commentaires.");
      }
      const data = await res.json();
      setItems(data.testimonials ?? []);
    } catch {
      setFetchError("Erreur de chargement. Réessayez.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) loadItems(token);
  }, [token, loadItems]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error ?? "Mot de passe incorrect.");
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, password);
      setToken(password);
      setPassword("");
    } catch {
      setAuthError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!token) return;
    if (!confirm("Supprimer ce commentaire définitivement ?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Suppression impossible. Vérifiez votre connexion.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setItems([]);
  }

  if (!token) {
    return (
      <form
        onSubmit={handleLogin}
        className="mt-10 space-y-6 rounded-3xl border border-ink-900/10 bg-white p-8 sm:p-10"
      >
        <label className="block">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
            Mot de passe admin
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 block w-full border-0 border-b-2 border-ink-900/15 bg-transparent px-0 py-3 text-base text-ink-900 focus:border-ink-900 focus:outline-none focus:ring-0"
            required
          />
        </label>
        {authError && (
          <p className="text-sm text-rose-500">{authError}</p>
        )}
        <button type="submit" disabled={loading} className="btn-rose">
          {loading ? "Connexion…" : "Se connecter"}
          {!loading && <span aria-hidden>→</span>}
        </button>
      </form>
    );
  }

  return (
    <div className="mt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-400">
          {items.length} commentaire{items.length !== 1 ? "s" : ""} envoyé
          {items.length !== 1 ? "s" : ""} par les visiteurs
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="text-[11px] uppercase tracking-[0.22em] text-ink-400 transition hover:text-ink-900"
        >
          Déconnexion
        </button>
      </div>

      {loading && items.length === 0 && (
        <p className="text-sm text-ink-400">Chargement…</p>
      )}
      {fetchError && <p className="text-sm text-rose-500">{fetchError}</p>}

      {!loading && items.length === 0 && !fetchError && (
        <p className="rounded-3xl border border-ink-900/10 bg-white p-8 text-sm text-ink-400">
          Aucun commentaire visiteur pour le moment.
        </p>
      )}

      <ul className="space-y-4">
        {items.map((t) => (
          <li
            key={t.id}
            className="rounded-3xl border border-ink-900/10 bg-white p-6 sm:p-8"
          >
            <p className="font-display text-xl italic">« {t.short} »</p>
            <p className="mt-3 text-sm text-ink-400 line-clamp-3">{t.quote}</p>
            <p className="mt-4 font-display text-lg">{t.couple}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink-400">
              {t.date} · {t.place} · {t.rating.toFixed(1)}/5
            </p>
            <div className="mt-6">
              <TestimonialRatingBreakdown
                ratings={t.ratings}
                variant="light"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDelete(t.id)}
              disabled={deletingId === t.id}
              className="mt-6 text-[11px] font-medium uppercase tracking-[0.22em] text-rose-500 transition hover:text-ink-900 disabled:opacity-50"
            >
              {deletingId === t.id ? "Suppression…" : "Supprimer"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
