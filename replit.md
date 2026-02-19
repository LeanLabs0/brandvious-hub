# Brandvious Digital

## Overview
Single-page landing site for Brandvious Digital. Dark, muted aesthetic inspired by GrowthRocket.ai's dark theme. Minimal content style similar to payloadcms.com.

## Brand
- **Tagline**: Fair. Factual. Functional for AI.
- **Mission**: Building products that make the internet work for both humans and machines.
- **Tone**: Professional, minimal, sharp — not "vibe coder" casual

## Projects Showcased
1. **GrowthRocket** (Established) — AEO / Answer Engine Optimization
2. **Entities.org** (Growing) — Structured entity registry
3. **WhatisBest.com** (Launching) — AI-native B2B SaaS comparison engine
4. **AnswerStack.com** (In Development) — Structured authority hub for AI search

## Design
- Dark near-black background, subtle gray cards, white text
- No bright colors — fully muted palette
- Buttons are outline/ghost style only — no colored fills
- Font: Inter for body, JetBrains Mono for mono
- Color variables use HSL format: H S% L%

## Architecture
- Frontend-only static landing page (no database, no backend logic)
- React + Vite + Tailwind CSS + shadcn/ui components
- Single page at `/` with smooth scroll to `#projects`

## Key Files
- `client/src/pages/home.tsx` — All sections (Navbar, Hero, Projects, Thesis, Footer)
- `client/src/index.css` — Dark theme tokens
- `client/src/App.tsx` — Routing

## User Preferences
- Owner may remove GrowthRocket from the site later (keep it easy to toggle)
- Prefers minimal copy — not wordy
- Professional buttons, no color fills
