alter table public.corrections
  add column if not exists draft_id text,
  add column if not exists before_text text,
  add column if not exists after_text text,
  add column if not exists diff_text text;

create index if not exists corrections_draft_id_idx on public.corrections (draft_id);
