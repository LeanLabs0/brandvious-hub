---
name: zero-friction-cms
description: Add an inline, edit-in-place CMS (the floating "Edit Content" button) to a fullstack React + Vite + Express + Postgres app. Lets a logged-in editor click any text on the page, type, and save to the database; edits display on the published site; an "Apply to code" panel hands the edits back to the agent to bake into source. Use when the user wants on-page content editing, a "make text editable" feature, or asks to reuse/port the Edit Content button to another Replit project.
---

# Zero-Friction CMS

An inline content editor for fullstack-JS apps. A floating **Edit Content** button
turns every leaf text element on the page into a contentEditable field. Edits save
to a Postgres `site_content` table and are overlaid onto the live DOM — in dev AND
on the published site. An **Apply to code** panel lets the editor hand pending
edits back to the agent to bake permanently into source.

## State — read this FIRST, before anything else

This skill exists in one of two states. Figure out which one you're in, then act.

<!-- cms-state: NOT_INSTALLED -->

- **NOT_INSTALLED** (the marker above says `NOT_INSTALLED`): the skill is loaded in
  the repl but the CMS is not yet wired into this project — only `templates/` exist.
  → Run the **Install procedure** below.
- **INSTALLED** (the marker above says `INSTALLED`): the CMS is already part of this
  project. → Do NOT install anything. Skip straight to "Using an installed CMS",
  "The Apply to code workflow", and the other usage sections. Ignore the install
  steps entirely (the final install step deletes them, so if they're gone you're
  installed).

Belt-and-suspenders check (use if the marker looks wrong, e.g. the skill was copied
between projects): the CMS is installed iff `client/src/contexts/content-context.tsx`
exists in the project AND a `site_content` table exists. Trust that over the marker
and fix the marker to match.

**The very last install step flips the marker to `INSTALLED` and removes the install
procedure** so a future agent reads this as a use-it-only skill and never tries to
re-install on top of working code.

## Mental model (read first — this is the whole design)

- **Edits live in the database, not in code.** Clicking text + typing writes a
  `site_content` row. It does NOT change `.tsx` files, so it won't appear in git.
- **A runtime overlay re-applies those rows on top of the rendered DOM** on every
  page load (dev + production), so saved edits are visible to real visitors.
- **Two ways to make an edit permanent in source:**
  1. The **Apply to code** workflow — the editor copies a prompt, pastes it to the
     agent, the agent rewrites the source strings and deletes the DB rows.
  2. The agent edits the source directly when asked in chat.
- **Editing is dev-only by design.** The button/overlay-edit only mount when
  `import.meta.env.DEV && VITE_CMS_ENABLED === "true"`. Public production builds
  have `DEV=false`, so visitors can *see* overrides but never edit.
