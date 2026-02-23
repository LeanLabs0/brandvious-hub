# Brandvious Digital

## Overview
Single-page landing site for Brandvious Digital. Dark, muted aesthetic inspired by GrowthRocket.ai's dark theme. Minimal content style similar to payloadcms.com.

## Brand
- **Tagline**: Fair. Factual. Functional for AI.
- **Mission**: Building products that make the internet work for both humans and machines.
- **Tone**: Professional, minimal, sharp — not "vibe coder" casual

## Products Showcased
1. **SchemaRocket** (Established) — AEO / Structured data for AI visibility → `/schema` (preview)
2. **Entities.org** (Growing) — Structured entity registry → `/entities` (real homepage) | `/entitiespreview` (preview)
3. **WhatisBest.com** (Launching) — AI-native B2B SaaS comparison engine → `/whatisbest` (preview)
4. **AnswerStack.com** (In Development) — Structured authority hub for AI search → `/answerstack` (preview)
5. **ReviewRadar.com** (Backlog) — Consensus review intelligence across all review platforms → `/reviewradar` (preview)

## Design
- Three-mode theme system: Light, Dark, Sparkle (with aurora canvas animation)
- Dark near-black background, subtle gray cards, white text
- No bright colors — fully muted palette
- Buttons are outline/ghost style only — no colored fills
- Font: Inter for body, JetBrains Mono for mono
- Color variables use HSL format: H S% L%

## Architecture
- Frontend-only static landing page (no database, no backend logic)
- React + Vite + Tailwind CSS + shadcn/ui components
- Homepage at `/` with smooth scroll to `#projects`
- Product preview pages as sister-site sub-routes using the Brandvious design system
- Preview pages are factual/explanatory, not sales-focused

## Key Files
- `client/src/pages/home.tsx` — Homepage (Navbar, Hero, Projects, Thesis, Footer)
- `client/src/pages/schema.tsx` — SchemaRocket preview page
- `client/src/pages/entities-home.tsx` — Entities.org real homepage (hero + registry + submit CTA)
- `client/src/pages/entities.tsx` — Entities.org preview page (registry only, used at /entitiespreview)
- `client/src/pages/whatisbest.tsx` — WhatisBest preview page
- `client/src/pages/answerstack.tsx` — AnswerStack preview page
- `client/src/pages/reviewradar.tsx` — ReviewRadar preview page
- `client/src/index.css` — Dark theme tokens
- `client/src/App.tsx` — Routing
- `client/src/components/theme-provider.tsx` — Three-mode theme provider

## User Preferences
- Owner may remove GrowthRocket/SchemaRocket from the site later (keep it easy to toggle)
- Prefers minimal copy — not wordy
- Professional buttons, no color fills
- Preview pages should be factual/explanatory, not sales-focused
