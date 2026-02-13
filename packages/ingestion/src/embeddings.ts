import OpenAI from 'openai';

const embeddingModel = process.env.OPENAI_EMBEDDING_MODEL ?? 'text-embedding-3-small';

const getClient = (): OpenAI => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY env var');
  }

  return new OpenAI({ apiKey });
};

export const embedTexts = async (texts: string[]): Promise<number[][]> => {
  const client = getClient();
  const response = await client.embeddings.create({
    model: embeddingModel,
    input: texts,
  });

  return response.data.map((item) => item.embedding);
};
