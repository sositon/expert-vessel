import { describe, expect, it } from 'vitest';

import { normalizeHebrewPunctuation, normalizeHebrewText, normalizeHebrewWhitespace } from '../src/normalize-he.js';

describe('normalizeHebrewWhitespace', () => {
  it('collapses mixed unicode spaces', () => {
    expect(normalizeHebrewWhitespace('שלום\u00A0\u2009עולם')).toBe('שלום עולם');
  });
});

describe('normalizeHebrewPunctuation', () => {
  it('normalizes Hebrew quotes and dashes', () => {
    expect(normalizeHebrewPunctuation('״בדיקה״ – כן')).toBe('"בדיקה" - כן');
  });
});

describe('normalizeHebrewText', () => {
  it('applies punctuation and whitespace normalization', () => {
    expect(normalizeHebrewText('שלום\u00A0–\u00A0עולם')).toBe('שלום - עולם');
  });
});
