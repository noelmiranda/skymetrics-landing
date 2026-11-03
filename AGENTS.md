## Language

All content in this project must be 100% English — no exceptions:

- All user-visible text (headings, labels, descriptions, CTAs, navigation, footer copy)
- `<html lang="en">` on every page
- All HTML comments and Astro frontmatter comments
- All variable names, prop names, and inline data (arrays of strings, object labels)
- All SEO metadata: `<title>`, `<meta name="description">`, Open Graph tags, Twitter Card tags
- All form labels, placeholders, and validation messages
- All ARIA labels and accessibility attributes

When adding or editing any file under `src/`, verify that zero Spanish (or other non-English) words appear anywhere in the output.

## Design System

Tailwind v4 — tokens live in `src/styles/global.css` under `@theme`. There is no `tailwind.config.mjs`.

| Token | Value | Usage |
|---|---|---|
| `background` | `#E8ECEB` | Page background |
| `surface` | `#FFFFFF` | Cards and panels |
| `slate` | `#2D3E4E` | Primary text, dark surfaces |
| `solar` | `#E09E50` | Primary CTAs and highlights |
| `mint` | `#8CBDB9` | Accents and metric panels |
| `font-heading` | Plus Jakarta Sans | All headings |
| `font-body` | Inter | Body copy and UI text |

Use Tailwind utility classes (`bg-solar`, `text-mint`, `font-heading`, etc.) — never hardcode hex values in class attributes when a token exists.

## Component Structure

```
src/
  layouts/
    BaseLayout.astro                — SEO, OG, canonical, favicon, global styles (landing)
  components/
    layout/
      AppLayout.astro               — Sidebar + header shell for all /app/* pages
    sections/                       — Landing page sections (static, no backend)
      Header.astro
      Hero.astro
      Features.astro
      HowItWorks.astro
      Metrics.astro
      CallToAction.astro
      Footer.astro
    app/                            — Svelte 5 islands (client:load, authenticated)
      LoginForm.svelte              — Firebase email/password sign-in
      NewInspectionForm.svelte      — Create inspection → redirects to detail
      InspectionList.svelte         — Paginated list with status badges
      InspectionDetail.svelte       — Map + anomalies + upload tabs
      AnomalyMap.svelte             — Leaflet map, color-coded by severity
      UploadPanel.svelte            — Signed URL upload → analyze-stored
    ui/                             — Shared stateless UI primitives (Astro)
  pages/
    index.astro                     — Landing homepage
    about.astro / privacy.astro / terms.astro / cookies.astro
    app/
      login.astro                   — prerender=false, renders LoginForm
      index.astro                   — prerender=false, dashboard
      inspections/
        index.astro                 — prerender=false, inspection list
        new.astro                   — prerender=false, create form
        [id].astro                  — prerender=false, detail + map
  lib/
    api/
      types.ts                      — DTOs mirroring SkyMetrics Core responses
      client.ts                     — apiFetch() + uploadToGcs() with Firebase auth
      inspections.ts                — listInspections, getInspection, createInspection
      storage.ts                    — getUploadCredential, uploadAndAnalyze, batchUploadAndAnalyze
    auth/
      firebase.ts                   — Firebase app init (guards against double-init)
  styles/
    global.css                      — @theme tokens + @layer base
```

Section IDs used for anchor navigation: `#features`, `#how-it-works`, `#benefits`, `#contact`.

## App pages

All pages under `src/pages/app/` use `export const prerender = false` to enable SSR via the Vercel adapter. Auth is handled client-side: each Svelte island calls `onAuthStateChanged` and redirects to `/app/login` if no user is present.

## API integration

`src/lib/api/client.ts` — `apiFetch<T>()` adds `Authorization: Bearer {firebase-token}` to every request. Base URL comes from `PUBLIC_API_URL` env var.

`src/lib/api/storage.ts` — `uploadAndAnalyze()` implements the signed URL flow:
1. `GET /v1/inspections/:id/panels/:panelId/upload-url` → credential
2. `PUT {uploadUrl}` directly to GCS (no auth header)
3. `POST /v1/inspections/:id/panels/:panelId/analyze-stored` with `{ storageKey }`

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Landing | Contact form handler |
| `PUBLIC_API_URL` | App | SkyMetrics Core Cloud Run URL |
| `PUBLIC_FIREBASE_API_KEY` | App | Firebase web app API key |
| `PUBLIC_FIREBASE_AUTH_DOMAIN` | App | e.g. `skymetrics-dev.firebaseapp.com` |
| `PUBLIC_FIREBASE_PROJECT_ID` | App | e.g. `skymetrics-dev` |

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
