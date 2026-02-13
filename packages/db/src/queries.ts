import type { SupabaseClient } from '@supabase/supabase-js';

import type {
  ArchiveRow,
  Database,
  DocumentChunkRow,
  InsertArchiveInput,
  InsertChunkInput,
  VectorSearchFilters,
} from './types.js';

export const insertArchive = async (
  client: SupabaseClient<Database>,
  archive: InsertArchiveInput,
): Promise<ArchiveRow> => {
  const { data, error } = await client.from('archives').insert(archive).select().single();

  if (error) {
    throw new Error(`Failed to insert archive: ${error.message}`);
  }

  return data;
};

export const bulkInsertChunks = async (
  client: SupabaseClient<Database>,
  chunks: InsertChunkInput[],
): Promise<DocumentChunkRow[]> => {
  const payload = chunks.map((chunk) => ({
    user_id: chunk.user_id,
    archive_id: chunk.doc_id,
    chunk_index: chunk.chunk_index,
    section_path: chunk.section_path,
    chunk_type: chunk.chunk_type,
    content: chunk.content,
    embedding: chunk.embedding,
    metadata: chunk.metadata ?? {},
    doc_type: chunk.doc_type ?? null,
  }));

  const { data, error } = await client.from('document_chunks').insert(payload).select();

  if (error) {
    throw new Error(`Failed to bulk insert chunks: ${error.message}`);
  }

  return data;
};

export const vectorSearchChunks = async (
  client: SupabaseClient<Database>,
  embedding: number[],
  filters: VectorSearchFilters = {},
): Promise<Array<DocumentChunkRow & { similarity: number }>> => {
  const { data, error } = await client.rpc('match_document_chunks', {
    query_embedding: embedding,
    match_count: filters.limit ?? 8,
    filter_doc_type: filters.docType,
    filter_archive_id: filters.docId,
  });

  if (error) {
    throw new Error(`Failed to run vector search: ${error.message}`);
  }

  return data;
};
