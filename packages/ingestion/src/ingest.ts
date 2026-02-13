import { bulkInsertChunks, insertArchive, type InsertChunkInput, type Json } from '@repo/db';
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@repo/db';

import { chunkHebrewDocument } from './chunk.js';
import { embedTexts } from './embeddings.js';
import { normalizeHebrewText } from './normalize-he.js';
import { extractPdfText } from './pdf.js';

interface IngestInput {
  pdfPath: string;
  docType: string;
  userId: string;
  title?: string;
}

const inferVariableCandidates = (text: string): string[] => {
  const matches = text.match(/[א-ת]{3,30}\s*:\s*[^\n]+/g) ?? [];
  return [...new Set(matches.map((line) => line.split(':')[0]?.trim()).filter(Boolean))] as string[];
};

const createStructureJson = (chunks: ReturnType<typeof chunkHebrewDocument>): Json => ({
  sections: chunks
    .filter((chunk) => chunk.chunkType === 'heading')
    .map((chunk) => ({ title: chunk.content, sectionPath: chunk.sectionPath })),
});

export const ingestPdfDocument = async (
  client: SupabaseClient<Database>,
  input: IngestInput,
): Promise<{ docId: string; chunksInserted: number }> => {
  const extractedText = await extractPdfText(input.pdfPath);
  const normalizedText = normalizeHebrewText(extractedText);
  const units = chunkHebrewDocument(normalizedText);
  const embeddings = await embedTexts(units.map((unit) => unit.content));

  const archive = await insertArchive(client, {
    user_id: input.userId,
    title: input.title ?? input.pdfPath.split('/').at(-1) ?? 'Untitled',
    doc_type: input.docType,
    source_url: input.pdfPath,
  });

  const structure = createStructureJson(units);
  const variableCandidates = inferVariableCandidates(normalizedText);

  const chunkPayload: InsertChunkInput[] = units.map((unit, index) => ({
    user_id: input.userId,
    doc_id: archive.id,
    chunk_index: index,
    section_path: unit.sectionPath,
    chunk_type: unit.chunkType,
    content: unit.content,
    embedding: embeddings[index] ?? [],
    metadata: {
      ...unit.metadata,
      structure,
      variableCandidates,
    },
    doc_type: input.docType,
  }));

  await bulkInsertChunks(client, chunkPayload);

  return {
    docId: archive.id,
    chunksInserted: chunkPayload.length,
  };
};
