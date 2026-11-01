-- pSEO engine v1. Tables in public with pseo_ prefix so PostgREST serves them; RLS on with no policies, so only service_role (server-side) can read or write.

create table pseo_products (
  slug text primary key,
  name text not null,
  product_type text not null check (product_type in ('own_live','own_planned','affiliate')),
  owner_bot text,
  link_status text not null default 'unknown' check (link_status in ('unknown','ok','dead','none')),
  link_url text,
  cta_url text,
  site text,
  updated_at timestamptz not null default now()
);

create table pseo_facts (
  id text primary key,
  product text not null references pseo_products(slug) on delete cascade,
  field text not null,
  value text not null,
  number numeric,
  source_url text not null,
  source_quote text not null,
  refresh_method text not null default 'html' check (refresh_method in ('html','manual')),
  checked_at timestamptz not null,
  stale boolean not null default false,
  updated_at timestamptz not null default now()
);
create index pseo_facts_product_idx on pseo_facts(product);

create table pseo_claims_allowlist (
  id bigint generated always as identity primary key,
  product text not null references pseo_products(slug) on delete cascade,
  claim text not null,
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  unique (product, claim)
);

create table pseo_niches (
  slug text primary key,
  label text not null,
  team_size int,
  must_haves text[] not null default '{}',
  budget_band text
);

create table pseo_keywords (
  id bigint generated always as identity primary key,
  query text not null,
  source text not null,
  seen_at timestamptz not null default now(),
  cluster text,
  intent text,
  unique (query, source)
);

create table pseo_pages (
  slug text primary key,
  route text not null check (route in ('best','compare')),
  template text not null check (template in ('best','compare','howto')),
  products text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft','gated','live','noindex','retired')),
  wave int,
  spec jsonb,
  gate_score numeric,
  gate_failures jsonb not null default '[]',
  published_at timestamptz,
  noindex_at timestamptz,
  updated_at timestamptz not null default now()
);

create table pseo_page_metrics (
  page text not null references pseo_pages(slug) on delete cascade,
  date date not null,
  impressions int,
  clicks int,
  position numeric,
  indexed boolean,
  link_ok boolean,
  source text not null default 'ryze_gsc',
  primary key (page, date)
);

create table pseo_runs (
  id bigint generated always as identity primary key,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  mode text,
  summary jsonb
);

-- Lock down: RLS on, no policies, so anon/authenticated get nothing. service_role bypasses RLS.
do $$ declare t text; begin
  for t in select tablename from pg_tables where schemaname = 'public' and tablename like 'pseo\_%' loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from anon, authenticated', t);
  end loop;
end $$;
