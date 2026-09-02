-- Holistic Astro Approach — initial schema
-- Replaces the HighLevel-hosted site with an owned Postgres schema on Supabase.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles: one row per auth user. `role` gates the /admin CMS.
-- ---------------------------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text        not null,
  full_name   text,
  role        text        not null default 'customer' check (role in ('customer', 'admin')),
  created_at  timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Used by every admin RLS policy. SECURITY DEFINER so that reading `profiles`
-- from inside a policy on `profiles` itself does not recurse.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Keeps updated_at honest without trusting the client.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Blog
-- ---------------------------------------------------------------------------
create table public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text        not null unique,
  title        text        not null,
  excerpt      text,
  content      text        not null default '',   -- markdown
  cover_image  text,
  tags         text[]      not null default '{}',
  published    boolean     not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index posts_published_idx on public.posts (published, published_at desc);
create trigger posts_touch before update on public.posts
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Shop
-- ---------------------------------------------------------------------------
create table public.products (
  id               uuid primary key default gen_random_uuid(),
  slug             text        not null unique,
  name             text        not null,
  summary          text,
  description      text        not null default '',  -- markdown
  price_cents      integer     not null check (price_cents >= 0),
  currency         text        not null default 'eur',
  image_url        text,
  kind             text        not null default 'service' check (kind in ('service', 'digital', 'physical')),
  stock            integer,                            -- null = unlimited
  active           boolean     not null default true,
  sort_order       integer     not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index products_active_idx on public.products (active, sort_order);
create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();

create table public.orders (
  id                       uuid primary key default gen_random_uuid(),
  stripe_session_id        text unique,
  stripe_payment_intent_id text,
  email                    text,
  customer_name            text,
  status                   text        not null default 'pending'
                             check (status in ('pending', 'paid', 'fulfilled', 'cancelled')),
  amount_cents             integer     not null default 0,
  currency                 text        not null default 'eur',
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index orders_created_idx on public.orders (created_at desc);
create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

create table public.order_items (
  id               uuid primary key default gen_random_uuid(),
  order_id         uuid not null references public.orders (id) on delete cascade,
  product_id       uuid references public.products (id) on delete set null,
  -- Snapshots: an order must stay readable after a product is renamed or removed.
  name             text    not null,
  unit_price_cents integer not null,
  quantity         integer not null check (quantity > 0)
);

create index order_items_order_idx on public.order_items (order_id);

-- ---------------------------------------------------------------------------
-- Contact form
-- ---------------------------------------------------------------------------
create table public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  subject    text,
  message    text        not null,
  handled    boolean     not null default false,
  created_at timestamptz not null default now()
);

create index contact_messages_created_idx on public.contact_messages (created_at desc);

-- ---------------------------------------------------------------------------
-- Row level security
--
-- Anonymous visitors may read published posts and active products, nothing
-- else. Everything else is either admin-only or reached exclusively through
-- the service role key on the server (orders, contact submissions), which
-- bypasses RLS by design.
-- ---------------------------------------------------------------------------
alter table public.profiles         enable row level security;
alter table public.posts            enable row level security;
alter table public.products         enable row level security;
alter table public.orders           enable row level security;
alter table public.order_items      enable row level security;
alter table public.contact_messages enable row level security;

create policy "own profile readable" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

create policy "published posts are public" on public.posts
  for select using (published = true or public.is_admin());
create policy "admins write posts" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

create policy "active products are public" on public.products
  for select using (active = true or public.is_admin());
create policy "admins write products" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

create policy "admins read orders" on public.orders
  for select using (public.is_admin());
create policy "admins update orders" on public.orders
  for update using (public.is_admin()) with check (public.is_admin());

create policy "admins read order items" on public.order_items
  for select using (public.is_admin());

create policy "admins read messages" on public.contact_messages
  for select using (public.is_admin());
create policy "admins update messages" on public.contact_messages
  for update using (public.is_admin()) with check (public.is_admin());
