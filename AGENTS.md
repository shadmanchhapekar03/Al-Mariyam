<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Al Mariyam Medical Center — project notes

## Architecture

- Next.js App Router, full-stack: marketing pages and API routes live in the
  same app. No separate backend service.
- Pages: `/` (home), `/services`, `/doctors`, `/about`, `/contact`. All are
  server components except the interactive forms.
- API routes: `src/app/api/appointments/route.ts` and
  `src/app/api/contact/route.ts`, both `POST`-only, insert into Postgres via
  Drizzle and return the created row.
- `src/components/AppointmentForm.tsx` and `ContactForm.tsx` are client
  components that `fetch()` the API routes and render inline loading/success/
  error states — no page navigation on submit.
- `src/lib/data.ts` holds all department and physician copy as typed arrays.
  Add a department or physician there; both the homepage previews and the
  full listing pages read from the same source.

## Database

- Schema: `db/schema.ts` (tables `appointments`, `contact_messages`).
- Client: `db/index.ts`, using `drizzle-orm/netlify-db` — no connection
  string needed, Netlify wires it up automatically.
- After any schema edit, run `npx drizzle-kit generate --name <description>`
  to produce a migration in `netlify/database/migrations/`. Migrations apply
  automatically on deploy; there is no manual migration-runner step.

## Design system

- Palette and type scale are defined as CSS variables in
  `src/app/globals.css` (`--color-teal`, `--color-gold`, `--color-ivory`,
  etc.) plus a `font-display` utility class for the Fraunces display font.
  Body text uses Public Sans. Keep new UI consistent with this palette rather
  than introducing new colors inline.
- Tailwind v4 with `@theme inline` — no `tailwind.config.js`; theme tokens
  are declared directly in `globals.css`.

## Conventions

- Prefer editing `src/lib/data.ts` over hardcoding department/physician
  content directly in page components.
- Keep forms accessible: every input has a visible label, required fields
  are marked, and error states render inline rather than via `alert()`.

