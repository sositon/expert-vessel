alter table public.document_chunks
  add column if not exists section_path text,
  add column if not exists chunk_type text,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

create or replace function public.match_document_chunks(
  query_embedding vector(1536),
  match_count int default 8,
  filter_doc_type text default null,
  filter_archive_id uuid default null
)
returns table (
  id uuid,
  user_id uuid,
  archive_id uuid,
  chunk_index integer,
  content text,
  doc_type text,
  section_path text,
  chunk_type text,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamptz,
  updated_at timestamptz,
  similarity double precision
)
language sql
stable
as $$
  select
    dc.id,
    dc.user_id,
    dc.archive_id,
    dc.chunk_index,
    dc.content,
    dc.doc_type,
    dc.section_path,
    dc.chunk_type,
    dc.embedding,
    dc.metadata,
    dc.created_at,
    dc.updated_at,
    1 - (dc.embedding <=> query_embedding) as similarity
  from public.document_chunks dc
  where dc.embedding is not null
    and (filter_doc_type is null or dc.doc_type = filter_doc_type)
    and (filter_archive_id is null or dc.archive_id = filter_archive_id)
  order by dc.embedding <=> query_embedding
  limit greatest(match_count, 1);
$$;
