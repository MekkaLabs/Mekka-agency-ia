create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_name text not null,
  email text not null,
  phone text,
  source text not null,
  pain_point text,
  interest text,
  pipeline_stage text not null default 'novo_lead',
  next_action text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  segment text,
  size text,
  website text,
  status text not null default 'lead',
  owner_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  name text not null,
  type text not null,
  module text,
  status text not null default 'novo',
  next_step text,
  start_date date,
  due_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  company_id uuid references public.companies(id) on delete cascade,
  offer_type text not null,
  value numeric(12, 2),
  status text not null default 'rascunho',
  expected_close_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects
add column if not exists deal_id uuid references public.deals(id) on delete set null;

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  related_type text not null,
  related_id uuid not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.companies enable row level security;
alter table public.projects enable row level security;
alter table public.deals enable row level security;
alter table public.notes enable row level security;

create policy "internal users can read profiles"
on public.profiles
for select
to authenticated
using (true);

create policy "internal users can manage profiles"
on public.profiles
for all
to authenticated
using (true)
with check (true);

create policy "internal users can manage leads"
on public.leads
for all
to authenticated
using (true)
with check (true);

create policy "site can insert leads"
on public.leads
for insert
to anon
with check (true);

create policy "internal users can manage companies"
on public.companies
for all
to authenticated
using (true)
with check (true);

create policy "internal users can manage projects"
on public.projects
for all
to authenticated
using (true)
with check (true);

create policy "internal users can manage deals"
on public.deals
for all
to authenticated
using (true)
with check (true);

create policy "internal users can manage notes"
on public.notes
for all
to authenticated
using (true)
with check (true);