- **Same DB across dev + deployment** (the default on Replit). That's why a dev
  edit shows up on the published site. If a project uses a separate prod DB, the
  rows must be copied over (or just use Apply-to-code so it's in source anyway).

## Two editing modes

- **Auto-overlay (default, zero wrapping):** mount `<AutoEditOverlay />` once and
  everything is editable. Keys are DOM-position paths like
  `auto::/::section.0>div.2>p.0`. **Trade-off:** if you restructure a page, the
  key stops matching and the edit orphans back to the source text.
- **Explicit wrappers (refactor-safe):** wrap copy in `<Editable id="home.hero.title" …/>`,
  `<EditableLink …/>`, or `<EditableCard …/>`. Keys are stable strings you choose,
  so edits survive moving the element. Use these for copy that must persist.

Both modes can coexist. The overlay skips anything with `data-cms-no-auto`, the
explicit `<Editable>` instances, and the floating panel itself.

## Files in this skill

```
templates/
  shared/schema.snippet.ts          # site_content table + zod schemas
  shared/routes.ts                  # typed API contract (list/upsert/deleteAll/deleteOne)
  server/db.ts                      # pg Pool + drizzle client
  server/storage.snippet.ts         # IStorage additions + content CRUD impl
  server/routes.snippet.ts          # GET (public) + token-gated POST/DELETE
  client-contexts/edit-mode-context.tsx
  client-contexts/content-context.tsx
  client-components/auto-edit-overlay.tsx   # the magic: makes everything editable
  client-components/app-wiring.tsx          # FloatingEditButton + Apply-to-code panel + provider nesting
  client-components/editable.tsx            # OPTIONAL stable-key text wrapper
  client-components/editable-link.tsx       # OPTIONAL editable label+href
  client-components/editable-card.tsx       # OPTIONAL multi-field card editor
  client-components/index.css.snippet.css   # .cms-auto-editable outline styles
reference/
  apply-to-code-prompt.md           # how to handle the "Apply to code" paste
```

## Install procedure (run ONLY if state is NOT_INSTALLED)

> If the state marker says `INSTALLED` (or these steps are missing), the CMS is
> already wired in — skip this whole section and go to "Using an installed CMS".

Prereqs: a provisioned Postgres DB (`DATABASE_URL` set), and packages `pg` +
`drizzle-orm` + `drizzle-zod` (install with the package tool, never edit
package.json by hand).

1. **Schema** — paste `templates/shared/schema.snippet.ts` content into
   `shared/schema.ts` (the `siteContent` table + schemas/types).
2. **API contract** — add the `content` block from `templates/shared/routes.ts`
   to your `shared/routes.ts` (or create it).
3. **DB client** — copy `templates/server/db.ts` to `server/db.ts` (skip if you
   already have a drizzle client; reuse it).
4. **Storage** — merge the four methods from `templates/server/storage.snippet.ts`
   into your storage class and add their signatures to `IStorage`.
5. **Routes** — wire the handlers from `templates/server/routes.snippet.ts` into
   `server/routes.ts` (call `registerCmsRoutes(app)` or inline them). GET is
   public; POST/DELETE require the `x-cms-edit-token` header AND are blocked
   entirely in production (deny-by-default — see Security below).
6. **Contexts** — copy `edit-mode-context.tsx` and `content-context.tsx` to
   `client/src/contexts/`.
7. **Components** — copy `auto-edit-overlay.tsx` to `client/src/components/`.
   Copy the optional `editable*.tsx` only if you want explicit wrappers (they
   need shadcn Button/Input/Textarea/Dialog).
8. **Floating button** — add `FloatingEditButton` from `app-wiring.tsx` to your
   `App.tsx` and nest providers exactly as shown (EditModeProvider → ContentProvider,
   then `<Router/>`, `<AutoEditOverlay/>`, `<FloatingEditButton/>` as siblings).
9. **Styles** — append `index.css.snippet.css` to your global stylesheet. Override
   `--cms-accent` (HSL triplet, no `hsl()` wrapper) to theme the outline.
10. **Env vars (development environment ONLY)** — use the environment-secrets
    skill to set, in the *development* env, not production:
    - `CMS_EDIT_TOKEN` — server-side secret (any long random string)
    - `VITE_CMS_EDIT_TOKEN` — same value, exposed to the browser
    - `VITE_CMS_ENABLED` — `"true"`
    Keeping these out of production is what makes editing dev-only. Do NOT set
    `CMS_ALLOW_PROD_EDIT` unless you deliberately want live editing in production
    (see Security).
11. **Create the table** — run `npm run db:push` (Drizzle). Confirm the
    `site_content` table exists.
12. **Verify** — load the app in dev: the floating **Edit Content** button should
    appear. `GET /api/content` returns `{}`; `POST /api/content` without the token
    returns 401.
13. **Mark installed + strip the install flow (do this last, after verify passes).**
    Edit this `SKILL.md` so a future agent treats it as use-it-only and never
    re-installs over working code:
    - Change the marker comment near the top from `<!-- cms-state: NOT_INSTALLED -->`
      to `<!-- cms-state: INSTALLED -->`.
    - Delete this entire "Install procedure" section (this whole `## Install
      procedure …` heading through step 13). Leave "State", "Mental model",
      "Two editing modes", "Using an installed CMS", "The Apply to code workflow",
      "Security", and "Gotchas" intact.
    The `templates/` and `reference/` folders stay — they're harmless and useful if
    the user later wants to port the CMS to yet another project.

## Using an installed CMS

When the CMS is already wired in, you don't reinstall — you just operate it:
- **Edit copy on request:** find the string in the relevant page/component and edit
  the source directly (that's the durable path; DB overrides are for the live editor).
- **Handle "Apply to code" pastes:** see the next section — bake pending DB edits
  into source, then delete those rows.
- **Add new editable copy that must survive refactors:** wrap it in
  `<Editable id="stable.key" …/>` (or `EditableLink`/`EditableCard`) rather than
  relying on the DOM-position auto-overlay.
- **Opt a region out of auto-editing:** add `data-cms-no-auto` to the element.
- **Inspect pending edits:** `SELECT key, value FROM site_content ORDER BY updated_at;`
  via `executeSql`. Clear one with the DELETE endpoint or SQL.
- **Re-theme the edit outline:** override `--cms-accent` (HSL triplet, no `hsl()`).

## The "Apply to code" workflow

In edit mode the panel shows **Apply to code (N)** + an **X** (exit). Apply to code
opens a list of pending edits with **Copy prompt for agent** and **Discard**.
The copied prompt, when pasted into chat, tells the agent to bake edits into source.
**When you (the agent) receive that paste, follow `reference/apply-to-code-prompt.md`
exactly** — the critical rules: the DB stores only the NEW text (grep for the old
string), confirm uniqueness before replacing, skip edits that target the CMS UI
itself, and DELETE the applied rows from `site_content` afterward (via `executeSql`)
so they don't double-apply.

## Security

- **GET is public; all writes/deletes are gated** by the `x-cms-edit-token` header
  (server `CMS_EDIT_TOKEN` vs browser `VITE_CMS_EDIT_TOKEN`).
- **Two independent gates, on purpose:**
  1. *Frontend:* the edit UI only mounts in dev builds with `VITE_CMS_ENABLED=true`.
  2. *Backend (deny-by-default):* write/delete routes are **blocked in production**
     (`NODE_ENV === "production"`) and return 403 unless `CMS_ALLOW_PROD_EDIT=true`
     is explicitly set. Never rely on the frontend gate alone — if the token ever
     leaks into a prod bundle it is publicly readable, so the server must refuse.
- **Only enable production editing deliberately:** set `CMS_ALLOW_PROD_EDIT=true`
  *and* a strong `CMS_EDIT_TOKEN` in production only if you truly want live edits.
  Default (unset) is the safe choice.

## Gotchas

- **Trailing spaces:** contentEditable often saves a trailing space; trim on apply.
- **CMS-UI got edited:** the overlay can make its own buttons editable if not
  guarded. The floating panel carries `data-cms-no-auto`; if a new control leaks,
  add that attribute and discard the row.
- **Animated/re-rendering text:** the overlay can't hold edits on elements that
  re-render every frame (counters, clocks). Use an explicit `<Editable>` or skip.
- **Stale pending count:** the panel invalidates the content query on open; if a
  count looks wrong after an out-of-band DB change, reload once.
- **Separate prod DB:** if dev and prod don't share `DATABASE_URL`, dev edits
  won't show in prod until copied — prefer Apply-to-code so edits land in source.
