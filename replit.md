# Brandvious Digital — Corporate Website

## Overview

This is the corporate website for **Brandvious Digital**, a company focused on AI search optimization and digital growth products. The site showcases their portfolio of products (GrowthRocket, Entities.org, WhatisBest.com, AnswerStack.io) with the tagline "Fair. Factual. Friendly." It's a full-stack TypeScript application with a React frontend and Express backend, using a dark-themed design with a focus on clean presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework:** React 18 with TypeScript, bundled by Vite
- **Routing:** Wouter (lightweight client-side router) — currently has Home and 404 pages
- **Styling:** Tailwind CSS with a dark-mode-only theme using CSS custom properties (HSL color system)
- **UI Components:** shadcn/ui (new-york style) built on Radix UI primitives — extensive component library already installed
- **Fonts:** Inter (sans-serif) and JetBrains Mono (monospace) via Google Fonts
- **State Management:** TanStack React Query for server state
- **Path aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Framework:** Express 5 on Node.js, written in TypeScript and run with `tsx`
- **API Pattern:** All API routes should be prefixed with `/api` and registered in `server/routes.ts`
- **Storage Layer:** Abstracted via `IStorage` interface in `server/storage.ts`. Currently uses in-memory storage (`MemStorage`), but the interface is designed to be swapped for database-backed storage
- **Dev Server:** Vite dev server is integrated as Express middleware with HMR support
- **Production Build:** Client is built with Vite, server is bundled with esbuild into `dist/index.cjs`

### Database
- **ORM:** Drizzle ORM with PostgreSQL dialect
- **Schema:** Defined in `shared/schema.ts` — currently has a `users` table (id, username, password)
- **Validation:** Zod schemas auto-generated from Drizzle schemas via `drizzle-zod`
- **Migrations:** Managed via `drizzle-kit push` (schema push approach, not migration files)
- **Connection:** Requires `DATABASE_URL` environment variable for PostgreSQL
- **Note:** The app currently uses in-memory storage by default; PostgreSQL integration is set up but the storage implementation hasn't been switched to use Drizzle yet

### Build & Dev Scripts
- `npm run dev` — Development with hot reload (tsx + Vite HMR)
- `npm run build` — Production build (Vite for client, esbuild for server)
- `npm start` — Run production build
- `npm run db:push` — Push Drizzle schema to PostgreSQL

## External Dependencies

- **PostgreSQL** — Database (required for Drizzle ORM, connection via `DATABASE_URL` env var)
- **Radix UI** — Headless UI primitives powering all shadcn/ui components
- **TanStack React Query** — Async server state management
- **Drizzle ORM + Drizzle Zod** — Type-safe database access and schema validation
- **Vite** — Frontend build tool and dev server
- **Replit plugins** — `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` (dev-only Replit integrations)
- **connect-pg-simple** — PostgreSQL session store (available but not yet wired up)
- **Lucide React** — Icon library used throughout the UI