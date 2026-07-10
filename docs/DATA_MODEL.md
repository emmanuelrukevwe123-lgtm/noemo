# Data Model

The schema lives in `supabase/migrations/0001_noemo_mvp.sql`. TypeScript types
that mirror it are in `lib/db/types.ts` (`Database` and the derived row/insert
types). All user data is protected by **Row Level Security (RLS)**.

## Entity overview

```
auth.users (Supabase)
   │ 1
   ├──< profiles            (1:1, created via trigger on signup)
   └──< trades              (1:many)
           │ 1
           ├──< trade_behaviors    (1:1, UNIQUE(trade_id))
           ├──< trade_attachments  (1:many)
           └──< ai_trade_reviews   (1:many, history of reviews)
```

The aggregate the app reads is `TradeWithRelations`:

```ts
type TradeWithRelations = TradeRow & {
  behavior: TradeBehaviorRow | null;
  attachments: TradeAttachmentRow[];
  aiReviews: AiTradeReviewRow[];
};
```

## Tables

### `profiles`
One row per user, created automatically by the `handle_new_user` trigger on
`auth.users` insert.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | FK → `auth.users(id)` on delete cascade |
| `email` | text | |
| `full_name` | text | from sign-up metadata (`full_name` or `name`) |
| `timezone` | text | default `'UTC'` |
| `created_at` / `updated_at` | timestamptz | `updated_at` maintained by trigger |

### `trades`
The core journal entry.

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | uuid PK | `gen_random_uuid()` |
| `user_id` | uuid | FK → `auth.users` cascade |
| `pair` | text | required |
| `direction` | text | `long` \| `short` |
| `entry_price` | numeric(18,8) | `> 0` |
| `exit_price` | numeric(18,8) | nullable |
| `stop_loss` / `take_profit` | numeric(18,8) | nullable |
| `lot_size` | numeric(18,4) | `> 0` |
| `risk_amount` | numeric(18,2) | `>= 0` |
| `profit_loss` | numeric(18,2) | nullable |
| `r_multiple` | numeric(12,4) | nullable (computed on write; see ANALYTICS) |
| `outcome` | text | `win` \| `loss` \| `breakeven` \| `open` (default `open`) |
| `session` | text | `asia` \| `london` \| `new_york` \| `overlap` \| `other` |
| `timeframe` | text | required (free text, e.g. `M15`, `H1`) |
| `strategy` | text | required |
| `setup` | text | nullable |
| `notes` | text | nullable |
| `opened_at` | timestamptz | required |
| `closed_at` | timestamptz | nullable |
| `created_at` / `updated_at` | timestamptz | trigger-maintained |

### `trade_behaviors`
Behavioral / psychological context. **One per trade** (`UNIQUE(trade_id)`).

| Column | Type | Constraints |
|--------|------|-------------|
| `trade_id` | uuid | FK → `trades` cascade, unique |
| `emotion` | text | nullable (free text) |
| `confidence` | integer | 1–10 |
| `rule_adherence` | text | `followed` \| `partial` \| `broken` \| `not_applicable` |
| `mistake_tags` | text[] | default `{}` |
| `execution_rating` | integer | 1–10 |

### `trade_attachments`
Chart context. Must have either a `storage_path` **or** a `url`.

| Column | Type | Constraints |
|--------|------|-------------|
| `trade_id` | uuid | FK → `trades` cascade |
| `kind` | text | `image` \| `tradingview` \| `note` |
| `storage_path` | text | path in the private bucket (for `image`) |
| `url` | text | external URL (for `tradingview`) |
| `caption` | text | nullable |

### `ai_trade_reviews`
History of generated post-trade reviews.

| Column | Type | Notes |
|--------|------|-------|
| `trade_id` | uuid | FK → `trades` cascade |
| `summary` | text | short summary |
| `structured_output` | jsonb | full `TradeReviewOutput` payload |
| `model` | text | model id used |
| `prompt_version` | text | e.g. `trade-review-v1` |
| `disclaimer` | text | required |

## Indexes

```sql
trades_user_closed_at_idx          (user_id, closed_at desc nulls last)
trades_user_pair_idx               (user_id, pair)
trade_behaviors_user_emotion_idx   (user_id, emotion)
ai_trade_reviews_trade_id_idx      (trade_id)
```

## Triggers

- `set_updated_at()` — keeps `updated_at` current on `profiles`, `trades`,
  `trade_behaviors`.
- `handle_new_user()` — `SECURITY DEFINER`; on `auth.users` insert, upserts a
  matching `profiles` row.

## Row Level Security

RLS is enabled on every table. Policies:

- `profiles`: self-readable / self-writable (`id = auth.uid()`).
- `trades`, `trade_behaviors`, `trade_attachments`, `ai_trade_reviews`:
  full access only where `user_id = auth.uid()` (USING + WITH CHECK).

This means even with the anon key, a user can only ever read or write their own
rows.

## Storage

A **private** bucket `trade-attachments` holds uploaded screenshots. Object
policies scope read/insert/update to the owner by requiring the first path
segment to equal `auth.uid()`:

```
trade-attachments/<user_id>/<file>
```

Files are served to the owner via **signed URLs** generated on read
(`withSignedAttachmentUrls` in `lib/db/trades.ts`).
