# Noemo MVP

Private, mobile-responsive Forex trade journal built with Next.js, TypeScript,
Tailwind CSS, Supabase and a constrained OpenAI post-trade review service.

## Documentation

Full documentation lives in [`docs/`](./docs/README.md):

- [Setup & local development](./docs/SETUP.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Data model](./docs/DATA_MODEL.md)
- [Features & flows](./docs/FEATURES.md)
- [Analytics](./docs/ANALYTICS.md)
- [AI review service](./docs/AI_REVIEW.md)
- [API reference (actions & lib)](./docs/API_REFERENCE.md)
- [Theming](./docs/THEMING.md)
- [Contributing & backlog](./docs/CONTRIBUTING.md)

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Without Supabase keys the authenticated app runs in read-only demo mode so the
dashboard and trade review UI can still be inspected.

## Environment

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=
NOEMO_APP_URL=http://localhost:3000
```

`OPENAI_MODEL` is optional; the app falls back to `gpt-4.1-mini`. AI reviews
are only available for closed trades and are constrained to post-trade
reflection, not buy/sell signals or financial advice.

## Supabase

Apply the migration in `supabase/migrations/0001_noemo_mvp.sql` to create:

- `profiles`
- `trades`
- `trade_behaviors`
- `trade_attachments`
- `ai_trade_reviews`
- private `trade-attachments` Storage bucket
- Row Level Security policies for user-owned rows

## Verification

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```
