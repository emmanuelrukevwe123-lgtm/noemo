# Setup & Local Development

## Prerequisites

- **Node.js** 18.18+ (Next.js 15 requirement; Node 20 LTS recommended)
- **npm** (the repo ships a `package-lock.json`)
- A **Supabase** project — optional for UI work (see [demo mode](#running-without-supabase-demo-mode))
- An **OpenAI** API key — optional, only needed for AI reviews

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment

```bash
cp .env.example .env.local
```

Then fill in `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | for real auth/data | Supabase project URL. Exposed to the browser. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | for real auth/data | Supabase anon/public key. Exposed to the browser. |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only | Service-role key for privileged server operations. **Never** expose to the client. |
| `OPENAI_API_KEY` | for AI reviews | OpenAI API key. Server-only. |
| `OPENAI_MODEL` | optional | Model id. Falls back to `gpt-4.1-mini`. |
| `NOEMO_APP_URL` | optional | Public base URL of the app (e.g. `http://localhost:3000`). |

> Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be
> present for the app to leave demo mode — see `lib/supabase/config.ts`
> (`isSupabaseConfigured()`).

## 3. Run the dev server

```bash
npm run dev      # next dev --turbopack
```

Open <http://localhost:3000>.

## Running without Supabase (demo mode)

If the Supabase variables are missing, the app runs in **read-only demo mode**:

- Authentication is bypassed; you are signed in as a "Demo Trader".
- All pages render using sample data from `lib/db/sample-data.ts`.
- Any write (create/edit a trade, generate an AI review) is rejected with a
  "Demo mode is read-only" message.

This is the fastest way to review the UI and the dark theme. See
[ARCHITECTURE.md](./ARCHITECTURE.md#demo-mode).

## 4. Provision Supabase (for the full app)

Apply the migration in `supabase/migrations/0001_noemo_mvp.sql` to your project.
It creates the tables, indexes, triggers, Row Level Security policies, a private
`trade-attachments` Storage bucket, and an `auth.users` → `profiles` sync
trigger.

You can run it via:

- the **Supabase SQL editor** (paste the file contents), or
- the **Supabase CLI**: `supabase db push` / `supabase migration up`.

See [DATA_MODEL.md](./DATA_MODEL.md) for the schema details.

## Verification

Run the same checks the project documents before shipping:

```bash
npx tsc --noEmit   # type-check (no emit)
npm run lint       # eslint . --max-warnings=0
npm run test       # vitest run
npm run build      # production build
```

Other scripts (`package.json`):

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev --turbopack` | Local dev server |
| `build` | `next build` | Production build |
| `start` | `next start` | Serve the production build |
| `lint` | `eslint . --max-warnings=0` | Lint (zero-warning policy) |
| `test` | `vitest run` | Run unit tests once |
| `test:watch` | `vitest` | Watch-mode tests |

> **Note:** `npm run lint` currently reports one pre-existing error in the
> auto-generated `next-env.d.ts` (triple-slash reference). It is unrelated to
> application code.
