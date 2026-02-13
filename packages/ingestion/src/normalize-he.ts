const HEBREW_PUNCTUATION_MAP: Record<string, string> = {
  '״': '"',
  '׳': "'",
  '–': '-',
  '—': '-',
  '…': '...',
};

export const normalizeHebrewWhitespace = (text: string): string =>
  text
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const normalizeHebrewPunctuation = (text: string): string =>
  text.replace(/[״׳–—…]/g, (char) => HEBREW_PUNCTUATION_MAP[char] ?? char);

export const normalizeHebrewText = (text: string): string =>
  normalizeHebrewWhitespace(normalizeHebrewPunctuation(text));
