# Apply-to-code prompt (agent-facing)

The "Apply to code" panel's **Copy prompt for agent** button puts a message like
this on the user's clipboard. When the user pastes it into chat, follow these
steps exactly.

## The pasted prompt looks like

```
Apply the pending CMS edits below to the source code, then delete them from the
site_content table so they don't double-apply.

For each edit: find the old text in the relevant page/component, replace it with
the new text, and confirm what you changed. The key encodes the route it was
edited on: 'auto::/::' is the route mounted at '/', 'auto::/some-path::' is that path.

Pending edits:
- key: auto::/::div.0>div.1>section.0>div.2>p.0
  new text: "..."
```

## How to apply each edit

1. **Decode the key.** Format is `auto::<route>::<tag-path>`. The `<route>` tells
   you which page component is mounted there (check the router file). The
   `<tag-path>` (e.g. `section.0>div.2>p.0`) is a DOM-position hint, NOT a literal
   source location — use it only as a rough guide to which element.
2. **Find the OLD text in source.** The DB only stores the NEW text, not the old.
   So search the target component for the surrounding copy. Use the new text as a
   clue (a small wording change means the old string is very similar). `rg` the
   page component for distinctive words.
3. **Confirm uniqueness before editing.** If the string appears in more than one
   place (e.g. duplicated in a footer + a card, or in a config array that also
   feeds another section), ask the user which instance they meant rather than
   guessing.
4. **Replace** the old string literal with the new text. Mind trailing spaces —
   the overlay often saves a trailing space; trim it unless it's meaningful.
5. **Skip CMS-UI keys.** If a key points at the floating panel itself
   (e.g. text like "Apply to code (1)", "Edit Content", "Discard"), DO NOT apply
   it — it's the CMS chrome, not site content. Discard that row and tell the user.
   Also add `data-cms-no-auto` to the offending control so it can't be edited again.

## After applying — delete the rows so they don't double-apply

Once the source edits are in, remove exactly the keys you applied from the DB.
Use the code execution sandbox (`executeSql`) — this is the most reliable path:

```js
await executeSql({
  sqlQuery: "DELETE FROM site_content WHERE key IN ('KEY_1', 'KEY_2') RETURNING key;"
});
```

Verify the RETURNING output lists the keys you intended (and the right count).

## Then confirm to the user

- List what changed (file + old → new) for each applied edit.
- Call out anything you discarded (CMS-UI edits) or skipped (ambiguous matches).
- Note the pending count is back to 0 and the changes are now real source edits
  that will go to git on the next push.

## Why delete from the DB?

The apply-overrides effect runs in production and overlays DB values on top of
the source DOM. If you leave the row after editing source, the value is applied
twice (harmless when identical) and, worse, the row will silently re-override the
source if you later change that copy in code. Deleting keeps the source as the
single source of truth.
