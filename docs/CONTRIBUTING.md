# Contributing

## Conventions

- **Language:** TypeScript, strict. Prefer typed boundaries (Zod at input edges,
  `lib/db/types.ts` for DB shapes).
- **Server-first:** default to Server Components and Server Actions; add
  `"use client"` only where interactivity requires it.
- **Data access** goes through `lib/db/*`; **never** call Supabase directly from
  components.
- **Validation** goes through `lib/validation/*` (Zod). Keep the enum value
  arrays in sync with `lib/db/types.ts` (they use `satisfies` to enforce this).
- **Pure analytics:** keep `lib/analytics/*` free of I/O so it stays unit
  testable.
- **Styling:** use the semantic Tailwind tokens (see [THEMING.md](./THEMING.md));
  avoid reintroducing raw colored hexes.
- **Path alias:** import via `@/...` (configured in `tsconfig.json`).

## Before opening a PR

Run the full verification suite:

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```

## Testing

- Framework: **Vitest** + Testing Library + jsdom (`vitest.config.ts`).
- Existing tests: `tests/analytics.test.ts`, `tests/trade-schema.test.ts`,
  `tests/ai-review.test.ts`.
- The AI service accepts an injected `fetcher` so tests never hit the network.
- **Gap:** the server actions (`lib/actions/*`) are not yet covered — they hold
  the auth/demo-mode gating and error mapping, so they are good next targets.

## Database changes

Schema changes are SQL migrations under `supabase/migrations/`. When you change
the schema, also update `lib/db/types.ts` and any affected `lib/db/*` mappers.

## Known improvements (backlog)

Prioritized list of things worth addressing.

### Correctness / security
1. **Sanitize action error messages.** `messageForError` can return raw
   Postgres/OpenAI messages to the client; map to generic messages and log the
   real error server-side.
2. **Add a timeout to the OpenAI call.** `generateTradeReview` uses a bare
   `fetch` with no `AbortController`.
3. **Add a delete-trade action.** Create/update exist; delete does not.
4. **Rate-limit / dedupe AI reviews.** Each call is billable; consider a cooldown
   or cache by trade + `prompt_version`.
5. **Handle email-confirmation sign-up.** `signUpAction` redirects to `/app`
   immediately even when Supabase requires email verification.

### UX / product
6. **Reinforce win/loss beyond color** (signs/icons/weight) given the monochrome
   theme; set explicit light Recharts tick/tooltip colors.
7. **Paginate the trades list** (`listTrades` currently fetches all rows).
8. **Demo mode:** disable inputs and show a read-only banner instead of letting
   submits fail.
9. **Light/dark toggle** and removal of the inert `dark` conditional in
   `landing-page.tsx`.

### Engineering quality
10. **Validate env vars** at startup with a Zod schema.
11. **Cover server actions with tests.**
12. **Batch signed-URL generation** for attachments (avoid N+1).
13. **Escape `ilike` wildcards** in `pair`/`strategy` filters if literal matching
    is desired.
