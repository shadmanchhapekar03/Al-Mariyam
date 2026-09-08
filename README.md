# Al Mariyam Medical Center

A professional marketing and appointment-booking website for Al Mariyam Medical
Center, a fictional multi-specialty clinic. The site presents the center's
departments, physicians, and story, and lets visitors submit appointment
requests and general inquiries, which are stored in a database for staff to
follow up on.

## Key technologies

- **Next.js (App Router)** — full-stack React framework handling both the
  marketing pages and the API routes.
- **TypeScript** and **Tailwind CSS v4**.
- **Drizzle ORM** with **Netlify Database** (managed Postgres) for persisting
  appointment requests and contact messages.
- **lucide-react** for iconography.

## Project structure

- `src/app` — pages (`/`, `/services`, `/doctors`, `/about`, `/contact`) and
  API routes (`src/app/api/appointments`, `src/app/api/contact`).
- `src/components` — shared UI (`Header`, `Footer`, `AppointmentForm`, `ContactForm`).
- `src/lib/data.ts` — static content for departments and physicians.
- `db/schema.ts` — Drizzle schema for `appointments` and `contact_messages`.
- `netlify/database/migrations` — generated SQL migrations, applied automatically on deploy.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Database access when run locally through the
Netlify CLI (`netlify dev`) connects automatically to a Netlify Database —
no connection string setup required.

## Making schema changes

Edit `db/schema.ts`, then generate a migration:

```bash
npx drizzle-kit generate --name <description>
```
