import { normalizeHebrewText } from './normalize-he.js';

export interface ChunkUnit {
  sectionPath: string;
  chunkType: 'heading' | 'paragraph' | 'fallback';
  content: string;
  metadata?: Record<string, unknown>;
}

const estimateTokenCount = (text: string): number => Math.ceil(text.length / 4);

const splitByTokenLength = (text: string, maxTokens: number): string[] => {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (estimateTokenCount(candidate) > maxTokens && current) {
      chunks.push(current);
      current = word;
      continue;
    }

    current = candidate;
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
};

export const chunkHebrewDocument = (input: string, maxTokens = 350): ChunkUnit[] => {
  const normalized = normalizeHebrewText(input);
  const lines = normalized.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const chunks: ChunkUnit[] = [];
  let currentHeading = 'root';

  for (const line of lines) {
    const isHeading = /^([0-9]+[.)]|[א-ת]+[.)])\s+/.test(line) || line.length < 80;

    if (isHeading) {
      currentHeading = line;
      chunks.push({
        sectionPath: currentHeading,
        chunkType: 'heading',
        content: line,
      });
      continue;
    }

    if (estimateTokenCount(line) <= maxTokens) {
      chunks.push({
        sectionPath: currentHeading,
        chunkType: 'paragraph',
        content: line,
      });
      continue;
    }

    for (const split of splitByTokenLength(line, maxTokens)) {
      chunks.push({
        sectionPath: currentHeading,
        chunkType: 'fallback',
        content: split,
        metadata: { reason: 'token-length-fallback' },
      });
    }
  }

  return chunks;
};
