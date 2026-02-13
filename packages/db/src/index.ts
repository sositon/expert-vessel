export type RetrievalContext = {
  notes: string;
  formInput: string;
};

export type SaveCorrectionInput = {
  userId: string;
  draftId: string;
  before: string;
  after: string;
  diff: string;
};

export type CorrectionRecord = SaveCorrectionInput & {
  id: string;
  createdAt: string;
};

const correctionStore: CorrectionRecord[] = [];

export async function retrieveContextForDraftGeneration(
  userId: string,
  notes: string,
  formInput: string
): Promise<RetrievalContext> {
  return {
    notes: `${notes}\n[user:${userId}]`,
    formInput
  };
}

export async function saveCorrection(input: SaveCorrectionInput): Promise<CorrectionRecord> {
  const record: CorrectionRecord = {
    ...input,
    id: `corr_${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString()
  };
  correctionStore.push(record);
  return record;
}
