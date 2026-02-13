import { describe, expect, it } from 'vitest';

import { chunkHebrewDocument } from '../src/chunk.js';

describe('chunkHebrewDocument', () => {
  it('creates heading and paragraph chunks', () => {
    const chunks = chunkHebrewDocument('פרטי מקרה:\nשורה ראשונה.\nשורה שניה.');
    expect(chunks[0]?.chunkType).toBe('heading');
    expect(chunks.some((chunk) => chunk.chunkType === 'paragraph')).toBe(true);
  });

  it('falls back by token length', () => {
    const longLine = 'מילה '.repeat(40);
    const chunks = chunkHebrewDocument(longLine, 10);
    expect(chunks.some((chunk) => chunk.chunkType === 'fallback')).toBe(true);
  });
});
