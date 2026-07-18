-- supabase/schema.sql
--
-- Reference schema for the multi-tenant shape discussed: you (master admin)
-- own the platform; each row in `businesses` is a subscribing electrical
-- business; each row in `customers` is a homeowner who belongs to exactly
-- one business. Run this in the Supabase SQL editor, adjusting to fit
-- whatever already exists in your project.

-- ---------------------------------------------------------------------------
-- businesses: one row per subscribing tenant
-- ---------------------------------------------------------------------------
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,                 -- used for sparky-ltd.yourdomain.com
  owner_user_id uuid not null references auth.users (id) on delete cascade,
  subscription_status text not null default 'pending'
    check (subscription_status in ('pending', 'active', 'past_due', 'cancelled')),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz not null default now()
);

create index if not exists businesses_owner_idx on businesses (owner_user_id);
create index if not exists businesses_slug_idx on businesses (slug);

-- ---------------------------------------------------------------------------
-- customers: one row per homeowner, scoped to a single business
-- ---------------------------------------------------------------------------
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  unique (business_id, user_id)
);

create index if not exists customers_business_idx on customers (business_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table businesses enable row level security;
alter table customers enable row level security;

-- A business admin can read/update only their own business row.
create policy "business admins read own business"
  on businesses for select
  using (owner_user_id = auth.uid());

create policy "business admins update own business"
  on businesses for update
  using (owner_user_id = auth.uid());

-- A customer can read only their own customer row.
create policy "customers read own record"
  on customers for select
  using (user_id = auth.uid());

-- A business admin can read the customer records belonging to their business.
create policy "business admins read own customers"
  on customers for select
  using (
    business_id in (
      select id from businesses where owner_user_id = auth.uid()
    )
  );

-- Inserts happen exclusively through the service-role API routes
-- (app/api/signup/*), which bypass RLS deliberately — do not add a public
-- insert policy here.
