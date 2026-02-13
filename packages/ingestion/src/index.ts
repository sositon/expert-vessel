export type IngestionInput = {
  userId: string;
  docType: string;
  fileName: string;
  bytes: Uint8Array;
};

export type IngestionResult = {
  documentId: string;
};

export async function ingestPdf(input: IngestionInput): Promise<IngestionResult> {
  const suffix = Math.random().toString(36).slice(2, 8);
  return {
    documentId: `doc_${input.userId}_${input.docType}_${suffix}_${input.bytes.length}_${input.fileName}`
  };
}
