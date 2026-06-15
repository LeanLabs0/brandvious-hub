# Adapting the CMS to vanilla HTML/JS (no React)

This is a concept doc, not a finished implementation. It explains what carries
over unchanged, what to drop, and how to rebuild the one React-coupled piece in
plain JavaScript. Another agent can implement from here.

## Why this ports cleanly

The "magic" was never React. The auto-overlay already does its real work directly
on the DOM (`document.querySelectorAll`, `MutationObserver`, `contentEditable`,
`blur`). React only supplied lifecycle plumbing around it. Remove the hooks and
the same logic is ~100 lines of vanilla JS.

## What carries over UNCHANGED

- **The entire backend.** The `site_content` table, the typed routes
  (`GET/POST/DELETE /api/content`, `DELETE /api/content/by-key`), the
  `x-cms-edit-token` gating, and the deny-in-production guard are
  framework-agnostic. The frontend just needs those endpoints to exist. They can
  even be served by a non-Node backend (PHP, Go, etc.) as long as the contract
  matches: GET returns a flat `{ key: value }` JSON map; POST accepts
  `{ key, value }`; writes require the token header.
- **The key scheme.** Persistence keys stay `auto::<pathname>::<tag-path>` where
  `<tag-path>` is the tag + nth-of-same-tag chain from `<body>`. Reuse the exact
  `buildKey`, `isLeafText`, `TEXT_SELECTORS`, `SKIP_SELECTOR`, and
  `BLOCK_CHILD_TAGS` logic from `templates/client-components/auto-edit-overlay.tsx`
  verbatim — they're already plain functions with no React in them.
- **The CSS.** `templates/client-components/index.css.snippet.css` is plain CSS;
  use it as-is (override `--cms-accent` to theme).
- **The Apply-to-code workflow.** Identical — it just reads rows from the DB. The
  agent-facing rules in `reference/apply-to-code-prompt.md` apply without change.

## What to DROP (and why you don't need it)

- **The React components** `Editable` / `EditableLink` / `EditableCard`. These are
  the explicit, refactor-safe wrappers. In a vanilla site you lose stable-key
  editing, but the auto-overlay (DOM-position keys) covers "click any text, type,
  save" on its own. If you need a stable key for a specific element, give that
  element a fixed `id`/`data-*` and derive the key from it instead of its position.
- **TanStack Query / the context providers.** Replace with one `fetch()` for load
  and one `fetch()` per save. No cache layer needed.
- **The `edit-mode-context` / `content-context` files.** Their state becomes two
  module-level variables in the vanilla script (`isEditMode`, `content`).

## Where vanilla is actually SIMPLER

- **No SPA navigation patching.** The React overlay patches `history.pushState` /
  `replaceState` to detect route changes. A normal multi-page HTML site has real
  URLs, so each page load reads `window.location.pathname` once and you're done.
  Only re-add the pushState patch if the project is itself a client-routed SPA.

## Vanilla implementation shape

One script included on every page (e.g. `cms.js`), plus the CSS, plus the existing
backend. Sketch of the script:

```js
// cms.js — load on every page (defer). Pseudocode, not drop-in.
const ENABLED = /* your dev-only gate, e.g. location.hostname === "localhost"
                   or a window.__CMS_ENABLED__ flag injected only in dev */;
const TOKEN = /* dev-only edit token, injected server-side in dev only */;

let content = {};
let editMode = false;

// 1) Reuse verbatim from auto-edit-overlay.tsx:
//    TEXT_SELECTORS, SKIP_SELECTOR, BLOCK_CHILD_TAGS, isLeafText(el), buildKey(path, el)

async function loadContent() {
  content = await fetch("/api/content").then((r) => r.json());
}

// 2) Apply saved overrides to the DOM (runs in dev AND production so the
//    published site shows edits). Re-run on DOM mutations via MutationObserver.
function applyOverrides() {
  const path = location.pathname;
  const prefix = `auto::${path}::`;
  document.querySelectorAll(TEXT_SELECTORS).forEach((el) => {
    if (!isLeafText(el)) return;
    const key = buildKey(path, el);
    if (key in content && el.textContent !== content[key]) {
      el.textContent = content[key];
    }
  });
}

// 3) Edit mode (dev only): make leaves contentEditable, save on blur.
function enableEditing() {
  const path = location.pathname;
  document.querySelectorAll(TEXT_SELECTORS).forEach((el) => {
    if (!isLeafText(el)) return;
    const key = buildKey(path, el);
    el.setAttribute("contenteditable", "plaintext-only");
    el.classList.add("cms-auto-editable");
    el.addEventListener("blur", async () => {
      const value = el.textContent ?? "";
      if (value.trim() && value !== content[key]) {
        content[key] = value;
        await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CMS-Edit-Token": TOKEN },
          body: JSON.stringify({ key, value }),
        });
      }
    });
  });
}

// 4) A floating button toggles editMode (only rendered when ENABLED), mirroring
//    FloatingEditButton in app-wiring.tsx — including the Apply-to-code panel that
//    lists `content` entries and copies the agent prompt (see app-wiring.tsx +
//    reference/apply-to-code-prompt.md for the exact prompt text and DELETE calls).

// Boot:
loadContent().then(() => {
  applyOverrides();
  new MutationObserver(() => applyOverrides())
    .observe(document.body, { childList: true, subtree: true, characterData: true });
  if (ENABLED) renderFloatingButton(); // wires enableEditing()/teardown on toggle
});
```

## Gotchas (same as React version, restated for vanilla)

- **Dev-only gating still matters.** Don't ship the edit token or the edit button
  to production. Gate the button and inject `TOKEN` only in dev (e.g. server
  renders the token into the page only for localhost/preview, never in the prod
  build). The server still enforces deny-in-production on writes regardless.
- **Run `applyOverrides` after dynamic DOM changes**, hence the MutationObserver.
- **Trailing spaces / animated text / CMS-UI-got-editable** caveats are unchanged
  from the React "Gotchas" section in `SKILL.md`.
- **Skip the CMS's own UI**: the floating button/panel must carry
  `data-cms-no-auto` so the overlay doesn't make it editable.
