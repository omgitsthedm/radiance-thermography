# Radiance Thermography AI-Ops State

## Identity

- Project Code: LFNYC-RT
- Name: Radiance Thermography
- Tier: Tier 1 · Risk: Low (plain static marketing, no live form)
- Canonical Path: /Users/davidmarsh/Desktop/LiFi NYC/Clients/Radience/radiance-thermography
- Git-backed: yes · Remote: https://github.com/omgitsthedm/radiance-thermography.git · Default branch: `master`

## Current Stamp

- Updated: 2026-06-28
- Updated By: Claude
- Basis: AI-Ops onboarding (handoff-ready). Read-only scope.
- Git HEAD at onboarding: fbab6ced

## Rules Version

- 2026-06-27-aiops-foundation-v1

## State Confidence

- High for path/repo/branch/remote/stack/commands. Live: Netlify primary `radiance-thermography.netlify.app`; custom domain not yet set (source canonical = PLACEHOLDER-DOMAIN).

## Current Live Truth

- Live URL: `https://radiance-thermography.netlify.app` (Netlify primary). Project `radiance-thermography`, Netlify Forms NOT enabled. Static `publish = "."`, no build.
- A `netlify.toml` was created during onboarding (none existed) declaring `publish = "."` and the privacy `→ 404` redirects for `/CLAUDE.md`, `/AGENTS.md`, `/.ai/*`.
- Production QA status: not run by AI-Ops.

## Repo State

- Branch `master`, in sync with origin at onboarding; clean working tree.
- `recForm` is a client-side recommender (no network submit / no Netlify form).

## Risk / Compliance

- Thermal-imaging wellness; avoid medical/diagnostic claims. No payments/forms. Domain not yet wired (canonical placeholder).

## QA-PENDING

- Set real custom domain + fix canonical/og:url (currently PLACEHOLDER-DOMAIN) before SEO push.
- Verify forced 404 redirects catch `/.ai/*` on live (verify `/.ai/STATE.md` → 404 after next deploy).

## Do Not Touch

- `.env`/secrets; medical/health-claim copy without approval.
- The new netlify.toml `→ 404` redirects (keep internal docs private).
- `git push` to `master` (= production deploy) without `APPROVE LIVE CHANGE`.

## Proposed Changes / Inbox

- None yet.

## Next Steps Queue

- Verify `.ai/*.md` returns 404 on live after this onboarding deploy.
- Wire real domain + replace PLACEHOLDER-DOMAIN canonical.

## Recent Session History

- 2026-06-28: Claude onboarded Radiance Thermography to AI-Ops (handoff-ready). Created `.ai/{LOCK,RULES_HEADER,RULES,STATE}.md` + AGENTS pointer; created repo-level CLAUDE.md (Commands + pointer); created netlify.toml (none existed) with `publish = "."` + forced `/CLAUDE.md` + `/AGENTS.md` + `/.ai/*` → 404 redirects. No source/content change. Static site, branch `master`.

## Next Agent Directive

Read `.ai/RULES.md` + `.ai/STATE.md` + `CLAUDE.md` first. Plain static marketing site on `master`. `git push` to `master` = production deploy (gated). No live form yet (recForm is client-side only). Avoid medical/diagnostic claims. Set real domain before SEO. Keep the forced `→ 404` redirects. Don't read `.env`/secrets.

## Emergency / Bypass Notes

- No bypass for deploy/push/production mutations.
- Bypass/YOLO is only an execution accelerator for approved local setup and read-only verification.
- Emergency mode: stop, preserve evidence, smallest reversible action.
