alter table public.corrections
  add column if not exists metadata jsonb not null default '{}'::jsonb;
