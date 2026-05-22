# Rose chaud · Site officiel

Site vitrine du groupe de musique **Rose chaud**, spécialisé dans l'animation
musicale de mariages et événements.

> Du frisson de la cérémonie au dernier rappel à 3 h du matin — 100 % live,
> 100 % sur-mesure.

---

## Stack technique

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** (palette personnalisée, polices Google : Cormorant Garamond + Inter)
- Aucune dépendance UI lourde — tout est codé à la main pour rester léger et personnalisable.

---

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de dev (http://localhost:3000)
npm run dev

# 3. Build de production
npm run build && npm start
```

---

## Structure du projet

```
app/
  ├─ layout.tsx          # Layout global + métadonnées SEO
  ├─ page.tsx            # Page d'accueil (Hero, formules, CTA)
  ├─ globals.css         # Styles globaux + classes utilitaires Tailwind
  ├─ repertoire/         # Page Répertoire (catégorisé par moment)
  ├─ galerie/            # Page Galerie (photos + vidéos)
  ├─ temoignages/        # Page Témoignages clients
  └─ contact/            # Page Contact avec formulaire de devis

components/
  ├─ Navbar.tsx          # Navigation sticky avec menu mobile
  ├─ Footer.tsx          # Pied de page (contact + réseaux sociaux)
  ├─ Logo.tsx            # Logo textuel (variantes claire/foncée)
  ├─ Section.tsx         # Wrapper de section avec titres/eyebrow
  ├─ PageHeader.tsx      # En-tête de page interne
  └─ ContactForm.tsx     # Formulaire de devis (client, validé)

tailwind.config.ts       # Palette + polices + animations
next.config.js
tsconfig.json
```

---

## Personnalisation rapide

| Pour modifier...           | Fichier                                         |
| -------------------------- | ----------------------------------------------- |
| Couleurs (rose, gold, ink) | `tailwind.config.ts`                            |
| Polices                    | `app/layout.tsx`                                |
| Coordonnées de contact     | `components/Footer.tsx` + `app/contact/page.tsx` |
| Liste des titres           | `app/repertoire/page.tsx`                       |
| Témoignages                | `app/temoignages/page.tsx`                      |
| Formules / tarifs          | `app/page.tsx` (section "Formules")             |

---

## Étapes suivantes suggérées

- [ ] Remplacer les visuels placeholders par les vraies photos du groupe (dossier `public/`)
- [ ] Brancher le formulaire de contact sur une API route Next.js + service email (Resend, Postmark…)
- [ ] Ajouter une page "Bio / Le groupe" présentant chaque musicien
- [ ] Intégrer un lecteur audio (extraits SoundCloud / Spotify)
- [ ] Mettre en place un sitemap.xml et un robots.txt
- [ ] Ajouter un fichier OG image pour les partages sur réseaux sociaux
- [ ] Configurer l'analytics (Plausible / Vercel Analytics)

---

## Mise en ligne (Vercel — recommandé)

1. Créez un dépôt GitHub et poussez ce projet (`git` est déjà initialisé localement).
2. Sur [vercel.com](https://vercel.com) → **Add New Project** → importez le dépôt.
3. Nom du projet : `rose-chaud` → URL : `https://rose-chaud.vercel.app`
4. **Environment Variables** (Production) :
   - `ADMIN_SECRET` = même mot de passe que dans `.env.local`
5. Déployez.

**Nom de domaine personnalisé** (ex. `rosechaud.fr`) : Vercel → Project → **Domains** → ajoutez le domaine acheté chez OVH, Gandi, etc.

**Agenda / témoignages soumis** : les fichiers JSON ne sont pas persistants sur Vercel après redéploiement. L’agenda admin fonctionne en local ; pour la prod durable, prévoir une base (Supabase, Vercel KV…).

```bash
npx vercel
```

---

Fait avec amour pour les belles fêtes.
