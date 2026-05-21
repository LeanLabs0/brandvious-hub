# Brandvious Digital

## Overview
Single-page landing site for Brandvious Digital. Dark, muted aesthetic inspired by GrowthRocket.ai's dark theme. Minimal content style similar to payloadcms.com.

## Brand
- **Tagline**: Fair. Factual. Functional for AI.
- **Mission**: Building products that make the internet work for both humans and machines.
- **Tone**: Professional, minimal, sharp — not "vibe coder" casual

## Products Showcased
1. **SchemaRocket** (Established) — AEO / Structured data for AI visibility
2. **Entities.org** (Growing) — Structured entity registry
3. **WhatisBest.com** (Launching) — AI-native B2B SaaS comparison engine
4. **AnswerStack.io** (In Development) — Structured authority hub for AI search
5. **ReviewInsight.com** (Backlog) — Consensus review intelligence across all review platforms
6. **Mentions.io** (Prototype) — Public mention tracking and proof of presence for brands

## URL Map
| Route | Page | File |
|---|---|---|
| `/` | Brandvious homepage (default — v3 editable clone of v2) | `home-v3.tsx` |
| `/v1` | Brandvious homepage (v1, legacy aurora) | `home.tsx` |
| `/v2` | Brandvious homepage (v2, cinematic dark) | `home-v2.tsx` |
| `/v3` | Alias for `/` (v3) | `home-v3.tsx` |
| `/schema` | SchemaRocket preview | `schema.tsx` |
| `/entities` | Entities.org homepage (hero + registry + submit CTA) | `entities-home.tsx` |
| `/entitiespreview` | Entities.org preview (registry only) | `entities.tsx` |
| `/whatisbest` | WhatisBest.com — 30-sector clustered homepage | `whatisbest-v3.tsx` |
| `/whatisbest/sector/:sectorId` | WhatisBest sector page (e.g. `/whatisbest/sector/artificial-intelligence`) | `whatisbest-v3.tsx` |
| `/whatisbest/sector/:sectorId/:articleId` | WhatisBest article detail (e.g. `/whatisbest/sector/artificial-intelligence/top-10-ai-agent-builders`) | `whatisbest-v3.tsx` |
| `/whatisbest/v1` | WhatisBest v1 (legacy flat categories) | `whatisbest.tsx` |
| `/whatisbest/v2` | WhatisBest v2 (legacy 9-sector cards) | `whatisbest-v2.tsx` |
| `/answerstack` | AnswerStack preview | `answerstack.tsx` |
| `/reviewradar` | ReviewInsight preview | `reviewradar.tsx` |
| `/mentions` | Mentions.io homepage (news feed of brand mentions) | `mentions.tsx` |
| `/mentions/:entityId` | Mentions.io entity detail (e.g. `/mentions/lean-labs`) | `mentions.tsx` |

## Design
- Three-mode theme system: Light, Dark, Sparkle
- Font: Plus Jakarta Sans throughout (single font, hierarchy via weight/size/opacity)
- Dark mode: deep navy background (hsl 220° 20% 7%), blue-tinted ambient orbs, cards with cool-blue borders/inset glow
- Light mode: cool silver-gray background (hsl 220° 12% 95%), slate accent spine, white cards with cool blue-gray borders/shadows
- Sparkle mode: spine beam, ambient orbs, floating particles, purple box-shadow halos on cards (NO colored text, NO purple fills — purple only in shadows/glow)
- Buttons are outline/ghost style only — no colored fills
- Color variables use HSL format: H S% L%
- Cards use `useCardStyles()` hook for mode-aware glass/shadow/hover treatment

## Architecture
- Frontend-only static landing page (no database, no backend logic)
- React + Vite + Tailwind CSS + shadcn/ui components
- Homepage at `/` with smooth scroll to `#projects`
- Product preview pages as sister-site sub-routes using the Brandvious design system
- Preview pages are factual/explanatory, not sales-focused

## Key Files
- `client/src/App.tsx` — All route definitions (see URL Map above)
- `client/src/index.css` — Theme tokens (HSL color variables)
- `client/src/components/theme-provider.tsx` — Three-mode theme provider (light/dark/sparkle)

## User Preferences
- Owner may remove GrowthRocket/SchemaRocket from the site later (keep it easy to toggle)
- Prefers minimal copy — not wordy
- Professional buttons, no color fills
- Preview pages should be factual/explanatory, not sales-focused

