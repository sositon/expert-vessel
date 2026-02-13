export type RetrievalContext = {
  notes: string;
  formInput: string;
};

export type CorrectionRecord = {
  id: string;
  userId: string;
  draftId: string;
  before: string;
  after: string;
  diff: string;
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

export async function saveCorrection(input: {
  userId: string;
  draftId: string;
  before: string;
  after: string;
  diff: string;
}): Promise<CorrectionRecord> {
  const record: CorrectionRecord = {
    id: `corr_${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
    ...input
  };
  correctionStore.push(record);
  return record;
}
