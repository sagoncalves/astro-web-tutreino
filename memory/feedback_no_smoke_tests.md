---
name: Skip dev-server smoke tests after edits
description: Don't spin up `npm run dev` to curl-test pages after every change unless the user asks for verification
type: feedback
---

Do not start a dev server and curl/smoke-test pages after every edit. The user runs the dev server themselves while reviewing.

**Why:** User explicitly said "there is no need to run these things on the server in all responses stop it please." Trust Astro/Vite's compile errors to surface in the editor and in the user's own dev session. Repeated `npm run dev` + curl + kill cycles add latency, noise, and SIGTERM "task failed" notifications without adding value.

**How to apply:**
- After Edit/Write to .astro/.tsx/.css/etc., end the turn with a summary of what changed — don't validate by booting a server.
- Only run a dev server if the user explicitly asks to test/preview, or if a change is risky enough that compile-time validation isn't enough (e.g., complex SSR data fetching, build-time scripts).
- Trust the file edits — Edit/Write would have errored if the diff was malformed.
