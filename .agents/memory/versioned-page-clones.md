---
name: Versioned page clones (re-export pattern)
description: /vN homepage versions share one source via re-export; editing the shared source hits every version at once. Iterate only on a full standalone copy.
---

The homepage has versioned routes (/v1 through /v6) that are thin re-export files (`export { default } from "@/pages/home-new"`). Any edit to the shared source file changes ALL versions and the live homepage simultaneously.

**Why:** The user created /v6 explicitly as an iteration sandbox, but an edit made to home-new.tsx (which /v6 re-exported) changed /, /v5, and /v6 at the same time. This broke their expectation that prior versions stay frozen.

**How to apply:** When the user asks to iterate on a versioned route (/vN), first check whether its page file is a re-export. If it is, copy the full source into the version's own file (e.g. `cp home-new.tsx home-v6.tsx`) BEFORE making any edits, and edit only that file. Never edit the shared source (home-new.tsx) for version-specific experiments. Edits to the shared source are only correct when the user explicitly wants the change on / and all re-exporting versions.
