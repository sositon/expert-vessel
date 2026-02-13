export type IngestPdfInput = {
  userId: string;
  docType: string;
  fileName: string;
  bytes: Uint8Array;
};

export type IngestPdfResult = {
  documentId: string;
};

export async function ingestPdf(input: IngestPdfInput): Promise<IngestPdfResult> {
  return {
    documentId: `doc_${input.userId}_${input.docType}_${input.bytes.length}_${Date.now()}_${input.fileName}`
  };
}
