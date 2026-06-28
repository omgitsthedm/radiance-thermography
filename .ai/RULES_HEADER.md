# Radiance Thermography AI-Ops Rules Header

Project Code:

LFNYC-RT

Project Name:

Radiance Thermography

Business Line:

Client Projects under Little Fight NYC

Tier:

Tier 1 — plain static marketing site

Risk:

Low — thermal-imaging wellness marketing site. No payments, no regulated lending, no live lead form (the on-page `recForm` is a client-side recommender widget that submits nothing; Netlify Forms NOT enabled).

Canonical Path:

/Users/davidmarsh/Desktop/LiFi NYC/Clients/Radience/radiance-thermography

Remote:

https://github.com/omgitsthedm/radiance-thermography.git  (default branch: `master`)

Host:

Netlify — project `radiance-thermography`. **Static site, `publish = "."`** (whole repo root), no build (no `netlify.toml` existed before AI-Ops; one was added solely for `publish = "."` + privacy redirects). Internal files blocked from public serving via forced `/CLAUDE.md`, `/AGENTS.md`, `/.ai/*` → 404 redirects.

Live URL:

`https://radiance-thermography.netlify.app` (Netlify primary; custom domain not yet set — source canonical is a `PLACEHOLDER-DOMAIN` stub)

Stack:

Static HTML/CSS/JS (index, privacy, terms, 404; `app.js`, `styles.css`, `assets/`). No framework, no build step, no `package.json`. `recForm` is JS-only (client-side recommendation, no network submit).

## Commands

- Dev / preview: serve the folder statically (e.g. `npx serve .` or Netlify dev); no build needed.
- Build: none (`publish = "."`, static).
- Lint/format: none defined.
- Deploy: `git push origin master` → Netlify auto-publishes (push = production deploy → gated by `APPROVE LIVE CHANGE`).

## Locked Rules

- Live client site — treat as production. Branch is `master` (not main).
- Health/wellness claims (thermal imaging is not a diagnostic substitute) are sensitive — do not add medical/diagnostic claims without client/David approval.
- LiFi brand standards apply (orange `#FE5800` agency brand; site palette in CLAUDE.md). LiFi footer present.
- **Never publish prices** as hard commitments without approval.
- Images `.webp` + explicit `width`/`height` + lazy-load below fold.
- Mobile-first, WCAG AA contrast, body text 16px+, respect `prefers-reduced-motion`.
- `git push` (to `master`) = production deploy → gated. `.env`/secrets never read.
- `.ai/`, `CLAUDE.md`, `AGENTS.md` stay private via the forced `→ 404` redirects — do not remove them.
- Source canonical/og:url still points at `PLACEHOLDER-DOMAIN` — set the real domain before any SEO push.

## Radiance Thermography QA Harness Map

Observational (agent may run): `git status/log`, read source/config, static local serve, public GET to radiance-thermography.netlify.app, read-only Netlify deploy metadata.

Transactional/gated (David-run / approved): `git push`/Netlify deploy; adding any real lead-capture form; medical/health-claim copy changes; DNS/domain/env changes.
