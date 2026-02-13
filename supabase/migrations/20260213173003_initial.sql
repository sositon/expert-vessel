-- Enable required extensions
create extension if not exists vector;
create extension if not exists pgcrypto;

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  user_id uuid not null unique references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Archives
create table if not exists public.archives (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  doc_type text,
  source_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Document chunks
create table if not exists public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  archive_id uuid not null references public.archives (id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  doc_type text,
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (archive_id, chunk_index)
);

-- Vessels
create table if not exists public.vessels (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  archive_id uuid references public.archives (id) on delete set null,
  name text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Corrections
create table if not exists public.corrections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  vessel_id uuid references public.vessels (id) on delete set null,
  archive_id uuid references public.archives (id) on delete set null,
  correction_text text not null,
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.archives enable row level security;
alter table public.document_chunks enable row level security;
alter table public.vessels enable row level security;
alter table public.corrections enable row level security;

-- Profiles policies: authenticated users can only access their own row
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "profiles_insert_own"
  on public.profiles
  for insert
  to authenticated
  with check (user_id = auth.uid() and id = auth.uid());

create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Archives policies: CRUD own rows only
create policy "archives_select_own"
  on public.archives
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "archives_insert_own"
  on public.archives
  for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "archives_update_own"
  on public.archives
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "archives_delete_own"
  on public.archives
  for delete
  to authenticated
  using (user_id = auth.uid());

-- Document chunks policies: CRUD when owning related archive
create policy "document_chunks_select_own_archive"
  on public.document_chunks
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.archives a
      where a.id = archive_id
        and a.user_id = auth.uid()
    )
  );

create policy "document_chunks_insert_own_archive"
  on public.document_chunks
  for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and exists (
      select 1
      from public.archives a
      where a.id = archive_id
        and a.user_id = auth.uid()
    )
  );

create policy "document_chunks_update_own_archive"
  on public.document_chunks
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.archives a
      where a.id = archive_id
        and a.user_id = auth.uid()
    )
  )
  with check (
    user_id = auth.uid()
    and exists (
      select 1
      from public.archives a
      where a.id = archive_id
        and a.user_id = auth.uid()
    )
  );

create policy "document_chunks_delete_own_archive"
  on public.document_chunks
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.archives a
      where a.id = archive_id
        and a.user_id = auth.uid()
    )
  );

-- Vessels policies: CRUD own rows only
create policy "vessels_select_own"
  on public.vessels
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "vessels_insert_own"
  on public.vessels
  for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "vessels_update_own"
  on public.vessels
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "vessels_delete_own"
  on public.vessels
  for delete
  to authenticated
  using (user_id = auth.uid());

-- Corrections policies: CRUD own rows only
create policy "corrections_select_own"
  on public.corrections
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "corrections_insert_own"
  on public.corrections
  for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "corrections_update_own"
  on public.corrections
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "corrections_delete_own"
  on public.corrections
  for delete
  to authenticated
  using (user_id = auth.uid());

-- B-tree indexes for ownership/filtering
create index if not exists profiles_user_id_idx on public.profiles (user_id);
create index if not exists profiles_created_at_idx on public.profiles (created_at);

create index if not exists archives_user_id_idx on public.archives (user_id);
create index if not exists archives_doc_type_idx on public.archives (doc_type);
create index if not exists archives_created_at_idx on public.archives (created_at);

create index if not exists document_chunks_user_id_idx on public.document_chunks (user_id);
create index if not exists document_chunks_archive_id_idx on public.document_chunks (archive_id);
create index if not exists document_chunks_doc_type_idx on public.document_chunks (doc_type);
create index if not exists document_chunks_created_at_idx on public.document_chunks (created_at);

create index if not exists vessels_user_id_idx on public.vessels (user_id);
create index if not exists vessels_archive_id_idx on public.vessels (archive_id);
create index if not exists vessels_created_at_idx on public.vessels (created_at);

create index if not exists corrections_user_id_idx on public.corrections (user_id);
create index if not exists corrections_archive_id_idx on public.corrections (archive_id);
create index if not exists corrections_vessel_id_idx on public.corrections (vessel_id);
create index if not exists corrections_created_at_idx on public.corrections (created_at);

-- Vector index for semantic search on chunks
create index if not exists document_chunks_embedding_hnsw_idx
  on public.document_chunks
  using hnsw (embedding vector_cosine_ops);
