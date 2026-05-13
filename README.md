# Nordflow CRM · StartSchool hackathon

A **demo-first CRM web app** focused on a polished **dark, mobile-aware UI**: customer portfolio, leads, pipeline deals, task board, dashboard KPIs, and a **sales copilot preview** (mock assistant + keyboard shortcut). Data for customers, leads, deals, and tasks is stored in **`localStorage`** so the flow works offline without a backend.

The root route redirects to **`/dashboard`**.

---

## Features

| Area | Notes |
|------|--------|
| **Dashboard** | Priority strips, charts (Recharts), “live orbit” style KPIs |
| **Customers** | Table / responsive cards, detail sheets, **CSV import** (Papa Parse) |
| **Leads & pipeline** | Add/edit flows with contextual providers |
| **Tasks** | Focus board with priorities and momentum UI |
| **Auth (preview)** | `/login` and `/register` UI (mock; no real sessions) |
| **AI assistant (preview)** | Floating dock + sheet (⌘K / Ctrl+K), canned “next revenue move” style replies |
| **Storybook** | Component docs and isolated previews |

---

## Tech stack

| Layer | Choices |
|-------|---------|
| **Framework** | [Next.js](https://nextjs.org) **16** (App Router), **React 19**, TypeScript |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) **v4**, [`tw-animate-css`](https://github.com/Wombosvideo/tw-animate-css) |
| **UI primitives** | [@base-ui/react](https://base-ui.com/react/overview/quick-start), [`class-variance-authority`](https://cva.style/docs), [`tailwind-merge`](https://github.com/dcastil/tailwind-merge), [`clsx`](https://github.com/lukeed/clsx), [`shadcn`](https://ui.shadcn.com/) tooling |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Charts** | [Recharts](https://recharts.org) |
| **CSV** | [Papa Parse](https://www.papaparse.com) |
| **Quality / docs** | ESLint (`eslint-config-next`), [Storybook](https://storybook.js.org) **10**, Vitest + Playwright (Storybook addon) |
| **Bundler (dev)** | Turbopack via `next dev` |
| **Fonts** | [Figtree](https://fonts.google.com/specimen/Figtree) via `next/font/google` |

**Optional / scaffold:** [`@supabase/supabase-js`](https://supabase.com/docs/reference/javascript) is listed as a dependency with a small client helper (`src/lib/supabase/client.ts`) for future backend wiring; the current CRM demo does not require Supabase env vars to run.

---

## Scripts

```bash
npm run dev              # Next.js dev server → http://localhost:3000
npm run build            # Production build
npm run start            # Run production server
npm run lint             # ESLint

npm run storybook        # Storybook → http://localhost:6006
npm run build-storybook  # Static Storybook build
```

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/dashboard`).

---

## Project layout (high level)

```
src/app/
  (crm)/          # Dashboard, customers, leads, pipeline, tasks
  (auth)/         # Login & register previews
src/components/crm/   # CRM shell: sidebar, top bar, boards, contexts, AI dock
```

---

## Deploy

Works on [Vercel](https://vercel.com) or any host that supports Next.js. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
