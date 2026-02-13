export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface ArchiveRow {
  id: string;
  user_id: string;
  title: string;
  doc_type: string | null;
  source_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DocumentChunkRow {
  id: string;
  user_id: string;
  archive_id: string;
  chunk_index: number;
  content: string;
  doc_type: string | null;
  section_path: string | null;
  chunk_type: string | null;
  embedding: number[] | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      archives: {
        Row: ArchiveRow;
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          doc_type?: string | null;
          source_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<ArchiveRow>;
      };
      document_chunks: {
        Row: DocumentChunkRow;
        Insert: {
          id?: string;
          user_id: string;
          archive_id: string;
          chunk_index: number;
          content: string;
          doc_type?: string | null;
          section_path?: string | null;
          chunk_type?: string | null;
          embedding?: number[] | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<DocumentChunkRow>;
      };
    };
    Functions: {
      match_document_chunks: {
        Args: {
          query_embedding: number[];
          match_count?: number;
          filter_doc_type?: string;
          filter_archive_id?: string;
        };
        Returns: Array<
          DocumentChunkRow & {
            similarity: number;
          }
        >;
      };
    };
  };
}

export interface InsertArchiveInput {
  user_id: string;
  title: string;
  doc_type?: string;
  source_url?: string;
}

export interface InsertChunkInput {
  user_id: string;
  doc_id: string;
  chunk_index: number;
  section_path: string;
  chunk_type: string;
  content: string;
  embedding: number[];
  metadata?: Json;
  doc_type?: string;
}

export interface VectorSearchFilters {
  docType?: string;
  docId?: string;
  limit?: number;
}
