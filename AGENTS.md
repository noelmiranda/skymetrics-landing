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
  layouts/BaseLayout.astro          — SEO, OG, canonical, favicon, global styles
  pages/index.astro                 — Composes all sections in order
  styles/global.css                 — @theme tokens + @layer base
  components/sections/
    Header.astro                    — Fixed nav, logo, mobile menu, CTA
    Hero.astro                      — Split hero with thermal map mock card
    Features.astro                  — 6-card feature grid
    HowItWorks.astro                — 3-step process
    Metrics.astro                   — KPI cards + testimonials
    CallToAction.astro              — Dark CTA banner with contact form
    Footer.astro                    — 4-col footer, social links, legal
```

Section IDs used for anchor navigation: `#features`, `#how-it-works`, `#benefits`, `#contact`.

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
