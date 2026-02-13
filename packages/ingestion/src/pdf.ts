import { readFile } from 'node:fs/promises';

import pdfParse from 'pdf-parse';

export const extractPdfText = async (pdfPath: string): Promise<string> => {
  const file = await readFile(pdfPath);
  const parsed = await pdfParse(file);
  const text = parsed.text.trim();

  if (!text) {
    throw new Error(
      'PDF has no extractable text layer (likely scanned). Run OCR first and retry ingestion.',
    );
  }

  return text;
};
