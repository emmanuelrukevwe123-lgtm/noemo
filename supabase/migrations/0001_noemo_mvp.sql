create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  timezone text not null default 'UTC',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pair text not null,
  direction text not null check (direction in ('long', 'short')),
  entry_price numeric(18, 8) not null check (entry_price > 0),
  exit_price numeric(18, 8),
  stop_loss numeric(18, 8),
  take_profit numeric(18, 8),
  lot_size numeric(18, 4) not null check (lot_size > 0),
  risk_amount numeric(18, 2) not null check (risk_amount >= 0),
  profit_loss numeric(18, 2),
  r_multiple numeric(12, 4),
  outcome text not null default 'open' check (outcome in ('win', 'loss', 'breakeven', 'open')),
  session text not null check (session in ('asia', 'london', 'new_york', 'overlap', 'other')),
  timeframe text not null,
  strategy text not null,
  setup text,
  notes text,
  opened_at timestamptz not null,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trade_behaviors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trade_id uuid not null references public.trades(id) on delete cascade,
  emotion text,
  confidence integer check (confidence between 1 and 10),
  rule_adherence text not null default 'not_applicable' check (rule_adherence in ('followed', 'partial', 'broken', 'not_applicable')),
  mistake_tags text[] not null default '{}',
  execution_rating integer check (execution_rating between 1 and 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (trade_id)
);

create table if not exists public.trade_attachments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trade_id uuid not null references public.trades(id) on delete cascade,
  kind text not null check (kind in ('image', 'tradingview', 'note')),
  storage_path text,
  url text,
  caption text,
  created_at timestamptz not null default now(),
  check (storage_path is not null or url is not null)
);

create table if not exists public.ai_trade_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trade_id uuid not null references public.trades(id) on delete cascade,
  summary text not null,
  structured_output jsonb not null,
  model text not null,
  prompt_version text not null,
  disclaimer text not null,
  created_at timestamptz not null default now()
);

create index if not exists trades_user_closed_at_idx on public.trades(user_id, closed_at desc nulls last);
create index if not exists trades_user_pair_idx on public.trades(user_id, pair);
create index if not exists trade_behaviors_user_emotion_idx on public.trade_behaviors(user_id, emotion);
create index if not exists ai_trade_reviews_trade_id_idx on public.ai_trade_reviews(trade_id);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_trades_updated_at on public.trades;
create trigger set_trades_updated_at
before update on public.trades
for each row execute function public.set_updated_at();

drop trigger if exists set_trade_behaviors_updated_at on public.trade_behaviors;
create trigger set_trade_behaviors_updated_at
before update on public.trade_behaviors
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.trades enable row level security;
alter table public.trade_behaviors enable row level security;
alter table public.trade_attachments enable row level security;
alter table public.ai_trade_reviews enable row level security;

create policy "Profiles are self readable" on public.profiles
for select using (id = auth.uid());

create policy "Profiles are self writable" on public.profiles
for update using (id = auth.uid()) with check (id = auth.uid());

create policy "Trades are owned by user" on public.trades
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Trade behaviors are owned by user" on public.trade_behaviors
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Trade attachments are owned by user" on public.trade_attachments
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "AI reviews are owned by user" on public.ai_trade_reviews
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

insert into storage.buckets (id, name, public)
values ('trade-attachments', 'trade-attachments', false)
on conflict (id) do nothing;

create policy "Users can read own trade attachments" on storage.objects
for select using (
  bucket_id = 'trade-attachments'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can upload own trade attachments" on storage.objects
for insert with check (
  bucket_id = 'trade-attachments'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can update own trade attachments" on storage.objects
for update using (
  bucket_id = 'trade-attachments'
  and auth.uid()::text = (storage.foldername(name))[1]
) with check (
  bucket_id = 'trade-attachments'
  and auth.uid()::text = (storage.foldername(name))[1]
);
